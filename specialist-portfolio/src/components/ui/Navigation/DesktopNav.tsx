// specialist-portfolio/src/components/ui/Navigation/DesktopNav.tsx
import React from 'react';
import { DesktopNavProps, NavItem } from './Nav.types';
import { NavDropdown } from './NavDropdown';
import styles from './Nav.module.css';
import clsx from 'clsx';

export const DesktopNav: React.FC<DesktopNavProps> = ({ items, currentPath }) => {
  const renderNavItem = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      return <NavDropdown key={item.href} item={item} currentPath={currentPath} />;
    }

    return (
      <a
        key={item.href}
        href={item.href}
        className={clsx(
          styles.navLink,
          currentPath === item.href && styles['navLink--active']
        )}
      >
        {item.label}
      </a>
    );
  };

  return <nav className={styles.desktopNav}>{items.map(renderNavItem)}</nav>;
};