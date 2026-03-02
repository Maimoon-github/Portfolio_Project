// specialist-portfolio/src/config/seo.ts

/**
 * Global SEO constants and per‑page metadata.
 * Used with react‑helmet‑async to populate <head>.
 */

export const SITE_TITLE = 'The Data Specialist';
export const SITE_DESCRIPTION =
  'Developer, AI Engineer, and Agentic Workflow Architect. I craft scalable systems where engineering meets strategy.';
export const SITE_URL = 'https://dataspecialist.dev';
export const AUTHOR = 'Your Name';
export const TWITTER_HANDLE = '@dataspecialist';

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Default SEO values used as a base for all pages.
 */
export const DEFAULT_SEO: SEOMeta = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'AI Engineer',
    'Developer',
    'Portfolio',
    'Agentic Workflows',
    'React',
    'TypeScript',
    'Python',
  ],
  canonical: SITE_URL,
  ogImage: '/og-image.png',
};

/**
 * Page‑specific SEO overrides.
 * Keys correspond to route paths (as defined in ROUTES).
 */
export const PAGE_SEO: Record<string, Partial<SEOMeta>> = {
  '/': {
    title: 'Home',
    description:
      'I build intelligent systems. Explore a portfolio of AI engineering, scalable web apps, and automation architectures.',
  },
  '/about': {
    title: 'About',
    description:
      'Learn how I combine software engineering, AI, and digital strategy to build intelligent, scalable systems.',
  },
  '/resume': {
    title: 'Resume & Technical Expertise',
    description:
      'Explore the technical stack, professional history, and key achievements of a multidisciplinary Developer and AI Engineer.',
  },
  '/work/portfolio': {
    title: 'Portfolio – Curated Work',
    description:
      'A curated selection of my best work in AI engineering, system architecture, and digital strategy.',
  },
  '/work/projects': {
    title: 'Project Archive – Full Catalog',
    description:
      'Browse the complete archive of projects by a Developer and AI Engineer, including experimental builds, MVPs, and research implementations.',
  },
  '/capabilities/tools': {
    title: 'Tools & AI Utilities',
    description:
      'Free, open‑source tools and frameworks for developers, AI engineers, and digital strategists.',
  },
  '/mind/blog': {
    title: 'Insights & Ideas',
    description:
      'In‑depth articles and analysis on AI engineering, system design, automation, and digital strategy.',
  },
  '/mind/docs': {
    title: 'Documentation',
    description:
      'Structured guides and technical references for AI engineering, automation, and modern development.',
  },
  '/mind/tutorials': {
    title: 'Tutorials',
    description:
      'Step‑by‑step tutorials to build intelligent systems and workflows.',
  },
  '/connect': {
    title: 'Contact',
    description:
      'Reach out for collaborations, consulting on AI systems, or to discuss a project.',
  },
  '/colophon': {
    title: 'Colophon',
    description:
      'The tech stack, tools, and design decisions behind this site.',
  },
  '/sitemap': {
    title: 'Sitemap',
    description: 'Find all pages on this site.',
    noIndex: true,
  },
};

/**
 * Build complete SEO metadata for a given route.
 * @param path - The current route path (e.g., '/work/portfolio')
 * @returns Complete SEOMeta object with defaults merged.
 */
export function getPageSEO(path: string): SEOMeta {
  const pageOverrides = PAGE_SEO[path] || {};
  return {
    ...DEFAULT_SEO,
    ...pageOverrides,
    title: pageOverrides.title
      ? `${pageOverrides.title} | ${SITE_TITLE}`
      : DEFAULT_SEO.title,
  };
}