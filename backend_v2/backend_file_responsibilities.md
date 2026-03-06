# Backend File Responsibility Reference
## Monolithic Django–React Architecture
### Portfolio: AI Agent / Agentic AI Workflow | Data Science | MLOps

> **How to read this document:** Each file is documented with three fields.
> - **Purpose** — the single, core reason the file exists
> - **Dependencies** — what the file needs to function (imports, services, other files)
> - **Logic** — the process flow: what comes in, what decisions are made, what goes out

---

## Table of Contents

1. [Project Config — `backend/`](#1-project-config--backend)
2. [Settings — `backend/settings/`](#2-settings--backendsettings)
3. [Core Utilities — `core/`](#3-core-utilities--core)
4. [App: Projects — `apps/projects/`](#4-app-projects--appsprojects)
5. [App: Blog — `apps/blog/`](#5-app-blog--appsblog)
6. [App: Resume — `apps/resume/`](#6-app-resume--appsresume)
7. [App: Contact — `apps/contact/`](#7-app-contact--appscontact)
8. [App: Knowledge — `apps/knowledge/`](#8-app-knowledge--appsknowledge)
9. [Root-Level Files](#9-root-level-files)
10. [Infrastructure Directories](#10-infrastructure-directories)

---

## 1. Project Config — `backend/`

---

### `backend/__init__.py`

| Field | Detail |
|---|---|
| **Purpose** | Declares the `backend/` directory as a Python package so Django's module resolution can locate `settings`, `urls`, `wsgi`, and `asgi` using dotted-path references. |
| **Dependencies** | None. Optionally imports `celery.py` app instance at the package level if Celery is added later (enables `shared_task` decorator across all apps). |
| **Logic** | Passive — no process flow. Python's import system reads this file as confirmation that `backend` is a package. Its content is empty or contains a single Celery app import line. |

---

### `backend/urls.py`

| Field | Detail |
|---|---|
| **Purpose** | The single, authoritative URL dispatcher for the entire project. Routes all incoming HTTP requests — either to a domain app's API router or to the React SPA shell. |
| **Dependencies** | `django.urls` (`path`, `re_path`, `include`), `django.views.generic.TemplateView`, all five `apps/*/urls.py` modules, `django.contrib.admin`. |
| **Logic** | Requests arrive at the Django server. The router evaluates URL patterns top-to-bottom. Requests prefixed with `/admin/` go to Django's admin panel. Requests prefixed with `/api/` are handed off to the matching domain app's `urls.py`. Any remaining request — matching the final `re_path(r"^.*$")` catch-all — is served `templates/index.html`, which boots the React SPA and allows client-side routing to take over. |

---

### `backend/wsgi.py`

| Field | Detail |
|---|---|
| **Purpose** | The WSGI entry point for synchronous production deployments. Exposes the `application` callable that a WSGI server (Gunicorn, uWSGI) loads to handle HTTP requests. |
| **Dependencies** | `django.core.wsgi.get_wsgi_application`, `DJANGO_SETTINGS_MODULE` environment variable set to `backend.settings.production`. |
| **Logic** | On server startup, the WSGI server imports this module, calls `get_wsgi_application()`, and holds the returned `application` object. Each incoming HTTP request is passed as a WSGI environ dict into `application`, which internally invokes Django's full middleware stack and returns a response iterable. |

---

### `backend/asgi.py`

| Field | Detail |
|---|---|
| **Purpose** | The ASGI entry point for async-capable deployments (Daphne, Uvicorn). Required if WebSocket support or async views are added in the future. |
| **Dependencies** | `django.core.asgi.get_asgi_application`, `DJANGO_SETTINGS_MODULE` environment variable. |
| **Logic** | Functions identically to `wsgi.py` in structure but returns an ASGI `application` callable instead. Async-capable servers invoke this per-connection, enabling Django Channels or async views without blocking worker threads. Currently passes all requests through the standard synchronous Django handler; async upgrades are additive from this foundation. |

---

## 2. Settings — `backend/settings/`

---

### `backend/settings/__init__.py`

| Field | Detail |
|---|---|
| **Purpose** | Makes the `settings/` folder a Python package so that `DJANGO_SETTINGS_MODULE=backend.settings.production` resolves correctly as a dotted-path import. |
| **Dependencies** | None. |
| **Logic** | Passive. Without this file, Python cannot import `backend.settings.base` — Django would fail on startup with `ModuleNotFoundError`. |

---

### `backend/settings/base.py`

| Field | Detail |
|---|---|
| **Purpose** | The single source of truth for all settings that are environment-agnostic: app registry, middleware stack, DRF configuration, URL root, template engine, static/media paths, and internationalization. |
| **Dependencies** | `python-decouple` (reads `.env` for `SECRET_KEY`, `ALLOWED_HOSTS`), `pathlib.Path` for filesystem-relative paths, `corsheaders`, `rest_framework`, `django_filters`. |
| **Logic** | Loaded first by both `development.py` and `production.py` via `from .base import *`. Defines `INSTALLED_APPS` listing all five domain apps (`apps.projects`, `apps.blog`, `apps.resume`, `apps.contact`, `apps.knowledge`) plus third-party packages. Sets `REST_FRAMEWORK` defaults pointing to `core.pagination` and `core.permissions`. Configures `TEMPLATES` to locate `templates/index.html`. Does not set `DEBUG`, `DATABASES`, or security headers — those are environment-specific overrides. |

---

### `backend/settings/development.py`

| Field | Detail |
|---|---|
| **Purpose** | Overrides `base.py` with developer-friendly settings: verbose errors, relaxed security, local file-based database, and diagnostic tooling. |
| **Dependencies** | `from .base import *`, `django-debug-toolbar`, SQLite (built into Python standard library). |
| **Logic** | Sets `DEBUG = True`, enabling the exception detail page and query-level error tracing. Configures `DATABASES` to point at `db.sqlite3` in the project root. Appends `debug_toolbar` to `INSTALLED_APPS` and its middleware to `MIDDLEWARE`. Sets `CORS_ALLOW_ALL_ORIGINS = True` to permit the Vite dev server (typically `localhost:5173`) to call Django APIs without CORS errors. Activated via `DJANGO_SETTINGS_MODULE=backend.settings.development`. |

---

### `backend/settings/production.py`

| Field | Detail |
|---|---|
| **Purpose** | Overrides `base.py` with hardened, performance-tuned settings for live deployment: PostgreSQL, static file compression, HTTPS enforcement, and error monitoring. |
| **Dependencies** | `from .base import *`, `python-decouple` (reads `DATABASE_URL`, `SECRET_KEY`, `SENTRY_DSN` from environment variables), `whitenoise`, `psycopg2`, `sentry-sdk`. |
| **Logic** | Sets `DEBUG = False`. Reads `DATABASE_URL` from the environment and configures PostgreSQL via `psycopg2`. Inserts `WhiteNoiseMiddleware` into `MIDDLEWARE` directly after `SecurityMiddleware` so it intercepts static file requests before they reach Django's view layer. Enables `SECURE_HSTS_SECONDS`, `SECURE_SSL_REDIRECT`, `SESSION_COOKIE_SECURE`, and `CSRF_COOKIE_SECURE`. Initialises the Sentry SDK with the `SENTRY_DSN` env variable for real-time error tracking. |

---

## 3. Core Utilities — `core/`

---

### `core/__init__.py`

| Field | Detail |
|---|---|
| **Purpose** | Marks `core/` as a Python package, enabling `from core.mixins import TimestampMixin` style imports across all domain apps. |
| **Dependencies** | None. |
| **Logic** | Passive. Presence alone satisfies Python's package resolution. |

---

### `core/mixins.py`

| Field | Detail |
|---|---|
| **Purpose** | Provides abstract Django model base classes that inject reusable fields into any domain model without code duplication. |
| **Dependencies** | `django.db.models`. Used by `models.py` in every domain app via multiple inheritance. |
| **Logic** | Defines three abstract model classes. `TimestampMixin` adds `created_at` (auto-set on creation) and `updated_at` (auto-set on every save) — both non-editable DateTimeFields. `SlugMixin` adds a unique `SlugField` that is generated from a source field (e.g., title) if left blank. `SEOMixin` inherits `SlugMixin` and adds `meta_title` (max 60 chars) and `meta_desc` (max 160 chars) for per-object SEO control. Because `Meta.abstract = True`, Django never creates database tables for these classes directly — they only materialise as columns in the inheriting model's table. |

---

### `core/pagination.py`

| Field | Detail |
|---|---|
| **Purpose** | Defines a single, consistent pagination class applied globally to all DRF list endpoints, ensuring uniform response envelopes and predictable frontend consumption. |
| **Dependencies** | `rest_framework.pagination.PageNumberPagination`. Declared in `base.py` under `REST_FRAMEWORK["DEFAULT_PAGINATION_CLASS"]`. |
| **Logic** | Subclasses `PageNumberPagination` and sets `page_size = 10`. When a list view returns a queryset, DRF's pagination layer intercepts it, slices the queryset to 10 results, and wraps the response in a JSON envelope containing `count` (total records), `next` (URL of next page or null), `previous` (URL of previous page or null), and `results` (the sliced data array). The React frontend reads `next` and `previous` to implement infinite scroll or numbered pagination controls. |

---

### `core/permissions.py`

| Field | Detail |
|---|---|
| **Purpose** | Centralises access control logic, separating public read access from admin-only write access without repeating permission checks in every view. |
| **Dependencies** | `rest_framework.permissions.BasePermission`, `IsAdminUser`. Declared in `base.py` under `REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"]`. |
| **Logic** | Defines two permission classes. `ReadOnly` allows `GET`, `HEAD`, and `OPTIONS` requests from any client, including anonymous visitors — the public portfolio pages. `IsAdminOrReadOnly` combines both: safe HTTP methods pass through freely, while `POST`, `PUT`, `PATCH`, and `DELETE` require `request.user.is_staff == True`. The `contact` app overrides this at the view level to permit anonymous `POST` submissions specifically. |

---

### `core/utils.py`

| Field | Detail |
|---|---|
| **Purpose** | A utility module housing pure helper functions used across multiple apps — keeping business logic out of models, serializers, and views. |
| **Dependencies** | `django.utils.text.slugify`, `django.core.mail.send_mail`, `bleach` (HTML sanitisation), `python-decouple` (reads email credentials). Called by `apps/contact/views.py`, `apps/blog/models.py`, `apps/projects/models.py`. |
| **Logic** | `generate_slug(value, model_class)` converts a string (e.g., a project title) into a URL-safe slug using Django's `slugify`, then queries `model_class` to check for uniqueness. If a collision exists, it appends an incrementing integer suffix until unique. `send_contact_email(submission)` composes a plain-text email from a `ContactSubmission` instance and dispatches it via Django's mail backend to the configured admin address. `sanitize_html(raw_html)` passes blog post body content through `bleach`'s allowlist filter, stripping any dangerous tags (e.g., `<script>`) while preserving safe formatting markup. |

---

## 4. App: Projects — `apps/projects/`

---

### `apps/projects/__init__.py`

| Field | Detail |
|---|---|
| **Purpose** | Declares `apps/projects/` as a Python package. |
| **Dependencies** | None. |
| **Logic** | Passive. Required for `apps.projects` to resolve as a dotted-path module in `INSTALLED_APPS`. |

---

### `apps/projects/apps.py`

| Field | Detail |
|---|---|
| **Purpose** | Django's app configuration class. Registers the app's metadata and hooks into Django's ready signal for any startup logic. |
| **Dependencies** | `django.apps.AppConfig`. |
| **Logic** | Sets `name = "apps.projects"` and `default_auto_field`. Django reads this during startup, uses `name` to locate models, migrations, and admin registrations. The `ready()` method can be overridden here to connect signal handlers (e.g., auto-generating slugs on `pre_save`) without circular import issues. |

---

### `apps/projects/models.py`

| Field | Detail |
|---|---|
| **Purpose** | Defines the database schema for all project-related entities: the projects themselves, their categorisation, technology associations, and image gallery. |
| **Dependencies** | `django.db.models`, `core.mixins.TimestampMixin`, `core.mixins.SEOMixin`. Referenced by `admin.py`, `serializers.py`, `views.py`, and `filters.py` within this app. |
| **Logic** | Declares four models. `ProjectCategory` is a simple lookup table (name, slug) for grouping projects (e.g., "AI/ML", "Backend"). `TechTag` is a separate lookup table for technology labels (e.g., "React", "LangChain") that can be shared across projects. `Project` inherits `TimestampMixin` and `SEOMixin`, adding fields for title, overview, challenge, solution body, role, timeline, year, live URL, GitHub URL, and a `ManyToManyField` to both `TechTag` and `ProjectCategory`. `ProjectImage` is a related model with a `ForeignKey` to `Project` and an `ImageField`, supporting the image gallery shown on detail pages. |

---

### `apps/projects/serializers.py`

| Field | Detail |
|---|---|
| **Purpose** | Transforms `Project` model instances into JSON structures tailored for two distinct frontend use cases: the projects index page (list) and the project detail page. |
| **Dependencies** | `rest_framework.serializers`, `apps.projects.models` (Project, TechTag, ProjectCategory, ProjectImage). Used exclusively by `views.py`. |
| **Logic** | `ProjectListSerializer` exposes only the fields needed for the projects grid: `id`, `title`, `slug`, `meta_desc` (used as card summary), `tech_tags` (nested as name/slug pairs), `category`, `year`, and the primary thumbnail image URL. `ProjectDetailSerializer` exposes all fields including `overview`, `challenge`, `solution`, `role`, `timeline`, `live_url`, `github_url`, and the full `images` array. Using two serializers prevents over-fetching on the index page while providing the complete dataset on detail pages. |

---

### `apps/projects/views.py`

| Field | Detail |
|---|---|
| **Purpose** | Handles HTTP requests to project API endpoints, applying filtering and selecting the correct serializer based on the endpoint type. |
| **Dependencies** | `rest_framework.generics`, `apps.projects.models.Project`, `apps.projects.serializers`, `apps.projects.filters.ProjectFilter`, `core.pagination.StandardResultsPagination`, `core.permissions.IsAdminOrReadOnly`. |
| **Logic** | `ProjectListView` handles `GET /api/projects/`. It retrieves all `Project` objects, orders them by year descending, applies `ProjectFilter` to handle `?category=` and `?tech=` query parameters from the frontend's filter bar, paginates to 10 results, and serialises with `ProjectListSerializer`. `ProjectDetailView` handles `GET /api/projects/<slug>/`. It performs a lookup by slug, returns 404 if not found, and serialises the single instance with `ProjectDetailSerializer`. Write operations (POST, PUT, DELETE) are blocked for non-admin users by the inherited permission class. |

---

### `apps/projects/filters.py`

| Field | Detail |
|---|---|
| **Purpose** | Declares the filtering interface for the projects list endpoint, enabling the frontend's category and tech-stack filter bar to query the API without bespoke view logic. |
| **Dependencies** | `django_filters.FilterSet`, `apps.projects.models.Project`. Consumed by `views.py`. |
| **Logic** | Subclasses `FilterSet` and declares filter fields mapped to `Project` model relationships: `category` (filters by `ProjectCategory.slug`), `tech` (filters by `TechTag.slug`), and `year` (exact match on the `year` field). When the frontend sends `GET /api/projects/?category=ai-ml&tech=langchain`, `django-filter` intercepts the query parameters, validates them against the declared fields, and applies the corresponding ORM `filter()` calls to the queryset before it reaches the serializer. |

---

### `apps/projects/urls.py`

| Field | Detail |
|---|---|
| **Purpose** | Maps URL patterns to project views, scoped under the `/api/` prefix established by the root `urls.py`. |
| **Dependencies** | `django.urls.path`, `apps.projects.views`. Included by `backend/urls.py`. |
| **Logic** | Declares two URL patterns. The bare path `projects/` routes to `ProjectListView`. The path `projects/<slug:slug>/` captures the slug segment and routes to `ProjectDetailView`. The slug converter ensures only URL-safe strings (letters, numbers, hyphens) are accepted, rejecting malformed paths at the routing layer before they reach the view. |

---

### `apps/projects/admin.py`

| Field | Detail |
|---|---|
| **Purpose** | Exposes `Project`, `TechTag`, `ProjectCategory`, and `ProjectImage` models in Django's admin panel, enabling content management without a custom CMS. |
| **Dependencies** | `django.contrib.admin`, `apps.projects.models`. |
| **Logic** | Registers each model with a custom `ModelAdmin` subclass. `ProjectAdmin` configures `list_display` to show title, year, and category at a glance; `list_filter` to filter by category and tech tags in the sidebar; `prepopulated_fields` to auto-generate slugs from the title field while typing; and `filter_horizontal` for the many-to-many tech tag picker. `ProjectImageAdmin` uses `raw_id_fields` for the project FK to avoid loading all projects in a dropdown. |

---

### `apps/projects/migrations/`

| Field | Detail |
|---|---|
| **Purpose** | Stores the versioned history of all schema changes to the `projects` app's database tables. |
| **Dependencies** | `django.db.migrations`. Applied sequentially by `manage.py migrate`. |
| **Logic** | Each migration file is a Python class describing an atomic set of schema operations (create table, add column, alter field, add index). Django compares the current migration state against the actual database schema to determine which migrations are pending. Migrations are never edited after being applied to a shared environment — new changes always produce new migration files. `__init__.py` marks the directory as a package. |

---

### `apps/projects/tests/`

| Field | Detail |
|---|---|
| **Purpose** | Isolates automated test logic for the projects app, separating model-level tests from HTTP endpoint tests. |
| **Dependencies** | `pytest-django`, `factory-boy` (for fixture generation), `rest_framework.test.APIClient`. |
| **Logic** | `test_models.py` tests model-level behaviour: slug auto-generation, cascade deletes on `ProjectImage` when a `Project` is deleted, and `__str__` representations. `test_views.py` uses `APIClient` to make authenticated and unauthenticated requests to `/api/projects/` and `/api/projects/<slug>/`, asserting correct HTTP status codes, response shapes, and filter behaviour. `pytest.ini` at the project root points `DJANGO_SETTINGS_MODULE` at `development.py` so tests run against SQLite in-memory. |

---

## 5. App: Blog — `apps/blog/`

The blog app mirrors the structural pattern of `apps/projects/` with domain-specific variations. Only the behavioural differences are documented below.

---

### `apps/blog/models.py`

| Field | Detail |
|---|---|
| **Purpose** | Defines the schema for all blog content: posts, their taxonomic organisation, and associated images. |
| **Dependencies** | `django.db.models`, `core.mixins.TimestampMixin`, `core.mixins.SEOMixin`. |
| **Logic** | `Category` and `Tag` are separate lookup tables — a post belongs to one `Category` but can have many `Tags`. This mirrors the frontend's filter UI which distinguishes category buttons (mutually exclusive) from tag clouds (additive). `Post` inherits both mixins and adds: `title`, `body` (stored as HTML, sanitised on save via `core.utils.sanitize_html`), `excerpt` (150-char summary for list cards), `published_date`, `read_time` (integer, minutes), `featured` (boolean flag for the homepage carousel), `author` (FK to `auth.User`), `category` (FK), and `tags` (M2M). `PostImage` holds supplementary images embedded in post body content. |

---

### `apps/blog/serializers.py`

| Field | Detail |
|---|---|
| **Purpose** | Shapes blog data for two consumption contexts: the posts list (index + homepage cards) and the full post detail. |
| **Dependencies** | `rest_framework.serializers`, `apps.blog.models`. |
| **Logic** | `PostListSerializer` exposes `id`, `title`, `slug`, `excerpt`, `published_date`, `read_time`, `category`, and `tags` — all fields required to render a blog card without over-fetching the full body. `PostDetailSerializer` adds the full `body` HTML, `author` name, related `images`, and `meta_title`/`meta_desc` for the `<head>` tag injection React performs on detail pages. |

---

### `apps/blog/views.py`

| Field | Detail |
|---|---|
| **Purpose** | Serves filtered, paginated post lists and individual post details; also provides a related-posts sub-endpoint. |
| **Dependencies** | `rest_framework.generics`, `apps.blog.models.Post`, `apps.blog.serializers`, `apps.blog.filters.PostFilter`, `core.pagination`, `core.permissions`. |
| **Logic** | `PostListView` queries published posts (`published_date__lte=today`), applies `PostFilter` for category/tag/date-range filtering, paginates, and serialises with `PostListSerializer`. `PostDetailView` retrieves by slug with a 404 fallback. `RelatedPostsView` accepts a post slug, retrieves the post, queries other posts sharing the same `category` or overlapping `tags`, limits to three results ordered by published date, and returns them serialised with `PostListSerializer` — powering the "Related Posts" section at the bottom of detail pages. |

---

### `apps/blog/filters.py`

| Field | Detail |
|---|---|
| **Purpose** | Exposes category, tag, and date-range filtering for the blog list endpoint. |
| **Dependencies** | `django_filters.FilterSet`, `apps.blog.models.Post`. |
| **Logic** | Declares `category` (FK slug lookup), `tag` (M2M slug lookup), `date_from` and `date_to` (range filters on `published_date`). The frontend's category tab buttons pass `?category=tutorials`; the tag cloud passes `?tag=mlops`. Date filters support future archive pages. |

---

## 6. App: Resume — `apps/resume/`

---

### `apps/resume/models.py`

| Field | Detail |
|---|---|
| **Purpose** | Persists the structured career data displayed on the `/resume` page, making it CMS-editable rather than hardcoded in the frontend. |
| **Dependencies** | `django.db.models`, `core.mixins.TimestampMixin`. |
| **Logic** | `SkillCategory` is a lookup table (e.g., "Frontend", "Backend", "MLOps/DevOps"). `Skill` belongs to a `SkillCategory` and stores the skill name, proficiency level, and an optional icon identifier. `Experience` stores job entries: title, company, start/end dates, location, and a JSON or text field for bullet-point achievements. `Education` stores degree, institution, graduation year, and optional honours. `Certification` stores name, issuing body, issue date, expiry date, and a verification URL. All models inherit `TimestampMixin` for admin visibility of when records were last updated. |

---

### `apps/resume/serializers.py`

| Field | Detail |
|---|---|
| **Purpose** | Assembles all resume components into a single nested JSON response, eliminating the need for multiple API calls from the frontend. |
| **Dependencies** | `rest_framework.serializers`, all models in `apps.resume.models`. |
| **Logic** | `ResumeSerializer` is a non-model serializer acting as an aggregator. It instantiates nested serializers for each component: `SkillSerializer` groups skills under their categories, `ExperienceSerializer` orders jobs by start date descending, `EducationSerializer` orders by graduation year, and `CertificationSerializer` includes the verification URL. The `ResumeView` calls a single `get()` method that queries all five models and passes the results to `ResumeSerializer`, returning one complete JSON object to `GET /api/resume/`. |

---

### `apps/resume/views.py`

| Field | Detail |
|---|---|
| **Purpose** | Serves the complete resume data structure as a single endpoint response. |
| **Dependencies** | `rest_framework.views.APIView`, `apps.resume.serializers.ResumeSerializer`, all resume models. |
| **Logic** | `ResumeView` overrides the `get()` method (not a `GenericAPIView` — no queryset needed). It explicitly queries each model — skills grouped by category, experiences ordered by date, education, certifications — assembles them into a plain Python dict matching `ResumeSerializer`'s declared fields, initialises the serializer with that dict, and returns `Response(serializer.data)`. Only `GET` is permitted; the permission class blocks all write operations from non-admin users. |

---

## 7. App: Contact — `apps/contact/`

---

### `apps/contact/models.py`

| Field | Detail |
|---|---|
| **Purpose** | Persists every contact form submission to the database, providing an admin-accessible record of all inbound messages independent of email delivery success. |
| **Dependencies** | `django.db.models`, `core.mixins.TimestampMixin`. |
| **Logic** | `ContactSubmission` stores `name`, `email`, `subject`, `message`, `honeypot` (a hidden field that bots fill; humans leave blank), `ip_address` (populated by the view from `request.META`), and `is_read` (boolean toggled in admin). Inherits `TimestampMixin` for `created_at` timestamps. Persisting submissions to the database means a missed email (e.g., SMTP failure) does not result in a lost message — the admin panel serves as a backup inbox. |

---

### `apps/contact/serializers.py`

| Field | Detail |
|---|---|
| **Purpose** | Validates incoming contact form data and enforces the honeypot anti-spam check before any business logic executes. |
| **Dependencies** | `rest_framework.serializers.ModelSerializer`, `apps.contact.models.ContactSubmission`. |
| **Logic** | Declares all form fields as required except `honeypot`, which is `write_only` and `required=False`. The `validate_honeypot()` method inspects the honeypot field value: if it contains any non-empty string, it raises `ValidationError("Spam detected")` — bots that auto-fill all fields are silently rejected without exposing the anti-spam mechanism. Email format validation is handled by DRF's built-in `EmailField`. The serializer is write-only — no `GET` endpoint ever returns submission data to the public. |

---

### `apps/contact/views.py`

| Field | Detail |
|---|---|
| **Purpose** | Receives validated form submissions, persists them, triggers the notification email, and returns an appropriate success or error response to the frontend. |
| **Dependencies** | `rest_framework.generics.CreateAPIView`, `apps.contact.serializers.ContactSerializer`, `core.utils.send_contact_email`, `rest_framework.permissions.AllowAny`. |
| **Logic** | `ContactCreateView` overrides `DEFAULT_PERMISSION_CLASSES` at the view level with `AllowAny`, since anonymous visitors must be able to submit. On `POST /api/contact/`, DRF passes the request body to `ContactSerializer` for validation. If valid, `perform_create()` saves the `ContactSubmission` instance (injecting `ip_address` from `request.META.get("REMOTE_ADDR")`), then calls `core.utils.send_contact_email(instance)` in a `try/except` block — email failure logs the exception but does not roll back the database save, ensuring the submission is never lost. Returns HTTP 201 on success or HTTP 400 with field-level validation errors on failure. |

---

## 8. App: Knowledge — `apps/knowledge/`

---

### `apps/knowledge/models.py`

| Field | Detail |
|---|---|
| **Purpose** | Defines the schema for structured educational content: courses with their constituent lessons, and a curated tools directory with categorisation. |
| **Dependencies** | `django.db.models`, `core.mixins.TimestampMixin`, `core.mixins.SEOMixin`. |
| **Logic** | `Course` inherits both mixins and stores title, description, difficulty level (beginner/intermediate/advanced), estimated hours, and a GitHub repository URL. `Lesson` has a `ForeignKey` to `Course` with `on_delete=CASCADE`, storing title, content body, order (integer for manual sequencing), and an optional video embed URL. `ToolCategory` is a lookup table (e.g., "Editors", "CLI Tools", "AI Assistants"). `Tool` stores name, description, URL, the category FK, and a `featured` boolean for the homepage highlights section. `Resource` is a general-purpose link model (title, URL, description, resource type) for the knowledge base's reference section. |

---

### `apps/knowledge/serializers.py`

| Field | Detail |
|---|---|
| **Purpose** | Serialises courses and tools for their respective list and detail endpoints. |
| **Dependencies** | `rest_framework.serializers`, `apps.knowledge.models`. |
| **Logic** | `CourseListSerializer` exposes title, slug, description, difficulty, estimated hours, and lesson count (annotated aggregate). `CourseDetailSerializer` nests all `LessonSerializer` results ordered by the `order` field, enabling the frontend to render a full syllabus. `ToolSerializer` exposes name, URL, description, and category name. Category grouping for the tools page is performed on the frontend by filtering the flat `tools` array by `category` — avoiding a more complex nested API response for a relatively simple data structure. |

---

### `apps/knowledge/views.py`

| Field | Detail |
|---|---|
| **Purpose** | Serves courses and tools from separate endpoints, matching the frontend's two distinct sub-pages under `/knowledge/`. |
| **Dependencies** | `rest_framework.generics`, `apps.knowledge.models`, `apps.knowledge.serializers`, `core.pagination`, `core.permissions`. |
| **Logic** | `CourseListView` handles `GET /api/knowledge/courses/`, returning all courses ordered by difficulty (beginner first). `CourseDetailView` handles `GET /api/knowledge/courses/<slug>/` with full lesson nesting. `ToolListView` handles `GET /api/knowledge/tools/`, returning all tools ordered by category name then tool name. Unlike other apps, tools are not paginated — the complete list is returned, since the category-based filtering UI on the frontend requires the full dataset to filter client-side without additional requests. |

---

### `apps/knowledge/urls.py`

| Field | Detail |
|---|---|
| **Purpose** | Maps the two knowledge sub-domains (courses, tools) to their respective views under the `/api/knowledge/` prefix. |
| **Dependencies** | `django.urls.path`, `apps.knowledge.views`. Included by `backend/urls.py`. |
| **Logic** | Declares four patterns: `knowledge/courses/` → `CourseListView`, `knowledge/courses/<slug:slug>/` → `CourseDetailView`, `knowledge/tools/` → `ToolListView`. The URL hierarchy mirrors the frontend's `<NavLink>` structure under `/knowledge/`, making it intuitive for frontend developers to infer API endpoints from page URLs. |

---

## 9. Root-Level Files

---

### `manage.py`

| Field | Detail |
|---|---|
| **Purpose** | Django's command-line management interface. The primary tool for all development operations: running the server, applying migrations, creating admin users, and running test suites. |
| **Dependencies** | `django.core.management.execute_from_command_line`, `DJANGO_SETTINGS_MODULE` environment variable. |
| **Logic** | On invocation, reads `DJANGO_SETTINGS_MODULE` (defaulting to `backend.settings.development` unless overridden), calls `execute_from_command_line(sys.argv)`, which dispatches to the appropriate management command. Key commands used in this project: `runserver` (development server), `migrate` (applies pending migrations), `makemigrations` (generates new migration files from model changes), `createsuperuser` (creates an admin panel user), `collectstatic` (copies static files to `staticfiles/`). |

---

### `.env.example`

| Field | Detail |
|---|---|
| **Purpose** | A committed, non-sensitive template listing all required environment variables, enabling new developers to bootstrap the project without guessing configuration keys. |
| **Dependencies** | None — it is a documentation file, not imported by Python. The actual `.env` file (gitignored) is what `python-decouple` reads at runtime. |
| **Logic** | Contains placeholder values for: `SECRET_KEY` (Django's cryptographic signing key), `DEBUG` (boolean), `DATABASE_URL` (PostgreSQL connection string for production), `ALLOWED_HOSTS` (comma-separated), `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL` (used by `core.utils.send_contact_email`), and `SENTRY_DSN`. A developer copies this file to `.env` and populates real values. |

---

### `pytest.ini`

| Field | Detail |
|---|---|
| **Purpose** | Configures pytest's Django integration at the project level so that test discovery, database fixtures, and Django setup work consistently across all five app test suites without per-app configuration. |
| **Dependencies** | `pytest`, `pytest-django`. Referenced automatically by pytest on invocation. |
| **Logic** | Sets `DJANGO_SETTINGS_MODULE = backend.settings.development`, ensuring tests run against SQLite (not PostgreSQL) for speed and isolation. Sets `python_files = test_*.py` and `python_classes = Test*` for discovery. Configures `addopts = --reuse-db` (via `pytest-django`) to avoid recreating the test database on every run unless models change, significantly speeding up iterative test cycles. |

---

### `db.sqlite3`

| Field | Detail |
|---|---|
| **Purpose** | The file-based SQLite database used exclusively in the development environment, eliminating the need to run a PostgreSQL server locally. |
| **Dependencies** | Python's built-in `sqlite3` module, `django.db`. Created automatically by `manage.py migrate`. |
| **Logic** | A binary file that SQLite reads and writes directly. Django interacts with it through the standard ORM — all queries, transactions, and schema operations work identically to PostgreSQL from the application's perspective. Must be listed in `.gitignore` to prevent developer data from being committed to the repository. In production, this file is absent; `settings/production.py` points Django at the PostgreSQL instance instead. |

---

## 10. Infrastructure Directories

---

### `media/`

| Field | Detail |
|---|---|
| **Purpose** | Stores user-uploaded binary files at runtime: project screenshots, blog post images, and the downloadable resume PDF. |
| **Dependencies** | `MEDIA_ROOT` setting (set to this directory in `base.py`), `MEDIA_URL` for public URL generation, Django's `ImageField` and `FileField` in project and blog models. In production, this directory is replaced by an object storage bucket (S3 or equivalent). |
| **Logic** | When an admin uploads an image via the Django admin panel, Django's `FileSystemStorage` backend writes the file into the appropriate subdirectory (`media/projects/`, `media/blog/`, `media/resume/`). `ImageField.url` generates a public URL using `MEDIA_URL + relative_path`. In development, Django's `static()` URL helper in `urls.py` serves files directly from this directory. In production, media files should be offloaded to a CDN — `media/` is explicitly excluded from `collectstatic` output. |

---

### `static/`

| Field | Detail |
|---|---|
| **Purpose** | Holds source static assets committed to the repository: custom fonts, favicon files, or any Django admin customisation assets. |
| **Dependencies** | `STATICFILES_DIRS` setting in `base.py`. Processed by `manage.py collectstatic`. |
| **Logic** | During deployment, `collectstatic` copies everything from `static/` into `staticfiles/`. In development, `django.contrib.staticfiles` serves files from here directly. This directory should not be confused with the React build output — Vite compiles the frontend into `staticfiles/assets/`, not into `static/`. |

---

### `staticfiles/`

| Field | Detail |
|---|---|
| **Purpose** | The aggregated output directory for all static files after `collectstatic` runs. WhiteNoise serves the entire contents of this directory directly from the Django process in production, eliminating the need for a separate static file server. |
| **Dependencies** | `whitenoise.middleware.WhiteNoiseMiddleware` (inserted in `MIDDLEWARE` in `production.py`), `STATIC_ROOT = BASE_DIR / "staticfiles"` in `base.py`, the Vite build step which outputs compiled React assets to `staticfiles/assets/`. |
| **Logic** | During the CI/CD pipeline, two steps populate this directory: first, `npm run build` (Vite) compiles the React SPA and outputs hashed JS/CSS bundles to `staticfiles/assets/`; second, `python manage.py collectstatic --no-input` copies Django's own static files (admin panel CSS/JS) into `staticfiles/`. WhiteNoise then fingerprints files, adds far-future cache headers, and serves them via brotli/gzip compression. Because the React build hash is embedded in filenames, `index.html` always references the correct bundle version. |

---

### `templates/index.html`

| Field | Detail |
|---|---|
| **Purpose** | The React SPA's HTML shell — the single HTML document that the browser loads for every non-API URL. It bootstraps the React application, which then handles all client-side routing. |
| **Dependencies** | Django's template engine (configured in `base.py`), the Vite-compiled JS bundle in `staticfiles/assets/`, the catch-all URL pattern in `backend/urls.py`. |
| **Logic** | When any non-API request reaches Django (e.g., `GET /projects/my-project`), the catch-all URL pattern in `backend/urls.py` returns this template via `TemplateView`. The browser receives a minimal HTML document containing a `<div id="root">` mount point and a `<script>` tag referencing the Vite bundle. React mounts, reads the current URL from the browser's History API, matches it against `src/app/routes.ts`, and renders the appropriate page component — all without any additional server round-trips. The backend's role ends at delivering this shell; every subsequent page navigation is handled entirely by the React router. |

---

### `requirements/base.txt`

| Field | Detail |
|---|---|
| **Purpose** | Declares the minimum set of Python packages required for the application to run in any environment. |
| **Dependencies** | pip. Read by `development.txt` and `production.txt` via `-r base.txt`. |
| **Logic** | Lists `django`, `djangorestframework`, `django-filter`, `django-cors-headers`, `Pillow` (for `ImageField` processing), and `python-decouple` (for `.env` reading). Keeping this minimal ensures production installs are lean — no test tooling or debug utilities are pulled into the production container. |

---

### `requirements/development.txt`

| Field | Detail |
|---|---|
| **Purpose** | Extends `base.txt` with developer tooling: test runners, factories, and the debug toolbar. |
| **Dependencies** | `-r base.txt` (all base packages), pip. |
| **Logic** | Adds `django-debug-toolbar` (SQL query inspector in the browser), `pytest-django` (pytest integration for Django), `factory-boy` (model instance factories for test fixtures, replacing manual `Model.objects.create()` calls), and `coverage` (test coverage reporting). Installed via `pip install -r requirements/development.txt`. |

---

### `requirements/production.txt`

| Field | Detail |
|---|---|
| **Purpose** | Extends `base.txt` with production infrastructure packages: the WSGI server, static file server, PostgreSQL adapter, and error monitoring. |
| **Dependencies** | `-r base.txt`, pip. Installed during the CI/CD deployment pipeline. |
| **Logic** | Adds `gunicorn` (multi-worker WSGI server that receives requests from the reverse proxy), `whitenoise[brotli]` (static file serving with brotli compression support), `psycopg2-binary` (PostgreSQL database adapter for Django's ORM), and `sentry-sdk[django]` (automatic exception capture, performance tracing, and error alerting). Installed via `pip install -r requirements/production.txt` in the deployment container build step. |
