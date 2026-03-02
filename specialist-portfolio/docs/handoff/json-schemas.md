# JSON Schemas — The Data Specialist Design System

This document defines all data structures used throughout the portfolio. These schemas serve as the single source of truth for TypeScript types, runtime validation, and future CMS migrations. Each schema includes field definitions, validation rules, relationships, and CMS mapping notes.

---

## Table of Contents

- [Project](#project)
- [Blog Post](#blog-post)
- [Tool](#tool)
- [Resume](#resume)
  - [Experience](#experience)
  - [Education](#education)
  - [Certification](#certification)
- [Navigation](#navigation)
  - [NavItem](#navitem)
- [Common Types](#common-types)

---

## Project

**Purpose:** Core data model for portfolio projects. Used in `ProjectCard`, `ProjectDetail`, `Portfolio`, and `Projects` pages.

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | `string` | ✅ Yes | Unique identifier | `"proj-001"` |
| `slug` | `string` | ✅ Yes | URL‑friendly identifier (kebab‑case) | `"agentic-research-workflow"` |
| `title` | `string` | ✅ Yes | Project title | `"Agentic Research Workflow"` |
| `summary` | `string` | ✅ Yes | One‑line description | `"Autonomous research system using LLM agents."` |
| `description` | `string` | ❌ No | Full description | `"A multi‑agent system that autonomously researches topics..."` |
| `category` | `enum` | ✅ Yes | Project category | `"ai-engineering"` |
| `status` | `enum` | ✅ Yes | Project status | `"active"` |
| `year` | `string` | ❌ No | Year of completion | `"2025"` |
| `metrics` | `array` | ❌ No | Array of metric objects | See [Metric](#metric) |
| `badges` | `array` | ❌ No | Array of badge objects | See [Badge](#badge) |
| `tags` | `array` | ❌ No | Technology tags | `["AI", "Python", "LangChain"]` |
| `links` | `object` | ❌ No | External links | See [ProjectLinks](#projectlinks) |
| `image` | `string` | ❌ No | Thumbnail URL | `"/images/projects/agentic-research.jpg"` |
| `imageAlt` | `string` | ❌ No | Alt text for image | `"Agentic Research Workflow diagram"` |
| `featured` | `boolean` | ❌ No | Whether project is featured | `true` |
| `problem` | `string` | ❌ No | Problem statement | `"Manual research across multiple sources is time‑consuming."` |
| `architecture` | `string` | ❌ No | Architecture description | `"LangChain agents with retrieval‑augmented generation."` |
| `implementation` | `string` | ❌ No | Implementation details | `"Python FastAPI backend, React dashboard."` |
| `results` | `string` | ❌ No | Results and impact | `"Automated 80% of research time."` |
| `learnings` | `string` | ❌ No | Key learnings | `"Agentic workflows need robust error handling."` |

### Validation Rules

- `slug`: Must be lowercase, kebab‑case (regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`)
- `category`: Must be one of `'ai-engineering'`, `'web-apps'`, `'automation'`, `'strategy'`
- `status`: Must be one of `'active'`, `'archived'`, `'experimental'`
- `metrics`: Maximum 5 items
- `links.*`: URLs must be valid (if provided)

### Sub‑Schemas

#### Metric

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `icon` | `string` | ✅ Yes | Emoji or icon character | `"⚡"` |
| `value` | `string` \| `number` | ✅ Yes | Metric value | `94` or `"94%"` |
| `label` | `string` | ✅ Yes | Metric label | `"Accuracy"` |
| `highlight` | `boolean` | ❌ No | Apply Gold Fleck emphasis | `true` |

#### Badge

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `label` | `string` | ✅ Yes | Badge text | `"AI"` |
| `variant` | `enum` | ✅ Yes | Color variant | `"primary"` |
| `type` | `enum` | ❌ No | Semantic type | `"tech"` |

#### ProjectLinks

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `demo` | `string` | ❌ No | Live demo URL | `"https://demo.example.com"` |
| `repo` | `string` | ❌ No | Repository URL | `"https://github.com/..."` |
| `caseStudy` | `string` | ❌ No | Case study path | `"/work/portfolio/project"` |
| `documentation` | `string` | ❌ No | Documentation URL | `"https://docs.example.com"` |

### CMS Migration Notes

| CMS Concept | Mapping |
|-------------|---------|
| Content type | `project` |
| Field groups | Main fields, `metrics` as repeatable group, `badges` as repeatable group |
| Relationships | `category` → taxonomy term; `tags` → taxonomy terms |
| Assets | `image` → media library asset with `imageAlt` as alt text |
| Workflow | `status` maps to workflow stage (draft/review/published/archived) |

---

## Blog Post

**Purpose:** Content model for blog posts in the "Mind" section.

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `slug` | `string` | ✅ Yes | URL slug (kebab‑case) | `"building-agentic-workflows"` |
| `title` | `string` | ✅ Yes | Post title | `"Building Agentic Workflows"` |
| `excerpt` | `string` | ✅ Yes | One‑line preview | `"Learn how to design and implement autonomous agent systems."` |
| `content` | `string` | ✅ Yes | Full content (HTML/Markdown) | `<h2>Introduction</h2><p>...</p>` |
| `meta` | `object` | ✅ Yes | Metadata object | See [BlogPostMeta](#blogpostmeta) |
| `featured` | `boolean` | ❌ No | Featured on blog listing | `true` |
| `image` | `string` | ❌ No | Hero image URL | `"/images/blog/agentic-workflows.jpg"` |
| `imageAlt` | `string` | ❌ No | Alt text for hero image | `"Agentic workflow diagram"` |

#### BlogPostMeta

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `date` | `string` | ✅ Yes | ISO 8601 date | `"2025-04-15"` |
| `readTime` | `string` | ✅ Yes | Reading time | `"8 min"` |
| `category` | `enum` | ✅ Yes | Blog category | `"ai-strategy"` |

### Validation Rules

- `slug`: Must be lowercase, kebab‑case (regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`)
- `meta.date`: Must be ISO 8601 date format (`YYYY-MM-DD`)
- `meta.readTime`: Must match pattern `^\d+\smin$` (e.g., `"5 min"`)
- `meta.category`: Must be one of `'ai-strategy'`, `'engineering'`, `'automation'`, `'digital-growth'`

### CMS Migration Notes

| CMS Concept | Mapping |
|-------------|---------|
| Content type | `blogPost` |
| Rich text | `content` → dynamic content / rich text field |
| Metadata | `meta` → group field or individual fields |
| Categories | `meta.category` → taxonomy term |

---

## Tool

**Purpose:** Data model for reusable tools and utilities on the Tools page.

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `slug` | `string` | ✅ Yes | URL slug (kebab‑case) | `"prompt-optimizer"` |
| `name` | `string` | ✅ Yes | Tool name | `"Prompt Optimizer CLI"` |
| `description` | `string` | ✅ Yes | One‑line description | `"CLI tool to test, version, and optimize prompts."` |
| `category` | `enum` | ✅ Yes | Tool category | `"ai-prompts"` |
| `tags` | `array` | ✅ Yes | Technology tags | `["AI", "CLI", "Python"]` |
| `ctaType` | `enum` | ✅ Yes | Call‑to‑action type | `"github"` |
| `githubUrl` | `string` | ❌ No | GitHub URL (required if `ctaType === 'github'`) | `"https://github.com/..."` |
| `featured` | `boolean` | ❌ No | Featured on Tools page | `true` |

### Validation Rules

- `slug`: Must be lowercase, kebab‑case (regex: `^[a-z0-9]+(?:-[a-z0-9]+)*$`)
- `category`: Must be one of `'ai-prompts'`, `'automation'`, `'dev-utils'`, `'strategy'`
- `ctaType`: Must be one of `'use'`, `'github'`
- `tags`: Must contain at least one tag
- `githubUrl`: Required and must be valid URL if `ctaType === 'github'`

### CMS Migration Notes

| CMS Concept | Mapping |
|-------------|---------|
| Content type | `tool` |
| Categories | `category` → taxonomy term |
| Tags | `tags` → taxonomy terms |
| CTA | `ctaType` + `githubUrl` → conditional field or link field |

---

## Resume

**Purpose:** Data structure for the Resume page, including professional history, education, certifications, and publications.

### ResumeData

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competencies` | `array` | ✅ Yes | Core competency tags |
| `stack` | `array` | ✅ Yes | Technical stack by category |
| `history` | `array` | ✅ Yes | Professional history |
| `education` | `array` | ❌ No | Education entries |
| `certifications` | `array` | ❌ No | Certification entries |
| `publications` | `array` | ✅ Yes | Publications and achievements |

#### Experience

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `role` | `string` | ✅ Yes | Job title | `"Senior AI Engineer"` |
| `company` | `string` | ✅ Yes | Company name | `"Agentic Systems"` |
| `companyLink` | `string` | ❌ No | Link to company projects | `"/work/projects?company=agentic-systems"` |
| `period` | `string` | ✅ Yes | Employment period | `"2023‑Present"` |
| `achievements` | `array` | ✅ Yes | Impact‑focused bullet points | `["Architected agentic workflows..."]` |

#### Education

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `institution` | `string` | ✅ Yes | Institution name | `"University of Technology"` |
| `degree` | `string` | ✅ Yes | Degree obtained | `"M.Sc. Computer Science"` |
| `period` | `string` | ✅ Yes | Study period | `"2016‑2018"` |
| `location` | `string` | ❌ No | Location | `"Berlin, Germany"` |

#### Certification

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `name` | `string` | ✅ Yes | Certification name | `"AWS Certified Solutions Architect"` |
| `issuer` | `string` | ✅ Yes | Issuing organization | `"Amazon Web Services"` |
| `date` | `string` | ✅ Yes | Date obtained | `"2024"` |
| `credentialId` | `string` | ❌ No | Credential ID or URL | `"AWS‑PRO‑12345"` |

#### Publication

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | `string` | ✅ Yes | Publication title | `"Building Agentic Workflows"` |
| `link` | `string` | ✅ Yes | Link to publication | `"/mind/blog/building-agentic-workflows"` |

### CMS Migration Notes

| CMS Concept | Mapping |
|-------------|---------|
| Content types | `competency`, `stackCategory`, `experience`, `education`, `certification`, `publication` |
| Relationships | `experience.companyLink` → reference to project |
| Group fields | `stack` → repeatable group with `category` and `items` |

---

## Navigation

### NavItem

**Purpose:** Navigation structure for header and footer menus.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `label` | `string` | ✅ Yes | Display text | `"Work"` |
| `href` | `string` | ✅ Yes | URL or path | `"/work/portfolio"` |
| `children` | `array` | ❌ No | Nested nav items (dropdown) | See [NavItem](#navitem) |
| `external` | `boolean` | ❌ No | Whether link is external | `true` |

### Validation Rules

- `href`: Must be valid URL or path
- If `external: true`, `href` should be full URL
- Nesting depth: maximum 2 levels (top‑level + dropdown)

### CMS Migration Notes

| CMS Concept | Mapping |
|-------------|---------|
| Content type | `navigation` |
| Structure | Hierarchical content with parent‑child relationships |
| Locations | Separate menu instances for `primary` and `secondary` |

---

## Common Types

### FilterOption

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `label` | `string` | ✅ Yes | Display label | `"AI Engineering"` |
| `value` | `string` | ✅ Yes | Internal value | `"ai-engineering"` |
| `count` | `number` | ❌ No | Result count badge | `12` |

### SEOMeta

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | `string` | ✅ Yes | Page title | `"Portfolio – Curated Work"` |
| `description` | `string` | ✅ Yes | Meta description | `"A curated selection..."` |
| `keywords` | `array` | ❌ No | Meta keywords | `["AI", "portfolio"]` |
| `canonical` | `string` | ❌ No | Canonical URL | `"https://dataspecialist.dev/work/portfolio"` |
| `ogImage` | `string` | ❌ No | Open Graph image URL | `"/og-image.png"` |

### Breakpoint

| Value | Pixels |
|-------|--------|
| `sm` | 640 |
| `md` | 768 |
| `lg` | 1024 |
| `xl` | 1280 |
| `2xl` | 1536 |

---

## Schema Versioning

All schemas are versioned implicitly through the TypeScript types. When breaking changes are required, create new interfaces (e.g., `ProjectV2`) and maintain backward compatibility in components.

## CMS Migration Strategy

When migrating to a headless CMS:

1. **Content modeling** – Create content types matching these schemas
2. **Field mapping** – Use the field tables above as reference
3. **Relationships** – Implement as content references (e.g., `Project.category` → taxonomy term)
4. **Assets** – Migrate images to media library, preserve alt text
5. **Validation** – Replicate validation rules using CMS field settings

*This document is the authoritative source for all data structures. Any changes to data shapes must be reflected here.*