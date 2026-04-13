@AGENTS.md


Let me build this complete production architecture. I'll start with the stack diagram, then deliver every artifact.

![1775986830570](image/CLAUDE/1775986830570.png)

---

# GODMODE · L99 · OODA · ARTIFACTS

## Section 1 — Final Complete Monorepo Hierarchy

```
Portfolio_Project/                        ← monorepo root
├── .github/
│   └── workflows/
│       ├── ci.yml                        ← lint + test on every PR
│       └── deploy.yml                    ← prod deploy trigger
├── backend/
│   ├── apps/
│   │   ├── accounts/                     ← custom user model + JWT auth
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
│   │   │   ├── managers.py
│   │   │   ├── models.py                 ← AbstractBaseUser
│   │   │   ├── serializers.py
│   │   │   ├── urls.py
│   │   │   └── views.py                  ← JWT obtain/refresh/verify
│   │   ├── blog/                         ← Wagtail blog pages
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   ├── models.py                 ← BlogIndexPage, BlogDetailPage
│   │   │   ├── serializers.py
│   │   │   └── wagtail_hooks.py
│   │   ├── tools/                        ← calculator tool pages
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   ├── models.py                 ← ToolIndexPage, ToolDetailPage
│   │   │   ├── serializers.py
│   │   │   └── wagtail_hooks.py
│   │   ├── pages/                        ← static Wagtail pages
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   └── models.py                 ← HomePage, AboutPage, ContactPage
│   │   └── core/                         ← shared mixins, base models, utils
│   │       ├── __init__.py
│   │       ├── models.py                 ← TimeStampedModel, SEOModel
│   │       ├── pagination.py
│   │       ├── permissions.py
│   │       └── renderers.py
│   ├── config/
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                   ← all shared settings
│   │   │   ├── dev.py                    ← DEBUG=True, sqlite fallback allowed
│   │   │   └── prod.py                   ← security headers, S3, Sentry
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── urls.py                       ← root URL config
│   │   └── wsgi.py
│   ├── media/                            ← local dev media uploads
│   ├── static/                           ← collected static (prod only)
│   ├── requirements/
│   │   ├── base.txt
│   │   ├── dev.txt
│   │   └── prod.txt
│   ├── .env.example
│   ├── Dockerfile
│   ├── entrypoint.sh
│   └── manage.py
├── frontend/
│   ├── public/
│   │   ├── fonts/                        ← self-hosted WOFF2
│   │   ├── icons/                        ← favicon variants, apple-touch-icon
│   │   └── images/                       ← og-default.jpg, logo.svg
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/              ← route group: no shared prefix
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx              ← homepage (SSG)
│   │   │   │   ├── about/page.tsx
│   │   │   │   └── contact/page.tsx
│   │   │   ├── (blog)/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── blog/
│   │   │   │       ├── page.tsx          ← listing (ISR 60s)
│   │   │   │       ├── [slug]/
│   │   │   │       │   └── page.tsx      ← post (ISR 60s + generateStaticParams)
│   │   │   │       └── category/
│   │   │   │           └── [category]/page.tsx
│   │   │   ├── (tools)/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── tool/
│   │   │   │       ├── page.tsx          ← listing (ISR 60s)
│   │   │   │       ├── [slug]/
│   │   │   │       │   └── page.tsx      ← post (ISR 60s + generateStaticParams)
│   │   │   │       └── category/
│   │   │   │           └── [category]/page.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── api/                      ← Next.js Route Handlers (proxy)
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/route.ts
│   │   │   │   │   ├── logout/route.ts
│   │   │   │   │   └── refresh/route.ts
│   │   │   │   └── revalidate/route.ts   ← Wagtail webhook → on-demand ISR
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx                ← root layout + providers
│   │   │   ├── robots.ts
│   │   │   └── sitemap.ts                ← dynamic sitemap from Wagtail API
│   │   ├── components/
│   │   │   ├── ui/                       ← shadcn/ui (auto-generated, do not edit)
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   └── ...
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Nav.tsx
│   │   │   │   └── MobileMenu.tsx
│   │   │   ├── blog/
│   │   │   │   ├── PostCard.tsx
│   │   │   │   ├── PostGrid.tsx
│   │   │   │   ├── PostHeader.tsx
│   │   │   │   ├── RichText.tsx          ← Wagtail rich-text renderer
│   │   │   │   └── StreamField.tsx       ← block renderer
│   │   │   ├── tools/
│   │   │   │   ├── ToolCard.tsx
│   │   │   │   ├── ToolGrid.tsx
│   │   │   │   ├── CalculatorShell.tsx   ← shared wrapper (input + result)
│   │   │   ├── marketing/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── FeatureGrid.tsx
│   │   │   │   └── CTABanner.tsx
│   │   │   └── shared/
│   │   │       ├── SEOHead.tsx           ← metadata helpers
│   │   │       ├── Breadcrumb.tsx
│   │   │       ├── Pagination.tsx
│   │   │       └── StructuredData.tsx    ← JSON-LD
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   ├── client.ts             ← base fetch wrapper (cache + revalidate)
│   │   │   │   ├── blog.ts               ← getBlogPosts, getBlogPost, getCategories
│   │   │   │   ├── tools.ts              ← getTools, getTool, computeTool
│   │   │   │   ├── pages.ts              ← getWagtailPage, getPageBySlug
│   │   │   │   └── types.ts              ← all API response types
│   │   │   ├── auth/
│   │   │   │   ├── session.ts            ← read/write httpOnly cookie (server)
│   │   │   │   └── actions.ts            ← Server Actions: login, logout, register
│   │   │   ├── hooks/
│   │   │   │   ├── useCalculator.ts      ← debounced compute via SWR mutation
│   │   │   │   ├── useDebounce.ts
│   │   │   │   └── useLocalStorage.ts
│   │   │   └── utils/
│   │   │       ├── cn.ts                 ← clsx + tailwind-merge
│   │   │       ├── seo.ts                ← generateMetadata helpers
│   │   │       ├── format.ts             ← currency, number, date formatters
│   │   │       └── constants.ts
│   │   ├── types/
│   │   │   ├── blog.ts
│   │   │   ├── tools.ts
│   │   │   ├── wagtail.ts
│   │   │   └── index.ts
│   │   └── middleware.ts                 ← JWT check + route protection
│   ├── .env.local.example
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── README.md
│   ├── components.json                   ← shadcn/ui config
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── docker-compose.yml                    ← dev stack
├── docker-compose.prod.yml               ← prod overrides
├── .env.example                          ← root env template
├── .gitignore
├── Makefile                              ← dev shortcuts
├── package.json                          ← monorepo scripts
└── README.md
```

---

## Section 2 — Key Improvements & Strategic Decisions (OODA)

| Area | Old State | New State | Rationale |
|---|---|---|---|
| Settings | Single `base.py` | `base.py` + `dev.py` + `prod.py` | Prod security headers, S3, Sentry never leak into dev |
| Apps | Empty `apps/` dir | 5 focused Django apps | Separation of concerns; Wagtail pages isolated from auth/tools |
| Requirements | None | `base/dev/prod.txt` split | `pip install -r requirements/dev.txt` includes base automatically via `-r base.txt` |
| Auth | None | Custom `AbstractBaseUser` + SimpleJWT + httpOnly cookies | Email-first login; tokens never in `localStorage`; CSRF-safe |
| Blog | None | Wagtail `BlogIndexPage` + `BlogDetailPage` + `StreamField` | Drag-and-drop CMS editing; versioning; scheduled publishing |
| Tools | None | Wagtail `ToolDetailPage` + pure-Python calculator modules + DRF compute endpoint | CMS-managed content + API-driven calc logic = zero code deploys for content changes |
| Frontend routing | `src/app/page.tsx` only | Route groups `(marketing)` `(blog)` `(tools)` `(auth)` | Isolated layouts per section; no naming collisions; Next.js 15 App Router best practice |
| Data fetching | None | `lib/api/client.ts` base fetch with `next: { revalidate, tags }` | Typed, cache-tagged, revalidatable from Wagtail webhook |
| ISR revalidation | None | `/api/revalidate/route.ts` + Wagtail publish hook | Content editor hits publish → Next.js revalidates only affected page tags |
| SEO | None | `sitemap.ts` (dynamic from API) + `robots.ts` + `StructuredData.tsx` (JSON-LD) + per-page `generateMetadata` | Complete technical SEO out of the box |
| Auth middleware | None | `middleware.ts` protects `/dashboard` + refreshes token silently | Zero-effort route protection; token refresh transparent to users |
| Docker | None | Full `docker-compose.yml` with postgres + redis + celery + nginx | One-command dev environment |
| Monorepo | Two separate dirs | Root `package.json` with `workspaces` + `Makefile` | `make dev` starts everything; consistent tooling |
| Type safety | None | `lib/api/types.ts` hand-crafted types aligned with DRF serializers (can later be generated via `openapi-typescript`) | End-to-end type safety without complex codegen setup to start |
| Calculator UX | None | `CalculatorShell.tsx` + `useCalculator` hook (debounced SWR mutation) | Every calculator gets loading/error/result states for free |

---

## Section 3 — All Critical Files as Artifacts

---

```filename: docker-compose.yml
version: "3.9"

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
  media_files:
```

---

```filename: docker-compose.prod.yml
version: "3.9"

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
      - frontend
```

---

```filename: Makefile
.PHONY: dev stop build migrate makemigrations createsuperuser shell logs backend-shell frontend-shell test lint format

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
	docker compose exec backend python manage.py spectacular --color --file schema.yml
```

---

```filename: .env.example
# ─── Django ────────────────────────────────────────────────────────────
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
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

```filename: backend/Dockerfile
FROM python:3.12-slim

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
ENTRYPOINT ["/entrypoint.sh"]
```

---

```filename: backend/entrypoint.sh
#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
while ! python -c "import psycopg2; psycopg2.connect('$DATABASE_URL')" 2>/dev/null; do
  sleep 1
done
echo "PostgreSQL ready."

python manage.py migrate --noinput
exec "$@"
```

---

```filename: backend/requirements/base.txt
# ─── Django core ───────────────────────────────────────────────────────
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
django-filter==24.3
```

---

```filename: backend/requirements/dev.txt
-r base.txt

# ─── Dev tools ─────────────────────────────────────────────────────────
ipython==8.27.0
django-debug-toolbar==4.4.6
ruff==0.6.8
pytest==8.3.3
pytest-django==4.9.0
factory-boy==3.3.1
```

---

```filename: backend/requirements/prod.txt
-r base.txt

# ─── WSGI server ───────────────────────────────────────────────────────
gunicorn==23.0.0

# ─── Storage ───────────────────────────────────────────────────────────
django-storages[s3]==1.14.4
boto3==1.35.30

# ─── Monitoring ────────────────────────────────────────────────────────
sentry-sdk[django]==2.14.0

# ─── Security ──────────────────────────────────────────────────────────
django-csp==3.8
```

---

```filename: backend/config/settings/base.py
"""
Base settings shared across all environments.
Uses python-decouple for env var management.
"""
from pathlib import Path
from datetime import timedelta
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG", default=False, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost", cast=Csv())

# ─── Applications ──────────────────────────────────────────────────────
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",
]

WAGTAIL_APPS = [
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.contrib.settings",
    "wagtail.contrib.sitemaps",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail.admin",
    "wagtail",
    "modelcluster",
    "taggit",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "drf_spectacular",
    "django_filters",
    "django_extensions",
]

LOCAL_APPS = [
    "apps.core",
    "apps.accounts",
    "apps.pages",
    "apps.blog",
    "apps.tools",
]

INSTALLED_APPS = DJANGO_APPS + WAGTAIL_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# ─── Middleware ────────────────────────────────────────────────────────
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# ─── Database ──────────────────────────────────────────────────────────
import dj_database_url

DATABASES = {
    "default": dj_database_url.config(
        default=config("DATABASE_URL", default=f"sqlite:///{BASE_DIR}/db.sqlite3"),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# ─── Cache ─────────────────────────────────────────────────────────────
REDIS_URL = config("REDIS_URL", default="redis://localhost:6379/0")

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": REDIS_URL,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"

# ─── Auth ──────────────────────────────────────────────────────────────
AUTH_USER_MODEL = "accounts.User"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ─── DRF ───────────────────────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "apps.core.pagination.StandardResultsPagination",
    "PAGE_SIZE": 12,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# ─── JWT ───────────────────────────────────────────────────────────────
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(
        minutes=config("ACCESS_TOKEN_LIFETIME_MINUTES", default=60, cast=int)
    ),
    "REFRESH_TOKEN_LIFETIME": timedelta(
        days=config("REFRESH_TOKEN_LIFETIME_DAYS", default=7, cast=int)
    ),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": True,
    "ALGORITHM": "HS256",
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_COOKIE": "access_token",
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_SAMESITE": "Lax",
}

# ─── CORS ──────────────────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", default="http://localhost:3000", cast=Csv())
CORS_ALLOW_CREDENTIALS = True

# ─── OpenAPI ───────────────────────────────────────────────────────────
SPECTACULAR_SETTINGS = {
    "TITLE": "Portfolio API",
    "DESCRIPTION": "API for the professional portfolio + blog + tools website.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
}

# ─── Celery ────────────────────────────────────────────────────────────
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "UTC"

# ─── Static & Media ────────────────────────────────────────────────────
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"
STATICFILES_DIRS = [BASE_DIR / "staticfiles"]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ─── Wagtail ───────────────────────────────────────────────────────────
WAGTAIL_SITE_NAME = config("WAGTAIL_SITE_NAME", default="Portfolio")
WAGTAILADMIN_BASE_URL = config("WAGTAILADMIN_BASE_URL", default="http://localhost:8000")
WAGTAILIMAGES_IMAGE_MODEL = "wagtailimages.Image"
WAGTAIL_ENABLE_UPDATE_CHECK = False

# Enable headless/API mode
WAGTAILAPI_BASE_URL = config("WAGTAILADMIN_BASE_URL", default="http://localhost:8000")
WAGTAIL_HEADLESS_PREVIEW = {
    "CLIENT_URLS": {
        "default": config("NEXT_PUBLIC_SITE_URL", default="http://localhost:3000"),
    }
}

# ─── Email ─────────────────────────────────────────────────────────────
EMAIL_BACKEND = config(
    "EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",
)
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL", default="noreply@example.com")

# ─── Internationalisation ──────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
```

---

```filename: backend/config/settings/dev.py
from .base import *  # noqa: F401, F403

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
}
```

---

```filename: backend/config/settings/prod.py
from .base import *  # noqa: F401, F403
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
}
```

---

```filename: backend/config/urls.py
from django.conf import settings
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
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

---

```filename: backend/apps/core/models.py
"""
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
        abstract = True
```

---

```filename: backend/apps/core/pagination.py
from rest_framework.pagination import PageNumberPagination
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
        }
```

---

```filename: backend/apps/accounts/models.py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
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
        return f"{self.first_name} {self.last_name}".strip() or self.email
```

---

```filename: backend/apps/accounts/managers.py
from django.contrib.auth.base_user import BaseUserManager


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
        return self.create_user(email, password, **extra_fields)
```

---

```filename: backend/apps/accounts/views.py
from rest_framework import status
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
    return Response(UserSerializer(request.user).data)
```

---

```filename: backend/apps/accounts/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="auth-register"),
    path("login/", views.login, name="auth-login"),
    path("logout/", views.logout, name="auth-logout"),
    path("refresh/", views.refresh_token, name="auth-refresh"),
    path("me/", views.me, name="auth-me"),
]
```

---

```filename: backend/apps/blog/models.py
from django.db import models
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
    content_object = models.ForeignKey(BlogDetailPage, on_delete=models.CASCADE, related_name="tagged_items")
```

---

```filename: backend/apps/tools/models.py
from django.db import models
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
        ordering = ["title"]
```

---

```filename: backend/apps/tools/views.py
"""
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
        return Response({"detail": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

---

```filename: backend/apps/tools/calculators/financial.py
"""
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
    return {"schedule": schedule, **payment_data}
```

---

```filename: backend/apps/tools/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("compute/<slug:calculator_slug>/", views.compute, name="tool-compute"),
]
```

---

```filename: frontend/package.json
{
  "name": "portfolio-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "gen:types": "openapi-typescript http://localhost:8000/api/schema/ -o src/types/api.generated.ts"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "swr": "^2.2.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "framer-motion": "^11.5.0",
    "lucide-react": "^0.446.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-tooltip": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-separator": "^1.1.0",
    "sonner": "^1.5.0",
    "recharts": "^2.12.7",
    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^3.4.12",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.1.0",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.6",
    "vitest": "^2.1.0",
    "@vitejs/plugin-react": "^4.3.1",
    "openapi-typescript": "^7.3.0"
  }
}
```

---

```filename: frontend/next.config.ts
import type { NextConfig } from "next";

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

export default nextConfig;
```

---

```filename: frontend/tailwind.config.ts
import type { Config } from "tailwindcss";
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

export default config;
```

---

```filename: frontend/src/app/globals.css
@tailwind base;
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
}
```

---

```filename: frontend/src/app/layout.tsx
import type { Metadata, Viewport } from "next";
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
}
```

---

```filename: frontend/src/lib/api/client.ts
/**
 * Base API client for all Django/Wagtail requests.
 *
 * Design decisions:
 * - INTERNAL_API_URL used for server-side fetches (no network hop via browser)
 * - NEXT_PUBLIC_API_URL used client-side (goes through browser network)
 * - next.revalidate + next.tags enable fine-grained ISR cache invalidation
 * - All errors throw ApiError with status code — callers can handle 404 vs 500 differently
 */

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

type FetchOptions = RequestInit & {
  /** ISR revalidation in seconds. 0 = no cache. false = cache forever. */
  revalidate?: number | false;
  /** Cache tags for on-demand revalidation via /api/revalidate */
  tags?: string[];
};

function getBaseUrl(): string {
  // Server-side: use internal Docker network URL (fast, no public internet hop)
  if (typeof window === "undefined") {
    return process.env.INTERNAL_API_URL ?? "http://localhost:8000";
  }
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;

  const url = `${getBaseUrl()}/api/v1${path}`;

  const nextOptions: RequestInit["next"] = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags?.length) nextOptions.tags = tags;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...fetchOptions.headers,
    },
    ...fetchOptions,
    ...(Object.keys(nextOptions).length ? { next: nextOptions } : {}),
  });

  if (!response.ok) {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    throw new ApiError(response.status, response.statusText, data);
  }

  // 204 No Content
  if (response.status === 204) return null as T;

  return response.json() as Promise<T>;
}

/** Wagtail Pages API base fetcher */
export async function wagtailFetch<T = unknown>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;
  const baseUrl = typeof window === "undefined"
    ? (process.env.INTERNAL_API_URL ?? "http://localhost:8000")
    : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000");

  const url = `${baseUrl}${path}`;

  const nextOptions: RequestInit["next"] = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags?.length) nextOptions.tags = tags;

  const response = await fetch(url, {
    headers: { Accept: "application/json", ...fetchOptions.headers },
    ...fetchOptions,
    ...(Object.keys(nextOptions).length ? { next: nextOptions } : {}),
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return response.json() as Promise<T>;
}
```

---

```filename: frontend/src/lib/api/types.ts
/**
 * API response types — mirrors Django/DRF serializers + Wagtail API fields.
 * Keep in sync with backend serializers.
 * Future: generate automatically with `pnpm gen:types` via openapi-typescript.
 */

// ─── Pagination ────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  count: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─── Wagtail base ──────────────────────────────────────────────────────
export interface WagtailPage {
  id: number;
  title: string;
  slug: string;
  full_url: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    first_published_at: string | null;
  };
}

export interface WagtailImage {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
}

// ─── Blog ──────────────────────────────────────────────────────────────
export interface BlogPost extends WagtailPage {
  subtitle: string;
  reading_time: number;
  category: string;
  hero_image_thumbnail: WagtailImage | null;
  hero_image_og: WagtailImage | null;
  body: StreamFieldBlock[];
  tags: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// ─── Stream Field ──────────────────────────────────────────────────────
export type StreamFieldBlock =
  | { type: "heading"; value: string; id: string }
  | { type: "paragraph"; value: string; id: string }
  | { type: "image"; value: WagtailImage; id: string }
  | { type: "code"; value: { language: string; code: string }; id: string }
  | { type: "callout"; value: { type: "info" | "warning" | "tip"; text: string }; id: string }
  | { type: "embed"; value: { url: string; html: string }; id: string };

// ─── Tools ─────────────────────────────────────────────────────────────
export type ToolCategory =
  | "financial"
  | "health"
  | "scientific"
  | "productivity"
  | "other";

export interface Tool extends WagtailPage {
  category: ToolCategory;
  calculator_slug: string;
  icon: string;
  is_featured: boolean;
  body: StreamFieldBlock[];
  hero_image_thumbnail: WagtailImage | null;
}

// ─── Auth ──────────────────────────────────────────────────────────────
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  bio: string;
  avatar: string | null;
  date_joined: string;
}

// ─── Calculator ────────────────────────────────────────────────────────
export interface CalculatorResponse<T = Record<string, number | string>> {
  result: T;
  calculator: string;
}

export interface CompoundInterestResult {
  final_amount: number;
  interest_earned: number;
  effective_annual_rate: number;
}

export interface MortgageResult {
  monthly_payment: number;
  total_paid: number;
  total_interest: number;
}
```

---

```filename: frontend/src/lib/api/blog.ts
import { wagtailFetch } from "./client";
import type { BlogPost, PaginatedResponse } from "./types";

const BLOG_REVALIDATE = 60; // seconds — ISR

export async function getBlogPosts(params?: {
  page?: number;
  page_size?: number;
  category?: string;
  search?: string;
}): Promise<PaginatedResponse<BlogPost>> {
  const query = new URLSearchParams();
  query.set("type", "blog.BlogDetailPage");
  query.set("fields", "subtitle,reading_time,category,hero_image_thumbnail,tags");
  query.set("order", "-first_published_at");

  if (params?.page) query.set("p", String(params.page));
  if (params?.page_size) query.set("page_size", String(params.page_size));
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);

  return wagtailFetch<PaginatedResponse<BlogPost>>(
    `/api/v2/pages/?${query.toString()}`,
    {
      revalidate: BLOG_REVALIDATE,
      tags: ["blog-posts"],
    }
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const data = await wagtailFetch<PaginatedResponse<BlogPost>>(
      `/api/v2/pages/?type=blog.BlogDetailPage&slug=${slug}&fields=*`,
      {
        revalidate: BLOG_REVALIDATE,
        tags: [`blog-post-${slug}`],
      }
    );
    return data.results[0] ?? null;
  } catch {
    return null;
  }
}

/** Used by generateStaticParams to pre-build all blog post pages at build time */
export async function getAllBlogSlugs(): Promise<string[]> {
  const data = await wagtailFetch<PaginatedResponse<BlogPost>>(
    "/api/v2/pages/?type=blog.BlogDetailPage&fields=slug&page_size=1000",
    { revalidate: false } // Cache forever at build time; revalidated on publish
  );
  return data.results.map((p) => p.meta.slug);
}
```

---

```filename: frontend/src/lib/api/tools.ts
import { wagtailFetch, apiFetch } from "./client";
import type { Tool, PaginatedResponse, CalculatorResponse } from "./types";

const TOOLS_REVALIDATE = false; // Tools pages change rarely — cache indefinitely

export async function getTools(params?: {
  category?: string;
  featured?: boolean;
  page_size?: number;
}): Promise<PaginatedResponse<Tool>> {
  const query = new URLSearchParams();
  query.set("type", "tools.ToolDetailPage");
  query.set("fields", "category,calculator_slug,icon,is_featured,hero_image_thumbnail");
  query.set("order", "title");

  if (params?.category) query.set("category", params.category);
  if (params?.featured) query.set("is_featured", "true");
  if (params?.page_size) query.set("page_size", String(params.page_size));

  return wagtailFetch<PaginatedResponse<Tool>>(
    `/api/v2/pages/?${query.toString()}`,
    { revalidate: 3600, tags: ["tools"] }
  );
}

export async function getTool(slug: string): Promise<Tool | null> {
  try {
    const data = await wagtailFetch<PaginatedResponse<Tool>>(
      `/api/v2/pages/?type=tools.ToolDetailPage&slug=${slug}&fields=*`,
      {
        revalidate: TOOLS_REVALIDATE,
        tags: [`tool-${slug}`],
      }
    );
    return data.results[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllToolSlugs(): Promise
  { category: string; slug: string }[]
> {
  const data = await wagtailFetch<PaginatedResponse<Tool>>(
    "/api/v2/pages/?type=tools.ToolDetailPage&fields=category,slug&page_size=1000",
    { revalidate: false }
  );
  return data.results.map((t) => ({
    category: t.category,
    slug: t.meta.slug,
  }));
}

/**
 * Call the Django compute endpoint.
 * Called client-side via SWR mutation or server-side in RSC.
 */
export async function computeCalculator<T = Record<string, number>>(
  calculatorSlug: string,
  inputs: Record<string, number | string>
): Promise<CalculatorResponse<T>> {
  return apiFetch<CalculatorResponse<T>>(
    `/tools/compute/${calculatorSlug}/`,
    {
      method: "POST",
      body: JSON.stringify({ inputs }),
    }
  );
}
```

---

```filename: frontend/src/lib/hooks/useCalculator.ts
/**
 * Generic hook for all calculator components.
 * Debounces input changes, calls the backend compute endpoint,
 * and returns loading / error / result states.
 *
 * Usage:
 *   const { result, isLoading, error } = useCalculator("compound-interest", inputs);
 */
"use client";

import useSWR from "swr";
import { useDebounce } from "./useDebounce";
import { computeCalculator } from "@/lib/api/tools";

export function useCalculator<T = Record<string, number>>(
  calculatorSlug: string,
  inputs: Record<string, number | string>,
  debounceMs = 400
) {
  const debouncedInputs = useDebounce(inputs, debounceMs);

  // Only fetch if all required inputs have values
  const hasInputs = Object.values(debouncedInputs).every(
    (v) => v !== "" && v !== undefined && v !== null
  );

  const key = hasInputs
    ? [calculatorSlug, JSON.stringify(debouncedInputs)]
    : null;

  const { data, error, isLoading, isValidating } = useSWR<{ result: T }>(
    key,
    () => computeCalculator<T>(calculatorSlug, debouncedInputs),
    {
      revalidateOnFocus: false,
      dedupingInterval: 200,
      shouldRetryOnError: false,
    }
  );

  return {
    result: data?.result ?? null,
    isLoading: isLoading || isValidating,
    error: error
      ? (error?.data?.detail ?? "Calculation failed. Check your inputs.")
      : null,
    hasInputs,
  };
}
```

---

```filename: frontend/src/lib/hooks/useDebounce.ts
"use client";

import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

```filename: frontend/src/lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes intelligently — use everywhere instead of raw clsx. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

```filename: frontend/src/lib/utils/seo.ts
import type { Metadata } from "next";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  modifiedAt?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com";
const defaultOgImage = `${siteUrl}/images/og-default.jpg`;

export function generatePageMetadata(opts: GenerateMetadataOptions): Metadata {
  const {
    title,
    description,
    slug,
    ogImage = defaultOgImage,
    noIndex = false,
    type = "website",
    publishedAt,
    modifiedAt,
  } = opts;

  const url = slug ? `${siteUrl}/${slug}` : siteUrl;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/** JSON-LD helpers */
export function articleJsonLd(post: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  slug: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    url: `${siteUrl}/blog/${post.slug}`,
    author: { "@type": "Person", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Portfolio",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icons/logo.svg` },
    },
  };
}

export function toolJsonLd(tool: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    url: `${siteUrl}/tools/${tool.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    operatingSystem: "Web browser",
  };
}
```

---

```filename: frontend/src/app/sitemap.ts
import type { MetadataRoute } from "next";
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
}
```

---

```filename: frontend/src/app/robots.ts
import type { MetadataRoute } from "next";

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
}
```

---

```filename: frontend/src/app/api/revalidate/route.ts
/**
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
}
```

---

```filename: frontend/src/app/api/auth/login/route.ts
/**
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
}
```

---

```filename: frontend/src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

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
};
```

---

```filename: frontend/src/components/tools/CalculatorShell.tsx
/**
 * Shared wrapper for all calculator components.
 * Provides consistent layout: input panel left, result panel right.
 * On mobile: stacked vertically.
 */
"use client";

import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface CalculatorShellProps {
  title: string;
  description?: string;
  inputs: React.ReactNode;
  result: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function CalculatorShell({
  title,
  description,
  inputs,
  result,
  isLoading = false,
  error,
  className,
}: CalculatorShellProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">{inputs}</div>

        {/* Result */}
        <div
          className={cn(
            "rounded-lg border bg-card p-6 shadow-sm transition-opacity duration-200",
            isLoading && "opacity-60"
          )}
        >
          {isLoading ? (
            <div className="flex h-full min-h-[120px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : (
            <div className="calc-result">{result}</div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

```filename: frontend/src/components/tools/financial/CompoundInterest.tsx
/**
 * Compound Interest Calculator
 * Server-side compute via useCalculator hook → Django API → debounced SWR.
 */
"use client";

import { useState } from "react";
import { CalculatorShell } from "../CalculatorShell";
import { useCalculator } from "@/lib/hooks/useCalculator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { CompoundInterestResult } from "@/lib/api/types";
import { formatCurrency, formatPercent } from "@/lib/utils/format";

export function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState({
    principal: 10000,
    annual_rate: 7,
    years: 10,
    compounds_per_year: 12,
  });

  const { result, isLoading, error } =
    useCalculator<CompoundInterestResult>("compound-interest", inputs);

  const set = (key: keyof typeof inputs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }));

  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      description="Calculate how your investment grows over time."
      isLoading={isLoading}
      error={error}
      inputs={
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="principal">Principal ($)</Label>
            <Input
              id="principal"
              type="number"
              value={inputs.principal}
              onChange={set("principal")}
              min={1}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={inputs.annual_rate}
              onChange={set("annual_rate")}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="years">Time Period (years)</Label>
            <Input
              id="years"
              type="number"
              value={inputs.years}
              onChange={set("years")}
              min={1}
              max={50}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="compounds">Compounds Per Year</Label>
            <Input
              id="compounds"
              type="number"
              value={inputs.compounds_per_year}
              onChange={set("compounds_per_year")}
              min={1}
            />
          </div>
        </div>
      }
      result={
        result ? (
          <div className="space-y-4">
            <ResultRow
              label="Final Amount"
              value={formatCurrency(result.final_amount)}
              highlight
            />
            <ResultRow
              label="Interest Earned"
              value={formatCurrency(result.interest_earned)}
            />
            <ResultRow
              label="Effective Annual Rate"
              value={formatPercent(result.effective_annual_rate * 100)}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter values above to see results.
          </p>
        )
      }
    />
  );
}

function ResultRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={
          highlight
            ? "text-lg font-semibold tabular-nums"
            : "font-medium tabular-nums"
        }
      >
        {value}
      </span>
    </div>
  );
}
```

---

```filename: frontend/src/lib/utils/format.ts
/** Consistent number formatting across all calculators. */

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatCompact(value: number): string {
  return compactFormatter.format(value);
}

export function formatPercent(value: number): string {
  return percentFormatter.format(value / 100);
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDate(
  date: string | Date,
  opts?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  }).format(new Date(date));
}
```

---

```filename: frontend/src/components/blog/StreamField.tsx
/**
 * Renders Wagtail StreamField blocks to React components.
 * Add new block types here as you expand the CMS schema.
 */
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { StreamFieldBlock } from "@/lib/api/types";

interface StreamFieldProps {
  blocks: StreamFieldBlock[];
  className?: string;
}

export function StreamField({ blocks, className }: StreamFieldProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block) => (
        <StreamFieldBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

function StreamFieldBlock({ block }: { block: StreamFieldBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="scroll-mt-20 text-2xl font-semibold tracking-tight">
          {block.value}
        </h2>
      );

    case "paragraph":
      return (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case "image":
      return (
        <figure className="my-8">
          <Image
            src={block.value.url}
            alt={block.value.title}
            width={block.value.width}
            height={block.value.height}
            className="rounded-lg"
          />
        </figure>
      );

    case "code":
      return (
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center justify-between bg-muted px-4 py-2">
            <span className="text-xs text-muted-foreground font-mono">
              {block.value.language}
            </span>
          </div>
          <pre className="overflow-x-auto p-4">
            <code className={`language-${block.value.language} font-mono text-sm`}>
              {block.value.code}
            </code>
          </pre>
        </div>
      );

    case "callout":
      const calloutStyles = {
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
        tip: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
      };
      return (
        <div
          className={cn(
            "rounded-lg border p-4 text-sm",
            calloutStyles[block.value.type]
          )}
          dangerouslySetInnerHTML={{ __html: block.value.text }}
        />
      );

    default:
      return null;
  }
}
```

---

```filename: frontend/components.json
{
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
}
```

---

```filename: package.json
{
  "name": "portfolio-monorepo",
  "private": true,
  "workspaces": ["frontend"],
  "scripts": {
    "dev": "docker compose up --build",
    "dev:backend": "docker compose up --build backend",
    "dev:frontend": "docker compose up --build frontend",
    "stop": "docker compose down",
    "migrate": "docker compose exec backend python manage.py migrate",
    "makemigrations": "docker compose exec backend python manage.py makemigrations",
    "superuser": "docker compose exec backend python manage.py createsuperuser",
    "schema": "docker compose exec backend python manage.py spectacular --color --file schema.yml",
    "gen:types": "cd frontend && pnpm gen:types",
    "lint": "cd frontend && pnpm lint",
    "test": "docker compose exec backend python manage.py test && cd frontend && pnpm test",
    "logs": "docker compose logs -f"
  }
}
```

---

```filename: .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ─── Backend ───────────────────────────────────────────────────────
  backend-test:
    name: Backend Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: test_db
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip

      - name: Install dependencies
        working-directory: ./backend
        run: pip install -r requirements/dev.txt

      - name: Run linting
        working-directory: ./backend
        run: ruff check .

      - name: Run tests
        working-directory: ./backend
        env:
          DJANGO_SETTINGS_MODULE: config.settings.dev
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379/0
          SECRET_KEY: ci-secret-key
        run: python manage.py test --verbosity=2

  # ─── Frontend ──────────────────────────────────────────────────────
  frontend-check:
    name: Frontend Type Check & Lint
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install dependencies
        working-directory: ./frontend
        run: pnpm install --frozen-lockfile

      - name: Type check
        working-directory: ./frontend
        run: pnpm type-check

      - name: Lint
        working-directory: ./frontend
        run: pnpm lint
```

---

## Section 4 — Exact Next Steps

Run these commands in order from your `Portfolio_Project/` root:

```bash
# 1. Copy the root .env file
cp .env.example .env
# Edit .env — at minimum change SECRET_KEY and REVALIDATE_SECRET

# 2. Create Django app directories (they need __init__.py to be importable)
mkdir -p backend/apps/{core,accounts,blog,tools,pages}
for app in core accounts blog tools pages; do
  touch backend/apps/$app/__init__.py
  touch backend/apps/$app/apps.py
  touch backend/apps/$app/models.py
done

# 3. Create requirements directories
mkdir -p backend/requirements

# 4. Build and start the full stack
make dev
# or: docker compose up --build

# 5. (New terminal) Run migrations
make migrate

# 6. Create Wagtail/Django superuser
make createsuperuser

# 7. Install shadcn/ui components (run inside the frontend container or locally)
cd frontend
pnpm dlx shadcn@latest init         # answer prompts — use components.json config
pnpm dlx shadcn@latest add button input card label badge separator tabs accordion

# 8. Generate the OpenAPI TypeScript types (backend must be running)
pnpm gen:types

# 9. Access the stack:
#   Next.js:      http://localhost:3000
#   Django API:   http://localhost:8000/api/v1/
#   API Docs:     http://localhost:8000/api/docs/
#   Wagtail CMS:  http://localhost:8000/admin/
#   Django admin: http://localhost:8000/django-admin/

# 10. In Wagtail: create the page tree
#   Root → HomePage (pages.HomePage)
#   Root → BlogIndexPage (blog.BlogIndexPage) — set slug to "blog"
#   Root → ToolIndexPage (tools.ToolIndexPage) — set slug to "tools"
#   Then create BlogDetailPages and ToolDetailPages as children
```

**Additional one-time setup in Wagtail admin:**

1. Go to **Settings → Sites** → set the default site to `localhost:8000`
2. Go to **Settings → Redirects** — configure any redirect rules you need
3. On each `ToolDetailPage`, set `calculator_slug` to match the key in `CALCULATOR_REGISTRY` in `backend/apps/tools/views.py`
4. Configure the Wagtail publish webhook: after publishing a page, call `POST http://localhost:3000/api/revalidate` with `{"secret": "your-REVALIDATE_SECRET", "tags": ["blog-post-{slug}"]}` — add this to `backend/apps/blog/wagtail_hooks.py` using `requests.post`

























```
Here's the sequence of critical files from the previous response:

1. `docker-compose.yml`
2. `docker-compose.prod.yml`
3. `Makefile`
4. `.env.example`
5. `backend/Dockerfile`
6. `backend/entrypoint.sh`
7. `backend/requirements/base.txt`
8. `backend/requirements/dev.txt`
9. `backend/requirements/prod.txt`
10. `backend/config/settings/base.py`
11. `backend/config/settings/dev.py`
12. `backend/config/settings/prod.py`
13. `backend/config/urls.py`
14. `backend/apps/core/models.py`
15. `backend/apps/core/pagination.py`
16. `backend/apps/accounts/models.py`
17. `backend/apps/accounts/managers.py`
18. `backend/apps/accounts/views.py`
19. `backend/apps/accounts/urls.py`
20. `backend/apps/blog/models.py`
21. `backend/apps/tools/models.py`
22. `backend/apps/tools/views.py`
23. `backend/apps/tools/calculators/financial.py`
24. `backend/apps/tools/urls.py`
25. `frontend/package.json`
26. `frontend/next.config.ts`
27. `frontend/tailwind.config.ts`
28. `frontend/src/app/globals.css`
29. `frontend/src/app/layout.tsx`
30. `frontend/src/lib/api/client.ts`
31. `frontend/src/lib/api/types.ts`
32. `frontend/src/lib/api/blog.ts`
33. `frontend/src/lib/api/tools.ts`
34. `frontend/src/lib/hooks/useCalculator.ts`
35. `frontend/src/lib/hooks/useDebounce.ts`
36. `frontend/src/lib/utils/cn.ts`
37. `frontend/src/lib/utils/seo.ts`
38. `frontend/src/app/sitemap.ts`
39. `frontend/src/app/robots.ts`
40. `frontend/src/app/api/revalidate/route.ts`
41. `frontend/src/app/api/auth/login/route.ts`
42. `frontend/src/middleware.ts`
43. `frontend/src/components/tools/CalculatorShell.tsx`
44. `frontend/src/components/tools/financial/CompoundInterest.tsx`
45. `frontend/src/lib/utils/format.ts`
46. `frontend/src/components/blog/StreamField.tsx`
47. `frontend/components.json`
48. `package.json` (root monorepo)
49. `.github/workflows/ci.yml`
```