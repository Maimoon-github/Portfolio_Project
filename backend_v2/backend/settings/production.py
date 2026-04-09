"""
Django production settings for Render.com
"""
from .base import *
import os


# backend/settings/production.py  — add/override

WAGTAILADMIN_BASE_URL = 'https://yourdomain.com'

# Production media → cloud storage (S3 recommended)
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# Upgrade search to Elasticsearch for high volume (optional)
# WAGTAILSEARCH_BACKENDS = {
#     'default': {
#         'BACKEND': 'wagtail.search.backends.elasticsearch8',
#         'URLS': ['http://localhost:9200'],
#         'INDEX': 'wagtail',
#     }
# }


DEBUG = False

# ====================== ALLOWED_HOSTS ======================
# FIX: Previously, render_hostname was appended to the first list which was then
# immediately overwritten by the second hardcoded list — the append was dead code.
# Merged into a single list; render_hostname still appended as a dynamic safety net.
render_hostname = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    'portfolio-project-l49w.onrender.com',
    'maimoonamin.com',
    'www.maimoonamin.com',
]

if render_hostname and render_hostname not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(render_hostname)

# ====================== DATABASE ======================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ====================== STATIC FILES ======================
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

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
    "http://localhost:5173",
    # FIX: Render domain hardcoded as explicit fallback in case env var isn't set
    "https://portfolio-project-l49w.onrender.com",
]

if render_hostname:
    origin = f"https://{render_hostname}"
    if origin not in CORS_ALLOWED_ORIGINS:
        CORS_ALLOWED_ORIGINS.append(origin)

# ====================== SECURITY ======================
SECURE_SSL_REDIRECT = False  # Render handles SSL at the proxy level
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
X_FRAME_OPTIONS = 'DENY'

# ====================== CSRF TRUSTED ORIGINS ======================
# FIX: Previously only added via env var — if RENDER_EXTERNAL_HOSTNAME isn't set,
# the Render domain was missing entirely, causing all admin form POSTs to 403/500.
CSRF_TRUSTED_ORIGINS = [
    "https://maimoonamin.com",
    "https://www.maimoonamin.com",
    # Hardcoded as a guaranteed fallback
    "https://portfolio-project-l49w.onrender.com",
]

if render_hostname:
    origin = f"https://{render_hostname}"
    if origin not in CSRF_TRUSTED_ORIGINS:
        CSRF_TRUSTED_ORIGINS.append(origin)

# ====================== LOGGING ======================
# FIX: Added django.request logger so full tracebacks appear in Render logs
# even when DEBUG=False, making future errors easy to diagnose.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}