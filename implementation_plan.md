# Vite → Next.js App Router Migration Plan

## Overview

Migrate the existing **Vite + React 18 + TypeScript** frontend to **Next.js 15 (App Router)** while fully preserving the Neo-Mint / Forest aesthetic, all existing pages, components, and the Django REST API integration. The migration replaces the client-side SPA model with a hybrid architecture: **React Server Components (RSC) for public pages** (better SEO, faster FCP) and **`'use client'` components** for interactive/auth-gated surfaces.

---

## User Review Required

> [!IMPORTANT]
> **Next.js version**: This plan targets **Next.js 15** with the **App Router** (stable). If you want to stay on Pages Router for a simpler 1:1 migration, flag that — but App Router is recommended for the long-term premium experience (RSC, streaming, Suspense boundaries).

> [!IMPORTANT]
> **Tailwind CSS 4**: Next.js 15 officially supports Tailwind v4 via `@tailwindcss/postcss`. The existing `@tailwindcss/vite` plugin will be swapped out. All Tailwind classes will continue to work identically.

> [!WARNING]
> **Directory strategy**: The plan replaces the contents of the existing `frontend/` directory in-place. We will **delete** `vite.config.ts`, `src/main.tsx`, `src/app/App.tsx`, `src/app/routes.ts`, and `src/app/Root.tsx` as they are Vite/RR7-specific. All pages and components are migrated, not discarded.

> [!CAUTION]
> **`localStorage` in `api.ts`**: Token storage uses `localStorage` which is browser-only. Any component touching auth must be `'use client'`. The plan accounts for this with an `AuthProvider` context wrapper.

---

## Open Questions

> [!IMPORTANT]
> 1. **Deployment target**: Vercel (recommended for Next.js)? Self-hosted Node.js server? Static export? This affects whether we use SSR, SSG, or ISR for each page.
> 2. **`PROFILE.resumeUrl`** is currently empty. Should the Resume PDF link be wired to a real file/URL before migration?
> 3. **OpenAPI type generation** (`gen:types` script) hits `http://localhost:8000`. Should this be updated to point to the production Django URL, or stay as a dev-time local command?
> 4. **`/login` and auth flow**: Is the login page for an admin-only CMS area, or for general users? This affects how we scope `'use client'` and the auth guard pattern.

---

## Proposed Changes

### Phase 1 — Bootstrap Next.js Project

#### [MODIFY] [package.json](file:///home/maimoon-ai-system/Antigravity%20code/Portfolio_Project/frontend/package.json)

Replace Vite/RR7 scripts and devDependencies with Next.js equivalents. Key changes:

```json
// REMOVE
"@vitejs/plugin-react", "vite", "@tailwindcss/vite", "react-router"

// ADD
"next": "^15.x", "@tailwindcss/postcss": "^4.x", "next-mdx-remote" (optional for blog)

// SCRIPTS change from:
"dev": "vite"          →  "dev": "next dev"
"build": "vite build"  →  "build": "next build"
"preview": "vite preview"  →  "start": "next start"

// KEEP (unchanged)
All Radix UI, Lucide, emotion, MUI, motion, SWR, react-hook-form, etc.
```

#### [DELETE] `vite.config.ts`
#### [DELETE] `src/main.tsx`
#### [DELETE] `src/app/App.tsx`
#### [DELETE] `src/app/routes.ts`
#### [DELETE] `src/app/Root.tsx`
#### [DELETE] `index.html` (Vite's entry HTML)

#### [NEW] `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow fetching images from Django backend
  images: {
    remotePatterns: [{ hostname: 'YOUR-BACKEND-URL.onrender.com' }],
  },
  // Proxy /api to Django in dev (replaces vite proxy)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE}/:path*`,
      },
    ];
  },
};
export default nextConfig;
```

#### [MODIFY] `tsconfig.json`

Add Next.js-required paths plugin and strict settings:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### [NEW] `postcss.config.mjs` (replace existing)

```js
export default {
  plugins: { '@tailwindcss/postcss': {} }
};
```

#### [NEW] `.env.local`

```
NEXT_PUBLIC_API_BASE=https://YOUR-BACKEND-URL.onrender.com/api/v1
```

---

### Phase 2 — App Directory Structure

The new file-system routing replaces `routes.ts`. Full mapping:

| Current (React Router)            | Next.js App Router path                      |
|-----------------------------------|----------------------------------------------|
| `pages/Home.tsx` @ `/`           | `app/page.tsx`                               |
| `pages/Projects.tsx` @ `/projects`| `app/projects/page.tsx`                     |
| `pages/ProjectDetail.tsx` @ `/projects/:slug` | `app/projects/[slug]/page.tsx`  |
| `pages/Resume.tsx` @ `/resume`   | `app/resume/page.tsx`                        |
| `pages/Courses.tsx` @ `/courses` | `app/courses/page.tsx`                       |
| `pages/Knowledge.tsx` @ `/knowledge` | `app/knowledge/page.tsx`                 |
| `pages/Blog.tsx` @ `/blog`       | `app/blog/page.tsx`                          |
| `pages/BlogPost.tsx` @ `/blog/:slug` | `app/blog/[slug]/page.tsx`              |
| `pages/Contact.tsx` @ `/contact` | `app/contact/page.tsx`                       |
| `pages/Login.tsx` @ `/login`     | `app/login/page.tsx`                         |
| `pages/NotFound.tsx` @ `*`       | `app/not-found.tsx`                          |
| `pages/Tools/Tools.tsx`          | `app/tools/page.tsx`                         |
| `pages/Tools/ToolsPages/APBioScoreCalculator.tsx` | `app/tools/ap-bio-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Apcalcbccalculator.tsx` | `app/tools/ap-calc-bc-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Apchemscorecalculator.tsx` | `app/tools/ap-chem-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Apphysics1scorecalculator.tsx` | `app/tools/ap-physics-1-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Apstatscalculator.tsx` | `app/tools/ap-stats-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Apworldscorecalculator.tsx` | `app/tools/ap-world-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Linearfeetcalculator.tsx` | `app/tools/linear-feet-calculator/page.tsx` |
| `pages/Tools/ToolsPages/Pokemoncatchratecalculator.tsx` | `app/tools/pokemon-catch-rate-calculator/page.tsx` |

---

### Phase 3 — Core App Shell

#### [NEW] `app/layout.tsx`

Root layout — replaces `Root.tsx`. Renders `<Navbar>`, `<Footer>`, applies global CSS, and wraps app in providers.

```tsx
import type { Metadata } from 'next';
import './globals.css';  // ← was src/styles/index.css
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { Providers } from '@/app/providers';

export const metadata: Metadata = {
  title: { template: '%s | Maimoon Amin', default: 'Maimoon Amin — AI Architect & MLOps Engineer' },
  description: 'Portfolio of Maimoon Amin — AI Agent Architect, MLOps Engineer, and Data Scientist.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#081A04' }}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

#### [NEW] `app/globals.css`

Move `src/styles/index.css` here (rename). No content changes — all custom properties, keyframes, and utility classes stay identical.

#### [NEW] `app/providers.tsx` (`'use client'`)

Wraps the app in SWR's `SWRConfig` and any future context providers (auth, theme). Needed because `SWRConfig` is a client component.

```tsx
'use client';
import { SWRConfig } from 'swr';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      {children}
    </SWRConfig>
  );
}
```

---

### Phase 4 — Component Updates (All Components)

#### [MODIFY] All components in `components/`

Two focused changes per component:

**1. Import swap** — React Router → Next.js:
```tsx
// BEFORE
import { Link, useLocation, useNavigate } from 'react-router';

// AFTER
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
```

**2. `<Link>` prop swap**:
```tsx
// BEFORE
<Link to="/projects">...</Link>

// AFTER
<Link href="/projects">...</Link>
```

**3. `useNavigate` → `useRouter`**:
```tsx
// BEFORE
const navigate = useNavigate();
navigate('/');

// AFTER
const router = useRouter();
router.push('/');
```

**4. `useLocation().pathname` → `usePathname()`**:
```tsx
// BEFORE
const location = useLocation();
location.pathname

// AFTER
const pathname = usePathname();
pathname
```

**5. `<img>` → `next/image`** (for remote project/blog images):
```tsx
import Image from 'next/image';
// <img src={project.image} ...> becomes:
<Image src={project.image} alt={...} fill className="object-cover" />
```

Components affected: `Navbar.tsx`, `Footer.tsx`, `ProjectCard.tsx`, `BlogCard.tsx`, `CourseCard.tsx`, `ToolCard.tsx`

> [!NOTE]
> `FloatingOrb.tsx` and `PopupModal.tsx` use no router APIs — no changes needed.

---

### Phase 5 — Page Migrations

#### Pages that become **Server Components** (RSC) — fetch data directly

These pages fetch public data that benefits from SSR/SSG for SEO:

| Page | Strategy | Reason |
|------|----------|--------|
| `app/page.tsx` (Home) | `async` Server Component | Featured projects + recent posts — great for SEO |
| `app/projects/page.tsx` | `async` Server Component | Full project list — SEO critical |
| `app/projects/[slug]/page.tsx` | `async` Server Component + `generateMetadata` | Individual project SEO |
| `app/blog/page.tsx` | `async` Server Component | Blog listing SEO |
| `app/blog/[slug]/page.tsx` | `async` Server Component + `generateMetadata` | Individual post SEO |
| `app/resume/page.tsx` | `async` Server Component | Static-ish CV data |

Example pattern for `app/projects/page.tsx`:
```tsx
// No 'use client' — this is a Server Component
import { getProjects } from '@/app/services/api';
import { ProjectCard } from '@/app/components/ProjectCard';

export const metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  const data = await getProjects();  // called server-side
  return <ProjectsView projects={data.results} />;
}
```

The **interactive filter bar** (category buttons, state) is extracted into a `ProjectsView` Client Component that receives pre-fetched data as props.

#### Pages that stay **Client Components** (`'use client'`)

| Page | Reason |
|------|--------|
| `app/contact/page.tsx` | Form state, validation, submission |
| `app/login/page.tsx` | `localStorage` auth token handling |
| `app/tools/*/page.tsx` | All calculators are pure client-side logic |
| `app/knowledge/page.tsx` | Interactive tabs/filters |
| `app/courses/page.tsx` | Interactive state |

---

### Phase 6 — API & Services Layer

#### [MODIFY] `src/app/services/api.ts`

Two changes:

**1. Base URL** — use `NEXT_PUBLIC_API_BASE` env var:
```ts
// BEFORE
export const API_BASE = "https://YOUR-BACKEND-URL.onrender.com/api/v1";

// AFTER
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';
```

**2. `localStorage` guard** — wrap in `typeof window !== 'undefined'` check to prevent SSR errors:
```ts
export function getTokens(): TokenPair | null {
  if (typeof window === 'undefined') return null;  // ← ADD THIS
  const s = localStorage.getItem('token_pair');
  // ... rest unchanged
}
```

The same guard applies to `saveTokens` and `clearTokens`.

#### [MODIFY] `src/app/config.ts`

```ts
// BEFORE
export const API_BASE = "https://YOUR-BACKEND-URL.onrender.com/api/v1";

// AFTER
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '/api/v1';
```

---

### Phase 7 — SWR Hooks

#### [MODIFY] All hooks in `src/app/hooks/`

The SWR hooks (`useProjects`, `useResume`, `useCourses`, `useKnowledge`) are **kept as-is** for client components that use them (filtered/interactive views). They just need `'use client'` added to any component that imports them — the hooks themselves don't need the directive.

> [!TIP]
> For RSC pages, we skip the SWR hook and call the service function directly in the `async` server component. SWR hooks are reserved for client-side interactive filtering (e.g., category filter on Projects page).

---

### Phase 8 — Inline Styles & `<style>` Tags

Several components inject `<style>` tags directly (e.g., `Home.tsx` injects `GLOBAL_STYLES`, `Navbar.tsx` injects keyframe CSS). In Next.js, this works fine in **client components** but is not ideal.

**Strategy**: Keep inline `<style>` tags for now (they work in Next.js). As a follow-up polish pass, move keyframe animations to `globals.css`. This is non-blocking.

---

### Phase 9 — SEO & Metadata

Add `generateMetadata` to all dynamic route pages for proper per-page SEO:

```tsx
// app/projects/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      images: [project.image],
    },
  };
}
```

Same pattern for `app/blog/[slug]/page.tsx`.

---

### Phase 10 — OpenAPI Type Generation

#### [MODIFY] `package.json` scripts

```json
"gen:types": "openapi-typescript ${NEXT_PUBLIC_API_BASE:-http://localhost:8000}/api/schema/ -o src/types/generated.ts"
```

No functional changes — the generated `src/types/generated.ts` and all type aliases in `src/app/types/api.ts` carry over identically.

---

## Complete File-Change Summary

```
frontend/
├── [DELETE]  vite.config.ts
├── [DELETE]  index.html
├── [NEW]     next.config.ts
├── [NEW]     .env.local
├── [MODIFY]  package.json
├── [MODIFY]  tsconfig.json
├── [MODIFY]  postcss.config.mjs
│
├── app/                          ← NEW Next.js app dir (at root of frontend/)
│   ├── [NEW]  layout.tsx          (was Root.tsx + main.tsx + App.tsx)
│   ├── [NEW]  globals.css         (was src/styles/index.css — moved)
│   ├── [NEW]  providers.tsx       (SWRConfig + future providers)
│   ├── [NEW]  not-found.tsx       (was pages/NotFound.tsx)
│   │
│   ├── page.tsx                   (was pages/Home.tsx — RSC)
│   ├── projects/
│   │   ├── page.tsx               (was pages/Projects.tsx — RSC shell + client grid)
│   │   └── [slug]/page.tsx        (was pages/ProjectDetail.tsx — RSC + generateMetadata)
│   ├── blog/
│   │   ├── page.tsx               (was pages/Blog.tsx — RSC shell + client filters)
│   │   └── [slug]/page.tsx        (was pages/BlogPost.tsx — RSC + generateMetadata)
│   ├── resume/page.tsx            (was pages/Resume.tsx — RSC)
│   ├── courses/page.tsx           (was pages/Courses.tsx — 'use client')
│   ├── knowledge/page.tsx         (was pages/Knowledge.tsx — 'use client')
│   ├── contact/page.tsx           (was pages/Contact.tsx — 'use client')
│   ├── login/page.tsx             (was pages/Login.tsx — 'use client')
│   └── tools/
│       ├── page.tsx               (was pages/Tools/Tools.tsx)
│       ├── ap-bio-calculator/page.tsx
│       ├── ap-calc-bc-calculator/page.tsx
│       ├── ap-chem-calculator/page.tsx
│       ├── ap-physics-1-calculator/page.tsx
│       ├── ap-stats-calculator/page.tsx
│       ├── ap-world-calculator/page.tsx
│       ├── linear-feet-calculator/page.tsx
│       └── pokemon-catch-rate-calculator/page.tsx
│
└── src/
    ├── app/
    │   ├── components/            [MODIFY] — Link/usePathname/useRouter swaps
    │   ├── hooks/                 [KEEP]   — SWR hooks unchanged
    │   ├── services/api.ts        [MODIFY] — env var + localStorage guard
    │   ├── config.ts              [MODIFY] — env var
    │   ├── data/index.ts          [KEEP]   — unchanged
    │   └── types/api.ts           [KEEP]   — unchanged
    ├── styles/
    │   ├── fonts.css              [KEEP]
    │   ├── theme.css              [KEEP]
    │   └── tailwind.css           [KEEP]
    └── types/
        └── generated.ts           [KEEP]
```

---

## Verification Plan

### Automated Tests
```bash
# 1. Install new deps
cd frontend && npm install next@latest @tailwindcss/postcss

# 2. Remove old Vite deps
npm uninstall vite @vitejs/plugin-react @tailwindcss/vite react-router

# 3. Type check
npx tsc --noEmit

# 4. Build check
npm run build

# 5. Dev server
npm run dev  # → http://localhost:3000
```

### Route Coverage Checklist
- [ ] `/` — Home page loads with hero, marquee, services, featured projects
- [ ] `/projects` — Grid loads, category filter works
- [ ] `/projects/:slug` — Detail page loads with correct data
- [ ] `/blog` — Blog list + featured post
- [ ] `/blog/:slug` — Full post loads
- [ ] `/resume` — Skills/experience/education from API
- [ ] `/courses` — Course cards render
- [ ] `/knowledge` — Knowledge overview renders
- [ ] `/contact` — Form submits, validation works
- [ ] `/login` — Auth flow works
- [ ] `/tools` — Tools index renders
- [ ] `/tools/ap-bio-calculator` — Calculator works
- [ ] All 8 tool routes accessible
- [ ] 404 page on unknown route
- [ ] Navbar scroll behavior + mobile menu
- [ ] Footer links correct

### SEO Validation
- [ ] `<title>` tags set per page
- [ ] `<meta description>` present
- [ ] Open Graph tags on project/blog detail pages
- [ ] No hydration mismatch errors in browser console

### Performance
- [ ] Lighthouse score ≥ 90 for Performance, SEO, Accessibility on Home page
- [ ] No layout shift from font loading (fonts.css preloads)
