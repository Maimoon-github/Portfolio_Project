// specialist-portfolio/src/pages/Home/sections/ManifestoSection.tsx

import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import SectionContainer from '@/components/layout/SectionContainer';
import styles from './Section.module.css';

const ManifestoSection = memo(() => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionContainer id="manifesto" paddingSize="lg" backgroundVariant="accent" ref={ref}>
      <div className={`${styles.manifesto} ${inView ? styles.animate : ''}`}>
        <h2 className={styles.heading}>The Operating System.</h2>
        <p className={styles.text}>
          I build intelligent systems that scale. I architect workflows that think. I design digital infrastructures that perform. This website is the primary interface to that capability. Every navigation choice and content block is a transaction of value, not just information.
        </p>
      </div>
    </SectionContainer>
  );
});

ManifestoSection.displayName = 'ManifestoSection';
export default ManifestoSection;