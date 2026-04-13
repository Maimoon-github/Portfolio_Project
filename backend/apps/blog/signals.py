# backend/apps/blog/signals.py
"""
Signals for the blog app.

Implements decoupled, idempotent automation (architectural mandate).
Currently handles cache invalidation and search index updates on page changes.
All operations are wrapped in try/except to never break the request cycle.
"""
import logging
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from wagtail.signals import page_published, page_unpublished

from .models import BlogDetailPage

logger = logging.getLogger(__name__)


@receiver(page_published, sender=BlogDetailPage)
def invalidate_blog_cache_on_publish(sender, instance, **kwargs):
    """
    Invalidate ISR-related cache tags when a blog post is published.
    Idempotent and safe — never raises exceptions.
    """
    try:
        cache.delete(f"blog-post-{instance.slug}")
        cache.delete("blog-posts")  # Invalidate listing cache
        logger.info(f"Cache invalidated for published blog post: {instance.slug}")
    except Exception as e:  # noqa: BLE001
        logger.error(f"Cache invalidation failed for blog post {instance.slug}: {e}")


@receiver(page_unpublished, sender=BlogDetailPage)
def invalidate_blog_cache_on_unpublish(sender, instance, **kwargs):
    """
    Invalidate cache when a blog post is unpublished.
    """
    try:
        cache.delete(f"blog-post-{instance.slug}")
        cache.delete("blog-posts")
        logger.info(f"Cache invalidated for unpublished blog post: {instance.slug}")
    except Exception as e:  # noqa: BLE001
        logger.error(f"Cache invalidation failed for blog post {instance.slug}: {e}")