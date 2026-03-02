// specialist-portfolio/src/components/ui/Navigation/Nav.types.ts
/**
 * Types for navigation components.
 */

export interface NavItem {
  /** Display label */
  label: string;
  /** URL or path */
  href: string;
  /** Optional child items for dropdown */
  children?: NavItem[];
  /** Whether this item matches the current route exactly */
  isActive?: boolean;
  /** Optional icon (if needed) */
  icon?: React.ReactNode;
}

export interface NavbarProps {
  /** Navigation items (usually from config) */
  items: NavItem[];
  /** Optional CSS class name */
  className?: string;
}

export interface DesktopNavProps {
  items: NavItem[];
  /** Current path for active state */
  currentPath?: string;
}

export interface MobileNavProps {
  items: NavItem[];
  currentPath?: string;
  /** Controls mobile menu open state */
  isOpen: boolean;
  /** Callback to close menu */
  onClose: () => void;
  /** Callback to toggle menu */
  onToggle: () => void;
}

export interface NavDropdownProps {
  /** Parent item with children */
  item: NavItem;
  /** Current path for active state */
  currentPath?: string;
}