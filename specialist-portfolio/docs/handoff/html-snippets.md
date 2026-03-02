# HTML/JSX Snippets — The Data Specialist Design System

This document provides reusable HTML/JSX snippets for common patterns in the portfolio. All snippets assume the project’s styling system (CSS Modules, global variables) and are production‑ready with accessibility baked in.

---

## Table of Contents

- [Layout](#layout)
  - [Basic Page Shell](#basic-page-shell)
  - [Section Container with Background](#section-container-with-background)
  - [Page Wrapper (Narrow / Wide)](#page-wrapper-narrow--wide)
- [Navigation](#navigation)
  - [Primary Navbar (Desktop)](#primary-navbar-desktop)
  - [Mobile Hamburger Menu](#mobile-hamburger-menu)
- [Cards](#cards)
  - [Project Card (Compact)](#project-card-compact)
  - [Project Card (Detailed)](#project-card-detailed)
  - [Tool Card](#tool-card)
  - [Blog Post Card](#blog-post-card)
- [Forms](#forms)
  - [Contact Form with Validation](#contact-form-with-validation)
- [Data Display](#data-display)
  - [DataTable with Sortable Headers](#datatable-with-sortable-headers)
  - [Metrics KPI Strip](#metrics-kpi-strip)
- [Filters](#filters)
  - [FilterBar Component Usage](#filterbar-component-usage)
- [SEO](#seo)
  - [Page Meta Template](#page-meta-template)

---

## Layout

### Basic Page Shell

**Purpose:** The outer structure for any page, including header, main content area, and footer. Use this as the starting point for new page components.

**Code:**
```tsx
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionContainer from '@/components/layout/SectionContainer';

const ExamplePage = () => {
  return (
    <>
      <Helmet>
        <title>Page Title | The Data Specialist</title>
        <meta name="description" content="Page description." />
      </Helmet>

      <Layout>
        <PageWrapper>
          {/* Your page content here */}
        </PageWrapper>
      </Layout>
    </>
  );
};

export default ExamplePage;
```

**Props/Variables:**  
- Replace page title and description in `<Helmet>`.

**Accessibility:**  
- Layout includes skip link (`#main-content`).
- Main landmark is present via `<main>`.

---

### Section Container with Background

**Purpose:** Wrap a distinct section of a page with consistent vertical padding and optional background variants.

**Code:**
```tsx
import SectionContainer from '@/components/layout/SectionContainer';

<SectionContainer
  id="section-id"
  paddingSize="lg"          // sm, md, lg, xl
  backgroundVariant="default" // default, accent, surface
>
  <h2 id="section-title">Section Heading</h2>
  {/* Section content */}
</SectionContainer>
```

**Props/Variables:**  
- `id` – used for anchor links and accessibility.  
- `paddingSize` – vertical spacing: 32px (sm), 48px (md), 64px (lg), 80px (xl).  
- `backgroundVariant` – `default` (Midnight Shale), `accent` (Lapis gradient), `surface` (Slate Blue).

**Accessibility:**  
- Renders a `<section>` by default.  
- If you provide a heading with an `id`, pass that same `id` as `titleId` to associate the section with its heading via `aria-labelledby`.

---

### Page Wrapper (Narrow / Wide)

**Purpose:** Constrains content width to the design‑system maximum and applies responsive gutters. Use `narrow` for blog posts and documentation.

**Code:**
```tsx
import PageWrapper from '@/components/layout/PageWrapper';

<PageWrapper narrow={false}>
  {/* Regular page content */}
</PageWrapper>

<PageWrapper narrow={true}>
  {/* Blog post / documentation content */}
</PageWrapper>
```

**Props/Variables:**  
- `narrow` – when `true`, max‑width reduces to 800px for better readability.

**Accessibility:**  
- No additional ARIA needed; purely presentational.

---

## Navigation

### Primary Navbar (Desktop)

**Purpose:** Full horizontal navigation with dropdowns, using the `NavItem` config from `@/config/navigation`.

**Code:**
```tsx
import { NavLink } from 'react-router-dom';
import { primaryNav } from '@/config/navigation';
import styles from './DesktopNav.module.css';

const DesktopNav = () => (
  <nav className={styles.nav} aria-label="Primary">
    <ul className={styles.navList}>
      {primaryNav.map((item) => (
        <li key={item.label} className={styles.navItem}>
          {item.children ? (
            <>
              <button
                className={styles.dropdownTrigger}
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.label}
              </button>
              <ul className={styles.dropdown}>
                {item.children.map((child) => (
                  <li key={child.label}>
                    <NavLink to={child.href} className={styles.dropdownLink}>
                      {child.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <NavLink to={item.href} className={styles.navLink}>
              {item.label}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
```

**Props/Variables:**  
- Uses `primaryNav` from `@/config/navigation.ts`.

**Accessibility:**  
- Dropdown triggers are `<button>` elements with `aria-haspopup` and `aria-expanded`.  
- Keyboard navigation should follow WAI‑ARIA menu pattern (optional – for full implementation, add keyboard handlers).

---

### Mobile Hamburger Menu

**Purpose:** Collapsible navigation for small screens.

**Code:**
```tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { primaryNav } from '@/config/navigation';
import styles from './MobileNav.module.css';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
        <span className={styles.hamburgerLine} />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <nav className={`${styles.mobileNav} ${isOpen ? styles.open : ''}`} aria-label="Mobile">
        <ul className={styles.navList}>
          {primaryNav.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <details className={styles.dropdown}>
                  <summary className={styles.dropdownSummary}>{item.label}</summary>
                  <ul className={styles.dropdownList}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <NavLink
                          to={child.href}
                          className={styles.dropdownLink}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <NavLink
                  to={item.href}
                  className={styles.navLink}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
```

**Props/Variables:**  
- Uses the same `primaryNav` config.

**Accessibility:**  
- Hamburger button has `aria-expanded` and `aria-label`.  
- When open, focus is trapped within the menu (can be enhanced with a focus‑trap library).  
- Overlay closes menu on click and is keyboard‑accessible (on `Escape`).

---

## Cards

### Project Card (Compact)

**Purpose:** Compact view for the Projects archive page. Displays title, summary, tags, and status badge.

**Code:**
```tsx
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';

<ProjectCard
  id="proj-001"
  title="Agentic Research Workflow"
  summary="Autonomous research system using LLM agents and retrieval‑augmented generation."
  category="ai-engineering"
  status="active"
  tags={['AI', 'Python', 'LangChain']}
  image="/images/projects/agentic-research.jpg"
  imageAlt="Diagram of agentic research workflow"
  links={{
    caseStudy: '/work/portfolio/agentic-research',
    demo: 'https://demo.example.com',
  }}
  variant="compact"
/>
```

**Props/Variables:**  
- See `ProjectCard.types.ts` for full interface.  
- `category` and `status` must match the allowed union types.

**Accessibility:**  
- Uses `<article>` and `<h3>` for title.  
- Action links have `aria-label` if icon‑only.

---

### Project Card (Detailed)

**Purpose:** Detailed view for the Portfolio page. Includes metrics, full description, and more prominent links.

**Code:**
```tsx
<ProjectCard
  id="proj-001"
  title="Agentic Research Workflow"
  summary="Autonomous research system using LLM agents and retrieval‑augmented generation."
  description="A multi‑agent system that autonomously researches topics, synthesizes findings, and generates reports with citations."
  category="ai-engineering"
  status="active"
  metrics={[
    { icon: '⚡', value: '94%', label: 'Accuracy', highlight: true },
    { icon: '⏱️', value: '1.2s', label: 'Latency' },
  ]}
  tags={['AI', 'Python', 'LangChain']}
  links={{
    demo: 'https://demo.example.com',
    repo: 'https://github.com/...',
  }}
  image="/images/projects/agentic-research.jpg"
  imageAlt="Diagram"
  variant="detailed"
  featured={true}
/>
```

**Props/Variables:**  
- `featured` adds a gold top border.  
- `metrics` display with JetBrains Mono; highlighted values use `--color-accent-gold`.

**Accessibility:**  
- Metrics are read as plain text; no special ARIA needed.

---

### Tool Card

**Purpose:** Displays a reusable tool/utility on the Tools page.

**Code:**
```tsx
import ToolCard from '@/components/ui/ToolCard/ToolCard';

<ToolCard
  slug="prompt-optimizer"
  name="Prompt Optimizer CLI"
  description="CLI tool to test, version, and optimize prompts for LLMs."
  category="ai-prompts"
  tags={['AI', 'CLI', 'Python']}
  ctaType="github"
  githubUrl="https://github.com/..."
  featured={true}
/>
```

**Props/Variables:**  
- `ctaType` determines whether the button is internal (`use`) or external (`github`).  
- `featured` adds gold top border.

**Accessibility:**  
- CTA is either a `<Link>` or `<a>` with appropriate `aria-label`.

---

### Blog Post Card

**Purpose:** Preview card for blog listing.

**Code:**
```tsx
import { Link } from 'react-router-dom';
import styles from './BlogCard.module.css';

const BlogCard = ({ post }) => (
  <article className={styles.card}>
    <Link to={`/mind/blog/${post.slug}`} className={styles.link}>
      <span className={styles.category}>{post.meta.category}</span>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.excerpt}>{post.excerpt}</p>
      <time className={styles.date} dateTime={post.meta.date}>
        {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </time>
    </Link>
  </article>
);
```

**Props/Variables:**  
- `post` object with `slug`, `title`, `excerpt`, `meta.category`, `meta.date`.

**Accessibility:**  
- Entire card is clickable with proper focus styling.  
- `<time>` element provides machine‑readable date.

---

## Forms

### Contact Form with Validation

**Purpose:** Fully accessible contact form with labels, validation, and submission handling.

**Code:**
```tsx
import { useState } from 'react';
import Button from '@/components/ui/Button/Button';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Consulting',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Submit via service...
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="error">{errors.name}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className="error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="inquiryType">Inquiry Type</label>
        <select
          id="inquiryType"
          name="inquiryType"
          value={formData.inquiryType}
          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
        >
          <option value="Consulting">Consulting</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Speaking">Speaking</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="error">{errors.message}</p>}
      </div>

      <Button type="submit" variant="accent" size="lg" fullWidth>
        Send Message
      </Button>
    </form>
  );
};
```

**Props/Variables:**  
- Uses `Button` component from design system.  
- Error messages are associated with inputs via `aria-describedby`.

**Accessibility:**  
- Labels are properly associated with inputs.  
- `aria-invalid` signals invalid fields to screen readers.  
- Error messages are live regions (use `role="alert"` if needed).

---

## Data Display

### DataTable with Sortable Headers

**Purpose:** Display tabular data with optional sorting.

**Code:**
```tsx
import DataTable from '@/components/ui/DataTable/DataTable';

const columns = [
  { key: 'role', label: 'Role', type: 'text', sortable: true },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'period', label: 'Period', type: 'text' },
  { key: 'impact', label: 'Impact', type: 'number', sortable: true },
];

const data = [
  { role: 'Senior AI Engineer', company: 'Agentic Systems', period: '2023‑Present', impact: 40 },
  // ...
];

<DataTable columns={columns} data={data} />
```

**Props/Variables:**  
- `columns` define the table structure; `type: 'number'` applies JetBrains Mono.  
- `sortable: true` enables header clicks to sort.

**Accessibility:**  
- Sortable headers have `aria-sort` attribute.  
- Keyboard activation (Enter/Space) triggers sort.

---

### Metrics KPI Strip

**Purpose:** Display a row of key metrics (e.g., on homepage or project detail).

**Code:**
```tsx
import { formatMetric } from '@/utils/formatNumber';
import styles from './KPIStrip.module.css';

const KPIStrip = ({ metrics }) => (
  <div className={styles.strip}>
    {metrics.map((metric, idx) => (
      <div key={idx} className={styles.kpi}>
        <span className={styles.icon}>{metric.icon}</span>
        <div>
          <span className={`${styles.value} ${metric.highlight ? styles.highlight : ''}`}>
            {formatMetric(metric.value, metric.unit)}
          </span>
          <span className={styles.label}>{metric.label}</span>
        </div>
      </div>
    ))}
  </div>
);
```

**Props/Variables:**  
- `metrics` array with `icon`, `value`, `unit`, `label`, `highlight`.

**Accessibility:**  
- Numbers are formatted with `formatMetric` and wrapped in appropriate tags; screen readers will read them naturally.

---

## Filters

### FilterBar Component Usage

**Purpose:** Category filter UI used across multiple pages.

**Code:**
```tsx
import FilterBar from '@/components/ui/FilterBar/FilterBar';

const [activeFilter, setActiveFilter] = useState('All');

const filters = ['All', 'AI Engineering', 'Web Apps', 'Automation', 'Strategy'];

<FilterBar
  filters={filters}
  activeFilter={activeFilter}
  onFilterChange={setActiveFilter}
  ariaLabel="Filter projects by category"
/>
```

**Props/Variables:**  
- `filters` – array of label strings.  
- `activeFilter` – currently selected label.  
- `onFilterChange` – callback when selection changes.

**Accessibility:**  
- Implements `role="radiogroup"` and `role="radio"`.  
- Arrow keys navigate between options.

---

## SEO

### Page Meta Template

**Purpose:** Standard `<Helmet>` setup for each page.

**Code:**
```tsx
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO } from '@/config/seo';

const PageMeta = ({ title, description, keywords, canonical, ogImage }) => (
  <Helmet>
    <title>{title} | The Data Specialist</title>
    <meta name="description" content={description || DEFAULT_SEO.description} />
    {keywords && <meta name="keywords" content={keywords.join(', ')} />}
    <link rel="canonical" href={canonical || DEFAULT_SEO.canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description || DEFAULT_SEO.description} />
    <meta property="og:image" content={ogImage || DEFAULT_SEO.ogImage} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);

// Usage
<PageMeta
  title="Portfolio – Curated Work"
  description="A curated selection of high‑impact systems."
  keywords={['AI engineering', 'portfolio', 'React']}
/>
```

**Props/Variables:**  
- `title`, `description`, `keywords`, `canonical`, `ogImage` – all optional, fallback to `DEFAULT_SEO`.

**Accessibility:**  
- No direct accessibility impact, but essential for SEO and social sharing.

---

*This document is updated as new patterns emerge. Always prefer using the existing components from `@/components` over copying raw HTML.*