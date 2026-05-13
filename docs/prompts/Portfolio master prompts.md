# 🧠 Portfolio — Master Prompt Engineering Document
> **Design System:** Mystical Black Lotus · **Stack:** Next.js 15 · React 19 · TypeScript Strict · Tailwind CSS v4 · Framer Motion · React Three Fiber  
> **Pattern Applied:** Iterative Reconnaissance → Core Architecture → Critical Path Trace → Layer Expansion → Hypothesis Validation → Mental Model Documentation

---

## Strategic Architecture Reading — Mental Model

```
Reconnaissance Output
─────────────────────────────────────────────────────────────────────
Entry Points:   src/app/layout.tsx  →  src/app/page.tsx
Data Flow:      data/*.ts  →  Server Components  →  Section Components  →  UI Atoms
Motion Layer:   components/animations/* (Framer Motion) — NO raw motion in sections
3D Layer:       components/3d/* (R3F) — lazy + Suspense + ssr:false — NO business logic
Token Source:   styles/globals.css (@theme) — ONLY canonical source of all visual values
Critical Paths:
  ① Home → Projects → [slug]  (primary portfolio journey)
  ② Home → Blog → [slug]      (secondary thought leadership journey)
  ③ Any page → Contact        (conversion journey)
Pain Points Flagged:
  - 3D scenes need prefers-reduced-motion gate
  - MDX frontmatter must be typed via types/blog.ts
  - ContactForm needs server action — flag for implementation
```

---

## ━━━ PART 1 — GLOBAL CSS FILES ━━━

---

### 1.1 — `src/styles/globals.css`

> Canonical Design Truth Layer. Every token used across the entire application originates here. No component, section, or utility references raw hex values or pixel literals.

```css
/* src/styles/globals.css */
/* ═══════════════════════════════════════════════════════════════════
   MYSTICAL BLACK LOTUS — Design Truth Layer
   All visual values for the entire application derive from this file.
   Palette Source: Mystical_black_lotus.txt
   Stop 1 → #5F2DA6  Deep Violet Core
   Stop 2 → #4E3473  Mid Violet
   Stop 3 → #8B65BF  Ethereal Purple
   Stop 4 → #1F1A40  Deep Dark
   Stop 5 → #131026  Void Black
   ═══════════════════════════════════════════════════════════════════ */

@import "./fonts.css";
@import "tailwindcss";

/* ─── @theme: Tailwind v4 CSS custom properties ──────────────────── */
@theme {

  /* ── Palette Raw Stops (never reference in components) ── */
  --palette-violet-core:       #5F2DA6;
  --palette-mid-violet:        #4E3473;
  --palette-ethereal-purple:   #8B65BF;
  --palette-deep-dark:         #1F1A40;
  --palette-void-black:        #131026;
  --palette-accent-teal:       #2DD4BF;
  --palette-accent-teal-muted: #0D9488;

  /* ── Background & Surface ── */
  --color-background:                   #151219;
  --color-on-background:                #E8E0EB;

  --color-surface-container-lowest:     #100D14;
  --color-surface-container-low:        #1D1A22;
  --color-surface-container:            #221E26;
  --color-surface-container-high:       #2C2830;
  --color-surface-container-highest:    #37333B;

  /* ── Primary (Deep Violet Core) ── */
  --color-primary:                      #5F2DA6;
  --color-primary-light:                #D6BAFF;
  --color-on-primary:                   #430089;
  --color-primary-container:            #5F2DA6;
  --color-on-primary-container:         #CDADFF;

  /* ── Secondary (Mid Violet) ── */
  --color-secondary:                    #5A358C;
  --color-on-secondary:                 #401972;
  --color-secondary-container:          #5A358C;
  --color-on-secondary-container:       #CDA8FF;

  /* ── Tertiary (Ethereal Purple) ── */
  --color-tertiary:                     #583E7E;
  --color-on-tertiary:                  #3C2261;
  --color-tertiary-container:           #583E7E;
  --color-on-tertiary-container:        #CCAEF6;

  /* ── Accent CTA (Teal) ── */
  --color-accent:                       #2DD4BF;
  --color-accent-muted:                 #0D9488;
  --color-on-accent:                    #003731;

  /* ── Outline ── */
  --color-outline:                      #968E9E;
  --color-outline-variant:              #4A4452;

  /* ── Glass Border ── */
  --color-glass-border:                 rgba(139, 101, 191, 0.25);
  --color-glass-border-hover:           rgba(139, 101, 191, 0.50);
  --color-glass-glow:                   rgba(95, 45, 166, 0.35);
  --color-glass-glow-accent:            rgba(45, 212, 191, 0.25);

  /* ── Error / Status ── */
  --color-error:                        #FFB4AB;
  --color-on-error:                     #690005;
  --color-error-container:              #93000A;
  --color-on-error-container:           #FFDAD6;
  --color-success:                      #6EE7B7;
  --color-warning:                      #FCD34D;

  /* ── Typography ── */
  --font-sans:  'Space Grotesk', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --font-display: 'Space Grotesk', system-ui, sans-serif;

  /* ── Type Scale ── */
  --text-display:   72px;
  --text-h1:        48px;
  --text-h2:        32px;
  --text-h3:        24px;
  --text-h4:        20px;
  --text-body-lg:   18px;
  --text-body-md:   16px;
  --text-body-sm:   14px;
  --text-label-caps:12px;

  /* ── Line Heights ── */
  --leading-display:  1.05;
  --leading-heading:  1.2;
  --leading-body:     1.6;
  --leading-relaxed:  1.8;

  /* ── Letter Spacing ── */
  --tracking-tight:   -0.02em;
  --tracking-normal:  0em;
  --tracking-wide:    0.04em;
  --tracking-caps:    0.12em;

  /* ── Spacing Scale ── */
  --spacing-section-gap:   160px;
  --spacing-gutter:         32px;
  --spacing-page-margin:    64px;
  --spacing-card-pad:       24px;
  --spacing-card-pad-lg:    32px;

  /* ── Border Radii ── */
  --radius-sm:    6px;
  --radius-md:    12px;
  --radius-lg:    20px;
  --radius-xl:    28px;
  --radius-full:  9999px;

  /* ── Shadows / Glows ── */
  --shadow-sm:     0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md:     0 4px 24px rgba(0, 0, 0, 0.5);
  --shadow-lg:     0 8px 48px rgba(0, 0, 0, 0.6);
  --shadow-glow-primary:  0 0 40px rgba(95, 45, 166, 0.45);
  --shadow-glow-accent:   0 0 32px rgba(45, 212, 191, 0.35);
  --shadow-glow-card:     0 0 24px rgba(95, 45, 166, 0.20);

  /* ── Transitions ── */
  --transition-fast:    150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base:    300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow:    600ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring:  400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── Z-Index Scale ── */
  --z-base:       0;
  --z-raised:     10;
  --z-overlay:    100;
  --z-modal:      200;
  --z-toast:      300;
  --z-header:     400;
  --z-cursor:     500;

  /* ── Blur ── */
  --blur-glass:   blur(24px);
  --blur-glass-sm: blur(12px);
  --blur-glass-mobile: blur(20px);

  /* ── Animations (Keyframe references) ── */
  --animate-fade-up:        fade-up 0.6s ease-out both;
  --animate-fade-in:        fade-in 0.5s ease-out both;
  --animate-slide-in-left:  slide-in-left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  --animate-scale-in:       scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  --animate-glow-pulse:     glow-pulse 3s ease-in-out infinite;
  --animate-float:          float 6s ease-in-out infinite;
  --animate-shimmer:        shimmer 2s linear infinite;

}

/* ─── Keyframe Definitions ─────────────────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: var(--shadow-glow-primary); }
  50%       { box-shadow: 0 0 64px rgba(95, 45, 166, 0.7); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position:  200% 0; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes border-flow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ─── @utility: Glass Surface System ───────────────────────────────── */

@utility glass {
  background: rgba(34, 30, 38, 0.55);
  backdrop-filter: var(--blur-glass);
  -webkit-backdrop-filter: var(--blur-glass);
  border: 1px solid var(--color-glass-border);
  border-radius: var(--radius-lg);

  @media (max-width: 768px) {
    backdrop-filter: var(--blur-glass-mobile);
    -webkit-backdrop-filter: var(--blur-glass-mobile);
  }
}

@utility glass-card {
  @apply glass;
  background: rgba(28, 24, 34, 0.65);
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(139, 101, 191, 0.15);
  transition: border-color var(--transition-base),
              box-shadow var(--transition-base),
              transform var(--transition-base);

  &:hover {
    border-color: var(--color-glass-border-hover);
    box-shadow: var(--shadow-lg), var(--shadow-glow-card);
    transform: translateY(-2px);
  }
}

@utility glass-header {
  background: rgba(21, 18, 25, 0.80);
  backdrop-filter: var(--blur-glass);
  -webkit-backdrop-filter: var(--blur-glass);
  border-bottom: 1px solid var(--color-glass-border);
}

@utility glass-btn {
  @apply glass;
  border-radius: var(--radius-full);
  padding: 10px 28px;
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  transition: all var(--transition-spring);

  &:hover {
    border-color: var(--color-glass-border-hover);
    box-shadow: var(--shadow-glow-primary);
    transform: translateY(-2px) scale(1.02);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
}

@utility glass-link {
  position: relative;
  color: var(--color-on-background);
  text-decoration: none;
  transition: color var(--transition-fast);

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
    transition: width var(--transition-base);
  }

  &:hover {
    color: var(--color-primary-light);

    &::after { width: 100%; }
  }
}

@utility glass-avatar {
  @apply glass;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-glass-border-hover);
  box-shadow: var(--shadow-glow-primary), 0 0 0 4px rgba(95, 45, 166, 0.1);
  overflow: hidden;
}

/* ─── CSS Reset & Base Styles ───────────────────────────────────────── */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-body-md);
  line-height: var(--leading-body);
  color: var(--color-on-background);
  background-color: var(--color-background);
  min-height: 100vh;
  overflow-x: hidden;
}

/* Scrollbar styling */
::-webkit-scrollbar        { width: 6px; }
::-webkit-scrollbar-track  { background: var(--color-surface-container-lowest); }
::-webkit-scrollbar-thumb  {
  background: linear-gradient(180deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover { background: var(--color-primary-light); }

/* Selection */
::selection {
  background: rgba(95, 45, 166, 0.40);
  color: var(--color-primary-light);
}

/* Focus visible — accessibility */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Typography base */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-tight);
  color: var(--color-on-background);
  font-weight: 700;
}

h1 { font-size: var(--text-h1); }
h2 { font-size: var(--text-h2); }
h3 { font-size: var(--text-h3); }
h4 { font-size: var(--text-h4); }

p  {
  font-size: var(--text-body-md);
  line-height: var(--leading-body);
  color: var(--color-outline);
}

a {
  color: inherit;
  text-decoration: none;
}

img, svg, video, canvas {
  display: block;
  max-width: 100%;
}

/* Reduced motion gate */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ─── Utility Classes ────────────────────────────────────────────────── */

@utility section-container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--spacing-page-margin);

  @media (max-width: 1024px) { padding-inline: var(--spacing-gutter); }
  @media (max-width: 640px)  { padding-inline: 20px; }
}

@utility gradient-text {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@utility gradient-text-primary {
  background: linear-gradient(135deg, var(--color-on-primary-container) 0%, var(--color-primary-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@utility eyebrow-label {
  font-family: var(--font-mono);
  font-size: var(--text-label-caps);
  font-weight: 500;
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--color-accent);
}

@utility noise-overlay {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.04;
    z-index: 0;
  }
}

@utility glow-dot {
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent), 0 0 16px rgba(45, 212, 191, 0.5);
  animation: var(--animate-glow-pulse);
}
```

---

### 1.2 — `src/styles/fonts.css`

> Self-hosted variable font declarations with display swap, preload hints, and subsetting strategy.

```css
/* src/styles/fonts.css */
/* ═══════════════════════════════════════════════════════════════════
   FONT DECLARATIONS — Space Grotesk + JetBrains Mono
   Strategy: Self-hosted woff2 variable fonts with display:swap
   Preload:  Both fonts preloaded in app/layout.tsx via <link rel="preload">
   Subset:   latin only — saves ~60% file size
   ═══════════════════════════════════════════════════════════════════ */

/* ── Space Grotesk Variable — Primary Display + Body Font ── */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2') tech(variations),
       url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2-variations');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                 U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                 U+2212, U+2215, U+FEFF, U+FFFD;
}

/* ── JetBrains Mono Variable — Monospace Code + Labels ── */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Variable.woff2') format('woff2') tech(variations),
       url('/fonts/JetBrainsMono-Variable.woff2') format('woff2-variations');
  font-weight: 100 800;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                 U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                 U+2212, U+2215, U+FEFF, U+FFFD;
}

/* ── Italic variant (JetBrains Mono) — used in code blocks ── */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Italic-Variable.woff2') format('woff2') tech(variations),
       url('/fonts/JetBrainsMono-Italic-Variable.woff2') format('woff2-variations');
  font-weight: 100 800;
  font-style: italic;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
                 U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
                 U+2212, U+2215, U+FEFF, U+FFFD;
}

/*
  Implementation Notes for app/layout.tsx:
  ─────────────────────────────────────────
  Add these preload links in the <head> for critical font loading:

  <link rel="preload" as="font" type="font/woff2"
        href="/fonts/SpaceGrotesk-Variable.woff2" crossOrigin="anonymous" />
  <link rel="preload" as="font" type="font/woff2"
        href="/fonts/JetBrainsMono-Variable.woff2" crossOrigin="anonymous" />

  Alternatively, use Next.js localFont() in layout.tsx:
  ─────────────────────────────────────────────────────
  import localFont from 'next/font/local';

  const spaceGrotesk = localFont({
    src: [{ path: '../public/fonts/SpaceGrotesk-Variable.woff2',
            weight: '300 700', style: 'normal' }],
    variable: '--font-sans',
    display: 'swap',
    preload: true,
    fallback: ['system-ui', 'sans-serif'],
  });

  const jetbrainsMono = localFont({
    src: [{ path: '../public/fonts/JetBrainsMono-Variable.woff2',
            weight: '100 800', style: 'normal' }],
    variable: '--font-mono',
    display: 'swap',
    preload: true,
    fallback: ['monospace'],
  });
*/
```

---

### 1.3 — `src/styles/tailwind.css`

> Tailwind v4 entrypoint. Imports the framework and the Design Truth Layer.

```css
/* src/styles/tailwind.css */
/* ═══════════════════════════════════════════════════════════════════
   TAILWIND CSS v4 ENTRYPOINT
   Import order is load order — preserve exactly.
   ═══════════════════════════════════════════════════════════════════ */

@import "tailwindcss";
@import "./globals.css";
@import "./fonts.css";
@import "./theme.css";
@import "./mdx.css";

/*
  Tailwind v4 Configuration Notes:
  ─────────────────────────────────
  In Tailwind v4, configuration moves into globals.css via @theme.
  No tailwind.config.js is required for token-level customisation.
  Custom @utility classes defined in globals.css are auto-registered.
  All --color-*, --font-*, --text-*, --spacing-*, --radius-* tokens
  defined in @theme are automatically available as Tailwind utilities:

  bg-[var(--color-primary)]           → works natively
  text-[var(--color-on-background)]   → works natively
  rounded-[var(--radius-lg)]          → works natively

  For third-party plugin compat, add to package.json:
  "tailwindcss": "^4.0.0"
*/
```

---

### 1.4 — `src/styles/theme.css`

> Extended semantic aliases, component-level design tokens, and surface overlays.

```css
/* src/styles/theme.css */
/* ═══════════════════════════════════════════════════════════════════
   THEME CSS — Semantic Aliases + Component Tokens
   These extend globals.css tokens with component-specific meanings.
   Reference these in components, never raw palette values.
   ═══════════════════════════════════════════════════════════════════ */

:root {

  /* ── Page Background Layers ── */
  --bg-page:              var(--color-background);
  --bg-elevated:          var(--color-surface-container-low);
  --bg-overlay:           rgba(16, 13, 20, 0.85);
  --bg-modal-backdrop:    rgba(13, 10, 19, 0.90);

  /* ── Gradient Definitions ── */
  --gradient-primary:
    linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  --gradient-accent:
    linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-muted) 100%);
  --gradient-hero:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(95, 45, 166, 0.30) 0%, transparent 70%);
  --gradient-surface:
    linear-gradient(180deg, var(--color-surface-container-low) 0%,
                            var(--color-surface-container-lowest) 100%);
  --gradient-card-border:
    linear-gradient(135deg, rgba(139,101,191,0.40) 0%,
                             rgba(95,45,166,0.10) 50%,
                             rgba(45,212,191,0.25) 100%);
  --gradient-text-hero:
    linear-gradient(135deg, #FFFFFF 0%, var(--color-primary-light) 50%,
                             var(--color-accent) 100%);
  --gradient-timeline-line:
    linear-gradient(180deg, var(--color-primary) 0%,
                             var(--color-accent) 100%);

  /* ── Header ── */
  --header-height:               72px;
  --header-height-scrolled:      56px;
  --header-bg:                   var(--color-surface-container-lowest);
  --header-border:               var(--color-glass-border);

  /* ── Navigation ── */
  --nav-link-color:              var(--color-outline);
  --nav-link-hover:              var(--color-on-background);
  --nav-link-active:             var(--color-primary-light);
  --nav-link-active-bg:          rgba(95, 45, 166, 0.12);

  /* ── Buttons ── */
  --btn-primary-bg:              var(--color-primary);
  --btn-primary-hover:           var(--color-secondary);
  --btn-primary-text:            #FFFFFF;
  --btn-accent-bg:               var(--color-accent);
  --btn-accent-hover:            var(--color-accent-muted);
  --btn-accent-text:             var(--color-on-accent);
  --btn-ghost-border:            var(--color-outline-variant);
  --btn-ghost-hover-border:      var(--color-primary);
  --btn-ghost-hover-text:        var(--color-primary-light);
  --btn-radius:                  var(--radius-full);
  --btn-padding-y:               12px;
  --btn-padding-x:               28px;
  --btn-font-size:               var(--text-body-sm);
  --btn-font-weight:             600;
  --btn-letter-spacing:          var(--tracking-wide);

  /* ── Cards ── */
  --card-bg:                     rgba(28, 24, 34, 0.65);
  --card-border:                 var(--color-glass-border);
  --card-border-hover:           var(--color-glass-border-hover);
  --card-shadow:                 var(--shadow-md);
  --card-shadow-hover:           var(--shadow-lg);
  --card-radius:                 var(--radius-lg);
  --card-padding:                var(--spacing-card-pad);

  /* ── Inputs ── */
  --input-bg:                    var(--color-surface-container-low);
  --input-border:                var(--color-outline-variant);
  --input-border-focus:          var(--color-primary);
  --input-text:                  var(--color-on-background);
  --input-placeholder:           var(--color-outline);
  --input-radius:                var(--radius-md);
  --input-padding:               14px 18px;

  /* ── Tags / Badges ── */
  --tag-bg:                      rgba(95, 45, 166, 0.15);
  --tag-border:                  rgba(95, 45, 166, 0.30);
  --tag-text:                    var(--color-primary-light);
  --tag-bg-accent:               rgba(45, 212, 191, 0.12);
  --tag-border-accent:           rgba(45, 212, 191, 0.30);
  --tag-text-accent:             var(--color-accent);

  /* ── Timeline ── */
  --timeline-line:               var(--color-outline-variant);
  --timeline-dot:                var(--color-primary);
  --timeline-dot-active:         var(--color-accent);
  --timeline-dot-size:           14px;
  --timeline-line-width:         2px;

  /* ── Progress Bars ── */
  --progress-bg:                 var(--color-surface-container-high);
  --progress-fill:               var(--gradient-primary);
  --progress-radius:             var(--radius-full);
  --progress-height:             6px;

  /* ── Tooltips ── */
  --tooltip-bg:                  var(--color-surface-container-highest);
  --tooltip-border:              var(--color-glass-border);
  --tooltip-text:                var(--color-on-background);
  --tooltip-radius:              var(--radius-sm);

  /* ── Scroll Progress Bar ── */
  --scroll-bar-bg:               var(--gradient-primary);
  --scroll-bar-height:           3px;

  /* ── Skeleton ── */
  --skeleton-base:               var(--color-surface-container);
  --skeleton-shimmer:
    linear-gradient(90deg,
      transparent 0%,
      rgba(139, 101, 191, 0.08) 50%,
      transparent 100%);
  --skeleton-radius:             var(--radius-md);
}

/* ── Dark-mode future-proofing (tokens auto-override) ── */
@media (prefers-color-scheme: light) {
  :root {
    /* Override surface tokens here if light mode is introduced */
    /* Currently intentionally dark-only per design specification */
  }
}
```

---

### 1.5 — `src/styles/mdx.css`

> Typography reset and prose styling for MDX blog content rendering.

```css
/* src/styles/mdx.css */
/* ═══════════════════════════════════════════════════════════════════
   MDX PROSE STYLES
   Applied within .prose wrapper in PostBody.tsx
   All values reference Design Truth Layer tokens.
   ═══════════════════════════════════════════════════════════════════ */

.prose {
  color: var(--color-on-background);
  font-family: var(--font-sans);
  font-size: var(--text-body-lg);
  line-height: var(--leading-relaxed);
  max-width: 72ch;

  /* ── Headings ── */
  & h1, & h2, & h3, & h4 {
    font-weight: 700;
    letter-spacing: var(--tracking-tight);
    color: var(--color-on-background);
    margin-top: 2.5em;
    margin-bottom: 0.75em;
    scroll-margin-top: calc(var(--header-height) + 24px);
  }

  & h2 {
    font-size: var(--text-h2);
    background: var(--gradient-text-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-bottom: 0.5em;
    border-bottom: 1px solid var(--color-outline-variant);
  }

  & h3 { font-size: var(--text-h3); color: var(--color-primary-light); }
  & h4 { font-size: var(--text-h4); color: var(--color-on-background); }

  /* ── Paragraphs ── */
  & p {
    margin-bottom: 1.5em;
    color: var(--color-on-background);
    opacity: 0.85;
  }

  /* ── Links ── */
  & a {
    color: var(--color-accent);
    text-underline-offset: 3px;
    text-decoration: underline;
    text-decoration-color: rgba(45, 212, 191, 0.40);
    transition: color var(--transition-fast), text-decoration-color var(--transition-fast);

    &:hover {
      color: var(--color-primary-light);
      text-decoration-color: rgba(214, 186, 255, 0.60);
    }
  }

  /* ── Code (inline) ── */
  & code:not(pre code) {
    font-family: var(--font-mono);
    font-size: 0.875em;
    background: var(--color-surface-container-high);
    color: var(--color-accent);
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-outline-variant);
  }

  /* ── Code blocks ── */
  & pre {
    background: var(--color-surface-container-lowest);
    border: 1px solid var(--color-outline-variant);
    border-radius: var(--radius-md);
    padding: 24px;
    overflow-x: auto;
    margin: 2em 0;
    box-shadow: var(--shadow-md);

    & code {
      font-family: var(--font-mono);
      font-size: var(--text-body-sm);
      line-height: 1.7;
      color: var(--color-on-background);
    }
  }

  /* ── Blockquote ── */
  & blockquote {
    margin: 2em 0;
    padding: 20px 24px;
    border-left: 3px solid var(--color-primary);
    background: rgba(95, 45, 166, 0.08);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    font-style: italic;
    color: var(--color-primary-light);
  }

  /* ── Lists ── */
  & ul, & ol {
    padding-left: 1.5em;
    margin-bottom: 1.5em;

    & li {
      margin-bottom: 0.5em;
      color: var(--color-on-background);
      opacity: 0.85;

      &::marker { color: var(--color-primary); }
    }
  }

  /* ── Tables ── */
  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 2em 0;
    font-size: var(--text-body-sm);

    & th {
      background: var(--color-surface-container-high);
      color: var(--color-primary-light);
      font-weight: 600;
      padding: 12px 16px;
      text-align: left;
      border-bottom: 2px solid var(--color-primary);
    }

    & td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--color-outline-variant);
    }

    & tr:hover td { background: rgba(95, 45, 166, 0.06); }
  }

  /* ── Horizontal rule ── */
  & hr {
    border: none;
    height: 1px;
    background: var(--gradient-card-border);
    margin: 3em 0;
  }

  /* ── Images ── */
  & img {
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-glass-border);
    box-shadow: var(--shadow-lg);
    margin: 2em auto;
  }
}
```

---

## ━━━ PART 2 — PAGE PROMPTS ━━━

> **Reading Pattern Applied:** Each page prompt was derived by tracing the data flow from `data/*.ts` → `app/[page]/page.tsx` → `components/sections/[page]/*.tsx` → `components/ui/*.tsx`, with motion layer isolation confirmed at `components/animations/*`.

---

## Page 01 — Home (`/`)

### Full Implementation Prompt

```
Build the Home page for a futuristic personal portfolio (Data Scientist / AI Agent Architect /
MLOps Engineer) using Next.js 15 App Router with React 19, TypeScript strict mode, Tailwind CSS v4,
Framer Motion, and React Three Fiber.

FILE: src/app/page.tsx (Server Component)
SECTIONS: HeroSection → FeaturedProjects → SkillsSnapshot → CtaBanner
IMPORTS: All sections from src/components/sections/home/*

═══════════════════════════════════════════════════════
SECTION 1 — HeroSection  (src/components/sections/home/HeroSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Full-viewport height (min-h-screen), flex row on desktop (60% text / 40% 3D), 
  stacked column on mobile (text above, 3D scene below at 50vh)
- Page background: var(--color-background) #151219
- Hero radial gradient overlay: var(--gradient-hero) — deep violet bloom from top center
- Noise texture overlay via .noise-overlay utility

TEXT BLOCK (left column):
- Eyebrow label: "Available for Work — 2025" in font-mono, var(--color-accent),
  font-size var(--text-label-caps), letter-spacing var(--tracking-caps), uppercase
  preceded by a .glow-dot animation
- H1 display headline: 3 lines —
    Line 1: "I Build" — white, var(--text-display) 72px
    Line 2: "Intelligent" — var(--gradient-text) applied (primary-light → accent)
    Line 3: "Systems." — white, var(--text-display)
  Font: var(--font-sans), weight 700, letter-spacing var(--tracking-tight)
  Use TextReveal animation wrapper for word-by-word stagger on mount
- Subheadline paragraph: "Data Scientist · AI Agent Architect · MLOps Engineer
  Building autonomous pipelines and production-grade AI at the intersection of
  machine learning and systems engineering."
  Font: var(--font-sans), var(--text-body-lg), color var(--color-outline), 
  line-height var(--leading-relaxed), max-width 52ch
  FadeUp animation with 400ms delay
- CTA button row (flex gap-4, mt-10):
    Button 1: "View My Work" — primary filled, MagneticButton wrapper,
              bg var(--color-primary), hover var(--shadow-glow-primary),
              border-radius var(--btn-radius), font-weight 600
    Button 2: "Get In Touch" — ghost outlined, glass-btn utility,
              border var(--color-glass-border), hover border var(--color-primary)
  FadeUp with 600ms delay, staggered between buttons
- Social proof strip (mt-12): 
    "5+ Years" / "30+ Projects" / "15+ Models Deployed" 
    Each stat: number in var(--color-accent) + label in var(--color-outline)
    Separated by vertical dividers (var(--color-outline-variant))
    CountUp animation triggered on viewport entry

3D SCENE BLOCK (right column):
- Component: <HeroScene /> — lazy loaded, ssr:false, Suspense with Skeleton fallback
- Content: Animated icosahedron geometry with wireframe overlay,
  rotating slowly on Y axis (0.003 rad/frame), subtle mouse-parallax tilt.
  Three floating particle clusters orbit the mesh using custom sine/cosine offsets.
  Ambient point light at var(--palette-violet-core) intensity 1.5,
  secondary accent point light at var(--palette-accent-teal) intensity 0.8.
  Background: transparent canvas over page gradient.
- On mobile: scale canvas to 50vh, disable mouse-parallax, reduce particle count 50%

SCROLL INDICATOR:
- Centered at bottom of hero: animated bouncing chevron-down icon,
  color var(--color-outline), opacity 0.6, float animation 2s infinite
  Hidden once user scrolls past 20% viewport height

═══════════════════════════════════════════════════════
SECTION 2 — FeaturedProjects  (src/components/sections/home/FeaturedProjects.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap) 160px
- SectionHeader component: eyebrow "Featured Work", h2 "Projects That Ship", 
  centered, max-width 640px margin-auto
- 3-column CSS grid on desktop (gap-6), 1-column on mobile
- Cards slide up with StaggerChildren (0.15s between each)

CARD DESIGN (ProjectCard component — glass-card utility):
- Aspect ratio 16/9 cover image area at top (Next.js Image, object-cover)
  with overlay gradient: linear-gradient(to bottom, transparent 40%, rgba(13,10,19,0.95) 100%)
- Below image: card body with padding var(--spacing-card-pad)
- Tech tag strip: Badge components, var(--tag-bg) / var(--tag-text)
- Project title: h3, var(--text-h3), var(--color-on-background), font-weight 700
- Short description: p, var(--text-body-sm), var(--color-outline), 2-line clamp
- Footer row: "View Details →" glass-link + GitHub ExternalLink icon
- Hover: translateY(-4px), var(--shadow-glow-card), border-color hover
- 3D tilt: ProjectCardScene overlay activated on hover (perspective transform,
  rotateX/Y max ±8deg based on mouse position within card bounds)

"View All Projects →" CTA link centered below grid, glass-link utility with arrow.

═══════════════════════════════════════════════════════
SECTION 3 — SkillsSnapshot  (src/components/sections/home/SkillsSnapshot.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap)
- Two-column layout: left 45% (text) / right 55% (icon grid) on desktop; stacked mobile
- Left: SectionHeader left-aligned, eyebrow "Core Capabilities", h2 "Skills That Matter",
  followed by short paragraph and CTA "Full Expertise →"
- Right: 4×4 icon grid of technology logos (React, Python, PyTorch, TensorFlow, Docker,
  Kubernetes, Airflow, dbt, Spark, LangChain, AWS, GCP, PostgreSQL, Kafka, MLflow, FastAPI)
  Each cell: glass-card, centered icon (SVG, 40px), label below in font-mono text-xs
  Hover: icon scales 1.1, card glow var(--color-glass-glow), tooltip shows version/role
  StaggerChildren entrance: icons fade in left-to-right, row by row

═══════════════════════════════════════════════════════
SECTION 4 — CtaBanner  (src/components/sections/home/CtaBanner.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Full-width strip, margin-top var(--spacing-section-gap), margin-bottom 80px
- glass-card with animated gradient border (var(--gradient-card-border) border-flow keyframe)
- Inner padding 64px horizontal, 56px vertical on desktop; 32px/40px mobile
- Left: large headline "Let's Build Something Remarkable." 
  var(--gradient-text) applied, font-size var(--text-h1)
  Sub-line: "Open to senior roles, consulting, and research collaborations."
- Right: two CTAs stacked vertically, MagneticButton wrapped:
    "Start a Conversation" — accent filled btn
    "Download Resume" — ghost btn with download icon
- Background: subtle FloatingOrb 3D element behind the card (lazy, ssr:false)
  — low-intensity violet orb mesh with soft bloom, z-index -1
```

### Component Breakdown

| Component | Location | 3D Integration | Motion |
|---|---|---|---|
| `HeroSection` | `sections/home/` | Hosts `<HeroScene />` | TextReveal, FadeUp, CountUp |
| `HeroScene` | `components/3d/` | Icosahedron + particles + lights | R3F useFrame rotation |
| `FeaturedProjects` | `sections/home/` | `ProjectCardScene` per card hover | StaggerChildren slide-up |
| `ProjectCard` | `sections/projects/` | 3D tilt on hover via perspective | ScaleOnHover, glass-card hover |
| `SkillsSnapshot` | `sections/home/` | None | StaggerChildren icon entrance |
| `CtaBanner` | `sections/home/` | `FloatingOrb` background | FadeUp, border-flow animation |
| `MagneticButton` | `animations/` | None | Cursor-follow spring physics |
| `TextReveal` | `animations/` | None | Word stagger on mount |
| `CountUp` | `animations/` | None | Number spring on viewport entry |

### Technical Implementation Details

```
NEXT.JS / REACT:
  - page.tsx: async Server Component, no 'use client'
  - Section components: Client Components ('use client') for motion
  - HeroScene / FloatingOrb: dynamic import, ssr:false, Suspense required

TAILWIND CSS v4:
  - All colour tokens via var(--color-*) in className
  - glass-card / glass-btn / gradient-text from @utility in globals.css
  - No hardcoded hex values anywhere

FRAMER MOTION:
  - HeroSection: initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
  - FeaturedProjects: whileInView, viewport={{ once:true, amount:0.2 }}
  - TextReveal: splits text by word, each word wrapped in motion.span
  - CountUp: useSpring with damping:30, stiffness:100 on entry

R3F PERFORMANCE:
  - HeroScene: InstancedMesh for particles (max 500 instances)
  - dpr={[1, 1.5]} to cap pixel ratio on high-DPI screens
  - shadows disabled on mobile (useMediaQuery check)
  - frameloop="demand" when canvas not visible (useInView gate)

ACCESSIBILITY:
  - HeroScene: aria-hidden="true", role="presentation" on canvas wrapper
  - All CTAs: descriptive aria-label attributes
  - CountUp: aria-live="polite" on the number container
  - Reduced motion: all Framer Motion animations check useReducedMotion()

SEO:
  export const metadata: Metadata = {
    title: 'Your Name — AI Engineer & Data Scientist',
    description: 'Portfolio of [Name], specializing in AI agent systems...',
    openGraph: { images: ['/images/og-image.png'] },
  }
```

---

## Page 02 — About (`/about`)

### Full Implementation Prompt

```
Build the About page. FILE: src/app/about/page.tsx

SECTIONS: PageHeader → BioSection → ValuesSection → (Skills teaser) → AvatarCard

═══════════════════════════════════════════════════════
PAGE HEADER (shared layout component):
═══════════════════════════════════════════════════════
- Full-width banner below global Header, height 280px
- Background: var(--gradient-hero) + subtle grain noise
- H1: "About Me" — var(--gradient-text-primary), centered, var(--text-h1)
- Breadcrumb: "Home / About" — font-mono, var(--color-outline), text-xs
- Entrance: FadeUp on both elements, 200ms stagger

═══════════════════════════════════════════════════════
SECTION 1 — BioSection  (src/components/sections/about/BioSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Two-column: 55% bio text / 45% avatar + stats card, reversed on alternate rows
- padding-top var(--spacing-section-gap)

LEFT — Bio Text:
- Eyebrow: "Who I Am"
- H2: "Turning Data into Decisions, Models into Products."
  var(--gradient-text), font-size var(--text-h2)
- Bio paragraphs (3): conversational, 1st-person, covering:
    Para 1: Background in AI/data science, ML engineering journey
    Para 2: Passion for MLOps, autonomous agents, production systems
    Para 3: Beyond the terminal — side projects, writing, interests
  All paragraphs: var(--color-outline) → on scroll, opacity animates 0.5 → 1 
  via Intersection Observer (SlideIn animation with left direction)
- "Download CV" button: ghost btn with PDF icon, glass-btn utility

RIGHT — AvatarCard:
- glass-card with extra padding (40px)
- Profile image: glass-avatar utility (circular, violet glow ring)
  Floating animation: var(--animate-float) 6s ease-in-out infinite
- Name: h3, white, 24px
- Role tags: 3 Badge components stacked vertically
    "Data Scientist" / "AI Agent Architect" / "MLOps Engineer"
- Location strip: map-pin icon + "Remote / [City]" in font-mono xs
- Availability pill: green glow-dot + "Available — Q3 2025"
- 3D element: GlobeScene rendered behind the card (lazy, ssr:false),
  rotating globe with violet tint, subtle, opacity 0.4, z-index -1

═══════════════════════════════════════════════════════
SECTION 2 — ValuesSection  (src/components/sections/about/ValuesSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap)
- SectionHeader: eyebrow "How I Think", h2 "Core Principles"
- 3-column grid on desktop (gap-6), 1-column mobile
- 6 value cards total, StaggerChildren entrance

VALUE CARD DESIGN:
- glass-card utility, padding 32px
- Top: icon container — 48px square, rounded-xl, 
  bg rgba(95,45,166,0.15), icon in var(--color-accent) (Lucide icons)
- Title: h4, var(--color-on-background), font-weight 700, mt-4
- Description: p, var(--color-outline), text-sm, leading-relaxed, mt-2
- Left border accent: 3px solid linear-gradient(primary → transparent) on card left edge
- Hover: translateY(-4px), border intensifies, icon scales 1.1

6 Values:
  1. "Systems Thinking" — holistic view of pipelines and dependencies
  2. "Production-First" — every model must be deployable
  3. "Reproducibility" — versioned data, code, and experiments always
  4. "Clarity in Complexity" — simplify, document, communicate well
  5. "Continuous Learning" — research → implementation loop
  6. "Ethical AI" — fairness, transparency, impact awareness
```

### Component Breakdown

| Component | Location | 3D Integration | Motion |
|---|---|---|---|
| `BioSection` | `sections/about/` | `GlobeScene` background | SlideIn text, FadeUp header |
| `GlobeScene` | `components/3d/` | Rotating sphere mesh, violet tint | R3F useFrame autoRotate |
| `AvatarCard` | `sections/about/` | None | float animation (CSS) |
| `ValuesSection` | `sections/about/` | None | StaggerChildren, ScaleOnHover |

### Technical Implementation Details

```
PERFORMANCE:
  - GlobeScene: low-poly sphere (32 segments), wireframe=true for weight
  - frameloop="demand" when globe not in viewport
  - Avatar image: Next.js <Image> priority={true} since above fold

ACCESSIBILITY:
  - Globe canvas: aria-hidden="true"
  - Bio section: semantic <article> tag
  - Value cards: role="article" with aria-label

SEO:
  export const metadata: Metadata = {
    title: 'About — [Name]',
    description: 'Learn about my background in data science and AI engineering...',
  }
```

---

## Page 03 — Expertise (`/expertise`)

### Full Implementation Prompt

```
Build the Expertise page. FILE: src/app/expertise/page.tsx

SECTIONS: PageHeader → StatsRow → SkillsGrid → TechStackSection → ServicesSection

═══════════════════════════════════════════════════════
SECTION 1 — StatsRow  (src/components/sections/expertise/StatsRow.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Full-width glass-card strip, padding 48px, margin-top 80px
- 4 stats in a row (flex justify-around), dividers between each

STATS (CountUp animation on viewport entry):
  "5+"   — Years of Experience
  "30+"  — Projects Delivered
  "15+"  — ML Models in Production
  "8+"   — Enterprise Clients

Each stat: number in var(--text-h1) with gradient-text, label in var(--color-outline) text-sm

═══════════════════════════════════════════════════════
SECTION 2 — SkillsGrid  (src/components/sections/expertise/SkillsGrid.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap)
- SectionHeader: eyebrow "Technical Skills", h2 "What I Work With"
- 3D background: NeuralNetworkScene full-width behind section (lazy, ssr:false),
  opacity 0.12, z-index -1, pointer-events none
  Neural network: nodes (spheres) connected by animated lines (tube geometry),
  node colours alternate between var(--palette-violet-core) and var(--palette-accent-teal),
  signal particles travel along edges (lerp animation via useFrame)

CATEGORIES (left sidebar nav on desktop):
  Machine Learning · MLOps · Data Engineering · Agent Systems · Cloud & Infra · Backend

SKILL CARDS (filtered by active category):
- 2-column grid, each card: glass-card, padding 20px
- Skill name: font-sans, font-weight 600, var(--color-on-background)
- Proficiency label (Expert / Advanced / Proficient): font-mono text-xs, right-aligned,
  color mapped: Expert→accent, Advanced→primary-light, Proficient→outline
- ProgressBar: height var(--progress-height), fill gradient-primary,
  width animated from 0 to value% on viewport entry (spring, duration 1s)
- Tool row: small inline icon + name for related tools

Category filter tabs: glass-btn style, active state bg var(--color-primary) text white

═══════════════════════════════════════════════════════
SECTION 3 — TechStackSection  (src/components/sections/expertise/TechStackSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap)
- SectionHeader: eyebrow "Tools & Frameworks", h2 "The Full Stack"
- Infinite horizontal scroll strip (marquee effect using Framer Motion animate x):
  Two identical rows, Row 1 scrolls left, Row 2 scrolls right (slower)
  Each item: glass-card 120px × 64px, SVG logo centred, tooltip on hover
  Logos: Python, PyTorch, TensorFlow, scikit-learn, LangChain, Airflow, dbt,
         Spark, Kafka, Docker, Kubernetes, Terraform, FastAPI, PostgreSQL, AWS, GCP

═══════════════════════════════════════════════════════
SECTION 4 — ServicesSection  (src/components/sections/expertise/ServicesSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap), padding-bottom 160px
- SectionHeader: eyebrow "What I Do", h2 "Services & Expertise"
- 3-column grid desktop, 1-col mobile, StaggerChildren

SERVICE CARD:
- glass-card, padding 32px, min-height 280px
- Top: numbered label "01" / "02" etc — font-mono, var(--color-outline), text-2xl
- Title: h3, var(--color-primary-light), font-weight 700, mt-4
- Description: p, var(--color-outline), text-sm
- Tool tags (bottom): 3-4 Badge components
- Hover: animated border gradient (border-flow keyframe), subtle glow

6 Services:
  01 ML Pipeline Architecture — end-to-end model lifecycle
  02 AI Agent Systems — LLM orchestration, tool use, memory
  03 MLOps & Infrastructure — CI/CD for ML, monitoring, drift detection
  04 Data Engineering — ingestion, transformation, warehousing
  05 NLP & LLM Integration — fine-tuning, RAG, embedding pipelines
  06 Analytics & Dashboards — BI tools, metric frameworks, KPIs
```

### Component Breakdown

| Component | Location | 3D Integration | Motion |
|---|---|---|---|
| `StatsRow` | `sections/expertise/` | None | CountUp springs |
| `SkillsGrid` | `sections/expertise/` | `NeuralNetworkScene` bg | ProgressBar spring fill |
| `NeuralNetworkScene` | `components/3d/` | Nodes + tube edges + signal particles | R3F useFrame lerp |
| `TechStackSection` | `sections/expertise/` | None | Framer Motion x scroll marquee |
| `ServicesSection` | `sections/expertise/` | None | StaggerChildren, border-flow |

### Technical Implementation Details

```
3D NEURAL NETWORK:
  - Nodes: InstancedMesh (SphereGeometry 0.08, 40 nodes)
  - Edges: TubeGeometry generated between node pairs (CatmullRomCurve3)
  - Signal particles: InstancedMesh (SphereGeometry 0.03),
    position lerped along edge curves using t=((Date.now()*speed)%1)
  - Performance: edgeCount ≤ 60, particleCount ≤ 80 per edge
  - Mobile: reduce to 20 nodes, 30 edges, disable particles

MARQUEE PERFORMANCE:
  - Use CSS animation (translate) not JS for marquee — GPU composited
  - Pause on prefers-reduced-motion
  - Duplicate list items to create seamless loop

TYPESCRIPT:
  interface SkillItem {
    name: string;
    proficiency: number;       // 0-100
    level: 'Expert' | 'Advanced' | 'Proficient';
    tools: string[];
    category: SkillCategory;
  }
```

---

## Page 04 — Projects Index (`/projects`)

### Full Implementation Prompt

```
Build the Projects index page. FILE: src/app/projects/page.tsx

SECTIONS: PageHeader → ProjectFilters → ProjectsGrid

═══════════════════════════════════════════════════════
SECTION 1 — ProjectFilters  (src/components/sections/projects/ProjectFilters.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Sticky horizontal filter bar, top: var(--header-height), z-index var(--z-raised)
- Background: glass-header utility (blurred, semi-transparent)
- Filter chips: scrollable row of Badge/Button components
  Categories: All · Machine Learning · MLOps · Data Engineering · AI Agents ·
               NLP · Computer Vision · Analytics
- Active chip: bg var(--color-primary), text white, shadow var(--shadow-glow-primary)
- Inactive chip: var(--tag-bg) bg, var(--tag-text) color
- Transition: background + shadow spring on selection change
- Result count: "Showing 12 projects" — font-mono text-xs var(--color-outline) right-aligned
- Sort dropdown: "Latest · A-Z · Most Complex" — glass-card dropdown, right side

═══════════════════════════════════════════════════════
SECTION 2 — ProjectsGrid  (src/components/sections/projects/ProjectsGrid.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- CSS grid: 3 columns desktop, 2 tablet, 1 mobile, gap-6
- Animated layout transition: AnimatePresence + layout prop on each card
  so cards re-flow with spring animation on filter change
- padding-top 40px

PROJECT CARD DESIGN (ProjectCard component):
- glass-card, overflow hidden, cursor pointer
- Image area (top 55%): Next.js Image cover, aspect-16/9
  Gradient overlay: linear-gradient(180deg, transparent 40%, var(--color-background) 100%)
  Status badge overlay (top-right): "Live" / "In Dev" / "Archived"
    "Live": glow-dot + "Live" text in var(--color-accent)
    Positioned absolute, top-3 right-3, glass-card micro
- Card body (bottom 45%):
  - Category eyebrow: var(--eyebrow-label) utility
  - Title: h3, var(--color-on-background), font-weight 700, 2-line clamp
  - Description: p text-sm var(--color-outline), 3-line clamp
  - Tech badges: flex-wrap row of Badge components (max 4, +N more)
  - Footer: year label left + "Explore →" glass-link right
- Hover state:
  - Image: scale(1.04) via CSS transform on img
  - Card: translateY(-4px), shadow glow
  - 3D tilt: mouse-position based rotateX/Y (±6deg max) via ProjectCardScene
  - The "Explore →" arrow translates +4px on hover

EMPTY STATE:
- If filtered results = 0: centered illustration + "No projects match this filter"
  with "Clear Filters" button
```

### Component Breakdown

| Component | Location | 3D Integration | Motion |
|---|---|---|---|
| `ProjectFilters` | `sections/projects/` | None | Spring chip transitions |
| `ProjectsGrid` | `sections/projects/` | None | AnimatePresence layout shift |
| `ProjectCard` | `sections/projects/` | `ProjectCardScene` hover tilt | translateY hover, image scale |
| `ProjectCardScene` | `components/3d/` | Perspective tilt (CSS 3D + R3F) | Mouse position transform |

### Technical Implementation Details

```
STATE MANAGEMENT:
  - Active filter: useState<string> in page — passed as prop to sections
  - Filtering: useMemo on data/projects.ts array
  - AnimatePresence key={activeFilter} to trigger exit/enter animations

TYPESCRIPT:
  interface ProjectItem {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    category: ProjectCategory;
    status: 'live' | 'in-dev' | 'archived';
    techStack: string[];
    coverImage: string;
    githubUrl?: string;
    liveUrl?: string;
    year: number;
    featured: boolean;
    complexity: 1 | 2 | 3 | 4 | 5;
  }

PERFORMANCE:
  - All project images: Next.js <Image> with sizes="(max-width: 640px) 100vw,
    (max-width: 1024px) 50vw, 33vw" and blurDataURL placeholder
  - ProjectCard: memo-wrapped to prevent unnecessary re-renders on filter change
```

---

## Page 05 — Project Detail (`/projects/[slug]`)

### Full Implementation Prompt

```
Build the Project Detail page. FILE: src/app/projects/[slug]/page.tsx
DATA: src/content/projects/[slug].mdx via lib/mdx.ts

SECTIONS: ProjectHero → ProjectDetail (MDX) → RelatedProjects

═══════════════════════════════════════════════════════
SECTION 1 — ProjectHero
═══════════════════════════════════════════════════════

LAYOUT:
- Full-width hero, height 65vh, relative
- Full-bleed cover image: Next.js Image fill, object-cover
- Gradient overlay: linear-gradient(to bottom, rgba(21,18,25,0.3), rgba(21,18,25,1))
- Absolute bottom content block (padding-bottom 64px):
  - Breadcrumb: "Projects / Title" — font-mono xs var(--color-outline)
  - Category eyebrow + Status badge (inline flex)
  - H1: project title, var(--text-h1) white, font-weight 800, max-width 840px
  - Tech stack badges (flex-wrap gap-2)
  - Meta row: Year · Complexity stars (1-5 filled stars) · Role · Duration

═══════════════════════════════════════════════════════
SECTION 2 — ProjectDetail  (src/components/sections/projects/ProjectDetail.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Two-column: 70% main content / 30% sticky sidebar (desktop only, becomes stacked mobile)

MAIN CONTENT:
- MDX-rendered prose via <PostBody> component using .prose styles from mdx.css
- Sections expected in MDX: Overview, Problem, Solution, Architecture, Results, Lessons
- Architecture diagram: if present in MDX, rendered as <Image> with glass border + caption

STICKY SIDEBAR (glass-card, position sticky top calc(header-height + 32px)):
- "Project Info" heading (font-mono text-xs eyebrow-label)
- Info rows (icon + label + value):
    Role, Timeline, Team size, Status (live badge), GitHub link, Live URL
- Divider
- Tech stack full list (vertical, each item with icon)
- Divider
- "Back to Projects ←" glass-link
- "Next Project →" glass-link

═══════════════════════════════════════════════════════
SECTION 3 — Related Projects (3 cards)
═══════════════════════════════════════════════════════
- Same category or shared tech stack
- Heading: "More Projects" — SectionHeader
- 3-column grid of ProjectCard (mini variant — no description, just title + tags)
- Entrance: StaggerChildren FadeUp
```

### Component Breakdown

| Component | Location | Motion |
|---|---|---|
| `ProjectDetail` | `sections/projects/` | SlideIn sidebar, FadeUp content |
| `PostBody` | `sections/blog/` (reused) | None (static MDX) |
| `RelatedProjects` | `sections/projects/` | StaggerChildren |

### Technical Implementation Details

```
STATIC GENERATION:
  export async function generateStaticParams() {
    const projects = await getAllProjectSlugs();   // from lib/mdx.ts
    return projects.map(slug => ({ slug }));
  }

  export async function generateMetadata({ params }): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug);
    return {
      title: `${project.title} — [Name]`,
      description: project.description,
      openGraph: { images: [project.coverImage] },
    };
  }

MDX FRONTMATTER TYPE:
  interface ProjectFrontmatter {
    title: string;
    description: string;
    category: ProjectCategory;
    status: ProjectStatus;
    coverImage: string;
    techStack: string[];
    year: number;
    githubUrl?: string;
    liveUrl?: string;
    role: string;
    duration: string;
    teamSize: number;
    complexity: 1 | 2 | 3 | 4 | 5;
  }
```

---

## Page 06 — Journey (`/journey`)

### Full Implementation Prompt

```
Build the Journey page. FILE: src/app/journey/page.tsx

SECTIONS: PageHeader → TimelineSection → EducationSection

═══════════════════════════════════════════════════════
SECTION 1 — TimelineSection  (src/components/sections/journey/TimelineSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap)
- SectionHeader: eyebrow "Career Path", h2 "The Journey So Far"
- Center-aligned vertical timeline on desktop (alternating left/right), 
  single left-rail timeline on mobile

TIMELINE LINE:
- Vertical line: 2px, background var(--gradient-timeline-line) 
  top-to-bottom (primary → accent)
- Line animates height from 0 → 100% as user scrolls (scaleY transform origin top,
  driven by useScrollProgress scoped to section bounds)

TIMELINE ENTRY (TimelineEntry component):
- Alternating: even entries content LEFT of line, odd entries content RIGHT
- Mobile: all entries to the right, condensed
- Dot: 14px circle on the line, bg var(--color-primary), 
  ring: 4px solid rgba(95,45,166,0.2)
  Active/visible dot: bg var(--color-accent), ring glows
- Content card: glass-card, max-width 440px, padding 28px
  - Date range: font-mono text-xs var(--color-accent), eyebrow-label
  - Role/Title: h3 var(--color-on-background) font-weight 700
  - Company/Org: p text-sm var(--color-primary-light)
  - Description: p text-sm var(--color-outline) mt-2
  - Achievement bullets: 2-3 items, each with accent-colored checkmark icon
  - Tags: tech stack badges, flex-wrap
- Entrance: SlideIn from left/right matching alternation, whileInView once

═══════════════════════════════════════════════════════
SECTION 2 — EducationSection  (src/components/sections/journey/EducationSection.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- padding-top var(--spacing-section-gap)
- SectionHeader: eyebrow "Education", h2 "Academic Foundation"
- 2-column grid desktop, 1-col mobile, gap-6

EDUCATION CARD:
- glass-card, padding 32px
- Top row: institution icon/logo + name (h4) + year range (font-mono right)
- Degree: p var(--color-primary-light) font-weight 600 mt-2
- Field / Major: p var(--color-outline) text-sm
- Key Courses: flex-wrap chip list (max 5 shown, +N more tooltip)
- Thesis / Capstone: italic text-sm var(--color-outline) if applicable
- GPA or Honours: accent badge if present
- Entrance: FadeUp staggered
```

### Component Breakdown

| Component | Location | Motion |
|---|---|---|
| `TimelineSection` | `sections/journey/` | Line scaleY scroll-driven, SlideIn entries |
| `TimelineEntry` | `sections/journey/` | SlideIn alternating left/right, dot scale |
| `EducationSection` | `sections/journey/` | StaggerChildren FadeUp |

### Technical Implementation Details

```
SCROLL-DRIVEN LINE:
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  <motion.div style={{ scaleY, transformOrigin: 'top' }} />

TYPESCRIPT:
  interface JourneyEntry {
    id: string;
    type: 'work' | 'education' | 'award' | 'project';
    title: string;
    organisation: string;
    dateStart: string;
    dateEnd: string | 'Present';
    description: string;
    achievements: string[];
    techStack?: string[];
    location?: string;
    url?: string;
  }

ACCESSIBILITY:
  - Timeline: <ol> with role="list" semantics
  - Each entry: <li> with aria-label="[Role] at [Company], [dates]"
  - Decorative dots: aria-hidden="true"
```

---

## Page 07 — Contact (`/contact`)

### Full Implementation Prompt

```
Build the Contact page. FILE: src/app/contact/page.tsx

SECTIONS: PageHeader → ContactGrid (Form + Info side-by-side) → FAQStrip

═══════════════════════════════════════════════════════
CONTACT GRID LAYOUT:
═══════════════════════════════════════════════════════

Two-column: 55% form / 45% info (desktop), stacked on mobile (info above form on mobile).
padding-top 80px, padding-bottom var(--spacing-section-gap)
3D element: GlobeScene as ambient background (opacity 0.15, z-index -1, lazy)

═══════════════════════════════════════════════════════
LEFT — ContactForm  (src/components/sections/contact/ContactForm.tsx)
═══════════════════════════════════════════════════════

DESIGN:
- glass-card wrapper, padding 40px
- Heading: h2 "Send a Message" — var(--gradient-text-primary)
- Subline: "I typically respond within 24 hours."

FORM FIELDS (client component, 'use client'):
- Name: full-width text input
  Style: bg var(--input-bg), border var(--input-border), border-radius var(--input-radius),
         padding var(--input-padding), color var(--input-text)
  Focus: border-color var(--input-border-focus), box-shadow 0 0 0 3px rgba(95,45,166,0.15)
  Label: font-mono text-xs eyebrow-label above input
  Error state: border var(--color-error), error message text-xs below

- Email: same styling, type="email", validation on blur
- Subject: select dropdown with glass styling, options: 
    "Project Collaboration · Consulting · Speaking · Research · Job Opportunity · Other"
- Message: textarea, min-height 160px, resize-y, same styling
- Consent checkbox: custom styled checkbox, label text-sm var(--color-outline)

SUBMIT BUTTON:
- "Send Message →" — full-width, accent filled btn
- Loading state: spinner icon replaces arrow, text "Sending..."
- Success state: checkmark icon + "Message Sent!" — bg var(--color-success) tinted

STATE HANDLING (useContactForm hook):
  { name, email, subject, message, isLoading, isSuccess, errors }
  Validation: required fields, email regex, message min 20 chars
  Submission: Next.js Server Action (POST /api/contact)
  Toast: ToastProvider — success/error notification

═══════════════════════════════════════════════════════
RIGHT — ContactInfo  (src/components/sections/contact/ContactInfo.tsx)
═══════════════════════════════════════════════════════

DESIGN:
- Stacked vertically, padding-left 48px on desktop
- "Let's Connect" h2 (gradient-text)
- Intro paragraph: availability, timezone, preferred communication

INFO BLOCKS (each: icon + label + value):
  📧 Email: hello@[domain].com — ExternalLink
  📍 Location: [City, Country] — Remote Friendly
  🕐 Timezone: UTC+5:00 (PKT)  
  💼 Availability: "Open to new projects" — green glow-dot badge
  🔗 Schedule: "Book a 30-min call" — Calendly ExternalLink with accent colour

SocialLinks component (src/components/sections/contact/SocialLinks.tsx):
- flex row gap-4, margin-top 32px
- Each: 44px × 44px glass-card rounded-full, centered SVG icon
- Hover: icon colour → var(--color-accent), shadow var(--shadow-glow-accent),
  transform scale(1.1)
- Platforms: GitHub · LinkedIn · X/Twitter · Kaggle · Medium · HuggingFace
- Tooltip: platform name on hover

═══════════════════════════════════════════════════════
FAQ STRIP (optional, bottom):
═══════════════════════════════════════════════════════
- 3-4 common questions in accordion (glass-card per item)
- Expand/collapse: AnimatePresence height animation (0 → auto)
- Questions: "What types of projects do you take on?" / 
             "What is your typical engagement model?" / 
             "Do you work with international clients?"
```

### Component Breakdown

| Component | Location | 3D Integration | Motion |
|---|---|---|---|
| `ContactForm` | `sections/contact/` | None | Input focus springs, submit states |
| `ContactInfo` | `sections/contact/` | `GlobeScene` ambient bg | FadeUp stagger, social hover |
| `SocialLinks` | `sections/contact/` | None | Scale + color spring on hover |
| `GlobeScene` | `components/3d/` | Rotating violet sphere | R3F useFrame |

### Technical Implementation Details

```
SERVER ACTION (src/app/actions/contact.ts):
  'use server'
  export async function submitContactForm(formData: FormData): Promise<ActionResult> {
    // Validate, sanitize, send via Resend/Nodemailer
    // Rate limit via upstash/ratelimit
    // Return { success: boolean, error?: string }
  }

VALIDATION (client-side):
  - Name: required, min 2 chars
  - Email: required, RFC 5322 regex
  - Subject: required (select)
  - Message: required, min 20 chars, max 2000 chars

ACCESSIBILITY:
  - All inputs: associated <label> with htmlFor
  - Error messages: aria-live="polite" aria-describedby on input
  - Submit button: aria-busy={isLoading}
  - Success: aria-live="assertive" announcement

SPAM PROTECTION:
  - Honeypot field (hidden, CSS display:none, not visibility:hidden)
  - reCAPTCHA v3 or Cloudflare Turnstile (invisible)
  - Server-side rate limiting: 3 submissions per IP per hour
```

---

## Page 08 — Blog Index (`/blog`)

### Full Implementation Prompt

```
Build the Blog index page. FILE: src/app/blog/page.tsx

SECTIONS: PageHeader → CategoryFilter → PostGrid

═══════════════════════════════════════════════════════
PAGE HEADER (blog-specific variant):
═══════════════════════════════════════════════════════
- Height 320px, full-width
- Animated particle field background (ParticleField component, subtle, 80 particles)
- Centered content:
    Eyebrow: "Writing & Research"
    H1: "The Blog" — var(--gradient-text)
    Subline: "Thoughts on AI systems, ML engineering, and the future of intelligent software."
    Post count pill: "42 Articles" — glass-card micro pill

═══════════════════════════════════════════════════════
SECTION 1 — CategoryFilter  (src/components/sections/blog/CategoryFilter.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Sticky horizontal row below header, glass-header background
- Category chips: All · Machine Learning · MLOps · AI Agents · Data Engineering ·
                   LLMs · Opinion · Tutorials
- Search input (right side): 320px wide, glass-card style, magnifying-glass icon prefix
  Debounced (300ms) search across title + tags + excerpt
  Clear button appears on input, FadeIn animation

═══════════════════════════════════════════════════════
SECTION 2 — Featured Post (top, full-width):
═══════════════════════════════════════════════════════
- Latest/pinned post: full-width glass-card, landscape layout
- Left 50%: large cover image with gradient overlay
- Right 50%: category, title (var(--text-h2)), excerpt (3 lines), author row,
  "Read Article →" accent button
- Tag: "Featured" accent badge overlaying the image corner
- Entrance: FadeIn from scale(0.96)

═══════════════════════════════════════════════════════
SECTION 3 — PostGrid  (src/components/sections/blog/PostGrid.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- 3-column grid desktop, 2-col tablet, 1-col mobile, gap-6, margin-top 40px

POSTCARD DESIGN  (src/components/sections/blog/PostCard.tsx):
- glass-card, overflow hidden
- Top: Cover image aspect-16/9, Next.js Image
- Body (padding 24px):
  - Category badge (var(--tag-bg-accent) / var(--tag-text-accent)) + reading-time badge right
  - Title: h3 var(--color-on-background) font-weight 700, 2-line clamp
  - Excerpt: p text-sm var(--color-outline) 3-line clamp, mt-2
  - Author row (bottom, mt-auto):
    - Avatar: 32px circle, glass-avatar micro
    - Name: text-sm font-weight 500
    - Date: text-xs font-mono var(--color-outline) (e.g. "Jan 15, 2025")
- Hover: image scale(1.04), card translateY(-3px), border intensifies
- Tag chips below author: 2-3 small tags

PAGINATION:
- "Load More" button or infinite scroll (IntersectionObserver trigger)
  New cards: AnimatePresence FadeUp
```

### Component Breakdown

| Component | Location | 3D Integration | Motion |
|---|---|---|---|
| `PostGrid` | `sections/blog/` | None | StaggerChildren, AnimatePresence load-more |
| `PostCard` | `sections/blog/` | None | Image scale hover, translateY |
| `CategoryFilter` | `sections/blog/` | None | Spring chip transitions |
| `ParticleField` | `components/3d/` | Canvas particles | R3F useFrame drift |

### Technical Implementation Details

```
DATA FETCHING:
  // lib/mdx.ts
  export async function getAllPosts(): Promise<PostMeta[]> {
    const files = await fs.readdir(path.join(process.cwd(), 'src/content/blog'));
    return Promise.all(files.map(async (file) => {
      const source = await fs.readFile(...);
      const { data } = matter(source);
      return { ...data, slug: file.replace('.mdx','') } as PostMeta;
    })).then(posts => posts.sort((a,b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ));
  }

MDX FRONTMATTER:
  interface PostFrontmatter {
    title: string;
    excerpt: string;
    publishedAt: string;      // ISO 8601
    updatedAt?: string;
    category: BlogCategory;
    tags: string[];
    coverImage: string;
    author: { name: string; avatar: string; };
    featured?: boolean;
    draft?: boolean;
    readingTime?: number;     // auto-computed via readingTime.ts
  }

SEO:
  - Dynamic OG image generation via Next.js ImageResponse (app/blog/opengraph-image.tsx)
  - JSON-LD BlogPosting schema per post
```

---

## Page 09 — Blog Post (`/blog/[slug]`)

### Full Implementation Prompt

```
Build the Blog post detail page. FILE: src/app/blog/[slug]/page.tsx

SECTIONS: PostHeader → PostLayout (Body + Sidebar TOC) → AuthorCard → RelatedPosts

═══════════════════════════════════════════════════════
SECTION 1 — PostHeader  (src/components/sections/blog/PostHeader.tsx)
═══════════════════════════════════════════════════════

LAYOUT:
- Full-width, height 480px, relative
- Cover image: Next.js Image fill object-cover
- Gradient overlay: linear-gradient(to bottom, rgba(21,18,25,0.2) 0%, rgba(21,18,25,1) 85%)
- Centered bottom content:
  - Category badge + reading time badge (inline flex gap-2)
  - H1: post title, var(--text-h1), white, font-weight 800, max-width 800px, text-balance
  - Excerpt: p text-lg var(--color-outline) mt-4 max-width 640px
  - Author + date row:
      Avatar (glass-avatar 40px) + name + "·" + date + "·" + reading-time
  - Tag chips: flex-wrap gap-2

SCROLL PROGRESS:
- Full-width progress bar at very top of viewport (position fixed),
  height var(--scroll-bar-height) 3px,
  background var(--gradient-primary),
  width driven by scroll position within article content bounds

═══════════════════════════════════════════════════════
SECTION 2 — PostLayout  (PostBody + PostToc)
═══════════════════════════════════════════════════════

DESKTOP LAYOUT:
- 70% article body / 30% sticky TOC sidebar
- Article: <article> semantic tag, .prose class, padding-top 64px

SIDEBAR TOC  (src/components/sections/blog/PostToc.tsx):
- glass-card, padding 24px, sticky top calc(header-height + 32px)
- Heading: "Contents" — eyebrow-label
- List of H2/H3 headings extracted from MDX:
  Each item: glass-link utility, indent H3 by 12px
  Active heading (in viewport): color var(--color-accent), font-weight 600,
  left border 2px solid var(--color-accent)
  Transition: background-color spring on active change
  Active tracking: IntersectionObserver on all heading elements (useActiveSection hook)
- Progress indicator: subtle fill behind active item
- "Back to top" link at bottom: ↑ icon + text

MOBILE LAYOUT:
- TOC collapses to accordion at top of article (expand on tap)
- Same styling, full-width

═══════════════════════════════════════════════════════
SECTION 3 — AuthorCard  (bottom of article)
═══════════════════════════════════════════════════════

- glass-card, flex row, padding 32px, margin-top 64px
- Left: Avatar (glass-avatar 72px) + FloatingOrb subtle ambient
- Right: Name h4, Role p-sm var(--color-outline), short bio 2 sentences
- Social links row: SocialLinks mini variant (GitHub, LinkedIn, X)
- "All posts by [Name] →" glass-link

═══════════════════════════════════════════════════════
SECTION 4 — RelatedPosts  (3 PostCards)
═══════════════════════════════════════════════════════

- Heading: "Keep Reading" — SectionHeader
- Same category + matching tags, 3 PostCard components in a row
- Entrance: StaggerChildren FadeUp
```

### Component Breakdown

| Component | Location | Motion |
|---|---|---|
| `PostHeader` | `sections/blog/` | FadeUp on mount |
| `PostBody` | `sections/blog/` | Static MDX, prose styles |
| `PostToc` | `sections/blog/` | Active heading spring transition |
| `ScrollProgress` | `layout/` (reused) | Scroll-driven width |
| `RelatedPosts` | `sections/blog/` | StaggerChildren |

### Technical Implementation Details

```
STATIC GENERATION:
  export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.filter(p => !p.draft).map(p => ({ slug: p.slug }));
  }

TOC EXTRACTION:
  // lib/mdx.ts
  export function extractToc(content: string): TocItem[] {
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    return [...content.matchAll(headingRegex)].map(match => ({
      text: match[1],
      level: match[0].startsWith('###') ? 3 : 2,
      id: slugify(match[1]),
    }));
  }

MDX COMPONENTS MAP (components/ui/CodeBlock.tsx + others):
  const mdxComponents: MDXComponents = {
    code: CodeBlock,           // syntax-highlighted
    img: (props) => <Image />, // Next.js optimised
    a: ExternalLink,           // safe external links
    blockquote: Callout,       // styled callout box
  };

JSON-LD SCHEMA:
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImage,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt ?? post.publishedAt,
    "author": { "@type": "Person", "name": post.author.name },
  })}</script>

ACCESSIBILITY:
  - article has aria-labelledby pointing to H1 id
  - TOC nav: aria-label="Table of contents"
  - Progress bar: role="progressbar" aria-valuenow aria-valuemax
```

---

## ━━━ PART 3 — GLOBAL LAYOUT COMPONENTS ━━━

---

### Header (`src/components/layout/Header.tsx`)

```
DESIGN SPEC:
- Height var(--header-height) 72px, shrinks to var(--header-height-scrolled) 56px on scroll
- Background: transparent at top → glass-header (backdrop-blur) after 80px scroll
  Framer Motion AnimatePresence for background transition
- Max-width 1280px centered, padding-inline var(--spacing-page-margin)
- Left: Logo component (SVG monogram + wordmark text in Space Grotesk)
- Center (desktop): NavLinks — horizontal list of 6 links (Home/About/Expertise/
  Projects/Journey/Contact/Blog) — glass-link utility
  Active link: var(--color-primary-light) + underline accent
- Right: 
    "Hire Me" glass-btn (accent variant, MagneticButton wrapped)
    Mobile: hamburger (3 lines → × animated with Framer Motion)
- Mobile nav: MobileNav drawer (Drawer component, SlideIn from right)
  glass background, full-height, all nav links stacked vertically
- z-index: var(--z-header)
- ScrollProgress bar: positioned at very top of header (3px height)

SCROLL BEHAVIOUR:
  const { scrollY } = useScroll();
  const isScrolled = useTransform(scrollY, [0, 80], [0, 1]);
  — drives background opacity and height transitions
```

### Footer (`src/components/layout/Footer.tsx`)

```
DESIGN SPEC:
- Full-width, padding 64px vertical
- Background: var(--color-surface-container-lowest) with gradient-top fade
- 4-column grid desktop (Brand / Nav / Socials / Newsletter), stacked mobile
  Col 1: Logo + tagline + availability badge
  Col 2: Navigation links (vertical list, glass-link)
  Col 3: Social links (SocialLinks component)
  Col 4: "Stay Updated" mini email input + subscribe button (optional)
- Divider: gradient hr
- Bottom bar: © 2025 [Name] · All rights reserved · Privacy · Back to top ↑
- Back to top: ScrollToTop component, FAB positioned bottom-right (fixed)
```

---

## ━━━ PART 4 — CROSS-CUTTING CONCERNS ━━━

---

### Animation System (`src/components/animations/variants.ts`)

```typescript
// Central Framer Motion variant library
// All animation wrappers import from here — no inline variant objects in components

export const FADE_UP_VARIANTS = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const FADE_IN_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const SCALE_IN_VARIANTS = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export const SLIDE_IN_LEFT_VARIANTS = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
};

export const SLIDE_IN_RIGHT_VARIANTS = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } },
};

export const STAGGER_CONTAINER_VARIANTS = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const PAGE_TRANSITION_VARIANTS = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } },
};

// Reduced motion overrides (applied conditionally via useReducedMotion)
export const REDUCED_MOTION_VARIANTS = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
```

---

### Performance Budgets

| Asset | Target | Strategy |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | Priority image preload, font preload |
| TBT (Total Blocking Time) | < 200ms | 3D lazy-loaded, code-split per page |
| CLS (Cumulative Layout Shift) | < 0.05 | Image dimensions always defined |
| Bundle size (initial JS) | < 120kB gzipped | R3F tree-shaken, animations chunk-split |
| 3D scene load | < 1.5s | DRACO compression if using GLTF, InstancedMesh |
| Font FOUT | 0ms | `font-display: swap` + preload links |

---

### Accessibility Checklist (All Pages)

```
✅ Semantic HTML5 landmarks: <header> <main> <nav> <footer> <article> <section>
✅ Heading hierarchy: exactly one H1 per page, no skipped levels
✅ All images: descriptive alt text (decorative: alt="" + aria-hidden="true")
✅ All 3D canvases: aria-hidden="true" (purely decorative)
✅ Interactive elements: min touch target 44×44px
✅ Color contrast: WCAG AA minimum (4.5:1 for body text, 3:1 for large text)
✅ Focus visible: --color-primary outline on all focusable elements
✅ Keyboard navigation: full tab order, no focus traps outside modals
✅ Skip link: "Skip to main content" visually hidden, visible on focus (top of layout)
✅ Reduced motion: all animations respect prefers-reduced-motion via useReducedMotion
✅ Screen reader: ARIA live regions for dynamic content (form errors, toasts, CountUp)
✅ Form labels: all inputs labelled via htmlFor, errors linked via aria-describedby
✅ Language: <html lang="en"> in root layout
```

---

### SEO Implementation Map

| Page | Title Pattern | Description | OG Image | Schema |
|---|---|---|---|---|
| Home | `[Name] — AI Engineer & Data Scientist` | Portfolio intro | `/images/og-image.png` | `Person`, `WebSite` |
| About | `About — [Name]` | Bio paragraph excerpt | Same OG | `Person` |
| Expertise | `Expertise — [Name]` | Skills summary | Same OG | `Person` |
| Projects | `Projects — [Name]` | "Explore [N] projects..." | Same OG | `ItemList` |
| Project [slug] | `[Title] — [Name]` | Project description | Project cover | `SoftwareApplication` |
| Journey | `Journey — [Name]` | "Career timeline of..." | Same OG | `Person` |
| Contact | `Contact — [Name]` | Availability statement | Same OG | `ContactPage` |
| Blog | `Blog — [Name]` | "Thoughts on AI..." | Same OG | `Blog` |
| Blog [slug] | `[Post Title] — [Name]` | Post excerpt | Post cover | `BlogPosting` |

---

*This document is the canonical specification for the entire portfolio build. Every prompt derives tokens exclusively from the Mystical Black Lotus design system. Implement strictly in order: Global CSS → Layout → Pages 01–09. Zero deviations from the Design Truth Layer.*