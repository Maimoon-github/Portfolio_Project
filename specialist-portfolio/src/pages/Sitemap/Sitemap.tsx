// specialist-portfolio/src/pages/Sitemap/Sitemap.tsx

import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './Sitemap.module.css';

// Define site structure – could be imported from navigation config
const sitemapSections = [
  {
    title: 'Main',
    links: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Resume', path: '/resume' },
      { label: 'Contact', path: '/connect' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Portfolio (Curated)', path: '/work/portfolio' },
      { label: 'Projects Archive', path: '/work/projects' },
    ],
  },
  {
    title: 'Capabilities',
    links: [
      { label: 'Tools', path: '/capabilities/tools' },
    ],
  },
  {
    title: 'Mind',
    links: [
      { label: 'Blog', path: '/mind/blog' },
      { label: 'Documentation', path: '/mind/docs' },
      { label: 'Tutorials', path: '/mind/tutorials' },
    ],
  },
  {
    title: 'Meta',
    links: [
      { label: 'Colophon', path: '/colophon' },
      { label: 'Sitemap (You are here)', path: '/sitemap' },
    ],
  },
  {
    title: 'External',
    links: [
      { label: 'GitHub', path: 'https://github.com/dataspecialist', external: true },
      { label: 'LinkedIn', path: 'https://linkedin.com/in/dataspecialist', external: true },
    ],
  },
];

/**
 * Sitemap page – lists all pages for users and search engines.
 * Simple, accessible, with grouping and minimal styling.
 */
const Sitemap = memo(() => {
  return (
    <>
      <Helmet>
        <title>Sitemap | The Data Specialist</title>
        <meta name="description" content="Complete sitemap of all pages on this site." />
        <meta name="robots" content="noindex, follow" /> {/* Typically sitemap is noindex */}
      </Helmet>

      <main className={styles.sitemap}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.header__title}>Sitemap</h1>
            <p className={styles.header__description}>
              All pages on this site, organized for easy navigation.
            </p>
          </header>

          <div className={styles.grid}>
            {sitemapSections.map((section) => (
              <section key={section.title} className={styles.section}>
                <h2 className={styles.section__title}>{section.title}</h2>
                <ul className={styles.section__list}>
                  {section.links.map((link) => (
                    <li key={link.path} className={styles.section__item}>
                      {link.external ? (
                        <a
                          href={link.path}
                          className={styles.section__link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label} ↗
                        </a>
                      ) : (
                        <Link to={link.path} className={styles.section__link}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className={styles.note}>
            Dynamic pages (individual projects, blog posts, tutorials) are not listed here but are accessible via their respective archive pages.
          </p>
        </div>
      </main>
    </>
  );
});

Sitemap.displayName = 'Sitemap';
export default Sitemap;