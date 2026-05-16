# Complete Production Roadmap: Portfolio + Blog + Calculator Hub
## Stack: Next.js 15 · React 19 · TypeScript · Tailwind · shadcn/ui · Django 5 · Wagtail · Django Ninja

---

## 0. Executive Summary

You are building a **three-surface professional website**: a portfolio showcase (mostly static, SEO-critical), a full-featured blog with CMS (content-heavy, ISR-driven), and a Calculator Hub (interactive, client-side-heavy). These three surfaces have fundamentally different rendering needs, which is precisely why this stack is optimal. Next.js 15 lets you apply SSG, ISR, SSR, and CSR **per-route** in the same app. Wagtail gives you a battle-tested Django CMS with headless REST API support out of the box. Django Ninja gives you FastAPI-like performance and auto-OpenAPI generation while staying inside Django's ecosystem.

**Total estimated build time (solo developer):** 14–18 weeks to a polished v1.0.
**AI acceleration multiplier:** With disciplined AI-assisted development (prompts provided in Section 5), this shrinks to ~10–12 weeks.

---

## PART 1 — ARCHITECTURE DECISIONS

### Monorepo vs Separate Repos

**Decision: Separate repos with a shared types package (optional).**

Use a monorepo only if you have a team sharing components across FE and BE. For a solo developer, the cognitive overhead outweighs benefits. Use:
- `portfolio-frontend/` — Next.js app, deployed to Vercel
- `portfolio-backend/` — Django + Wagtail, deployed to Render/Railway/DigitalOcean

**API contract sharing:** Generate a TypeScript client from the OpenAPI schema Django Ninja auto-produces. Run `openapi-typescript` as a CI step to always keep types in sync.

```bash
# In frontend package.json scripts
"sync-api-types": "openapi-typescript http://localhost:8000/api/v1/openapi.json -o src/types/api.ts"
```

### Rendering Strategy Per Route

| Route | Strategy | Why |
|---|---|---|
| `/` (home) | SSG | Never changes without deploy |
| `/about` | SSG | Static content |
| `/projects` | ISR (revalidate: 3600) | Portfolio data from API, changes infrequently |
| `/blog` (list) | ISR (revalidate: 300) | New posts appear within 5 min |
| `/blog/[slug]` | ISR (revalidate: 600) | Per-post cache, tag-based purge on publish |
| `/blog/tag/[tag]` | ISR (revalidate: 300) | Tag index |
| `/calculators` | SSG | Static page listing |
| `/calculators/[slug]` | SSG or CSR | Static shell + client-side logic |
| `/contact` | SSR | Form with CSRF / rate-limit awareness |

---

## PART 2 — FRONTEND: 10 CRITICAL AREAS

### Area 1 — Project Structure

**Why it matters:** App Router's file-system routing directly maps to your URL structure. A bad layout creates dead-end naming collisions and makes route colocation impossible.

```
src/
├── app/
│   ├── layout.tsx                # Root layout: fonts, globals, ThemeProvider
│   ├── page.tsx                  # Home (SSG)
│   ├── (marketing)/              # Route group — no URL prefix
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── blog/
│   │   ├── layout.tsx            # Blog shell (sidebar, breadcrumb)
│   │   ├── page.tsx              # Blog index (ISR)
│   │   ├── [slug]/page.tsx       # Post detail (ISR)
│   │   ├── tag/[tag]/page.tsx
│   │   └── feed.xml/route.ts     # RSS feed Route Handler
│   ├── projects/
│   │   └── page.tsx
│   ├── calculators/
│   │   ├── page.tsx              # Hub landing
│   │   └── [slug]/page.tsx       # Individual calculator
│   ├── sitemap.ts                # Auto-generated sitemap
│   └── robots.ts                 # robots.txt
├── components/
│   ├── ui/                       # shadcn/ui re-exports (untouched)
│   ├── layout/                   # Header, Footer, Sidebar
│   ├── blog/                     # PostCard, PostHeader, TableOfContents
│   ├── portfolio/                # ProjectCard, SkillBadge, Timeline
│   ├── calculators/              # CalculatorShell, InputField, ResultDisplay
│   └── seo/                      # StructuredData, OpenGraphImage
├── lib/
│   ├── api/                      # Typed fetch wrappers (from openapi-typescript)
│   ├── blog.ts                   # Blog data helpers
│   └── utils.ts                  # cn(), formatDate(), slugify()
├── hooks/                        # useCalculator, useDebounce, useIntersection
├── types/
│   └── api.ts                    # Auto-generated from OpenAPI schema
└── styles/
    └── globals.css               # Tailwind directives + CSS variables
```

### Area 2 — Routing & Data Fetching

**Why it matters:** Incorrect use of `async` Server Components vs Client Components is the single most common performance mistake in Next.js 15.

**Rule of thumb:** Everything is a Server Component by default. Add `"use client"` only when you need `useState`, `useEffect`, browser APIs, or event handlers.

```tsx
// app/blog/[slug]/page.tsx — Server Component (correct)
import { fetchPost } from "@/lib/api/blog";
import { notFound } from "next/navigation";

export const revalidate = 600; // ISR: revalidate every 10 min

// generateStaticParams pre-renders all published posts at build time
export async function generateStaticParams() {
  const posts = await fetchPost.list({ published: true });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPost.detail(params.slug);
  if (!post) return {};
  return {
    title: post.seo_title || post.title,
    description: post.search_description,
    openGraph: {
      title: post.title,
      description: post.search_description,
      images: [{ url: post.og_image }],
      type: "article",
      publishedTime: post.first_published_at,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost.detail(params.slug);
  if (!post) notFound();
  return <PostLayout post={post} />;
}
```

**Tag-based cache invalidation (webhook-driven):**
```ts
// app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
export async function POST(req: Request) {
  const { tag, secret } = await req.json();
  if (secret !== process.env.REVALIDATE_SECRET) return new Response("Unauthorized", { status: 401 });
  revalidateTag(tag); // e.g. "blog-posts" or "blog-post-{slug}"
  return Response.json({ revalidated: true });
}
```

Trigger this webhook from Django's `page_published` signal.

### Area 3 — API Layer (Frontend Side)

**Why it matters:** Scattering raw `fetch()` calls throughout components creates unmaintainable, untested code. Centralise all API calls.

```ts
// lib/api/client.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function apiFetch<T>(path: string, opts?: RequestInit & {
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  const { tags, revalidate, ...fetchOpts } = opts ?? {};
  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchOpts,
    next: { tags, revalidate },
    headers: { "Content-Type": "application/json", ...fetchOpts.headers },
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// lib/api/blog.ts — typed, reusable
export const fetchPost = {
  list: (params?: Record<string, unknown>) =>
    apiFetch<PostListResponse>(`/api/v1/blog/posts/?${new URLSearchParams(params as any)}`, {
      tags: ["blog-posts"], revalidate: 300,
    }),
  detail: (slug: string) =>
    apiFetch<Post>(`/api/v1/blog/posts/${slug}/`, {
      tags: [`blog-post-${slug}`], revalidate: 600,
    }),
};
```

### Area 4 — Component Architecture

**Why it matters:** The Calculator Hub especially needs a clean separation between calculator logic and UI, or it becomes a maintenance nightmare.

Pattern: **Logic hook + Dumb display component + shadcn/ui primitives.**

```tsx
// hooks/useCalculator.ts — pure logic, easily testable
export function useMortgageCalculator() {
  const [principal, setPrincipal] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const monthlyPayment = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term * 12;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [principal, rate, term]);

  return { principal, setPrincipal, rate, setRate, term, setTerm, monthlyPayment };
}

// components/calculators/MortgageCalculator.tsx
"use client";
import { useMortgageCalculator } from "@/hooks/useCalculator";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export function MortgageCalculator() {
  const { principal, setPrincipal, monthlyPayment } = useMortgageCalculator();
  return (
    <Card className="p-6">
      <Slider value={[principal]} onValueChange={([v]) => setPrincipal(v)} min={50000} max={2000000} step={5000} />
      <p className="text-2xl font-semibold">${monthlyPayment.toFixed(2)}/mo</p>
    </Card>
  );
}
```

### Area 5 — State Management

**Why it matters:** React 19 + Server Components eliminate the need for a global state library for most use cases. Over-engineering this is the most common mistake.

| Data type | Solution |
|---|---|
| Server data (posts, projects) | Server Components + `fetch` cache |
| Calculator state | `useState` + custom hook (local) |
| UI state (theme, modal) | `useState` or Zustand (small store) |
| URL state (filters, page) | `useSearchParams` + `nuqs` library |
| Auth session | `next-auth` v5 (if needed) |

**Avoid:** Redux, React Query (for server data — Server Components handle this), Jotai/Recoil for simple cases.

### Area 6 — Styling System

**Why it matters:** Inconsistent styling kills professional polish. shadcn/ui + Tailwind + CSS variables is the correct setup for a maintainable design system.

```css
/* globals.css — define your design tokens */
@layer base {
  :root {
    --font-sans: "Inter", sans-serif;
    --radius: 0.5rem;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... all shadcn CSS variables */
  }
}
```

```ts
// tailwind.config.ts
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-sans)"] },
      typography: { /* prose styles for blog */ },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
```

Install shadcn components individually: `npx shadcn@latest add button card input slider badge`. This keeps your bundle small.

### Area 7 — SEO Implementation (Frontend)

**Why it matters:** For a portfolio + blog, SEO is the primary growth channel. Every decision must be SEO-aware from day one.

**Checklist implementation:**

```ts
// app/layout.tsx — root metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://yourname.dev"),
  title: { default: "Your Name — Full Stack Developer", template: "%s | Your Name" },
  description: "Portfolio, blog, and tools by ...",
  authors: [{ name: "Your Name", url: "https://yourname.dev" }],
  robots: { index: true, follow: true, googleBot: { index: true, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "en_US", siteName: "Your Name" },
  twitter: { card: "summary_large_image", creator: "@yourhandle" },
};

// app/sitemap.ts — dynamic sitemap from API
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPost.list();
  const postUrls = posts.map((p) => ({
    url: `https://yourname.dev/blog/${p.slug}`,
    lastModified: new Date(p.last_published_at),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [
    { url: "https://yourname.dev", changeFrequency: "weekly", priority: 1.0 },
    { url: "https://yourname.dev/blog", changeFrequency: "daily", priority: 0.9 },
    ...postUrls,
  ];
}

// components/seo/StructuredData.tsx
export function ArticleStructuredData({ post }: { post: Post }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: { "@type": "Person", name: post.author.name, url: "https://yourname.dev/about" },
    datePublished: post.first_published_at,
    dateModified: post.last_published_at,
    image: post.og_image,
    publisher: { "@type": "Person", name: "Your Name" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

**RSS Feed (Route Handler):**
```ts
// app/blog/feed.xml/route.ts
export async function GET() {
  const posts = await fetchPost.list({ limit: 20 });
  const feed = generateRssFeed(posts); // use the `feed` npm package
  return new Response(feed, { headers: { "Content-Type": "application/xml" } });
}
```

### Area 8 — Performance Optimization

**Why it matters:** Google Core Web Vitals directly affect search ranking. LCP < 2.5s, CLS < 0.1, INP < 200ms are your targets.

Key techniques:
- Use `next/image` for ALL images with explicit `width`, `height`, and `priority` on above-fold images
- Use `next/font` with `display: swap` — eliminates layout shift from web fonts
- Enable **Partial Prerendering (PPR)** for pages mixing static shells + dynamic data
- Use React `<Suspense>` boundaries with meaningful skeleton `fallback` components
- Dynamically import heavy components: `const Chart = dynamic(() => import('./Chart'), { ssr: false })`
- Use `generateImageMetadata` for OG images generated with `@vercel/og`
- Set `Cache-Control` headers correctly in Route Handlers
- Run `next build && next analyze` with `@next/bundle-analyzer` weekly

### Area 9 — Accessibility

**Why it matters:** Accessibility is also an SEO signal. Broken a11y means broken search indexability.

- Use semantic HTML: `<main>`, `<article>`, `<nav>`, `<header>`, `<aside>`, `<section>`
- Every image gets `alt` text (use Wagtail's `image.alt` field)
- Use `skip to content` link as first focusable element
- shadcn/ui components are Radix UI-based — keyboard accessible by default
- Use `aria-label` on icon-only buttons
- Colour contrast: verify all text passes WCAG AA (4.5:1) with the Colour Contrast Analyser
- Test with axe DevTools Chrome extension before every major deploy

### Area 10 — Deployment (Frontend)

**Why it matters:** Vercel is designed for Next.js. Zero-config deployment with automatic ISR, Edge middleware, and OG image generation.

```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm run sync-api-types   # regenerate types from OpenAPI
      - run: npm run lint && npm run type-check
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

**Environment variables needed on Vercel:**
```
NEXT_PUBLIC_API_URL=https://api.yourname.dev
REVALIDATE_SECRET=your-random-secret
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX (optional)
```

---

## PART 3 — BACKEND: 10 CRITICAL AREAS

### Area 1 — Project Setup

**Why it matters:** Getting the project layout right before writing a single model prevents painful refactoring later.

```bash
# Initial setup
python -m venv venv && source venv/bin/activate
pip install django wagtail django-ninja "django-ninja[jwt]" psycopg2-binary \
    redis django-redis django-cors-headers whitenoise gunicorn \
    dj-database-url python-decouple boto3 django-storages pillow
pip freeze > requirements.txt
```

```
backend/
├── config/
│   ├── settings/
│   │   ├── base.py          # Shared settings
│   │   ├── local.py         # DEBUG=True, SQLite ok
│   │   └── production.py    # Postgres, Redis, S3
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── portfolio/           # Projects, skills, experience
│   ├── blog/                # Wagtail blog pages
│   ├── calculators/         # Calculator definitions + API endpoints
│   └── core/                # Shared models, mixins, utilities
├── api/
│   ├── v1/
│   │   ├── __init__.py      # NinjaAPI instance
│   │   ├── blog.py          # Blog router
│   │   ├── portfolio.py     # Portfolio router
│   │   └── calculators.py   # Calculators router
│   └── auth.py              # JWT auth endpoints
├── manage.py
└── Procfile                 # web: gunicorn config.wsgi
```

```python
# config/settings/base.py
INSTALLED_APPS = [
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail",
    "modelcluster",
    "taggit",
    "django.contrib.admin",
    "django.contrib.auth",
    # ... standard Django apps ...
    "ninja",
    "corsheaders",
    "apps.portfolio",
    "apps.blog",
    "apps.calculators",
    "apps.core",
]
```

### Area 2 — Wagtail Integration (Blog & CMS)

**Why it matters:** Wagtail gives you a production-ready admin for content creation, live preview, scheduled publishing, revisions, and search indexing — things that would take weeks to build from scratch.

```python
# apps/blog/models.py
from wagtail.models import Page
from wagtail.fields import RichTextField, StreamField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.search import index
from wagtail.snippets.models import register_snippet
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase
from django.db import models


@register_snippet
class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class BlogPostTag(TaggedItemBase):
    content_object = ParentalKey("BlogPost", related_name="tagged_items", on_delete=models.CASCADE)


class BlogPost(Page):
    # Content
    subtitle = models.CharField(max_length=255, blank=True)
    hero_image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    intro = models.TextField(max_length=500)
    body = StreamField([
        ("paragraph", RichTextBlock()),
        ("code", CodeBlock()),
        ("image", ImageChooserBlock()),
        ("callout", CalloutBlock()),
    ], use_json_field=True)
    
    # Taxonomy
    category = models.ForeignKey(BlogCategory, null=True, on_delete=models.SET_NULL, related_name="posts")
    tags = ClusterTaggableManager(through=BlogPostTag, blank=True)
    reading_time = models.PositiveIntegerField(editable=False, default=0)
    
    # SEO (inherits seo_title, search_description from Page)
    og_image = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    canonical_url = models.URLField(blank=True)

    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("body"),
    ]
    
    content_panels = Page.content_panels + [
        FieldPanel("subtitle"),
        FieldPanel("hero_image"),
        FieldPanel("intro"),
        FieldPanel("body"),
        MultiFieldPanel([FieldPanel("category"), FieldPanel("tags")], heading="Taxonomy"),
    ]
    
    promote_panels = Page.promote_panels + [
        FieldPanel("og_image"),
        FieldPanel("canonical_url"),
    ]
    
    def save(self, *args, **kwargs):
        # Auto-calculate reading time
        word_count = len(str(self.body).split())
        self.reading_time = max(1, word_count // 200)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Blog Post"
```

### Area 3 — API Design with Django Ninja

**Why it matters:** Django Ninja gives you automatic OpenAPI docs, Pydantic validation, async support, and 2–3x faster throughput than DRF — ideal for a modern headless setup.

```python
# api/v1/__init__.py
from ninja import NinjaAPI
from ninja.security import HttpBearer
from .blog import router as blog_router
from .portfolio import router as portfolio_router

api = NinjaAPI(
    version="1.0",
    title="Portfolio API",
    description="API for portfolio, blog, and calculator hub",
    docs_url="/docs",  # Swagger UI at /api/v1/docs
)

api.add_router("/blog/", blog_router)
api.add_router("/portfolio/", portfolio_router)
```

```python
# api/v1/blog.py
from ninja import Router, Schema, Query
from ninja.pagination import paginate, PageNumberPagination
from typing import Optional, List
from apps.blog.models import BlogPost, BlogCategory

router = Router(tags=["Blog"])

class PostListSchema(Schema):
    id: int
    slug: str
    title: str
    subtitle: str
    intro: str
    reading_time: int
    first_published_at: datetime
    category: Optional[CategorySchema]
    tags: List[str]
    hero_image_url: Optional[str]

class PostDetailSchema(PostListSchema):
    body: dict                 # StreamField JSON
    seo_title: str
    search_description: str
    og_image_url: Optional[str]
    canonical_url: str

@router.get("/posts/", response=List[PostListSchema])
@paginate(PageNumberPagination, page_size=10)
def list_posts(request, category: Optional[str] = None, tag: Optional[str] = None,
               search: Optional[str] = None):
    qs = BlogPost.objects.live().public().order_by("-first_published_at").select_related("category")
    if category:
        qs = qs.filter(category__slug=category)
    if tag:
        qs = qs.filter(tags__slug=tag)
    if search:
        qs = qs.search(search)  # Uses Wagtail's built-in search
    return qs

@router.get("/posts/{slug}/", response=PostDetailSchema)
def get_post(request, slug: str):
    return get_object_or_404(BlogPost, slug=slug, live=True)

@router.get("/categories/", response=List[CategorySchema])
def list_categories(request):
    return BlogCategory.objects.all()
```

### Area 4 — SEO from the Backend

**Why it matters:** Wagtail provides SEO fields for every page by default, but you need to expose them correctly through the API. Your Django backend also serves sitemaps and robots.txt as fallback.

```python
# Backend sitemaps (also serve from Django for backend-only crawlers)
from wagtail.contrib.sitemaps import WagtailSitemap
from django.contrib.sitemaps.views import sitemap

urlpatterns += [
    path("backend-sitemap.xml", sitemap, {"sitemaps": {"wagtail": WagtailSitemap}}),
]

# Webhook signal: notify Next.js to revalidate ISR cache on publish
from wagtail.signals import page_published
from django.dispatch import receiver
import httpx

@receiver(page_published)
def on_page_published(sender, instance, **kwargs):
    if isinstance(instance, BlogPost):
        httpx.post(
            f"{settings.FRONTEND_URL}/api/revalidate",
            json={"tag": f"blog-post-{instance.slug}", "secret": settings.REVALIDATE_SECRET},
            timeout=5,
        )
        httpx.post(
            f"{settings.FRONTEND_URL}/api/revalidate",
            json={"tag": "blog-posts", "secret": settings.REVALIDATE_SECRET},
            timeout=5,
        )
```

**Key SEO fields to expose in all API responses:**
- `seo_title` (falls back to `title` if blank)
- `search_description`
- `og_image` (rendered URL, not just ID)
- `canonical_url`
- `first_published_at` / `last_published_at`
- `slug`

### Area 5 — Authentication & Security

**Why it matters:** Your Wagtail admin needs to be protected. The API needs rate limiting. Never ship without these.

```python
# JWT auth for API (Django Ninja JWT)
from ninja_jwt.controller import NinjaJWTDefaultController

api.add_router("/auth/", NinjaJWTDefaultController)

# Rate limiting with django-ratelimit
from django_ratelimit.decorators import ratelimit

@router.post("/contact/", auth=None)
@ratelimit(key="ip", rate="5/m", method="POST", block=True)
def contact_form(request, payload: ContactSchema):
    ...

# Security settings in production
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"

# CORS — allow only your frontend domain
CORS_ALLOWED_ORIGINS = [
    "https://yourname.dev",
    "https://www.yourname.dev",
]
CORS_ALLOW_CREDENTIALS = False  # No cookies over API

# Content Security Policy (use django-csp)
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'")
```

### Area 6 — Caching Strategy

**Why it matters:** Your Django API will be hit on every ISR revalidation. Without caching, every Next.js revalidation triggers N database queries.

```python
# config/settings/production.py
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_URL"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "SERIALIZER": "django_redis.serializers.json.JSONSerializer",
        },
        "TIMEOUT": 300,  # 5 minutes default
    }
}

# In your API views, use cache decorators
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

# Or with Django Ninja, use a custom cache decorator:
def cached(timeout=300):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            cache_key = f"api:{func.__name__}:{request.path}:{request.GET.urlencode()}"
            result = cache.get(cache_key)
            if result is None:
                result = func(request, *args, **kwargs)
                cache.set(cache_key, result, timeout)
            return result
        return wrapper
    return decorator

# Invalidate cache on page publish (in the signal handler above)
cache.delete_pattern("api:list_posts:*")
cache.delete(f"api:get_post:{instance.slug}")
```

### Area 7 — Models — Portfolio & Calculators

```python
# apps/portfolio/models.py
class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    long_description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to="projects/")
    demo_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    tech_stack = models.JSONField(default=list)  # ["Next.js", "Django", ...]
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    published_at = models.DateField()
    
    class Meta:
        ordering = ["order", "-published_at"]

# apps/calculators/models.py
class Calculator(models.Model):
    """Metadata for each calculator in the hub."""
    CATEGORY_CHOICES = [("finance", "Finance"), ("math", "Math"), ("health", "Health"), ("dev", "Developer")]
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50)  # Lucide icon name
    seo_title = models.CharField(max_length=160, blank=True)
    seo_description = models.TextField(blank=True)
    schema_markup = models.JSONField(default=dict)  # FAQ or SoftwareApplication schema
    active = models.BooleanField(default=True)
```

### Area 8 — Testing Strategy

**Why it matters:** Untested APIs break silently. Even minimal tests prevent regressions and give you confidence to deploy.

```python
# tests/test_blog_api.py
import pytest
from django.test import TestCase, Client
from apps.blog.tests.factories import BlogPostFactory

class TestBlogAPI(TestCase):
    def setUp(self):
        self.client = Client()
        self.post = BlogPostFactory.create(live=True)

    def test_list_posts(self):
        response = self.client.get("/api/v1/blog/posts/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("results", data)
        self.assertEqual(data["count"], 1)

    def test_post_detail_returns_seo_fields(self):
        response = self.client.get(f"/api/v1/blog/posts/{self.post.slug}/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("seo_title", data)
        self.assertIn("search_description", data)
        self.assertIn("canonical_url", data)

    def test_draft_post_not_visible(self):
        draft = BlogPostFactory.create(live=False)
        response = self.client.get(f"/api/v1/blog/posts/{draft.slug}/")
        self.assertEqual(response.status_code, 404)
```

Use `factory_boy` + `pytest-django` for fixtures. Aim for: all API endpoints covered, all models' key methods tested, at least one integration test that checks Wagtail page creation flow.

### Area 9 — Admin Customization

**Why it matters:** You'll spend significant time in the Wagtail admin. Make it efficient.

```python
# config/settings/base.py
WAGTAIL_SITE_NAME = "Your Portfolio"
WAGTAIL_ENABLE_UPDATE_CHECK = False
WAGTAIL_SLIM_SIDEBAR = True  # New compact sidebar

# Custom dashboard panels
from wagtail.admin.ui.components import Component
class DraftPostsPanel(Component):
    # Shows count of drafts needing review
    ...

# Register custom menu items
@hooks.register("register_admin_menu_item")
def register_calculator_menu():
    return MenuItem("Calculators", "/cms/calculators/", icon_name="calculator", order=400)
```

### Area 10 — Backend Deployment

**Why it matters:** Misconfigured production deployments are the #1 cause of post-launch incidents.

**Render.com deployment (recommended for starting out):**

```yaml
# render.yaml
services:
  - type: web
    name: portfolio-backend
    env: python
    buildCommand: "pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate"
    startCommand: "gunicorn config.wsgi:application --workers 2 --timeout 120"
    envVars:
      - key: DJANGO_SETTINGS_MODULE
        value: config.settings.production
      - key: DATABASE_URL
        fromDatabase:
          name: portfolio-db
          property: connectionString
      - key: REDIS_URL
        fromService:
          type: redis
          name: portfolio-redis
          property: connectionString
  - type: pserv
    name: portfolio-redis
    env: redis

databases:
  - name: portfolio-db
    databaseName: portfolio
    user: portfolio
```

**Gunicorn config (`gunicorn.conf.py`):**
```python
workers = 2               # 2 × CPU cores
worker_class = "gthread"  # Thread-based for I/O-heavy Wagtail
threads = 4
timeout = 120
bind = "0.0.0.0:8000"
accesslog = "-"
errorlog = "-"
```

---

## PART 4 — SEO MASTER CHECKLIST

### Complete SEO Implementation Map

| Signal | Implementation | Responsibility |
|---|---|---|
| `<title>` tags | `generateMetadata()` in each page.tsx | Frontend |
| Meta description | `metadata.description` | Frontend (from Wagtail API) |
| Canonical URLs | `metadata.alternates.canonical` | Frontend |
| Open Graph | `metadata.openGraph` | Frontend (from Wagtail API) |
| Twitter Cards | `metadata.twitter` | Frontend |
| Structured data (Article) | `<StructuredData>` component | Frontend |
| Structured data (Person) | Root layout schema | Frontend |
| Structured data (SoftwareApp) | Calculator pages | Frontend |
| XML Sitemap | `app/sitemap.ts` (dynamic) | Frontend |
| Robots.txt | `app/robots.ts` | Frontend |
| RSS Feed | `app/blog/feed.xml/route.ts` | Frontend |
| Core Web Vitals | `next/image`, `next/font`, PPR | Frontend |
| SSR/ISR for crawlers | App Router config | Frontend |
| Semantic HTML | Component authoring | Frontend |
| Image alt text | Wagtail `image.alt` field | Backend |
| SEO fields per post | `seo_title`, `search_description` in BlogPost | Backend |
| URL slugs (clean) | Wagtail slug field | Backend |
| Redirects on slug change | Wagtail contrib redirects | Backend |
| Search index | Wagtail search (Postgres full-text) | Backend |
| Page speed | Redis caching + CDN (Vercel Edge) | Both |

---

## PART 5 — AI PRODUCTIVITY PLAYBOOK

### Universal Prompt Templates

**Template A — Architecture Planning**
```
I'm building [FEATURE] for a [TECH STACK] project. The context is:
- Existing models/components: [LIST RELEVANT EXISTING CODE]
- Constraints: [e.g. must work with Wagtail Page model, must be SEO-friendly]
- Goal: [SPECIFIC OUTCOME]

Please:
1. List 3 implementation approaches with tradeoffs
2. Recommend one approach with justification
3. Identify the 3 biggest risks and mitigations
4. Output the recommended folder/file structure
Do not write code yet. Focus only on architecture decisions.
```

**Template B — Code Generation (Backend)**
```
Generate a Django Ninja API endpoint for the following:

Context:
- Django model: [PASTE MODEL]
- Required fields in response: [LIST FIELDS]
- Auth: [public/jwt-required/admin-only]
- Caching: [cache timeout or none]
- Pagination: [yes/no, page size]
- Filtering: [list filterable fields]

Requirements:
- Use Pydantic schemas (not DRF serializers)
- Include proper error handling (404, 422)
- Add type hints on all parameters
- Follow this existing pattern: [PASTE EXISTING ENDPOINT]
- Output only the router file, no explanations
```

**Template C — Code Generation (Frontend)**
```
Generate a Next.js 15 App Router [Server Component/Client Component] for:

Feature: [DESCRIPTION]
Data source: [API endpoint or static]
Rendering strategy: [SSG/ISR/SSR/CSR and why]
Related types: [PASTE TypeScript interfaces]
Existing similar component: [PASTE FOR STYLE REFERENCE]

Requirements:
- TypeScript strict mode
- shadcn/ui components only (no custom CSS)
- Tailwind for spacing/layout
- Include generateMetadata() if this is a page.tsx
- Include loading.tsx skeleton as a separate export
- Mobile-first responsive design
Output only the component code, no explanation.
```

**Template D — SEO Audit**
```
Review this Next.js page component for SEO completeness:
[PASTE COMPONENT]

Check and report on:
1. Metadata completeness (title, description, OG, Twitter)
2. Structured data presence and correctness
3. Heading hierarchy (h1 → h2 → h3)
4. Image optimization (next/image, alt text)
5. Canonical URL
6. Any missing schema.org markup relevant to [PAGE TYPE]
7. Core Web Vitals risks

For each issue, provide the exact fix code.
```

**Template E — Debugging**
```
I have a bug in my [COMPONENT/VIEW]. Here is the full context:

Error: [EXACT ERROR MESSAGE + STACK TRACE]
File: [FILENAME]
Code: [PASTE RELEVANT CODE — max 100 lines]
Expected: [WHAT SHOULD HAPPEN]
Actual: [WHAT HAPPENS]
Already tried: [LIST ATTEMPTS]

Diagnose the root cause. Then provide:
1. Minimal reproduction explanation
2. Exact fix
3. Related code that may have the same bug
```

**Template F — Test Generation**
```
Write pytest tests for this Django Ninja endpoint:
[PASTE ENDPOINT CODE]

Cover:
1. Happy path (200 response, correct schema)
2. Not found (404)
3. Unauthorized (401) if auth required
4. Validation error (422) for bad input
5. Edge cases: [LIST ANY SPECIFIC EDGE CASES]

Use factory_boy for fixtures. Use pytest-django. Include conftest.py setup if needed.
```

### Weekly Sprint Structure (AI-Assisted)

**Monday — Planning (1 hour)**
- Use Template A to plan the week's features with AI
- Break output into Jira/Linear/GitHub Issues tickets
- AI generates acceptance criteria for each ticket

**Tuesday–Thursday — Build (6–8 hours/day)**
- Use Templates B + C for code generation
- Always review AI output before committing — look for: hardcoded values, missing error handling, N+1 queries, missing TypeScript types
- Use Template D after every new page is built

**Friday — Review + QA (3 hours)**
- Use Template F to generate tests for everything built this week
- Run Lighthouse audit on all new pages
- Use AI to document any new API endpoints (paste to OpenAPI description fields)

---

## PART 6 — FULL IMPLEMENTATION ROADMAP

### Phase 0 — Foundation (Week 1–2)
**Estimated time: 14 hours**

- [X] Set up both repos with git, GitHub Actions skeleton
- [X] Frontend: `npx create-next-app@latest --typescript --tailwind --app`
- [X] Install and configure shadcn/ui: `npx shadcn@latest init`
- [X] Backend: Django project, Wagtail installed, local PostgreSQL running
- [X] Configure CORS, environment variables (python-decouple)
- [X] Write and run first migration
- [ ] Deploy empty apps to Vercel + Render to validate CI/CD pipeline
- [ ] Configure custom domain + SSL
- [ ] Set up Redis locally and on Render

**Definition of done:** Both apps deployed, CI/CD green, domains resolving.

### Phase 1 — Portfolio Core (Week 3–4)
**Estimated time: 16 hours**

- [x] Backend: `Project`, `Skill`, `Experience` models + admin
- [x] Backend: Portfolio API endpoints (list projects, get project by slug)
- [x] Frontend: Home page (SSG): hero, featured projects, skills summary
- [x] Frontend: Projects page (ISR): grid of project cards
- [x] Frontend: About page (SSG): timeline, skills, bio
- [x] Frontend: All SEO metadata + structured data (Person schema)
- [x] Frontend: `next/image` for all project thumbnails

**Definition of done:** Lighthouse score > 90 on all pages.

### Phase 2 — Blog System (Week 5–7)
**Estimated time: 24 hours**

- [ ] Backend: Wagtail page hierarchy (BlogIndexPage → BlogPost)
- [ ] Backend: Category + Tag models (Wagtail Snippets)
- [ ] Backend: Blog API endpoints (list, detail, categories, tags)
- [ ] Backend: Wagtail search integration (Postgres backend)
- [ ] Backend: Cache decorators on all blog endpoints
- [ ] Frontend: Blog index page (ISR: revalidate 300s)
- [ ] Frontend: Post detail page (ISR: revalidate 600s, tag-based invalidation)
- [ ] Frontend: Category + tag archive pages
- [ ] Frontend: Search UI (client-side debounced → API)
- [ ] Frontend: RSS Feed route handler
- [ ] Frontend: Blog post SEO (Article schema, OG image)
- [ ] Frontend: Reading time display, prev/next post navigation
- [ ] Backend: `page_published` signal → Next.js revalidation webhook

**Definition of done:** Create a post in Wagtail admin → appears on frontend within 10 minutes without redeploy.

### Phase 3 — Calculator Hub (Week 8–10)
**Estimated time: 20 hours**

Start with 5 calculators covering different categories (e.g. Mortgage, Compound Interest, BMI, Reading Time Estimator, Color Contrast Checker):

- [ ] Backend: `Calculator` metadata model + admin
- [ ] Backend: Calculator API (list calculators, get by slug for metadata/SEO)
- [ ] Frontend: Calculator Hub index page (SSG)
- [ ] Frontend: Calculator shell component (shared layout, SEO fields from API)
- [ ] Frontend: Individual calculator components (pure client-side logic)
- [ ] Frontend: SoftwareApplication schema.org markup per calculator
- [ ] Frontend: Social share buttons per calculator
- [ ] Add 2 new calculators per sprint thereafter

**Definition of done:** All 5 calculators functional, SEO-complete, mobile responsive.

### Phase 4 — Polish & Advanced Features (Week 11–12)
**Estimated time: 16 hours**

- [ ] Frontend: Dark/light mode toggle (next-themes)
- [ ] Frontend: Contact page with form (rate-limited API endpoint)
- [ ] Frontend: 404 and error.tsx pages (branded)
- [ ] Backend: Comments system (simple: email-based, moderated in Wagtail admin)
- [ ] Backend: Newsletter signup (store email in DB, integrate Mailchimp/Resend)
- [ ] Frontend: OG image generation (next/og) for blog posts
- [ ] Frontend: Table of Contents component for long posts
- [ ] Frontend: Code syntax highlighting (`rehype-pretty-code`)
- [ ] Accessibility audit + fixes (axe DevTools)

### Phase 5 — Testing, Performance & Launch (Week 13–14)
**Estimated time: 14 hours**

- [ ] Backend: Write test suite (target 80% coverage on API layer)
- [ ] Frontend: Playwright E2E tests (homepage, blog post, one calculator)
- [ ] Performance: Lighthouse CI in GitHub Actions (fail if score < 85)
- [ ] SEO: Submit sitemap to Google Search Console
- [ ] SEO: Verify structured data in Google Rich Results Test
- [ ] Security: Run `pip-audit`, `npm audit`
- [ ] Monitoring: Set up Sentry (both FE and BE)
- [ ] Analytics: Add Plausible or GA4
- [ ] Load test Django API with locust (100 concurrent users)
- [ ] Final content review

---

## PART 7 — FOLDER STRUCTURES (QUICK REFERENCE)

### Frontend (Next.js)
```
src/
├── app/
│   ├── (marketing)/about/, contact/
│   ├── blog/[slug]/, tag/[tag]/, feed.xml/
│   ├── projects/[slug]/
│   ├── calculators/[slug]/
│   ├── api/revalidate/    # Webhook endpoint
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # shadcn (committed, not gitignored)
│   ├── layout/
│   ├── blog/
│   ├── portfolio/
│   ├── calculators/
│   └── seo/
├── lib/api/
├── hooks/
├── types/api.ts           # Auto-generated
└── styles/globals.css
```

### Backend (Django + Wagtail)
```
config/settings/{base,local,production}.py
apps/{portfolio,blog,calculators,core}/
├── models.py
├── admin.py
├── tests/
│   ├── factories.py
│   └── test_api.py
└── migrations/
api/v1/{blog,portfolio,calculators}.py
```

---

## PART 8 — POTENTIAL PITFALLS & MITIGATIONS

| Pitfall | Mitigation |
|---|---|
| **Wagtail rich text in Next.js** | Wagtail returns HTML strings. Use `wagtail-richtext` npm package or `draftjs-to-html` to safely render. Test rendering of all block types. |
| **N+1 queries in blog list API** | Always use `select_related("category")`, `prefetch_related("tags")`. Add `django-debug-toolbar` locally. |
| **Stale ISR cache after Wagtail publish** | Always implement the `page_published` signal + revalidation webhook. Test the full publish-to-visible flow in staging. |
| **Image URLs in API responses** | Don't return raw image IDs. Always resolve to full URLs using `build_absolute_uri()` in the serializer/schema. |
| **CORS misconfiguration** | Set `CORS_ALLOWED_ORIGINS` explicitly in production. Never use `CORS_ALLOW_ALL_ORIGINS = True` in production. |
| **Missing `noindex` on Wagtail admin** | Wagtail admin is at `/cms/` by default. Ensure `robots.txt` disallows `/cms/`. |
| **Calculator state in URL vs component state** | For calculators that should be shareable (e.g. mortgage with specific values), use `nuqs` to sync state to URL search params. |
| **Deployment: static files** | Always run `collectstatic` in your build command. Use Whitenoise for serving static files in production. |
| **Missing `og:image` for social sharing** | Generate dynamic OG images with `@vercel/og` using `ImageResponse`. Verify with Facebook Sharing Debugger. |
| **TypeScript + API types drift** | Run `sync-api-types` in CI. If the OpenAPI schema changes and types aren't regenerated, TypeScript will catch mismatches. |

---

## PART 9 — POST-LAUNCH MAINTENANCE CHECKLIST

**Weekly:**
- Check Sentry for new errors
- Review Google Search Console for crawl errors, Core Web Vitals
- Publish new blog post (content velocity matters for SEO)

**Monthly:**
- `pip-audit` + `npm audit` — patch vulnerabilities
- Review Lighthouse scores on 5 key pages
- Check Django security checklist: `python manage.py check --deploy`
- Review API response times in Render metrics dashboard

**Quarterly:**
- Upgrade Next.js minor version
- Upgrade Wagtail minor version (they have excellent migration guides)
- Review and prune unused npm packages
- Add 3–5 new calculators based on search demand

---

*Generated April 2026 — Stack versions: Next.js 15.x, React 19, Django 5.x, Wagtail 6.x, Django Ninja 1.x*
