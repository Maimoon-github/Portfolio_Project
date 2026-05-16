## 1. Frontend Directory Tree

> Every file that would not exist in a real production repository has been excluded.
> Rendering strategy annotated as `[SSG]`, `[ISR:N]`, `[SSR]`, `[CSR]`, or `[Route Handler]`.

```
portfolio-frontend/
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Lint (ESLint), type-check (tsc --noEmit), Playwright E2E — runs on every PR
│       └── lighthouse.yml       # Lighthouse CI audit — fails build if any score < 85
│
├── public/
│   ├── fonts/                   # Self-hosted variable fonts (Inter, JetBrains Mono) — eliminates FOUT from Google Fonts
│   │   └── .gitkeep
│   ├── images/
│   │   ├── avatar.jpg           # Author headshot — referenced in JSON-LD Person schema on Home + About
│   │   └── og-default.png       # Fallback OG image for pages without dynamic generation
│   └── favicon.ico              # 32×32 ICO — browsers prefer this over SVG for tab icons
│
├── src/
│   │
│   ├── app/                     # All routes live here — App Router file-system convention
│   │   │
│   │   ├── layout.tsx           # Root layout: ThemeProvider, font variables, global metadata defaults, Analytics script
│   │   ├── page.tsx             # [SSG] Home: hero section, featured projects grid, skills summary, CTA
│   │   ├── not-found.tsx        # Global branded 404 — catches all unmatched routes, linked "back home"
│   │   ├── error.tsx            # Global React error boundary — must be 'use client', shows friendly crash UI
│   │   ├── loading.tsx          # Global Suspense fallback — page-level skeleton during route transition
│   │   ├── icon.svg             # App icon served at /icon.svg per Next.js metadata file convention
│   │   ├── sitemap.ts           # Generates /sitemap.xml — fetches dynamic slugs (blog posts, projects, calculators) from API
│   │   └── robots.ts            # Generates /robots.txt — disallows /cms/ (Wagtail admin), sets sitemap URL
│   │   │
│   │   ├── (marketing)/         # Route group — no URL segment added; groups About + Contact under shared intent
│   │   │   ├── about/
│   │   │   │   ├── page.tsx     # [SSG] About: bio, skills section, experience timeline, testimonials carousel
│   │   │   │   └── loading.tsx  # Skeleton for timeline (prevents CLS while timeline data loads)
│   │   │   └── contact/
│   │   │       ├── page.tsx     # [SSR] Contact: form with honeypot field, rate-limit awareness, toast feedback
│   │   │       └── loading.tsx  # Form skeleton
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx         # [ISR:3600] Projects gallery: masonry/grid of ProjectCards, category filter tabs
│   │   │   ├── loading.tsx      # Grid of skeleton cards matching ProjectCard dimensions
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # [ISR:3600] Case study: hero, problem/solution/outcome, tech stack badges, live/repo links
│   │   │       ├── loading.tsx  # Hero image + content skeleton
│   │   │       └── not-found.tsx # "Project not found" with link back to /projects
│   │   │
│   │   ├── blog/
│   │   │   ├── layout.tsx       # Blog shell: persistent sidebar (categories/tags), breadcrumb, reading progress bar
│   │   │   ├── page.tsx         # [ISR:300] Blog index: paginated post list, category filter, featured post hero
│   │   │   ├── loading.tsx      # Post card skeleton grid
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx     # [ISR:600] Post detail: Article schema, OG image, rich text body, ToC, prev/next, comments
│   │   │   │   ├── loading.tsx  # Title + body skeleton (matches actual post layout to prevent CLS)
│   │   │   │   └── not-found.tsx # "Post not found" with search suggestion
│   │   │   ├── category/
│   │   │   │   └── [category]/
│   │   │   │       ├── page.tsx # [ISR:300] Category archive: generateStaticParams from API, post list for this category
│   │   │   │       └── loading.tsx
│   │   │   ├── tag/
│   │   │   │   └── [tag]/
│   │   │   │       ├── page.tsx # [ISR:300] Tag archive: generateStaticParams from API, post list for this tag
│   │   │   │       └── loading.tsx
│   │   │   └── feed.xml/
│   │   │       └── route.ts     # [Route Handler] RSS/Atom feed — returns application/xml, no-store cache header
│   │   │
│   │   ├── calculators/
│   │   │   ├── page.tsx         # [SSG] Calculator hub: category grid, search input, SiteLinksSearchBox schema.org
│   │   │   ├── loading.tsx      # Calculator card skeletons
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # [SSG] shell + [CSR] logic: metadata from API, SoftwareApplication schema, social share
│   │   │       └── loading.tsx  # Calculator UI skeleton (prevents layout shift while JS hydrates)
│   │   │
│   │   ├── (legal)/             # Route group — legal pages share no layout with marketing or blog
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx     # [SSG] Privacy Policy — rendered from markdown via next-mdx-remote
│   │   │   └── terms/
│   │   │       └── page.tsx     # [SSG] Terms of Service — same mdx-remote pattern
│   │   │
│   │   └── api/                 # Route Handlers — server-side API endpoints within Next.js
│   │       ├── revalidate/
│   │       │   └── route.ts     # [Route Handler] POST: validates REVALIDATE_SECRET header, calls revalidateTag()
│   │       ├── og/
│   │       │   └── route.tsx    # [Route Handler] GET: ImageResponse — generates dynamic OG image for blog posts
│   │       └── contact/
│   │           └── route.ts     # [Route Handler] POST: validates honeypot, rate-limits by IP, forwards to Django /contact/
│   │
│   ├── components/
│   │   │
│   │   ├── ui/                  # shadcn/ui primitives — committed to repo, NEVER regenerated by CLI (would overwrite customisations)
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/              # Site-wide structural components (mostly Server Components)
│   │   │   ├── Header.tsx       # Top nav: responsive, active-link highlights, mobile hamburger trigger
│   │   │   ├── Footer.tsx       # Footer: nav links, social icons, newsletter signup form
│   │   │   ├── MobileMenu.tsx   # 'use client' — Sheet-based slide-over navigation for mobile
│   │   │   ├── ThemeToggle.tsx  # 'use client' — dark/light toggle powered by next-themes
│   │   │   ├── Providers.tsx    # 'use client' — wraps ThemeProvider + ReactQueryClientProvider (client boundary)
│   │   │   └── JsonLd.tsx       # Injects arbitrary JSON-LD via <script type="application/ld+json"> — used on every page
│   │   │
│   │   ├── blog/                # Blog-specific display components
│   │   │   ├── PostCard.tsx     # Preview card: title, excerpt, category badge, reading time, date (Server Component)
│   │   │   ├── PostHeader.tsx   # Full-bleed post header: title, author, date, reading time, share buttons
│   │   │   ├── RichTextRenderer.tsx  # 'use client' — sanitises and renders Wagtail HTML rich text (DOMPurify)
│   │   │   ├── TableOfContents.tsx   # 'use client' — IntersectionObserver highlights active heading
│   │   │   ├── CategoryFilter.tsx    # 'use client' — URL-synced category tabs (nuqs for search param state)
│   │   │   ├── SearchBar.tsx         # 'use client' — debounced input drives API search query
│   │   │   ├── PrevNextPost.tsx      # Prev/next post navigation links (Server Component)
│   │   │   └── CommentSection.tsx    # 'use client' — optimistic comment form with server action submit
│   │   │
│   │   ├── portfolio/           # Portfolio-specific display components
│   │   │   ├── ProjectCard.tsx  # Thumbnail card: image, title, tags, GitHub/live links (Server Component)
│   │   │   ├── ProjectHero.tsx  # Case study hero: full-width image, headline, role, duration
│   │   │   ├── SkillBadge.tsx   # Skill chip with proficiency ring indicator
│   │   │   ├── SkillSection.tsx # Skills grouped by category with animated reveal
│   │   │   ├── ExperienceTimeline.tsx # Vertical timeline of work history entries
│   │   │   └── TestimonialCard.tsx    # Pull-quote card with avatar and attribution
│   │   │
│   │   ├── calculators/         # Calculator shell and shared UI primitives
│   │   │   ├── CalculatorShell.tsx   # Shared layout wrapper: title, description, share button, SEO fields passed as props
│   │   │   ├── InputField.tsx        # Labelled input with inline unit display and inline error message
│   │   │   ├── ResultDisplay.tsx     # Highlighted result panel with optional breakdown table
│   │   │   ├── CalculatorCard.tsx    # Hub listing card: icon, title, description, category badge, link
│   │   │   └── tools/               # Individual calculator implementations — all 'use client' (pure browser logic)
│   │   │       ├── MortgageCalculator.tsx
│   │   │       ├── CompoundInterestCalculator.tsx
│   │   │       ├── BMICalculator.tsx
│   │   │       ├── ReadingTimeCalculator.tsx
│   │   │       └── ContrastCheckerCalculator.tsx
│   │   │
│   │   └── seo/                 # SEO helpers — all Server Components, render into <head> via generateMetadata or JSON-LD
│   │       ├── PersonSchema.tsx       # Schema.org Person — rendered on Home + About pages
│   │       └── BreadcrumbSchema.tsx   # BreadcrumbList JSON-LD — rendered on all non-root pages
│   │
│   ├── hooks/                   # Custom React hooks — all implicitly 'use client' (never imported in Server Components)
│   │   ├── useCalculator.ts           # Generic calculator state: inputs map, derived results, reset, validation
│   │   ├── useDebounce.ts             # Delays value emission — used in SearchBar to avoid per-keystroke API calls
│   │   ├── useIntersectionObserver.ts # Returns visible element refs — powers TableOfContents active heading
│   │   └── useLocalStorage.ts         # Persists calculator inputs across page reloads via localStorage
│   │
│   ├── lib/
│   │   ├── api/                 # ALL typed fetch wrappers live here — no raw fetch() is permitted outside this directory
│   │   │   ├── client.ts        # Base apiFetch<T>() with next: {tags, revalidate} passthrough for RSC caching
│   │   │   ├── blog.ts          # fetchPost.list(), .detail(), fetchCategories(), fetchTags(), fetchSearch()
│   │   │   ├── portfolio.ts     # fetchProject.list(), .detail(), fetchSkills(), fetchExperience(), fetchTestimonials()
│   │   │   └── calculators.ts   # fetchCalculator.list(), .detail(), fetchCalculatorCategories()
│   │   ├── utils.ts             # cn() (clsx+twMerge), formatDate(), slugify(), truncate(), calculateReadingTime()
│   │   ├── rich-text.ts         # DOMPurify wrapper that safely renders Wagtail HTML rich text server-side
│   │   └── og.ts                # Shared OG image config: font loading, palette, dimensions for ImageResponse
│   │
│   ├── styles/
│   │   └── globals.css          # Tailwind @import directives + CSS custom properties for theme (matches shadcn convention)
│   │
│   └── types/
│       └── api.ts               # AUTO-GENERATED by `npm run sync-api-types` from /api/v1/openapi.json — never edit manually
│
├── content/                     # MDX source files for static content (legal pages, potential future MDX blog)
│   ├── privacy.mdx
│   └── terms.mdx
│
├── .env.local                   # NEXT_PUBLIC_API_URL, REVALIDATE_SECRET — in .gitignore, never committed
├── .env.example                 # Safe template: all keys with empty values — committed as onboarding reference
├── .eslintrc.json               # Extends: next/core-web-vitals, plugin:@typescript-eslint/recommended-strict
├── .gitignore
├── AGENTS.md                    # AI agent context: repo purpose, stack, conventions, files to never modify
├── CLAUDE.md                    # Claude Code session config: dev commands, key files, coding conventions, off-limits
├── README.md                    # Setup guide, env vars, sync-api-types workflow, deployment notes
├── components.json              # shadcn/ui config: style=default, baseColor=slate, aliases for @/components, @/lib
├── next.config.ts               # images.remotePatterns (Django media), headers (CSP), redirects, bundleAnalyzer
├── playwright.config.ts         # E2E test config: baseURL, projects (chromium/firefox/webkit), reporter
├── postcss.config.mjs
└── tsconfig.json                # strict: true, paths: @/* → ./src/*, moduleResolution: bundler
```