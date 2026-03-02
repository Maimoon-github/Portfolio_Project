import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import Button from '@/components/ui/Button/Button';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';
import styles from './Home.module.css';
import type { FeaturedProject, StackItem, ContentPreview } from './Home.types';

/**
 * Mock data for the Home page.
 * In a real app, this would come from an API or CMS.
 */
const featuredProjects: FeaturedProject[] = [
  {
    id: '1',
    title: 'Agentic Research Workflow',
    summary: 'Autonomous research system using LLM agents and retrieval‑augmented generation.',
    category: 'ai-engineering',
    link: '/work/portfolio/agentic-research',
    image: '/images/projects/agentic-research.jpg',
    imageAlt: 'Agentic Research Workflow diagram',
  },
  {
    id: '2',
    title: 'Scalable E‑commerce Platform',
    summary: 'Microservices architecture with Next.js, Node, and Kafka for high‑throughput transactions.',
    category: 'web-apps',
    link: '/work/portfolio/scalable-ecom',
    image: '/images/projects/ecom-platform.jpg',
    imageAlt: 'E‑commerce platform dashboard',
  },
  {
    id: '3',
    title: 'Predictive Analytics Dashboard',
    summary: 'Real‑time forecasting dashboard for logistics optimization using Python and D3.',
    category: 'ai-engineering',
    link: '/work/portfolio/predictive-dashboard',
    image: '/images/projects/predictive-dashboard.jpg',
    imageAlt: 'Analytics dashboard preview',
  },
];

const stackItems: StackItem[] = [
  { name: 'Python', level: 'expert' },
  { name: 'TypeScript', level: 'expert' },
  { name: 'React', level: 'expert' },
  { name: 'Node.js', level: 'advanced' },
  { name: 'LangChain', level: 'advanced' },
  { name: 'LLM Ops', level: 'advanced' },
  { name: 'Docker', level: 'advanced' },
  { name: 'Kubernetes', level: 'familiar' },
  { name: 'AWS', level: 'advanced' },
  { name: 'PostgreSQL', level: 'advanced' },
  { name: 'TensorFlow', level: 'familiar' },
  { name: 'Next.js', level: 'expert' },
];

const latestContent: ContentPreview[] = [
  {
    id: '1',
    title: 'The Future of Agentic Workflows',
    excerpt: 'Exploring autonomous systems and their impact on digital infrastructure.',
    category: 'blog',
    slug: 'future-agentic-workflows',
    date: '2024-05-15',
  },
  {
    id: '2',
    title: 'Building a RAG Pipeline with LangChain',
    excerpt: 'Step‑by‑step tutorial to create a retrieval‑augmented generation system.',
    category: 'documentation',
    slug: 'rag-pipeline-tutorial',
    date: '2024-04-22',
  },
];

/**
 * Home page – the central nervous system of the digital headquarters.
 * Composes layout primitives and UI components following the bulletproof‑react architecture.
 * Implements "The Data Specialist" design system.
 */
const Home = memo(() => {
  return (
    <>
      <Helmet>
        <title>The Data Specialist | Developer, AI Engineer, Architect</title>
        <meta
          name="description"
          content="Developer, AI Engineer, and Agentic Workflow Architect. I craft scalable systems where engineering meets strategy."
        />
      </Helmet>

      <main className={styles.home}>
        {/* Hero Section */}
        <SectionContainer id="hero" paddingSize="xl" backgroundVariant="default">
          <div className={styles.hero}>
            <h1 className={styles.hero__title}>
              Building Intelligent Systems.
              <br />
              Designing Digital Impact.
            </h1>
            <p className={styles.hero__meta}>
              Developer, AI Engineer, and Agentic Workflow Architect. I craft scalable systems where engineering meets strategy.
            </p>
            <div className={styles.hero__cta}>
              <Button variant="primary" size="lg" as={Link} to="/work/portfolio">
                View Portfolio
              </Button>
            </div>
          </div>
        </SectionContainer>

        {/* The Operating System – Manifesto */}
        <SectionContainer id="manifesto" paddingSize="lg" backgroundVariant="accent">
          <div className={styles.manifesto}>
            <h2 className={styles.manifesto__heading}>The Operating System.</h2>
            <p className={styles.manifesto__text}>
              I build intelligent systems that scale. I architect workflows that think. I design digital infrastructures that perform. This website is the primary interface to that capability. Every navigation choice and content block is a transaction of value, not just information.
            </p>
          </div>
        </SectionContainer>

        {/* Active Nodes – Featured Projects */}
        <SectionContainer id="featured-projects" paddingSize="lg" backgroundVariant="default">
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Active Nodes.</h2>
            <p className={styles.section__subtitle}>A Selection of High‑Impact Systems.</p>
          </div>
          <div className={styles.projects__grid}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                summary={project.summary}
                category={project.category}
                status="active"
                tags={[project.category.replace('-', ' ')]}
                image={project.image}
                imageAlt={project.imageAlt}
                links={{
                  caseStudy: project.link,
                }}
                variant="compact"
                featured
              />
            ))}
          </div>
          <div className={styles.section__footer}>
            <Link to="/work/portfolio" className={styles['view-all-link']}>
              View all curated work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </SectionContainer>

        {/* Current Stack & Toolkits */}
        <SectionContainer id="stack" paddingSize="lg" backgroundVariant="surface">
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Current Stack & Toolkits.</h2>
          </div>
          <div className={styles.stack__tags}>
            {stackItems.map((item) => (
              <span key={item.name} className={styles.stack__tag}>
                {item.name}
              </span>
            ))}
          </div>
          <div className={styles.section__footer}>
            <Link to="/capabilities/tools" className={styles['view-all-link']}>
              Explore all tools <span aria-hidden="true">→</span>
            </Link>
          </div>
        </SectionContainer>

        {/* Latest from the Lab */}
        <SectionContainer id="latest-lab" paddingSize="lg" backgroundVariant="default">
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Latest from the Lab.</h2>
          </div>
          <div className={styles.latest__grid}>
            {latestContent.map((item) => (
              <article key={item.id} className={styles.latest__card}>
                <span className={styles['latest__card-type']}>
                  {item.category === 'blog' ? 'Blog' : 'Tutorial'}
                </span>
                <h3 className={styles['latest__card-title']}>{item.title}</h3>
                <p className={styles['latest__card-excerpt']}>{item.excerpt}</p>
                <Link
                  to={`/mind/${item.category === 'blog' ? 'blog' : 'docs'}/${item.slug}`}
                  className={styles['latest__card-link']}
                >
                  Read more <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.section__footer}>
            <Link to="/mind/blog" className={styles['view-all-link']}>
              All insights <span aria-hidden="true">→</span>
            </Link>
          </div>
        </SectionContainer>

        {/* Interface – Contact */}
        <SectionContainer id="contact-cta" paddingSize="xl" backgroundVariant="accent">
          <div className={styles.contact}>
            <h2 className={styles.contact__heading}>Interface.</h2>
            <p className={styles.contact__text}>
              Ready to build intelligent systems together? Let's connect and explore how we can architect your next digital infrastructure.
            </p>
            <Button variant="accent" size="lg" as={Link} to="/connect">
              Start the conversation
            </Button>
          </div>
        </SectionContainer>
      </main>
    </>
  );
});

Home.displayName = 'Home';
export default Home;