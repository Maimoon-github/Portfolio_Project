# """
# Django production settings – using SQLite.
# """
# from .base import *
# from decouple import config
# import sentry_sdk
# from sentry_sdk.integrations.django import DjangoIntegration

# DEBUG = False
# ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=lambda v: [s.strip() for s in v.split(',')])

# # SQLite Database (still using SQLite – not recommended for high‑traffic production)
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# # WhiteNoise for static files
# MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# # Security settings for HTTPS
# SECURE_SSL_REDIRECT = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
# SECURE_HSTS_SECONDS = 31536000
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True
# SECURE_CONTENT_TYPE_NOSNIFF = True
# SECURE_BROWSER_XSS_FILTER = True
# X_FRAME_OPTIONS = 'DENY'

# # Sentry error tracking (optional)
# sentry_sdk.init(
#     dsn=config('SENTRY_DSN', default=''),
#     integrations=[DjangoIntegration()],
#     traces_sample_rate=config('SENTRY_TRACES_SAMPLE_RATE', default=0.1, cast=float),
#     send_default_pii=True,
#     environment='production',
# )

# # CORS for production
# CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=lambda v: [s.strip() for s in v.split(',')])

# # React build output
# FRONTEND_DIR = BASE_DIR.parent / 'frontend'
# REACT_BUILD_DIR = FRONTEND_DIR / 'dist'

# STATICFILES_DIRS = [
#     BASE_DIR / 'static',
#     REACT_BUILD_DIR / 'assets',
# ]
# TEMPLATES[0]['DIRS'] = [BASE_DIR / 'templates', REACT_BUILD_DIR]






































"""
Django production settings.
"""
from .base import *
import os

DEBUG = False

# ALLOWED_HOSTS - Render will add its hostname automatically
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
ALLOWED_HOSTS = ['.onrender.com']
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
# Add your real domain later:
# ALLOWED_HOSTS += ['yourdomain.com', 'www.yourdomain.com']

# WhiteNoise (already in base.py middleware, but ensure order)
# No need to insert again if it's already in base.py after SecurityMiddleware

# Database - keep SQLite for now (Render free tier supports it, but consider Postgres later)
# DATABASES is already set in base.py

# Static files - match your actual build output
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Your Vite build puts files here:
STATICFILES_DIRS = [
    BASE_DIR / 'static',                    # your existing static folder
    # No need for REACT_BUILD_DIR if postbuild already copies to backend_v2/static
]

# Templates - your postbuild puts index.html here
TEMPLATES[0]['DIRS'] = [
    BASE_DIR / 'templates',                 # this should be backend_v2/templates
]

# Security (good to keep)
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# Remove or comment out the FRONTEND_DIR / REACT_BUILD_DIR lines if they cause errors
# (your postbuild already handles copying)