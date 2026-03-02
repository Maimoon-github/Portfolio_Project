/**
 * Types for the Home page.
 * Aligns with "The Data Specialist" design system and the content blueprint.
 */

/**
 * A featured project displayed in the "Active Nodes" section.
 * Subset of ProjectCardProps.
 */
export interface FeaturedProject {
  id: string;
  title: string;
  summary: string;
  category: 'ai-engineering' | 'web-apps' | 'automation' | 'strategy';
  link: string;
  image?: string;
  imageAlt?: string;
}

/**
 * Technology stack item shown in "Current Stack & Toolkits".
 */
export interface StackItem {
  name: string;
  /** Optional icon emoji or character */
  icon?: string;
  /** Proficiency level (affects styling) */
  level: 'expert' | 'advanced' | 'familiar';
}

/**
 * A preview of recent content from the Lab (blog or documentation).
 */
export interface ContentPreview {
  id: string;
  title: string;
  excerpt: string;
  category: 'blog' | 'documentation';
  slug: string;
  /** Publication or last updated date (ISO string) */
  date: string;
}

/**
 * Full data structure for the Home page.
 * Ready for future API integration.
 */
export interface HomePageData {
  featuredProjects: FeaturedProject[];
  stackItems: StackItem[];
  latestContent: ContentPreview[];
}