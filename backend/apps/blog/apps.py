# backend/apps/blog/apps.py
"""
Blog app configuration.
"""
from django.apps import AppConfig


class BlogConfig(AppConfig):
    """
    Wagtail blog app. BlogIndexPage and BlogDetailPage are registered with Wagtail.
    The Wagtail v2 Pages API exposes blog content to the Next.js frontend via ISR-cached fetch calls.
    """
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.blog"
    verbose_name = "Blog"

    def ready(self) -> None:
        # import apps.blog.signals  # noqa: F401
        pass