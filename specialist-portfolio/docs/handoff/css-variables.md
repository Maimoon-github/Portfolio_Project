# CSS Custom Properties — The Data Specialist Design System

This document catalogs all CSS custom properties (design tokens) used throughout “The Data Specialist” portfolio. These variables are defined in `src/styles/variables.css` (raw values) and `src/styles/tokens.css` (semantic aliases), then consumed by `src/styles/globals.css` and all component-level CSS Modules.

Using custom properties ensures a single source of truth for every visual decision—changing `--color-primary-deep` updates every Lapis Deep element across the entire site .

---

## Color Palette

The palette is built around the “Data Specialist” concept: deep lapis blues for trust, warm gold for accent, and dark neutrals for depth .

### Base Colors (Raw Values)
| Variable | Value | Description |
|----------|-------|-------------|
| `--color-primary-deep` | `#0D33A6` | Lapis Deep — primary actions, dominant accents |
| `--color-primary-medium` | `#3258A6` | Lapis Medium — hover states, supporting elements |
| `--color-bg-midnight` | `#141A26` | Midnight Shale — main page background |
| `--color-surface-slate` | `#3B4859` | Slate Blue — cards, input backgrounds, dividers |
| `--color-accent-gold` | `#D9AE89` | Gold Fleck — CTAs, highlighted numbers, focus rings |
| `--color-text-primary` | `#FFFFFF` | Primary text on dark backgrounds |
| `--color-text-secondary` | `#B0B0B0` | Secondary text, metadata, hints |
| `--color-border-subtle` | `rgba(255,255,255,0.1)` | Subtle borders and strokes |
| `--color-input-bg` | `#1E2633` | Form input background (slightly lighter than Midnight) |
| `--color-row-alt` | `#1E2633` | Alternating table row background |
| `--color-hover-overlay` | `rgba(50,88,166,0.2)` | Hover state with Lapis Medium opacity |

### Semantic Color Tokens
| Variable | Value (maps to) | Role | Usage Example |
|----------|----------------|------|---------------|
| `--color-interactive` | `var(--color-primary-deep)` | Primary actions | `background-color: var(--color-interactive);` — primary Button |
| `--color-interactive-hover` | `var(--color-primary-medium)` | Hover states | `.button:hover { background: var(--color-interactive-hover); }` |
| `--color-emphasis` | `var(--color-accent-gold)` | Highlights, CTAs | `color: var(--color-emphasis);` — accent Button, key metrics |
| `--color-surface-primary` | `var(--color-surface-slate)` | Main container background | `background: var(--color-surface-primary);` — ProjectCard, DataTable rows |
| `--color-background-base` | `var(--color-bg-midnight)` | Page background | `body { background: var(--color-background-base); }` |
| `--color-text-primary` | `var(--color-text-primary)` | Main content text | `color: var(--color-text-primary);` |
| `--color-text-secondary` | `var(--color-text-secondary)` | Metadata, labels | `.project-meta { color: var(--color-text-secondary); }` |
| `--color-border-subtle` | `var(--color-border-subtle)` | Dividers, boundaries | `border-bottom: 1px solid var(--color-border-subtle);` |
| `--color-border-focus` | `var(--color-accent-gold)` | Focus rings | `outline: 2px solid var(--color-border-focus);` |

**Accessibility Notes:**
- All text on dark backgrounds maintains WCAG AA contrast: `--color-text-primary` (white) on `--color-bg-midnight` has a ratio of 15:1 .
- Gold Fleck (`--color-accent-gold`) is used *sparingly* for emphasis, ensuring it never overwhelms as a large‑area color.

---

## Typography

Typography tokens control font families, sizes, weights, line heights, and letter spacing. All sizes use `rem` units for accessibility.

| Variable | Value / Map | Description | Usage Example |
|----------|-------------|-------------|---------------|
| `--font-ui` | `'Inter', system-ui, sans-serif` | Primary UI font (headings, body) | `font-family: var(--font-ui);` |
| `--font-mono` | `'JetBrains Mono', monospace` | Code, numbers, metrics | `.metric-value { font-family: var(--font-mono); }` |
| `--font-size-display` | `3.5rem` | H1 / hero text | `h1 { font-size: var(--font-size-display); }` |
| `--font-size-heading1` | `2.5rem` | H2 / section titles | `.section-title { font-size: var(--font-size-heading1); }` |
| `--font-size-heading2` | `2rem` | H3 / subsection titles | |
| `--font-size-body` | `1rem` | Standard body text | `p { font-size: var(--font-size-body); }` |
| `--font-size-meta` | `0.875rem` | Captions, labels | `.project-tag { font-size: var(--font-size-meta); }` |
| `--font-weight-regular` | `400` | Normal text | |
| `--font-weight-medium` | `500` | Emphasis | `.button { font-weight: var(--font-weight-medium); }` |
| `--font-weight-bold` | `700` | Headings | `h1 { font-weight: var(--font-weight-bold); }` |
| `--line-height-tight` | `1.2` | Headings | `line-height: var(--line-height-tight);` |
| `--line-height-normal` | `1.6` | Body text | `body { line-height: var(--line-height-normal); }` |
| `--line-height-relaxed` | `1.8` | Prose content | `.prose { line-height: var(--line-height-relaxed); }` |
| `--letter-spacing-tight` | `-0.02em` | Large headings | |
| `--letter-spacing-wide` | `0.05em` | Uppercase labels | `text-transform: uppercase; letter-spacing: var(--letter-spacing-wide);` |

---

## Spacing Scale (8px Base Unit)

All spacing—margins, paddings, gaps—uses multiples of 8px . The scale is defined in `variables.css` and used semantically in `tokens.css`.

| Variable | Value | Pixels | Usage Example |
|----------|-------|--------|---------------|
| `--space-1` | `0.25rem` | 4px | `gap: var(--space-1);` |
| `--space-2` | `0.5rem` | 8px | `margin-bottom: var(--space-2);` |
| `--space-3` | `0.75rem` | 12px | |
| `--space-4` | `1rem` | 16px | Default spacing |
| `--space-6` | `1.5rem` | 24px | Grid gutters, card padding |
| `--space-8` | `2rem` | 32px | Section spacing |
| `--space-12` | `3rem` | 48px | `padding-block: var(--space-12);` — SectionContainer |
| `--space-16` | `4rem` | 64px | Large section spacing |
| `--space-24` | `6rem` | 96px | Hero spacing |
| `--space-32` | `8rem` | 128px | Extra large (rare) |

**Semantic Spacing Tokens:**
| Variable | Value | Purpose |
|----------|-------|---------|
| `--space-xs` | `var(--space-2)` | 8px — smallest gap |
| `--space-sm` | `var(--space-3)` | 12px — compact |
| `--space-md` | `var(--space-4)` | 16px — default |
| `--space-lg` | `var(--space-6)` | 24px — generous |
| `--space-xl` | `var(--space-8)` | 32px — large |
| `--space-2xl` | `var(--space-12)` | 48px — section spacing |
| `--space-3xl` | `var(--space-16)` | 64px |
| `--space-4xl` | `var(--space-24)` | 96px |

---

## Motion & Animation

Motion is purposeful and minimal, aligning with “The Data Specialist” refined aesthetic .

| Variable | Value | Description |
|----------|-------|-------------|
| `--duration-fast` | `150ms` | Micro‑interactions, hover effects |
| `--duration-base` | `200ms` | Standard transitions |
| `--duration-slow` | `300ms` | Page loads, reveals |
| `--duration-enter` | `400ms` | Enter animations |
| `--duration-exit` | `200ms` | Exit animations |
| `--easing-default` | `ease` | Standard |
| `--easing-enter` | `ease-out` | Decelerate — entering |
| `--easing-exit` | `ease-in` | Accelerate — exiting |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce / spring effect |

**Animation Utility Classes** (defined in `animations.css`):
- `.animate-fade-in`, `.animate-slide-up`, `.animate-pulse-gold`
- Stagger delays: `.delay-100` through `.delay-500`
- Hover utilities: `.hover-lift`, `.hover-glow`

**Accessibility:** All animations respect `prefers-reduced-motion` via a global media query .

---

## Layout & Grid

| Variable | Value | Description |
|----------|-------|-------------|
| `--max-content-width` | `1280px` | Maximum width of centered content |
| `--header-height` | `64px` | Fixed header height |
| `--grid-gutter` | `24px` | Gap between grid columns |
| `--grid-column-count` | `12` | 12‑column grid system |
| `--container-padding` | `var(--space-md)` (responsive) | Padding inside containers |

---

## Border Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius-sm` | `4px` | Buttons, inputs, cards |
| `--radius-md` | `8px` | Containers, larger elements |
| `--radius-lg` | `16px` | Pills, featured cards |
| `--radius-full` | `9999px` | Circular elements (avatars, badges) |

---

## Shadows

Shadows are layered to create depth on dark backgrounds .

| Variable | Value | Description |
|----------|-------|-------------|
| `--shadow-subtle` | `0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)` | Cards at rest |
| `--shadow-default` | `0 6px 12px -4px rgba(0,0,0,0.4), 0 4px 8px -2px rgba(0,0,0,0.3), 0 0 0 1px rgba(217,174,137,0.1)` | Hover state / raised |
| `--shadow-elevated` | `0 20px 30px -8px rgba(0,0,0,0.5), 0 8px 12px -4px rgba(0,0,0,0.3), 0 0 0 1px rgba(217,174,137,0.15)` | Modals, dropdowns |
| `--shadow-glow` | `0 0 12px var(--color-accent-gold)` | Gold glow for focus / CTA |

---

## Z‑Index Scale

| Variable | Value |
|----------|-------|
| `--z-dropdown` | `100` |
| `--z-sticky` | `200` |
| `--z-fixed` | `300` |
| `--z-modal` | `400` |
| `--z-popover` | `500` |
| `--z-tooltip` | `600` |
| `--z-toast` | `700` |

---

## Theme Support (Dark / Light)

The design system currently defaults to dark mode, but is structured for easy light‑mode expansion using a `[data-theme="light"]` selector .

```css
[data-theme="light"] {
  --color-bg-midnight: #F5F5F5;
  --color-text-primary: #1E1E1E;
  --color-text-secondary: #4A4A4A;
  /* etc. */
}
```

This architecture ensures that adding a light theme requires only a new file, not refactoring component styles .

---

## Usage Guidelines

- **Always prefer semantic tokens** (`--color-interactive`) over raw values (`--color-primary-deep`) in component CSS. This keeps intent clear and allows theme switching .
- **Use spacing scale** for all layout dimensions (margins, paddings, gaps). Never use arbitrary pixel values.
- **Respect accessibility** – the reduced‑motion media query is automatically applied; test any new animation with it enabled.
- **Documentation** – if you add new variables, update this file and the corresponding token files.

---

*This document was generated from the canonical source: `src/styles/variables.css` and `src/styles/tokens.css`. Last updated: 2026‑03‑02.*