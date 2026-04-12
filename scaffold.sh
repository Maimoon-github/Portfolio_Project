#!/usr/bin/env bash
# =============================================================================
# scaffold.sh — Portfolio_Project full structure scaffolder
#
# USAGE:
#   bash scaffold.sh [PROJECT_ROOT]
#
# If PROJECT_ROOT is omitted the script runs from the current directory.
# The script is idempotent: it never overwrites a file that already exists,
# it only creates what is missing.
#
# HOW TO INJECT CONTENT:
#   Every file is written by a dedicated `write_file` call that contains a
#   heredoc labelled  ──CONTENT──  below.  To pre-fill a file, replace the
#   empty heredoc body with your real content.  The placeholder comment
#   "# @@CONTENT_PLACEHOLDER@@" marks every spot you should fill in.
# =============================================================================

set -euo pipefail

# ── helpers ──────────────────────────────────────────────────────────────────

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

info()    { echo -e "${GREEN}[CREATE]${NC}  $*"; }
skip()    { echo -e "${YELLOW}[SKIP]${NC}    $* (already exists)"; }
section() { echo -e "\n${RED}──────────────────────────────────────────${NC}"; \
            echo -e "${RED} $*${NC}"; \
            echo -e "${RED}──────────────────────────────────────────${NC}"; }

# Create directory (silent if exists)
mkd() { mkdir -p "$1"; }

# Write file only when it does not already exist.
# Usage:  write_file <path> <<'EOF'  …content…  EOF
write_file() {
  local path="$1"
  mkd "$(dirname "$path")"
  if [[ -e "$path" ]]; then
    skip "$path"
    # Still consume stdin so the heredoc doesn't leak
    cat > /dev/null
  else
    cat > "$path"
    info "$path"
  fi
}

# ── resolve project root ──────────────────────────────────────────────────────
PROJECT_ROOT="${1:-$(pwd)}"
cd "$PROJECT_ROOT"

echo -e "\n${GREEN}Scaffolding Portfolio_Project inside:${NC} $PROJECT_ROOT\n"

# =============================================================================
# 1. ROOT LEVEL
# =============================================================================
section "Root level files"

write_file "docker-compose.yml" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@version: "3.9"

services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-portfolio_db}
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
      - media_files:/app/media
    ports:
      - "8000:8000"
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.dev
      - DATABASE_URL=postgres://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-portfolio_db}
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY:-dev-secret-key-change-in-prod}
      - ALLOWED_HOSTS=localhost,127.0.0.1,backend
      - CORS_ALLOWED_ORIGINS=http://localhost:3000
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  celery:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: unless-stopped
    command: celery -A config worker --loglevel=info
    volumes:
      - ./backend:/app
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.dev
      - DATABASE_URL=postgres://${POSTGRES_USER:-postgres}:${POSTGRES_PASSWORD:-postgres}@db:5432/${POSTGRES_DB:-portfolio_db}
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=${SECRET_KEY:-dev-secret-key-change-in-prod}
    depends_on:
      - backend
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    restart: unless-stopped
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - INTERNAL_API_URL=http://backend:8000
      - REVALIDATE_SECRET=${REVALIDATE_SECRET:-dev-revalidate-secret}
    depends_on:
      - backend

volumes:
  postgres_data:
  media_files:@@

write_file "docker-compose.prod.yml" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@version: "3.9"

services:
  db:
    restart: always
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}

  backend:
    command: >
      sh -c "python manage.py migrate --noinput &&
             python manage.py collectstatic --noinput &&
             gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4 --timeout 60"
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.prod
    restart: always

  celery:
    command: celery -A config worker --loglevel=warning --concurrency=4
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.prod
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
    restart: always

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
      - media_files:/var/media:ro
    depends_on:
      - backend
      - frontend@@

write_file ".gitignore" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "Makefile" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@.PHONY: dev stop build migrate makemigrations createsuperuser shell logs backend-shell frontend-shell test lint format

# ─── Dev ───────────────────────────────────────────────────────────────
dev:
	docker compose up --build

dev-detach:
	docker compose up --build -d

stop:
	docker compose down

# ─── Django ────────────────────────────────────────────────────────────
migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

createsuperuser:
	docker compose exec backend python manage.py createsuperuser

collectstatic:
	docker compose exec backend python manage.py collectstatic --noinput

shell:
	docker compose exec backend python manage.py shell_plus

backend-shell:
	docker compose exec backend bash

# ─── Next.js ───────────────────────────────────────────────────────────
frontend-shell:
	docker compose exec frontend sh

# ─── Logs ──────────────────────────────────────────────────────────────
logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

# ─── Tests ─────────────────────────────────────────────────────────────
test-backend:
	docker compose exec backend python manage.py test --verbosity=2

test-frontend:
	docker compose exec frontend pnpm test

# ─── Code quality ──────────────────────────────────────────────────────
lint-backend:
	docker compose exec backend ruff check .

lint-frontend:
	docker compose exec frontend pnpm lint

format-backend:
	docker compose exec backend ruff format .

# ─── Database ──────────────────────────────────────────────────────────
db-reset:
	docker compose down -v
	docker compose up --build -d db
	sleep 3
	docker compose up --build -d backend
	make migrate
	make createsuperuser

# ─── OpenAPI schema ────────────────────────────────────────────────────
schema:
	docker compose exec backend python manage.py spectacular --color --file schema.yml@@

# =============================================================================
# 3. BACKEND — top-level files
# =============================================================================
section "backend/ — top-level"

mkd "backend/media"
mkd "backend/static"

write_file "backend/.env.example" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@# ─── Django ────────────────────────────────────────────────────────────
SECRET_KEY=change-this-to-a-long-random-string-in-production
DJANGO_SETTINGS_MODULE=config.settings.dev
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# ─── Database ──────────────────────────────────────────────────────────
POSTGRES_DB=portfolio_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgres://postgres:postgres@db:5432/portfolio_db

# ─── Redis ─────────────────────────────────────────────────────────────
REDIS_URL=redis://redis:6379/0

# ─── JWT ───────────────────────────────────────────────────────────────
ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7

# ─── CORS ──────────────────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS=http://localhost:3000

# ─── Wagtail ───────────────────────────────────────────────────────────
WAGTAIL_SITE_NAME=My Portfolio
WAGTAILADMIN_BASE_URL=http://localhost:8000

# ─── Email ─────────────────────────────────────────────────────────────
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@example.com

# ─── Storage (prod only) ───────────────────────────────────────────────
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_STORAGE_BUCKET_NAME=
# AWS_S3_REGION_NAME=us-east-1

# ─── Sentry (prod only) ────────────────────────────────────────────────
# SENTRY_DSN=

# ─── Next.js ───────────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:8000
INTERNAL_API_URL=http://backend:8000
REVALIDATE_SECRET=change-this-too
NEXT_PUBLIC_SITE_URL=http://localhost:3000@@

write_file "backend/Dockerfile" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# System deps for Pillow + psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    libwebp-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements/ ./requirements/
RUN pip install -r requirements/dev.txt

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]@@

write_file "backend/entrypoint.sh" <<'@@CONTENT_PLACEHOLDER@@'
#!/usr/bin/env bash
# @@CONTENT_PLACEHOLDER@@
@@#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
while ! python -c "import psycopg2; psycopg2.connect('$DATABASE_URL')" 2>/dev/null; do
  sleep 1
done
echo "PostgreSQL ready."

python manage.py migrate --noinput
exec "$@"@@
chmod +x "backend/entrypoint.sh" 2>/dev/null || true

# =============================================================================
# 4. BACKEND — requirements
# =============================================================================
section "backend/requirements/"

write_file "backend/requirements/base.txt" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@# ─── Django core ───────────────────────────────────────────────────────
Django==5.1.4
djangorestframework==3.15.2
django-cors-headers==4.4.0
dj-database-url==2.2.0
python-decouple==3.8

# ─── Wagtail CMS ───────────────────────────────────────────────────────
wagtail==6.3.1
wagtail-headless-preview==0.8.0

# ─── Auth ──────────────────────────────────────────────────────────────
djangorestframework-simplejwt==5.3.1

# ─── API docs ──────────────────────────────────────────────────────────
drf-spectacular==0.27.2

# ─── Database ──────────────────────────────────────────────────────────
psycopg2-binary==2.9.9

# ─── Cache / Queue ─────────────────────────────────────────────────────
redis==5.0.8
django-redis==5.4.0
celery==5.4.0

# ─── Images ────────────────────────────────────────────────────────────
Pillow==10.4.0
willow==1.8.0

# ─── Utilities ─────────────────────────────────────────────────────────
django-extensions==3.2.3
django-filter==24.3R@@

write_file "backend/requirements/dev.txt" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@-r base.txt

# ─── Dev tools ─────────────────────────────────────────────────────────
ipython==8.27.0
django-debug-toolbar==4.4.6
ruff==0.6.8
pytest==8.3.3
pytest-django==4.9.0
factory-boy==3.3.1@@

write_file "backend/requirements/prod.txt" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@-r base.txt

# ─── WSGI server ───────────────────────────────────────────────────────
gunicorn==23.0.0

# ─── Storage ───────────────────────────────────────────────────────────
django-storages[s3]==1.14.4
boto3==1.35.30

# ─── Monitoring ────────────────────────────────────────────────────────
sentry-sdk[django]==2.14.0

# ─── Security ──────────────────────────────────────────────────────────
django-csp==3.8@@

# =============================================================================
# 5. BACKEND — config/
# =============================================================================
section "backend/config/"

write_file "backend/config/urls.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls
from wagtail.contrib.sitemaps.views import sitemap
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

api_v1_patterns = [
    path("auth/", include("apps.accounts.urls")),
    path("tools/", include("apps.tools.urls")),
    # Wagtail headless API (blog posts, pages, etc.)
    path("wagtail/", include(wagtail_urls)),
]

urlpatterns = [
    # Django admin
    path("django-admin/", admin.site.urls),
    # Wagtail admin
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    # REST API v1
    path("api/v1/", include(api_v1_patterns)),
    # OpenAPI schema + docs (dev only gated in prod settings)
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    # Wagtail sitemap
    path("sitemap.xml", sitemap),
    # Wagtail page serving (fallback — headless mode bypasses this)
    path("", include(wagtail_urls)),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)@@

write_file "backend/config/settings/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

write_file "backend/config/settings/dev.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from .base import *  # noqa: F401, F403

DEBUG = True

INSTALLED_APPS += ["debug_toolbar"]  # noqa: F405

MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]  # noqa: F405

INTERNAL_IPS = ["127.0.0.1"]

# Relaxed CORS for local dev
CORS_ALLOW_ALL_ORIGINS = True

# Email to console
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Show SQL queries
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {"console": {"class": "logging.StreamHandler"}},
    "root": {"handlers": ["console"], "level": "INFO"},
    "loggers": {
        "django.db.backends": {
            "handlers": ["console"],
            "level": "DEBUG",
            "propagate": False,
        },
    },
}@@

write_file "backend/config/settings/prod.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from .base import *  # noqa: F401, F403
from decouple import config

DEBUG = False

# ─── Security ──────────────────────────────────────────────────────────
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# ─── S3 Storage ────────────────────────────────────────────────────────
AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = config("AWS_S3_REGION_NAME", default="us-east-1")
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
AWS_DEFAULT_ACL = "public-read"
AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"

# ─── Sentry ────────────────────────────────────────────────────────────
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.celery import CeleryIntegration

sentry_sdk.init(
    dsn=config("SENTRY_DSN", default=""),
    integrations=[DjangoIntegration(), CeleryIntegration()],
    traces_sample_rate=0.2,
    send_default_pii=False,
)

# ─── Logging ───────────────────────────────────────────────────────────
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {"format": "{levelname} {asctime} {module} {message}", "style": "{"},
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "verbose"},
    },
    "root": {"handlers": ["console"], "level": "WARNING"},
}@@

# NOTE: backend/config/settings/base.py already exists — skipped intentionally.
# Remove the guard in write_file and re-run if you want to overwrite it.

# =============================================================================
# 6. BACKEND — apps/accounts/
# =============================================================================
section "backend/apps/accounts/"

mkd "backend/apps/accounts/migrations"
write_file "backend/apps/accounts/migrations/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

# NOTE: __init__.py, apps.py, models.py already exist — only new files below.

write_file "backend/apps/accounts/models.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model using email as the primary identifier.
    No username field — email is the login credential.
    """
    email = models.EmailField(unique=True, db_index=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    # Profile fields
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-date_joined"]

    def __str__(self) -> str:
        return self.email

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip() or self.email@@

write_file "backend/apps/accounts/admin.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/accounts/managers.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email: str, password: str | None = None, **extra_fields):
        if not email:
            raise ValueError("Email address is required.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, password: str, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(email, password, **extra_fields)@@

write_file "backend/apps/accounts/serializers.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/accounts/urls.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="auth-register"),
    path("login/", views.login, name="auth-login"),
    path("logout/", views.logout, name="auth-logout"),
    path("refresh/", views.refresh_token, name="auth-refresh"),
    path("me/", views.me, name="auth-me"),
]@@

write_file "backend/apps/accounts/views.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.conf import settings
from .serializers import RegisterSerializer, UserSerializer


def _set_auth_cookies(response: Response, access: str, refresh: str) -> Response:
    """Write JWT tokens to httpOnly cookies."""
    jwt_settings = settings.SIMPLE_JWT
    response.set_cookie(
        key="access_token",
        value=access,
        max_age=int(jwt_settings["ACCESS_TOKEN_LIFETIME"].total_seconds()),
        httponly=True,
        secure=not settings.DEBUG,
        samesite="Lax",
        path="/",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh,
        max_age=int(jwt_settings["REFRESH_TOKEN_LIFETIME"].total_seconds()),
        httponly=True,
        secure=not settings.DEBUG,
        samesite="Lax",
        path="/api/v1/auth/refresh/",
    )
    return response


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    response = Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    return _set_auth_cookies(response, str(refresh.access_token), str(refresh))


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    from django.contrib.auth import authenticate
    email = request.data.get("email", "")
    password = request.data.get("password", "")
    user = authenticate(request, username=email, password=password)
    if not user:
        return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
    refresh = RefreshToken.for_user(user)
    response = Response(UserSerializer(user).data, status=status.HTTP_200_OK)
    return _set_auth_cookies(response, str(refresh.access_token), str(refresh))


@api_view(["POST"])
@permission_classes([AllowAny])
def refresh_token(request):
    token_str = request.COOKIES.get("refresh_token")
    if not token_str:
        return Response({"detail": "Refresh token missing."}, status=status.HTTP_401_UNAUTHORIZED)
    try:
        refresh = RefreshToken(token_str)
        response = Response({"detail": "Token refreshed."}, status=status.HTTP_200_OK)
        return _set_auth_cookies(response, str(refresh.access_token), str(refresh))
    except TokenError as e:
        return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    token_str = request.COOKIES.get("refresh_token")
    if token_str:
        try:
            RefreshToken(token_str).blacklist()
        except TokenError:
            pass
    response = Response({"detail": "Logged out."}, status=status.HTTP_200_OK)
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(UserSerializer(request.user).data)@@

# =============================================================================
# 7. BACKEND — apps/blog/
# =============================================================================
section "backend/apps/blog/"

mkd "backend/apps/blog/migrations"
write_file "backend/apps/blog/migrations/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/blog/serializers.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/blog/models.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.db import models
from django.utils.text import slugify
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField
from wagtail import blocks as wagtail_blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.embeds.blocks import EmbedBlock
from modelcluster.fields import ParentalManyToManyField
from taggit.models import TaggedItemBase
from modelcluster.contrib.taggit import ClusterTaggableManager
import json


class BlogIndexPage(Page):
    """
    The /blog/ landing page. Lists all BlogDetailPage children.
    Parent: RootPage. Children: BlogDetailPage.
    """
    intro = RichTextField(blank=True)
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("hero_image"),
    ]

    # Wagtail API fields — these are the fields exposed to Next.js
    api_fields = [
        APIField("intro"),
        APIField("hero_image_url", serializer=ImageRenditionField("fill-1200x600")),
    ]

    subpage_types = ["blog.BlogDetailPage"]

    class Meta:
        verbose_name = "Blog index"

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["posts"] = (
            BlogDetailPage.objects.live()
            .descendant_of(self)
            .order_by("-first_published_at")
        )
        return context


class BlogDetailPage(Page):
    """
    Individual blog post. Rendered by Next.js via ISR + Wagtail headless API.
    """
    # ─── Metadata ──────────────────────────────────────────────────
    subtitle = models.CharField(max_length=250, blank=True)
    reading_time = models.PositiveSmallIntegerField(default=5, help_text="Minutes")
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    tags = ClusterTaggableManager(through="blog.BlogPageTag", blank=True)
    category = models.CharField(max_length=100, blank=True, db_index=True)

    # ─── Body (StreamField) ────────────────────────────────────────
    body = StreamField(
        [
            ("heading", wagtail_blocks.CharBlock(form_classname="title", icon="title")),
            ("paragraph", wagtail_blocks.RichTextBlock(features=[
                "h2", "h3", "bold", "italic", "link", "ol", "ul", "blockquote", "code",
            ])),
            ("image", ImageChooserBlock()),
            ("code", wagtail_blocks.StructBlock([
                ("language", wagtail_blocks.CharBlock(default="python")),
                ("code", wagtail_blocks.TextBlock()),
            ], icon="code")),
            ("callout", wagtail_blocks.StructBlock([
                ("type", wagtail_blocks.ChoiceBlock(choices=[
                    ("info", "Info"), ("warning", "Warning"), ("tip", "Tip"),
                ])),
                ("text", wagtail_blocks.RichTextBlock()),
            ], icon="info-circle")),
            ("embed", EmbedBlock(icon="media")),
            ("raw_html", wagtail_blocks.RawHTMLBlock(icon="code", label="Raw HTML (use sparingly)")),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("subtitle"),
            FieldPanel("reading_time"),
            FieldPanel("category"),
            FieldPanel("tags"),
        ], heading="Post metadata"),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    promote_panels = Page.promote_panels  # includes seo_title, search_description

    api_fields = [
        APIField("subtitle"),
        APIField("reading_time"),
        APIField("category"),
        APIField("hero_image_thumbnail", serializer=ImageRenditionField("fill-800x400")),
        APIField("hero_image_og", serializer=ImageRenditionField("fill-1200x630")),
        APIField("body"),
        APIField("tags"),
    ]

    parent_page_types = ["blog.BlogIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Blog post"
        ordering = ["-first_published_at"]


class BlogPageTag(TaggedItemBase):
    content_object = models.ForeignKey(BlogDetailPage, on_delete=models.CASCADE, related_name="tagged_items")@@

write_file "backend/apps/blog/wagtail_hooks.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# =============================================================================
# 8. BACKEND — apps/tools/
# =============================================================================
section "backend/apps/tools/"

mkd "backend/apps/tools/migrations"
write_file "backend/apps/tools/migrations/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

mkd "backend/apps/tools/calculators"
write_file "backend/apps/tools/calculators/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/tools/calculators/financial.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@"""
Pure Python financial calculator functions.
All inputs/outputs are plain Python types — no Django, no DRF.
Fully testable in isolation.
"""
from dataclasses import dataclass
from typing import TypedDict


def compound_interest(
    principal: float,
    annual_rate: float,
    years: int,
    compounds_per_year: int = 12,
) -> dict:
    """A = P(1 + r/n)^(nt)"""
    if principal <= 0:
        raise ValueError("Principal must be positive.")
    if annual_rate < 0:
        raise ValueError("Rate cannot be negative.")
    r = annual_rate / 100
    n = compounds_per_year
    t = years
    amount = principal * (1 + r / n) ** (n * t)
    interest = amount - principal
    return {
        "final_amount": round(amount, 2),
        "interest_earned": round(interest, 2),
        "effective_annual_rate": round((1 + r / n) ** n - 1, 6),
    }


def mortgage_monthly_payment(
    loan_amount: float,
    annual_rate: float,
    loan_term_years: int,
) -> dict:
    """M = P[r(1+r)^n]/[(1+r)^n-1]"""
    if annual_rate == 0:
        monthly = loan_amount / (loan_term_years * 12)
        return {"monthly_payment": round(monthly, 2), "total_paid": round(monthly * loan_term_years * 12, 2)}
    r = (annual_rate / 100) / 12
    n = loan_term_years * 12
    monthly = loan_amount * (r * (1 + r) ** n) / ((1 + r) ** n - 1)
    total = monthly * n
    return {
        "monthly_payment": round(monthly, 2),
        "total_paid": round(total, 2),
        "total_interest": round(total - loan_amount, 2),
    }


def return_on_investment(
    initial_investment: float,
    final_value: float,
) -> dict:
    if initial_investment <= 0:
        raise ValueError("Initial investment must be positive.")
    roi = ((final_value - initial_investment) / initial_investment) * 100
    return {
        "roi_percent": round(roi, 2),
        "net_profit": round(final_value - initial_investment, 2),
    }


def loan_amortization(
    loan_amount: float,
    annual_rate: float,
    loan_term_years: int,
) -> dict:
    """Returns full amortization schedule."""
    payment_data = mortgage_monthly_payment(loan_amount, annual_rate, loan_term_years)
    monthly = payment_data["monthly_payment"]
    r = (annual_rate / 100) / 12
    balance = loan_amount
    schedule = []
    for month in range(1, loan_term_years * 12 + 1):
        interest = round(balance * r, 2)
        principal_paid = round(monthly - interest, 2)
        balance = round(balance - principal_paid, 2)
        schedule.append({
            "month": month,
            "payment": monthly,
            "principal": principal_paid,
            "interest": interest,
            "balance": max(balance, 0),
        })
    return {"schedule": schedule, **payment_data}@@

write_file "backend/apps/tools/models.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField
from wagtail import blocks as wagtail_blocks
from wagtail.images.blocks import ImageChooserBlock


class ToolCategory(models.TextChoices):
    FINANCIAL = "financial", "Financial"
    HEALTH = "health", "Health & Fitness"
    SCIENTIFIC = "scientific", "Scientific"
    PRODUCTIVITY = "productivity", "Productivity"
    OTHER = "other", "Other"


class ToolIndexPage(Page):
    """
    The /tools/ directory page.
    Children: ToolDetailPage.
    """
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("intro")]

    api_fields = [APIField("intro")]
    subpage_types = ["tools.ToolDetailPage"]

    class Meta:
        verbose_name = "Tools directory"


class ToolDetailPage(Page):
    """
    One page per calculator. Contains:
    - Wagtail-managed content (description, formula guide, use cases)
    - calculator_slug → maps to a React component on the frontend
    - category → for navigation/filtering
    """
    # ─── Tool identity ─────────────────────────────────────────────
    category = models.CharField(
        max_length=30,
        choices=ToolCategory.choices,
        default=ToolCategory.OTHER,
        db_index=True,
    )
    calculator_slug = models.SlugField(
        unique=True,
        help_text="Identifies the React calculator component (e.g. compound-interest)",
    )
    icon = models.CharField(max_length=50, blank=True, help_text="Lucide icon name")
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    is_featured = models.BooleanField(default=False, db_index=True)

    # ─── Rich content (Wagtail StreamField) ────────────────────────
    body = StreamField(
        [
            ("intro", wagtail_blocks.RichTextBlock(label="Introduction")),
            ("formula_block", wagtail_blocks.StructBlock([
                ("title", wagtail_blocks.CharBlock()),
                ("formula", wagtail_blocks.TextBlock(help_text="LaTeX or plain text")),
                ("explanation", wagtail_blocks.RichTextBlock()),
            ], label="Formula explanation")),
            ("use_cases", wagtail_blocks.ListBlock(
                wagtail_blocks.StructBlock([
                    ("title", wagtail_blocks.CharBlock()),
                    ("description", wagtail_blocks.TextBlock()),
                ]),
                label="Use cases",
            )),
            ("faq", wagtail_blocks.ListBlock(
                wagtail_blocks.StructBlock([
                    ("question", wagtail_blocks.CharBlock()),
                    ("answer", wagtail_blocks.RichTextBlock()),
                ]),
                label="FAQ",
            )),
            ("image", ImageChooserBlock()),
            ("paragraph", wagtail_blocks.RichTextBlock()),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("category"),
            FieldPanel("calculator_slug"),
            FieldPanel("icon"),
            FieldPanel("is_featured"),
        ], heading="Tool settings"),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    api_fields = [
        APIField("category"),
        APIField("calculator_slug"),
        APIField("icon"),
        APIField("is_featured"),
        APIField("body"),
        APIField("hero_image_thumbnail", serializer=ImageRenditionField("fill-800x400")),
    ]

    parent_page_types = ["tools.ToolIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Calculator tool"
        ordering = ["title"]@@

write_file "backend/apps/tools/calculators/health.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/tools/calculators/scientific.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/tools/calculators/productivity.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/tools/serializers.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/tools/urls.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.urls import path
from . import views

urlpatterns = [
    path("compute/<slug:calculator_slug>/", views.compute, name="tool-compute"),
]@@

write_file "backend/apps/tools/views.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@"""
DRF endpoint that receives calculator inputs from Next.js,
runs the pure Python calculator logic, and returns results.
This keeps all business logic server-side — never trust client-sent formulas.
"""
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.response import Response
from rest_framework import status
from .calculators import financial, health, scientific, productivity


CALCULATOR_REGISTRY: dict[str, callable] = {
    # Financial
    "compound-interest": financial.compound_interest,
    "mortgage": financial.mortgage_monthly_payment,
    "roi": financial.return_on_investment,
    "loan-amortization": financial.loan_amortization,
    # Health
    "bmi": health.bmi,
    "calories": health.daily_calories,
    "body-fat": health.body_fat_percentage,
    # Scientific
    "unit-converter": scientific.unit_convert,
    # Productivity
    "pomodoro": productivity.pomodoro_sessions,
}


@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle])
def compute(request, calculator_slug: str):
    """
    POST /api/v1/tools/compute/{calculator_slug}/
    Body: { "inputs": { ... } }
    Returns: { "result": { ... }, "metadata": { ... } }
    """
    calc_fn = CALCULATOR_REGISTRY.get(calculator_slug)
    if not calc_fn:
        return Response(
            {"detail": f"Calculator '{calculator_slug}' not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    inputs = request.data.get("inputs", {})
    if not isinstance(inputs, dict):
        return Response(
            {"detail": "inputs must be a JSON object."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        result = calc_fn(**inputs)
        return Response({"result": result, "calculator": calculator_slug})
    except TypeError as e:
        return Response({"detail": f"Invalid inputs: {e}"}, status=status.HTTP_400_BAD_REQUEST)
    except (ValueError, ZeroDivisionError) as e:
        return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)@@

write_file "backend/apps/tools/wagtail_hooks.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# =============================================================================
# 9. BACKEND — apps/pages/
# =============================================================================
section "backend/apps/pages/"

mkd "backend/apps/pages/migrations"
write_file "backend/apps/pages/migrations/__init__.py" <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

# =============================================================================
# 10. BACKEND — apps/core/
# =============================================================================
section "backend/apps/core/"

# NOTE: __init__.py, apps.py, models.py already exist.

write_file "backend/apps/core/models.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@"""
Abstract base models shared across all apps.
"""
from django.db import models


class TimeStampedModel(models.Model):
    """Adds created_at and updated_at to any model."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SEOModel(models.Model):
    """
    Mixin for pages/objects that need SEO metadata.
    For Wagtail pages, rely on Page.seo_title / search_description instead.
    Use this for DRF-served non-Wagtail objects.
    """
    meta_title = models.CharField(max_length=60, blank=True)
    meta_description = models.CharField(max_length=160, blank=True)
    og_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    class Meta:
        abstract = True@@

write_file "backend/apps/core/pagination.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class StandardResultsPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response(
            {
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": data,
            }
        )

    def get_paginated_response_schema(self, schema):
        return {
            "type": "object",
            "required": ["count", "total_pages", "results"],
            "properties": {
                "count": {"type": "integer"},
                "total_pages": {"type": "integer"},
                "next": {"type": "string", "nullable": True},
                "previous": {"type": "string", "nullable": True},
                "results": schema,
            },
        }@@

write_file "backend/apps/core/permissions.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "backend/apps/core/renderers.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# =============================================================================
# 11. FRONTEND — public/
# =============================================================================
section "frontend/public/ sub-folders"

mkd "frontend/public/fonts"
mkd "frontend/public/icons"
mkd "frontend/public/images"

# Add placeholder READMEs so git tracks the empty directories
write_file "frontend/public/fonts/.gitkeep"   <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@
write_file "frontend/public/icons/.gitkeep"   <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@
write_file "frontend/public/images/.gitkeep"  <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

write_file "frontend/next.config.ts" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from Django/Wagtail backend and S3
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Proxy /api/backend/* to Django to avoid CORS in browser during dev
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${process.env.INTERNAL_API_URL ?? "http://localhost:8000"}/api/v1/:path*`,
      },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Experimental: use React 19 + PPR when available
  experimental: {
    ppr: false,
  },

  // Needed for shadcn/ui SVG imports
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;@@

# =============================================================================
# 12. FRONTEND — src/app/ route groups
# =============================================================================
section "frontend/src/app/ — route groups"

# (marketing)
mkd "frontend/src/app/(marketing)/about"
mkd "frontend/src/app/(marketing)/contact"

write_file "frontend/src/app/globals.css" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* shadcn/ui neutral palette — swap hsl values to rebrand */
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;
    --primary: 220.9 39.3% 11%;
    --primary-foreground: 210 20% 98%;
    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;
    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;
    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 224 71.4% 4.1%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;
    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;
    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;
    --primary: 210 20% 98%;
    --primary-foreground: 220.9 39.3% 11%;
    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;
    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;
    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;
    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 216 12.2% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Focus ring — accessible but not distracting */
  :focus-visible {
    @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
  }
}

@layer utilities {
  /* Prose container for blog/tools rich text */
  .prose-content {
    @apply prose prose-neutral dark:prose-invert max-w-none;
  }

  /* Wagtail rich text image centering */
  .rich-text img {
    @apply mx-auto rounded-lg;
  }

  /* Calculator result fade-in */
  .calc-result {
    @apply animate-fade-in;
  }

  /* Skip to content — accessibility */
  .skip-nav {
    @apply sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
           focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground;
  }
}@@

write_file "frontend/src/app/layout.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils/cn";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com"
  ),
  title: {
    template: "%s | Portfolio",
    default: "Portfolio — Professional Tools & Insights",
  },
  description:
    "Free online calculators, in-depth technical blog posts, and professional resources.",
  keywords: ["calculators", "tools", "blog", "finance", "health", "productivity"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Portfolio",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable)}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Toast notifications */}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}@@

write_file "frontend/src/app/(marketing)/layout.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(marketing)/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(marketing)/about/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(marketing)/contact/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# (blog)
mkd "frontend/src/app/(blog)/blog/[slug]"
mkd "frontend/src/app/(blog)/blog/category/[category]"

write_file "frontend/src/app/(blog)/layout.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(blog)/blog/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(blog)/blog/[slug]/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(blog)/blog/category/[category]/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# (tools)
mkd "frontend/src/app/(tools)/tools/[category]/[slug]"

write_file "frontend/src/app/(tools)/layout.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(tools)/tools/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(tools)/tools/[category]/[slug]/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# (auth)
mkd "frontend/src/app/(auth)/login"
mkd "frontend/src/app/(auth)/register"

write_file "frontend/src/app/(auth)/layout.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(auth)/login/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/(auth)/register/page.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# api route handlers
mkd "frontend/src/app/api/auth/login"
mkd "frontend/src/app/api/auth/logout"
mkd "frontend/src/app/api/auth/refresh"
mkd "frontend/src/app/api/revalidate"

write_file "frontend/src/app/api/auth/login/route.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@/**
 * Next.js proxy for the Django login endpoint.
 * Receives credentials from the login form, forwards to Django,
 * and passes the httpOnly cookie back to the browser.
 * The browser never directly talks to Django for auth.
 */
import { NextRequest, NextResponse } from "next/server";

const INTERNAL_API = process.env.INTERNAL_API_URL ?? "http://localhost:8000";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const djangoResponse = await fetch(`${INTERNAL_API}/api/v1/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await djangoResponse.json();

  if (!djangoResponse.ok) {
    return NextResponse.json(data, { status: djangoResponse.status });
  }

  // Forward Set-Cookie headers from Django to the browser
  const response = NextResponse.json(data, { status: djangoResponse.status });
  djangoResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      response.headers.append("Set-Cookie", value);
    }
  });

  return response;
}@@

write_file "frontend/src/app/api/auth/logout/route.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/api/auth/refresh/route.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/api/revalidate/route.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@/**
 * On-demand ISR revalidation endpoint.
 * Called by Wagtail's publish webhook → revalidates only the affected cache tags.
 *
 * Wagtail hook setup (backend/apps/blog/wagtail_hooks.py):
 *   @hooks.register("after_publish_page")
 *   def notify_nextjs(request, page):
 *       requests.post(NEXT_REVALIDATE_URL, json={"secret": SECRET, "tags": [f"blog-post-{page.slug}"]})
 */
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || body.secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token." }, { status: 401 });
  }

  const tags: string[] = body.tags ?? [];

  if (!tags.length) {
    return NextResponse.json({ message: "No tags provided." }, { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({
    revalidated: true,
    tags,
    timestamp: new Date().toISOString(),
  });
}@@

# root app files
write_file "frontend/src/app/error.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/not-found.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/loading.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/app/robots.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/django-admin/", "/admin/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}@@

write_file "frontend/src/app/sitemap.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/api/blog";
import { getAllToolSlugs } from "@/lib/api/tools";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, toolSlugs] = await Promise.all([
    getAllBlogSlugs(),
    getAllToolSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map(({ category, slug }) => ({
    url: `${siteUrl}/tools/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...blogPages, ...toolPages];
}@@

# =============================================================================
# 13. FRONTEND — src/components/
# =============================================================================
section "frontend/src/components/"

# ui (shadcn — auto-generated)
mkd "frontend/src/components/ui"
for f in button card input badge; do
  write_file "frontend/src/components/ui/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# layout
mkd "frontend/src/components/layout"
for f in Header Footer Nav MobileMenu; do
  write_file "frontend/src/components/layout/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# blog
mkd "frontend/src/components/blog"
for f in PostCard PostGrid PostHeader RichText StreamField; do
  write_file "frontend/src/components/blog/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# tools
mkd "frontend/src/components/tools/financial"
mkd "frontend/src/components/tools/health"
mkd "frontend/src/components/tools/scientific"
mkd "frontend/src/components/tools/productivity"

for f in ToolCard ToolGrid CalculatorShell; do
  write_file "frontend/src/components/tools/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

for f in CompoundInterest MortgageCalc ROICalc; do
  write_file "frontend/src/components/tools/financial/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

for f in BMICalc CalorieCalc; do
  write_file "frontend/src/components/tools/health/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

write_file "frontend/src/components/tools/scientific/UnitConverter.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/src/components/tools/productivity/PomodoroCalc.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

# marketing
mkd "frontend/src/components/marketing"
for f in Hero FeatureGrid CTABanner; do
  write_file "frontend/src/components/marketing/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# shared
mkd "frontend/src/components/shared"
for f in SEOHead Breadcrumb Pagination StructuredData; do
  write_file "frontend/src/components/shared/${f}.tsx" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# =============================================================================
# 14. FRONTEND — src/lib/
# =============================================================================
section "frontend/src/lib/"

mkd "frontend/src/lib/api"
for f in client blog tools pages types; do
  write_file "frontend/src/lib/api/${f}.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

mkd "frontend/src/lib/auth"
for f in session actions; do
  write_file "frontend/src/lib/auth/${f}.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

mkd "frontend/src/lib/hooks"
for f in useCalculator useDebounce useLocalStorage; do
  write_file "frontend/src/lib/hooks/${f}.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

mkd "frontend/src/lib/utils"
for f in cn seo format constants; do
  write_file "frontend/src/lib/utils/${f}.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# =============================================================================
# 15. FRONTEND — src/types/
# =============================================================================
section "frontend/src/types/"

mkd "frontend/src/types"
for f in blog tools wagtail index; do
  write_file "frontend/src/types/${f}.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@
done

# =============================================================================
# 16. FRONTEND — src/middleware + root config files
# =============================================================================
section "frontend/src/ + root config files"

write_file "frontend/src/middleware.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const PROTECTED_PATHS = ["/dashboard", "/profile", "/settings"];

// Routes that should redirect to dashboard if already authenticated
const AUTH_PATHS = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const isAuthenticated = Boolean(accessToken);

  // Redirect authenticated users away from auth pages
  if (AUTH_PATHS.some((p) => pathname.startsWith(p)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect private routes
  if (PROTECTED_PATHS.some((p) => pathname.startsWith(p)) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, fonts, icons)
     * - API routes
     */
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|icons|api/).*)",
  ],
};@@

write_file "frontend/.env.local.example" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@CONTENT_PLACEHOLDER@@

write_file "frontend/.eslintrc.json" <<'@@CONTENT_PLACEHOLDER@@'
@@CONTENT_PLACEHOLDER@@

write_file "frontend/components.json" <<'@@CONTENT_PLACEHOLDER@@'
@@{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils/cn",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/lib/hooks"
  }
}@@

write_file "frontend/tailwind.config.ts" <<'@@CONTENT_PLACEHOLDER@@'
// @@CONTENT_PLACEHOLDER@@
@@import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-code": "hsl(var(--foreground))",
            maxWidth: "none",
          },
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;@@

# =============================================================================
# DONE
# =============================================================================
echo -e "\n${GREEN}✔  Scaffold complete.${NC}"
echo -e "   Search for  ${YELLOW}@@CONTENT_PLACEHOLDER@@${NC}  to find every spot that needs real content.\n"
