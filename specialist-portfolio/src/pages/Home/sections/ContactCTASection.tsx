// specialist-portfolio/src/pages/Home/sections/ContactCTASection.tsx

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import styles from './Section.module.css';

const ContactCTASection = memo(() => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <SectionContainer
      id="contact-cta"
      paddingSize="xl"
      backgroundVariant="accent"
      ref={ref}
    >
      <div className={`${styles.container} ${inView ? styles.animate : ''}`}>
        <h2 className={styles.heading}>Interface.</h2>
        <p className={styles.text}>Let's Build Intelligent Systems.</p>
        <Button variant="accent" size="lg" as={Link} to="/connect">
          Contact Me
        </Button>
      </div>
    </SectionContainer>
  );
});

ContactCTASection.displayName = 'ContactCTASection';
export default ContactCTASection;