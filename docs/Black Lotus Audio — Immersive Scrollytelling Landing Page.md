# Refined Creative Brief: Black Lotus Audio — Immersive Scrollytelling Landing Page

---

**ACT AS:** A world‑class Awwwards‑level Creative Developer and Brand Experience Director, specialising in ultra‑premium web design, Next.js 15, React 19, GSAP, advanced scroll‑based storytelling, and 3D‑inspired product interactions for global tech brands.

**THE TASK:**  
Design and implement a high‑end, Apple‑level scrollytelling landing page for a flagship noise‑cancelling audio product (conceptual “Black Lotus” line, inspired by Sony WH‑1000XM6). The experience must feel like a cinematic product reveal combined with an interactive engineering showcase, driven entirely by scroll‑based image‑sequence animation and premium typography/layout. As the user scrolls, a 120‑frame image sequence plays where the headphones explode (disassemble) into a floating technical diagram and then reassemble, synchronised with copywriting and storytelling beats.

---

## TECH STACK & ARCHITECTURE (from master system prompt)

All output must adhere to the following immutable technology choices and architectural rules:

| Layer | Implementation |
|-------|----------------|
| Framework | **Next.js 15 (App Router)**, React 19, TypeScript strict |
| Styling | **Tailwind CSS v4** + **shadcn/ui** (violet base colour, CSS variables theming) |
| 3D / Canvas | **GSAP** (ScrollTrigger) for scroll‑linked frame playback; **HTML5 Canvas** (or OffscreenCanvas) for image sequence rendering |
| State | Zustand (UI state only), server components for static data |
| Performance | `next/dynamic` with `ssr: false` for canvas component, `IntersectionObserver` (200 px rootMargin) deferred loading, `optimizePackageImports` for GSAP |
| Server/Client | Server Components (default) for layouts, metadata; Client Components (`'use client'`) only for canvas, animations, and interactivity. 3D/Canvas components isolated in `components/three/` (or `components/canvas/`) and imported via `dynamic(() => import(...), { ssr: false })`. |

> **Directory convention:** The canvas scene lives in `components/canvas/HeroSequence.tsx`, imported dynamically on the home page.

---

## VISUAL DIRECTION & BRAND AESTHETIC – **Mystical Black Lotus**

The entire colour story is derived from the provided **Mystical Black Lotus** palette:

| Role | Hex | Usage |
|------|-----|-------|
| Deepest background | `#131026` (HSLA 247°, 40%, 10%) | Page background, canvas backdrop |
| Dark surface / sections | `#1F1A40` (HSLA 247°, 41%, 17%) | Cards, subtle overlays |
| Deep violet core (primary accent) | `#5F2DA6` (HSLA 264°, 57%, 41%) | Gradients, CTA borders, active states |
| Muted royal (secondary accent) | `#4E3473` (HSLA 264°, 37%, 32%) | Subtle highlights, tag lines |
| Ethereal purple glow | `#8B65BF` (HSLA 264°, 41%, 57%) | Text gradients, ambient glows, interactive elements |

**Overall vibe:** Ultra‑premium, cinematic, dark‑elegant, mystical tech. The page must feel like an editorial feature for a luxury audio artefact — no decorative noise, only intentional restraint.

**Seamless Blending:**  
The canvas background colour **must** perfectly match the background of the image sequence frames (`#131026`), so the headphones appear to float in a unified, edge‑free void — a “black lotus” atmosphere with a deep violet core.

**Typography:**  
- Fonts: Inter, SF Pro Display / SF Pro Text, or a geometric grotesk.  
- Headings: Bold, tight line‑height, large scale, gradient fill from `#FFFFFF` to `#8B65BF` (ethereal purple) at baseline.  
- Body: 16–18 px, `rgba(255,255,255,0.6)`, comfortable line‑height, concise copy.  
- Buttons: White, semi‑bold, subtle text shadow for legibility over dark canvases.

**Gradients & Glows:**  
- Background radial gradient: `#131026` → `#1F1A40` (extremely subtle, centred behind hero).  
- Accent gradient: `#5F2DA6` → `#8B65BF` for CTA borders, key labels.  
- Soft ambient glows behind the product and text blocks using `#8B65BF` at low opacity.

---

## NAVBAR – **Ultra‑minimal, Apple‑inspired**

- Fixed/sticky, translucent `rgba(19,16,38,0.75)` with `backdrop-blur`.  
  **Left:** Text logo “BLACK LOTUS” or “Lotus Audio​”.  
  **Center:** Links – “Overview”, “Technology”, “Noise Cancelling”, “Specs”, “Buy”.  
  **Right:** Primary CTA “Experience Lotus​” with a gradient border (`#5F2DA6` → `#8B65BF`), soft hover glow.  
- Height: slim, Apple‑like compact.  
- Behaviour: starts nearly invisible at top, fades in after a small scroll (ease‑in, 200 ms delay).  
  **Implementation note:** Use `useGSAP` + ScrollTrigger to toggle nav opacity; Zustand UI store for nav visibility.

---

## CORE INTERACTION: SCROLL‑LINKED IMAGE SEQUENCE

**Canvas component** (`components/canvas/HeroSequence.tsx`):
- `'use client'`, dynamically imported with `ssr: false` and a placeholder skeleton.
- Loads the compressed image sequence (WebP/Draco‑optimized frames) as soon as the element enters the viewport (200 px root margin).
- Pinned for **~400 vh** via GSAP ScrollTrigger, so the canvas stays fixed while the user scrolls through the narrative.
- The scroll progress (0‑1) drives the canvas frame index. A smooth easing function (e.g., `power2.out`) prevents jumps and stutter.
- The canvas background is set to `#131026`, and all images are premultiplied alpha or absolute background matching to achieve the seamless blend.

**Sequence behaviour:**
- **Start (0‑15%):** Fully assembled product, matte black with deep violet rim light.
- **Mid (15‑85%):** Gradual explosion into floating components.
- **Peak (40‑65%):** Fully exploded technical diagram.
- **End (85‑100%):** Components reassemble into hero pose.

### Scroll‑Linked Storytelling Beats

**HERO / INTRO (0–15% scroll)**  
*Visual:* WH‑1000XM6‑inspired headphones assembled, matte black with ethereal purple rim lighting.  
*Copy (centred, bold):*  
```
Headline: “Black Lotus ANC”
Subheadline: “Silence, refined.​”
Supporting line: “Flagship wireless noise cancelling, re‑engineered for a world that never stops.​”
```
*Tone:* Confident, high‑end corporate product copy.

**ENGINEERING REVEAL (15–40% scroll)**  
*Visual:* Ear cups, headband, cushions drift apart; internal drivers, acoustic chambers appear.  
*Copy (left‑aligned, fading in):*  
```
Headline: “Precision‑engineered for silence.​”
Subcopy:
“Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio‑grade clarity.​”
“Every component is tuned for balance, power, and comfort—hour after hour.​”
```

**NOISE CANCELLING & MICROPHONES (40–65% scroll)**  
*Visual:* Microphone arrays, processing chips highlighted in exploded view.  
*Copy (right‑aligned):*  
```
Headline: “Adaptive noise cancelling, redefined.​”
“Multi‑microphone array listens in every direction.​”
“Real‑time noise analysis adapts to your environment.​”
“Your music stays pure—planes, trains, and crowds fade away.​”
```

**SOUND & UPSCALING (65–85% scroll)**  
*Visual:* Drivers, magnets, acoustic chambers illuminated; soft violet highlights.  
*Copy (left‑aligned or centred):*  
```
Headline: “Immersive, lifelike sound.​”
“High‑performance drivers unlock detail, depth, and texture in every track.​”
“AI‑enhanced upscaling restores clarity to compressed audio, so every note feels alive.​”
```

**REASSEMBLY & CTA (85–100% scroll)**  
*Visual:* Components glide back, final hero pose.  
*Copy (centred, strong CTA):*  
```
Headline: “Hear everything. Feel nothing else.​”
Subheadline: “Black Lotus ANC. Designed for focus, crafted for comfort.​”
Primary CTA: “Experience Black Lotus​” (gradient border, subtle glow)
Secondary: “See full specs​”
```

---

## UI & VISUAL POLISH (Awwwards‑level)

**Keywords to inject:** Cinematic, photorealistic, hyper‑detailed, ultra‑premium, luxury tech, editorial, flagship, modern, minimalist, corporate high‑end, glassmorphism, gradient glows, smooth, buttery scroll, hardware‑accelerated, immersive, interactive storytelling, scrollytelling, polished, Awwwards‑level.

**Stylistic elements:**
- Soft ambient glows behind product and key text blocks (ethereal purple `#8B65BF` at low opacity).
- Subtle gradient borders (`#5F2DA6` → `#8B65BF`) on CTAs and cards.
- Motion blur and depth suggestions through lighting and focus, not noisy effects.
- All overlays (navbar, text blocks) float above canvas with `backdrop-blur` and semi‑transparency.

**Performance mandates (Core Web Vitals ≥ 90):**
- Image sequence frames compressed (WebP, ≤ 200 KB per frame, total ~24 MB preloaded incrementally? Use `IntersectionObserver` to load batch by batch).
- Canvas uses `will-change: transform`, `contain: paint`.
- GSAP ScrollTrigger with `scrub: true` and `ease: "none"` for smooth scrubbing; frame lookup uses `Math.floor` on scaled progress.
- LCP: preload first frame of sequence with `<link rel="preload" fetchpriority="high">`, and a static hero placeholder rendered Server‑Side.

---

## FINAL REFINED PROMPT (Ready-to-Use)

> **Design a hyper‑premium, Apple‑level, cinematic scrollytelling landing page for a flagship wireless noise‑cancelling audio product — “Black Lotus ANC” (inspired by Sony WH‑1000XM6). Use Next.js 15 (App Router), React 19, Tailwind CSS v4, shadcn/ui, and GSAP. The aesthetic is the Mystical Black Lotus colour theme: deepest background `#131026`, dark surfaces `#1F1A40`, deep violet core `#5F2DA6` as primary accent, ethereal purple `#8B65BF` as secondary accent and glow.  
>   
> Build a fixed, Apple‑style glass navbar that fades in on scroll. Create a full‑screen sticky canvas section (~400 vh) that plays a 120‑frame image sequence of matte black headphones, perfectly matching the `#131026` background so they float seam‑lessly.  
>   
> The scroll‑driven sequence disassembles the headphones into a floating technical diagram and reassembles them, synchronised with premium copy. The narrative unfolds: 0‑15% hero intro, 15‑40% engineering reveal, 40‑65% noise cancelling & mics, 65‑85% sound & upscaling, 85‑100% reassembly & CTA.  
>   
> Text uses gradient headings (white → `#8B65BF`), muted body copy, and elegant, editorial layouts. Accent gradients (`#5F2DA6` → `#8B65BF`) appear on CTAs and borders. All animations are powered by GSAP ScrollTrigger with smooth easing; the canvas component is dynamically imported and deferred until the element enters the viewport.  
>   
> The final result must be polished, Awwwards‑level, with buttery performance and an immersive, corporate‑high‑end feel.**

This refined prompt fully aligns with the provided master system prompt, portfolio architecture, and Mystical Black Lotus colour theme.