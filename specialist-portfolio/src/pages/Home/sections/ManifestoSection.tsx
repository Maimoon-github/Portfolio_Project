import { memo } from 'react';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import styles from './ManifestoSection.module.css';

const ManifestoSection = memo(() => {
  return (
    <SectionContainer id="manifesto" paddingSize="lg" backgroundVariant="accent">
      <div className={styles.manifesto}>
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