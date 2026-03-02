import { memo } from 'react';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import styles from './StackSnapshotSection.module.css';

const skills = [
  'Python', 'TypeScript', 'React', 'Node.js', 'LangChain',
  'LLM Ops', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL',
  'TensorFlow', 'FastAPI', 'Next.js', 'GraphQL', 'Redis'
];

const StackSnapshotSection = memo(() => {
  return (
    <SectionContainer id="stack-snapshot" paddingSize="lg" backgroundVariant="surface">
      <h2 className={styles.heading}>Current Stack & Toolkits.</h2>
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