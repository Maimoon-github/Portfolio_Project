// specialist-portfolio/src/components/ui/ProjectCard/ProjectCard.types.ts

/**
 * Metric data point displayed on project cards.
 * Values use JetBrains Mono for precision, with optional Gold Fleck highlighting.
 */
export interface ProjectMetric {
  /** Numeric or short string value (e.g., "40%", "2.5s") */
  value: string | number;
  /** Metric label (e.g., "Efficiency", "Response Time") */
  label: string;
  /** Whether to highlight this metric with Gold Fleck accent color (for totals) */
  highlight?: boolean;
}

/**
 * External links associated with a project.
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
 */
export type ProjectStatus = 'active' | 'archived' | 'experimental';

/**
 * Project category for filtering and grouping.
 */
export type ProjectCategory =
  | 'ai-engineering'
  | 'web-apps'
  | 'automation'
  | 'strategy';

/**
 * Props for the ProjectCard component.
 */
export interface ProjectCardProps {
  /** Unique project identifier (used for keys) */
  id: string | number;
  /** Project title */
  title: string;
  /** URL slug for deep linking */
  slug?: string;
  /** One‑line project summary */
  summary: string;
  /** Full description (used in detailed view) */
  description?: string;
  /** Project category for filtering */
  category?: ProjectCategory;
  /** Project status badge */
  status?: ProjectStatus;
  /** Array of metric objects to display */
  metrics?: readonly ProjectMetric[];
  /** Array of technology/category tags (will be rendered as Badge components) */
  tags?: readonly string[];
  /** External links */
  links?: ProjectLinks;
  /** URL to project thumbnail/image */
  image?: string;
  /** Alt text for image (required if image is provided) */
  imageAlt?: string;
  /** Whether this project should be featured (Gold Fleck accent) */
  featured?: boolean;
  /** Card layout variant */
  variant?: 'compact' | 'detailed';
  /** Additional CSS class names */
  className?: string;
}