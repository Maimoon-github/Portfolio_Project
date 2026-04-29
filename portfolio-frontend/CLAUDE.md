@AGENTS.md


# portfolio-frontend

## Stack
- Framework: Next.js 15 (App Router), React 19, TypeScript strict
- Styling: Tailwind CSS v4, shadcn/ui
- State: nuqs (URL params), TanStack Query (CSR server data), Zustand (global client state)
- Deployment: Vercel

## Commands
- Dev:          `npm run dev`
- Build:        `npm run build`
- Type-check:   `npx tsc --noEmit`
- Lint:         `npm run lint`
- E2E tests:    `npx playwright test`
- Sync API types: `npm run sync-api-types`  ← run whenever backend schema changes

## Key Constraints
- All fetch calls in src/lib/api/ only — never inline fetch() in components or pages
- src/components/ui/ — never regenerate with shadcn CLI (would overwrite customisations)
- src/types/api.ts — never edit manually (auto-generated from OpenAPI schema)
- src/store/ — Zustand only; never import store slices in Server Components
- 'use client' only when: useState, useEffect, browser APIs, or event handlers are needed
- Every route segment must have: page.tsx + loading.tsx. Add not-found.tsx for dynamic segments.

## Key Files
- src/app/layout.tsx        — root layout, ThemeProvider
- src/store/index.ts        — Zustand stores (authStore, uiStore); never import in Server Components
- src/lib/api/client.ts     — base apiFetch() with ISR tag support
- src/types/api.ts          — auto-generated API types
- next.config.ts            — image domains, headers, redirects, /api/* dev proxy rewrite
- .env.local                — NEXT_PUBLIC_API_URL, REVALIDATE_SECRET (never commit)