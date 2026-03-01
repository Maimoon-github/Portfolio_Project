# React + TypeScript Project Structure
## The Data Specialist Portfolio — Architecture Reference

> **Stack:** React 18 · TypeScript 5 · Vite · CSS Modules · React Router v6 · Vitest + React Testing Library · ESLint + Prettier
>
> Based on research into production-grade React/TypeScript architectures (bulletproof-react, feature-based directory patterns, and Vite toolchain best practices as of 2024–2025). The structure below converts the existing `.jsx` / `.js` codebase to fully typed `.tsx` / `.ts` files, adds TypeScript-specific layers (`types/`, `services/`, strict config files), and introduces clean separation of concerns across every layer of the application.


#!/bin/bash

# Script to create the React component folder structure and files
# Run this from the project root (where src/ is located)

set -e  # Exit on error




---

## Full Project Hierarchy

```
data-specialist-portfolio/
│
├── 📄 .gitignore
├── 📄 .env
├── 📄 .env.example
├── 📄 .eslintrc.cjs
├── 📄 .prettierrc
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tsconfig.app.json
├── 📄 tsconfig.node.json
├── 📄 vite.config.ts
├── 📄 vitest.config.ts
├── 📄 README.md
│
├── public/
│   ├── 📄 index.html
│   ├── 📄 favicon.ico
│   ├── 📄 robots.txt
│   └── 📄 manifest.json
│
├── src/
│   ├── 📄 main.tsx
│   ├── 📄 App.tsx
│   ├── 📄 vite-env.d.ts
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── Inter/
│   │   │   └── JetBrainsMono/
│   │   ├── images/
│   │   │   ├── projects/
│   │   │   ├── og/
│   │   │   └── backgrounds/
│   │   └── icons/
│   │       ├── social/
│   │       └── ui/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   │   ├── 📄 Button.tsx
│   │   │   │   ├── 📄 Button.module.css
│   │   │   │   ├── 📄 Button.types.ts
│   │   │   │   ├── 📄 Button.test.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── Card/
│   │   │   │   ├── 📄 Card.tsx
│   │   │   │   ├── 📄 Card.module.css
│   │   │   │   ├── 📄 Card.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── Badge/
│   │   │   │   ├── 📄 Badge.tsx
│   │   │   │   ├── 📄 Badge.module.css
│   │   │   │   ├── 📄 Badge.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── Navigation/
│   │   │   │   ├── 📄 Navbar.tsx
│   │   │   │   ├── 📄 DesktopNav.tsx
│   │   │   │   ├── 📄 MobileNav.tsx
│   │   │   │   ├── 📄 NavDropdown.tsx
│   │   │   │   ├── 📄 Nav.module.css
│   │   │   │   ├── 📄 Nav.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── 📄 Footer.tsx
│   │   │   │   ├── 📄 Footer.module.css
│   │   │   │   └── 📄 index.ts
│   │   │   ├── ProjectCard/
│   │   │   │   ├── 📄 ProjectCard.tsx
│   │   │   │   ├── 📄 ProjectCard.module.css
│   │   │   │   ├── 📄 ProjectCard.variants.ts
│   │   │   │   ├── 📄 ProjectCard.types.ts
│   │   │   │   ├── 📄 ProjectCard.test.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── ToolCard/
│   │   │   │   ├── 📄 ToolCard.tsx
│   │   │   │   ├── 📄 ToolCard.module.css
│   │   │   │   ├── 📄 ToolCard.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── DataTable/
│   │   │   │   ├── 📄 DataTable.tsx
│   │   │   │   ├── 📄 DataTable.module.css
│   │   │   │   ├── 📄 DataTable.types.ts
│   │   │   │   ├── 📄 TableHeader.tsx
│   │   │   │   ├── 📄 TableRow.tsx
│   │   │   │   └── 📄 index.ts
│   │   │   ├── FormInput/
│   │   │   │   ├── 📄 Input.tsx
│   │   │   │   ├── 📄 Input.module.css
│   │   │   │   ├── 📄 Input.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   ├── FilterBar/
│   │   │   │   ├── 📄 FilterBar.tsx
│   │   │   │   ├── 📄 FilterBar.module.css
│   │   │   │   ├── 📄 FilterBar.types.ts
│   │   │   │   └── 📄 index.ts
│   │   │   └── HeroKPIStrip/
│   │   │       ├── 📄 HeroKPIStrip.tsx
│   │   │       ├── 📄 KPICard.tsx
│   │   │       ├── 📄 HeroKPIStrip.module.css
│   │   │       └── 📄 index.ts
│   │   │
│   │   └── layout/
│   │       ├── 📄 Layout.tsx
│   │       ├── 📄 Header.tsx
│   │       ├── 📄 PageWrapper.tsx
│   │       ├── 📄 SectionContainer.tsx
│   │       └── 📄 layout.module.css
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── 📄 Home.tsx
│   │   │   ├── 📄 Home.module.css
│   │   │   ├── sections/
│   │   │   │   ├── 📄 HeroSection.tsx
│   │   │   │   ├── 📄 ManifestoSection.tsx
│   │   │   │   ├── 📄 FeaturedProjectsSection.tsx
│   │   │   │   ├── 📄 StackSnapshotSection.tsx
│   │   │   │   ├── 📄 LatestLabSection.tsx
│   │   │   │   └── 📄 ContactCTASection.tsx
│   │   │   └── 📄 index.ts
│   │   ├── About/
│   │   │   ├── 📄 About.tsx
│   │   │   ├── 📄 About.module.css
│   │   │   └── 📄 index.ts
│   │   ├── Resume/
│   │   │   ├── 📄 Resume.tsx
│   │   │   ├── 📄 Resume.module.css
│   │   │   └── 📄 index.ts
│   │   ├── Portfolio/
│   │   │   ├── 📄 Portfolio.tsx
│   │   │   ├── 📄 Portfolio.module.css
│   │   │   └── 📄 index.ts
│   │   ├── Projects/
│   │   │   ├── 📄 Projects.tsx
│   │   │   ├── 📄 Projects.module.css
│   │   │   └── 📄 index.ts
│   │   ├── ProjectDetail/
│   │   │   ├── 📄 ProjectDetail.tsx
│   │   │   ├── 📄 ProjectDetail.module.css
│   │   │   └── 📄 index.ts
│   │   ├── Tools/
│   │   │   ├── 📄 Tools.tsx
│   │   │   ├── 📄 Tools.module.css
│   │   │   └── 📄 index.ts
│   │   ├── Blog/
│   │   │   ├── 📄 Blog.tsx
│   │   │   ├── 📄 Blog.module.css
│   │   │   ├── 📄 BlogPost.tsx
│   │   │   └── 📄 index.ts
│   │   ├── Documentation/
│   │   │   ├── 📄 Documentation.tsx
│   │   │   ├── 📄 Documentation.module.css
│   │   │   ├── 📄 TutorialTemplate.tsx
│   │   │   └── 📄 index.ts
│   │   └── Contact/
│   │       ├── 📄 Contact.tsx
│   │       ├── 📄 Contact.module.css
│   │       └── 📄 index.ts
│   │
│   ├── styles/
│   │   ├── 📄 globals.css
│   │   ├── 📄 variables.css
│   │   ├── 📄 tokens.css
│   │   ├── 📄 typography.css
│   │   ├── 📄 animations.css
│   │   └── themes/
│   │       └── 📄 dark.css
│   │
│   ├── types/
│   │   ├── 📄 project.types.ts
│   │   ├── 📄 blog.types.ts
│   │   ├── 📄 tool.types.ts
│   │   ├── 📄 resume.types.ts
│   │   ├── 📄 navigation.types.ts
│   │   ├── 📄 common.types.ts
│   │   └── 📄 index.ts
│   │
│   ├── data/
│   │   ├── 📄 projects.ts
│   │   ├── 📄 tools.ts
│   │   ├── 📄 blog.ts
│   │   ├── 📄 resume.ts
│   │   └── schemas/
│   │       ├── 📄 project.schema.ts
│   │       ├── 📄 tool.schema.ts
│   │       └── 📄 blog.schema.ts
│   │
│   ├── services/
│   │   ├── 📄 contact.service.ts
│   │   ├── 📄 analytics.service.ts
│   │   └── 📄 index.ts
│   │
│   ├── hooks/
│   │   ├── 📄 useTheme.ts
│   │   ├── 📄 useScrollPosition.ts
│   │   ├── 📄 useFilteredProjects.ts
│   │   ├── 📄 useReducedMotion.ts
│   │   └── 📄 index.ts
│   │
│   ├── utils/
│   │   ├── 📄 formatNumber.ts
│   │   ├── 📄 animations.ts
│   │   ├── 📄 constants.ts
│   │   ├── 📄 cn.ts
│   │   └── 📄 index.ts
│   │
│   ├── config/
│   │   ├── 📄 routes.ts
│   │   ├── 📄 seo.ts
│   │   └── 📄 navigation.ts
│   │
│   └── tests/
│       ├── 📄 setup.ts
│       ├── unit/
│       ├── integration/
│       └── __mocks__/
│           └── 📄 fileMock.ts
│
├── design/
│   ├── Figma/
│   │   ├── 📄 00_DesignSystem.fig
│   │   ├── 📄 01_UI-Kit.fig
│   │   ├── 📄 02_Wireframes.fig
│   │   ├── 📄 03_HighFidelity.fig
│   │   ├── 📄 04_Prototype.fig
│   │   └── 📄 05_DevHandoff.fig
│   └── exports/
│       ├── tokens/
│       │   ├── 📄 colors.json
│       │   ├── 📄 typography.json
│       │   ├── 📄 spacing.json
│       │   └── 📄 shadows.json
│       └── 📄 css-variables.css
│
├── docs/
│   ├── handoff/
│   │   ├── 📄 css-variables.md
│   │   ├── 📄 component-specs.md
│   │   ├── 📄 html-snippets.md
│   │   └── 📄 json-schemas.md
│   ├── architecture/
│   │   └── 📄 overview.md
│   └── 📄 seo-strategy.md
│
└── e2e/
    ├── 📄 playwright.config.ts
    └── specs/
        ├── 📄 navigation.spec.ts
        ├── 📄 contact-form.spec.ts
        └── 📄 project-filtering.spec.ts
```

---

## Root-Level Configuration Files

### `.gitignore`
**Purpose:** Tells Git which files and folders to exclude from version control.
**Contains:** Entries for `node_modules/`, `dist/`, `.env`, build artifacts, OS files (`.DS_Store`), and editor directories (`.vscode/`, `.idea/`).
**Why necessary:** Prevents sensitive data, generated files, and developer-specific configs from being committed. Essential for every project.

---

### `.env` / `.env.example`
**Purpose:** Stores environment-specific variables that change between development, staging, and production.
**Contains:** API base URLs, feature flags, analytics IDs, and contact form endpoint URLs. `.env.example` is a safe, committed template with placeholder values.
**Why necessary:** Separates configuration from code. Prevents secrets from being hardcoded. `.env.example` documents all required variables for onboarding new developers without exposing real values.

---

### `.eslintrc.cjs`
**Purpose:** Configures ESLint — the static analysis tool that enforces code quality rules.
**Contains:** TypeScript-aware lint rules (`@typescript-eslint`), React-specific rules (`react-hooks`, `react-refresh`), import ordering rules, and accessibility rules (`jsx-a11y`). Uses the `.cjs` extension because Vite projects use ES modules by default, and ESLint config must run in CommonJS.
**Why necessary:** Catches bugs before runtime — unused variables, missing dependencies in hooks, accessibility violations, and inconsistent imports. Enforces team-wide consistency automatically.

---

### `.prettierrc`
**Purpose:** Configures Prettier — the opinionated code formatter.
**Contains:** Rules for print width, tab width, semicolons, single vs. double quotes, and trailing commas. Aligned with the ESLint config to avoid conflicts.
**Why necessary:** Eliminates all formatting debates. Every contributor's code looks identical after saving, making diffs cleaner and code reviews faster.

---

### `package.json`
**Purpose:** The project manifest and dependency registry.
**Contains:** Project metadata, all `dependencies` and `devDependencies`, and `scripts` for `dev`, `build`, `preview`, `lint`, `test`, `test:coverage`, and `type-check`.
**Why necessary:** The authoritative source of truth for what the project needs to run and how to run it. The `scripts` section is the team's shared CLI vocabulary.

---

### `tsconfig.json`
**Purpose:** The root TypeScript configuration — acts as the coordinator for the multi-file TS setup Vite generates.
**Contains:** References to `tsconfig.app.json` and `tsconfig.node.json`. Contains no compiler options of its own. This is the entry point TypeScript uses for project-wide type checking.
**Why necessary:** Vite requires a split TypeScript configuration so that browser code (React app) and Node.js code (Vite config) are compiled with different settings. This root file ties them together for IDEs and the `tsc` CLI.

---

### `tsconfig.app.json`
**Purpose:** TypeScript compiler options specifically for the React application source code in `src/`.
**Contains:** `"target": "ES2020"`, `"lib": ["ES2020", "DOM", "DOM.Iterable"]`, `"jsx": "react-jsx"`, `"strict": true`, `"noUnusedLocals": true`, `"moduleResolution": "bundler"`, path alias configuration (e.g., `"@/*": ["src/*"]`), and `"include": ["src"]`.
**Why necessary:** Strict mode and DOM typings are needed for the browser-facing application. The path alias (`@/`) enables clean absolute imports like `import { Button } from '@/components/ui/Button'` instead of fragile relative paths like `../../../components`.

---

### `tsconfig.node.json`
**Purpose:** TypeScript compiler options for Node.js-environment files — specifically `vite.config.ts` and `vitest.config.ts`.
**Contains:** `"target": "ESNext"`, `"module": "ESNext"`, `"moduleResolution": "bundler"`, and `"include": ["vite.config.ts", "vitest.config.ts"]`.
**Why necessary:** The Vite config runs in Node.js, not the browser. It needs different module resolution and target settings than the app source code. Separating these prevents type errors from mixing browser and Node.js globals.

---

### `vite.config.ts`
**Purpose:** Configures Vite — the build tool and development server.
**Contains:** The `@vitejs/plugin-react` plugin, path alias resolution (`@/ → src/`), build output options, asset handling rules, and base URL configuration for deployment.
**Why necessary:** Without this, Vite uses defaults that may not support path aliases, custom output directories, or optimized chunking strategies. This file is where you configure code-splitting, preloading, and any additional plugins.

---

### `vitest.config.ts`
**Purpose:** Configures Vitest — the unit and integration test runner.
**Contains:** `globals: true` (so `describe`, `it`, `expect` don't need manual imports), `environment: 'jsdom'` (simulates a browser DOM in Node.js), `setupFiles: ['src/tests/setup.ts']`, and coverage settings pointing to the `v8` provider.
**Why necessary:** Vitest needs to know to simulate a browser environment when testing React components. The setup file pre-imports `@testing-library/jest-dom` matchers globally, so assertions like `expect(el).toBeInTheDocument()` work in every test file without repetitive imports.

---

## `public/` — Static Assets

### `index.html`
**Purpose:** The single HTML shell that Vite injects the React bundle into.
**Contains:** The root `<div id="root">` mount point, `<meta>` tags for charset and viewport, the Open Graph and Twitter card `<meta>` tags for social sharing previews, and a `<link rel="manifest">` for PWA support.
**Why necessary:** This is the literal entry point of the application in the browser. Everything React renders gets injected here. SEO and social sharing metadata must live here.

### `favicon.ico` / `manifest.json`
**Purpose:** Browser tab icon and PWA configuration.
**Contains:** `favicon.ico` is the 32×32 pixel site icon. `manifest.json` defines the app name, icons, theme color, and display mode for when users "add to home screen" on mobile.
**Why necessary:** The favicon provides visual identity in browser tabs and bookmarks. The manifest is required for the Lighthouse PWA audit and enables mobile app-like installation.

### `robots.txt`
**Purpose:** Instructs search engine crawlers which pages they are allowed or forbidden to index.
**Contains:** `User-agent: *` rules and `Sitemap:` pointer. For this portfolio, all pages should be indexable.
**Why necessary:** Controls discoverability. Without it, search engines make their own assumptions about what to crawl. Critical for SEO strategy.

---

## `src/` — Application Source Code

### `main.tsx`
**Purpose:** The application bootstrap — the very first TypeScript file that runs.
**Contains:** The `ReactDOM.createRoot()` call that mounts `<App />` into `#root`, wrapped in `<React.StrictMode>` for development warnings, and the global CSS import (`styles/globals.css`). Also contains the `BrowserRouter` from React Router if not placed in `App.tsx`.
**Why necessary:** React requires an explicit render call to start. This file is the bridge between the static HTML shell and the dynamic React component tree. Strict mode catches subtle bugs during development.

### `App.tsx`
**Purpose:** The root React component — defines the application's routing architecture.
**Contains:** All `<Route>` definitions using React Router v6's `<Routes>` and `<Route>` components, the global `<Layout>` wrapper that persists the header and footer across pages, lazy-loaded page imports (`React.lazy()` + `<Suspense>`), and any global context providers (theme, analytics).
**Why necessary:** Central routing configuration means all URL-to-page mappings live in one place. Lazy loading ensures the initial bundle is small — pages only load when navigated to, meeting the Lighthouse performance targets.

### `vite-env.d.ts`
**Purpose:** TypeScript type declarations for Vite-specific features.
**Contains:** The `/// <reference types="vite/client" />` triple-slash directive, which adds types for `import.meta.env` variables, SVG imports, and other Vite-specific client APIs.
**Why necessary:** Without this, TypeScript will throw errors when you access `import.meta.env.VITE_API_URL` or import an SVG as a React component. It's generated automatically by Vite and should never be deleted.

---

## `src/assets/` — Static Resources

### `fonts/Inter/` and `fonts/JetBrainsMono/`
**Purpose:** Self-hosted font files for the design system's two typefaces.
**Contains:** `.woff2` files for each weight and style needed (Inter for UI text, JetBrains Mono for code and numeric data). Loaded via `@font-face` declarations in `styles/globals.css` with `font-display: swap`.
**Why necessary:** Self-hosting fonts eliminates the third-party DNS lookup to Google Fonts, improving FCP (First Contentful Paint). `font-display: swap` prevents invisible text during load — a direct Lighthouse and CLS optimization.

### `images/projects/`, `images/og/`, `images/backgrounds/`
**Purpose:** Organized static image assets grouped by their role in the UI.
**Contains:** Project screenshots and diagrams go in `projects/`, Open Graph social preview images go in `og/` (1200×630px per project), and decorative textures or hero backgrounds go in `backgrounds/`.
**Why necessary:** Separation by purpose makes it clear which images are UI-critical vs. decorative vs. external-facing. `og/` images directly affect how the portfolio links appear when shared on LinkedIn, Twitter, or Slack.

### `icons/social/` and `icons/ui/`
**Purpose:** SVG icon sets for social links and UI controls.
**Contains:** Individual optimized SVG files (GitHub, LinkedIn, email) in `social/`, and UI icons (hamburger menu, chevron, external link, search) in `ui/`. Each SVG is imported as a React component via Vite's SVG plugin.
**Why necessary:** SVG icons are infinitely scalable, resolution-independent, and can be styled with CSS. Separating social and UI icons prevents confusion and makes it easy to add or swap icons without hunting through a flat directory.

---

## `src/components/` — Reusable UI Building Blocks

The component layer is split into two sub-layers: **`ui/`** (stateless, design-system primitives) and **`layout/`** (structural wrappers). This directly mirrors the bulletproof-react architecture pattern and prevents layout concerns from leaking into reusable atoms.

### Component Folder Convention
Every component lives in its own folder with a consistent set of files. This pattern scales from 5 to 500 components without confusion.

---

### `components/ui/Button/`

**`Button.tsx`**
**Purpose:** The primary interactive element of the design system.
**Contains:** A typed functional component accepting `variant` (`primary` | `secondary` | `accent`), `size`, `disabled`, `isLoading`, `onClick`, and all standard HTML button attributes via `React.ButtonHTMLAttributes<HTMLButtonElement>`. Renders the correct CSS module class based on the variant prop.
**Why necessary:** A single, typed Button component prevents five different developers from writing five different button implementations. TypeScript enforces valid `variant` values at the call site — passing an invalid string is a compile error, not a runtime bug.

**`Button.module.css`**
**Purpose:** Scoped styles for all button variants and states.
**Contains:** CSS class definitions for `.primary`, `.secondary`, `.accent`, `.loading`, and `:focus-visible` states. Uses CSS custom properties from `tokens.css` for colors, so a single token change updates all buttons simultaneously.
**Why necessary:** CSS Modules generate unique class names at build time, ensuring Button styles never accidentally bleed into other components — even if class names are identical. This is the project's stated constraint (no CSS-in-JS).

**`Button.types.ts`**
**Purpose:** Isolated TypeScript interfaces and type aliases for the Button component.
**Contains:** `ButtonVariant` union type, `ButtonSize` union type, and `ButtonProps` interface extending `React.ButtonHTMLAttributes`. Exporting these separately allows other components (like `ProjectCard`) to reference the `ButtonVariant` type without importing the component itself.
**Why necessary:** Separating types from implementation follows the Interface Segregation principle. It prevents circular import issues and makes the types tree-shakeable for large projects.

**`Button.test.tsx`**
**Purpose:** Unit tests verifying the Button behaves correctly in isolation.
**Contains:** Tests confirming it renders the correct text, fires `onClick` when clicked, renders in disabled state correctly, shows a loading indicator when `isLoading` is true, and applies the correct ARIA attributes.
**Why necessary:** Components are the most-reused code in the project. A regression in `Button` could silently break every page. Tests catch this immediately.

**`index.ts`**
**Purpose:** The component's public API — a clean re-export barrel.
**Contains:** `export { Button } from './Button'; export type { ButtonProps, ButtonVariant } from './Button.types';`
**Why necessary:** External consumers import from `@/components/ui/Button` (the folder), not `@/components/ui/Button/Button`. This keeps import paths short and allows internal refactoring (renaming the file) without updating every consumer.

---

### `components/ui/ProjectCard/`

**`ProjectCard.tsx`**
**Purpose:** The most critical UI component — the primary way projects are presented.
**Contains:** A typed component accepting a `ProjectCardProps` interface. Renders in two layouts based on a `variant` prop (`compact` for the archive, `detailed` for the portfolio). Uses CSS Grid for the title/summary/badges/metrics/actions layout. Numbers (metrics) use the `JetBrains Mono` font class from tokens. Hover state reveals ghost action buttons (View Demo, GitHub, Case Study).
**Why necessary:** Projects are the portfolio's core content. This component will be rendered dozens of times across multiple pages. A single, well-tested implementation prevents visual inconsistencies.

**`ProjectCard.variants.ts`**
**Purpose:** Defines the layout and style differences between `compact` and `detailed` variants as typed configuration objects.
**Contains:** A `CARD_VARIANTS` constant mapping `'compact' | 'detailed'` to their respective CSS class names, grid column spans, and which sections to render (e.g., detailed shows full metrics, compact shows truncated).
**Why necessary:** Moving variant logic out of JSX into a typed data structure keeps the component template clean and makes adding new variants (e.g., `'featured'`) a data change, not a structural JSX change.

**`ProjectCard.types.ts`**
**Purpose:** TypeScript interfaces matching the project data schema from the handoff specifications.
**Contains:** `ProjectMetric` interface (`{ icon: string; value: number; label: string }`), `ProjectBadge` type, `ProjectLinks` interface, and the full `ProjectCardProps` interface combining all of these. This directly matches the `handoffSpecifications.dataSchema.project` object from the design brief.
**Why necessary:** The design brief defines a precise data shape. Encoding it as TypeScript interfaces means any data that doesn't conform to the schema is caught at compile time — before it reaches the UI.

---

### `components/ui/DataTable/`

**`DataTable.tsx`**
**Purpose:** A generic, typed table component for displaying structured data (resume history, skill matrices).
**Contains:** Generic TypeScript `DataTable<T>` component accepting a `columns` definition array and a `data` array of type `T`. Renders alternating row backgrounds (`#141A26` / `#1E2633`), a blue header row, and applies `JetBrains Mono` font to numeric cells. Supports `sortable` columns.
**Why necessary:** The resume page needs to display professional history with metrics. A reusable, typed table component prevents ad hoc table markup from proliferating across pages.

**`TableHeader.tsx`** / **`TableRow.tsx`**
**Purpose:** Sub-components for the header and body rows of the DataTable, extracted to keep `DataTable.tsx` readable.
**Contains:** `TableHeader` renders the `<thead>` with sort indicators; `TableRow` renders a single `<tr>` with appropriate cell formatting based on the column type definition.
**Why necessary:** Splitting a complex component into logical sub-components keeps each file under 150 lines and makes individual row/header behavior independently testable.

---

### `components/ui/FilterBar/`

**`FilterBar.tsx`**
**Purpose:** The category filter component used on Portfolio, Projects, Blog, Tools, and Documentation pages.
**Contains:** A typed component accepting `filters: string[]`, `activeFilter: string`, and `onFilterChange: (filter: string) => void`. Renders filter buttons styled as pill badges. Manages accessible keyboard navigation between filters.
**Why necessary:** Filter functionality is needed on five different pages. A shared, typed component means filter behavior (keyboard nav, active state styling, ARIA roles) is implemented once and applied everywhere consistently.

---

### `components/layout/`

**`Layout.tsx`**
**Purpose:** The persistent application shell that wraps every page.
**Contains:** `<Header />`, a `<main>` element, `{children}`, and `<Footer />`. Accepts a `meta` prop for per-page SEO metadata that gets injected into `<head>` via a `Helmet`-style component.
**Why necessary:** Centralizing the layout prevents the header and footer from being independently instantiated on every page. Changing the navigation structure requires editing one file.

**`PageWrapper.tsx`**
**Purpose:** An inner wrapper for page content that enforces the 12-column grid and max-width constraints.
**Contains:** A `<div>` with CSS classes implementing the 1280px max-width, 24px gutters, and 12-column grid system from the design spec. Accepts a `narrow` boolean prop for documentation and blog post layouts.
**Why necessary:** Without a shared page wrapper, each page independently sets padding and max-width, leading to inconsistencies. Centralizing grid constraints is a maintainability necessity.

**`SectionContainer.tsx`**
**Purpose:** Wraps individual page sections with consistent vertical rhythm.
**Contains:** A `<section>` element with an `id` prop (for anchor linking), `aria-labelledby` support, and top/bottom padding using the 8px spacing scale.
**Why necessary:** Consistent section spacing is a core part of the design system. It also provides accessible landmarks for screen readers.

---

## `src/pages/` — Route-Level Components

Each page folder maps 1:1 to a URL route. Pages are "smart" — they fetch/select data and compose UI from `components/`. They are not reusable across routes and should not be imported by other components.

### `Home/sections/`
**Purpose:** The Home page is the most complex in the portfolio. Its six sections are extracted into individual files to keep `Home.tsx` readable and allow each section to be independently maintained.
**Contains:** `HeroSection.tsx` (headline + CTA), `ManifestoSection.tsx` (philosophy paragraph), `FeaturedProjectsSection.tsx` (3-card grid), `StackSnapshotSection.tsx` (skills tag cloud), `LatestLabSection.tsx` (recent blog + docs cards), `ContactCTASection.tsx` (contact prompt).
**Why necessary:** A single `Home.tsx` with all six sections would exceed 500 lines. Splitting into section sub-components makes each independently readable, testable, and editable without scrolling through unrelated code.

### `ProjectDetail/`
**`ProjectDetail.tsx`**
**Purpose:** The full case study view for a single project, accessed at `/projects/:slug`.
**Contains:** Uses `useParams()` from React Router to extract the project `slug`, looks up the matching project from the data layer, and renders all sections: Problem, Architecture, Implementation (with code snippets), Results (metrics table), Key Learnings, and action links. Uses `SectionContainer` and `DataTable`.
**Why necessary:** Each project has unique content requiring a dedicated view. This template ensures all case studies have consistent structure and accessible headings.

---

## `src/styles/` — Global Style System

### `globals.css`
**Purpose:** Foundational CSS reset and base element styles applied to the entire document.
**Contains:** CSS reset rules, `@font-face` declarations for Inter and JetBrains Mono with `font-display: swap`, base `html` and `body` styles (background color, font family, line height), and the `@media (prefers-reduced-motion: reduce)` accessibility block that disables all transitions and animations for users who prefer it.
**Why necessary:** Without a reset, browsers apply their own default styles that vary across Chrome, Firefox, and Safari, causing visual inconsistencies. The reduced-motion media query is required for WCAG AA compliance.

### `variables.css`
**Purpose:** CSS custom properties for all design system values.
**Contains:** All color tokens (`--color-primary-deep: #0D33A6`, `--color-accent-gold: #D9AE89`, etc.), spacing values, border radius values, and shadow values — directly mirroring the `designSystem.tokens` object from the design brief.
**Why necessary:** Design tokens defined as CSS variables allow a single source of truth for all visual values. Changing `--color-accent-gold` updates every gold element site-wide instantly.

### `tokens.css`
**Purpose:** Higher-level semantic design tokens that reference the raw values in `variables.css`.
**Contains:** Semantic aliases like `--color-interactive: var(--color-primary-deep)`, `--color-text-emphasis: var(--color-accent-gold)`, `--font-numeric: var(--font-family-code)`. These communicate *intent* rather than raw values.
**Why necessary:** Semantic tokens make the system more adaptable. If you want to change which color is used for interactive elements, you update one semantic token rather than finding every instance of the raw hex value across dozens of CSS files.

### `animations.css`
**Purpose:** Reusable keyframe animations and transition utility classes.
**Contains:** `@keyframes` for `fadeInUp`, `slideInLeft`, and `pulseGold`. Utility classes like `.animate-fade-in`, `.animate-slide-up` that can be applied to any element. All animations reference `var(--motion-duration-normal)` and `var(--motion-easing-default)` from `variables.css`.
**Why necessary:** Centralizing animations prevents duplicated keyframe definitions across component CSS files and ensures all motion uses the same timing tokens for visual consistency.

### `themes/dark.css`
**Purpose:** The dark theme — the portfolio's primary and only theme.
**Contains:** A `:root` block overriding `variables.css` values for the dark aesthetic. Background colors (`#141A26`), surface colors (`#3B4859`), and elevated surfaces (`#1E2633`).
**Why necessary:** Even if only one theme is used today, establishing a theme file structure makes adding a light theme (or high-contrast accessibility theme) a matter of creating a new file, not refactoring dozens of component styles.

---

## `src/types/` — TypeScript Type Definitions

This directory is the single source of truth for all shared TypeScript interfaces and types across the application. Keeping types here (rather than co-located in components) allows them to be shared between the data layer, components, and pages without creating circular dependencies.

### `project.types.ts`
**Purpose:** All TypeScript interfaces related to projects — the portfolio's core data model.
**Contains:** `ProjectMetric`, `ProjectLinks`, `ProjectBadge`, `ProjectStatus` enum (`Active | Archived | Experimental`), `ProjectCategory` enum (`AIEngineering | WebApps | Automation | Strategy`), and the primary `Project` interface. This mirrors the `handoffSpecifications.dataSchema.project` object exactly.
**Why necessary:** The `Project` interface is referenced in `data/projects.ts`, `ProjectCard.tsx`, `ProjectDetail.tsx`, `Portfolio.tsx`, and `Projects.tsx`. A single definition in `types/` means a change to the schema only needs to be made in one place.

### `common.types.ts`
**Purpose:** Utility types reused across the entire application.
**Contains:** `FilterOption`, `NavigationItem` (for typed nav config), `SEOMeta`, `Breakpoint`, and generic utility types like `WithChildren` (`{ children: React.ReactNode }`).
**Why necessary:** Common types prevent duplication. If `FilterOption` is used in `FilterBar`, `Portfolio`, `Projects`, `Blog`, `Tools`, and `Documentation`, it must be defined once.

### `index.ts`
**Purpose:** Barrel export for all types.
**Contains:** Re-exports from all type files: `export * from './project.types'`, `export * from './blog.types'`, etc.
**Why necessary:** Consumers can import all types from `@/types` with a single import rather than from six different individual files.

---

## `src/data/` — Application Data Layer

### `projects.ts` (converted from `.json`)
**Purpose:** The typed data store for all portfolio projects.
**Contains:** A `const projects: Project[]` array with all project objects, typed using the `Project` interface from `@/types`. Converted from `.json` to `.ts` to allow inline TypeScript typing and enable auto-completion when authoring project entries.
**Why necessary:** Typed data means the TypeScript compiler verifies every project object has all required fields. A missing `title` or incorrectly typed `status` is caught at compile time, not when the page renders in production.

### `schemas/project.schema.ts`
**Purpose:** Runtime validation schemas for data integrity.
**Contains:** Zod (or similar) validation schemas that mirror the TypeScript interfaces. Used to validate data at the boundary if the project ever migrates to a CMS or API.
**Why necessary:** TypeScript types only exist at compile time. Schemas provide runtime guarantees that incoming data from an external source has the expected shape before it reaches the UI.

---

## `src/services/` — External Integration Layer

### `contact.service.ts`
**Purpose:** Handles the Contact form submission logic, decoupled from the UI.
**Contains:** An async `submitContactForm(data: ContactFormData): Promise<ContactResponse>` function that posts to the form endpoint. Contains error handling, retry logic, and response parsing. The UI component simply calls this function and reacts to the result.
**Why necessary:** Mixing API call logic directly into the `Contact.tsx` component makes it harder to test (you'd need to mock `fetch` inside the component) and harder to swap the backend. The service layer is a testable, replaceable unit.

### `analytics.service.ts`
**Purpose:** Wraps any analytics event tracking (page views, CTA clicks) in a typed, testable interface.
**Contains:** Functions like `trackPageView(page: string)` and `trackCTAClick(label: string, destination: string)`. Internally calls the analytics SDK but exposes a clean, domain-specific API to the rest of the app.
**Why necessary:** If you later switch analytics providers (from GA4 to Plausible, for example), you update only this file — not every component that fires events.

---

## `src/hooks/` — Custom React Hooks

### `useTheme.ts`
**Purpose:** Manages theme state and applies the correct theme class to the document root.
**Contains:** A hook returning `{ theme, toggleTheme }`. Reads from `localStorage` for persistence. Applies `data-theme="dark"` to `<html>` to activate the appropriate CSS variable overrides.
**Why necessary:** Theme logic (reading storage, applying DOM attributes) should not live in a component. Extracting it to a hook makes it reusable and independently testable.

### `useScrollPosition.ts`
**Purpose:** Tracks the user's scroll position to trigger the sticky header's shadow and the scroll-to-top button.
**Contains:** Uses `useState` and `useEffect` with a passive `scroll` event listener. Returns `{ scrollY, isScrolled }`. Throttles updates for performance.
**Why necessary:** Multiple components need scroll data (the header, back-to-top button). A shared hook avoids attaching multiple independent scroll listeners to `window`.

### `useFilteredProjects.ts`
**Purpose:** Encapsulates the logic for filtering and sorting the projects array.
**Contains:** Accepts `projects: Project[]`, `activeFilter: string`, and `activeYear?: number`. Returns the filtered and sorted `Project[]`. All filtering logic is in this hook, not in the Portfolio or Projects components.
**Why necessary:** Filter logic is reused on two pages (Portfolio and Projects). A hook eliminates code duplication and is trivially unit-testable with plain data — no React component rendering required.

### `useReducedMotion.ts`
**Purpose:** Detects the `prefers-reduced-motion` accessibility preference.
**Contains:** Uses `window.matchMedia('(prefers-reduced-motion: reduce)')` and returns a `boolean`. Updates reactively if the user changes their OS preference while the page is open.
**Why necessary:** WCAG AA compliance requires respecting the reduced-motion preference. Components that trigger animations check this hook and skip them if `true`.

---

## `src/utils/` — Pure Utility Functions

### `formatNumber.ts`
**Purpose:** Formats numeric values for display in KPI metrics and project cards.
**Contains:** Functions like `formatMetric(value: number, unit?: string): string` that handles thousands separators, percentage formatting, and abbreviated large numbers (e.g., `1200` → `1.2K`). Uses the `JetBrains Mono` font class is applied via the component, not here.
**Why necessary:** Numeric formatting logic appears in `HeroKPIStrip`, `ProjectCard`, `Resume`, and `DataTable`. A shared utility ensures `95%` always looks the same everywhere.

### `cn.ts`
**Purpose:** A utility for conditionally joining CSS class names.
**Contains:** A typed `cn(...classes: (string | undefined | false | null)[])` function that filters falsy values and joins the rest with spaces. Commonly called `clsx` or `classnames` in the ecosystem.
**Why necessary:** Conditionally applying CSS module classes in JSX requires combining static and dynamic class names. This utility replaces verbose template literal concatenation with readable, type-safe calls.

### `constants.ts`
**Purpose:** Application-wide string constants and configuration values.
**Contains:** `SITE_NAME`, `SITE_URL`, `OWNER_NAME`, navigation label strings, breakpoint pixel values as numbers (for use in JS, complementing the CSS variables), and filter category arrays.
**Why necessary:** Magic strings scattered throughout the codebase are hard to find and easy to get wrong. Centralizing constants makes global changes (like a site rename) a single-file edit.

---

## `src/config/` — Application Configuration

### `routes.ts`
**Purpose:** A typed map of all application routes.
**Contains:** A `ROUTES` constant object: `{ HOME: '/', PORTFOLIO: '/portfolio', PROJECT_DETAIL: '/projects/:slug', BLOG: '/blog', ... }`. All `<Link to={...}>` and `useNavigate()` calls in the app reference `ROUTES.PORTFOLIO` instead of the string `'/portfolio'`.
**Why necessary:** Hardcoded route strings scattered across components create a refactoring nightmare. If `/portfolio` becomes `/work`, you change one constant, not twenty `<Link>` elements.

### `navigation.ts`
**Purpose:** The typed configuration object for the navigation structure.
**Contains:** The `NavItem[]` array defining labels, URLs, and dropdown children — mirroring the `components.navigation.desktop.items` structure from the design brief. Typed using the `NavigationItem` interface from `@/types`.
**Why necessary:** `DesktopNav.tsx` and `MobileNav.tsx` both render from this single configuration. Changing the navigation means editing the config, and both nav variants update automatically.

### `seo.ts`
**Purpose:** Default and page-specific SEO metadata.
**Contains:** A `DEFAULT_SEO` object with the site title, description, and default Open Graph image. A `PAGE_SEO` map from route to per-page metadata objects (`{ title, description, ogImage }`).
**Why necessary:** SEO metadata must be consistent and carefully managed. A config file prevents scattered, mismatched `<title>` and `<meta>` tags across page components.

---

## `src/tests/` — Test Infrastructure

### `setup.ts`
**Purpose:** The global test setup file run by Vitest before every test suite.
**Contains:** `import '@testing-library/jest-dom'` (adds custom DOM matchers globally), any global mock setup (e.g., mocking `window.matchMedia` for tests that use `useReducedMotion`), and cleanup calls.
**Why necessary:** Without this file, every test file would need to import `@testing-library/jest-dom` individually. The setup file is the "global beforeAll" for the entire test suite.

### `__mocks__/fileMock.ts`
**Purpose:** Mocks static asset imports (images, SVGs) in the test environment.
**Contains:** A default export of `'test-file-stub'` for image files, and a React component stub for SVG imports. Configured in `vitest.config.ts` via the `moduleNameMapper` option.
**Why necessary:** Vitest runs in Node.js, which cannot process binary image files or SVGs natively. Without mocks, any component that imports an image will throw an error during testing.

---

## `design/` — Design Source Files

### `design/Figma/`
**Purpose:** Houses the six Figma design files representing the complete design workflow.
**Contains:** Binary `.fig` files that are committed to the repository for version history. Named with numeric prefixes (`00_` through `05_`) to indicate the workflow order: DesignSystem → UI-Kit → Wireframes → HighFidelity → Prototype → DevHandoff.
**Why necessary:** Storing Figma files in the repo alongside code creates a unified project history. Designers and developers work from the same repository, preventing the "which version is current?" problem.

### `design/exports/tokens/`
**Purpose:** JSON exports of design tokens from Figma, ready to consume programmatically.
**Contains:** `colors.json`, `typography.json`, `spacing.json`, `shadows.json` — exported via the Figma Tokens plugin. These are the authoritative source for `src/styles/variables.css`.
**Why necessary:** Token JSON files can be processed by a build script to auto-generate `variables.css`, keeping the CSS and Figma design system in sync. Prevents manual copy-paste errors.

---

## `docs/` — Project Documentation

### `docs/handoff/css-variables.md`
**Purpose:** Human-readable documentation of every CSS custom property in the design system.
**Contains:** A table listing each variable name, its value, and where it's used. Intended for developers joining the project.
**Why necessary:** New developers should not need to read `variables.css` and `tokens.css` simultaneously to understand the token system. A single reference document accelerates onboarding.

### `docs/architecture/overview.md`
**Purpose:** High-level explanation of architectural decisions.
**Contains:** Explanations of why CSS Modules was chosen over CSS-in-JS, why the data layer uses typed `.ts` files instead of `.json`, the reasoning behind the `types/` directory structure, and the unidirectional data flow principle (data → pages → components).
**Why necessary:** Code explains *what* is done. Architecture docs explain *why*. Without them, the next developer may "simplify" the structure and unknowingly break the architectural principles.

---

## `e2e/` — End-to-End Tests

### `playwright.config.ts`
**Purpose:** Configures Playwright for end-to-end browser testing.
**Contains:** Target browsers (Chromium, Firefox, WebKit), base URL (`http://localhost:5173`), screenshot/video settings for CI failures, and viewport configurations matching the three design breakpoints.
**Why necessary:** Unit tests verify components in isolation; E2E tests verify the full user experience in a real browser. The contact form, project filtering, and navigation dropdowns all require E2E verification.

### `specs/navigation.spec.ts`
**Purpose:** Tests that all navigation links work and render the correct pages.
**Contains:** Tests for desktop dropdown menus, mobile hamburger menu opening/closing, keyboard navigation through the nav, and active state highlighting on the current route.
**Why necessary:** Navigation is the most-used feature of any multi-page site. A regression that breaks the nav is visible to every visitor. Automated E2E tests catch this before deployment.

### `specs/project-filtering.spec.ts`
**Purpose:** Tests the filter functionality on the Portfolio and Projects pages.
**Contains:** Tests confirming that clicking a filter shows only the correct subset of projects, that the "All" filter restores the full list, and that filter state updates the URL query parameter.
**Why necessary:** Filtering is interactive logic that spans the `FilterBar` component, `useFilteredProjects` hook, and page-level state. Only an E2E test can verify the complete integration.

---

## Architecture Principles Summary

| Principle | Implementation |
|---|---|
| **Unidirectional data flow** | `types/` → `data/` → `pages/` → `components/` — shared code flows downward only |
| **Single source of truth** | Design tokens in `variables.css`, routes in `config/routes.ts`, nav in `config/navigation.ts` |
| **Co-located concerns** | Each component owns its styles, types, and tests in its own folder |
| **No magic strings** | All routes, filter labels, and constants live in `src/config/` and `src/utils/constants.ts` |
| **Type safety at every boundary** | Data, props, hooks, services, and route params are all fully typed |
| **Accessibility by architecture** | `useReducedMotion`, ARIA props in component interfaces, semantic landmark components in layout |
| **Performance by default** | Lazy-loaded pages in `App.tsx`, self-hosted fonts with `font-display: swap`, passive scroll listeners |
