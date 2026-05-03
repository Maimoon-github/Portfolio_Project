# Master System Prompt: Next.js 15 + React 19 + 3D Portfolio Ecosystem

## Ⅰ. TECH STACK (Immutable)

```
Framework:   Next.js 15 (App Router) — stable, default going forward
Language:    TypeScript (strict mode)
Styling:     Tailwind CSS v4 + shadcn/ui (CSS variables theming)
3D:          @react-three/fiber@rc (v9 RC) + @react-three/drei + GSAP (@gsap/react)
State:       Zustand (client global) + Server Components (server data)
Validation:  Zod (form/server action validation)
```

> **⛔ R3F v8 is incompatible with React 19.** Use `@react-three/fiber@rc` exclusively.

---

## Ⅱ. ARCHITECTURAL RULES (Non-Negotiable)

### 2.1 Server/Client Boundary

```
┌─────────────────────────────────────────┐
│  Server Components (default)            │
│  ├─ Data fetching, DB queries, auth     │
│  ├─ Metadata generation                 │
│  └─ Pass data as props DOWN to clients  │
├─────────────────────────────────────────┤
│  Client Components ('use client')        │
│  ├─ Event handlers, state, effects      │
│  ├─ 3D canvases (R3F), GSAP animations  │
│  └─ MUST reside at component tree LEAVES│
└─────────────────────────────────────────┘
```

**Rule:** Server Components import Client Components ✓. Client Components **cannot** import Server Components. Pass server data as props through `children` pattern.

### 2.2 Directory Convention

```
src/
├─ app/                    # Routes only (layout, page, loading, error)
│  ├─ (marketing)/         # Route group — about, contact
│  ├─ (legal)/             # Route group — privacy, terms
│  ├─ blog/[slug]/         # Dynamic blog routes
│  ├─ portfolio/[slug]/    # Dynamic portfolio routes
│  └─ tools/[slug]/        # Dynamic tool routes
├─ components/
│  ├─ ui/                  # shadcn/ui primitives (button, card, etc.)
│  ├─ layout/              # Header, Footer, Providers, ThemeToggle
│  ├─ blog/                # PostCard, RichTextRenderer, TableOfContents
│  ├─ portfolio/           # ProjectCard, SkillBadge, ExperienceTimeline
│  ├─ tools/               # ToolCard, ToolShell, InputField, ResultDisplay
│  └─ three/               # ← ALL 3D components isolated here
│     ├─ scenes/           # Full 3D scenes (HeroScene, ContactScene)
│     ├─ models/           # Individual 3D models
│     └─ effects/          # Post-processing, particles
├─ hooks/                  # useDebounce, useIntersectionObserver, useTool
├─ lib/                    # API clients, utils, OG image generation
├─ store/                  # Zustand stores (authStore, uiStore)
├─ styles/                 # globals.css, theme.css, fonts.css
└─ types/                  # Shared TypeScript types
```

**Design decisions already established in existing tree.**

---

## Ⅲ. CRITICAL VERSION-SPECIFIC RULES

### 3.1 React Compiler (React Forget)

Enable in `next.config.ts`:
```ts
experimental: {
  reactCompiler: true,
}
```

**Consequence:** Remove ALL `useMemo`, `useCallback`, and `React.memo` from codebase. The compiler auto-memoizes at expression granularity — finer than any manual optimization. Only keep memoization where the compiler proves insufficient (verify via React DevTools profiler).

### 3.2 Server Actions

Use for **mutations only**, never for data fetching.

```ts
// ✅ DO — Server Action for mutation
'use server'
export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { errors: parsed.error.flatten() };
  await db.contact.create({ data: parsed.data });
  revalidatePath('/contact');
  return { success: true };
}

// ❌ DON'T — Server Action for data fetching
'use server'
export async function getBlogPosts() { ... } // Wrong pattern
```

For data fetching, use Server Components directly with `async/await` at the component level.

### 3.3 Caching Strategy (Next.js 15 is UN-cached by default)

```ts
// Data fetching in Server Component — use unstable_cache for DB queries
import { unstable_cache } from 'next/cache';

const getBlogPosts = unstable_cache(
  async (category?: string) => {
    return db.post.findMany({ where: { category } });
  },
  ['blog-posts'],
  { revalidate: 3600, tags: ['posts'] }
);

// Revalidation after mutation
import { revalidateTag } from 'next/cache';
revalidateTag('posts'); // In Server Action after mutation
```

**Breaking change from v14:** GET route handlers and client router cache are NOT cached by default.

### 3.4 Partial Prerendering (PPR)

```ts
// next.config.ts
experimental: {
  ppr: 'incremental',
}

// In any page/layout:
export const experimental_ppr = true;
```

This combines static shell (instant load) with dynamic holes (streamed in). Use for blog and portfolio pages where the layout is static but content is dynamic.

### 3.5 Typed Routes (Stable in 15.5)

```ts
// next.config.ts — stable, not experimental
typedRoutes: true,
```

All `<Link href>` and `router.push` paths get compile-time type checking. Use for all navigation.

### 3.6 Suspense in React 19 — WATERFALL WARNING

React 19 Suspense children are **not** concurrent/parallel. Multiple Suspense boundaries under one parent cause sequential waterfalls. **Solution:** Hoist async work to parent and pass promises as props, or use separate Suspense boundaries at sibling level.

```tsx
// ❌ Waterfall
<Suspense fallback={<Skeleton />}>
  <BlogPosts />    // Renders only after BlogTags finishes
  <BlogTags />
</Suspense>

// ✅ Parallel
<Suspense fallback={<Skeleton />}>
  <BlogPosts />
</Suspense>
<Suspense fallback={<Skeleton />}>
  <BlogTags />
</Suspense>
```

---

## Ⅳ. 3D INTEGRATION PROTOCOL

### 4.1 R3F v9 Setup

```bash
npm install @react-three/fiber@rc @react-three/drei three
npm install gsap @gsap/react
```

### 4.2 The Gate Pattern (Mandatory for Performance)

Every 3D component MUST follow this pattern:

```tsx
// components/three/scenes/HeroScene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { Suspense } from 'react';
import HeroModel from '../models/HeroModel';

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}           // Cap pixel ratio
      performance={{ min: 0.5 }} // Adaptive quality
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <HeroModel />
        <Environment preset="city" />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
```

Key constraints:
- **`dpr={[1, 1.5]}`** — never exceed 1.5x pixel ratio (GPU cost is exponential beyond this)
- **`antialias: false`** — disable for mobile; use post-processing FXAA if needed
- **`performance={{ min: 0.5 }}`** — R3F v9 auto-adapts framerate under load

### 4.3 Deferred 3D Loading (Non-Negotiable for Lighthouse 100)

```tsx
// In page component:
'use client';
import dynamic from 'next/dynamic';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const HeroScene = dynamic(() => import('@/components/three/scenes/HeroScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-muted animate-pulse" />,
});

export default function HomePage() {
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin: '200px',  // Load 200px BEFORE element enters viewport
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {isIntersecting && <HeroScene />}
    </div>
  );
}
```

**This pattern alone is responsible for the 100 Lighthouse score in 3D-heavy portfolios.** The 3D chunk (often 200KB+) never downloads until the user scrolls near it.

### 4.4 GSAP Integration

```tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ONLY on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AnimatedSection() {
  const container = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    gsap.from('.animate-in', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });
  }, { scope: container });

  return <div ref={container}>...</div>;
}
```

**Critical:** Always use `useGSAP()` hook (handles cleanup automatically). Always register ScrollTrigger inside `typeof window !== 'undefined'` guard or `useEffect` to prevent SSR crashes.

### 4.5 3D Model Pipeline

```
Source Model (.blend/.fbx)
  → glTF/GLB export
    → Draco compression (gltf-transform or optimizeglb.com)
      → /public/models/model.drc.glb
        → Runtime: DRACOLoader in R3F (useGLTF from drei auto-handles)
```

**Target:** Models under 500KB. Draco achieves 50-90% size reduction.

### 4.6 Three.js Component Isolation Rule

All files importing from `three`, `@react-three/fiber`, or `@react-three/drei` MUST:
1. Have `'use client'` directive
2. Reside in `components/three/` directory
3. Be imported via `dynamic(() => import(...), { ssr: false })`
4. Never be directly imported into a Server Component

---

## Ⅴ. SHADCN/UI THEME PROTOCOL

### 5.1 CSS Variables Theme Structure

```css
/* styles/globals.css */
@import "tailwindcss";

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-secondary: hsl(var(--secondary));
  --color-muted: hsl(var(--muted));
  --color-accent: hsl(var(--accent));
  /* ... full set */
}

:root {
  --background: 247 40% 10%;    /* #131026 — deepest */
  --foreground: 264 41% 57%;    /* #8B65BF — ethereal purple */
  --primary: 264 57% 41%;       /* #5F2DA6 — deep violet core */
  --secondary: 264 37% 32%;     /* #4E3473 — muted royal */
  --muted: 247 41% 17%;         /* #1F1A40 — dark surface */
  --accent: 264 41% 57%;        /* #8B65BF — accent glow */
}

.dark {
  /* Same mapping — the dark theme IS the default here */
}
```

**Hex values from provided color theme:** `#5F2DA6` (core), `#4E3473`, `#8B65BF`, `#1F1A40`, `#131026`.

### 5.2 Tailwind v4 + shadcn/ui Compatibility

Tailwind v4 pushes theme configuration into CSS via `@theme`. shadcn/ui components reference CSS variables that must be bridged through `@theme inline` block. Always run `npx shadcn@latest add <component>` to ensure Radix UI dependencies resolve correctly with React 19. Use `--legacy-peer-deps` if npm complains.

---

## Ⅵ. STATE MANAGEMENT MATRIX

| Concern | Tool | Location |
|---|---|---|
| Server data (blog posts, projects) | Server Components + `unstable_cache` | `app/` directory |
| Form state (contact, tools) | `useActionState` + `useOptimistic` | Client Components |
| UI state (theme, menu open) | Zustand `uiStore` | `store/uiStore.ts` |
| Auth state | Zustand `authStore` (persist middleware) | `store/authStore.ts` |
| 3D scene refs | React `useRef` (never in global state) | Inside 3D components |
| Animations | GSAP timeline refs (local to component) | Inside animated components |

**Zustand pattern with Next.js 15:**
```ts
// store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  theme: 'dark' | 'light';
  mobileMenuOpen: boolean;
  toggleTheme: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'dark',
  mobileMenuOpen: false,
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
```

**Server Component rule:** Zustand stores must be consumed in Client Components only. Wrap store consumers in a `<Providers>` client component at the layout level.

---

## Ⅶ. PERFORMANCE MANDATES (Core Web Vitals Target: 90+)

### 7.1 Bundle Strategy

| Import Method | Use Case |
|---|---|
| `next/dynamic` + `ssr: false` | 3D scenes, heavy animations |
| `React.lazy` + `Suspense` | Below-fold sections (testimonials, footer 3D) |
| `IntersectionObserver` (200px rootMargin) | Trigger lazy load before visibility |
| `next/image` | ALL raster images (WebP/AVIF, lazy by default) |
| `optimizePackageImports` | In next.config.ts for MUI, lodash, etc. |

### 7.2 3D-Specific Performance

- **Max draw calls:** < 200 (monitor via Three.js stats)
- **Texture size:** ≤ 1024×1024 for environment maps
- **Geometry:** Simplify meshes > 10,000 vertices
- **Shadows:** Disable on mobile, use baked shadow maps for static scenes
- **Reflow prevention:** Define explicit `width`/`height` on all images to avoid GSAP forced reflow
- **LCP optimization:** Preload hero image with `<link rel="preload" fetchpriority="high">`

### 7.3 Metadata & SEO

Every route exports `generateMetadata`:
```ts
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [{ url: post.ogImage, width: 1200, height: 630 }],
    },
    alternates: { canonical: `https://domain.com/blog/${post.slug}` },
  };
}
```

Combine with `<JsonLd>` component for structured data (Article, Person, BreadcrumbList schemas already in project tree).

---

## Ⅷ. CODE GENERATION DIRECTIVES

When generating code, adhere to these rules without exception:

1. **No `useMemo` / `useCallback` / `React.memo`** — React Compiler handles this. Strip any existing instances.
2. **No API routes for data fetching** — Use Server Components with async/await. API routes exist only for webhooks, revalidation, OG images.
3. **All 3D imports are `dynamic(() => import(...), { ssr: false })`** — No exceptions.
4. **Every page exports `loading.tsx`** — Skeleton component matching the page layout.
5. **Every data mutation uses Server Actions** — Form submissions, newsletter signups, contact forms.
6. **No `any` types** — Define interfaces in `types/api.ts`. Use Zod schemas for runtime validation.
7. **Component files export a single default** — Named exports only for utilities/constants.
8. **CSS only in `styles/` directory or Tailwind classes** — No CSS modules, no styled-jsx.
9. **GSAP animations live in `useGSAP()` hook** — Never in `useEffect` with manual cleanup.
10. **Lighthouse budget:** By default, generate code targeting < 100KB initial JS, < 50KB initial CSS, LCP < 2.5s.

---

## Ⅸ. PROJECT-SPECIFIC CONFIGURATION

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'gsap', 'three'],
  },
  typedRoutes: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
```

```jsonc
// components.json (shadcn/ui)
{
  "style": "default",
  "tailwind": {
    "baseColor": "violet",  // Aligned with mystical black lotus theme
    "cssVariables": true
  },
  "rsc": true,
  "tsx": true
}
```

---

## Ⅹ. PACKAGE VERSION LOCKS

```json
{
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^4.0.0",
    "@react-three/fiber": "^9.0.0-rc.x",
    "@react-three/drei": "^9.0.0-rc.x",
    "three": "^0.170.0",
    "gsap": "^3.12.0",
    "@gsap/react": "^2.0.0",
    "zustand": "^5.0.0",
    "zod": "^3.23.0",
    "next-themes": "^0.4.0",
    "lucide-react": "^0.460.0"
  }
}
```

> **Version constraint note:** Pin `@react-three/fiber@rc` exactly. When v9 stable releases, migrate. Never use R3F v8 with React 19 — the `ReactCurrentOwner` internal API was removed in React 19, causing `TypeError: Cannot read properties of undefined`.

---

## Ⅺ. EXECUTION SEQUENCE

When generating this project, follow this build order:

1. **Foundation:** `next.config.ts`, `tsconfig.json`, `components.json`, `styles/globals.css` (theme tokens)
2. **Layout shell:** `app/layout.tsx`, `components/layout/Header`, `Footer`, `Providers`, `ThemeToggle`
3. **UI primitives:** shadcn/ui components (button, card, badge, input, etc.)
4. **Data layer:** `lib/api/*.ts` (API clients), `types/api.ts` (interfaces), `store/*.ts` (Zustand)
5. **Pages (no 3D):** About, Blog listing, Portfolio listing, Tools listing
6. **Dynamic content:** Blog [slug], Portfolio [slug], Tools [slug] with MDX/rich-text rendering
7. **3D — deferred:** `components/three/` scenes and models, integrated via `dynamic()` import
8. **Animations:** GSAP scroll-triggered animations on marketing pages
9. **SEO:** `generateMetadata` on all pages, JSON-LD schemas, `robots.ts`, `sitemap.ts`
10. **Polish:** `loading.tsx` skeletons, `error.tsx` boundaries, `not-found.tsx` for all dynamic routes

---

**End of Master System Prompt.** This document is the single source of truth for architecture, tooling, performance, and code generation rules. All code output must conform to these specifications.