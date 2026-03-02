/**
 * Blog category options.
 * Aligns with "The Data Specialist" content strategy.
 */
export type BlogCategory = 'ai-strategy' | 'engineering' | 'automation' | 'digital-growth';

/**
 * Metadata for a blog post (displayed in cards and header).
 */
export interface BlogPostMeta {
  /** ISO date string (e.g., "2025-04-15") */
  date: string;
  /** Human‑readable reading time (e.g., "5 min read") */
  readTime: string;
  /** Primary category */
  category: BlogCategory;
}

/**
 * A single blog post.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Full content (Markdown or HTML) */
  content: string;
  meta: BlogPostMeta;
  featured?: boolean;
  /** Optional hero image URL */
  image?: string;
  imageAlt?: string;
}

/**
 * Data structure for the blog listing page.
 */
export interface BlogPageData {
  featured: BlogPost | null;
  posts: BlogPost[];
}