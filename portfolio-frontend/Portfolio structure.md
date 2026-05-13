# 🗂️ Portfolio — Source Directory Architecture
> **Stack:** Next.js 15 (App Router) · React 19 · TypeScript Strict · Tailwind CSS v4 · Framer Motion · React Three Fiber  
> **Identity:** Personal portfolio for Data Scientist / AI Agent Architect / MLOps Engineer  
> **Design System:** Mystical Black Lotus

---

## Directory Tree

```
src/
├── app/                                  # Next.js 15 App Router — routes, layouts, metadata
│   ├── layout.tsx                        # Root layout: fonts, global providers, metadata shell
│   ├── page.tsx                          # Home page (/) — hero, intro, CTA
│   ├── not-found.tsx                     # Global 404 page
│   ├── error.tsx                         # Global error boundary
│   ├── loading.tsx                       # Global suspense fallback
│   │
│   ├── about/
│   │   └── page.tsx                      # About page — bio, philosophy, portrait
│   │
│   ├── expertise/
│   │   └── page.tsx                      # Expertise page — skills, tools, tech stacks
│   │
│   ├── projects/
│   │   ├── page.tsx                      # Projects index — filterable grid of all projects
│   │   └── [slug]/
│   │       ├── page.tsx                  # Individual project detail page
│   │       └── loading.tsx               # Project page skeleton/suspense
│   │
│   ├── journey/
│   │   └── page.tsx                      # Journey page — career timeline, milestones
│   │
│   ├── contact/
│   │   └── page.tsx                      # Contact page — form, socials, availability
│   │
│   └── blog/
│       ├── page.tsx                      # Blog index — post list, categories, search
│       └── [slug]/
│           ├── page.tsx                  # Individual blog post page (MDX-rendered)
│           └── loading.tsx               # Blog post skeleton/suspense
│
├── components/                           # All UI components — no business logic in leaves
│   │
│   ├── 3d/                               # React Three Fiber scenes — lazy + <Suspense> only
│   │   ├── HeroScene.tsx                 # Hero section: animated floating geometry / particle field
│   │   ├── NeuralNetworkScene.tsx        # Expertise section: interactive neural network visualization
│   │   ├── GlobeScene.tsx                # About / Contact: rotating 3D globe
│   │   ├── ProjectCardScene.tsx          # Projects: per-card hover 3D tilt / holographic effect
│   │   ├── ParticleField.tsx             # Reusable particle system (background canvas)
│   │   ├── FloatingOrb.tsx               # Reusable ambient orb mesh (primary glow)
│   │   └── SceneCanvas.tsx               # Shared R3F <Canvas> wrapper: camera, lights, resize
│   │
│   ├── animations/                       # Framer Motion wrappers — zero business logic
│   │   ├── FadeUp.tsx                    # whileInView fade-up (--animate-fade-up token)
│   │   ├── FadeIn.tsx                    # whileInView simple opacity fade
│   │   ├── SlideIn.tsx                   # Directional slide-in (left/right/top/bottom prop)
│   │   ├── StaggerChildren.tsx           # Stagger container — applies delay to child variants
│   │   ├── ScaleOnHover.tsx              # Scale spring on hover/tap wrapper
│   │   ├── MagneticButton.tsx            # Magnetic cursor-follow effect for CTA buttons
│   │   ├── TextReveal.tsx                # Word/char split text reveal animation
│   │   ├── CountUp.tsx                   # Animated number counter (stats, metrics)
│   │   ├── PageTransition.tsx            # Route-level shared layout animation wrapper
│   │   └── variants.ts                   # Centralised Framer Motion variant definitions
│   │
│   ├── layout/                           # Structural chrome — header, footer, nav
│   │   ├── Header.tsx                    # Top nav: logo, nav links, CTA, mobile hamburger
│   │   ├── Footer.tsx                    # Footer: links, socials, copyright, back-to-top
│   │   ├── NavLinks.tsx                  # Desktop horizontal navigation link list
│   │   ├── MobileNav.tsx                 # Mobile drawer/overlay navigation
│   │   ├── NavLink.tsx                   # Single nav link with active state + glass-link utility
│   │   └── ScrollProgress.tsx            # Top-of-page thin accent scroll progress bar
│   │
│   ├── sections/                         # Page-level section blocks — composed from primitives
│   │   ├── home/
│   │   │   ├── HeroSection.tsx           # Full-viewport hero: headline, subline, CTA, 3D scene
│   │   │   ├── FeaturedProjects.tsx      # Home: curated 3-project highlight strip
│   │   │   ├── SkillsSnapshot.tsx        # Home: compact skills/tools icon grid
│   │   │   └── CtaBanner.tsx             # Home: accent-colored CTA strip (hire / collaborate)
│   │   │
│   │   ├── about/
│   │   │   ├── BioSection.tsx            # About: narrative bio with portrait
│   │   │   ├── ValuesSection.tsx         # About: core values / philosophy cards
│   │   │   └── AvatarCard.tsx            # About: glass-avatar profile card
│   │   │
│   │   ├── expertise/
│   │   │   ├── SkillsGrid.tsx            # Expertise: categorised skills with proficiency bars
│   │   │   ├── TechStackSection.tsx      # Expertise: tech logos / tools grid
│   │   │   ├── ServicesSection.tsx       # Expertise: service offering cards (MLOps, AI, etc.)
│   │   │   └── StatsRow.tsx              # Expertise: animated metric counters (projects, years)
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectsGrid.tsx          # Projects: masonry/flex grid of ProjectCard components
│   │   │   ├── ProjectFilters.tsx        # Projects: category/tag filter chips
│   │   │   ├── ProjectCard.tsx           # Projects: individual glass card with hover 3D effect
│   │   │   └── ProjectDetail.tsx         # Projects: full-page detail layout (images, links, stack)
│   │   │
│   │   ├── journey/
│   │   │   ├── TimelineSection.tsx       # Journey: vertical animated timeline
│   │   │   ├── TimelineEntry.tsx         # Journey: single milestone item (date, role, desc)
│   │   │   └── EducationSection.tsx      # Journey: education cards
│   │   │
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx           # Contact: validated form (name, email, message)
│   │   │   ├── ContactInfo.tsx           # Contact: email, socials, location, availability badge
│   │   │   └── SocialLinks.tsx           # Contact: icon row for GitHub, LinkedIn, X, etc.
│   │   │
│   │   └── blog/
│   │       ├── PostGrid.tsx              # Blog: responsive grid of PostCard components
│   │       ├── PostCard.tsx              # Blog: preview card (cover, title, date, tags, excerpt)
│   │       ├── PostHeader.tsx            # Blog post: hero header (title, meta, cover image)
│   │       ├── PostBody.tsx              # Blog post: MDX prose with design-system typography
│   │       ├── PostToc.tsx               # Blog post: sticky table of contents (heading links)
│   │       └── CategoryFilter.tsx        # Blog: category/tag filter chips
│   │
│   ├── ui/                               # Atomic/primitive design-system UI components
│   │   ├── Button.tsx                    # Button: variants (primary, ghost, accent) + sizes
│   │   ├── Badge.tsx                     # Badge: tag/label chip (tech tags, status indicators)
│   │   ├── Card.tsx                      # Card: base glass-card wrapper with optional border glow
│   │   ├── GlassCard.tsx                 # Card: explicit glass-card utility application
│   │   ├── Divider.tsx                   # Divider: styled hr with gradient accent line
│   │   ├── SectionHeader.tsx             # Section heading: eyebrow label + h2 + subtitle
│   │   ├── Tag.tsx                       # Tag: small label chip (project stack, blog categories)
│   │   ├── Avatar.tsx                    # Avatar: glass-avatar image with glow ring
│   │   ├── Tooltip.tsx                   # Tooltip: accessible hover/focus label (Framer Motion)
│   │   ├── Modal.tsx                     # Modal: accessible dialog (focus trap, backdrop)
│   │   ├── Drawer.tsx                    # Drawer: slide-in panel (mobile nav, detail panels)
│   │   ├── ProgressBar.tsx               # ProgressBar: skill proficiency indicator
│   │   ├── Skeleton.tsx                  # Skeleton: shimmer loading placeholder block
│   │   ├── Logo.tsx                      # Logo: SVG logotype / wordmark component
│   │   ├── ThemeToggle.tsx               # ThemeToggle: dark/light mode switch (future-proofed)
│   │   ├── ScrollToTop.tsx               # ScrollToTop: FAB button — returns to page top
│   │   ├── ExternalLink.tsx              # ExternalLink: anchor with icon + rel/target defaults
│   │   └── CodeBlock.tsx                 # CodeBlock: syntax-highlighted MDX code block
│   │
│   └── providers/                        # React context providers — app-wide state/config
│       ├── ThemeProvider.tsx             # Theme context: resolves dark/light, injects CSS vars
│       ├── SmoothScrollProvider.tsx      # Smooth scroll context (Lenis or native scroll config)
│       └── ToastProvider.tsx             # Toast notification context (contact form feedback)
│
├── content/                              # Static content — MDX source files, authored data
│   ├── blog/                             # MDX blog posts
│   │   ├── getting-started-with-mlops.mdx
│   │   ├── building-ai-agents-2025.mdx
│   │   └── ...                           # Additional posts (one .mdx per article)
│   └── projects/                         # MDX project detail pages
│       ├── ai-agent-orchestrator.mdx
│       ├── mlops-pipeline.mdx
│       └── ...                           # Additional project detail files
│
├── data/                                 # Static typed data — JSON / TS constant files
│   ├── projects.ts                       # ProjectItem[] — all project records with metadata
│   ├── skills.ts                         # SkillCategory[] — skill groups with proficiency levels
│   ├── journey.ts                        # JourneyEntry[] — career & education timeline data
│   ├── services.ts                       # ServiceItem[] — offered services / expertise areas
│   ├── navigation.ts                     # NavItem[] — header/footer navigation link definitions
│   └── socials.ts                        # SocialLink[] — social media handles and URLs
│
├── hooks/                                # Custom React hooks — reusable stateful logic
│   ├── useScrollProgress.ts              # Reads window scroll % for progress bar
│   ├── useActiveSection.ts               # IntersectionObserver — tracks current visible section
│   ├── useMediaQuery.ts                  # Breakpoint-aware boolean (mobile/tablet/desktop)
│   ├── useMousePosition.ts               # Tracks cursor position (magnetic button, 3D tilt)
│   ├── useReducedMotion.ts               # Reads prefers-reduced-motion media query
│   ├── useInView.ts                      # Thin wrapper over Framer Motion useInView
│   ├── useTheme.ts                       # Consumes ThemeContext — exposes theme + toggle
│   ├── useContactForm.ts                 # Form state, validation, and submission logic
│   └── useMDXContent.ts                  # Loads and caches MDX content by slug
│
├── lib/                                  # Pure utility modules — no React, no side effects
│   ├── mdx.ts                            # MDX compiler: reads .mdx files, returns serialized data
│   ├── metadata.ts                       # Generates Next.js Metadata objects per page/post
│   ├── formatDate.ts                     # Date formatting helpers (ISO → human-readable)
│   ├── readingTime.ts                    # Estimates reading time from MDX string content
│   ├── slugify.ts                        # Converts strings to URL-safe slugs
│   ├── cn.ts                             # clsx + tailwind-merge utility (className merging)
│   ├── constants.ts                      # SCREAMING_SNAKE app-wide constants (site name, URL)
│   └── analytics.ts                      # Analytics event helpers (privacy-safe, optional)
│
├── styles/                               # Design Truth Layer — all visual tokens live here
│   ├── globals.css                       # @theme tokens, @utility glass classes, CSS reset, base
│   ├── fonts.css                         # @font-face declarations (Space Grotesk, JetBrains Mono)
│   ├── tailwind.css                      # Tailwind v4 entrypoint (@import "tailwindcss")
│   ├── theme.css                         # Extended semantic token aliases and component themes
│   └── mdx.css                           # Prose typography overrides for MDX blog content
│
├── types/                                # Global TypeScript type definitions
│   ├── index.ts                          # Re-exports all types for clean single-entry imports
│   ├── project.ts                        # ProjectItem, ProjectStatus, TechTag interfaces
│   ├── blog.ts                           # PostMeta, PostFrontmatter, SerializedPost interfaces
│   ├── skill.ts                          # SkillCategory, SkillItem, ProficiencyLevel types
│   ├── journey.ts                        # JourneyEntry, EntryType (work/education/award) types
│   ├── navigation.ts                     # NavItem, NavGroup, SocialLink interfaces
│   └── mdx.ts                            # MDXComponents map type, MDXRemote prop types
│
└── public/                               # Static assets — served at root URL (not in src/)
    ├── images/
    │   ├── avatar.webp                   # Profile photo (optimised WebP)
    │   ├── og-image.png                  # Open Graph / Twitter card image (1200×630)
    │   └── projects/                     # Per-project cover images
    │       └── [project-slug].webp
    ├── icons/
    │   ├── favicon.ico
    │   ├── icon-192.png                  # PWA manifest icon
    │   └── icon-512.png
    └── fonts/                            # Self-hosted font files (woff2)
        ├── SpaceGrotesk-Variable.woff2
        └── JetBrainsMono-Variable.woff2
```

---

## Folder Responsibilities at a Glance

| Folder | Responsibility | Imports From |
|---|---|---|
| `app/` | Routing, layouts, page-level metadata, server components | `components/`, `lib/`, `data/`, `types/` |
| `components/3d/` | R3F scenes only — lazy-loaded, `<Suspense>`-wrapped, zero business logic | `hooks/`, `styles/` tokens |
| `components/animations/` | Framer Motion wrappers only — `whileInView` + `viewport={{ once: true }}` | `hooks/useReducedMotion` |
| `components/layout/` | Persistent chrome: header, footer, navigation | `components/ui/`, `data/navigation` |
| `components/sections/` | Page-scoped feature blocks — composed from `ui/` atoms | `components/ui/`, `components/animations/`, `data/` |
| `components/ui/` | Design-system atoms and molecules — no page awareness | `lib/cn`, `styles/` tokens |
| `components/providers/` | React context providers — app-level state only | `hooks/` |
| `content/` | Authored MDX source — blog posts and project details | — |
| `data/` | Typed static records — single source of truth for all content arrays | `types/` |
| `hooks/` | Reusable stateful logic — no JSX, no rendering | `lib/` |
| `lib/` | Pure functions and utilities — framework-agnostic | `types/` |
| `styles/` | **Design Truth Layer** — all tokens, glass utilities, typography | — |
| `types/` | Global TypeScript interfaces and type aliases | — |

---

## Key Architectural Decisions

### 1 — Page Data Flow
```
data/*.ts  ──►  app/[page]/page.tsx (Server Component)
                    │
                    ├──► components/sections/[page]/*.tsx  (composition)
                    │         └──► components/ui/*.tsx     (atoms)
                    └──► components/animations/*.tsx       (motion wrappers)
```

### 2 — MDX Pipeline
```
content/blog/[slug].mdx
    └──► lib/mdx.ts          (serialize: gray-matter + next-mdx-remote)
             └──► app/blog/[slug]/page.tsx  (generateStaticParams + generateMetadata)
                      └──► components/sections/blog/PostBody.tsx
                                └──► components/ui/CodeBlock.tsx  (syntax highlight)
```

### 3 — 3D Scene Lazy Loading
```tsx
// app/page.tsx or any section
const HeroScene = dynamic(
  () => import('@/components/3d/HeroScene'),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> }
);

<Suspense fallback={<Skeleton />}>
  <HeroScene />
</Suspense>
```

### 4 — Animation Rule
All motion logic lives exclusively in `components/animations/`. Sections import wrappers, never raw Framer Motion primitives.

```tsx
// ✅ Correct usage in a section
import { FadeUp } from '@/components/animations/FadeUp';
<FadeUp><ProjectCard {...props} /></FadeUp>

// ❌ Never — motion primitives directly in section/page files
import { motion } from 'framer-motion';
```

### 5 — Design Truth Layer Enforcement
No hardcoded colours, sizes, or font values anywhere in components. Every visual property references a CSS custom property from `styles/globals.css`.

```tsx
// ✅ Correct
className="bg-[var(--color-surface-container)] text-[var(--color-on-background)]"

// ❌ Never
className="bg-[#221e26] text-[#e8e0eb]"
```

---

## Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| React components | `PascalCase` | `ProjectCard.tsx` |
| Custom hooks | `use` + `camelCase` | `useScrollProgress.ts` |
| Utility functions | `camelCase` | `formatDate.ts`, `slugify.ts` |
| Constants | `SCREAMING_SNAKE_CASE` | `SITE_URL`, `DEFAULT_OG_IMAGE` |
| CSS tokens | `--kebab-case` | `--color-primary`, `--spacing-gutter` |
| File names | `kebab-case` (except components) | `reading-time.ts` |
| Route folders | `kebab-case` | `app/about/`, `app/blog/[slug]/` |
| MDX content files | `kebab-case` | `building-ai-agents-2025.mdx` |

---

## TypeScript Path Aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*":            ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/sections/*":   ["src/components/sections/*"],
      "@/ui/*":         ["src/components/ui/*"],
      "@/animations/*": ["src/components/animations/*"],
      "@/3d/*":         ["src/components/3d/*"],
      "@/hooks/*":      ["src/hooks/*"],
      "@/lib/*":        ["src/lib/*"],
      "@/data/*":       ["src/data/*"],
      "@/types/*":      ["src/types/*"],
      "@/styles/*":     ["src/styles/*"],
      "@/content/*":    ["src/content/*"]
    }
  }
}
```

---

## Component Count Summary

| Layer | Count | Notes |
|---|---|---|
| App routes / pages | 9 | Home, About, Expertise, Projects (index + `[slug]`), Journey, Contact, Blog (index + `[slug]`) |
| 3D scenes | 7 | All lazy-loaded, SSR-disabled |
| Animation wrappers | 10 | Framer Motion only; `variants.ts` centralises definitions |
| Layout components | 6 | Header, Footer, Nav primitives, scroll chrome |
| Section components | 22 | Page-scoped feature blocks across all 7 pages |
| UI atoms / molecules | 18 | Design-system primitives — fully reusable |
| Providers | 3 | Theme, smooth scroll, toast |
| Hooks | 9 | All pure, no JSX |
| Lib utilities | 8 | Framework-agnostic functions |
| Type definition files | 7 | Full coverage, exported via `types/index.ts` |
| Data files | 6 | Typed static content records |

---

*All values (colours, spacing, typography) derive exclusively from `src/styles/globals.css` — the Design Truth Layer. Never reference raw hex values or pixel sizes in component files.*