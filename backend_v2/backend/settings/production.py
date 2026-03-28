# File: Portfolio_Project/backend_v2/backend/settings/production.py
"""
Django production settings for Docker deployment on local machine.
"""
from .base import *
import os

DEBUG = False

# Host configuration - CRITICAL for your setup
ALLOWED_HOSTS = [
    'maimoonamin.com',
    'www.maimoonamin.com',
    'localhost',
    '127.0.0.1',
    '*',  # Cloudflare tunnel will handle this
]

# Get additional hosts from environment
env_hosts = os.environ.get('ALLOWED_HOSTS', '')
if env_hosts:
    ALLOWED_HOSTS.extend([h.strip() for h in env_hosts.split(',') if h.strip()])

# Database - SQLite (suitable for portfolio traffic)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'  # Collected static destination

# Source directories (your Vite build outputs here)
STATICFILES_DIRS = [
    BASE_DIR / 'static',  # Contains assets/ from Vite build
]

# Templates (postbuild copies index.html here)
TEMPLATES[0]['DIRS'] = [
    BASE_DIR / 'templates',
]

# Media uploads
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# CORS - Allow Cloudflare origins
CORS_ALLOWED_ORIGINS = [
    "https://maimoonamin.com",
    "https://www.maimoonamin.com",
    "http://localhost:5173",  # Dev fallback
]

env_cors = os.environ.get('CORS_ALLOWED_ORIGINS', '')
if env_cors:
    CORS_ALLOWED_ORIGINS.extend([o.strip() for o in env_cors.split(',') if o.strip()])

# Security settings - MODIFIED for Cloudflare tunnel (handles SSL at edge)
# Set these via environment if running direct exposure, disable for Cloudflare
SECURE_SSL_REDIRECT = os.environ.get('SECURE_SSL_REDIRECT', 'False') == 'True'
SESSION_COOKIE_SECURE = os.environ.get('SESSION_COOKIE_SECURE', 'False') == 'True'
CSRF_COOKIE_SECURE = os.environ.get('CSRF_COOKIE_SECURE', 'False') == 'True'

# Keep these security headers
SECURE_HSTS_SECONDS = 31536000 if (SESSION_COOKIE_SECURE and CSRF_COOKIE_SECURE) else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}