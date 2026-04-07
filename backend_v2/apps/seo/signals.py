"""
Django Signal Handlers for SEO Application.

This module contains all signal handlers that automate SEO-related side effects
including redirect creation on slug changes, automatic SEO analysis queuing,
and cache invalidation. All handlers use dispatch_uid to prevent duplicate
registration and transaction.on_commit() for data consistency.

Signal Flow:
    pre_save (Post): Captures previous slug for change detection
    post_save (Post): Triggers SEO companion creation and analysis
    post_save (PostSEO): Invalidates cached metadata
"""

import logging
from typing import Any, Optional

from django.apps import apps
from django.db import transaction
from django.db.models.signals import pre_save, post_save

# Service layer imports
from .services import (
    get_or_create_post_seo,
    create_post_redirect,
    analyze_post_seo,
)

# Cache utilities
from .cache import invalidate_post_metadata

# Celery tasks (with safe import)
try:
    from .tasks import analyze_post_seo_task
except ImportError:
    analyze_post_seo_task = None

logger = logging.getLogger(__name__)


# =============================================================================
# PRE-SAVE HANDLERS
# =============================================================================


def pre_save_post_handler(sender: Any, instance: Any, **kwargs: Any) -> None:
    """
    Capture post state before save for change detection.
    
    Stores the previous slug value on the instance for comparison in 
    post_save handlers. This enables detection of slug changes that 
    require redirect creation.
    
    Args:
        sender: The model class (Post).
        instance: The Post instance being saved.
        **kwargs: Additional signal arguments.
        
    Note:
        Uses _previous_slug instance attribute to pass state to post_save.
    """
    try:
        # Only relevant for existing instances (updates)
        if instance.pk is None:
            return
        
        # Get current slug from database
        Post = apps.get_model('blog', 'Post')
        try:
            old_instance = Post.objects.only('slug', 'status').get(pk=instance.pk)
            instance._previous_slug = old_instance.slug
            instance._previous_status = old_instance.status
        except Post.DoesNotExist:
            pass
            
    except Exception as e:
        logger.error(f"Error in pre_save handler: {e}")


# =============================================================================
# POST-SAVE HANDLERS
# =============================================================================


def post_save_post_seo_handler(
    sender: Any, 
    instance: Any, 
    created: bool, 
    **kwargs: Any
) -> None:
    """
    Handle Post creation/update to maintain SEO companion and trigger analysis.
    
    On creation:
        - Creates companion PostSEO record
        - Queues async SEO analysis
        
    On update:
        - Ensures PostSEO exists
        - Queues async analysis if content likely changed
        
    Args:
        sender: The model class (Post).
        instance: The Post instance that was saved.
        created: Boolean indicating if this is a new record.
        **kwargs: Additional signal arguments.
    """
    try:
        # Create or verify SEO companion exists
        def create_seo_and_analyze():
            try:
                post_seo = get_or_create_post_seo(instance)
                
                # Determine triggering event
                event = 'publish' if created else 'save'
                
                # Queue async analysis via Celery if available
                if analyze_post_seo_task:
                    analyze_post_seo_task.delay(instance.pk, triggering_event=event)
                    logger.debug(f"Queued SEO analysis for post {instance.pk}")
                else:
                    # Fallback to synchronous analysis (for tests or no-Celery envs)
                    analyze_post_seo(instance.pk, triggering_event=event)
                    
            except Exception as e:
                logger.error(f"Error in SEO creation/analysis for post {instance.pk}: {e}")
        
        # Execute after transaction commits to ensure data is visible
        if created:
            # For new posts, must commit first to satisfy FK constraints
            transaction.on_commit(create_seo_and_analyze)
        else:
            # For updates, can run immediately or defer based on settings
            # Use on_commit to ensure consistency
            transaction.on_commit(create_seo_and_analyze)
            
    except Exception as e:
        logger.error(f"Error in post_save SEO handler: {e}")


def post_save_post_redirect_handler(
    sender: Any, 
    instance: Any, 
    created: bool, 
    **kwargs: Any
) -> None:
    """
    Create redirect records when post slugs change.
    
    Detects slug changes by comparing current slug to _previous_slug captured
    in pre_save handler. Only creates redirects for published posts to avoid
    redirect chains during drafting.
    
    Args:
        sender: The model class (Post).
        instance: The Post instance that was saved.
        created: Boolean indicating if this is a new record.
        **kwargs: Additional signal arguments.
    """
    # Only process updates (not new posts) that have slug changes
    if created:
        return
    
    previous_slug = getattr(instance, '_previous_slug', None)
    current_slug = getattr(instance, 'slug', None)
    
    if not previous_slug or previous_slug == current_slug:
        return  # No change detected
    
    # Only create redirects for posts that were previously published
    # This prevents redirects from draft URLs that shouldn't be indexed
    previous_status = getattr(instance, '_previous_status', None)
    current_status = getattr(instance, 'status', None)
    
    # Create redirect if post was or is published (has public URL history)
    if previous_status == 'published' or current_status == 'published':
        try:
            def create_redirect():
                create_post_redirect(
                    post=instance,
                    old_slug=previous_slug,
                    new_slug=current_slug,
                    status_code=301  # Permanent redirect for slug changes
                )
                logger.info(
                    f"Created redirect for post {instance.pk}: "
                    f"{previous_slug} -> {current_slug}"
                )
            
            # Defer until after transaction commits
            transaction.on_commit(create_redirect)
            
        except Exception as e:
            logger.error(
                f"Error creating redirect for post {instance.pk}: {e}"
            )


def post_save_post_seo_cache_handler(
    sender: Any, 
    instance: Any, 
    created: bool, 
    **kwargs: Any
) -> None:
    """
    Invalidate cached metadata when PostSEO is modified.
    
    Ensures that any changes to SEO metadata (titles, descriptions, scores)
    immediately invalidate cached template fragments and API responses.
    
    Args:
        sender: The model class (PostSEO).
        instance: The PostSEO instance that was saved.
        created: Boolean indicating if this is a new record.
        **kwargs: Additional signal arguments.
    """
    try:
        post_id = getattr(instance, 'post_id', None)
        if post_id:
            def invalidate():
                invalidate_post_metadata(post_id)
                logger.debug(f"Invalidated cache for post {post_id}")
            
            transaction.on_commit(invalidate)
            
    except Exception as e:
        logger.error(f"Error invalidating cache for PostSEO: {e}")


# =============================================================================
# SIGNAL CONNECTION
# =============================================================================

def connect_seo_signals() -> None:
    """
    Connect all SEO signal handlers with dispatch_uid to prevent duplicates.
    
    This function should be called from the AppConfig ready() method.
    Uses dispatch_uid to ensure handlers aren't registered multiple times
    during import edge cases or test runs.
    """
    try:
        Post = apps.get_model('blog', 'Post')
        PostSEO = apps.get_model('seo', 'PostSEO')
    except LookupError as e:
        logger.error(f"Cannot connect SEO signals - models not loaded: {e}")
        return
    
    # Pre-save: Capture slug for change detection
    pre_save.connect(
        pre_save_post_handler,
        sender=Post,
        dispatch_uid='seo_pre_save_handler'
    )
    
    # Post-save: SEO companion creation and analysis
    post_save.connect(
        post_save_post_seo_handler,
        sender=Post,
        dispatch_uid='seo_post_save_handler'
    )
    
    # Post-save: Redirect creation for slug changes
    post_save.connect(
        post_save_post_redirect_handler,
        sender=Post,
        dispatch_uid='seo_redirect_handler'
    )
    
    # Post-save (PostSEO): Cache invalidation
    post_save.connect(
        post_save_post_seo_cache_handler,
        sender=PostSEO,
        dispatch_uid='seo_cache_invalidate_handler'
    )
    
    logger.debug("SEO signals connected successfully")


def disconnect_seo_signals() -> None:
    """
    Disconnect all SEO signal handlers.
    
    Useful for testing scenarios where signal side effects need to be disabled.
    """
    try:
        Post = apps.get_model('blog', 'Post')
        PostSEO = apps.get_model('seo', 'PostSEO')
        
        pre_save.disconnect(sender=Post, dispatch_uid='seo_pre_save_handler')
        post_save.disconnect(sender=Post, dispatch_uid='seo_post_save_handler')
        post_save.disconnect(sender=Post, dispatch_uid='seo_redirect_handler')
        post_save.disconnect(sender=PostSEO, dispatch_uid='seo_cache_invalidate_handler')
        
        logger.debug("SEO signals disconnected")
    except LookupError:
        pass  # Models not available


# Auto-connect when module is imported (for development/convenience)
# In production, apps.py ready() should explicitly call connect_seo_signals()
# to ensure proper initialization order
connect_seo_signals()