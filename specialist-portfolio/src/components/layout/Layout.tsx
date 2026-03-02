import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../ui/Header/Header';
import Footer from '../ui/Footer/Footer';
import styles from './Layout.module.css';

export interface LayoutMeta {
  /** Page title (will be appended with " | The Data Specialist") */
  title?: string;
  /** Meta description */
  description?: string;
  /** Meta keywords array */
  keywords?: string[];
  /** Whether to prevent indexing (noindex) */
  noIndex?: boolean;
  /** Canonical URL for the page */
  canonicalUrl?: string;
}

export interface LayoutProps {
  /** Page content */
  children: ReactNode;
  /** SEO metadata for the current page */
  meta?: LayoutMeta;
  /** Additional CSS class name for the layout container */
  className?: string;
}

/**
 * Main layout component providing persistent header/footer, SEO metadata,
 * and a skip navigation link for accessibility.
 */
const Layout = ({ children, meta, className = '' }: LayoutProps) => {
  const defaultTitle = 'The Data Specialist';
  const pageTitle = meta?.title ? `${meta.title} | ${defaultTitle}` : defaultTitle;
  const description = meta?.description || 'A digital headquarters showcasing precision, depth, and understated luxury in data expertise.';
  const keywords = meta?.keywords?.join(', ') || 'data specialist, portfolio, AI engineering, automation, web development';
  const robots = meta?.noIndex ? 'noindex, nofollow' : 'index, follow';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content={robots} />
        {meta?.canonicalUrl && <link rel="canonical" href={meta.canonicalUrl} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

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
    </>
  );
};

export default Layout;