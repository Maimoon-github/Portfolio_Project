# backend/settings/development.py
from .base import *
from decouple import config

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# SQLite (already configured in base, keep as is)
# Use SQLite in development as per spec

# Debug Toolbar
INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE.insert(0, 'debug_toolbar.middleware.DebugToolbarMiddleware')
INTERNAL_IPS = ['127.0.0.1']

# CORS permissive for React development
CORS_ALLOW_ALL_ORIGINS = True

# Optional: disable password validators in dev for simplicity
AUTH_PASSWORD_VALIDATORS = []