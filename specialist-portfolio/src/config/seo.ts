/**
 * seo.ts
 * SEO metadata configuration.
 * Defines default values and page‑specific overrides.
 * Used with react‑helmet‑async to populate <head>.
 */

import type { SEOMeta } from '@/types/common.types';
import { SITE_URL, SITE_NAME } from '@/utils/constants';

/**
 * Default SEO metadata used as fallback for all pages.
 * The title will be appended with the site name.
 */
export const DEFAULT_SEO: SEOMeta = {
  title: SITE_NAME,
  description:
    'Developer, AI Engineer, and Agentic Workflow Architect. I craft scalable systems where engineering meets strategy.',
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
 * Keys correspond to route names (as defined in ROUTES) or actual paths.
 * Values are partial SEOMeta objects that are merged with DEFAULT_SEO.
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
    title: 'Knowledge Base',
    description:
      'Structured guides and technical references for AI engineering, automation, and modern development.',
  },
  '/connect': {
    title: 'Contact',
    description:
      'Reach out for collaborations, consulting on AI systems, or to discuss a project.',
  },
};

/**
 * Helper to merge page‑specific SEO with defaults.
 * @param path - The current route path (e.g., '/work/portfolio')
 * @returns Complete SEOMeta object with all fields.
 */
export function getPageSEO(path: string): SEOMeta {
  const pageOverrides = PAGE_SEO[path] || {};
  return {
    ...DEFAULT_SEO,
    ...pageOverrides,
    // Ensure title always includes the site name (unless already fully customised)
    title: pageOverrides.title
      ? `${pageOverrides.title} | ${SITE_NAME}`
      : DEFAULT_SEO.title,
  };
}