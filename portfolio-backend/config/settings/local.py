"""
Local development settings.
Uses SQLite by default (perfect for your laptop).
"""
from .base import *  # Import everything from base
from pathlib import Path

DEBUG = True

# ==============================================================================
# DATABASE
# ==============================================================================
# Use SQLite for local development (no Postgres needed)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ==============================================================================
# SECURITY / DEBUG
# ==============================================================================
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0"]

# Make sure your new portfolio app is registered
# INSTALLED_APPS += [
#     "apps.portfolio",
# ]

# CORS settings (for local dev)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True

# Optional: show debug toolbar / better error pages locally
# (uncomment if you installed django-debug-toolbar)
# INSTALLED_APPS += ["debug_toolbar"]
# MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]