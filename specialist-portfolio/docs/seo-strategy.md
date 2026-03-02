# SEO Strategy — The Data Specialist Portfolio

This document outlines the comprehensive SEO strategy for “The Data Specialist” portfolio. It is designed to maximize organic visibility, establish topical authority, and drive qualified traffic through technical excellence, content structure, and strategic internal linking. All recommendations align with the `Full Navigation Structure.md` blueprint and industry best practices as of 2026.

---

## 🎯 Keyword Strategy by Page Type

Each page type targets a distinct set of keywords, from broad brand awareness to specific, high‑intent queries. This layered approach ensures the site captures traffic at every stage of the user journey.

| Page / Section | Target Keywords | Keyword Intent | Example Phrases |
|----------------|-----------------|----------------|------------------|
| **Homepage** | Broad, role‑defining terms | Brand / Top-of-funnel | “AI Engineer,” “Full‑Stack Developer,” “Agentic Workflow Architect” |
| **Portfolio (Curated)** | Action‑oriented, outcome‑focused | Consideration / Validation | “Built an AI agent for research,” “Developed scalable automation system” |
| **Projects (Archive)** | Technology + problem‑space | Niche discovery | “LLM evaluation project,” “Python automation portfolio” |
| **Documentation / Tutorials** | Question‑based, long‑tail | Learning / How‑to | “how to build an agentic workflow,” “Python automation tutorial,” “LLM integration guide” |
| **Blog** | Thought leadership, industry trends | Awareness / Authority | “AI engineering strategy,” “LLM Ops best practices,” “future of automation” |
| **Tools** | Utility‑focused | Direct / Tool‑seeking | “AI prompt optimizer,” “workflow automation tool,” “open‑source dev utils” |
| **Resume** | Recruiter / hiring keywords | Conversion | “AI engineer resume,” “full‑stack developer CV,” “machine learning experience” |
| **About / Contact** | Personal brand + location (if any) | Trust / Conversion | “AI consultant San Francisco,” “contact AI developer” |

**Implementation Notes:**
- Primary keywords should appear in H1, first paragraph, and meta description.
- Secondary keywords populate H2s and image alt text.
- Use `src/utils/constants.ts` to maintain a single source of truth for category labels and filter names, ensuring consistency across UI and SEO metadata.

---

## 🧭 Thematic Silos & Internal Linking Architecture

Internal linking is structured into three thematic silos, each reinforcing a core area of expertise. This creates topic clusters, distributes link equity, and helps search engines understand the site’s information hierarchy .

| Silo | Core Pages | Linking Strategy | Goal |
|------|------------|------------------|------|
| **Silo 1: Work** | Portfolio (Curated) → Project Detail pages → Related Projects | Each project links to 2–3 related projects via “Related Work” based on shared technology or industry. Portfolio page links to all projects. | Establish authority in delivered work; keep users exploring within the Work section. |
| **Silo 2: Expertise** | Resume → Tools → Documentation → Tutorials | Resume’s “Technical Stack” links to relevant Tools and Documentation. Tools pages link to case studies in Portfolio. Documentation links to related Blog posts (theory ↔ practice). | Create a knowledge hub that signals deep expertise to both users and search engines. |
| **Silo 3: Thought** | Blog → Individual Blog Posts → “Further Reading” links to Documentation / Projects | Blog posts include contextual links to relevant tutorials (Blog → Documentation). Documentation’s “Next Steps” links back to related Blog posts. | Build a connected web of ideas, increasing time‑on‑site and page views per session. |

**Automation Tools:** For large sites, consider using AI‑powered linking tools like LinkBoss to automate semantic link suggestions and prevent anchor text cannibalization . These tools analyze content contextually, ensuring links are both relevant and natural.

---

## 📝 Meta Tags & Social Sharing

Every page must include a complete set of meta tags. The `src/config/seo.ts` file centralises these values, with page‑specific overrides.

| Tag | Homepage Example | Portfolio Example | Blog Post Example |
|-----|------------------|-------------------|-------------------|
| **Title** | `Jane Doe | Developer, AI Engineer & Agentic Workflow Architect` | `Portfolio – Curated Work | Jane Doe` | `Building Agentic Workflows | Jane Doe` |
| **Meta Description** | `I build intelligent systems. Explore a portfolio of AI engineering, scalable web apps, and automation architectures.` | `A curated selection of my best work in AI engineering, system architecture, and digital strategy.` | `Learn how to design and implement autonomous agent systems with reliability and observability.` |
| **Keywords** | `AI Engineer, Full-Stack Developer, Portfolio` | `AI projects, web applications, automation case studies` | `agentic workflows, AI strategy, LLM tutorial` |
| **Canonical URL** | `https://dataspecialist.dev/` | `https://dataspecialist.dev/work/portfolio` | `https://dataspecialist.dev/mind/blog/building-agentic-workflows` |

**Open Graph & Twitter Cards:**
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://dataspecialist.dev/og-image.png" />
<meta property="og:url" content="https://dataspecialist.dev/..." />
<meta name="twitter:card" content="summary_large_image" />
```

All pages share a default `og:image` (1200×630), but key pages (Home, Portfolio, Blog) can have custom images stored in `src/assets/images/og/`.

---

## 🏗️ Structured Data (JSON‑LD)

Structured data helps search engines understand the content and can unlock rich snippets . The following schemas are implemented using JSON‑LD in the `<head>` of relevant pages.

### Person (Homepage, About, Contact)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Doe",
  "url": "https://dataspecialist.dev",
  "image": "https://dataspecialist.dev/images/profile.jpg",
  "jobTitle": "AI Engineer & Full‑Stack Developer",
  "sameAs": [
    "https://linkedin.com/in/janedoe",
    "https://github.com/janedoe"
  ],
  "description": "Developer, AI Engineer, and Agentic Workflow Architect."
}
```

### Article (Blog Posts)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Building Agentic Workflows",
  "description": "Learn how to design and implement autonomous agent systems.",
  "image": "https://dataspecialist.dev/images/blog/agentic-workflows.jpg",
  "datePublished": "2025-04-15",
  "dateModified": "2025-04-15",
  "author": {
    "@type": "Person",
    "name": "Jane Doe"
  }
}
```

### SoftwareApplication (Tools)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Prompt Optimizer CLI",
  "description": "CLI tool to test, version, and optimize prompts for LLMs.",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Windows, macOS, Linux",
  "url": "https://dataspecialist.dev/tools/prompt-optimizer"
}
```

### BreadcrumbList (All Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dataspecialist.dev/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dataspecialist.dev/mind/blog" },
    { "@type": "ListItem", "position": 3, "name": "Building Agentic Workflows", "item": "https://dataspecialist.dev/mind/blog/building-agentic-workflows" }
  ]
}
```

**Validation:** Always test structured data with Google’s Rich Results Test .

---

## ⚡ Performance SEO (Core Web Vitals)

Core Web Vitals are a direct ranking factor and directly impact user experience . The project targets the following thresholds:

| Metric | Target | Description |
|--------|--------|-------------|
| **Largest Contentful Paint (LCP)** | < 2.5 seconds | Loading performance – time until the largest content element is visible . |
| **Interaction to Next Paint (INP)** | < 200 ms | Responsiveness – the longest interaction delay observed . |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Visual stability – unexpected movement of page elements . |

### Optimisation Techniques

- **Self‑hosted fonts**: Inter and JetBrains Mono served as WOFF2 with `font-display: swap` eliminate third‑party DNS lookups and reduce LCP .
- **Image optimisation**: All images use modern formats (WebP/AVIF) and have explicit `width` and `height` attributes to prevent layout shift .
- **Lazy loading**: Images and below‑the‑fold content use native `loading="lazy"`.
- **Code splitting**: Vite splits code by route, ensuring only necessary JavaScript is loaded per page.
- **Passive event listeners**: Scroll listeners in `useScrollPosition` use `{ passive: true }` to avoid blocking the main thread.
- **CDN**: Assets are served via a CDN to minimise latency .
- **Minimal third‑party scripts**: Only essential analytics (with `async` or `defer`) are included; all others are removed .

**Monitoring:** Use Google Search Console’s Core Web Vitals report, PageSpeed Insights, and real‑user monitoring (RUM) data to track performance over time .

---

## ♿ Accessibility & SEO

Accessibility (WCAG) and SEO are closely linked – many accessibility best practices directly improve search visibility .

| WCAG Principle | SEO Impact | Implementation |
|----------------|------------|----------------|
| **Semantic HTML** | Clear document structure helps search engines understand content hierarchy. | Use `<header>`, `<main>`, `<article>`, `<section>`, `<nav>` landmarks. |
| **Heading hierarchy** | Proper H1–H6 structure clarifies topic importance. | One H1 per page, followed by H2s for sections, H3s for subsections. |
| **Alt text** | Provides context for images; serves as anchor text if image is linked. | All `img` tags include descriptive `alt` attributes. |
| **Link text** | Descriptive link text (not “click here”) improves anchor text relevance. | `aria-label` used when link text alone is insufficient. |
| **Keyboard navigation** | Ensures all users can access content; indirectly improves crawlability. | Focus states visible, logical tab order. |
| **Reduced motion** | Respects `prefers-reduced-motion`; no ranking impact but improves UX. | Global media query disables non‑essential animations. |

By baking accessibility into the component architecture, the site naturally performs better in both search rankings and user satisfaction.

---

## 🗺️ Sitemap & Robots.txt

### `sitemap.xml`

A dynamic sitemap is generated at build time, including all important pages. It is submitted to Google Search Console and referenced in `robots.txt`.

**Structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dataspecialist.dev/</loc>
    <lastmod>2025-04-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dataspecialist.dev/work/portfolio</loc>
    <lastmod>2025-04-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- ... -->
</urlset>
```

### `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://dataspecialist.dev/sitemap.xml
```

This configuration allows all crawlers full access and points them to the sitemap.

---

## 🔀 301 Redirect Strategy

If the site is ever restructured, 301 redirects must be implemented to preserve link equity and user bookmarks.

**Example redirects (if `/portfolio` moves to `/work/portfolio`):**
```
/portfolio → /work/portfolio
/projects → /work/projects
/blog → /mind/blog
/docs → /mind/docs
```

Redirects are handled in `vite.config.ts` (for dev) and at the server level (Netlify/Vercel) via `_redirects` or `vercel.json`.

---

## 📈 Analytics & Conversion Tracking

All pages include analytics tracking via `src/services/analytics.service.ts`. The following events are tracked:

- **Page views**: `trackPageView(pageName)` – fires on route change.
- **CTA clicks**: `trackCTAClick(label, destination)` – attached to primary buttons (Portfolio, Contact, Download PDF).
- **Filter usage**: `trackFilterChange(category, value)` – tracks how users refine content.
- **Form submissions**: `trackFormSubmit(formName)` – success events from contact form.
- **Errors**: `trackError(error, context)` – logs front‑end exceptions for monitoring.

**Privacy:** No PII is ever sent to analytics. IP addresses are anonymized where possible.

---

## 🧭 Conversion Pathways

The internal linking strategy is designed to guide users along natural conversion paths :

| Entry Point | Intended Path | Goal |
|-------------|---------------|------|
| **Blog** → | Documentation (tutorial) | Move reader from theory to practice; build trust. |
| **Tools** → | Portfolio (case study) | Show real‑world application of the tool. |
| **Resume** → | Projects (specific achievements) | Validate claims with tangible evidence. |
| **Homepage** → | Portfolio / Contact | Direct high‑intent users to conversion. |
| **Documentation** → | Related Blog / Tools | Cross‑pollinate between expertise silos. |

These pathways are reinforced with contextual calls‑to‑action (e.g., “Read the case study”, “Try the tool”, “Continue to tutorial”).

---

## 📊 Ongoing SEO Maintenance

SEO is not a one‑time effort. The following tasks should be performed regularly:

- **Quarterly keyword audit**: Review rankings and adjust content strategy.
- **Content freshness**: Update blog posts and tutorials with new information; refresh project case studies with latest metrics.
- **Backlink monitoring**: Use tools like Ahrefs to track new backlinks and disavow spam.
- **Core Web Vitals check**: Monitor Search Console for any regression.
- **Structured data validation**: Re‑test after major content updates.

---

*This strategy is designed to evolve. As the portfolio grows, new pages and content types will be integrated into the existing silos, maintaining a cohesive and authoritative information architecture.*