// specialist-portfolio/src/pages/Portfolio/Portfolio.tsx

import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import FilterBar from '@/components/ui/FilterBar';
import ProjectCard from '@/components/ui/ProjectCard';
import Button from '@/components/ui/Button';
import styles from './Portfolio.module.css';
import type { ProjectCardProps } from '@/components/ui/ProjectCard/ProjectCard.types';

// Types
export type PortfolioCategory = 'ai-engineering' | 'web-apps' | 'automation' | 'strategy';

export interface PortfolioProject extends ProjectCardProps {
  id: string;
  category: PortfolioCategory;
}

// Mock data – curated high‑impact projects
const mockProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Agentic Research Workflow',
    summary: 'Autonomous research system using LLM agents and retrieval‑augmented generation.',
    category: 'ai-engineering',
    status: 'active',
    tags: ['AI', 'Python', 'LangChain'],
    image: '/images/projects/agentic-research.jpg',
    imageAlt: 'Agentic Research Workflow diagram',
    links: {
      caseStudy: '/work/portfolio/agentic-research',
      demo: 'https://demo.agentic-research.dev',
      github: 'https://github.com/dataspecialist/agentic-research',
    },
    featured: true,
    variant: 'detailed',
    metrics: [
      { label: 'Accuracy', value: '94%' },
      { label: 'Latency', value: '1.2s' },
    ],
  },
  {
    id: '2',
    title: 'Scalable E‑commerce Platform',
    summary: 'Microservices architecture with Next.js, Node, and Kafka for high‑throughput transactions.',
    category: 'web-apps',
    status: 'active',
    tags: ['React', 'Node', 'Kafka'],
    image: '/images/projects/ecom-platform.jpg',
    imageAlt: 'E‑commerce platform dashboard',
    links: {
      caseStudy: '/work/portfolio/scalable-ecom',
      demo: 'https://demo.ecom-platform.dev',
    },
    featured: true,
    variant: 'detailed',
    metrics: [
      { label: 'Throughput', value: '10k req/s' },
      { label: 'Uptime', value: '99.99%' },
    ],
  },
  {
    id: '3',
    title: 'Predictive Analytics Dashboard',
    summary: 'Real‑time forecasting dashboard for logistics optimization using Python and D3.',
    category: 'ai-engineering',
    status: 'active',
    tags: ['Python', 'D3', 'FastAPI'],
    image: '/images/projects/predictive-dashboard.jpg',
    imageAlt: 'Analytics dashboard preview',
    links: {
      caseStudy: '/work/portfolio/predictive-dashboard',
      demo: 'https://demo.analytics.dev',
    },
    featured: true,
    variant: 'detailed',
    metrics: [
      { label: 'Accuracy', value: '92%' },
      { label: 'Data Points', value: '1.2M' },
    ],
  },
  {
    id: '4',
    title: 'Workflow Automation Engine',
    summary: 'Low‑code automation platform for enterprise workflows with visual builder.',
    category: 'automation',
    status: 'active',
    tags: ['Node.js', 'React', 'Docker'],
    image: '/images/projects/automation-engine.jpg',
    imageAlt: 'Workflow automation interface',
    links: {
      caseStudy: '/work/portfolio/automation-engine',
      github: 'https://github.com/dataspecialist/automation-engine',
    },
    featured: false,
    variant: 'detailed',
    metrics: [
      { label: 'Time Saved', value: '40%' },
      { label: 'Adoption', value: '15 teams' },
    ],
  },
  {
    id: '5',
    title: 'Digital Strategy Framework',
    summary: 'Strategic consulting framework for aligning technical execution with business goals.',
    category: 'strategy',
    status: 'active',
    tags: ['Strategy', 'Roadmapping', 'Analytics'],
    image: '/images/projects/strategy-framework.jpg',
    imageAlt: 'Strategy framework diagram',
    links: {
      caseStudy: '/work/portfolio/strategy-framework',
    },
    featured: false,
    variant: 'detailed',
  },
  {
    id: '6',
    title: 'LLM Evaluation Suite',
    summary: 'Open‑source toolkit for evaluating LLM outputs in production environments.',
    category: 'ai-engineering',
    status: 'experimental',
    tags: ['Python', 'ML', 'Evaluation'],
    image: '/images/projects/llm-eval.jpg',
    imageAlt: 'LLM evaluation metrics dashboard',
    links: {
      caseStudy: '/work/portfolio/llm-eval',
      github: 'https://github.com/dataspecialist/llm-eval',
    },
    featured: false,
    variant: 'detailed',
    metrics: [
      { label: 'Models', value: '12' },
      { label: 'Metrics', value: '8' },
    ],
  },
];

// Category display names
const categoryLabels: Record<PortfolioCategory, string> = {
  'ai-engineering': 'AI Engineering',
  'web-apps': 'Web Apps',
  'automation': 'Automation',
  'strategy': 'Strategy',
};

/**
 * Portfolio page – curated selection of high‑impact systems.
 * Implements "The Data Specialist" design system with asymmetric grid,
 * category filtering, and archive CTA.
 */
const Portfolio = memo(() => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'all'>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return mockProjects;
    return mockProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const filterOptions = ['all', ...Object.keys(categoryLabels)] as const;

  return (
    <>
      <Helmet>
        <title>Portfolio – Curated Work | The Data Specialist</title>
        <meta
          name="description"
          content="A curated selection of high‑impact systems in AI engineering, web applications, automation, and digital strategy."
        />
      </Helmet>

      <main className={styles.portfolio}>
        {/* Header */}
        <SectionContainer id="portfolio-header" paddingSize="lg" backgroundVariant="default">
          <div className={styles.header}>
            <h1 className={styles.header__title}>Curated Work</h1>
            <p className={styles.header__subtitle}>A Selection of High‑Impact Systems.</p>
          </div>
        </SectionContainer>

        {/* Filter bar */}
        <SectionContainer id="portfolio-filter" paddingSize="md" backgroundVariant="default">
          <div className={styles.filterWrapper}>
            <FilterBar
              filters={filterOptions.map((opt) =>
                opt === 'all' ? 'All Work' : categoryLabels[opt as PortfolioCategory]
              )}
              activeFilter={activeCategory === 'all' ? 'All Work' : categoryLabels[activeCategory]}
              onFilterChange={(label) => {
                if (label === 'All Work') {
                  setActiveCategory('all');
                } else {
                  const found = Object.entries(categoryLabels).find(
                    ([, value]) => value === label
                  );
                  if (found) {
                    setActiveCategory(found[0] as PortfolioCategory);
                  }
                }
              }}
              ariaLabel="Filter projects by category"
            />
          </div>
        </SectionContainer>

        {/* Project grid */}
        <SectionContainer id="portfolio-grid" paddingSize="lg" backgroundVariant="default">
          {filteredProjects.length === 0 ? (
            <div className={styles.noResults}>
              No projects found in this category.
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  variant="detailed" // Portfolio uses detailed variant
                />
              ))}
            </div>
          )}
        </SectionContainer>

        {/* Archive CTA */}
        <SectionContainer id="portfolio-archive" paddingSize="xl" backgroundVariant="surface">
          <div className={styles.archiveCta}>
            <h2 className={styles.archiveCta__title}>The Archive</h2>
            <p className={styles.archiveCta__text}>
              Explore the complete, unfiltered collection of projects, experiments, and prototypes.
            </p>
            <Button variant="primary" size="lg" as={Link} to="/work/projects">
              View Full Archive
            </Button>
          </div>
        </SectionContainer>
      </main>
    </>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;