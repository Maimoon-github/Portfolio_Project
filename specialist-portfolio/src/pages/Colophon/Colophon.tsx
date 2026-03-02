// specialist-portfolio/src/pages/Colophon/Colophon.tsx

import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import PageWrapper from '@/components/layout/PageWrapper';
import styles from './Colophon.module.css';

/**
 * Colophon page – site credits, design rationale, and ethics.
 * Implements "The Data Specialist" design system with lapis lazuli inspiration.
 */
const Colophon = memo(() => {
  return (
    <>
      <Helmet>
        <title>Colophon | The Data Specialist</title>
        <meta name="description" content="The design system, tools, and ethics behind this site." />
      </Helmet>

      <main className={styles.colophon}>
        <PageWrapper narrow>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.header__title}>Colophon</h1>
            <p className={styles.header__subtitle}>Site credits & design rationale</p>
          </div>

          {/* Design System */}
          <section className={styles.section}>
            <h2 className={styles.section__title}>Design System</h2>
            <div className={styles.section__content}>
              <p>
                Inspired by polished lapis lazuli spheres with golden flecks, this site communicates precision,
                depth, and understated luxury. The deep blues evoke trust and authority, while the warm gold
                accent highlights critical data.
              </p>
              <p>
                <strong>Lapis Deep</strong> (<code>#0D33A6</code>) dominates as the primary brand color.
                <strong>Gold Fleck</strong> (<code>#D9AE89</code>) is used sparingly for accents, numbers, and
                calls to action.
              </p>
            </div>
          </section>

          {/* Typography */}
          <section className={styles.section}>
            <h2 className={styles.section__title}>Typography</h2>
            <div className={styles.section__content}>
              <p>
                <strong>Inter</strong> provides geometric clarity for headings and UI text.
                <strong>JetBrains Mono</strong> is used for all numbers and code, reinforcing technical precision.
              </p>
              <p>
                Body text is set at 1.125rem for readability, with generous line height and spacing.
              </p>
            </div>
          </section>

          {/* Tools */}
          <section className={styles.section}>
            <h2 className={styles.section__title}>Built With</h2>
            <div className={styles.section__content}>
              <p>This site is crafted using modern tools and frameworks:</p>
              <div className={styles.toolsGrid}>
                <div className={styles.toolItem}>React 18</div>
                <div className={styles.toolItem}>TypeScript</div>
                <div className={styles.toolItem}>Vite</div>
                <div className={styles.toolItem}>CSS Modules</div>
                <div className={styles.toolItem}>React Router</div>
                <div className={styles.toolItem}>React Helmet Async</div>
              </div>
            </div>
          </section>

          {/* Site Ethics */}
          <section className={styles.section}>
            <h2 className={styles.section__title}>Site Ethics</h2>
            <div className={styles.section__content}>
              <ul className={styles.ethicsList}>
                <li className={styles.ethicsItem}>
                  <strong>Accessibility</strong> – Built to WCAG 2.1 AA standards, with semantic HTML,
                  keyboard navigation, and screen reader support.
                </li>
                <li className={styles.ethicsItem}>
                  <strong>Privacy</strong> – No tracking cookies, no analytics. Minimal logging respects
                  your anonymity.
                </li>
                <li className={styles.ethicsItem}>
                  <strong>Sustainability</strong> – Optimized assets and efficient code reduce carbon footprint.
                </li>
                <li className={styles.ethicsItem}>
                  <strong>Open Source</strong> – This site’s code is available on GitHub for transparency and
                  learning.
                </li>
              </ul>
            </div>
          </section>
        </PageWrapper>
      </main>
    </>
  );
});

Colophon.displayName = 'Colophon';
export default Colophon;