// specialist-portfolio/src/components/ui/Navigation/MobileNav.tsx
import React, { useEffect, useRef } from 'react';
import { MobileNavProps, NavItem } from './Nav.types';
import styles from './Nav.module.css';
import clsx from 'clsx';

export const MobileNav: React.FC<MobileNavProps> = ({
  items,
  currentPath,
  isOpen,
  onClose,
  onToggle,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Trap focus inside panel when open
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const focusableElements = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  // Close when clicking overlay
  const handleOverlayClick = () => {
    onClose();
  };

  // Render a nav item (including children)
  const renderMobileItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    return (
      <li key={item.href} className={styles.mobileNav__item}>
        <a
          href={item.href}
          className={clsx(
            styles.mobileNav__link,
            currentPath === item.href && styles['mobileNav__link--active']
          )}
          onClick={onClose}
        >
          {item.label}
        </a>
        {hasChildren && (
          <ul className={styles.mobileNav__submenu}>
            {item.children!.map((child) => renderMobileItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      <button
        ref={toggleRef}
        className={clsx(styles.mobileNav__toggle, isOpen && styles['mobileNav__toggle--open'])}
        onClick={onToggle}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={clsx(styles.mobileNav__overlay, isOpen && styles['mobileNav__overlay--visible'])}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={clsx(styles.mobileNav__panel, isOpen && styles['mobileNav__panel--open'])}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <ul className={styles.mobileNav__list}>{items.map(renderMobileItem)}</ul>
      </div>
    </>
  );
};