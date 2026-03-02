// specialist-portfolio/src/components/ui/Navigation/NavDropdown.tsx
import React, { useRef, useEffect } from 'react';
import { NavDropdownProps } from './Nav.types';
import styles from './Nav.module.css';
import clsx from 'clsx';

export const NavDropdown: React.FC<NavDropdownProps> = ({ item, currentPath }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      // Focus first menu item after a short delay to allow menu to render
      setTimeout(() => {
        const firstItem = dropdownRef.current?.querySelector('a');
        firstItem?.focus();
      }, 50);
    }
  };

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        // Return focus to trigger
        const trigger = dropdownRef.current?.querySelector('[aria-haspopup]') as HTMLElement;
        trigger?.focus();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <div
      className={clsx(styles.dropdown, isOpen && styles['dropdown--open'])}
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={clsx(styles.navLink, styles.dropdown__trigger)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onKeyDown={handleKeyDown}
      >
        {item.label}
        <span className={styles.dropdown__arrow}>▼</span>
      </button>
      <div className={styles.dropdown__menu} role="menu">
        {item.children?.map((child) => (
          <a
            key={child.href}
            href={child.href}
            className={clsx(
              styles.dropdown__item,
              currentPath === child.href && styles['dropdown__item--active']
            )}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
};