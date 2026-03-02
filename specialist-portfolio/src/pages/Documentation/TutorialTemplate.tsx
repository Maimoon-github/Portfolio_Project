// specialist-portfolio/src/pages/Documentation/TutorialTemplate.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SectionContainer from '@/components/layout/SectionContainer';
import Button from '@/components/ui/Button';
import { tutorials, Tutorial } from './Documentation';
import styles from './Documentation.module.css';

const getTutorialBySlug = (slug: string): Tutorial | undefined => {
  return tutorials.find((t) => t.slug === slug);
};

/**
 * Individual tutorial page – dynamic route /mind/docs/:slug
 */
export const TutorialTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    const found = getTutorialBySlug(slug);
    setTutorial(found || null);
    setLoading(false);
  }, [slug]);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (loading) {
    return (
      <SectionContainer id="tutorial-loading" paddingSize="xl">
        <div className={styles.notFound}>
          <p>Loading...</p>
        </div>
      </SectionContainer>
    );
  }

  if (!tutorial) {
    return (
      <SectionContainer id="tutorial-not-found" paddingSize="xl">
        <div className={styles.notFound}>
          <h1 className={styles.notFound__title}>404</h1>
          <p className={styles.notFound__text}>Tutorial not found.</p>
          <Button variant="primary" onClick={() => navigate('/mind/docs')}>
            Back to Knowledge Base
          </Button>
        </div>
      </SectionContainer>
    );
  }

  // Extract Objective and Prerequisites from markdown content (simplified)
  const objectiveMatch = tutorial.content.match(/## Objective\s+(.+?)(?=\n##|\n\n)/s);
  const objective = objectiveMatch ? objectiveMatch[1].trim() : 'Learn to build this system.';

  const prereqMatch = tutorial.content.match(/## Prerequisites\s+((?:- .+\n?)+)/);
  const prerequisites = prereqMatch
    ? prereqMatch[1].split('\n').filter((l) => l.startsWith('- ')).map((l) => l.slice(2))
    : ['Basic programming knowledge'];

  return (
    <>
      <Helmet>
        <title>{tutorial.title} | The Data Specialist</title>
        <meta name="description" content={tutorial.excerpt} />
      </Helmet>

      <main>
        <SectionContainer id="tutorial-back" paddingSize="sm" backgroundVariant="default">
          <button onClick={() => navigate('/mind/docs')} className={styles.backLink}>
            ← Back to Knowledge Base
          </button>
        </SectionContainer>

        <SectionContainer id="tutorial-header" paddingSize="md" backgroundVariant="default">
          <div className={styles.tutorialHeader}>
            <h1 className={styles.tutorialHeader__title}>{tutorial.title}</h1>
            <div className={styles.tutorialHeader__meta}>
              <span className={styles.tutorialHeader__metaItem}>
                <span className={styles.tutorialHeader__metaIcon}>📚</span>
                {tutorial.category.toUpperCase()}
              </span>
              <span className={styles.tutorialHeader__metaItem}>
                <span className={styles.tutorialHeader__metaIcon}>⚡</span>
                {tutorial.difficulty}
              </span>
              <span className={styles.tutorialHeader__metaItem}>
                <span className={styles.tutorialHeader__metaIcon}>📅</span>
                Updated {new Date(tutorial.lastUpdated).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer id="tutorial-objective" paddingSize="md" backgroundVariant="surface">
          <div className={styles.objective}>
            <h2 className={styles.objective__title}>Objective</h2>
            <p className={styles.objective__text}>{objective}</p>
          </div>
        </SectionContainer>

        <SectionContainer id="tutorial-prerequisites" paddingSize="md" backgroundVariant="default">
          <h2 className={styles.sectionHeading}>Prerequisites</h2>
          <ul className={styles.prerequisites}>
            {prerequisites.map((item, i) => (
              <li key={i} className={styles.prerequisites__item}>{item}</li>
            ))}
          </ul>
        </SectionContainer>

        <SectionContainer id="tutorial-steps" paddingSize="md" backgroundVariant="default">
          <div className={styles.prose}>
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  if (!inline && match) {
                    const codeString = String(children).replace(/\n$/, '');
                    const index = Math.random(); // simplistic, but fine for demo
                    return (
                      <div className={styles.codeBlockWrapper}>
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className={styles.codeBlock}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                        <button
                          className={`${styles.copyButton} ${copiedIndex === index ? styles.copied : ''}`}
                          onClick={() => handleCopy(codeString, index)}
                        >
                          {copiedIndex === index ? '✓ Copied!' : 'Copy'}
                        </button>
                      </div>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {tutorial.content}
            </ReactMarkdown>
          </div>
        </SectionContainer>

        <SectionContainer id="tutorial-diagram" paddingSize="md" backgroundVariant="surface">
          <h2 className={styles.sectionHeading}>System Diagram</h2>
          <div className={styles.diagram}>
            <div className={styles.diagram__content}>
              [Architecture diagram placeholder – will be replaced with actual diagram]
            </div>
          </div>
        </SectionContainer>

        <SectionContainer id="tutorial-next" paddingSize="lg" backgroundVariant="default">
          <div className={styles.nextSteps}>
            <h2 className={styles.nextSteps__title}>Next Steps</h2>
            <div className={styles.nextSteps__links}>
              <Link to="/work/portfolio/agentic-research" className={styles.nextSteps__link}>
                Related Project →
              </Link>
              <Link to="/mind/blog/rag-best-practices" className={styles.nextSteps__link}>
                Related Blog Post →
              </Link>
            </div>
          </div>
        </SectionContainer>
      </main>
    </>
  );
};

export default TutorialTemplate;