import { memo } from 'react';
import { Link } from 'react-router-dom';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';
import styles from './FeaturedProjectsSection.module.css';

// Mock data – would come from CMS/API in production
const featuredProjects = [
  {
    id: '1',
    title: 'Agentic Research Workflow',
    summary: 'Autonomous research system using LLM agents and retrieval‑augmented generation.',
    category: 'ai-engineering',
    status: 'active' as const,
    tags: ['AI', 'Python', 'LangChain'],
    image: '/images/projects/agentic-research.jpg',
    imageAlt: 'Agentic Research Workflow diagram',
    featured: true,
    variant: 'compact' as const,
  },
  {
    id: '2',
    title: 'Scalable E‑commerce Platform',
    summary: 'Microservices architecture with Next.js, Node, and Kafka for high‑throughput transactions.',
    category: 'web-apps',
    status: 'active' as const,
    tags: ['React', 'Node', 'Kafka'],
    image: '/images/projects/ecom-platform.jpg',
    imageAlt: 'E‑commerce platform dashboard',
    featured: true,
    variant: 'compact' as const,
  },
  {
    id: '3',
    title: 'Predictive Analytics Dashboard',
    summary: 'Real‑time forecasting dashboard for logistics optimization using Python and D3.',
    category: 'ai-engineering',
    status: 'active' as const,
    tags: ['Python', 'D3', 'FastAPI'],
    image: '/images/projects/predictive-dashboard.jpg',
    imageAlt: 'Analytics dashboard preview',
    featured: true,
    variant: 'compact' as const,
  },
];

const FeaturedProjectsSection = memo(() => {
  return (
    <SectionContainer id="featured-projects" paddingSize="lg" backgroundVariant="default">
      <div className={styles.header}>
        <h2 className={styles.heading}>Active Nodes.</h2>
        <p className={styles.subheading}>A Selection of High‑Impact Systems.</p>
      </div>
      <div className={styles.grid}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
      <div className={styles.footer}>
        <Link to="/work/portfolio" className={styles.viewAllLink}>
          View all curated work <span aria-hidden="true">→</span>
        </Link>
      </div>
    </SectionContainer>
  );
});

FeaturedProjectsSection.displayName = 'FeaturedProjectsSection';
export default FeaturedProjectsSection;