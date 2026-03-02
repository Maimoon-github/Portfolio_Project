// specialist-portfolio/src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import Navbar from '../ui/Navigation'; // assumes index.ts exports Navbar
import { useScrollPosition } from '../../hooks/useScrollPosition';
import styles from './layout.module.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 0;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles['header--scrolled'] : ''}`}
    >
      <div className={styles.header__inner}>
        <div className={styles.header__logo}>
          <a href="/" aria-label="The Data Specialist – Home">
            <span className={styles['header__logo-text']}>The Data Specialist</span>
          </a>
        </div>

        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={toggleMobileMenu}
        />

        <button
          className={styles.header__menuButton}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;