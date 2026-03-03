// specialist-portfolio/src/types/project.types.ts

/**
 * Core type definitions for project data.
 * Aligns with "The Data Specialist" design system and Full Navigation Structure.
 */

/**
 * Metric data point displayed on project cards.
 * Values use JetBrains Mono for precision, with optional Gold Fleck highlighting.
 */
export interface ProjectMetric {
  /** Emoji or icon character (e.g., "⚡") */
  icon: string;
  /** Numeric or short string value (e.g., "40%", "2.5s") */
  value: string | number;
  /** Metric label (e.g., "Efficiency", "Response Time") */
  label: string;
  /** Whether to highlight this metric with Gold Fleck accent color */
  highlight?: boolean;
}

/**
 * Badge displayed on project cards.
 * Variant maps to design system color roles: Lapis Deep, Slate Blue, Gold Fleck.
 */
export interface ProjectBadge {
  /** Badge text */
  label: string;
  /** Color variant following "The Data Specialist" schema */
  variant: 'primary' | 'secondary' | 'accent';
  /** Badge semantic type (affects styling and grouping) */
  type?: 'category' | 'status' | 'tech';
}

/**
 * External links associated with a project.
 * Matches deep‑link structure from navigation.
 */
export interface ProjectLinks {
  /** Link to live demo */
  demo?: string;
  /** Link to source repository (GitHub, etc.) */
  repo?: string;
  /** Link to detailed case study */
  caseStudy?: string;
  /** Link to technical documentation */
  documentation?: string;
}

/**
 * Project status for filtering and display.
 * - `active`: Currently maintained / in development
 * - `archived`: Stable but no longer actively developed
 * - `experimental`: Proof‑of‑concept / research stage
 */
export type ProjectStatus = 'active' | 'archived' | 'experimental';

/**
 * Project category for filtering and grouping.
 * Aligns with Portfolio page filter options.
 */
export type ProjectCategory =
  | 'ai-engineering'
  | 'web-apps'
  | 'automation'
  | 'strategy';

/**
 * Filter options for project listing pages.
 * Used by Portfolio and Projects components.
 */
export interface ProjectFilterOptions {
  /** Filter by category */
  category?: ProjectCategory | 'all';
  /** Filter by status */
  status?: ProjectStatus | 'all';
  /** Filter by year (string for simplicity) */
  year?: string | 'all';
  /** Search query string */
  search?: string;
}

/**
 * Main project data model.
 * All properties are readonly to enforce immutability.
 */
export interface Project {
  /** Unique project identifier */
  readonly id: string;
  /** URL slug for deep linking */
  readonly slug: string;
  /** Project title */
  readonly title: string;
  /** One‑line project summary */
  readonly summary: string;
  /** Full description (used in detailed view) */
  readonly description?: string;
  /** Project category for filtering */
  readonly category: ProjectCategory;
  /** Project status badge */
  readonly status: ProjectStatus;
  /** Year of completion or last major update */
  readonly year?: string;
  /** Array of metric objects to display */
  readonly metrics?: readonly ProjectMetric[];
  /** Array of badge objects */
  readonly badges?: readonly ProjectBadge[];
  /** Array of technology/category tags (simpler alternative to badges) */
  readonly tags?: readonly string[];
  /** External links */
  readonly links?: ProjectLinks;
  /** URL to project thumbnail/image */
  readonly image?: string;
  /** Alt text for image (required if image is provided) */
  readonly imageAlt?: string;
  /** Whether this project should be featured (Homepage, Portfolio) */
  readonly featured?: boolean;
  /** Problem statement (Markdown content) */
  readonly problem?: string;
  /** Architecture description (Markdown content) */
  readonly architecture?: string;
  /** Implementation details (Markdown content) */
  readonly implementation?: string;
  /** Results and impact (Markdown content) */
  readonly results?: string;
  /** Key learnings (Markdown content) */
  readonly learnings?: string;
}