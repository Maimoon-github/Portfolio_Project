import { memo } from 'react';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import Button from '@/components/ui/Button/Button';
import styles from './HeroSection.module.css';

const HeroSection = memo(() => {
  return (
    <SectionContainer id="hero" paddingSize="xl" backgroundVariant="default">
      <div className={styles.heroGrid}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Building Intelligent Systems.</span>
            <span className={styles.titleLine}>Designing Digital Impact.</span>
          </h1>
          <p className={styles.meta}>
            Developer, AI Engineer, and Agentic Workflow Architect. I craft scalable systems where engineering meets strategy.
          </p>
          <div className={styles.cta}>
            <Button variant="primary" size="lg" as="a" href="/work/portfolio">
              View Portfolio
            </Button>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualElement} />
        </div>
      </div>
    </SectionContainer>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;