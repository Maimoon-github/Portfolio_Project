from django.dispatch import receiver
from wagtail.signals import page_published
import httpx
from django.conf import settings
from .models import BlogPost


@receiver(page_published)
def on_blog_post_published(sender, instance, **kwargs):
    """Trigger Next.js ISR revalidation on publish."""
    if isinstance(instance, BlogPost) and instance.live:
        # Revalidate list + specific post
        httpx.post(
            f"{settings.FRONTEND_URL}/api/revalidate",
            json={
                "tag": "blog-posts",
                "secret": settings.REVALIDATE_SECRET,
            },
            timeout=5,
        )
        httpx.post(
            f"{settings.FRONTEND_URL}/api/revalidate",
            json={
                "tag": f"blog-post-{instance.slug}",
                "secret": settings.REVALIDATE_SECRET,
            },
            timeout=5,
        )