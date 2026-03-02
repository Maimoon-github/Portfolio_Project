import { memo } from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import styles from './LatestLabSection.module.css';

const latestItems = [
  {
    id: '1',
    type: 'blog',
    title: 'The Future of Agentic Workflows',
    excerpt: 'Exploring autonomous systems and their impact on digital infrastructure.',
    link: '/mind/blog/future-agentic-workflows',
  },
  {
    id: '2',
    type: 'doc',
    title: 'Building a RAG Pipeline with LangChain',
    excerpt: 'Step‑by‑step tutorial to create a retrieval‑augmented generation system.',
    link: '/mind/docs/rag-pipeline-tutorial',
  },
];

const LatestLabSection = memo(() => {
  return (
    <SectionContainer id="latest-lab" paddingSize="lg" backgroundVariant="default">
      <h2 className={styles.heading}>Latest from the Lab.</h2>
      <div className={styles.grid}>
        {latestItems.map((item) => (
          <article key={item.id} className={styles.card}>
            <span className={styles.cardType}>
              {item.type === 'blog' ? 'Blog' : 'Tutorial'}
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardExcerpt}>{item.excerpt}</p>
            <Link to={item.link} className={styles.cardLink}>
              Read more <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
      <div className={styles.footer}>
        <Link to="/mind/blog" className={styles.viewAllLink}>
          All insights <span aria-hidden="true">→</span>
        </Link>
      </div>
    </SectionContainer>
  );
});

LatestLabSection.displayName = 'LatestLabSection';
export default LatestLabSection;