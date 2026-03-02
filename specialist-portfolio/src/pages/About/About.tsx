// specialist-portfolio/src/pages/About/About.tsx

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import styles from './About.module.css';

/**
 * Discipline card component using Card and Badge components.
 * Displays a core competency with description, tags, and filtered link.
 */
const DisciplineCard = ({
  title,
  description,
  filter,
  tags,
}: {
  title: string;
  description: string;
  filter: string;
  tags: string[];
}) => (
  <Card className={styles.discipline} interactive>
    <h3 className={styles.discipline__title}>{title}</h3>
    <p className={styles.discipline__description}>{description}</p>
    <div className={styles.discipline__tags}>
      {tags.map((tag) => (
        <Badge key={tag} variant="primary">
          {tag}
        </Badge>
      ))}
    </div>
    <Link to={`/work/projects?type=${filter}`} className={styles.discipline__link}>
      View projects <span aria-hidden="true">→</span>
    </Link>
  </Card>
);

/**
 * About page – a statement of principles and capabilities.
 * Implements "The Data Specialist" design system with deep lapis blues and gold accents.
 * Sections: Hero, Core Thesis, Disciplines, Principles, Press/Features.
 */
const About = memo(() => {
  return (
    <>
      <Helmet>
        <title>About | The Data Specialist</title>
        <meta
          name="description"
          content="Learn how I combine software engineering, AI, and digital strategy to build intelligent, scalable systems."
        />
      </Helmet>

      <main className={styles.about}>
        {/* Hero Section */}
        <SectionContainer id="about-hero" paddingSize="xl" backgroundVariant="default">
          <div className={styles.hero}>
            <h1 className={styles.hero__title}>Engineering Systems. Architecting Intelligence.</h1>
            <p className={styles.hero__meta}>
              Learn how I combine software engineering, AI, and digital strategy to build intelligent, scalable systems.
            </p>
          </div>
        </SectionContainer>

        {/* Core Thesis */}
        <SectionContainer id="core-thesis" paddingSize="lg" backgroundVariant="accent">
          <div className={styles.thesis}>
            <p className={styles.thesis__text}>
              I don't just write code. I don't just design workflows. I don't just analyze data. I synthesize all three into systems that think, adapt, and scale.
            </p>
          </div>
        </SectionContainer>

        {/* Disciplines of Practice */}
        <SectionContainer id="disciplines" paddingSize="lg" backgroundVariant="default">
          <h2 className={styles.section__title}>Disciplines of Practice</h2>
          <div className={styles.disciplines__grid}>
            <DisciplineCard
              title="AI Engineering"
              description="Building intelligent agents, RAG pipelines, and LLM-powered systems that augment human decision-making."
              filter="ai-engineering"
              tags={['AI', 'LLM', 'Python']}
            />
            <DisciplineCard
              title="Web Applications"
              description="Crafting scalable, performant web apps with modern React, TypeScript, and Node.js."
              filter="web-apps"
              tags={['React', 'TypeScript', 'Node']}
            />
            <DisciplineCard
              title="Automation Architecture"
              description="Designing autonomous workflows and integration systems that eliminate toil and reduce errors."
              filter="automation"
              tags={['Workflow', 'CI/CD', 'Python']}
            />
            <DisciplineCard
              title="Digital Strategy"
              description="Aligning technical execution with business goals to deliver measurable impact."
              filter="strategy"
              tags={['Strategy', 'Consulting', 'Analytics']}
            />
          </div>
        </SectionContainer>

        {/* Principles */}
        <SectionContainer id="principles" paddingSize="lg" backgroundVariant="surface">
          <h2 className={styles.section__title}>Principles</h2>
          <div className={styles.principles__grid}>
            <article className={styles.principle}>
              <h3 className={styles.principle__title}>Systems over components</h3>
              <p className={styles.principle__text}>
                The whole is greater than the sum of its parts. I design for interaction, not isolation.
              </p>
            </article>
            <article className={styles.principle}>
              <h3 className={styles.principle__title}>Precision as a default</h3>
              <p className={styles.principle__text}>
                Every number, every edge case deserves attention. JetBrains Mono isn't just a font – it's a mindset.
              </p>
            </article>
            <article className={styles.principle}>
              <h3 className={styles.principle__title}>Value through clarity</h3>
              <p className={styles.principle__text}>
                The best system is one people understand. I prioritize communication in code and in design.
              </p>
            </article>
            <article className={styles.principle}>
              <h3 className={styles.principle__title}>Adaptability over perfection</h3>
              <p className={styles.principle__text}>
                Build for change. I create architectures that evolve with requirements, not fight them.
              </p>
            </article>
          </div>
        </SectionContainer>

        {/* Press / Features (Placeholder) */}
        <SectionContainer id="press" paddingSize="lg" backgroundVariant="default">
          <h2 className={styles.section__title}>Press & Features</h2>
          <div className={styles.press__placeholder}>
            <p className={styles.press__text}>Featured in leading tech publications and podcasts.</p>
            <Button variant="secondary" as="a" href="#" aria-label="View press kit (coming soon)">
              View Press Kit
            </Button>
          </div>
        </SectionContainer>
      </main>
    </>
  );
});

About.displayName = 'About';
export default About;