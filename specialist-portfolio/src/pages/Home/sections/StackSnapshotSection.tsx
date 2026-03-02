// specialist-portfolio/src/pages/Home/sections/StackSnapshotSection.tsx

import { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import SectionContainer from '@/components/layout/SectionContainer';
import styles from './Section.module.css';

const skills = [
  'Python', 'TypeScript', 'React', 'Node.js', 'LangChain',
  'LLM Ops', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL',
  'TensorFlow', 'FastAPI', 'Next.js', 'GraphQL', 'Redis'
];

const StackSnapshotSection = memo(() => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionContainer id="stack-snapshot" paddingSize="lg" backgroundVariant="surface" ref={ref}>
      <h2 className={`${styles.heading} ${inView ? styles.animate : ''}`}>Current Stack & Toolkits.</h2>
      <div className={styles.tagCloud}>
        {skills.map((skill) => (
          <span key={skill} className={styles.tag}>
            {skill}
          </span>
        ))}
      </div>
    </SectionContainer>
  );
});

StackSnapshotSection.displayName = 'StackSnapshotSection';
export default StackSnapshotSection;