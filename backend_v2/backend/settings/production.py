"""
Django production settings.
"""
from .base import *
from decouple import config
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

DEBUG = False
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])

# PostgreSQL Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}


# React build output (frontend is sibling of backend_v2)
FRONTEND_DIR = BASE_DIR.parent / 'frontend'
REACT_BUILD_DIR = FRONTEND_DIR / 'dist'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
    REACT_BUILD_DIR / 'assets',
]
TEMPLATES[0]['DIRS'] = [BASE_DIR / 'templates', REACT_BUILD_DIR]


# WhiteNoise for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security settings for HTTPS
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# Sentry error tracking
sentry_sdk.init(
    dsn=config('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=config('SENTRY_TRACES_SAMPLE_RATE', default=0.1, cast=float),
    send_default_pii=True,
    environment='production',
)

# CORS for production
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=lambda v: [s.strip() for s in v.split(',')])

# React build output
REACT_BUILD_DIR = BASE_DIR / 'frontend' / 'dist'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    REACT_BUILD_DIR / 'assets',
]
TEMPLATES[0]['DIRS'] = [BASE_DIR / 'templates', REACT_BUILD_DIR]