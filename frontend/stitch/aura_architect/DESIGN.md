# Design System Specification: The Architectural Aura

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Blueprint"**

This design system transcends the typical "tech portfolio" aesthetic by merging the precision of high-level AI architecture with a warm, prosperous humanism. We are not building a static site; we are creating a digital sanctuary that feels both structurally sound and intellectually radiant. 

The system moves away from rigid, boxy layouts in favor of **Intentional Asymmetry**. By utilizing expansive white space (the "Radiant Golden-White") and overlapping elements, we create a sense of depth and motion. This is "Organic Brutalism"—where the geometric strength of *Space Grotesk* meets soft, atmospheric tonal layering to represent Maimoon’s unique position at the intersection of logic and creativity.

---

## 2. Colors: Tonal Atmosphere
The palette is rooted in an "Aura" concept. Instead of flat surfaces, we use color to simulate light and stability.

### The Palette
- **Primary Surface:** `background` (#f1fcf7) / Radiant Golden-White core (#FFFDF0). Use this as the canvas for clarity and "breath."
- **Functional Accents:** `primary_container` (#ffbf00) / Radiant Amber-Orange. Reserved for active states and creative sparks.
- **Trust & Stability:** `secondary` (#0060ac) / Soft Protective Blue. Used for technical details and grounding elements.
- **The Grounding Force:** `on_background` (#141e1b) / Deep Moss. Used for high-contrast typography and structural anchors.
- **Conversion Energy:** `tertiary_container` (#7adf7c) / Neo-Mint. Specifically for CTAs and "Success" states.

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** 
- Boundaries must be defined through background color shifts. A section might transition from `surface` (#f1fcf7) to `surface_container_low` (#ebf6f1) to denote a change in context.
- Use **Signature Textures**: Apply a subtle linear gradient (e.g., `primary` to `primary_container`) on large CTA buttons or hero accents to provide "soul" and depth.

---

## 3. Typography: The Geometric Voice
We use **Space Grotesk** exclusively. Its variable weight allows us to mimic the hierarchy of an architectural blueprint.

| Level | Token | Weight | Size | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | 700 (Bold) | 3.5rem | -0.02em | Hero statements; high-impact "hooks." |
| **Headline** | `headline-md` | 500 (Medium) | 1.75rem | -0.01em | Section titles; narrative headers. |
| **Title** | `title-lg` | 600 (Semi-Bold) | 1.375rem | 0 | Card titles; prominent sub-headers. |
| **Body** | `body-lg` | 300 (Light) | 1.0rem | +0.01em | Narrative text; heavy reading. |
| **Label** | `label-md` | 700 (Bold) | 0.75rem | +0.05em | Uppercase; metadata and categories. |

**The Editorial Strategy:** Pair a `display-lg` headline with an oversized `body-lg` paragraph. The contrast in weight conveys authority, while the geometric nature of the font suggests technical precision.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to create "lift"; we use **Tonal Layering** to create "presence."

- **The Layering Principle:** Treat the UI as stacked sheets of fine vellum. 
    - Base: `surface`
    - Layer 1 (Project Cards): `surface_container_low`
    - Layer 2 (Active/Hover): `surface_container_highest`
- **Glassmorphism:** For floating navigation or modal overlays, use `surface` at 80% opacity with a `24px` backdrop-blur. This allows the radiant background to bleed through, softening the interface.
- **Ambient Shadows:** Only for elements that require a "Physical Lift" (e.g., a floating Action Button). Use a diffused shadow: `box-shadow: 0 20px 40px rgba(20, 30, 27, 0.06);`. Note the use of the Deep Moss color in the shadow to keep it "organic."
- **Ghost Borders:** If a border is required for accessibility on inputs, use `outline_variant` (#d4c5ab) at 20% opacity. 

---

## 5. Components: The Signature Kit

### Buttons (The "Magnet" Interaction)
- **Primary (Neo-Mint):** Background: `tertiary_container`. Text: `on_tertiary_container`. Roundedness: `md` (0.375rem). Use a subtle hover state that increases the brightness by 5%.
- **Secondary (Amber):** Background: `primary_container`. Text: `on_primary_container`. No border.
- **Ghost (The Architect):** Text: `on_surface`. Background: transparent. On hover: `surface_variant` at 30% opacity.

### Cards & Lists
- **The "No Divider" Rule:** Forbid 1px dividers in lists. Separate items using `24px` of vertical white space or a subtle background shift to `surface_container_lowest` (#ffffff) on hover.
- **Project Cards:** Use a responsive grid with intentional gaps. Card background should be `surface_container_low`. On hover, the card should "bloom"—a subtle `0.5rem` upward translation and a shift to `surface_container_highest`.

### Interactive Progress (The AI Pulse)
- **Chips:** For skill tags (e.g., "Generative AI"), use `secondary_fixed` (#d4e3ff) with `on_secondary_fixed` text. Shape: `full` (pill). 
- **Input Fields:** Use "Underline Only" styling with `outline` (#827660) at low opacity. When focused, the underline transitions to `primary` (Amber) with a smooth 300ms ease-out.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use whitespace as a functional element. Give headlines 1.5x more room than you think they need.
- **Do** use "Variable Weights." Mix a Bold Headline with a Light body to create an editorial texture.
- **Do** apply `0.25rem` (sm) to `0.75rem` (xl) border-radii consistently to maintain the "Soft Stability" vibe.
- **Do** use parallax transitions for project imagery to suggest depth in Maimoon’s architectural work.

### Don’t:
- **Don’t** use pure black (#000) for text. Always use `on_surface` (Deep Moss) for a softer, premium feel.
- **Don’t** use heavy "Drop Shadows." If a card doesn't stand out, use a color shift, not a shadow.
- **Don’t** use standard 12-column grids strictly. Allow elements to break the grid (e.g., an image bleeding off the right edge) to create a custom, high-end feel.
- **Don’t** use high-contrast borders. If you can see the border clearly, it's too heavy.