// specialist-portfolio/src/components/ui/Navigation/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { NavbarProps } from './Nav.types';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import styles from './Nav.module.css';
import { useLocation } from 'react-router-dom'; // or next/router, depending on routing

export const Navbar: React.FC<NavbarProps> = ({ items, className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Detect mobile via media query (client-side only)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileToggle = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  return (
    <div className={`${styles.navbar} ${className || ''}`}>
      {!isMobile ? (
        <DesktopNav items={items} currentPath={currentPath} />
      ) : (
        <MobileNav
          items={items}
          currentPath={currentPath}
          isOpen={isMobileMenuOpen}
          onClose={handleMobileClose}
          onToggle={handleMobileToggle}
        />
      )}
    </div>
  );
};