// specialist-portfolio/src/types/navigation.types.ts

/**
 * Navigation structure type definitions.
 * Aligns exactly with "Full Navigation Structure.md".
 */

/**
 * A single navigation item.
 * Supports nested dropdowns for multi‑level navigation.
 */
export interface NavItem {
  /** Display text for the navigation item */
  readonly label: string;
  /** URL or path the item points to */
  readonly href: string;
  /** Nested child items for dropdowns (e.g., Work → Portfolio, Projects) */
  readonly children?: readonly NavItem[];
  /** Whether the link is external (opens in new tab) */
  readonly external?: boolean;
}

/**
 * Complete navigation configuration.
 * Separates primary (header) and secondary (footer) navigation.
 */
export interface NavigationConfig {
  /** Primary navigation shown in the global header */
  readonly primary: readonly NavItem[];
  /** Secondary navigation shown in the footer */
  readonly secondary: readonly NavItem[];
}