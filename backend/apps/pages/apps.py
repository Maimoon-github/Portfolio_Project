# backend/apps/pages/apps.py
"""
Pages app configuration.
"""
from django.apps import AppConfig


class PagesConfig(AppConfig):
    """
    Static pages app for the portfolio marketing site. HomePage is the Wagtail root page child.
    AboutPage and ContactPage are children of HomePage. All page content is managed in the Wagtail
    admin and served to Next.js via the v2 Pages API with ISR caching.
    """
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.pages"
    verbose_name = "Pages"