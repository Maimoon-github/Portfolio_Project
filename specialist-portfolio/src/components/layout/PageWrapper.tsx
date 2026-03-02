// specialist-portfolio/src/components/layout/PageWrapper.tsx
import { forwardRef, ElementType, HTMLAttributes } from 'react';
import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';
import styles from './PageWrapper.module.css';

export interface PageWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  narrow?: boolean;               // reduces max-width for readability
  className?: string;
  as?: ElementType;

  // Metadata (handled via react-helmet-async)
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
}

/**
 * PageWrapper – wraps page-specific content and injects SEO metadata.
 * Includes a three‑column grid with a centered content area and an optional narrow variant.
 * Applies a subtle fade‑in animation.
 */
const PageWrapper = forwardRef<HTMLElement, PageWrapperProps>(
  (
    {
      children,
      narrow = false,
      className,
      as: Component = 'div',
      title,
      description,
      keywords,
      noIndex,
      canonicalUrl,
      ...rest
    },
    ref
  ) => {
    const wrapperClasses = clsx(
      styles.wrapper,
      narrow && styles['wrapper--narrow'],
      className
    );

    const metaTitle = title ? `${title} | The Data Specialist` : 'The Data Specialist';
    const metaDescription =
      description || 'A digital headquarters showcasing precision, depth, and understated luxury in data expertise.';
    const metaKeywords = keywords?.join(', ') || 'data specialist, portfolio, AI engineering, automation, web development';
    const robots = noIndex ? 'noindex, nofollow' : 'index, follow';

    return (
      <>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={metaKeywords} />
          <meta name="robots" content={robots} />
          {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        <Component ref={ref} className={wrapperClasses} {...rest}>
          <div className={styles.wrapper__content}>{children}</div>
        </Component>
      </>
    );
  }
);

PageWrapper.displayName = 'PageWrapper';

export default PageWrapper;