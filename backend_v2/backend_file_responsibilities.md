# Backend File Responsibility Reference
## Monolithic Django–React Architecture
### Portfolio: AI Agent / Agentic AI Workflow | Data Science | MLOps

---

## Project Config — `backend/`

---

```
File: backend/__init__.py

Responsibility:
Declares the backend/ directory as a Python package, enabling dotted-path resolution of all project modules.

Functional Role:
Package declaration — allows Django to resolve backend.settings, backend.urls, backend.wsgi, and backend.asgi as valid import targets.

System Interactions:
- Django's module resolution system
- backend/settings/__init__.py (chain resolution)
- manage.py (startup import path)

Key Concepts / Features:
- Python package boundary declaration
- Optional Celery app instance registration point for future async task support

Task-Oriented Prompt:
If adding Celery, import and expose the Celery app instance here so that shared_task decorators resolve correctly across all domain apps without circular imports.
```

---

```
File: backend/urls.py

Responsibility:
The root URL dispatcher that routes all incoming HTTP requests either to a domain app's API router or to the React SPA shell as a catch-all fallback.

Functional Role:
API routing and SPA integration — acts as the single authoritative URL registry for the entire monolith, separating API traffic from frontend traffic at the path level.

System Interactions:
- apps/projects/urls.py
- apps/blog/urls.py
- apps/resume/urls.py
- apps/contact/urls.py
- apps/knowledge/urls.py
- django.contrib.admin (admin panel)
- templates/index.html (SPA catch-all via TemplateView)
- django.urls (path, re_path, include)

Key Concepts / Features:
- Top-to-bottom URL pattern evaluation
- /api/ prefix namespacing for all REST endpoints
- re_path(r"^.*$") catch-all serves the React SPA for all non-API routes
- Enables client-side routing via React Router without Django 404s

Task-Oriented Prompt:
When adding a new domain app, register its urls.py here under the /api/ prefix before the catch-all pattern; never place new API routes after the SPA catch-all or they will be silently swallowed by TemplateView.
```

---

```
File: backend/wsgi.py

Responsibility:
Exposes the WSGI application callable used by synchronous production servers (Gunicorn, uWSGI) to handle HTTP requests.

Functional Role:
Production server interface — bridges the WSGI server and Django's full middleware + routing stack for synchronous HTTP traffic.

System Interactions:
- Gunicorn / uWSGI (WSGI server layer)
- DJANGO_SETTINGS_MODULE environment variable (points to production.py)
- Django's full middleware stack (via get_wsgi_application)

Key Concepts / Features:
- WSGI protocol compliance
- Environment variable-driven settings selection
- Stateless request-response lifecycle per HTTP call

Task-Oriented Prompt:
When deploying, ensure DJANGO_SETTINGS_MODULE is set to backend.settings.production in the server environment before Gunicorn loads this module; misconfiguration here silently falls back to development settings.
```

---

```
File: backend/asgi.py

Responsibility:
Exposes the ASGI application callable for async-capable servers, establishing the foundation for future WebSocket or async view support.

Functional Role:
Async server interface — currently passes all traffic through the synchronous Django handler but enables non-blocking upgrades (Django Channels, async views) without structural refactoring.

System Interactions:
- Daphne / Uvicorn (ASGI server layer)
- DJANGO_SETTINGS_MODULE environment variable
- Django's ASGI handler (get_asgi_application)

Key Concepts / Features:
- ASGI protocol compliance
- Forward-compatible foundation for WebSocket or Server-Sent Events
- Drop-in replacement for wsgi.py in async deployment environments

Task-Oriented Prompt:
When adding real-time features (e.g., live project view counts, WebSocket notifications), extend this file to route HTTP traffic to Django and WebSocket traffic to a Channels application router.
```

---

## Settings — `backend/settings/`

---

```
File: backend/settings/__init__.py

Responsibility:
Makes the settings/ folder a Python package so DJANGO_SETTINGS_MODULE resolves backend.settings.production as a valid dotted-path import.

Functional Role:
Package boundary declaration — without this file, Python cannot treat settings/ as a module namespace and Django startup fails with ModuleNotFoundError.

System Interactions:
- Python import system
- manage.py (reads DJANGO_SETTINGS_MODULE at startup)
- wsgi.py and asgi.py (environment variable resolution)

Key Concepts / Features:
- Enables the settings split pattern (base / development / production)
- Zero-content file; presence alone provides the package boundary

Task-Oriented Prompt:
Do not add logic to this file; its role is purely structural. If a new settings environment is needed (e.g., staging.py), create it as a sibling of base.py and reference it via DJANGO_SETTINGS_MODULE.
```

---

```
File: backend/settings/base.py

Responsibility:
The environment-agnostic settings source of truth, defining the app registry, middleware stack, DRF configuration, template engine, and static/media path resolution shared by all environments.

Functional Role:
Shared configuration — loaded first by development.py and production.py via wildcard import; establishes every setting that does not change between environments, preventing duplication and drift.

System Interactions:
- All five domain apps (apps.projects, apps.blog, apps.resume, apps.contact, apps.knowledge)
- core.pagination (referenced in REST_FRAMEWORK defaults)
- core.permissions (referenced in REST_FRAMEWORK defaults)
- django-cors-headers middleware
- django-filter (DRF filter backend)
- python-decouple (reads SECRET_KEY, ALLOWED_HOSTS from .env)
- templates/index.html (TEMPLATES engine configuration)

Key Concepts / Features:
- Wildcard import base for environment-specific settings files
- INSTALLED_APPS registry for all domain apps and third-party packages
- REST_FRAMEWORK block sets global pagination, filtering, and permission defaults
- STATIC_ROOT and MEDIA_ROOT path definitions using pathlib.Path
- Does not define DEBUG, DATABASES, or security headers

Task-Oriented Prompt:
When registering a new domain app, add it to INSTALLED_APPS here rather than in environment files; only add settings to base.py if they are identical across all environments.
```

---

```
File: backend/settings/development.py

Responsibility:
Overrides base.py with developer-friendly settings — verbose errors, relaxed CORS, SQLite database, and the Django Debug Toolbar.

Functional Role:
Local development configuration — activated via DJANGO_SETTINGS_MODULE=backend.settings.development; provides the maximum feedback surface for iterative development without production constraints.

System Interactions:
- backend/settings/base.py (wildcard import)
- db.sqlite3 (file-based database, no server required)
- django-debug-toolbar (appended to INSTALLED_APPS and MIDDLEWARE)
- Vite dev server at localhost:5173 (CORS_ALLOW_ALL_ORIGINS = True)
- pytest.ini (references this module for test runs)

Key Concepts / Features:
- DEBUG = True enables Django's exception detail page and query tracing
- CORS open policy allows the Vite HMR server to call Django APIs freely
- SQLite removes PostgreSQL dependency from local developer setup
- Debug Toolbar middleware injected for SQL query inspection in-browser

Task-Oriented Prompt:
When adding a new third-party package that requires development-only configuration (e.g., django-silk for profiling), extend this file rather than base.py to prevent the package from loading in production.
```

---

```
File: backend/settings/production.py

Responsibility:
Overrides base.py with hardened, performance-tuned production settings — PostgreSQL, WhiteNoise static serving, HTTPS enforcement, and Sentry error monitoring.

Functional Role:
Production deployment configuration — activated via DJANGO_SETTINGS_MODULE=backend.settings.production; enforces all security headers, disables debug output, and wires up infrastructure services.

System Interactions:
- backend/settings/base.py (wildcard import)
- python-decouple (reads DATABASE_URL, SECRET_KEY, SENTRY_DSN from environment)
- psycopg2 (PostgreSQL adapter)
- WhiteNoiseMiddleware (inserted after SecurityMiddleware in MIDDLEWARE)
- sentry-sdk (initialised with SENTRY_DSN for error tracking)
- staticfiles/ directory (STATIC_ROOT for WhiteNoise serving)

Key Concepts / Features:
- DEBUG = False — hides stack traces from public responses
- SECURE_HSTS_SECONDS, SECURE_SSL_REDIRECT, SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE
- WhiteNoise serves compressed static files directly from Django without a CDN or Nginx
- Sentry SDK captures unhandled exceptions and performance traces in real time
- All secrets read from environment variables, never hardcoded

Task-Oriented Prompt:
When adding a new environment variable (e.g., AWS_S3_BUCKET for media offloading), read it with python-decouple here and provide a corresponding entry in .env.example; never hardcode credentials in this file.
```

---

## Core Utilities — `core/`

---

```
File: core/__init__.py

Responsibility:
Marks the core/ directory as a Python package, enabling from core.mixins import TimestampMixin style imports across all domain apps.

Functional Role:
Package boundary declaration — without this file, the shared utility modules are unreachable via the dotted-path import system.

System Interactions:
- All five domain apps (import from core.mixins, core.pagination, core.permissions, core.utils)
- Python import system

Key Concepts / Features:
- Zero-content package declaration
- Enables horizontal code sharing without app-to-app imports (which would create circular dependencies)

Task-Oriented Prompt:
Do not add logic here; if core grows large enough to require sub-packages (e.g., core/validators/), add an __init__.py to each sub-folder following the same pattern.
```

---

```
File: core/mixins.py

Responsibility:
Provides abstract Django model base classes that inject reusable fields (timestamps, slugs, SEO metadata) into any domain model via multiple inheritance without duplicating column definitions.

Functional Role:
Shared model behaviour — consumed by models.py in every domain app; because all classes are abstract, Django never creates standalone tables for them.

System Interactions:
- apps/projects/models.py (Project inherits TimestampMixin + SEOMixin)
- apps/blog/models.py (Post inherits TimestampMixin + SEOMixin)
- apps/resume/models.py (all models inherit TimestampMixin)
- apps/contact/models.py (ContactSubmission inherits TimestampMixin)
- apps/knowledge/models.py (Course, Tool inherit TimestampMixin + SEOMixin)
- django.db.models (abstract model base)

Key Concepts / Features:
- TimestampMixin: auto-managed created_at and updated_at DateTimeFields
- SlugMixin: unique SlugField with auto-generation hook
- SEOMixin: extends SlugMixin with meta_title (60 char) and meta_desc (160 char) fields
- Meta.abstract = True prevents standalone table creation
- Multiple inheritance pattern for composable model behaviour

Task-Oriented Prompt:
When adding a new shared model field (e.g., is_published boolean), add it as a new abstract mixin class here rather than modifying existing mixins or duplicating the field in each domain app's models.py.
```

---

```
File: core/pagination.py

Responsibility:
Defines the project-wide pagination class applied globally to all DRF list endpoints, ensuring consistent page size and response envelope structure across every API.

Functional Role:
Response shaping — declared in base.py under REST_FRAMEWORK["DEFAULT_PAGINATION_CLASS"]; intercepts all list view querysets and wraps results in a standardised JSON envelope.

System Interactions:
- backend/settings/base.py (registered as default pagination class)
- All list views across apps/projects, apps/blog, apps/knowledge (applied automatically)
- React frontend (consumes count, next, previous, results fields)
- rest_framework.pagination.PageNumberPagination (parent class)

Key Concepts / Features:
- page_size = 10 applied globally without per-view configuration
- Response envelope: count (total), next (URL or null), previous (URL or null), results (sliced data)
- Frontend reads next/previous to implement pagination controls without hardcoded page sizes
- apps/knowledge/views.py intentionally bypasses this for ToolListView (full dataset required for client-side filtering)

Task-Oriented Prompt:
When a specific endpoint requires a different page size (e.g., homepage featured projects limited to 3), override pagination_class at the view level rather than modifying this global class; changes here affect all list endpoints simultaneously.
```

---

```
File: core/permissions.py

Responsibility:
Centralises DRF access control logic, separating anonymous read access from admin-only write access without embedding permission checks in individual views.

Functional Role:
Security enforcement — declared in base.py under REST_FRAMEWORK["DEFAULT_PERMISSION_CLASSES"]; applied automatically to every view unless explicitly overridden at the view level.

System Interactions:
- backend/settings/base.py (registered as default permission class)
- All views across all domain apps (applied as default)
- apps/contact/views.py (overrides to AllowAny for anonymous POST)
- rest_framework.permissions.BasePermission (parent class)
- request.user.is_staff (evaluated for write method gating)

Key Concepts / Features:
- ReadOnly: permits GET, HEAD, OPTIONS from any client including anonymous visitors
- IsAdminOrReadOnly: safe HTTP methods pass freely; POST/PUT/PATCH/DELETE require is_staff = True
- View-level override pattern allows contact submissions from unauthenticated users
- Centralised permission logic eliminates per-view permission boilerplate

Task-Oriented Prompt:
When adding a new app whose endpoints require a different access model (e.g., authenticated users can submit course reviews), create a new permission class in this file rather than importing from rest_framework directly in the view; this keeps all permission logic auditable in one location.
```

---

```
File: core/utils.py

Responsibility:
Houses pure helper functions used across multiple apps — slug generation, contact email dispatch, and HTML sanitisation — keeping business logic out of models, serializers, and views.

Functional Role:
Shared service layer — a stateless utility module called by domain apps as needed; prevents logic duplication and makes shared behaviour independently testable.

System Interactions:
- apps/contact/views.py (calls send_contact_email after form save)
- apps/blog/models.py (calls sanitize_html on Post body before save)
- apps/projects/models.py (calls generate_slug on Project pre-save)
- django.utils.text.slugify (used by generate_slug)
- django.core.mail.send_mail (used by send_contact_email)
- bleach (HTML sanitisation allowlist used by sanitize_html)
- python-decouple (reads email credentials from .env)

Key Concepts / Features:
- generate_slug: uniqueness loop appends integer suffix to prevent slug collisions across models
- send_contact_email: wrapped in try/except so SMTP failure never rolls back the database save
- sanitize_html: bleach allowlist strips script tags while preserving safe formatting markup
- All functions are stateless and dependency-free from Django's request cycle

Task-Oriented Prompt:
When adding a new shared utility (e.g., resize_image for thumbnail generation), add it here as a standalone function with no Django model imports; if it requires model access, pass the model instance as a parameter to preserve statelessness.
```

---

## App: Projects — `apps/projects/`

---

```
File: apps/projects/__init__.py

Responsibility:
Declares apps/projects/ as a Python package required for Django's module resolution and INSTALLED_APPS registration.

Functional Role:
Package boundary — enables apps.projects to resolve as a dotted-path entry in INSTALLED_APPS and allows intra-app imports.

System Interactions:
- Django's app registry (INSTALLED_APPS in base.py)
- Python import system

Key Concepts / Features:
- Zero-content package declaration
- Required for apps.py, models.py, views.py, etc. to be importable

Task-Oriented Prompt:
Do not add logic here; this file exists solely to satisfy Python's package structure requirement.
```

---

```
File: apps/projects/apps.py

Responsibility:
Django's app configuration class for the projects domain, registering app metadata and providing a hook for startup signal connections.

Functional Role:
App registration — read by Django during startup to locate models, migrations, and admin registrations; the ready() method enables signal handler wiring without circular imports.

System Interactions:
- Django app registry (reads name = "apps.projects")
- Signal system (ready() hook for pre_save slug auto-generation if implemented)
- apps/projects/models.py (models discovered via app label)

Key Concepts / Features:
- name = "apps.projects" aligns with INSTALLED_APPS entry in base.py
- default_auto_field controls primary key type for all models in this app
- ready() lifecycle hook available for signal registration without import-time side effects

Task-Oriented Prompt:
If adding model signals (e.g., auto-generating slugs or clearing cache on Project save), register them inside the ready() method here to avoid import-time circular dependency issues.
```

---

```
File: apps/projects/models.py

Responsibility:
Defines the database schema for all project-related entities: projects, technology tags, categories, and project image galleries.

Functional Role:
Data layer — the authoritative definition of the projects domain's relational structure; consumed by migrations, admin, serializers, filters, and views.

System Interactions:
- core/mixins.py (Project inherits TimestampMixin + SEOMixin)
- apps/projects/migrations/ (schema versioning)
- apps/projects/admin.py (model registration)
- apps/projects/serializers.py (ORM instances serialised to JSON)
- apps/projects/filters.py (filter fields mapped to model relationships)
- Django ORM (ManyToManyField for TechTag and ProjectCategory)
- media/projects/ (ImageField upload path for ProjectImage)

Key Concepts / Features:
- ProjectCategory: lookup table for grouping (AI/ML, Backend, Frontend, DevOps)
- TechTag: shared lookup table reusable across multiple projects
- Project: core model with ManyToManyField to both TechTag and ProjectCategory
- ProjectImage: related model with ForeignKey(on_delete=CASCADE) for the image gallery
- SEOMixin provides slug, meta_title, meta_desc columns for SEO-driven URL and metadata management

Task-Oriented Prompt:
When adding a new project attribute (e.g., a results_impact text field for metrics), add it to the Project model here and run makemigrations; do not store structured content as JSON blobs — prefer explicit fields for queryability and admin editability.
```

---

```
File: apps/projects/serializers.py

Responsibility:
Transforms Project model instances into two distinct JSON structures — a lightweight list shape for the projects grid and a complete detail shape for individual project pages.

Functional Role:
Data shaping — the boundary between Django ORM objects and the JSON API consumed by the React frontend; enforces the separation between list and detail data contracts.

System Interactions:
- apps/projects/models.py (Project, TechTag, ProjectCategory, ProjectImage)
- apps/projects/views.py (serializer selection based on endpoint type)
- React /projects page (consumes ProjectListSerializer output)
- React /projects/{slug} page (consumes ProjectDetailSerializer output)
- rest_framework.serializers.ModelSerializer (parent class)

Key Concepts / Features:
- ProjectListSerializer: exposes id, title, slug, meta_desc, tech_tags, category, year, thumbnail only — prevents over-fetching on index page
- ProjectDetailSerializer: exposes all fields including overview, challenge, solution, role, timeline, live_url, github_url, and nested images array
- Nested serializers for TechTag and ProjectImage provide structured sub-objects rather than flat IDs
- Two-serializer pattern enforces the API surface contract independently for list and detail contexts

Task-Oriented Prompt:
When adding a new field to the Project model, decide first whether it belongs on the list card (add to ProjectListSerializer) or only on the detail page (add to ProjectDetailSerializer only); defaulting to adding fields to both causes unnecessary data transfer on every list request.
```

---

```
File: apps/projects/views.py

Responsibility:
Handles HTTP requests to project API endpoints, selecting the appropriate serializer, applying filters, and delegating pagination.

Functional Role:
Request orchestration — the entry point for all project API traffic; coordinates between the filter layer, pagination layer, serializers, and the ORM queryset.

System Interactions:
- apps/projects/models.py (Project queryset source)
- apps/projects/serializers.py (ProjectListSerializer, ProjectDetailSerializer)
- apps/projects/filters.py (ProjectFilter applied to queryset)
- core/pagination.py (StandardResultsPagination applied to list results)
- core/permissions.py (IsAdminOrReadOnly enforced by default)
- apps/projects/urls.py (view classes bound to URL patterns)
- React /projects and /projects/{slug} (API consumers)

Key Concepts / Features:
- ProjectListView: ordered by year descending, filtered via ProjectFilter, paginated to 10
- ProjectDetailView: slug-based lookup with automatic 404 on miss
- Write operations (POST, PUT, DELETE) blocked for non-admin users by inherited permission class
- Serializer selection at the view class level, not at request time

Task-Oriented Prompt:
When adding a featured projects endpoint for the homepage carousel (e.g., GET /api/projects/featured/), create a new view class in this file filtered by a featured boolean field rather than modifying ProjectListView; preserving single-responsibility keeps each view independently testable.
```

---

```
File: apps/projects/filters.py

Responsibility:
Declares the filtering interface for the projects list endpoint, enabling the frontend's filter bar to query by category, tech stack, and year via URL query parameters.

Functional Role:
Query parameter processing — intercepts request query parameters, validates them against declared filter fields, and applies the corresponding ORM filter() calls to the queryset before serialisation.

System Interactions:
- apps/projects/models.py (filter fields mapped to Project, ProjectCategory, TechTag)
- apps/projects/views.py (ProjectFilter passed as filter_class)
- django_filters.FilterSet (parent class)
- React /projects filter bar (?category=ai-ml&tech=langchain query params)

Key Concepts / Features:
- category filter: maps to ProjectCategory.slug via relationship traversal
- tech filter: maps to TechTag.slug via ManyToMany relationship
- year filter: exact integer match on Project.year field
- django-filter handles validation and ORM translation automatically — no manual query parsing in views
- Invalid filter values silently return an unfiltered queryset (configurable to raise errors)

Task-Oriented Prompt:
When the frontend adds a new filter control (e.g., filter by year range), add the corresponding RangeFilter field here aligned with the query parameter name the React component sends; the view requires no changes.
```

---

```
File: apps/projects/urls.py

Responsibility:
Maps URL patterns to project views, scoped under the /api/ prefix established by the root URL router.

Functional Role:
Intra-app routing — declares the two URL patterns for the projects domain and binds them to their respective view classes; included by backend/urls.py.

System Interactions:
- backend/urls.py (included via path("api/", include("apps.projects.urls")))
- apps/projects/views.py (ProjectListView, ProjectDetailView bound here)
- Django URL resolver (slug converter enforces URL-safe string matching)

Key Concepts / Features:
- projects/ pattern routes to ProjectListView (list + filtering)
- projects/<slug:slug>/ pattern captures slug and routes to ProjectDetailView
- slug URL converter rejects malformed paths at the routing layer before view execution
- No namespace declared — relies on /api/ prefix for uniqueness

Task-Oriented Prompt:
When adding a new projects sub-endpoint (e.g., /api/projects/featured/), register it above the slug pattern so the literal string "featured" is not mistakenly captured as a slug value.
```

---

```
File: apps/projects/admin.py

Responsibility:
Registers Project, TechTag, ProjectCategory, and ProjectImage models in Django's admin panel, enabling content management without a custom CMS interface.

Functional Role:
Admin configuration — controls how models are displayed, searched, and edited in the /admin/ interface; the primary content authoring tool for the portfolio owner.

System Interactions:
- apps/projects/models.py (all four models registered)
- django.contrib.admin (ModelAdmin base class)
- core/utils.py (slug auto-population triggered via prepopulated_fields)
- media/projects/ (ImageField upload widget rendered in admin)

Key Concepts / Features:
- list_display: shows title, year, category at a glance in the object list
- list_filter: sidebar filter for category and tech tags
- prepopulated_fields: auto-generates slug from title while typing, preventing manual slug errors
- filter_horizontal: many-to-many widget for TechTag assignment
- raw_id_fields on ProjectImageAdmin prevents loading all projects in a dropdown for image records

Task-Oriented Prompt:
When a content editor needs bulk-editing capability (e.g., marking multiple projects as featured at once), add a custom admin action to ProjectAdmin rather than requiring one-by-one edits; actions are defined as methods and registered via the actions list.
```

---

```
File: apps/projects/migrations/__init__.py

Responsibility:
Marks the migrations/ directory as a Python package, required for Django to discover and apply migration files in the correct order.

Functional Role:
Migration package boundary — without this file, Django's migration loader cannot import migration modules from this directory.

System Interactions:
- Django migration loader (manage.py migrate)
- All migration files within apps/projects/migrations/

Key Concepts / Features:
- Zero-content file; presence alone enables migration discovery
- Created automatically by manage.py makemigrations

Task-Oriented Prompt:
Do not edit or delete this file; it is generated and managed automatically by Django's migration framework.
```

---

```
File: apps/projects/tests/test_models.py

Responsibility:
Tests model-level behaviour for the projects domain — slug auto-generation, cascade deletes, and string representations.

Functional Role:
Unit testing — validates that model logic works correctly in isolation from HTTP concerns; catches regressions when models or mixins are modified.

System Interactions:
- apps/projects/models.py (Project, TechTag, ProjectCategory, ProjectImage)
- core/mixins.py (TimestampMixin, SEOMixin behaviour under test)
- pytest-django (test runner and database fixture management)
- factory-boy (model instance factories replacing manual object creation)

Key Concepts / Features:
- Slug uniqueness: verifies integer suffix appension on collision
- CASCADE delete: confirms ProjectImage rows are deleted when parent Project is deleted
- __str__ representation: verifies human-readable model output in admin
- Timestamp immutability: verifies created_at is not updated on subsequent saves

Task-Oriented Prompt:
When adding a new model field or constraint to Project, add a corresponding test here before writing the migration; test-first validation catches schema design issues before they propagate to the database.
```

---

```
File: apps/projects/tests/test_views.py

Responsibility:
Tests HTTP endpoint behaviour for the projects API — status codes, response shapes, filter correctness, and permission enforcement.

Functional Role:
Integration testing — validates the full request-response cycle for project endpoints using Django's test client and DRF's APIClient; catches regressions at the API contract level.

System Interactions:
- apps/projects/views.py (endpoints under test)
- apps/projects/serializers.py (response shape assertions)
- apps/projects/filters.py (filter behaviour under test)
- core/permissions.py (permission enforcement assertions)
- rest_framework.test.APIClient (HTTP simulation)
- pytest-django (database state management)

Key Concepts / Features:
- Authenticated and unauthenticated request simulation via APIClient
- Filter correctness: verifies ?category= and ?tech= return the correct subset
- 404 behaviour: verifies non-existent slugs return HTTP 404
- Permission enforcement: verifies POST returns HTTP 403 for anonymous users
- Response structure assertions against expected serializer field names

Task-Oriented Prompt:
When modifying ProjectListSerializer to add or remove a field, update the response structure assertions in this file immediately; serializer changes that break the API contract should fail tests before reaching the frontend.
```

---

## App: Blog — `apps/blog/`

---

```
File: apps/blog/models.py

Responsibility:
Defines the database schema for all blog content — posts, categories, tags, and associated images — with HTML sanitisation enforced at the model save layer.

Functional Role:
Data layer for the blog domain — establishes the relational structure for content authoring; Category and Tag are modelled as separate lookup tables reflecting the frontend's distinct filter behaviours.

System Interactions:
- core/mixins.py (Post inherits TimestampMixin + SEOMixin)
- core/utils.sanitize_html (called on Post.body before save to strip dangerous markup)
- apps/blog/migrations/ (schema versioning)
- apps/blog/admin.py (model registration)
- apps/blog/serializers.py (ORM instances serialised to JSON)
- apps/blog/filters.py (filter fields mapped to Category and Tag relationships)
- media/blog/ (PostImage upload path)
- auth.User (Post.author ForeignKey)

Key Concepts / Features:
- Category: mutually exclusive post grouping (one post belongs to one category)
- Tag: additive labelling via ManyToManyField (one post can have many tags)
- Post.featured boolean: flags posts for the homepage carousel without a separate query
- Post.read_time integer: pre-computed and stored at save time for display without recalculation
- Post.excerpt: 150-character summary stored explicitly rather than truncated at query time
- HTML body stored post-sanitisation — raw user input never persisted

Task-Oriented Prompt:
When adding a commenting system, add a Comment model here with a ForeignKey to Post and a ForeignKey to auth.User; do not add comment logic to the Post model itself — maintain single-responsibility by keeping Comment as a separate model class.
```

---

```
File: apps/blog/serializers.py

Responsibility:
Shapes blog post data for two consumption contexts — a lightweight list shape for the post index and a complete detail shape for individual post pages.

Functional Role:
Data contract definition — the boundary between Django ORM objects and JSON responses; enforces which fields are exposed on list versus detail endpoints to prevent over-fetching.

System Interactions:
- apps/blog/models.py (Post, Category, Tag, PostImage)
- apps/blog/views.py (serializer selection by view class)
- React /blog page (consumes PostListSerializer)
- React /blog/{slug} page (consumes PostDetailSerializer)
- rest_framework.serializers.ModelSerializer (parent class)

Key Concepts / Features:
- PostListSerializer: exposes id, title, slug, excerpt, published_date, read_time, category, tags — all fields required for a blog card without the body
- PostDetailSerializer: adds full body HTML, author name, images array, and meta fields for React's head injection
- Tags nested as name/slug pairs for frontend filter matching
- author exposed as display name only, not user ID, for privacy

Task-Oriented Prompt:
When the frontend's blog card design changes to require an additional field (e.g., view_count), add it to PostListSerializer only; verify it is not already on PostDetailSerializer before adding to both, to avoid duplication.
```

---

```
File: apps/blog/views.py

Responsibility:
Serves filtered, paginated blog post lists, individual post details, and a related-posts sub-endpoint for the "You might also like" section.

Functional Role:
Request orchestration for the blog domain — coordinates between the filter layer, pagination, serializer selection, and ORM; RelatedPostsView implements the content recommendation logic.

System Interactions:
- apps/blog/models.py (Post queryset source)
- apps/blog/serializers.py (PostListSerializer, PostDetailSerializer)
- apps/blog/filters.py (PostFilter applied to list queryset)
- core/pagination.py (applied to list and related views)
- core/permissions.py (read-only for public, write-only for admin)
- apps/blog/urls.py (view classes bound to URL patterns)
- React /blog and /blog/{slug} pages (API consumers)

Key Concepts / Features:
- PostListView: filters to published_date__lte=today to suppress future-dated posts
- PostDetailView: slug-based lookup with 404 fallback
- RelatedPostsView: queries posts sharing category or overlapping tags, limits to 3, ordered by published_date descending
- Draft posts (future published_date) never appear in public API responses

Task-Oriented Prompt:
When implementing post view tracking, do not add view count increment logic to PostDetailView's get() method directly; instead, fire a Django signal on retrieval and handle the counter increment in a decoupled signal receiver to keep the view stateless.
```

---

```
File: apps/blog/filters.py

Responsibility:
Declares the filtering interface for the blog list endpoint, enabling category, tag, and date-range filtering via URL query parameters from the React frontend.

Functional Role:
Query parameter processing for the blog domain — validates and translates frontend filter selections into ORM filter() calls without embedding query logic in the view.

System Interactions:
- apps/blog/models.py (Post, Category, Tag relationships)
- apps/blog/views.py (PostFilter passed as filter_class)
- django_filters.FilterSet (parent class)
- React /blog category tabs and tag cloud (?category=tutorials, ?tag=mlops)

Key Concepts / Features:
- category: FK slug lookup (mutually exclusive, maps to single Category)
- tag: M2M slug lookup (additive, one filter value matches across all associated tags)
- date_from and date_to: range filters on published_date for future archive pages
- Separation from PostListView keeps filter logic independently modifiable without view changes

Task-Oriented Prompt:
When adding a search filter (e.g., ?q= for full-text search on title and body), add a CharFilter with method= pointing to a custom filter method within this class rather than adding search logic to the view.
```

---

```
File: apps/blog/urls.py

Responsibility:
Maps URL patterns to blog views under the /api/ prefix, including the related posts sub-endpoint.

Functional Role:
Intra-app routing for the blog domain — binds three URL patterns to their respective view classes and is included by backend/urls.py.

System Interactions:
- backend/urls.py (included via path("api/", include("apps.blog.urls")))
- apps/blog/views.py (PostListView, PostDetailView, RelatedPostsView)
- Django URL resolver (slug converter on detail and related patterns)

Key Concepts / Features:
- blog/ → PostListView
- blog/<slug:slug>/ → PostDetailView
- blog/<slug:slug>/related/ → RelatedPostsView
- Nested slug pattern for related posts mirrors the frontend's URL convention

Task-Oriented Prompt:
When adding a post search endpoint (e.g., /api/blog/search/?q=), register it above the slug pattern to prevent "search" from being interpreted as a post slug value.
```

---

```
File: apps/blog/admin.py

Responsibility:
Registers Post, Category, Tag, and PostImage in Django's admin panel with authoring-optimised configuration for the blog content workflow.

Functional Role:
Admin configuration for the blog domain — configures the admin interface for a content authoring workflow including featured post toggling, draft management, and tag assignment.

System Interactions:
- apps/blog/models.py (all models registered)
- django.contrib.admin (ModelAdmin base class)
- core/utils.sanitize_html (triggered indirectly via model save in admin)
- media/blog/ (image upload widget)

Key Concepts / Features:
- list_display: title, published_date, category, featured, read_time for at-a-glance content status
- date_hierarchy: enables drill-down by published year/month in admin list view
- prepopulated_fields: auto-generates slug from title
- filter_horizontal: tag M2M widget for post authoring
- featured toggle exposed in list_display for quick homepage carousel management

Task-Oriented Prompt:
When adding a bulk-publish admin action (e.g., mark selected posts as published by setting published_date to today), implement it as a custom admin action method on PostAdmin registered via the actions attribute.
```

---

```
File: apps/blog/tests/test_models.py

Responsibility:
Tests model-level behaviour for the blog domain — slug generation, HTML sanitisation on save, cascade deletes, and draft suppression logic.

Functional Role:
Unit testing for blog models — validates data integrity rules and model method behaviour independently of HTTP concerns.

System Interactions:
- apps/blog/models.py (Post, Category, Tag, PostImage)
- core/utils.sanitize_html (sanitisation behaviour under test via model save)
- pytest-django, factory-boy

Key Concepts / Features:
- Sanitisation: verifies script tags are stripped from Post.body on save
- Slug collision: verifies integer suffix appension for duplicate titles
- Draft suppression: verifies future-dated posts are excluded from published queryset
- Tag cascade: verifies M2M relationship integrity when a Tag is deleted

Task-Oriented Prompt:
When modifying sanitize_html allowlist in core/utils.py, add a corresponding test here that asserts the newly allowed or disallowed tag is handled correctly on Post save to prevent silent regressions in content security.
```

---

```
File: apps/blog/tests/test_views.py

Responsibility:
Tests HTTP endpoint behaviour for the blog API — status codes, draft suppression in responses, filter accuracy, related post logic, and permission enforcement.

Functional Role:
Integration testing for blog endpoints — validates the full request-response cycle and content visibility rules from the API consumer's perspective.

System Interactions:
- apps/blog/views.py (all three view classes under test)
- apps/blog/serializers.py (response shape assertions)
- apps/blog/filters.py (filter parameter handling under test)
- rest_framework.test.APIClient
- pytest-django

Key Concepts / Features:
- Draft suppression: verifies future-dated posts return HTTP 404 on detail and are absent from list
- Related posts: verifies the related endpoint returns at most 3 results sharing category or tags
- Filter accuracy: verifies ?category= and ?tag= return correct post subsets
- Permission: verifies POST returns HTTP 403 for anonymous users

Task-Oriented Prompt:
When adding a search endpoint, write failing tests here first asserting the expected response structure before implementing the view; this ensures the API contract is defined before the implementation begins.
```

---

## App: Resume — `apps/resume/`

---

```
File: apps/resume/models.py

Responsibility:
Defines the database schema for all structured career data — skills with categories, work experience, education, and certifications — making resume content CMS-editable.

Functional Role:
Data layer for the resume domain — establishes the normalised relational schema that allows the admin to update career content without a code deployment.

System Interactions:
- core/mixins.py (all models inherit TimestampMixin)
- apps/resume/migrations/ (schema versioning)
- apps/resume/admin.py (model registration)
- apps/resume/serializers.py (ORM instances aggregated into nested JSON)
- media/resume/ (PDF upload path for Certification verification documents)

Key Concepts / Features:
- SkillCategory: lookup table grouping skills by domain (Frontend, Backend, MLOps/DevOps)
- Skill: name, proficiency level, optional icon identifier — belongs to one SkillCategory
- Experience: stores achievements as structured text; ordered by date in serialiser
- Education: degree, institution, graduation year, optional honours
- Certification: includes verification URL for external credentialing links
- TimestampMixin on all models: admin visibility of when records were last updated

Task-Oriented Prompt:
When adding a new career section (e.g., Publications), create a new model here rather than extending an existing model with unrelated fields; the serialiser's aggregation pattern accommodates new model additions without breaking the existing API contract.
```

---

```
File: apps/resume/serializers.py

Responsibility:
Aggregates all resume components into a single nested JSON response, eliminating multiple API round-trips from the React resume page.

Functional Role:
Data aggregation — acts as a composite serialiser that queries and nests five separate models (Skill, SkillCategory, Experience, Education, Certification) into one JSON payload returned by a single GET request.

System Interactions:
- apps/resume/models.py (all five models as data sources)
- apps/resume/views.py (ResumeSerializer instantiated with aggregated data dict)
- React /resume page (consumes single nested JSON object)
- rest_framework.serializers.Serializer (non-model parent class)

Key Concepts / Features:
- Non-model serialiser acts as an aggregator, not a direct model wrapper
- Nested serialisers for each component: SkillSerializer groups skills under categories
- ExperienceSerializer orders by start_date descending for chronological display
- Single-endpoint pattern avoids N+1 round-trips from the React page
- Write-only field declarations prevent any resume data from being modified via the public API

Task-Oriented Prompt:
When adding a new resume section model (e.g., Publications), add a corresponding nested serialiser class here and include it as a field in ResumeSerializer; update ResumeView to query the new model and include it in the data dict passed to the serialiser.
```

---

```
File: apps/resume/views.py

Responsibility:
Serves the complete resume data structure as a single API endpoint by explicitly querying all resume models and passing aggregated results to ResumeSerializer.

Functional Role:
Service orchestration for the resume domain — functions as a data assembly point rather than a standard CRUD view; there is no queryset, only explicit model queries and serialiser instantiation.

System Interactions:
- apps/resume/models.py (all five models queried directly)
- apps/resume/serializers.py (ResumeSerializer instantiated with assembled data dict)
- core/permissions.py (IsAdminOrReadOnly — GET public, write ops admin-only)
- apps/resume/urls.py (ResumeView bound to /api/resume/)
- React /resume page (single GET consumer)
- rest_framework.views.APIView (parent class, not GenericAPIView)

Key Concepts / Features:
- APIView not GenericAPIView: no queryset or get_queryset() — data assembled manually
- Explicit per-model queries allow fine-grained ordering per section (e.g., experience by date, education by year)
- Single GET endpoint eliminates the need for frontend to coordinate multiple requests
- No POST/PUT/DELETE exposed — resume content managed exclusively via Django admin

Task-Oriented Prompt:
When adding a new resume section, add the model query here and include it in the data dict before passing to ResumeSerializer; ensure the key name matches the field declared in ResumeSerializer exactly to avoid silent KeyError omissions.
```

---

```
File: apps/resume/urls.py

Responsibility:
Maps the single resume API endpoint to ResumeView under the /api/ prefix.

Functional Role:
Intra-app routing for the resume domain — a minimal URL configuration registering one pattern; included by backend/urls.py.

System Interactions:
- backend/urls.py (included via path("api/", include("apps.resume.urls")))
- apps/resume/views.py (ResumeView bound here)

Key Concepts / Features:
- Single URL pattern: resume/ → ResumeView
- No slug or ID parameters — the resume is a singleton resource
- Minimal configuration reflects the resume domain's single-endpoint design

Task-Oriented Prompt:
If a PDF download endpoint is added (e.g., GET /api/resume/pdf/), register it here as a second URL pattern pointing to a new ResumeDownloadView; do not add download logic to ResumeView.
```

---

```
File: apps/resume/tests/test_views.py

Responsibility:
Tests the resume API endpoint — response structure, completeness of nested data, and ordering correctness for experience and education sections.

Functional Role:
Integration testing for the resume endpoint — validates that all five model sections are present, correctly nested, and ordered in the single GET response.

System Interactions:
- apps/resume/views.py (ResumeView under test)
- apps/resume/serializers.py (response shape assertions)
- apps/resume/models.py (factory-created test fixtures)
- rest_framework.test.APIClient, pytest-django

Key Concepts / Features:
- Completeness assertion: verifies all five sections (skills, experience, education, certifications, categories) are present in the response
- Ordering assertion: verifies experience entries appear newest-first
- Empty section handling: verifies graceful empty arrays rather than null or omission
- Permission: verifies POST returns HTTP 405 (method not allowed)

Task-Oriented Prompt:
When adding a new resume section, write a failing test here first asserting the new section key appears in the response with the correct structure before modifying the view and serialiser.
```

---

## App: Contact — `apps/contact/`

---

```
File: apps/contact/models.py

Responsibility:
Persists every contact form submission to the database, providing an admin-accessible backup of all inbound messages independent of email delivery success.

Functional Role:
Persistence layer for the contact domain — ensures no submission is lost due to SMTP failure by committing the record before attempting email dispatch.

System Interactions:
- core/mixins.py (ContactSubmission inherits TimestampMixin for created_at)
- apps/contact/migrations/ (schema versioning)
- apps/contact/admin.py (model registration with is_read toggle)
- apps/contact/serializers.py (model fields validated and written)
- apps/contact/views.py (instance saved then passed to email utility)

Key Concepts / Features:
- name, email, subject, message: the four public-facing form fields
- honeypot: hidden field validated by serialiser; bots that auto-fill all fields are detected
- ip_address: populated by the view from request.META for spam auditing
- is_read: boolean toggled in admin to track which messages have been actioned
- TimestampMixin provides created_at for admin chronological browsing

Task-Oriented Prompt:
If adding spam scoring (e.g., flagging submissions from repeated IPs), add a spam_score IntegerField and is_flagged BooleanField here and populate them in the view's perform_create; do not add scoring logic to the model's save() method to keep models free of request-context dependencies.
```

---

```
File: apps/contact/serializers.py

Responsibility:
Validates incoming contact form data and enforces honeypot anti-spam detection before any persistence or email logic executes.

Functional Role:
Input validation and anti-spam gating — the first line of defence against malformed or bot-submitted data; all validation runs before perform_create is called in the view.

System Interactions:
- apps/contact/models.py (ContactSubmission as model source)
- apps/contact/views.py (ContactSerializer used in ContactCreateView)
- DRF field validators (EmailField format, required field enforcement)
- React /contact form (JSON body consumed and validated here)

Key Concepts / Features:
- honeypot field: write_only=True, required=False; validate_honeypot() raises ValidationError on any non-empty value
- EmailField enforces RFC-compliant email format before save
- All fields write-only: no GET endpoint ever returns submission data to public clients
- Honeypot mechanism is silent to the submitter — bots receive HTTP 400, indistinguishable from real validation errors

Task-Oriented Prompt:
When adding a subject dropdown (replacing free-text subject), update the subject field to a ChoiceField here with an enumerated list of allowed values; the React form and the model field must be updated in alignment.
```

---

```
File: apps/contact/views.py

Responsibility:
Receives validated contact form submissions, persists them with IP metadata, triggers notification email dispatch, and returns structured success or error responses.

Functional Role:
Request orchestration for the contact domain — overrides the default permission class to allow anonymous POST, then coordinates persistence and email notification in sequence.

System Interactions:
- apps/contact/serializers.py (ContactSerializer validates request body)
- apps/contact/models.py (ContactSubmission instance saved in perform_create)
- core/utils.send_contact_email (called after save; wrapped in try/except)
- core/permissions.py (overridden with AllowAny at view level for anonymous POST)
- apps/contact/urls.py (ContactCreateView bound to /api/contact/)
- React /contact form (POST consumer and response handler)

Key Concepts / Features:
- AllowAny permission override: only anonymous-writable view in the entire backend
- perform_create injects ip_address from request.META before save
- send_contact_email called inside try/except: SMTP failure logs the error but does not trigger HTTP 500
- Returns HTTP 201 on success; HTTP 400 with field-level error dict on validation failure
- Database save and email dispatch are deliberately decoupled: persistence is guaranteed, email is best-effort

Task-Oriented Prompt:
When adding an autoresponder email to the submitter, call a second utility function after send_contact_email inside the same try/except block rather than triggering it from the model's post_save signal; keeping all email logic in the view makes the flow explicit and testable.
```

---

```
File: apps/contact/urls.py

Responsibility:
Maps the single contact form POST endpoint to ContactCreateView under the /api/ prefix.

Functional Role:
Intra-app routing for the contact domain — minimal one-pattern configuration; included by backend/urls.py.

System Interactions:
- backend/urls.py (included via path("api/", include("apps.contact.urls")))
- apps/contact/views.py (ContactCreateView bound here)

Key Concepts / Features:
- Single URL pattern: contact/ → ContactCreateView
- POST-only by view design; GET on this URL returns HTTP 405
- No slug or ID parameters — submissions are write-only, never individually retrieved by public clients

Task-Oriented Prompt:
Do not add a list or detail retrieval URL here; contact submissions are admin-only data. If an admin-facing submissions list API is ever needed, gate it with IsAdminUser permission in a new view and register a separate URL pattern here.
```

---

```
File: apps/contact/tests/test_views.py

Responsibility:
Tests the contact form API endpoint — successful submission persistence, honeypot rejection, email dispatch attempt, validation error responses, and anonymous access permission.

Functional Role:
Integration testing for the contact endpoint — validates the full submission lifecycle from form POST to database persistence and email trigger.

System Interactions:
- apps/contact/views.py (ContactCreateView under test)
- apps/contact/serializers.py (validation behaviour under test)
- apps/contact/models.py (persistence assertions)
- core/utils.send_contact_email (mocked to isolate SMTP from test environment)
- rest_framework.test.APIClient, pytest-django

Key Concepts / Features:
- Honeypot rejection: verifies non-empty honeypot field returns HTTP 400
- Persistence: verifies ContactSubmission.objects.count() increments on valid POST
- Email mock: patches core.utils.send_contact_email to prevent real SMTP calls in test suite
- SMTP failure isolation: verifies HTTP 201 is still returned when email mock raises an exception
- Anonymous access: verifies HTTP 201 without authentication credentials

Task-Oriented Prompt:
When adding the autoresponder email, add a test here that mocks both email functions independently and asserts both are called on valid submission and neither causes HTTP 500 if they raise exceptions.
```

---

## App: Knowledge — `apps/knowledge/`

---

```
File: apps/knowledge/models.py

Responsibility:
Defines the database schema for structured educational content — courses with sequenced lessons and a categorised tools directory with featured flagging.

Functional Role:
Data layer for the knowledge domain — establishes the relational structure for course authoring and tool curation, both admin-managed without code changes.

System Interactions:
- core/mixins.py (Course, Tool inherit TimestampMixin + SEOMixin)
- apps/knowledge/migrations/ (schema versioning)
- apps/knowledge/admin.py (model registration)
- apps/knowledge/serializers.py (ORM instances serialised to JSON)
- apps/knowledge/filters.py (if filtering is extended)

Key Concepts / Features:
- Course: difficulty level (beginner/intermediate/advanced), estimated hours, GitHub URL
- Lesson: ForeignKey to Course with on_delete=CASCADE; order IntegerField for manual sequencing; optional video embed URL
- ToolCategory: lookup table for tool grouping (Editors, CLI Tools, AI Assistants)
- Tool: name, URL, description, category FK, featured boolean for homepage highlights
- Resource: general-purpose link model (title, URL, description, resource type) for reference section
- SEOMixin on Course and Tool provides slug and meta fields for SEO-driven knowledge base URLs

Task-Oriented Prompt:
When adding a progress tracking feature (e.g., marking lessons as completed by a user), do not add user-specific state to the Lesson model; create a separate LessonProgress model with ForeignKeys to both Lesson and auth.User to keep the content schema user-agnostic.
```

---

```
File: apps/knowledge/serializers.py

Responsibility:
Serialises courses and tools into distinct JSON shapes for their respective list, detail, and tools directory endpoints.

Functional Role:
Data contract definition for the knowledge domain — shapes course syllabi with nested lessons and provides a flat tool list for client-side category filtering.

System Interactions:
- apps/knowledge/models.py (Course, Lesson, ToolCategory, Tool)
- apps/knowledge/views.py (serialiser selection by view class)
- React /knowledge/courses (consumes CourseListSerializer)
- React /knowledge/courses/{slug} (consumes CourseDetailSerializer with nested lessons)
- React /knowledge/tools (consumes ToolSerializer flat list)
- rest_framework.serializers.ModelSerializer (parent class)

Key Concepts / Features:
- CourseListSerializer: exposes title, slug, description, difficulty, estimated hours, and lesson_count (annotated aggregate — not a stored field)
- CourseDetailSerializer: nests all LessonSerializer results ordered by the order field
- LessonSerializer: exposes title, content, order, and optional video_url
- ToolSerializer: flat structure with category name denormalised — no nested category object
- Tools are not paginated at the API level; full list returned for client-side category filtering

Task-Oriented Prompt:
When adding a lesson_count annotation to CourseListSerializer, compute it via SerializerMethodField reading from an annotated queryset in CourseListView rather than issuing a new query per course; this prevents N+1 queries on the courses list endpoint.
```

---

```
File: apps/knowledge/views.py

Responsibility:
Serves courses and tools from separate endpoints matching the frontend's /knowledge/courses and /knowledge/tools sub-pages, with tools deliberately unpaginated for client-side filtering.

Functional Role:
Request orchestration for the knowledge domain — intentionally deviates from the global pagination default for ToolListView, which returns the complete tool dataset for the React filter UI.

System Interactions:
- apps/knowledge/models.py (Course, Tool queryset sources)
- apps/knowledge/serializers.py (CourseListSerializer, CourseDetailSerializer, ToolSerializer)
- core/pagination.py (applied to CourseListView and CourseDetailView; bypassed for ToolListView)
- core/permissions.py (IsAdminOrReadOnly default)
- apps/knowledge/urls.py (view classes bound to URL patterns)
- React /knowledge/courses and /knowledge/tools pages

Key Concepts / Features:
- CourseListView: ordered by difficulty ascending (beginner first) with pagination
- CourseDetailView: slug-based lookup with full lesson nesting; 404 on miss
- ToolListView: pagination_class = None override returns full dataset for client-side filtering
- The tools client-side filtering pattern avoids additional API requests on every category tab switch
- Intentional pagination override is the single exception to the global pagination policy

Task-Oriented Prompt:
When the tool directory grows large enough (>100 entries) that the full-dataset approach degrades performance, introduce server-side category filtering via a ToolFilter class and re-enable pagination in ToolListView; update the React tools page to fetch per category rather than filtering in memory.
```

---

```
File: apps/knowledge/urls.py

Responsibility:
Maps four URL patterns for the knowledge domain — course list, course detail, and tools list — under the /api/ prefix.

Functional Role:
Intra-app routing for the knowledge domain — URL hierarchy mirrors the frontend's sub-page structure under /knowledge/ for developer predictability.

System Interactions:
- backend/urls.py (included via path("api/", include("apps.knowledge.urls")))
- apps/knowledge/views.py (CourseListView, CourseDetailView, ToolListView)
- Django URL resolver (slug converter on course detail pattern)

Key Concepts / Features:
- knowledge/courses/ → CourseListView
- knowledge/courses/<slug:slug>/ → CourseDetailView
- knowledge/tools/ → ToolListView
- URL hierarchy directly mirrors the React NavLink structure under /knowledge/ for intuitive API discoverability

Task-Oriented Prompt:
When adding a tools detail endpoint (e.g., /api/knowledge/tools/<slug>/), register it above any catch-all patterns and create a ToolDetailView in views.py; do not add detail logic to ToolListView.
```

---

```
File: apps/knowledge/admin.py

Responsibility:
Registers Course, Lesson, ToolCategory, and Tool in Django's admin panel with configuration suited to course authoring and tool curation workflows.

Functional Role:
Admin configuration for the knowledge domain — provides inline lesson editing within course records and featured tool toggling for the homepage highlights section.

System Interactions:
- apps/knowledge/models.py (all models registered)
- django.contrib.admin (ModelAdmin, TabularInline base classes)
- media/ (no image fields in knowledge domain; no media upload widgets)

Key Concepts / Features:
- LessonInline as TabularInline on CourseAdmin: lessons edited inline within the course record, ordered by the order field
- list_display for CourseAdmin: title, difficulty, estimated_hours, lesson count
- ToolAdmin: featured toggle visible in list view for quick homepage carousel management
- list_filter on ToolAdmin: filter by ToolCategory in admin sidebar
- prepopulated_fields on both CourseAdmin and ToolAdmin for slug generation

Task-Oriented Prompt:
When lesson ordering via drag-and-drop is needed in admin, integrate django-admin-sortable2 and apply it to the LessonInline here; the order field on Lesson already stores the sequence value required by the library.
```

---

## Root-Level Files

---

```
File: manage.py

Responsibility:
Django's command-line management interface, serving as the primary developer tool for server operation, database migrations, admin user creation, test execution, and static file collection.

Functional Role:
Development and deployment operations hub — every management command that interacts with the Django project (migrate, runserver, collectstatic, createsuperuser, test) is invoked through this script.

System Interactions:
- DJANGO_SETTINGS_MODULE environment variable (determines which settings module loads)
- backend/settings/development.py (default environment for local use)
- backend/settings/production.py (used during deployment pipeline)
- All apps via Django management command discovery
- pytest.ini (pytest-django uses this script's settings reference for test runs)

Key Concepts / Features:
- execute_from_command_line dispatches to the named management command
- DJANGO_SETTINGS_MODULE can be overridden per-invocation for environment switching
- collectstatic: critical deployment step that populates staticfiles/ from Vite build output and Django admin assets
- makemigrations + migrate: the two-step schema change workflow

Task-Oriented Prompt:
When creating custom management commands (e.g., a command to seed the database with sample projects for development), place them in apps/{domain}/management/commands/ following Django's convention; they are then invokable via manage.py and discoverable by the app registry automatically.
```

---

```
File: .env.example

Responsibility:
A committed, non-sensitive template listing all required environment variables, enabling new developers to bootstrap the project without guessing configuration keys or consulting documentation.

Functional Role:
Configuration documentation and onboarding tool — communicates the full set of environment dependencies to developers, CI pipelines, and deployment platforms without exposing real credentials.

System Interactions:
- python-decouple in backend/settings/base.py and production.py (reads the real .env at runtime)
- CI/CD pipeline (uses this file as the reference for required secrets to inject)
- .gitignore (the real .env is gitignored; this file is committed as its template)

Key Concepts / Features:
- Covers: SECRET_KEY, DEBUG, DATABASE_URL, ALLOWED_HOSTS, EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, DEFAULT_FROM_EMAIL, SENTRY_DSN
- Placeholder values indicate type and format, not real credentials
- Serves as implicit documentation for every environment-specific configuration decision in the settings files

Task-Oriented Prompt:
Every time a new python-decouple call is added to any settings file (e.g., config("AWS_S3_BUCKET")), add a corresponding placeholder entry to this file immediately; an outdated .env.example is a silent onboarding failure for new developers and deployment pipelines.
```

---

```
File: pytest.ini

Responsibility:
Configures pytest's Django integration at the project level so that test discovery, database management, and Django initialisation work consistently across all five app test suites without per-app configuration.

Functional Role:
Test runner configuration — the single configuration point for all test-related settings; ensures every pytest invocation targets the correct settings module and test database.

System Interactions:
- pytest-django (reads DJANGO_SETTINGS_MODULE from this file on startup)
- backend/settings/development.py (test runs execute against SQLite, not PostgreSQL)
- All test files across apps/*/tests/ (discovered via python_files pattern)
- factory-boy fixtures (no additional configuration required; pytest-django handles DB state)

Key Concepts / Features:
- DJANGO_SETTINGS_MODULE = backend.settings.development: tests run against SQLite for speed
- --reuse-db flag (via pytest-django): avoids recreating the test database on every run unless models change
- python_files = test_*.py: test discovery pattern scoped to the naming convention used across all app test directories
- Single file governs test behaviour for the entire monolith

Task-Oriented Prompt:
When the test suite grows large enough to justify parallel execution, add pytest-xdist here and configure --numprocesses; ensure factory-boy fixtures use DjangoModelFactory with transaction isolation to prevent test cross-contamination during parallel runs.
```

---

```
File: db.sqlite3

Responsibility:
The file-based SQLite database used exclusively in the development environment, eliminating the need for a running PostgreSQL server during local development.

Functional Role:
Development-only data store — created and managed automatically by manage.py migrate; stores all ORM-persisted data for local testing and admin content authoring without infrastructure dependencies.

System Interactions:
- Django ORM (all model queries, transactions, and schema operations via SQLite driver)
- backend/settings/development.py (DATABASES points to this file)
- manage.py migrate (creates and updates the schema in this file)
- pytest.ini (test runs use a separate in-memory or temporary SQLite DB, not this file)
- .gitignore (must be excluded from version control to prevent developer data leakage)

Key Concepts / Features:
- Python's built-in sqlite3 module: no external database server required
- Full Django ORM compatibility: all queries work identically to PostgreSQL from application code
- Absent in production: backend/settings/production.py points to PostgreSQL via DATABASE_URL
- Must be listed in .gitignore: committing this file leaks local data and creates merge conflicts

Task-Oriented Prompt:
If the local database becomes corrupted or out of sync with migrations, delete this file and run manage.py migrate to recreate it cleanly; it contains no production data and should be treated as ephemeral developer state.
```

---

## Infrastructure Directories

---

```
File: templates/index.html

Responsibility:
The React SPA's HTML shell that Django serves for every non-API URL, bootstrapping the React application and delegating all subsequent page rendering to the client-side router.

Functional Role:
SPA entry point — the mechanism by which the Django monolith serves the React frontend; Django's role ends at delivering this file and WhiteNoise serves the JS/CSS bundles it references.

System Interactions:
- backend/urls.py (served via the re_path catch-all TemplateView)
- staticfiles/assets/ (Vite-compiled JS/CSS bundles referenced by <script> and <link> tags)
- Django template engine (TEMPLATES configuration in base.py points here)
- React Router (reads window.location on mount, matches routes.ts, renders page component)
- src/main.tsx (React application entry point bundled by Vite into the referenced script tag)

Key Concepts / Features:
- Contains <div id="root"> mount point for React's ReactDOM.createRoot
- <script> tag references the Vite-generated hashed bundle filename (e.g., assets/index.abc123.js)
- Django never generates page content here — it is a static bootstrap shell
- Served identically for /projects, /blog, /resume, /contact, and all other non-API routes
- Client-side routing handles all sub-page rendering after this file loads in the browser

Task-Oriented Prompt:
When adding global <meta> tags (e.g., Open Graph defaults for social sharing), add them here as fallback values; React Helmet or a similar head management library running client-side will override per-page meta tags after mount without modifying this file per page.
```

---

```
File: requirements/base.txt

Responsibility:
Declares the minimum Python packages required to run the application in any environment, serving as the dependency foundation for both development and production requirement files.

Functional Role:
Core dependency manifest — read by both development.txt and production.txt via -r base.txt; changes here propagate to every environment automatically.

System Interactions:
- requirements/development.txt (-r base.txt extends this)
- requirements/production.txt (-r base.txt extends this)
- pip (installs packages listed here)
- All domain apps (consume django, djangorestframework, django-filter, django-cors-headers)
- apps/projects/models.py and apps/blog/models.py (Pillow required for ImageField processing)

Key Concepts / Features:
- django: core framework
- djangorestframework: DRF serialisers, views, pagination, permissions
- django-filter: QuerySet filtering via URL parameters (used by all filter classes)
- django-cors-headers: CORS middleware allowing the React frontend to call the API
- Pillow: image processing library required by Django's ImageField
- python-decouple: environment variable management for all settings files

Task-Oriented Prompt:
When adding a new third-party package that is required in all environments (e.g., bleach for HTML sanitisation), add it here with a minimum version pin; if it is only needed in one environment, add it to the appropriate environment-specific file instead.
```

---

```
File: requirements/development.txt

Responsibility:
Extends base.txt with developer tooling — test runner, fixtures library, profiling, and the debug toolbar — without polluting the production environment.

Functional Role:
Development environment dependency manifest — installed on developer machines and in CI test pipelines; never installed in the production container.

System Interactions:
- requirements/base.txt (-r base.txt includes all core dependencies)
- pytest.ini (pytest-django reads configuration from here)
- apps/*/tests/ (factory-boy used for fixture generation across all test suites)
- backend/settings/development.py (django-debug-toolbar activated here)

Key Concepts / Features:
- django-debug-toolbar: SQL query inspection panel rendered in the browser during development
- pytest-django: pytest plugin providing database fixtures, Django settings integration, and APIClient helpers
- factory-boy: model instance factories replacing repetitive Model.objects.create() calls in tests
- coverage: test coverage measurement and reporting
- Installed via pip install -r requirements/development.txt

Task-Oriented Prompt:
When adding a new testing dependency (e.g., pytest-cov for coverage reporting in CI), add it here rather than base.txt; always verify the package is not already available via a transitive dependency before adding.
```

---

```
File: requirements/production.txt

Responsibility:
Extends base.txt with infrastructure packages required for live deployment — WSGI server, static file serving, PostgreSQL adapter, and error monitoring.

Functional Role:
Production environment dependency manifest — installed during the CI/CD container build step; includes every package the deployed application needs beyond the core Django stack.

System Interactions:
- requirements/base.txt (-r base.txt includes all core dependencies)
- backend/wsgi.py (Gunicorn loads the WSGI application from here)
- backend/settings/production.py (WhiteNoise, psycopg2, sentry-sdk configured here)
- staticfiles/ (WhiteNoise serves files from this directory)
- PostgreSQL server (psycopg2-binary connects the Django ORM to the database)

Key Concepts / Features:
- gunicorn: multi-worker WSGI server that receives proxied HTTP requests
- whitenoise[brotli]: static file serving with brotli and gzip compression; [brotli] extra enables Brotli encoding
- psycopg2-binary: binary-distributed PostgreSQL adapter (no compilation required in container)
- sentry-sdk[django]: automatic Django integration for exception capture and performance tracing
- Installed via pip install -r requirements/production.txt in the Dockerfile or deployment script

Task-Oriented Prompt:
When switching from whitenoise to a CDN-based static file strategy (e.g., django-storages with S3), replace whitenoise here and add django-storages and boto3; update production.py simultaneously to configure the new storage backend.
```

---

```
File: media/projects/ | media/blog/ | media/resume/

Responsibility:
Runtime upload directories that store binary files persisted via Django's ImageField and FileField — project screenshots, blog images, and the downloadable resume PDF.

Functional Role:
File storage layer — files written here by Django's FileSystemStorage backend during admin uploads; served via MEDIA_URL in development and replaced by object storage (S3) in production.

System Interactions:
- backend/settings/base.py (MEDIA_ROOT points to media/)
- apps/projects/models.py (ProjectImage.ImageField writes to media/projects/)
- apps/blog/models.py (PostImage.ImageField writes to media/blog/)
- apps/resume/models.py (Certification.FileField writes to media/resume/)
- backend/urls.py (django.conf.urls.static helper serves media files in development)
- Object storage service in production (S3 bucket replaces local media/ entirely)

Key Concepts / Features:
- Excluded from collectstatic: media files are user uploads, not static assets
- Subdirectory isolation per domain: projects/, blog/, resume/ prevent filename collisions
- Development: Django serves directly from this directory via the static() URL helper
- Production: django-storages + S3 backend replaces FileSystemStorage; these directories become empty
- Must be listed in .gitignore to prevent binary uploads from entering version control

Task-Oriented Prompt:
When adding object storage for production, configure django-storages in production.py to point ImageField and FileField uploads to S3; the subdirectory structure (projects/, blog/, resume/) should be preserved as S3 key prefixes to maintain the same organisational logic.
```

---

```
File: staticfiles/

Responsibility:
The aggregated static file output directory populated by collectstatic; WhiteNoise serves its entire contents directly from the Django process in production.

Functional Role:
Unified static asset registry — the merge point where Django admin CSS/JS and the Vite-compiled React SPA meet before being served to browsers; created during the deployment pipeline, never committed to version control.

System Interactions:
- backend/settings/base.py (STATIC_ROOT = BASE_DIR / "staticfiles")
- backend/settings/production.py (WhiteNoiseMiddleware reads from this directory)
- manage.py collectstatic (populates this directory from STATICFILES_DIRS and app static/ folders)
- Vite build step (npm run build outputs compiled React bundles to staticfiles/assets/)
- WhiteNoiseMiddleware (intercepts static file requests before they reach Django views)

Key Concepts / Features:
- staticfiles/assets/: Vite-compiled JS/CSS bundles with content-hash filenames (e.g., index.abc123.js)
- Hashed filenames enable far-future cache headers — browsers cache indefinitely, new deployments bust cache via new hash
- WhiteNoise adds brotli and gzip compressed variants automatically
- Deployment ordering: Vite build must run before collectstatic; reversed order results in stale or missing bundles
- Must be in .gitignore: generated artefact, not source code

Task-Oriented Prompt:
In the CI/CD pipeline, ensure the build step order is: (1) npm run build to generate staticfiles/assets/, (2) python manage.py collectstatic --no-input to aggregate all static files; add an assertion step that verifies staticfiles/assets/ contains at least one .js file before the Django container starts to catch build failures early.
```

---

```
File: static/

Responsibility:
Source static assets committed to the repository — custom fonts, favicons, and Django admin customisations — that are collected into staticfiles/ during deployment.

Functional Role:
Source static asset store — the repository-committed subset of static files that are not generated by Vite or Django's admin; processed by collectstatic alongside app-level static directories.

System Interactions:
- backend/settings/base.py (STATICFILES_DIRS includes this directory)
- manage.py collectstatic (copies contents to staticfiles/)
- templates/index.html (favicon and font references may point to assets from this directory)

Key Concepts / Features:
- Not confused with staticfiles/: static/ is source-committed, staticfiles/ is generated output
- Appropriate contents: favicon.ico, robots.txt, site.webmanifest, any custom admin CSS overrides
- Vite-compiled React assets go to staticfiles/assets/ directly — they do not originate here
- Kept lean: only files that must be committed to version control belong here

Task-Oriented Prompt:
When adding a custom Django admin theme (e.g., overriding admin/base.html styles), place the custom CSS in static/admin/ following Django's admin override convention; do not place React source files here as they are managed entirely by Vite.
```