import { memo } from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import Button from '@/components/ui/Button/Button';
import styles from './ContactCTASection.module.css';

const ContactCTASection = memo(() => {
  return (
    <SectionContainer id="contact-cta" paddingSize="xl" backgroundVariant="accent">
      <div className={styles.container}>
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