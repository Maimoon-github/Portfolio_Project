# backend/apps/tools/signals.py
"""
Signals for the tools app.

Implements Signal-Based Automation mandate.
Handles cache invalidation for tool pages (used by Next.js ISR).
"""
import logging
from django.dispatch import receiver  # ← This was missing
from wagtail.signals import page_published, page_unpublished
from django.core.cache import cache

from .models import ToolDetailPage

logger = logging.getLogger(__name__)


@receiver(page_published, sender=ToolDetailPage)
def invalidate_tool_cache_on_publish(sender, instance, **kwargs):
    """Invalidate ISR cache tags when a calculator tool is published."""
    try:
        cache.delete(f"tool-{instance.slug}")
        cache.delete("tools")  # Invalidate tools listing
        logger.info(f"Cache invalidated for published tool: {instance.slug}")
    except Exception as e:  # noqa: BLE001
        logger.error(f"Cache invalidation failed for tool {instance.slug}: {e}")


@receiver(page_unpublished, sender=ToolDetailPage)
def invalidate_tool_cache_on_unpublish(sender, instance, **kwargs):
    """Invalidate ISR cache tags when a calculator tool is unpublished."""
    try:
        cache.delete(f"tool-{instance.slug}")
        cache.delete("tools")
        logger.info(f"Cache invalidated for unpublished tool: {instance.slug}")
    except Exception as e:  # noqa: BLE001
        logger.error(f"Cache invalidation failed for tool {instance.slug}: {e}")