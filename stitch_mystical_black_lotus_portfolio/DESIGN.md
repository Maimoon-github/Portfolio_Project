---
name: Mystical Black Lotus System
colors:
  surface: '#151219'
  surface-dim: '#151219'
  surface-bright: '#3c3840'
  surface-container-lowest: '#100d14'
  surface-container-low: '#1d1a22'
  surface-container: '#221e26'
  surface-container-high: '#2c2830'
  surface-container-highest: '#37333b'
  on-surface: '#e8e0eb'
  on-surface-variant: '#cdc3d4'
  inverse-surface: '#e8e0eb'
  inverse-on-surface: '#332f37'
  outline: '#968e9e'
  outline-variant: '#4a4452'
  surface-tint: '#d6baff'
  primary: '#d6baff'
  on-primary: '#430089'
  primary-container: '#5f2da6'
  on-primary-container: '#cdadff'
  inverse-primary: '#7343bb'
  secondary: '#d8b9ff'
  on-secondary: '#401972'
  secondary-container: '#5a358c'
  on-secondary-container: '#cda8ff'
  tertiary: '#d7baff'
  on-tertiary: '#3c2261'
  tertiary-container: '#583e7e'
  on-tertiary-container: '#ccaef6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ecdcff'
  primary-fixed-dim: '#d6baff'
  on-primary-fixed: '#280057'
  on-primary-fixed-variant: '#5a27a1'
  secondary-fixed: '#eddcff'
  secondary-fixed-dim: '#d8b9ff'
  on-secondary-fixed: '#290055'
  on-secondary-fixed-variant: '#58338a'
  tertiary-fixed: '#eddcff'
  tertiary-fixed-dim: '#d7baff'
  on-tertiary-fixed: '#27094b'
  on-tertiary-fixed-variant: '#543a79'
  background: '#151219'
  on-background: '#e8e0eb'
  surface-variant: '#37333b'
  surface-midnight: '#131026'
  surface-navy: '#1F1A40'
  neo-mint: '#98FFD9'
  deep-moss: '#4a4452'
  violet-glow: rgba(95, 45, 166, 0.3)
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0em
  h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-page: 64px
  section-gap: 160px
  base-unit: 8px
  component-xs: 8px
  component-sm: 24px
  component-md: 48px
  component-lg: 64px
---

## Brand & Style

The design system is centered around the concept of a "Mystical Black Lotus"—a symbol of rare beauty emerging from the depths. It targets high-end creative professionals and technologists who require a portfolio that feels both mathematically precise and spiritually evocative. The emotional response is one of calm, focused awe, achieved through a "Dark Ethereal" aesthetic.

The design system blends **Minimalism** with **Glassmorphism**. It utilizes expansive whitespace (negative space) to allow content to breathe, while employing translucent layers and subtle luminescence to suggest depth. The interface should feel like a digital sanctuary: quiet, refined, and immersive.

## Colors

The palette is rooted in the transition from shadow to light. The **Dark Midnight** background provides a void-like canvas, while **Deep Navy** defines interactive surfaces. The core of the system is the **Deep Violet Core**, representing energy and focus.

**Neo-Mint** is reserved exclusively for high-priority calls to action and critical interactive states, providing a sharp, "techno-organic" contrast against the purple hues. **Deep Moss** is used for structural borders and subtle success states, grounding the more ethereal violet tones with an earthy, matte finish.

## Typography

This design system exclusively utilizes **Space Grotesk**. Its geometric construction complements the minimalist layout, while its idiosyncratic letterforms (like the 'a' and 'g') provide a technical, futuristic edge.

Readability is maintained through extreme contrast—pure white text on deep midnight backgrounds. Large display type should use tighter tracking to feel like a cohesive visual unit, while smaller labels should use generous letter spacing to ensure clarity and an editorial feel.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system centered on a 12-column structure. To maintain the "Atmospheric" quality, the design system utilizes aggressive vertical spacing (Section Gaps) to ensure that no two primary content blocks compete for the user's attention.

Margins are wide and consistent, pushing content toward the center to create a focused "gallery" experience. Component spacing should follow an 8px rhythmic scale, favoring larger increments (24px, 48px, 64px) to reinforce the minimalist aesthetic.

## Elevation & Depth

Depth is not communicated through heavy shadows, but through **Tonal Layering** and **Luminescence**. 

1.  **Base Layer:** Dark Midnight (#131026).
2.  **Surface Layer:** Deep Navy (#1F1A40) with a 1px Deep Moss border.
3.  **Floating Layer:** Glassmorphic panels with a 15% opacity white fill, 40px backdrop blur, and a subtle gradient stroke (Secondary Purple to Transparent).

Visual hierarchy is reinforced by "Glow Elevations." Instead of a black drop shadow, elevated elements use a soft, diffused violet outer glow (`box-shadow: 0 10px 40px -10px rgba(95, 45, 166, 0.3)`).

## Shapes

The shape language is "Soft-Geometric." The primary roundedness is subtle (0.25rem), keeping the UI feeling precise and architectural. 

- **Small elements (Buttons, Tags):** 0.25rem (rounded-sm).
- **Medium elements (Cards, Modals):** 0.75rem (rounded-lg).
- **Interactive States:** Subtle expansion or scaling (1.02x) rather than drastic shape changes.

Avoid fully rounded pill shapes unless used for specialized "status" indicators; the system relies on the strength of the rectangle to maintain its refined, professional tone.

## Components

### Buttons
Primary CTAs are high-impact: **Neo-Mint** backgrounds with black text for maximum visibility. Secondary buttons use a "Ghost" style: 1px borders with a **Deep Violet Core** glow on hover.

### Cards
Cards should utilize the **Glassmorphism** rules. They feature a 1px gradient border that transitions from #8B65BF at the top-left to transparent at the bottom-right. This simulates a "light source" hitting the edge of the lotus petal.

### Input Fields
Inputs are minimalist: Deep Navy backgrounds with a bottom-only border in Deep Moss. Upon focus, the border transitions to the Primary Deep Violet with a subtle inner glow.

### Chips & Tags
Used for skills or categories. These are dark and understated: Deep Navy background, Deep Moss 1px border, and labels in **Label-Caps** typography.

### Progress Indicators
Thin, 2px Neo-Mint lines. The high contrast against the dark background ensures they are visible despite their extreme minimalism.