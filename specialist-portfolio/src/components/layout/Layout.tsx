// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';
import Footer from '../ui/Footer/Footer'; // adjust path if needed
import styles from './layout.module.css';

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className={`${styles.layout} ${className}`}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className={styles.layout__main} tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;