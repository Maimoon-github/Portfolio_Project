"""
Django App Configuration for the SEO application.

This module defines the configuration class for the SEO app, handling
application initialization, signal registration, and system checks for
required third-party integrations and settings.
"""

import importlib
import logging
from typing import Any, List

from django.apps import AppConfig
from django.conf import settings
from django.core.checks import CheckMessage, Error, Warning, register

from .constants import (
    META_SITE_PROTOCOL,
    META_USE_OG_PROPERTIES,
    META_USE_TWITTER_PROPERTIES,
)

logger = logging.getLogger(__name__)


class SeoConfig(AppConfig):
    """
    Configuration class for the SEO Django application.

    Handles application initialization, signal registration, and system checks
    to ensure required third-party packages and settings are properly configured.

    Attributes:
        name: Python path to the application.
        verbose_name: Human-readable name displayed in the admin.
        default_auto_field: Default primary key field type for models.
    """

    name: str = 'apps.seo'
    verbose_name: str = 'SEO Management'
    default_auto_field: str = 'django.db.models.BigAutoField'

    def ready(self) -> None:
        """
        Perform application initialization tasks.

        This method is called once when the application registry is fully
        populated. It imports signal handlers to register them with Django's
        signal dispatcher and logs initialization status.

        Note:
            Uses importlib to import signals module to prevent circular
            import issues during application loading.
        """
        # Import signal handlers to register them
        # This is done inside ready() to ensure all models are loaded first
        try:
            from . import signals
            logger.debug("SEO signals registered successfully.")
        except Exception as e:
            logger.error(f"Failed to import SEO signals: {e}")

        # Perform system checks
        self._check_installed_apps()
        self._check_celery_configuration()

    def _check_installed_apps(self) -> None:
        """
        Verify that required third-party apps are installed.

        Logs warnings if django-meta or other recommended apps are missing.
        """
        required_apps = {
            'meta': 'django-meta',
            'robots': 'django-robots',
            # 'django_check_seo': 'django-check-seo',
        }

        installed_apps = set(settings.INSTALLED_APPS)

        for app_name, package_name in required_apps.items():
            if app_name not in installed_apps:
                logger.warning(
                    f"'{package_name}' is not in INSTALLED_APPS. "
                    f"Some SEO features may be unavailable."
                )

    def _check_celery_configuration(self) -> None:
        """
        Verify Celery is available for asynchronous task processing.

        Logs informational message if Celery is not configured, as tasks
        will fall back to synchronous execution.
        """
        if not hasattr(settings, 'CELERY_BROKER_URL'):
            logger.info(
                "CELERY_BROKER_URL not found in settings. "
                "SEO analysis tasks will run synchronously (CELERY_TASK_ALWAYS_EAGER mode)."
            )


@register('seo')
def check_seo_settings(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    System check for SEO-related settings configuration.

    Validates that required and recommended settings are properly configured
    for optimal SEO functionality.

    Args:
        app_configs: List of app configurations (provided by Django).
        **kwargs: Additional keyword arguments passed by Django.

    Returns:
        List of CheckMessage objects containing errors or warnings.
    """
    errors: List[CheckMessage] = []
    warnings: List[CheckMessage] = []

    # Check for django-meta protocol setting
    if not getattr(settings, 'META_SITE_PROTOCOL', None):
        warnings.append(
            Warning(
                "META_SITE_PROTOCOL not set in settings.",
                hint="Add META_SITE_PROTOCOL = 'https' (or 'http') to your settings.py "
                     "for proper canonical URL generation and Open Graph tags.",
                obj='settings.META_SITE_PROTOCOL',
                id='seo.W001',
            )
        )

    # Check for django-meta OG properties
    if not getattr(settings, 'META_USE_OG_PROPERTIES', True):
        warnings.append(
            Warning(
                "META_USE_OG_PROPERTIES is set to False.",
                hint="Open Graph properties should be enabled for social sharing optimization.",
                obj='settings.META_USE_OG_PROPERTIES',
                id='seo.W002',
            )
        )

    # Check for cache configuration (recommended but not required)
    if not hasattr(settings, 'CACHES'):
        warnings.append(
            Warning(
                "No CACHES configured in settings.",
                hint="Configure Django caching for optimal SEO score performance. "
                     "Recommended: Redis or Memcached backend.",
                obj='settings.CACHES',
                id='seo.W003',
            )
        )

    # Check for required third-party packages (runtime check)
    try:
        import bs4  # noqa: F401
    except ImportError:
        errors.append(
            Error(
                "beautifulsoup4 is not installed.",
                hint="Install with: pip install beautifulsoup4",
                obj='seo',
                id='seo.E001',
            )
        )

    try:
        import textstat  # noqa: F401
    except ImportError:
        errors.append(
            Error(
                "textstat is not installed.",
                hint="Install with: pip install textstat",
                obj='seo',
                id='seo.E002',
            )
        )

    try:
        import extruct  # noqa: F401
    except ImportError:
        warnings.append(
            Warning(
                "extruct is not installed.",
                hint="Install with: pip install extruct for schema validation features.",
                obj='seo',
                id='seo.W004',
            )
        )

    return errors + warnings