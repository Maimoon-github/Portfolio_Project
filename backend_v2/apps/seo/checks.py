"""
Django System Checks for SEO Application.

Provides deployment-time validation of configuration, dependencies, and
settings to ensure the SEO application is properly configured before
serving traffic. These checks run during Django's check framework
(django-admin check or on server startup).

Check Categories:
    - Settings: Validates django-meta and SEO-specific settings
    - Dependencies: Ensures required Python packages are installed
    - Configuration: Verifies Celery, caching, and database setup
"""

import logging
from typing import Any, List, Optional

from django.core.checks import CheckMessage, Error, Info, register, Warning
from django.conf import settings

logger = logging.getLogger(__name__)


# =============================================================================
# SETTINGS VALIDATION
# =============================================================================

@register('seo')
def check_meta_settings(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    Verify django-meta settings are properly configured.
    
    Checks for required and recommended settings to ensure Open Graph,
    Twitter Cards, and Schema.org metadata generate correctly.
    
    Args:
        app_configs: List of app configurations (provided by Django).
        **kwargs: Additional keyword arguments passed by Django.
        
    Returns:
        List of CheckMessage objects (Errors or Warnings).
    """
    errors: List[CheckMessage] = []
    warnings: List[CheckMessage] = []
    
    # Required: SITE_PROTOCOL for canonical URLs
    if not getattr(settings, 'META_SITE_PROTOCOL', None):
        errors.append(
            Error(
                "META_SITE_PROTOCOL is not set in settings.",
                hint="Add META_SITE_PROTOCOL = 'https' (or 'http') to your settings.py. "
                     "This is required for generating correct canonical URLs and Open Graph links.",
                obj='settings.META_SITE_PROTOCOL',
                id='seo.E001',
            )
        )
    
    # Recommended: SITE_DOMAIN for absolute URLs
    if not getattr(settings, 'SITE_DOMAIN', None):
        warnings.append(
            Warning(
                "SITE_DOMAIN is not set in settings.",
                hint="Add SITE_DOMAIN = 'example.com' to your settings.py for proper "
                     "absolute URL generation in sitemaps and metadata.",
                obj='settings.SITE_DOMAIN',
                id='seo.W001',
            )
        )
    
    # Recommended: Open Graph enabled
    if not getattr(settings, 'META_USE_OG_PROPERTIES', True):
        warnings.append(
            Warning(
                "META_USE_OG_PROPERTIES is set to False.",
                hint="Open Graph metadata is disabled. Set META_USE_OG_PROPERTIES = True "
                     "for social sharing optimization (Facebook, LinkedIn).",
                obj='settings.META_USE_OG_PROPERTIES',
                id='seo.W002',
            )
        )
    
    # Recommended: Twitter Cards enabled
    if not getattr(settings, 'META_USE_TWITTER_PROPERTIES', True):
        warnings.append(
            Warning(
                "META_USE_TWITTER_PROPERTIES is set to False.",
                hint="Twitter Card metadata is disabled. Set META_USE_TWITTER_PROPERTIES = True "
                     "for Twitter sharing optimization.",
                obj='settings.META_USE_TWITTER_PROPERTIES',
                id='seo.W003',
            )
        )
    
    # Check SITE_NAME for publisher attribution
    if not getattr(settings, 'SITE_NAME', None):
        warnings.append(
            Warning(
                "SITE_NAME is not set in settings.",
                hint="Add SITE_NAME = 'Your Site Name' for proper Schema.org publisher "
                     "attribution and branding in metadata.",
                obj='settings.SITE_NAME',
                id='seo.W004',
            )
        )
    
    return errors + warnings


# =============================================================================
# CELERY CONFIGURATION
# =============================================================================

@register('seo')
def check_celery_configuration(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    Verify Celery is properly configured for asynchronous task processing.
    
    SEO analysis tasks can run synchronously for small sites, but production
    deployments should use Celery to prevent request blocking.
    
    Args:
        app_configs: List of app configurations.
        **kwargs: Additional keyword arguments.
        
    Returns:
        List of CheckMessage objects.
    """
    warnings: List[CheckMessage] = []
    info_messages: List[CheckMessage] = []
    
    # Check if Celery is configured
    has_celery = hasattr(settings, 'CELERY_BROKER_URL') or hasattr(settings, 'BROKER_URL')
    
    if not has_celery:
        warnings.append(
            Warning(
                "Celery is not configured (CELERY_BROKER_URL not found).",
                hint="SEO analysis tasks will run synchronously, blocking requests. "
                     "For production, configure Celery with Redis/RabbitMQ: "
                     "CELERY_BROKER_URL = 'redis://localhost:6379/0'",
                obj='settings.CELERY_BROKER_URL',
                id='seo.W005',
            )
        )
    else:
        # Check for eager mode (synchronous execution)
        always_eager = getattr(settings, 'CELERY_TASK_ALWAYS_EAGER', False)
        
        if always_eager and not settings.DEBUG:
            warnings.append(
                Warning(
                    "CELERY_TASK_ALWAYS_EAGER is True in non-DEBUG mode.",
                    hint="SEO tasks are running synchronously even though Celery is "
                         "configured. Set CELERY_TASK_ALWAYS_EAGER = False for "
                         "asynchronous processing in production.",
                    obj='settings.CELERY_TASK_ALWAYS_EAGER',
                    id='seo.W006',
                )
            )
        elif always_eager and settings.DEBUG:
            info_messages.append(
                Info(
                    "CELERY_TASK_ALWAYS_EAGER is True (DEBUG mode).",
                    hint="SEO tasks run synchronously for easier debugging. "
                         "This is acceptable for development.",
                    obj='settings.CELERY_TASK_ALWAYS_EAGER',
                    id='seo.I001',
                )
            )
        else:
            info_messages.append(
                Info(
                    "Celery is properly configured for asynchronous SEO tasks.",
                    hint=None,
                    obj='settings.CELERY_BROKER_URL',
                    id='seo.I002',
                )
            )
    
    return warnings + info_messages


# =============================================================================
# PACKAGE DEPENDENCIES
# =============================================================================

@register('seo')
def check_required_packages(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    Verify required Python packages are installed and importable.
    
    The SEO application depends on several pure-Python packages for
    content analysis that must be available at runtime.
    
    Args:
        app_configs: List of app configurations.
        **kwargs: Additional keyword arguments.
        
    Returns:
        List of CheckMessage objects (Errors for missing required packages).
    """
    errors: List[CheckMessage] = []
    warnings: List[CheckMessage] = []
    
    # Required: beautifulsoup4 for HTML parsing
    try:
        import bs4
        # Check version if needed
        bs4_version = getattr(bs4, '__version__', 'unknown')
        logger.debug(f"beautifulsoup4 version: {bs4_version}")
    except ImportError:
        errors.append(
            Error(
                "beautifulsoup4 is not installed.",
                hint="Install with: pip install beautifulsoup4>=4.9.0",
                obj='seo',
                id='seo.E002',
            )
        )
    
    # Required: textstat for readability analysis
    try:
        import textstat
        textstat_version = getattr(textstat, '__version__', 'unknown')
        logger.debug(f"textstat version: {textstat_version}")
    except ImportError:
        errors.append(
            Error(
                "textstat is not installed.",
                hint="Install with: pip install textstat>=0.7.0",
                obj='seo',
                id='seo.E003',
            )
        )
    
    # Optional but recommended: extruct for schema validation
    try:
        import extruct
        extruct_version = getattr(extruct, '__version__', 'unknown')
        logger.debug(f"extruct version: {extruct_version}")
    except ImportError:
        warnings.append(
            Warning(
                "extruct is not installed.",
                hint="Schema markup validation will be unavailable. "
                     "Install with: pip install extruct>=0.17.0",
                obj='seo',
                id='seo.W007',
            )
        )
    
    # Optional: django-ratelimit for API rate limiting
    try:
        import ratelimit
        logger.debug("django-ratelimit is available")
    except ImportError:
        warnings.append(
            Warning(
                "django-ratelimit is not installed.",
                hint="API endpoints will not have rate limiting. "
                     "Install with: pip install django-ratelimit>=4.0.0",
                obj='seo',
                id='seo.W008',
            )
        )
    
    # Check Django REST Framework (required for API)
    if 'rest_framework' not in settings.INSTALLED_APPS:
        warnings.append(
            Warning(
                "djangorestframework is not in INSTALLED_APPS.",
                hint="SEO API endpoints will be unavailable. "
                     "Add 'rest_framework' to INSTALLED_APPS for API access.",
                obj='settings.INSTALLED_APPS',
                id='seo.W009',
            )
        )
    
    return errors + warnings


# =============================================================================
# DATABASE CONFIGURATION
# =============================================================================

@register('seo')
def check_database_indexes(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    Verify database configuration supports required operations.
    
    Checks for proper database backend and potential performance issues.
    Note: Actual index verification happens at migration level, not here.
    
    Args:
        app_configs: List of app configurations.
        **kwargs: Additional keyword arguments.
        
    Returns:
        List of CheckMessage objects.
    """
    info_messages: List[CheckMessage] = []
    warnings: List[CheckMessage] = []
    
    # Check database engine
    db_engine = settings.DATABASES.get('default', {}).get('ENGINE', '')
    
    if 'sqlite3' in db_engine:
        warnings.append(
            Warning(
                "SQLite is being used as the database backend.",
                hint="SQLite is acceptable for development but not recommended "
                     "for production SEO workloads. Consider PostgreSQL or MySQL "
                     "for better concurrency and full-text search capabilities.",
                obj='settings.DATABASES["default"]["ENGINE"]',
                id='seo.W010',
            )
        )
    elif 'postgresql' in db_engine:
        info_messages.append(
            Info(
                "PostgreSQL detected - optimal for SEO operations.",
                hint="PostgreSQL provides excellent support for JSONField "
                     "(score_breakdown) and concurrent operations.",
                obj='settings.DATABASES["default"]["ENGINE"]',
                id='seo.I003',
            )
        )
    
    return warnings + info_messages


# =============================================================================
# CACHE CONFIGURATION
# =============================================================================

@register('seo')
def check_cache_configuration(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    Verify Django cache is configured for SEO metadata caching.
    
    While not strictly required, caching significantly improves performance
    for metadata rendering and score retrieval.
    
    Args:
        app_configs: List of app configurations.
        **kwargs: Additional keyword arguments.
        
    Returns:
        List of CheckMessage objects.
    """
    warnings: List[CheckMessage] = []
    info_messages: List[CheckMessage] = []
    
    if not hasattr(settings, 'CACHES') or not settings.CACHES:
        warnings.append(
            Warning(
                "Django cache is not configured.",
                hint="SEO metadata caching will be disabled, causing repeated "
                     "database queries. Configure CACHES with Redis or Memcached: "
                     "CACHES = {'default': {'BACKEND': 'django.core.cache.backends.redis.RedisCache', ...}}",
                obj='settings.CACHES',
                id='seo.W011',
            )
        )
    else:
        default_cache = settings.CACHES.get('default', {})
        backend = default_cache.get('BACKEND', '')
        
        if 'dummy' in backend or 'locmem' in backend:
            warnings.append(
                Warning(
                    f"Using {backend} cache backend.",
                    hint="Dummy and local memory caches are not suitable for production. "
                         "Use RedisCache or MemcachedCache for shared caching across "
                         "multiple server processes.",
                    obj='settings.CACHES["default"]["BACKEND"]',
                    id='seo.W012',
                )
            )
        elif 'redis' in backend or 'memcached' in backend:
            info_messages.append(
                Info(
                    f"Using {backend} for SEO metadata caching.",
                    hint=None,
                    obj='settings.CACHES["default"]["BACKEND"]',
                    id='seo.I004',
                )
            )
    
    return warnings + info_messages


# =============================================================================
# DJANGO-META INTEGRATION
# =============================================================================

@register('seo')
def check_django_meta_integration(app_configs: Any, **kwargs: Any) -> List[CheckMessage]:
    """
    Verify django-meta is properly installed and configured.
    
    The SEO application integrates with django-meta for metadata rendering.
    
    Args:
        app_configs: List of app configurations.
        **kwargs: Additional keyword arguments.
        
    Returns:
        List of CheckMessage objects.
    """
    errors: List[CheckMessage] = []
    warnings: List[CheckMessage] = []
    
    # Check if django-meta is in INSTALLED_APPS
    if 'meta' not in settings.INSTALLED_APPS:
        warnings.append(
            Warning(
                "django-meta is not in INSTALLED_APPS.",
                hint="Add 'meta' to INSTALLED_APPS for Open Graph and Twitter Card "
                     "metadata rendering. Install with: pip install django-meta>=2.5.0",
                obj='settings.INSTALLED_APPS',
                id='seo.W013',
            )
        )
    
    # Check for django-robots
    if 'robots' not in settings.INSTALLED_APPS:
        warnings.append(
            Warning(
                "django-robots is not in INSTALLED_APPS.",
                hint="Add 'robots' to INSTALLED_APPS for admin-managed robots.txt. "
                     "Install with: pip install django-robots>=6.1",
                obj='settings.INSTALLED_APPS',
                id='seo.W014',
            )
        )
    
    return errors + warnings


# =============================================================================
# COMPREHENSIVE CHECK FUNCTION
# =============================================================================

def run_all_seo_checks() -> List[CheckMessage]:
    """
    Run all SEO system checks manually (for debugging or health checks).
    
    Returns:
        Combined list of all check messages.
    """
    all_messages: List[CheckMessage] = []
    
    check_functions = [
        check_meta_settings,
        check_celery_configuration,
        check_required_packages,
        check_database_indexes,
        check_cache_configuration,
        check_django_meta_integration,
    ]
    
    for check_func in check_functions:
        try:
            messages = check_func(None)
            all_messages.extend(messages)
        except Exception as e:
            logger.error(f"Check {check_func.__name__} failed: {e}")
    
    return all_messages