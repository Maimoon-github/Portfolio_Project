Backend Directory Tree

> Every file that would not exist in a real production repository has been excluded.
> `schemas.py` = Django Ninja Pydantic schemas (API contract). `services.py` = DB query layer (no logic in views/routers).

```
portfolio-backend/
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # pytest with coverage, ruff lint, mypy type-check — runs on every PR
│       └── deploy.yml           # Render/Railway deploy on push to main, gated by health-check pass
│
├── api/
│   ├── __init__.py
│   ├── auth.py                  # Validates REVALIDATE_SECRET header for the ISR webhook; Bearer token auth helper for Ninja
│   └── v1/
│       ├── __init__.py          # Instantiates NinjaAPI(version="v1"), mounts all routers — single versioning point
│       ├── portfolio.py         # Ninja router: GET /projects/ (list+filter), /projects/{slug}/, /skills/, /experience/, /testimonials/
│       ├── blog.py              # Ninja router: GET /blog/posts/ (paginated), /blog/posts/{slug}/, /blog/categories/, /blog/tags/, /blog/search/
│       ├── calculators.py       # Ninja router: GET /calculators/ (by category), /calculators/{slug}/
│       └── core.py              # Ninja router: POST /contact/, POST /newsletter/, GET /health/ (liveness probe for Render)
│
├── apps/
│   │
│   ├── portfolio/
│   │   ├── migrations/
│   │   │   ├── 0001_initial.py  # Creates Project, Skill, SkillCategory, Experience, Testimonial tables
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── admin.py             # ProjectAdmin: list_display, prepopulate_from slug, readonly thumbnail, ordering
│   │   ├── apps.py              # AppConfig: name="apps.portfolio", verbose_name="Portfolio"
│   │   ├── models.py            # Project (slug, title, description, body, thumbnail, tech_tags, live_url, repo_url, is_featured, order)
│   │   │                        # Skill (name, category FK, proficiency 1-5, icon_name), SkillCategory (name, order)
│   │   │                        # Experience (company, role, start_date, end_date, description, is_current)
│   │   │                        # Testimonial (author_name, author_role, author_company, quote, avatar, order)
│   │   ├── schemas.py           # ProjectOut, ProjectListOut, SkillOut, SkillCategoryOut, ExperienceOut, TestimonialOut
│   │   ├── services.py          # get_published_projects(), get_featured_projects(), get_project_by_slug(), get_skills_grouped()
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── factories.py     # factory_boy: ProjectFactory, SkillFactory, ExperienceFactory, TestimonialFactory
│   │       └── test_api.py      # pytest: list projects, get by slug, 404 on missing slug, featured filter
│   │
│   ├── blog/
│   │   ├── migrations/
│   │   │   ├── 0001_initial.py  # Creates BlogIndexPage, BlogPost Wagtail pages; Category, Tag snippets; Comment model
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── admin.py             # CommentAdmin: list_display (post, author, approved), approve action, filter by approved
│   │   ├── apps.py              # AppConfig: name="apps.blog"
│   │   ├── models.py            # BlogIndexPage(Page), BlogPost(Page) — Wagtail page types with StreamField body
│   │   │                        # Category(models.Model) — Wagtail @register_snippet
│   │   │                        # Tag(TaggedItemBase) — taggit integration via @register_snippet
│   │   │                        # Comment(models.Model) — approved, author_name, author_email, body, post FK
│   │   ├── schemas.py           # PostListOut, PostDetailOut, CategoryOut, TagOut, CommentIn, CommentOut
│   │   ├── services.py          # get_published_posts() — enforces .select_related("category").prefetch_related("tags")
│   │   │                        # get_post_by_slug(), get_posts_by_category(), get_posts_by_tag(), search_posts()
│   │   ├── signals.py           # Connects to page_published signal → fires POST to NEXTJS_REVALIDATE_URL with tag name
│   │   ├── wagtail_hooks.py     # Wagtail admin hooks: custom SnippetViewSet for Category/Tag, any admin panels
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── factories.py     # BlogPostFactory (creates Wagtail page under BlogIndexPage), CategoryFactory, TagFactory
│   │       └── test_api.py      # pytest: post list pagination, slug detail, category filter, tag filter, search, 404
│   │
│   ├── calculators/
│   │   ├── migrations/
│   │   │   ├── 0001_initial.py  # Creates CalculatorCategory, Calculator tables
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── admin.py             # CalculatorAdmin: list_display (title, category, slug), list_filter by category
│   │   ├── apps.py              # AppConfig: name="apps.calculators"
│   │   ├── models.py            # CalculatorCategory (name, slug, icon_name, order)
│   │   │                        # Calculator (slug, title, short_description, full_description, category FK,
│   │   │                        #   schema_org_json (JSONField), is_active, order, created_at)
│   │   ├── schemas.py           # CalculatorOut, CalculatorListOut, CalculatorCategoryOut
│   │   ├── services.py          # get_active_calculators(), get_calculators_by_category(), get_calculator_by_slug()
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── factories.py     # CalculatorCategoryFactory, CalculatorFactory
│   │       └── test_api.py      # pytest: hub list, category filter, slug detail, 404, inactive filtered out
│   │
│   └── core/
│       ├── migrations/
│       │   ├── 0001_initial.py  # Creates ContactMessage, NewsletterSubscriber tables
│       │   └── __init__.py
│       ├── __init__.py
│       ├── admin.py             # ContactMessageAdmin: read-only list (email, subject, received_at), no delete in list view
│       ├── apps.py              # AppConfig: name="apps.core"
│       ├── models.py            # ContactMessage (name, email, subject, body, received_at, is_read)
│       │                        # NewsletterSubscriber (email, subscribed_at, is_active, source)
│       ├── schemas.py           # ContactFormIn (validated: email, subject max_length), NewsletterIn
│       ├── services.py          # save_contact_message(), subscribe_newsletter() — handles dedup on email
│       └── tests/
│           ├── __init__.py
│           ├── factories.py     # ContactMessageFactory, NewsletterSubscriberFactory
│           └── test_api.py      # pytest: contact form submit, newsletter subscribe, dedup, health endpoint
│
├── config/
│   ├── __init__.py
│   ├── asgi.py                  # ASGI entrypoint — Uvicorn/Daphne; needed for future WebSocket (e.g. live comment count)
│   ├── urls.py                  # Mounts: /cms/ (Wagtail admin), /api/v1/ (NinjaAPI), /api/docs/ (Swagger UI), /api/v1/openapi.json
│   ├── wsgi.py                  # WSGI entrypoint — Gunicorn in production
│   └── settings/
│       ├── __init__.py
│       ├── base.py              # INSTALLED_APPS (Django, Wagtail, Ninja, CORS, Taggit, Storages)
│       │                        # WAGTAIL_SITE_NAME, WAGTAILADMIN_BASE_URL, WAGTAIL_FRONTEND_LOGIN_URL
│       │                        # CACHES (configured but overridden in local/production), MEDIA_ROOT, STATIC_ROOT
│       │                        # LOGGING base config, EMAIL_BACKEND (console in base)
│       ├── local.py             # DEBUG=True, SQLite fallback (or local Postgres), django-debug-toolbar
│       │                        # INTERNAL_IPS = ["127.0.0.1"], verbose LOGGING, CORS_ALLOW_ALL_ORIGINS=True
│       └── production.py        # ALLOWED_HOSTS from env, DATABASES from DATABASE_URL (python-decouple)
│                                # CACHES: django-redis with REDIS_URL, WhiteNoise STATICFILES_STORAGE
│                                # CORS_ALLOWED_ORIGINS from env, SECURE_HSTS_SECONDS, SENTRY_DSN init
│                                # EMAIL_BACKEND: django-anymail (Resend/Mailgun), STORAGES: django-storages S3/R2
│
├── media/                       # .gitignored — local dev uploads only; production uses S3 / Cloudflare R2
│   └── .gitkeep
│
├── static/                      # Populated by `collectstatic`; served by WhiteNoise in production
│   └── .gitkeep
│
├── .env                         # python-decouple source — never committed (in .gitignore)
├── .env.example                 # Committed template: SECRET_KEY, DATABASE_URL, REDIS_URL, CORS_ALLOWED_ORIGINS, etc.
├── .gitignore
├── gunicorn.conf.py             # workers = multiprocessing.cpu_count()*2+1, worker_class="sync", timeout=120, preload_app=True
├── Procfile                     # web: gunicorn config.wsgi:application -c gunicorn.conf.py
├── manage.py
├── render.yaml                  # Render IaC: web service (buildCommand, startCommand), managed PostgreSQL, Redis add-on
├── requirements.txt             # Pinned major versions — see scaffold commands below
└── requirements-dev.txt         # pytest-django, factory-boy, django-debug-toolbar, ruff, mypy, coverage
```