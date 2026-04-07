"""
SEO Application for Django Blog Platform.

A comprehensive SEO management system providing Yoast-level intelligence
for Django blog platforms. Features include real-time SEO analysis,
readability scoring, structured data generation, automated optimization
suggestions, and social media metadata management.

Attributes:
    __version__: Semantic version string of the package.
    default_app_config: Django app configuration path for legacy support.
    tasks: Celery tasks module (if available).
"""

from typing import Final

__version__: Final[str] = '1.0.0'
default_app_config: Final[str] = 'seo.apps.SeoConfig'

# Import Celery tasks to ensure they are registered with the task queue
# when Django starts. This import is wrapped in a try-except block to
# handle environments where Celery is not installed or configured, and
# to prevent import errors during initial setup/migrations.
try:
    from seo import tasks
except ImportError:
    # Celery is optional or not yet configured
    tasks = None  # type: ignore