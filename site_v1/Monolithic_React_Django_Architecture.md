# Monolithic React + Django Architecture
# Portfolio Project — AI Agent / Agentic AI Workflow | Data Science | MLOps

> **Pattern:** Django serves React as compiled static assets.
> Single deployment unit — Django is both the API server and the static file host.
> React build output (`dist/`) is copied into Django's `static/` and `templates/` at build time.

---

## 🗂️ Full Project Hierarchy

```
Portfolio_Project/                          ← Monorepo Root
│
├── 📄 .env                                 ← Shared env vars (DEBUG, SECRET_KEY, DB_URL)
├── 📄 .env.example                         ← Committed env template
├── 📄 .gitignore
├── 📄 README.md
├── 📄 Makefile                             ← `make dev`, `make build`, `make deploy`
│
│
├── 📁 frontend/                            ← React/Vite SPA (source only, never deployed raw)
│   │
│   ├── 📁 guidelines/
│   │   └── 📝 Guidelines.md               ← Design system rules, color tokens, typography
│   │
│   ├── 📁 src/
│   │   │
│   │   ├── 📄 main.tsx                     ← Vite entry — mounts <App /> into #root
│   │   │
│   │   ├── 📁 app/
│   │   │   │
│   │   │   ├── 📄 App.tsx                  ← Router shell, global providers, theme context
│   │   │   ├── 📄 Root.tsx                 ← Layout wrapper (Navbar + Outlet + Footer)
│   │   │   ├── 📄 routes.ts                ← Centralized route definitions
│   │   │   │
│   │   │   ├── 📁 components/
│   │   │   │   │
│   │   │   │   ├── 📁 figma/               ← Figma-exported or design-spec components
│   │   │   │   │   └── 📄 ImageWithFallback.tsx
│   │   │   │   │
│   │   │   │   ├── 📁 ui/                  ← shadcn/ui primitive library (auto-generated)
│   │   │   │   │   ├── 📄 accordion.tsx
│   │   │   │   │   ├── 📄 alert-dialog.tsx
│   │   │   │   │   ├── 📄 alert.tsx
│   │   │   │   │   ├── 📄 aspect-ratio.tsx
│   │   │   │   │   ├── 📄 avatar.tsx
│   │   │   │   │   ├── 📄 badge.tsx
│   │   │   │   │   ├── 📄 breadcrumb.tsx
│   │   │   │   │   ├── 📄 button.tsx
│   │   │   │   │   ├── 📄 calendar.tsx
│   │   │   │   │   ├── 📄 card.tsx
│   │   │   │   │   ├── 📄 carousel.tsx
│   │   │   │   │   ├── 📄 chart.tsx
│   │   │   │   │   ├── 📄 checkbox.tsx
│   │   │   │   │   ├── 📄 collapsible.tsx
│   │   │   │   │   ├── 📄 command.tsx
│   │   │   │   │   ├── 📄 context-menu.tsx
│   │   │   │   │   ├── 📄 dialog.tsx
│   │   │   │   │   ├── 📄 drawer.tsx
│   │   │   │   │   ├── 📄 dropdown-menu.tsx
│   │   │   │   │   ├── 📄 form.tsx
│   │   │   │   │   ├── 📄 hover-card.tsx
│   │   │   │   │   ├── 📄 input-otp.tsx
│   │   │   │   │   ├── 📄 input.tsx
│   │   │   │   │   ├── 📄 label.tsx
│   │   │   │   │   ├── 📄 menubar.tsx
│   │   │   │   │   ├── 📄 navigation-menu.tsx
│   │   │   │   │   ├── 📄 pagination.tsx
│   │   │   │   │   ├── 📄 popover.tsx
│   │   │   │   │   ├── 📄 progress.tsx
│   │   │   │   │   ├── 📄 radio-group.tsx
│   │   │   │   │   ├── 📄 resizable.tsx
│   │   │   │   │   ├── 📄 scroll-area.tsx
│   │   │   │   │   ├── 📄 select.tsx
│   │   │   │   │   ├── 📄 separator.tsx
│   │   │   │   │   ├── 📄 sheet.tsx
│   │   │   │   │   ├── 📄 sidebar.tsx
│   │   │   │   │   ├── 📄 skeleton.tsx
│   │   │   │   │   ├── 📄 slider.tsx
│   │   │   │   │   ├── 📄 sonner.tsx
│   │   │   │   │   ├── 📄 switch.tsx
│   │   │   │   │   ├── 📄 table.tsx
│   │   │   │   │   ├── 📄 tabs.tsx
│   │   │   │   │   ├── 📄 textarea.tsx
│   │   │   │   │   ├── 📄 toggle-group.tsx
│   │   │   │   │   ├── 📄 toggle.tsx
│   │   │   │   │   ├── 📄 tooltip.tsx
│   │   │   │   │   ├── 📄 use-mobile.ts
│   │   │   │   │   └── 📄 utils.ts
│   │   │   │   │
│   │   │   │   ├── 📄 BlogCard.tsx          ← Reusable: used on /blog index + homepage
│   │   │   │   ├── 📄 Footer.tsx            ← Global footer (nav links, socials, copyright)
│   │   │   │   ├── 📄 Navbar.tsx            ← Global nav (Space Grotesk, Neo-Mint CTAs)
│   │   │   │   └── 📄 ProjectCard.tsx       ← Reusable: used on /projects index + homepage
│   │   │   │
│   │   │   ├── 📁 data/
│   │   │   │   └── 📄 index.ts              ← Static seed data (projects, blog posts, skills)
│   │   │   │
│   │   │   └── 📁 pages/
│   │   │       │
│   │   │       ├── 📄 Home.tsx              ← Hero, Featured Projects, What I Do, Blog CTA
│   │   │       ├── 📄 Projects.tsx          ← /projects — filterable project grid
│   │   │       ├── 📄 ProjectDetail.tsx     ← /projects/:slug — case study layout
│   │   │       ├── 📄 Resume.tsx            ← /resume — skills taxonomy, experience
│   │   │       ├── 📄 Blog.tsx              ← /blog — post index with category filters
│   │   │       ├── 📄 BlogPost.tsx          ← /blog/:slug — article with ToC
│   │   │       ├── 📄 Knowledge.tsx         ← /knowledge — hub for courses & tools
│   │   │       ├── 📄 Contact.tsx           ← /contact — form → Django /api/contact/
│   │   │       ├── 📄 NotFound.tsx          ← 404 fallback
│   │   │       │
│   │   │       └── 📁 Tools/               ← /tools — knowledge base calculators
│   │   │           ├── 📄 Tools.tsx         ← Tools index/hub page
│   │   │           └── 📁 ToolsPages/
│   │   │               │
│   │   │               ├── 📁 Docs/         ← Markdown specs per calculator
│   │   │               │   ├── 📝 1. AP Bio Score Calculator.md
│   │   │               │   ├── 📝 2. AP Calc BC Score Calculator.md
│   │   │               │   ├── 📝 3. AP World Score Calculator.md
│   │   │               │   ├── 📝 4. AP Stats Score Calculator.md
│   │   │               │   ├── 📝 5. Linear Feet Calculator.md
│   │   │               │   ├── 📝 6. Pokémon Catch Rate Calculator.md
│   │   │               │   ├── 📝 7. AP Chem Score Calculator.md
│   │   │               │   └── 📝 8. AP Physics 1 Score Calculator.md
│   │   │               │
│   │   │               ├── 📄 APBioScoreCalculator.tsx
│   │   │               ├── 📄 Apcalcbccalculator.tsx
│   │   │               ├── 📄 Apchemscorecalculator.tsx
│   │   │               ├── 📄 Apphysics1scorecalculator.jsx
│   │   │               ├── 📄 Apstatscalculator.tsx
│   │   │               ├── 📄 Apworldscorecalculator.tsx
│   │   │               ├── 📄 Linearfeetcalculator.jsx
│   │   │               └── 📄 Pokemoncatchratecalculator.tsx
│   │   │
│   │   ├── 📁 imports/
│   │   │   └── 📝 ai-agent-portfolio-architectur.md  ← Architecture reference doc
│   │   │
│   │   └── 📁 styles/
│   │       ├── 🎨 fonts.css                ← Space Grotesk @font-face imports
│   │       ├── 🎨 index.css                ← Global resets, base layer
│   │       ├── 🎨 tailwind.css             ← Tailwind directives (@base, @components, @utilities)
│   │       └── 🎨 theme.css                ← CSS vars: --color-black-forest, --color-neo-mint, etc.
│   │
│   ├── 📄 index.html                       ← Vite HTML template — Django injects {% static %} here at build
│   ├── 📄 vite.config.ts                   ← outDir → ../backend/static/frontend/
│   ├── ⚙️ package.json
│   ├── ⚙️ package-lock.json
│   ├── 📄 postcss.config.mjs
│   ├── 📝 ATTRIBUTIONS.md
│   └── 📝 README.md
│
│
├── 📁 backend/                             ← Django project root (manages the whole monolith)
│   │
│   ├── 📁 backend/                         ← Django core config package
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 asgi.py                      ← ASGI entry (Daphne/Uvicorn for prod)
│   │   ├── 🐍 wsgi.py                      ← WSGI entry (Gunicorn for prod)
│   │   ├── 🐍 settings.py                  ← INSTALLED_APPS, STATICFILES, CORS, REST_FRAMEWORK
│   │   └── 🐍 urls.py                      ← Root URL conf — api/ → api.urls, * → React index.html
│   │
│   ├── 📁 api/                             ← Django REST Framework app
│   │   ├── 📁 migrations/
│   │   │   ├── 🐍 __init__.py
│   │   │   └── 🐍 0001_initial.py          ← Auto-generated migration
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py                     ← Register models in Django Admin
│   │   ├── 🐍 apps.py                      ← AppConfig
│   │   ├── 🐍 models.py                    ← Project, BlogPost, ContactMessage, Skill, Course
│   │   ├── 🐍 serializers.py               ← DRF serializers (JSON ↔ Model)
│   │   ├── 🐍 views.py                     ← ViewSets + APIViews (projects, blog, contact, resume)
│   │   ├── 🐍 urls.py                      ← /api/v1/ endpoint routing
│   │   └── 🐍 tests.py                     ← Unit + integration tests for API
│   │
│   ├── 📁 static/                          ← Django STATICFILES_DIRS target
│   │   └── 📁 frontend/                    ← Vite build output lands here (`npm run build`)
│   │       ├── 📁 assets/                  ← Hashed JS/CSS bundles (e.g. index-Bx3kP.js)
│   │       └── 📄 index.html               ← Single HTML shell served by Django catch-all view
│   │
│   ├── 📁 templates/                       ← Django template engine folder
│   │   └── 📄 index.html                   ← Symlink or copy of static/frontend/index.html
│   │                                          (Django SPA catch-all view renders this)
│   │
│   ├── 📄 db.sqlite3                       ← Dev database (swap for PostgreSQL in prod)
│   ├── 🐍 manage.py                        ← Django CLI entry point
│   └── 📄 requirements.txt                 ← Django, DRF, whitenoise, psycopg2, gunicorn, etc.
│
│
└── 📁 guidelines/                          ← Repo-level design & architecture docs
    ├── 📝 Portfolio_Project.md             ← Master spec (color system, SEO architecture, layouts)
    ├── 📝 Portfolio_Project_Tree.md        ← High-level folder overview
    ├── 📝 frontend_Tree.md                 ← Frontend file inventory
    └── 📝 backend_Tree.md                  ← Backend file inventory
```

---

## 🔗 Monolithic Request Flow

```
Browser Request
      │
      ▼
Django URL Router (backend/urls.py)
      │
      ├── /api/v1/*  ──────────────►  DRF ViewSets (api/views.py)
      │                                     │
      │                              api/serializers.py
      │                                     │
      │                              api/models.py  ←──►  db.sqlite3 / PostgreSQL
      │
      └── /* (catch-all) ──────────►  TemplateView → templates/index.html
                                            │
                                     React SPA boots
                                            │
                                     React Router handles
                                     all client-side paths
```

---

## ⚙️ Build & Serve Pipeline

```
Development
─────────────────────────────────────────────────────
  cd frontend && npm run dev         → Vite dev server :5173  (HMR)
  cd backend  && python manage.py runserver  → Django :8000  (API only)
  Vite proxies /api/* → :8000        (set in vite.config.ts)

Production Build
─────────────────────────────────────────────────────
  cd frontend && npm run build
    └── Vite compiles → backend/static/frontend/
        └── index.html copied → backend/templates/index.html

  cd backend && python manage.py collectstatic
    └── WhiteNoise serves static/ directly from Django

  gunicorn backend.wsgi:application   → Single process, port 8000
```

---

## 🗄️ Django API Endpoints (`/api/v1/`)

| Method | Endpoint                        | Model            | Page Consumer          |
|--------|---------------------------------|------------------|------------------------|
| GET    | `/api/v1/projects/`             | `Project`        | Home, Projects index   |
| GET    | `/api/v1/projects/:slug/`       | `Project`        | ProjectDetail          |
| GET    | `/api/v1/blog/`                 | `BlogPost`       | Blog index, Home       |
| GET    | `/api/v1/blog/:slug/`           | `BlogPost`       | BlogPost               |
| GET    | `/api/v1/resume/`               | `Skill`, `Job`   | Resume                 |
| GET    | `/api/v1/tools/`                | `Tool`           | Knowledge, Tools       |
| POST   | `/api/v1/contact/`              | `ContactMessage` | Contact form           |

---

## 🎨 Theme Token Reference (`theme.css` → Tailwind CSS vars)

| CSS Variable              | Hex       | Role                                        |
|---------------------------|-----------|---------------------------------------------|
| `--color-black-forest`    | `#081A04` | SPA shell background, `<body>` base         |
| `--color-true-black`      | `#000000` | UI depth elements, code block backgrounds   |
| `--color-neo-mint`        | `#A4FBCC` | CTAs, active nav, card borders, highlights  |
| `--color-steel-grey`      | `#9199A5` | Data labels, skill tags, secondary text     |
| `--color-alabaster`       | `#F2F2F2` | Body text, headings on dark backgrounds     |
| `--color-deep-moss`       | `#1B3022` | Card surfaces, section dividers             |

**Typography:** `Space Grotesk` — variable weight, geometric sans, loaded via `fonts.css`.

---

## 📦 Key Dependencies

### Frontend (`package.json`)
```
react + react-dom + react-router-dom   ← SPA routing
vite + typescript                      ← Build toolchain
tailwindcss + postcss                  ← Utility-first styling
shadcn/ui (radix-ui primitives)        ← Accessible component library
```

### Backend (`requirements.txt`)
```
django                    ← Web framework
djangorestframework       ← REST API layer
django-cors-headers       ← CORS for Vite dev proxy
whitenoise                ← Static file serving in production
gunicorn                  ← WSGI production server
python-decouple           ← .env management
psycopg2-binary           ← PostgreSQL driver (prod swap)
```

---

## 🔑 `settings.py` Critical Configs

```python
INSTALLED_APPS = [
    ...
    "rest_framework",
    "corsheaders",
    "api",
]

# React SPA catch-all
TEMPLATES[0]["DIRS"] = [BASE_DIR / "templates"]

# WhiteNoise serves Vite build
STATICFILES_DIRS = [BASE_DIR / "static" / "frontend"]
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Dev CORS (Vite HMR)
CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]
```

```python
# backend/urls.py — SPA catch-all (must be last)
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/",     admin.site.urls),
    path("api/v1/",    include("api.urls")),
    re_path(r"^.*$",   TemplateView.as_view(template_name="index.html")),  # React handles routing
]
```


















---
---
***
---
---









# Backend Directory Structure
## Monolithic Django–React Architecture
### Portfolio: AI Agent / Agentic AI Workflow | Data Science | MLOps

---

## Design Rationale

| Principle | Decision |
|---|---|
| **App isolation** | One Django app per frontend page domain — mirrors your React route tree |
| **Settings split** | `base / development / production` — prevents accidental prod leaks |
| **Shared core** | `core/` module holds pagination, permissions, mixins used across all apps |
| **Monolith serving** | Django serves the React SPA via a single `templates/index.html` catch-all |
| **Media handling** | `media/` for uploads, `staticfiles/` for WhiteNoise-served React build |
| **Requirements split** | `requirements/` folder mirrors settings split — clean pip installs per env |

---

## Full Directory Tree

```
backend/
│
├── 📁 apps/                          ← All domain apps live here (replaces single `api/`)
│   │
│   ├── 📁 projects/                  ← /projects + /projects/{slug}
│   │   ├── 📁 migrations/
│   │   │   └── 🐍 __init__.py
│   │   ├── 📁 tests/
│   │   │   ├── 🐍 __init__.py
│   │   │   ├── 🐍 test_models.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py               ← Register Project, TechTag, Category models
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 filters.py             ← django-filter: category, tech_stack, year
│   │   ├── 🐍 models.py              ← Project, TechTag, ProjectCategory, ProjectImage
│   │   ├── 🐍 serializers.py         ← ProjectListSerializer, ProjectDetailSerializer
│   │   ├── 🐍 urls.py                ← /api/projects/, /api/projects/<slug>/
│   │   └── 🐍 views.py               ← ProjectListView, ProjectDetailView
│   │
│   ├── 📁 blog/                      ← /blog + /blog/{slug}
│   │   ├── 📁 migrations/
│   │   ├── 📁 tests/
│   │   │   ├── 🐍 __init__.py
│   │   │   ├── 🐍 test_models.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 filters.py             ← Filter by: category, tag, date range
│   │   ├── 🐍 models.py              ← Post, Category, Tag, PostImage
│   │   ├── 🐍 serializers.py         ← PostListSerializer, PostDetailSerializer
│   │   ├── 🐍 urls.py                ← /api/blog/, /api/blog/<slug>/
│   │   └── 🐍 views.py               ← PostListView, PostDetailView, RelatedPostsView
│   │
│   ├── 📁 resume/                    ← /resume
│   │   ├── 📁 migrations/
│   │   ├── 📁 tests/
│   │   │   ├── 🐍 __init__.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 models.py              ← Skill, SkillCategory, Experience, Education, Certification
│   │   ├── 🐍 serializers.py         ← ResumeSerializer (nested: skills, experience, education)
│   │   ├── 🐍 urls.py                ← /api/resume/
│   │   └── 🐍 views.py               ← ResumeView (single-object endpoint)
│   │
│   ├── 📁 contact/                   ← /contact
│   │   ├── 📁 migrations/
│   │   ├── 📁 tests/
│   │   │   ├── 🐍 __init__.py
│   │   │   └── 🐍 test_views.py
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 admin.py
│   │   ├── 🐍 apps.py
│   │   ├── 🐍 models.py              ← ContactSubmission (name, email, subject, message, honeypot)
│   │   ├── 🐍 serializers.py         ← ContactSerializer (write-only, honeypot validation)
│   │   ├── 🐍 urls.py                ← /api/contact/
│   │   └── 🐍 views.py               ← ContactCreateView (POST only, triggers email)
│   │
│   └── 📁 knowledge/                 ← /knowledge, /knowledge/courses, /knowledge/tools
│       ├── 📁 migrations/
│       ├── 📁 tests/
│       │   ├── 🐍 __init__.py
│       │   └── 🐍 test_views.py
│       ├── 🐍 __init__.py
│       ├── 🐍 admin.py
│       ├── 🐍 apps.py
│       ├── 🐍 models.py              ← Course, Lesson, Tool, ToolCategory, Resource
│       ├── 🐍 serializers.py         ← CourseSerializer, ToolSerializer
│       ├── 🐍 urls.py                ← /api/knowledge/courses/, /api/knowledge/tools/
│       └── 🐍 views.py               ← CourseListView, ToolListView, CourseDetailView
│
├── 📁 backend/                       ← Django project config (unchanged name, refactored internals)
│   ├── 📁 settings/                  ← Split settings (replaces single settings.py)
│   │   ├── 🐍 __init__.py
│   │   ├── 🐍 base.py                ← Shared: INSTALLED_APPS, MIDDLEWARE, DRF config, CORS
│   │   ├── 🐍 development.py         ← DEBUG=True, SQLite, django-debug-toolbar
│   │   └── 🐍 production.py          ← DEBUG=False, PostgreSQL, WhiteNoise, SECURE_* headers
│   ├── 🐍 __init__.py
│   ├── 🐍 asgi.py
│   ├── 🐍 urls.py                    ← Root router: api/ → app urls, /* → SPA catch-all
│   └── 🐍 wsgi.py
│
├── 📁 core/                          ← Shared utilities across all apps
│   ├── 🐍 __init__.py
│   ├── 🐍 mixins.py                  ← SlugMixin, TimestampMixin, SEOMixin
│   ├── 🐍 pagination.py              ← StandardResultsPagination (page_size=10)
│   ├── 🐍 permissions.py             ← ReadOnly (public), IsAdminOrReadOnly
│   └── 🐍 utils.py                   ← generate_slug(), send_contact_email(), sanitize_html()
│
├── 📁 media/                         ← Runtime uploads (project images, resume PDF)
│   ├── 📁 projects/
│   ├── 📁 blog/
│   └── 📁 resume/
│
├── 📁 requirements/                  ← Split pip requirements
│   ├── 📄 base.txt                   ← django, djangorestframework, django-filter, Pillow, python-decouple
│   ├── 📄 development.txt            ← -r base.txt + django-debug-toolbar, factory-boy, pytest-django
│   └── 📄 production.txt             ← -r base.txt + gunicorn, whitenoise, psycopg2-binary, sentry-sdk
│
├── 📁 static/                        ← Source static assets (pre-collectstatic)
│
├── 📁 staticfiles/                   ← collectstatic output (React build lands here)
│   └── 📁 assets/                    ← Vite-compiled JS/CSS chunks served by WhiteNoise
│
├── 📁 templates/
│   └── 🌐 index.html                 ← React SPA shell — Django catch-all serves this for /* routes
│
├── 📄 .env.example                   ← Template: SECRET_KEY, DATABASE_URL, ALLOWED_HOSTS, EMAIL_*
├── 📄 db.sqlite3                     ← Dev only (gitignored in production)
├── 🐍 manage.py
└── 📄 pytest.ini                     ← DJANGO_SETTINGS_MODULE=backend.settings.development
```

---

## App-to-Route Mapping

| Django App | API Endpoints | Frontend Routes Served |
|---|---|---|
| `apps.projects` | `GET /api/projects/` `GET /api/projects/<slug>/` | `/projects` `/projects/{slug}` |
| `apps.blog` | `GET /api/blog/` `GET /api/blog/<slug>/` `GET /api/blog/<slug>/related/` | `/blog` `/blog/{slug}` |
| `apps.resume` | `GET /api/resume/` | `/resume` |
| `apps.contact` | `POST /api/contact/` | `/contact` |
| `apps.knowledge` | `GET /api/knowledge/courses/` `GET /api/knowledge/tools/` | `/knowledge` `/knowledge/courses` `/knowledge/tools` |

> **Tools pages** (`/tools/*` — AP calculators, Pokémon, etc.) are **pure frontend** — no backend needed. Static JSON fixtures in `src/app/data/index.ts` is the right call.

---

## Key File Responsibilities

### `backend/urls.py` — Root URL Router
```python
# Serves the React SPA for all non-API routes (monolith pattern)
urlpatterns = [
    path("admin/",      admin.site.urls),
    path("api/",        include("apps.projects.urls")),
    path("api/",        include("apps.blog.urls")),
    path("api/",        include("apps.resume.urls")),
    path("api/",        include("apps.contact.urls")),
    path("api/",        include("apps.knowledge.urls")),
    re_path(r"^.*$",    TemplateView.as_view(template_name="index.html")),  # SPA catch-all
]
```

### `backend/settings/base.py` — Core Config
```python
INSTALLED_APPS = [
    # Django core
    "django.contrib.admin", "django.contrib.auth", ...
    # Third-party
    "rest_framework", "corsheaders", "django_filters",
    # Project apps
    "apps.projects", "apps.blog", "apps.resume", "apps.contact", "apps.knowledge",
    "core",
]

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "core.pagination.StandardResultsPagination",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PERMISSION_CLASSES": ["core.permissions.IsAdminOrReadOnly"],
}
```

### `core/mixins.py` — Shared Model Behavior
```python
class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta: abstract = True

class SEOMixin(models.Model):
    slug        = models.SlugField(unique=True, blank=True)
    meta_title  = models.CharField(max_length=60, blank=True)
    meta_desc   = models.CharField(max_length=160, blank=True)
    class Meta: abstract = True
```

---

## Migration Path from Current Structure

| Current | Action | Target |
|---|---|---|
| `api/` (single app) | Split by domain | `apps/projects/` `apps/blog/` `apps/resume/` `apps/contact/` `apps/knowledge/` |
| `backend/settings.py` | Refactor into folder | `backend/settings/base.py` + `development.py` + `production.py` |
| `requirements.txt` | Split | `requirements/base.txt` + `development.txt` + `production.txt` |
| `api/models.py` | Distribute models | One `models.py` per domain app |
| `api/views.py` | Distribute views | One `views.py` per domain app |

---

## Requirements Files

### `requirements/base.txt`
```
django>=5.0
djangorestframework>=3.15
django-filter>=24.0
django-cors-headers>=4.3
Pillow>=10.0
python-decouple>=3.8
```

### `requirements/development.txt`
```
-r base.txt
django-debug-toolbar>=4.3
pytest-django>=4.8
factory-boy>=3.3
coverage>=7.4
```

### `requirements/production.txt`
```
-r base.txt
gunicorn>=22.0
whitenoise[brotli]>=6.7
psycopg2-binary>=2.9
sentry-sdk[django]>=2.0
```