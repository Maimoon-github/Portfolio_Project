// specialist-portfolio/src/pages/Home/Home.tsx

import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from './sections/HeroSection';
import ManifestoSection from './sections/ManifestoSection';
import FeaturedProjectsSection from './sections/FeaturedProjectsSection';
import StackSnapshotSection from './sections/StackSnapshotSection';
import LatestLabSection from './sections/LatestLabSection';
import ContactCTASection from './sections/ContactCTASection';
import styles from './Home.module.css';

/**
 * Home page – the central nervous system of the digital headquarters.
 * Composes all section components following "The Data Specialist" design system.
 */
const Home = memo(() => {
  return (
    <>
      <Helmet>
        <title>The Data Specialist | Developer, AI Engineer, Architect</title>
        <meta
          name="description"
          content="Developer, AI Engineer, and Agentic Workflow Architect. I craft scalable systems where engineering meets strategy."
        />
      </Helmet>

      <main className={styles.home}>
        <HeroSection />
        <ManifestoSection />
        <FeaturedProjectsSection />
        <StackSnapshotSection />
        <LatestLabSection />
        <ContactCTASection />
      </main>
    </>
  );
});

Home.displayName = 'Home';
export default Home;