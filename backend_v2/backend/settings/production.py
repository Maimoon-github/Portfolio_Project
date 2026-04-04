"""
Django production settings for Render.com
"""
from .base import *
import os

DEBUG = False

# ====================== ALLOWED_HOSTS (This was the main issue) ======================
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
]

# Render automatically sets this environment variable
render_hostname = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if render_hostname:
    ALLOWED_HOSTS.append(render_hostname)

# Support your custom domain and wildcard for safety
ALLOWED_HOSTS.extend([
    'maimoonamin.com',
    'www.maimoonamin.com',
    '.onrender.com',           # Allows all Render subdomains
])

# ====================== DATABASE ======================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ====================== STATIC FILES (Whitenoise) ======================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Important: Use Whitenoise for production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ====================== TEMPLATES ======================
TEMPLATES[0]['DIRS'] = [
    BASE_DIR / 'templates',
]

# ====================== MEDIA ======================
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ====================== CORS ======================
CORS_ALLOWED_ORIGINS = [
    "https://maimoonamin.com",
    "https://www.maimoonamin.com",
    "http://localhost:5173",   # for local React development
]

# Add Render URL dynamically
if render_hostname:
    CORS_ALLOWED_ORIGINS.append(f"https://{render_hostname}")

# ====================== SECURITY ======================
SECURE_SSL_REDIRECT = False                    # Render handles HTTPS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# ====================== CSRF Trusted Origins ======================
CSRF_TRUSTED_ORIGINS = [
    "https://maimoonamin.com",
    "https://www.maimoonamin.com",
]
if render_hostname:
    CSRF_TRUSTED_ORIGINS.append(f"https://{render_hostname}")

# ====================== LOGGING ======================
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