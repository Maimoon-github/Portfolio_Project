"""
Django base settings for all environments.
"""
from datetime import timedelta
from pathlib import Path
import os

# Add this for SEO app
import sys

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-+u2w5@f1xsay6q*%jn=wjh_3i0^*aa9=fhpbym)_0a1eqoy+nq')
DEBUG = False

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

INSTALLED_APPS = [
    # ── Your existing apps (keep as-is) ──────────────────────────
    'apps.blog',
    'apps.comments',
    'apps.contact',
    'apps.knowledge',
    'apps.projects',
    'apps.resume',
    'api',
    'core',

    # ── NEW: Wagtail CMS app ──────────────────────────────────────
    'cms',                                    # your blog page models

    # ── NEW: Wagtail core ─────────────────────────────────────────
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.contrib.routable_page',
    'wagtail.contrib.sitemaps',
    'wagtail.contrib.search_promotions',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail',
    'wagtail.api.v2',                         # headless REST API

    # ── NEW: wagtail-seo ──────────────────────────────────────────
    'wagtailseo',

    # ── NEW: dependencies ─────────────────────────────────────────
    'modelcluster',
    'taggit',

    # ── Django built-ins (keep yours) ─────────────────────────────
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
]

# ── NEW: Wagtail config ───────────────────────────────────────────
WAGTAIL_SITE_NAME = 'Portfolio Blog'
WAGTAILADMIN_BASE_URL = 'http://localhost:8000'   # override in production.py
DATA_UPLOAD_MAX_NUMBER_FIELDS = 10000

# ── NEW: Wagtail search ───────────────────────────────────────────
WAGTAILSEARCH_BACKENDS = {
    'default': {
        'BACKEND': 'wagtail.search.backends.database',
    }
}

# ── NEW: wagtail-seo ──────────────────────────────────────────────
WAGTAILSEO = {
    'TWITTER_SITE': '@yourhandle',
    'STRUCT_ORG_TYPE': 'Person',
    'STRUCT_ORG_NAME': 'Maimoon Amin',
    'STRUCT_ORG_URL': 'https://maimoonamin.com',
}

# ── NEW: Wagtail images ───────────────────────────────────────────
WAGTAILIMAGES_IMAGE_MODEL = 'wagtailimages.Image'

# django-check-seo settings
DJANGO_CHECK_SEO_SETTINGS = {
    "content_words_number": [300, 600],
    "internal_links": [1, 2],
    "external_links": [1, 2],
    "meta_description_length": [120, 160],
    "title_length": [30, 60],
    "keywords_in_title": True,
    "keywords_in_h1": True,
    "keywords_in_first_paragraph": True,
    "image_alt_tags": True,
}

# Celery configuration
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_TASK_ALWAYS_EAGER = False

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',   # keep if you have it
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # ── NEW: Wagtail redirect engine ──────────────────────────────
    'wagtail.contrib.redirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

# Media files (for Wagtail image/doc uploads)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = DEBUG
if not DEBUG:
    env_origins = os.environ.get('CORS_ALLOWED_ORIGINS', '')
    CORS_ALLOWED_ORIGINS = [s.strip() for s in env_origins.split(',') if s.strip()] if env_origins else ["http://localhost:5173"]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',),
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticatedOrReadOnly',),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Monolithic API',
    'DESCRIPTION': 'REST API endpoints for the SPA',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'