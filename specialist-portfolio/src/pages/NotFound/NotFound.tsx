// src/pages/NotFound/NotFound.tsx
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | The Data Specialist</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className={styles.notFound}>
        <SectionContainer id="not-found" paddingSize="xl" backgroundVariant="default">
          <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>This page doesn't exist.</p>
            <Button variant="primary" as={Link} to="/">
              Return Home
            </Button>
          </div>
        </SectionContainer>
      </main>
    </>
  );
};

export default NotFound;