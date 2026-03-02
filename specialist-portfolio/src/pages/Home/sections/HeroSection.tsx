// specialist-portfolio/src/pages/Home/sections/HeroSection.tsx

import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import HeroKPIStrip from '@/components/ui/HeroKPIStrip';
import styles from './Section.module.css';

// Mock KPI data
const kpiData = [
  { label: 'Projects Delivered', value: '15+' },
  { label: 'Years Experience', value: '8' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Automation Efficiency', value: '40%' },
];

const HeroSection = memo(() => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionContainer id="hero" paddingSize="xl" backgroundVariant="default" ref={ref}>
      <div className={`${styles.heroGrid} ${inView ? styles.animate : ''}`}>
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
      <HeroKPIStrip data={kpiData} />
    </SectionContainer>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;