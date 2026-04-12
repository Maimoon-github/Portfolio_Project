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
