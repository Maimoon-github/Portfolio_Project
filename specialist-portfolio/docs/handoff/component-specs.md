# Component Specifications — The Data Specialist Design System

This document provides detailed specifications for all reusable UI components in the project. Each entry includes purpose, props interface, visual states, accessibility features, usage examples, and design token dependencies.

---

## Table of Contents

- [Button](#button)
- [FilterBar](#filterbar)
- [ProjectCard](#projectcard)
- [DataTable](#datatable)
- [SectionContainer](#sectioncontainer)
- [PageWrapper](#pagewrapper)
- [Layout](#layout)

---

## Button

Primary interactive element of the design system. Supports multiple variants, sizes, icons, and loading state.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent'` | `'primary'` | No | Visual style variant – maps to Lapis Deep, outline, or Gold Fleck. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Size variant affecting padding and font size. |
| `isLoading` | `boolean` | `false` | No | Shows spinner, disables button, preserves layout width. |
| `leftIcon` | `ReactNode` | — | No | Icon rendered before children. |
| `rightIcon` | `ReactNode` | — | No | Icon rendered after children. |
| `fullWidth` | `boolean` | `false` | No | Makes button stretch to container width. |
| `disabled` | `boolean` | — | No | Native disabled attribute. |
| `...rest` | `ButtonHTMLAttributes` | — | No | All other native button attributes (onClick, type, etc.). |

### Visual States

- **Default** – background based on variant, white text, 4px radius.
- **Hover** – background shifts to `--color-primary-hover` (primary variant) or gold‑tinted (accent variant); slight `translateY(-2px)` lift.
- **Focus** – `:focus-visible` outline uses `--color-accent-gold` with 2px offset.
- **Disabled** – opacity 0.5, no pointer events.
- **Loading** – spinner replaces icons, content hidden, layout preserved.

### Accessibility

- Uses native `<button>` element.
- `aria-busy` and `aria-disabled` set appropriately when loading/disabled.
- Focus visible styles meet WCAG AA.
- Icon buttons require visible label or `aria-label`.

### Usage Examples

```tsx
// Primary button
<Button variant="primary" size="lg" onClick={handleClick}>
  View Portfolio
</Button>

// Accent CTA with loading state
<Button variant="accent" isLoading={isSubmitting}>
  Send Message
</Button>

// With left icon
<Button leftIcon={<Icon name="github" />}>
  View on GitHub
</Button>
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--color-primary-deep` | Primary background |
| `--color-primary-medium` | Primary hover |
| `--color-accent-gold` | Accent background, focus ring |
| `--color-text-primary` | Button text |
| `--color-bg-midnight` | Accent text colour |
| `--font-ui` | Font family |
| `--radius-sm` | Border radius |
| `--transition-fast` | Hover transition |
| `--shadow-glow` | Focus ring (optional) |

---

## FilterBar

Category filter component used on Portfolio, Projects, Blog, Tools, and Documentation pages. Implements accessible radio‑group behaviour.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `filters` | `readonly string[]` | — | Yes | Array of filter option labels. |
| `activeFilter` | `string` | — | Yes | Currently selected filter label. |
| `onFilterChange` | `(filter: string) => void` | — | Yes | Callback when filter selection changes. |
| `ariaLabel` | `string` | `'Filter options'` | No | Accessible label for the radiogroup. |

### Visual States

- **Inactive** – Slate Blue background (`--color-surface-slate`), dim text.
- **Active** – Lapis Deep background (`--color-primary-deep`), white text.
- **Hover** – Lapis Medium background for inactive items, Gold Fleck for active items.
- **Focus** – Gold Fleck outline (`--color-accent-gold`) with offset.

### Accessibility

- Container has `role="radiogroup"` and `aria-label`.
- Each button has `role="radio"` and `aria-checked`.
- Keyboard navigation via arrow keys (Left/Right cycles through options).
- Focus management follows WAI‑ARIA radiogroup pattern.

### Usage Examples

```tsx
<FilterBar
  filters={['All Work', 'AI Engineering', 'Web Apps']}
  activeFilter={activeCategory}
  onFilterChange={setActiveCategory}
  ariaLabel="Filter projects by category"
/>
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--color-surface-slate` | Inactive background |
| `--color-text-secondary` | Inactive text |
| `--color-primary-deep` | Active background |
| `--color-primary-medium` | Hover background (inactive) |
| `--color-accent-gold` | Hover background (active), focus ring |
| `--font-ui` | Font family |
| `--font-mono` | Badge text (if needed) |
| `--radius-sm` | Border radius |
| `--transition-base` | State transitions |

---

## ProjectCard

Primary content card for displaying project information. Supports two layout variants (`compact` and `detailed`) and featured state with gold top border.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | Yes | Unique identifier |
| `title` | `string` | — | Yes | Project title |
| `summary` | `string` | — | Yes | One‑line description |
| `category` | `ProjectCategory` | — | Yes | AI‑engineering, web‑apps, automation, strategy |
| `status` | `ProjectStatus` | — | No | active, archived, experimental |
| `metrics` | `ProjectMetric[]` | — | No | Array of { icon, value, label, highlight? } |
| `badges` | `ProjectBadge[]` | — | No | Array of { label, variant, type } |
| `tags` | `string[]` | — | No | Technology tags |
| `links` | `ProjectLinks` | — | No | demo, repo, caseStudy URLs |
| `image` | `string` | — | No | Thumbnail URL |
| `imageAlt` | `string` | — | No | Alt text for image |
| `featured` | `boolean` | `false` | No | Adds gold top border |
| `variant` | `'compact' \| 'detailed'` | `'compact'` | No | Layout variant |

### Visual States

- **Default** – Slate Blue background, subtle border, 4px radius.
- **Hover** – Lifts `-2px`, border becomes Gold Fleck, shadow deepens.
- **Featured** – Gold Fleck top border (2px).
- **Action links** – Hidden by default, appear on hover (ghost style with icon + label).

### Accessibility

- Rendered as `<article>` with appropriate heading hierarchy (H3 for title).
- Action links have `aria-label` when icon‑only.
- Focus states use Gold Fleck outline.

### Usage Examples

```tsx
// Compact card for archive
<ProjectCard
  id="proj-001"
  title="Agentic Research Workflow"
  summary="Autonomous research system using LLM agents."
  category="ai-engineering"
  status="active"
  tags={['AI', 'Python', 'LangChain']}
  variant="compact"
/>

// Detailed card with metrics
<ProjectCard
  {...project}
  variant="detailed"
  metrics={[
    { icon: '⚡', value: '94%', label: 'Accuracy', highlight: true }
  ]}
/>
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--color-surface-slate` | Card background |
| `--color-accent-gold` | Featured border, hover border, metric highlights |
| `--color-primary-deep` | Tag background |
| `--color-primary-medium` | Hover overlay |
| `--color-text-primary` | Title, metrics |
| `--color-text-secondary` | Summary, tags |
| `--font-ui` | Title, summary |
| `--font-mono` | Metric values, tags |
| `--radius-sm` | Border radius |
| `--shadow-default` | Hover shadow |
| `--transition-base` | Hover transitions |

---

## DataTable

Generic, typed table component for displaying structured data (resume history, skill matrices, metrics). Supports sorting.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `columns` | `Column<T>[]` | — | Yes | Column definitions: `{ key: keyof T; label: string; type?: 'text' \| 'number' \| 'date'; sortable?: boolean }` |
| `data` | `readonly T[]` | — | Yes | Data rows |
| `initialSort` | `{ key: keyof T; direction: 'asc' \| 'desc' }` | — | No | Initial sort configuration |

### Visual States

- **Header** – Lapis Deep background, white text, bold weight.
- **Rows** – Alternating Midnight Shale (`--color-bg-midnight`) and `--color-row-alt`.
- **Hover** – Lapis Medium at 20% opacity (`--color-hover-overlay`).
- **Focus** – Gold Fleck outline on focusable cells.
- **Sort indicator** – Gold Fleck arrow in header.

### Accessibility

- Semantic `<table>` with `<thead>`, `<tbody>`, `<th scope="col">`.
- Sortable headers have `role="columnheader"`, `aria-sort`, and keyboard activation (Enter/Space).
- First cell of each row has `scope="row"`.
- Focus management for keyboard navigation (optional).

### Usage Examples

```tsx
const columns = [
  { key: 'role', label: 'Role', type: 'text', sortable: true },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'period', label: 'Period', type: 'text' },
  { key: 'impact', label: 'Impact', type: 'number', sortable: true },
];

<DataTable columns={columns} data={experienceData} />
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--color-primary-deep` | Header background |
| `--color-text-primary` | Header text |
| `--color-bg-midnight` | Row background (odd) |
| `--color-row-alt` | Row background (even) |
| `--color-hover-overlay` | Row hover |
| `--color-accent-gold` | Sort indicator, focus ring |
| `--font-ui` | Text |
| `--font-mono` | Numeric values |
| `--border-subtle` | Cell borders |

---

## SectionContainer

Layout primitive for consistent page sections. Provides vertical padding, background variants, and anchor linking.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | Yes | Anchor link ID |
| `titleId` | `string` | — | No | ID for `aria-labelledby` |
| `as` | `'section' \| 'div' \| 'article' \| 'aside'` | `'section'` | No | Polymorphic element |
| `paddingSize` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | No | Vertical padding (32px, 48px, 64px, 80px) |
| `backgroundVariant` | `'default' \| 'accent' \| 'surface'` | `'default'` | No | Background colour: Midnight Shale, Lapis gradient, or Slate Blue |

### Accessibility

- Renders semantic `<section>` by default.
- `aria-labelledby={titleId}` when provided.
- `id` allows deep linking.

### Usage Examples

```tsx
<SectionContainer
  id="featured-projects"
  paddingSize="lg"
  backgroundVariant="default"
>
  <h2 id="featured-projects-title">Active Nodes.</h2>
  <ProjectGrid />
</SectionContainer>
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--color-bg-midnight` | default background |
| `--color-surface-slate` | surface background |
| `--color-background-gradient` | accent background |
| `--space-12` | sm padding |
| `--space-16` | md padding |
| `--space-24` | lg padding |
| `--space-32` | xl padding |

---

## PageWrapper

Inner wrapper for page content that enforces the 12‑column grid and max‑width constraints.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | — | Yes | Page content |
| `narrow` | `boolean` | `false` | No | Reduces max‑width for documentation/blog posts |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | No | Polymorphic container tag |

### Visual States

- **Default** – Max‑width `--max-content-width` (1280px), centred with 24px gutters.
- **Narrow** – Max‑width 800px for better readability.
- **Entrance animation** – Subtle fade‑up (`0.3s ease`) on page load.

### Usage Examples

```tsx
<PageWrapper narrow={true}>
  <article className="prose">
    <h1>Blog Post Title</h1>
    <p>Content...</p>
  </article>
</PageWrapper>
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--max-content-width` | Default max‑width |
| `--space-4` | Horizontal padding |
| `--space-6` | Narrow max‑width (set via custom property) |
| `--transition-base` | Entrance animation |

---

## Layout

Persistent application shell wrapping every page. Includes header, main content area, and footer.

### Props Interface

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | — | Yes | Page content |
| `meta` | `SEOMeta` | — | No | SEO metadata for the current page (injected via Helmet) |

### Accessibility

- Skip link (`#main-content`) for keyboard users.
- `<main>` element with `id="main-content"`.
- Landmark roles (`banner`, `main`, `contentinfo`) implied by semantic elements.

### Usage Examples

```tsx
// In App.tsx
<Layout meta={{ title: 'Home', description: '...' }}>
  <HomePage />
</Layout>
```

### Design Tokens Consumed

| Token | Usage |
|-------|-------|
| `--color-bg-midnight` | Body background |
| `--font-ui` | Body font |
| `--color-text-primary` | Text colour |
| `--header-height` | Header height (for sticky positioning) |
| `--color-accent-gold` | Skip link background on focus |

---

*This document is maintained alongside the source code. Updates to components should be reflected here to ensure accurate developer handoff.*