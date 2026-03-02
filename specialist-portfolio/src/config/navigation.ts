// specialist-portfolio/src/config/navigation.ts

import type { NavItem } from '@/types/navigation.types';
import { ROUTES } from './routes';

/**
 * Primary navigation for the global header.
 * Matches the "Digital Headquarters" blueprint.
 */
export const primaryNav: NavItem[] = [
  {
    label: 'Work',
    href: '#', // parent dropdown placeholder
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
    children: [
      { label: 'Documentation', href: ROUTES.DOCUMENTATION },
      { label: 'Tutorials', href: ROUTES.TUTORIALS },
    ],
  },
  {
    label: 'Connect',
    href: '#',
    children: [{ label: 'Contact', href: ROUTES.CONTACT }],
  },
];

/**
 * Secondary navigation for the footer.
 * Includes internal links and external social profiles.
 */
export const secondaryNav: NavItem[] = [
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'GitHub', href: 'https://github.com/dataspecialist', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dataspecialist', external: true },
  { label: 'All Content', href: ROUTES.SITEMAP },
  { label: 'Colophon', href: ROUTES.COLOPHON },
];

/** Combined navigation object for convenience. */
export const NAVIGATION = {
  primary: primaryNav,
  secondary: secondaryNav,
} as const;