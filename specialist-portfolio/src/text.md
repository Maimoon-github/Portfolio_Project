## File Descriptions for `src` Directory

Below is a detailed breakdown of every file in the `src` tree, explaining its role and listing the necessary elements required for its implementation. This serves as a reference for developers to understand the purpose and dependencies of each file.

---

### `src/` (Root)

#### `App.tsx`
- **Role**: Root component that sets up routing, global providers, and layout.
- **Key requirements**:
  - Import `BrowserRouter` (or equivalent) and route configuration from `config/routes.ts`.
  - Wrap routes with `Layout` component.
  - Apply global styles (`index.css`).
  - Optionally include analytics provider or theme context.

#### `main.tsx`
- **Role**: Entry point that renders the React app into the DOM.
- **Key requirements**:
  - Import React, ReactDOM, and `App`.
  - Call `ReactDOM.createRoot().render()` with `<App />`.
  - Wrap with `<React.StrictMode>` in development.

#### `App.css`
- **Role**: Global app-level styles (optional; may be empty if all styles are modular).
- **Key requirements**:
  - If used, contain minimal overrides (e.g., print styles). Prefer using `styles/` files.

#### `index.css`
- **Role**: Entry CSS file imported in `main.tsx` that aggregates all global styles.
- **Key requirements**:
  - Import `styles/tokens.css`, `styles/typography.css`, `styles/globals.css`, `styles/animations.css`.
  - May include a basic reset (e.g., `box-sizing: border-box`).

#### `vite-env.d.ts`
- **Role**: TypeScript declarations for Vite‑specific features (e.g., asset imports).
- **Key requirements**:
  - Include `/// <reference types="vite/client" />`.
  - Declare modules for `*.svg`, `*.png`, etc.

---

### `assets/`

#### `assets/fonts/Inter/` & `assets/fonts/JetBrainsMono/`
- **Role**: Contain the actual font files (WOFF2, WOFF) for Inter and JetBrains Mono.
- **Key requirements**:
  - Font files placed here; referenced in `styles/typography.css` via `@font-face`.
  - Ensure proper licensing.

#### `assets/icons/social/` & `assets/icons/ui/`
- **Role**: Store SVG icons (social media icons, UI icons like menu, close).
- **Key requirements**:
  - Optimized SVGs, named semantically.
  - Imported into React components as React components or `<img>`.

#### `assets/images/og/` & `assets/images/projects/`
- **Role**: Store Open Graph images (for social sharing) and project screenshots.
- **Key requirements**:
  - Use modern formats (WebP) with fallbacks.
  - Optimized for web.

#### `assets/react.svg`
- **Role**: Placeholder/example asset (can be removed if not used).
- **Key requirements**:
  - If kept, ensure it’s optimized.

---

### `components/layout/`

#### `Header.tsx`
- **Role**: Global site header with logo and primary navigation.
- **Key requirements**:
  - Import `Navigation` from `components/ui/Navigation`.
  - Use `useScrollPosition` hook to apply sticky style changes.
  - Apply background `Midnight Shale` (`#141A26`) and bottom border `Lapis Deep` (`#0D33A6`).
  - Responsive: include mobile menu toggle.

#### `Layout.tsx`
- **Role**: Wrapper component that renders `<Header />`, `<main>` with children, and `<Footer />`.
- **Key requirements**:
  - Accept `children` prop.
  - Apply global layout styles via `layout.module.css` (max‑width, padding, etc.).

#### `PageWrapper.tsx`
- **Role**: Per‑page wrapper for metadata, title updates, and entry animations.
- **Key requirements**:
  - Props: `title`, `description`, `children`.
  - Use `useEffect` to set document title.
  - Inject meta tags (or use react‑helmet‑async).
  - Apply fade‑in animation from `animations.css`.

#### `SectionContainer.tsx`
- **Role**: Container for page sections enforcing consistent max‑width, padding, and optional background.
- **Key requirements**:
  - Props: `background?`, `fullWidth?`, `children`.
  - Default max‑width: `1280px`, centered, with responsive gutters.
  - Use CSS variables from `tokens.css`.

#### `layout.module.css`
- **Role**: Scoped styles for layout components (Header, Layout, etc.).
- **Key requirements**:
  - Define sticky header styles, main content area, footer layout.
  - Use tokens (colors, spacing) from `tokens.css`.

---

### `components/ui/` (Atomic UI Components)

Each UI component folder should contain:
- `ComponentName.tsx` – the component logic.
- `ComponentName.module.css` – scoped styles.
- `ComponentName.types.ts` – TypeScript props interface.
- `index.ts` – barrel export.

#### `Badge/`
- **Role**: Small status indicator (e.g., “New”, category tags).
- **Key requirements**:
  - Variants: `default` (Slate Blue background), `accent` (Gold Fleck background with dark text).
  - Use `Inter` 600, uppercase or small caps, padding `4px 8px`, border‑radius `4px`.

#### `Button/`
- **Role**: Interactive button with multiple variants.
- **Key requirements**:
  - Variants: `primary` (Lapis Deep → Lapis Medium hover), `secondary` (outline), `accent` (Gold Fleck), `text`.
  - Sizes: `sm`, `md`, `lg` (based on 8px grid).
  - Include `Button.test.tsx` for basic tests.
  - Disabled state, accessible ARIA attributes.

#### `Card/`
- **Role**: Content container with surface styling.
- **Key requirements**:
  - Background `Slate Blue`, subtle inner shadow/border.
  - Padding `24px`, optional gold top accent line.
  - Hover lift effect (`translateY(-2px)`).

#### `DataTable/`
- **Role**: Display tabular data with monospaced numbers.
- **Key requirements**:
  - Subcomponents: `TableHeader`, `TableRow`.
  - Header background `Lapis Deep`, white text.
  - Alternating row backgrounds (`Midnight Shale` / `#1E2633`), hover state.
  - Numbers in `JetBrains Mono`, totals in `Gold Fleck`.
  - Responsive scroll on mobile.

#### `FilterBar/`
- **Role**: Filter controls for lists (projects, tools, blog).
- **Key requirements**:
  - Accept `filters` array and `onFilterChange` callback.
  - Render buttons/dropdowns using `Button` components.
  - Active filter highlighted with `Lapis Deep` or `Gold Fleck`.

#### `Footer/`
- **Role**: Global footer with secondary navigation and credits.
- **Key requirements**:
  - Background `Midnight Shale`, top border `rgba(255,255,255,0.1)`.
  - Use secondary navigation from `config/navigation.ts`.
  - Include copyright/colophon link.

#### `FormInput/`
- **Role**: Input field for forms (text, email, textarea).
- **Key requirements**:
  - Background `#1E2633` or `Slate Blue` with lowered opacity.
  - Border `#4A5568`, focus state `Gold Fleck` outline.
  - Text white, placeholder `#B0B0B0`.
  - For numeric inputs, apply `JetBrains Mono`.
  - Support label, error message.

#### `HeroKPIStrip/`
- **Role**: Display key performance indicators (metrics) in hero.
- **Key requirements**:
  - Subcomponent `KPICard`: background `Slate Blue`, gold accent line.
  - Numbers large (`2rem`) in `JetBrains Mono`, labels in `Inter` secondary.
  - Horizontal scroll on mobile.

#### `Navigation/`
- **Role**: Main navigation bar with desktop dropdown and mobile menu.
- **Subcomponents**:
  - `Navbar.tsx` – container.
  - `DesktopNav.tsx` – horizontal links + dropdowns.
  - `MobileNav.tsx` – hamburger menu with slide‑out panel.
  - `NavDropdown.tsx` – reusable dropdown.
- **Key requirements**:
  - Use navigation data from `config/navigation.ts`.
  - Active page indicated by `Lapis Deep` text or border.
  - Hover: `Gold Fleck` underline.
  - Fully accessible (keyboard, screen readers).

#### `ProjectCard/`
- **Role**: Card for displaying a project in listings.
- **Key requirements**:
  - Extend `Card` component.
  - Include image, title, categories (as `Badge`), short description, link.
  - Hover effect: scale image, gold accent line.
  - Variants defined in `ProjectCard.variants.ts`.

#### `ToolCard/`
- **Role**: Card for displaying a tool/resource.
- **Key requirements**:
  - Similar to `ProjectCard` but tailored for tools: title, description, tags, action buttons (“Use Tool”, “GitHub”).
  - Use `Badge` for tech tags.

---

### `config/`

#### `navigation.ts`
- **Role**: Central definition of primary and secondary navigation structures.
- **Key requirements**:
  - Export `primaryNav` array with items (including dropdowns) matching the Full Navigation Structure.
  - Export `secondaryNav` array for footer.
  - Types from `navigation.types.ts`.

#### `routes.ts`
- **Role**: Define all application routes for React Router.
- **Key requirements**:
  - Export array of route objects with `path` and `element` (lazy‑loaded components).
  - Include all pages (Home, About, Resume, Portfolio, Projects, ProjectDetail, Tools, Blog, BlogPost, Documentation, TutorialDetail, Contact, Colophon, Sitemap).

#### `seo.ts`
- **Role**: Centralized SEO metadata constants.
- **Key requirements**:
  - Export `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_URL`, `AUTHOR`, `TWITTER_HANDLE`.
  - Export per‑page defaults (e.g., `HOME_META`, `ABOUT_META`).

---

### `data/`

#### `schemas/` (`blog.schema.ts`, `project.schema.ts`, `tool.schema.ts`)
- **Role**: Zod schemas for runtime validation of data structures.
- **Key requirements**:
  - Define schemas matching the types in `types/` (e.g., `Project`, `BlogPost`).
  - Used when fetching or importing data.

#### `blog.ts`, `projects.ts`, `resume.ts`, `tools.ts`
- **Role**: Mock/static data for development (until CMS integration).
- **Key requirements**:
  - Export arrays of objects conforming to the respective types.
  - Populate with realistic sample content.

---

### `hooks/`

#### `index.ts`
- **Role**: Barrel export for all custom hooks.
- **Key requirements**:
  - Export all hooks (e.g., `useFilteredProjects`, `useReducedMotion`).

#### `useFilteredProjects.ts`
- **Role**: Filter projects array based on selected categories.
- **Key requirements**:
  - Accept projects array and filter state; return filtered projects and filter UI props.
  - Memoized for performance.

#### `useReducedMotion.ts`
- **Role**: Detect user preference for reduced motion.
- **Key requirements**:
  - Use `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  - Return boolean; SSR‑safe.

#### `useScrollPosition.ts`
- **Role**: Track scroll position for sticky header effects.
- **Key requirements**:
  - Use `useEffect` and `window.scrollY`.
  - Return scrollY or threshold boolean; throttle for performance.

#### `useTheme.ts`
- **Role**: Manage theme (light/dark) – future‑proofing.
- **Key requirements**:
  - Use local storage and CSS class toggling.
  - Respect system preference initially.

---

### `pages/` (Page Components)

Each page folder contains:
- `PageName.tsx` – main page component.
- `PageName.module.css` – scoped styles.
- `index.ts` – barrel export.

#### `About/`
- **Role**: About page communicating philosophy and disciplines.
- **Key requirements**:
  - H1: “Engineering Systems. Architecting Intelligence.”
  - Sections: Core Thesis, Disciplines of Practice (grid), Principles, Press/Features.
  - Use `Card` for disciplines, `Badge` for tags.

#### `Blog/`
- **Role**: Blog listing page.
- **Key requirements**:
  - H1: “Insights”, H2: “Thinking in Public.”
  - Filter by category using `FilterBar`.
  - Display posts as `Card` with title, excerpt, date, read time.
  - Featured post at top.
  - Data from `data/blog.ts`.

#### `BlogPost.tsx` (inside `Blog/`)
- **Role**: Individual blog post page (dynamic route `/blog/:slug`).
- **Key requirements**:
  - Render post content with typography, code blocks styled with `JetBrains Mono`.
  - Include “Further Reading” links.

#### `Colophon/`
- **Role**: Site credits, tech stack, design rationale.
- **Key requirements**:
  - Explain design system (lapis lazuli inspiration), fonts, tools.
  - Include “Site Ethics” (privacy, accessibility).
  - Minimal, elegant layout.

#### `Contact/`
- **Role**: Contact form and direct contact info.
- **Key requirements**:
  - H1: “Let’s Build Intelligent Systems.”
  - Form with `FormInput` fields (Name, Email, Inquiry Type, Message).
  - Submit button (accent variant).
  - Direct contact: email, LinkedIn, GitHub.

#### `Documentation/`
- **Role**: Knowledge base index (tutorials and guides).
- **Key requirements**:
  - H1: “Knowledge Base.”
  - Filter by category/difficulty using `FilterBar`.
  - List tutorials as `Card` with title, description, duration.
  - Link to individual tutorial pages.

#### `TutorialTemplate.tsx` (inside `Documentation/`)
- **Role**: Template for individual tutorial pages (dynamic route `/docs/:slug`).
- **Key requirements**:
  - Sections: Objective, Prerequisites, Step‑by‑Step, System Diagram, Next Steps.
  - Code blocks with syntax highlighting.

#### `Home/`
- **Role**: Landing page with multiple sections.
- **Sections** (in `sections/`):
  - `HeroSection`: H1, meta description, KPI strip.
  - `ManifestoSection`: The “Operating System” manifesto.
  - `FeaturedProjectsSection`: 3 featured projects.
  - `StackSnapshotSection`: Visual tags of core competencies.
  - `LatestLabSection`: Previews of blog posts and documentation.
  - `ContactCTASection`: Simplified contact prompt.
- **Key requirements**:
  - Compose sections using `SectionContainer`.
  - Staggered animations on scroll.

#### `Portfolio/`
- **Role**: Curated selection of high‑impact projects.
- **Key requirements**:
  - H1: “Curated Work.”
  - Filter by category using `FilterBar`.
  - Display as `ProjectCard`s.
  - Link to `ProjectDetail` pages.

#### `Projects/`
- **Role**: Complete archive of all projects.
- **Key requirements**:
  - H1: “The Archive.”
  - Purpose statement.
  - Filter by year, category, status.
  - Display as `ProjectCard`s (denser grid).

#### `ProjectDetail/`
- **Role**: Individual project page (dynamic route `/work/:slug` or `/projects/:slug`).
- **Key requirements**:
  - Sections: Problem, Architecture, Implementation, Results, Key Learnings.
  - Use `DataTable` for metrics if applicable.
  - Buttons: Live Demo, GitHub, Case Study PDF.
  - Related projects at bottom.

#### `Resume/`
- **Role**: Dynamic resume page.
- **Key requirements**:
  - H1: “Capabilities & Trajectory.”
  - Sections: Core Competencies (tags), Technical Stack (categorized), Professional History (with metrics), Key Achievements, Certifications.
  - Use `DataTable` for skills matrix.
  - Download PDF button.

#### `Sitemap/`
- **Role**: List all pages for users and search engines.
- **Key requirements**:
  - Simple, accessible list of links grouped by category.
  - No heavy styling; focus on usability.

#### `Tools/`
- **Role**: Index of tools and utilities.
- **Key requirements**:
  - H1: “Toolkits & Utilities.”
  - Filter by category using `FilterBar`.
  - Display as `ToolCard`s.
  - Each card links to external tool or GitHub.

---

### `services/`

#### `analytics.service.ts`
- **Role**: Analytics wrapper (e.g., Google Analytics, Plausible).
- **Key requirements**:
  - Initialize with tracking ID.
  - Export `pageview` and `event` functions.

#### `contact.service.ts`
- **Role**: Handle contact form submissions (API calls).
- **Key requirements**:
  - Export `submitContactForm` that POSTs to backend.
  - Include error handling.

#### `index.ts`
- **Role**: Barrel export for all services.

---

### `styles/`

#### `themes/dark.css`
- **Role**: Dark theme CSS variables (may be merged with `tokens.css`).
- **Key requirements**:
  - Define color variables matching the design schema.
  - Use `:root` selector.

#### `animations.css`
- **Role**: Keyframes and utility classes for animations.
- **Key requirements**:
  - Define `fadeIn`, `slideUp`, etc.
  - Include reduced‑motion overrides.

#### `globals.css`
- **Role**: Global resets and base element styles.
- **Key requirements**:
  - Apply `box-sizing: border-box`.
  - Set body background to `Midnight Shale`, text to white.
  - Import `tokens.css` and `typography.css`.

#### `tokens.css`
- **Role**: CSS custom properties for all design tokens.
- **Key requirements**:
  - Define colors (`--color-lapis-deep`, etc.), spacing scale (`--space-1: 8px`, …), font families, border radius, shadows.

#### `typography.css`
- **Role**: Typography rules for headings, body, monospaced.
- **Key requirements**:
  - `@font-face` for Inter and JetBrains Mono.
  - Set base body font to Inter.
  - Headings use Inter SemiBold/Bold.
  - Code and numbers use JetBrains Mono.
  - Define responsive sizes with `clamp()`.

#### `variables.css`
- **Role**: Legacy or additional variables (optional). May be merged with `tokens.css`.

---

### `tests/`

#### `__mocks__/fileMock.ts`
- **Role**: Mock file imports for Jest.
- **Key requirements**:
  - Export a stub (e.g., `'test-file-stub'`).

#### `integration/` & `unit/`
- **Role**: Contain test files (`*.test.tsx`).
- **Key requirements**:
  - Write tests for components, hooks, services.
  - Use testing library, Jest.

#### `setup.ts`
- **Role**: Jest setup file.
- **Key requirements**:
  - Import `@testing-library/jest-dom` matchers.
  - Configure mocks.

---

### `types/`

#### `blog.types.ts`, `common.types.ts`, `navigation.types.ts`, `project.types.ts`, `resume.types.ts`, `tool.types.ts`
- **Role**: TypeScript interfaces/types for respective domains.
- **Key requirements**:
  - Strict types (no `any`).
  - Align with Zod schemas in `data/schemas`.
  - Export all from `index.ts`.

#### `index.ts`
- **Role**: Barrel export for all types.

---

### `utils/`

#### `animations.ts`
- **Role**: Utility functions for animations (e.g., staggered children delays).
- **Key requirements**:
  - Export helpers like `staggerChildren` to generate animation delays.

#### `cn.ts`
- **Role**: Class name utility (like `clsx` for conditional classes).
- **Key requirements**:
  - Export `cn(...classes: string[])` that joins truthy class names.

#### `constants.ts`
- **Role**: App‑wide constants (site name, base URL, etc.).
- **Key requirements**:
  - Export as named constants.

#### `formatNumber.ts`
- **Role**: Format numbers with commas, decimals, etc.
- **Key requirements**:
  - Use `Intl.NumberFormat`.
  - Return formatted string; optionally apply `JetBrains Mono` class.

#### `index.ts`
- **Role**: Barrel export for all utils.

---

This detailed breakdown provides a clear understanding of each file’s purpose and the essential elements needed for its implementation. Developers can use this as a guide to build the “Data Specialist” portfolio systematically and consistently.