# Design System Specification: The Architectural Aura

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system is engineered for the Senior Frontend Architect who balances technical precision with high-end aesthetic sensibility. We are moving away from the "Bootstrap-industrial" look and toward a "Digital Curator" experience. This system prioritizes **Atmospheric Depth** over structural rigidity. 

The layout is driven by **Intentional Asymmetry**—utilizing generous white space (the Golden-White base) to allow technical content to breathe. By leveraging the 'Maimoon' aura, we create a sense of enlightened expertise: warm, radiant, and protective. We break the template look by treating the screen as a gallery wall, where code is art and architecture is the medium.

---

## 2. Colors: Tonal Radiance
The palette is a sophisticated interplay between the warmth of the `primary` (Amber-Orange) and the structural stability of the `secondary` (Protective Blue).

### Core Palette (Material Design Tokens)
- **Background (`#fbf9f1`)**: The foundation. A warm, non-clinical white that reduces eye strain and feels premium.
- **Primary (`#795900`) & Primary Container (`#ffbf00`)**: Used for "Radiant" moments—the primary CTA, active states, and high-importance highlights.
- **Secondary (`#005faf`) & Secondary Container (`#54a0fe`)**: Represents "Protection." Used for technical secondary actions, borders, and depth-defining shadows.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined through background color shifts. Use `surface-container-low` for large content blocks and `surface-container-high` for interactive elements. If a section ends, let the whitespace or a subtle shift from `background` to `surface-container-lowest` tell the story.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper and frosted glass:
- **Base Level:** `background` (#fbf9f1)
- **Section Level:** `surface-container-low` (#f5f4ec)
- **Component Level (Cards/Modals):** `surface-container-lowest` (#ffffff)
- **Floating Elements:** Glassmorphism (see Elevation).

### Signature Textures
Avoid flat primary buttons. Use a subtle linear gradient: `primary_container` to `inverse_primary`. This 15% shift in tone provides a "liquid gold" effect that feels tactile and bespoke.

---

## 3. Typography: Technical Modernism
We use **Space Grotesk** as our headline workhorse to lean into the "Architect" persona—it is geometric, technical, yet highly legible. **Inter** handles the heavy lifting of body copy for maximum readability.

- **Display (Space Grotesk):** 3.5rem. Use for hero statements. Kern tightly (-0.02em) to give it an editorial feel.
- **Headline (Space Grotesk):** 1.5rem - 2rem. High contrast against body copy. Use `on_surface_variant` (#504532) for a softer, high-end look instead of pure black.
- **Title (Inter):** 1.125rem - 1.375rem. Medium weight. This is the bridge between technical data and storytelling.
- **Body (Inter):** 0.875rem - 1rem. Use `surface_variant` for meta-text and `on_background` for primary reading.
- **Label (Space Grotesk):** 0.75rem. All-caps with 0.05em letter spacing for "technical data" labels or small badges.

---

## 4. Elevation & Depth: The Protective Layer
Depth in this system is achieved via **Tonal Layering** and the "Protective Blue" aura, rather than harsh shadows.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The difference is enough to signify depth without a single pixel of border.
- **Ambient Shadows:** Shadows are never grey. Use a 4%-8% opacity of the `secondary` (#005faf) color. 
  - *Example:* `box-shadow: 0 20px 40px rgba(25, 118, 210, 0.08);`
- **Glassmorphism:** For sidebars and floating tooltips, use:
  - `background: rgba(255, 255, 255, 0.7);`
  - `backdrop-filter: blur(12px);`
  - **The Ghost Border:** A 1px stroke using `outline_variant` at 20% opacity. This acts as a "light catch" on the edge of the glass.

---

## 5. Components

### Primary Buttons
- **Style:** Pill-shaped (`rounded-full`). 
- **Color:** Gradient from `primary_container` to `primary_fixed_dim`. 
- **Typography:** `label-md` (Space Grotesk), Bold.
- **Interaction:** On hover, increase the `secondary` shadow spread.

### Interactive Tool Sidebars
- **Style:** Glassmorphic pane. Use `surface_container_low` with 70% opacity and `backdrop-blur`.
- **Layout:** No vertical dividers. Use 24px vertical padding between tool groups.
- **Active State:** A 4px vertical "Radiant" pill using `primary` on the far left of the active item.

### Glassmorphism Cards
- **Style:** `surface-container-lowest` at 80% opacity. 
- **Border:** Ghost Border (10% `secondary`).
- **Content:** No internal dividers. Use `body-sm` for captions and `headline-sm` for titles.

### Code Snippets
- **Background:** `inverse_surface` (#30312c). 
- **Syntax Highlighting:** Use `primary_fixed` (Amber) for functions and `tertiary_fixed_dim` (Cyan/Blue) for variables.
- **Corner:** `rounded-lg` (0.5rem).

### Inputs & Search
- **Style:** Underline only or Ghost Border. When focused, the border transitions to `secondary` (Blue) with a subtle glow.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical margins (e.g., 10% left margin, 20% right margin) to create an editorial layout.
- **Do** use the Spacing Scale (8px, 16px, 24px, 48px, 64px) religiously.
- **Do** wrap code blocks in wide `surface-container-low` containers to give them "breathing room."
- **Do** use `secondary` (Blue) for technical elements (IDs, version numbers, tags).

### Don't
- **Don't** use black (#000000). Use `on_surface` (#1b1c17).
- **Don't** use 1px solid borders for layout containers. It breaks the "Aura" and looks dated.
- **Don't** use traditional "Material Design" cards with heavy shadows. Use tonal shifts.
- **Don't** crowd the interface. If you think you need more content, you probably need more whitespace instead.