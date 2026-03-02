/**
 * Blog post type definitions.
 * Aligns with "The Data Specialist" design system and Full Navigation Structure.
 */

/**
 * Blog category values, matching Blog Page filters.
 */
export type BlogCategory =
  | 'ai-strategy'
  | 'engineering'
  | 'automation'
  | 'digital-growth';

/**
 * Metadata for a blog post (displayed in cards and header).
 */
export interface BlogPostMeta {
  /** ISO date string (e.g., "2025-04-15") */
  readonly date: string;
  /** Human‑readable reading time (e.g., "5 min read") */
  readonly readTime: string;
  /** Primary category */
  readonly category: BlogCategory;
}

/**
 * A single blog post.
 */
export interface BlogPost {
  /** URL slug for deep linking */
  readonly slug: string;
  /** Post title */
  readonly title: string;
  /** One‑line excerpt for previews */
  readonly excerpt: string;
  /** Full content (Markdown or HTML) */
  readonly content: string;
  /** Post metadata */
  readonly meta: BlogPostMeta;
  /** Whether this post should be featured on the blog listing */
  readonly featured?: boolean;
  /** Optional hero image URL */
  readonly image?: string;
  /** Alt text for hero image */
  readonly imageAlt?: string;
}