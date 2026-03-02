/**
 * routes.ts
 * Centralised route map for the entire application.
 * All route paths are defined here as constants to prevent hardcoded strings.
 * Use `as const` to infer literal types for type-safe navigation.
 */

export const ROUTES = {
  /** Homepage */
  HOME: '/',

  /** About page */
  ABOUT: '/about',

  /** Resume / CV page */
  RESUME: '/resume',

  /** Curated portfolio (level 2) */
  PORTFOLIO: '/work/portfolio',

  /** Comprehensive project archive (level 2) */
  PROJECTS: '/work/projects',

  /** Individual project detail (level 3) */
  PROJECT_DETAIL: '/work/portfolio/:slug',

  /** Tools & utilities (level 2) */
  TOOLS: '/capabilities/tools',

  /** Blog listing (level 2) */
  BLOG: '/mind/blog',

  /** Individual blog post (level 3) */
  BLOG_POST: '/mind/blog/:slug',

  /** Documentation / knowledge base listing (level 2) */
  DOCUMENTATION: '/mind/docs',

  /** Individual tutorial (level 3) */
  TUTORIAL: '/mind/docs/:slug',

  /** Contact page */
  CONTACT: '/connect',
} as const;

// Type helper: extract all route paths as a union (if needed elsewhere)
export type RoutePath = typeof ROUTES[keyof typeof ROUTES];