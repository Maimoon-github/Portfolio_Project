"""
Celery Task Definitions for SEO Application.

Asynchronous task queue for CPU-intensive SEO operations including content
analysis, cache management, sitemap generation, and bulk reprocessing. All
tasks are designed to be idempotent and safely retriable.

Task Design Principles:
    - Idempotency: Safe to retry via content hash checks
    - Transaction Safety: All DB operations use atomic transactions
    - Error Recovery: Automatic retries with exponential backoff
    - Logging: Comprehensive logging for monitoring and debugging
    - Lazy Imports: Models imported inside tasks to prevent circular imports
"""

import logging
from typing import Any, Dict, List, Optional

from celery import shared_task, Task
from django.db import transaction
from django.conf import settings

# Service layer imports (business logic)
from .services import analyze_post_seo
from .cache import invalidate_post_metadata, set_cached_sitemap, get_cached_sitemap
from .cache import invalidate_sitemap_cache

# Analysis engine for sitemap generation
from .analysis.engine import SEOAnalyzer

logger = logging.getLogger(__name__)


# =============================================================================
# ANALYSIS TASKS
# =============================================================================


@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_backoff_max=600,  # Max 10 minutes between retries
    retry_jitter=True,  # Add randomness to prevent thundering herd
)
def compute_seo_scores_task(
    self: Task,
    post_id: int,
    triggering_event: str = 'scheduled'
) -> Dict[str, Any]:
    """
    Compute SEO scores for a specific post asynchronously.
    
    Idempotent operation that checks content hash before processing to avoid
    redundant computation. Retries up to 3 times on failure with exponential
    backoff.
    
    Args:
        self: Celery task instance (provided by bind=True).
        post_id: Primary key of the Post to analyze.
        triggering_event: Event type ('save', 'publish', 'manual', 'scheduled', 'bulk').
        
    Returns:
        Dictionary containing analysis results or error information.
        
    Raises:
        self.retry: Re-queues task on transient failures.
    """
    logger.info(f"Starting SEO analysis task for post {post_id} (attempt {self.request.retries + 1})")
    
    try:
        # Import models inside task for lazy loading
        from django.apps import apps
        Post = apps.get_model('blog', 'Post')
        PostSEO = apps.get_model('seo', 'PostSEO')
        
        # Verify post exists
        try:
            post = Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            logger.warning(f"Post {post_id} not found, skipping analysis")
            return {
                'status': 'skipped',
                'post_id': post_id,
                'reason': 'post_not_found'
            }
        
        # Check if analysis already current (idempotency check)
        try:
            post_seo = PostSEO.objects.get(post_id=post_id)
            from .analysis.utils import calculate_content_hash
            current_hash = calculate_content_hash(getattr(post, 'body', ''))
            
            if (post_seo.content_hash == current_hash and 
                post_seo.seo_score is not None and
                self.request.retries == 0):  # Only skip on first attempt
                logger.debug(f"Post {post_id} unchanged, skipping analysis")
                return {
                    'status': 'skipped',
                    'post_id': post_id,
                    'reason': 'content_unchanged',
                    'existing_score': post_seo.seo_score
                }
        except PostSEO.DoesNotExist:
            pass  # Will be created by service
        
        # Execute analysis within transaction
        with transaction.atomic():
            result = analyze_post_seo(
                post_id=post_id,
                triggering_event=triggering_event
            )
        
        if 'error' in result:
            logger.error(f"Analysis error for post {post_id}: {result['error']}")
            # Retry on error unless it's a logic error (not transient)
            if self.request.retries < 3:
                raise self.retry(exc=Exception(result['error']))
            return {
                'status': 'failed',
                'post_id': post_id,
                'error': result['error']
            }
        
        logger.info(
            f"Completed SEO analysis for post {post_id}: "
            f"score={result.get('seo_score')}, "
            f"readability={result.get('readability_score')}"
        )
        
        return {
            'status': 'success',
            'post_id': post_id,
            'seo_score': result.get('seo_score'),
            'readability_score': result.get('readability_score'),
            'cached': result.get('cached', False),
            'schema_recommendation': result.get('schema_recommendation')
        }
        
    except Exception as exc:
        logger.exception(f"Unexpected error in SEO analysis task for post {post_id}: {exc}")
        # Retry logic handled by autoretry_for, but we log here for visibility
        raise


@shared_task(
    bind=True,
    max_retries=2,
    default_retry_delay=30,
)
def bulk_reanalyze_task(
    self: Task,
    post_ids: Optional[List[int]] = None,
    batch_size: int = 10
) -> Dict[str, Any]:
    """
    Reanalyze SEO scores for multiple posts in batches.
    
    Processes posts in configurable batches to manage memory and database
    connection usage. Tracks progress for monitoring long-running operations.
    
    Args:
        self: Celery task instance.
        post_ids: List of post IDs to analyze. If None, analyzes all posts.
        batch_size: Number of posts to process per batch (default 10).
        
    Returns:
        Dictionary with processing statistics.
    """
    from django.apps import apps
    Post = apps.get_model('blog', 'Post')
    
    # Get queryset
    if post_ids:
        queryset = Post.objects.filter(pk__in=post_ids)
        total_count = len(post_ids)
    else:
        queryset = Post.objects.all()
        total_count = queryset.count()
    
    if total_count == 0:
        return {
            'status': 'completed',
            'total': 0,
            'processed': 0,
            'failed': 0,
            'skipped': 0
        }
    
    logger.info(f"Starting bulk reanalysis of {total_count} posts (batch size: {batch_size})")
    
    processed = 0
    failed = 0
    skipped = 0
    
    # Process in batches
    batch_num = 0
    for i in range(0, total_count, batch_size):
        batch_num += 1
        batch_ids = list(queryset.values_list('id', flat=True)[i:i + batch_size])
        
        logger.debug(f"Processing batch {batch_num} ({len(batch_ids)} posts)")
        
        for post_id in batch_ids:
            try:
                # Call subtask synchronously (could also chain async)
                result = compute_seo_scores_task.run(
                    post_id=post_id,
                    triggering_event='bulk'
                )
                
                if result.get('status') == 'success':
                    processed += 1
                elif result.get('status') == 'skipped':
                    skipped += 1
                else:
                    failed += 1
                    
            except Exception as exc:
                logger.error(f"Failed to analyze post {post_id} in bulk task: {exc}")
                failed += 1
        
        # Update task state for progress monitoring
        self.update_state(
            state='PROGRESS',
            meta={
                'current': min(i + batch_size, total_count),
                'total': total_count,
                'processed': processed,
                'failed': failed,
                'skipped': skipped,
                'batch': batch_num
            }
        )
    
    logger.info(
        f"Bulk reanalysis complete: {processed} processed, "
        f"{skipped} skipped, {failed} failed"
    )
    
    return {
        'status': 'completed',
        'total': total_count,
        'processed': processed,
        'failed': failed,
        'skipped': skipped,
        'batches': batch_num
    }


# =============================================================================
# CACHE MANAGEMENT TASKS
# =============================================================================


@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=30,
    autoretry_for=(Exception,),
)
def invalidate_metadata_cache_task(
    self: Task,
    post_id: int
) -> Dict[str, Any]:
    """
    Asynchronously invalidate metadata cache for a post.
    
    Used when immediate cache clearing isn't required and can be deferred
    to the task queue to reduce request latency.
    
    Args:
        self: Celery task instance.
        post_id: Primary key of the post to invalidate.
        
    Returns:
        Dictionary with operation status.
    """
    try:
        invalidate_post_metadata(post_id)
        logger.debug(f"Async cache invalidation completed for post {post_id}")
        return {
            'status': 'success',
            'post_id': post_id,
            'action': 'cache_invalidated'
        }
    except Exception as exc:
        logger.error(f"Cache invalidation failed for post {post_id}: {exc}")
        raise


@shared_task(
    bind=True,
    max_retries=2,
    default_retry_delay=60,
)
def generate_sitemap_task(self: Task) -> Dict[str, Any]:
    """
    Generate and cache XML sitemap asynchronously.
    
    Queries all published posts with SEO metadata to build sitemap XML.
    Caches result for 24 hours. Clears old cache before generating to
    prevent serving stale data during generation.
    
    Args:
        self: Celery task instance.
        
    Returns:
        Dictionary with generation statistics and cache status.
    """
    from django.apps import apps
    from django.contrib.sitemaps import Sitemap
    from django.urls import reverse
    from django.utils import timezone
    
    try:
        Post = apps.get_model('blog', 'Post')
        PostSEO = apps.get_model('seo', 'PostSEO')
        
        logger.info("Starting sitemap generation task")
        
        # Clear existing cache first
        invalidate_sitemap_cache()
        
        # Build sitemap entries
        # Note: In production, you might use Django's built-in sitemap framework
        # This implementation shows manual generation for flexibility
        entries = []
        
        published_posts = Post.objects.filter(
            status='published'
        ).select_related('seo').iterator(chunk_size=100)
        
        count = 0
        for post in published_posts:
            try:
                seo = getattr(post, 'seo', None)
                
                # Build entry
                loc = post.get_absolute_url()
                if not loc.startswith(('http://', 'https://')):
                    protocol = getattr(settings, 'META_SITE_PROTOCOL', 'https')
                    domain = getattr(settings, 'SITE_DOMAIN', 'localhost')
                    loc = f"{protocol}://{domain}{loc}"
                
                lastmod = getattr(post, 'updated_at', None) or getattr(post, 'published_at', None)
                priority = getattr(seo, 'sitemap_priority', 0.7) if seo else 0.7
                changefreq = getattr(seo, 'sitemap_changefreq', 'weekly') if seo else 'weekly'
                
                entries.append({
                    'loc': loc,
                    'lastmod': lastmod.isoformat() if lastmod else None,
                    'priority': str(priority),
                    'changefreq': changefreq
                })
                count += 1
                
            except Exception as e:
                logger.warning(f"Error processing post {getattr(post, 'pk', 'unknown')} for sitemap: {e}")
        
        # Generate XML (simplified - in production use django.contrib.sitemaps)
        xml_parts = ['<?xml version="1.0" encoding="UTF-8"?>']
        xml_parts.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
        
        for entry in entries:
            xml_parts.append('  <url>')
            xml_parts.append(f"    <loc>{entry['loc']}</loc>")
            if entry['lastmod']:
                xml_parts.append(f"    <lastmod>{entry['lastmod']}</lastmod>")
            xml_parts.append(f"    <changefreq>{entry['changefreq']}</changefreq>")
            xml_parts.append(f"    <priority>{entry['priority']}</priority>")
            xml_parts.append('  </url>')
        
        xml_parts.append('</urlset>')
        xml_content = '\n'.join(xml_parts)
        
        # Cache the result
        set_cached_sitemap(xml_content)
        
        logger.info(f"Sitemap generation complete: {count} URLs")
        
        return {
            'status': 'success',
            'urls_included': count,
            'cached': True,
            'size_bytes': len(xml_content)
        }
        
    except Exception as exc:
        logger.exception(f"Sitemap generation failed: {exc}")
        raise self.retry(exc=exc)


# =============================================================================
# MAINTENANCE TASKS
# =============================================================================


@shared_task(
    bind=True,
    max_retries=2,
    default_retry_delay=60,
)
def find_orphan_posts_task(self: Task) -> Dict[str, Any]:
    """
    Asynchronously detect posts with zero incoming internal links.
    
    Scans published posts to build link graph and identify orphans.
    Results stored in cache for admin dashboard retrieval.
    
    Args:
        self: Celery task instance.
        
    Returns:
        Dictionary with orphan count and post IDs.
    """
    from django.apps import apps
    from django.core.cache import cache
    
    try:
        Post = apps.get_model('blog', 'Post')
        
        logger.info("Starting orphan post detection task")
        
        # Get all published posts
        all_posts = Post.objects.filter(status='published')
        total_posts = all_posts.count()
        
        if total_posts == 0:
            return {
                'status': 'completed',
                'orphan_count': 0,
                'orphan_ids': [],
                'total_scanned': 0
            }
        
        # Build set of all internal links found
        linked_slugs = set()
        
        # Scan posts for internal links (expensive operation)
        from .analysis.utils import extract_links
        
        for post in all_posts.only('body', 'slug').iterator(chunk_size=50):
            try:
                body = getattr(post, 'body', '')
                if body:
                    links = extract_links(body)
                    for link in links:
                        if not link.get('is_external', False):
                            href = link.get('href', '')
                            # Extract slug from various URL patterns
                            # /post/slug/, /blog/slug/, etc.
                            if '/post/' in href or '/blog/' in href:
                                parts = href.strip('/').split('/')
                                if len(parts) >= 2:
                                    linked_slugs.add(parts[-1])
                            elif href.startswith('/'):
                                linked_slugs.add(href.strip('/').split('/')[-1])
            except Exception as e:
                logger.warning(f"Error scanning post {post.pk} for links: {e}")
        
        # Find posts not in linked set
        orphan_posts = []
        for post in all_posts.only('id', 'slug', 'title'):
            post_slug = getattr(post, 'slug', '')
            if post_slug and post_slug not in linked_slugs:
                orphan_posts.append({
                    'id': post.pk,
                    'slug': post_slug,
                    'title': getattr(post, 'title', 'Unknown')
                })
        
        # Store results in cache for admin retrieval
        cache_key = 'seo:orphan_posts:latest'
        cache.set(cache_key, {
            'count': len(orphan_posts),
            'posts': orphan_posts,
            'generated_at': timezone.now().isoformat() if hasattr(timezone, 'now') else None
        }, timeout=3600 * 6)  # 6 hour cache
        
        logger.info(f"Orphan detection complete: {len(orphan_posts)} orphans found")
        
        return {
            'status': 'completed',
            'orphan_count': len(orphan_posts),
            'orphan_ids': [p['id'] for p in orphan_posts],
            'total_scanned': total_posts
        }
        
    except Exception as exc:
        logger.exception(f"Orphan detection failed: {exc}")
        raise self.retry(exc=exc)


@shared_task
def cleanup_old_audit_logs_task(days: int = 90) -> Dict[str, Any]:
    """
    Remove audit log entries older than specified days.
    
    Maintenance task to prevent database bloat from accumulated
    audit history.
    
    Args:
        days: Age threshold for deletion (default 90 days).
        
    Returns:
        Dictionary with deletion count.
    """
    from django.apps import apps
    from django.utils import timezone
    from datetime import timedelta
    
    try:
        PostSEOAuditLog = apps.get_model('seo', 'PostSEOAuditLog')
        
        cutoff_date = timezone.now() - timedelta(days=days)
        
        with transaction.atomic():
            deleted_count, _ = PostSEOAuditLog.objects.filter(
                created_at__lt=cutoff_date
            ).delete()
        
        logger.info(f"Cleaned up {deleted_count} old audit log entries")
        
        return {
            'status': 'completed',
            'deleted_count': deleted_count,
            'older_than_days': days
        }
        
    except Exception as exc:
        logger.error(f"Audit log cleanup failed: {exc}")
        return {
            'status': 'failed',
            'error': str(exc)
        }


# =============================================================================
# TASK SCHEDULING HELPERS
# =============================================================================

def schedule_periodic_tasks():
    """
    Configure periodic task schedules (if using django-celery-beat).
    
    Call this from AppConfig.ready() or a setup script to ensure
    periodic tasks are registered.
    """
    try:
        from django_celery_beat.models import PeriodicTask, IntervalSchedule
        
        # Sitemap generation - daily
        schedule, _ = IntervalSchedule.objects.get_or_create(
            every=1,
            period=IntervalSchedule.DAYS
        )
        
        PeriodicTask.objects.get_or_create(
            interval=schedule,
            name='Generate Sitemap Daily',
            task='seo.tasks.generate_sitemap_task',
            defaults={'enabled': True}
        )
        
        # Orphan detection - weekly
        weekly_schedule, _ = IntervalSchedule.objects.get_or_create(
            every=7,
            period=IntervalSchedule.DAYS
        )
        
        PeriodicTask.objects.get_or_create(
            interval=weekly_schedule,
            name='Find Orphan Posts Weekly',
            task='seo.tasks.find_orphan_posts_task',
            defaults={'enabled': True}
        )
        
        logger.info("Periodic SEO tasks scheduled")
        
    except ImportError:
        logger.debug("django-celery-beat not installed, skipping periodic task setup")
    except Exception as e:
        logger.error(f"Error scheduling periodic tasks: {e}")