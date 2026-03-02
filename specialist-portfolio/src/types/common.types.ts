/**
 * Common type definitions shared across the application.
 * Aligns with "The Data Specialist" design system and Full Navigation Structure.
 */

import type { ReactNode } from 'react';

/**
 * Navigation item for global header and footer menus.
 * Supports nested dropdowns for multi‑level navigation.
 */
export interface NavigationItem {
  /** Display text for the navigation item */
  label: string;
  /** URL or path the item points to */
  href: string;
  /** Nested child items for dropdowns (e.g., Work → Portfolio, Projects) */
  children?: readonly NavigationItem[];
  /** Whether the link is external (opens in new tab) */
  external?: boolean;
  /** Optional icon element (e.g., for social links in footer) */
  icon?: ReactNode;
}

/**
 * Generic filter option used across FilterBar components.
 * Supports optional count badge for showing result counts.
 */
export interface FilterOption {
  /** Display label for the filter (e.g., "AI Engineering") */
  label: string;
  /** Internal value used for filtering logic */
  value: string;
  /** Optional count of items matching this filter */
  count?: number;
}

/**
 * SEO metadata for pages.
 * Used with react‑helmet‑async to populate <head>.
 */
export interface SEOMeta {
  /** Page title (will be appended with " | The Data Specialist") */
  title: string;
  /** Meta description */
  description: string;
  /** Meta keywords (array for flexibility) */
  keywords?: readonly string[];
  /** Canonical URL for the page */
  canonical?: string;
  /** Open Graph image URL */
  ogImage?: string;
}

/**
 * Project status values, matching Projects Page filters.
 * - `active`: Currently maintained / in development
 * - `archived`: Stable but no longer actively developed
 * - `experimental`: Proof‑of‑concept / research stage
 */
export type ProjectStatus = 'active' | 'archived' | 'experimental';

/**
 * Project category values, matching Portfolio/Projects filters.
 * Based on "The Data Specialist" content categories.
 */
export type ProjectCategory =
  | 'ai-engineering'
  | 'web-apps'
  | 'automation'
  | 'strategy';

/**
 * Blog category values, matching Blog Page filters.
 */
export type BlogCategory =
  | 'ai-strategy'
  | 'engineering'
  | 'automation'
  | 'digital-growth';

/**
 * Tool category values, matching Tools Page filters.
 */
export type ToolCategory =
  | 'ai-prompts'
  | 'automation'
  | 'dev-utils'
  | 'strategy';

/**
 * Utility type for components that accept children.
 * Example: `type Props = WithChildren<{ title: string }>`
 */
export type WithChildren<P = Record<string, never>> = P & {
  /** Child elements to render inside the component */
  children: ReactNode;
};

/**
 * Utility type for components that may accept children.
 * Example: `type Props = OptionalChildren<{ title: string }>`
 */
export type OptionalChildren<P = Record<string, never>> = P & {
  /** Optional child elements */
  children?: ReactNode;
};

/**
 * Responsive breakpoints based on standard screen sizes.
 * Used for conditional logic in hooks and components.
 *
 * - `sm`: 640px   (small devices)
 * - `md`: 768px   (medium devices)
 * - `lg`: 1024px  (large devices)
 * - `xl`: 1280px  (extra large)
 * - `2xl`: 1536px (double extra large)
 */
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';