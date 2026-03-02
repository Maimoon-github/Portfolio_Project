/**
 * navigation.ts
 * Navigation structure configuration based on Full Navigation Structure.md.
 * Defines primary (header) and secondary (footer) navigation items.
 */

import type { NavItem } from '@/types/navigation.types';
import { ROUTES } from './routes';

/**
 * Primary navigation shown in the global header.
 * Matches the blueprint:
 * - Work (dropdown) → Portfolio, Projects
 * - Capabilities (dropdown) → Tools, Resume
 * - Mind (dropdown) → Blog
 * - Knowledge Base (dropdown) → Documentation
 * - Connect → Contact
 */
export const primaryNav: readonly NavItem[] = [
  {
    label: 'Work',
    href: '#', // parent with dropdown
    children: [
      { label: 'Portfolio', href: ROUTES.PORTFOLIO },
      { label: 'Projects', href: ROUTES.PROJECTS },
    ],
  },
  {
    label: 'Capabilities',
    href: '#',
    children: [
      { label: 'Tools', href: ROUTES.TOOLS },
      { label: 'Resume', href: ROUTES.RESUME },
    ],
  },
  {
    label: 'Mind',
    href: '#',
    children: [{ label: 'Blog', href: ROUTES.BLOG }],
  },
  {
    label: 'Knowledge Base',
    href: '#',
    children: [{ label: 'Documentation', href: ROUTES.DOCUMENTATION }],
  },
  {
    label: 'Connect',
    href: ROUTES.CONTACT,
  },
] as const;

/**
 * Secondary navigation shown in the footer.
 * Includes links to About, social profiles, and meta pages.
 */
export const secondaryNav: readonly NavItem[] = [
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'GitHub', href: 'https://github.com/dataspecialist', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dataspecialist', external: true },
  { label: 'All Content', href: '/sitemap' }, // placeholder, could link to a sitemap page
  { label: 'Colophon / Site Ethics', href: '/colophon' },
] as const;

/**
 * Combined navigation object for convenience.
 */
export const NAVIGATION = {
  primary: primaryNav,
  secondary: secondaryNav,
} as const;