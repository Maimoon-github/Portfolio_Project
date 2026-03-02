import { useState, useMemo, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import FilterBar from '@/components/ui/FilterBar/FilterBar';
import ProjectCard from '@/components/ui/ProjectCard/ProjectCard';
import styles from './Projects.module.css';
import type { ProjectCardProps } from '@/components/ui/ProjectCard/ProjectCard.types';

// Types
export type ProjectCategory = 'ai-engineering' | 'web-apps' | 'automation' | 'strategy';
export type ProjectStatus = 'active' | 'archived' | 'experimental';
export type ProjectYear = '2025' | '2024' | '2023';

export interface ProjectFilters {
  category: ProjectCategory | 'all';
  status: ProjectStatus | 'all';
  year: ProjectYear | 'all';
}

export interface ArchiveProject extends ProjectCardProps {
  id: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: ProjectYear;
}

// Mock data – comprehensive archive of all projects
const mockProjects: ArchiveProject[] = [
  // 2025 projects
  {
    id: '1',
    title: 'Agentic Research Workflow',
    summary: 'Autonomous research system using LLM agents and retrieval‑augmented generation.',
    category: 'ai-engineering',
    status: 'active',
    year: '2025',
    tags: ['AI', 'Python', 'LangChain'],
    image: '/images/projects/agentic-research.jpg',
    imageAlt: 'Agentic Research Workflow diagram',
    links: { caseStudy: '/work/portfolio/agentic-research' },
    variant: 'compact',
  },
  {
    id: '2',
    title: 'Scalable E‑commerce Platform',
    summary: 'Microservices architecture with Next.js, Node, and Kafka.',
    category: 'web-apps',
    status: 'active',
    year: '2025',
    tags: ['React', 'Node', 'Kafka'],
    image: '/images/projects/ecom-platform.jpg',
    imageAlt: 'E‑commerce platform dashboard',
    links: { caseStudy: '/work/portfolio/scalable-ecom' },
    variant: 'compact',
  },
  {
    id: '3',
    title: 'LLM Evaluation Suite',
    summary: 'Open‑source toolkit for evaluating LLM outputs in production.',
    category: 'ai-engineering',
    status: 'experimental',
    year: '2025',
    tags: ['Python', 'ML', 'Evaluation'],
    image: '/images/projects/llm-eval.jpg',
    imageAlt: 'LLM evaluation metrics',
    links: { github: 'https://github.com/dataspecialist/llm-eval' },
    variant: 'compact',
  },
  // 2024 projects
  {
    id: '4',
    title: 'Workflow Automation Engine',
    summary: 'Low‑code automation platform for enterprise workflows.',
    category: 'automation',
    status: 'active',
    year: '2024',
    tags: ['Node.js', 'React', 'Docker'],
    image: '/images/projects/automation-engine.jpg',
    imageAlt: 'Workflow automation interface',
    links: { caseStudy: '/work/portfolio/automation-engine' },
    variant: 'compact',
  },
  {
    id: '5',
    title: 'Digital Strategy Framework',
    summary: 'Consulting framework for aligning tech with business goals.',
    category: 'strategy',
    status: 'archived',
    year: '2024',
    tags: ['Strategy', 'Roadmapping'],
    image: '/images/projects/strategy-framework.jpg',
    imageAlt: 'Strategy framework diagram',
    links: { caseStudy: '/work/portfolio/strategy-framework' },
    variant: 'compact',
  },
  {
    id: '6',
    title: 'Predictive Analytics Dashboard',
    summary: 'Real‑time forecasting dashboard for logistics.',
    category: 'ai-engineering',
    status: 'active',
    year: '2024',
    tags: ['Python', 'D3', 'FastAPI'],
    image: '/images/projects/predictive-dashboard.jpg',
    imageAlt: 'Analytics dashboard',
    links: { demo: 'https://demo.analytics.dev' },
    variant: 'compact',
  },
  // 2023 projects
  {
    id: '7',
    title: 'Legacy CRM Integration',
    summary: 'API gateway for legacy CRM system modernization.',
    category: 'web-apps',
    status: 'archived',
    year: '2023',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    image: '/images/projects/legacy-crm.jpg',
    imageAlt: 'CRM integration diagram',
    links: { github: 'https://github.com/dataspecialist/legacy-crm' },
    variant: 'compact',
  },
  {
    id: '8',
    title: 'Experimental Agent Framework',
    summary: 'Research prototype for multi‑agent collaboration.',
    category: 'ai-engineering',
    status: 'experimental',
    year: '2023',
    tags: ['Python', 'LangChain', 'Research'],
    image: '/images/projects/agent-framework.jpg',
    imageAlt: 'Agent framework architecture',
    links: { github: 'https://github.com/dataspecialist/agent-framework' },
    variant: 'compact',
  },
  {
    id: '9',
    title: 'Data Pipeline Orchestrator',
    summary: 'ETL pipeline manager with Airflow integration.',
    category: 'automation',
    status: 'archived',
    year: '2023',
    tags: ['Python', 'Airflow', 'Docker'],
    image: '/images/projects/data-pipeline.jpg',
    imageAlt: 'Pipeline orchestrator UI',
    links: { caseStudy: '/work/portfolio/data-pipeline' },
    variant: 'compact',
  },
];

// Display labels
const categoryLabels: Record<ProjectCategory, string> = {
  'ai-engineering': 'AI Engineering',
  'web-apps': 'Web Apps',
  'automation': 'Automation',
  'strategy': 'Strategy',
};

const statusLabels: Record<ProjectStatus, string> = {
  active: 'Active',
  archived: 'Archived',
  experimental: 'Experimental',
};

const yearLabels: Record<ProjectYear, string> = {
  '2025': '2025',
  '2024': '2024',
  '2023': '2023',
};

/**
 * Projects archive page – comprehensive, unfiltered collection.
 * Implements "The Data Specialist" design system with multi‑filter UI
 * (category, status, year) and result count.
 */
const Projects = memo(() => {
  const [filters, setFilters] = useState<ProjectFilters>({
    category: 'all',
    status: 'all',
    year: 'all',
  });

  // Extract unique years from data for dynamic filter options
  const availableYears = useMemo(() => {
    const years = new Set(mockProjects.map((p) => p.year));
    return Array.from(years).sort().reverse();
  }, []);

  // Filter projects based on all active filters
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Category filter
      if (filters.category !== 'all' && project.category !== filters.category) return false;
      
      // Status filter
      if (filters.status !== 'all' && project.status !== filters.status) return false;
      
      // Year filter
      if (filters.year !== 'all' && project.year !== filters.year) return false;
      
      return true;
    });
  }, [filters]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.status !== 'all') count++;
    if (filters.year !== 'all') count++;
    return count;
  }, [filters]);

  const categoryOptions = ['all', ...Object.keys(categoryLabels)] as const;
  const statusOptions = ['all', ...Object.keys(statusLabels)] as const;
  const yearOptions = ['all', ...availableYears] as const;

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      status: 'all',
      year: 'all',
    });
  };

  return (
    <>
      <Helmet>
        <title>Project Archive – Full Catalog | The Data Specialist</title>
        <meta
          name="description"
          content="Browse the complete archive of projects—from polished deployments to research prototypes. Transparency in process."
        />
      </Helmet>

      <main className={styles.projects}>
        {/* Header */}
        <SectionContainer id="archive-header" paddingSize="lg" backgroundVariant="default">
          <div className={styles.header}>
            <h1 className={styles.header__title}>The Archive</h1>
            <p className={styles.header__subtitle}>All Systems, Experiments, and Builds.</p>
            <p className={styles.header__purpose}>
              A complete, un-filtered record of my work—from polished deployments to research prototypes. Transparency in process.
            </p>
          </div>
        </SectionContainer>

        {/* Filters */}
        <SectionContainer id="archive-filters" paddingSize="md" backgroundVariant="default">
          {/* Category filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterGroup__label}>Category</span>
            <div className={styles.filterWrapper}>
              <FilterBar
                filters={categoryOptions.map((opt) =>
                  opt === 'all' ? 'All Categories' : categoryLabels[opt as ProjectCategory]
                )}
                activeFilter={
                  filters.category === 'all'
                    ? 'All Categories'
                    : categoryLabels[filters.category]
                }
                onFilterChange={(label) => {
                  if (label === 'All Categories') {
                    setFilters((prev) => ({ ...prev, category: 'all' }));
                  } else {
                    const found = Object.entries(categoryLabels).find(
                      ([, value]) => value === label
                    );
                    if (found) {
                      setFilters((prev) => ({
                        ...prev,
                        category: found[0] as ProjectCategory,
                      }));
                    }
                  }
                }}
                ariaLabel="Filter by category"
              />
            </div>
          </div>

          {/* Status filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterGroup__label}>Status</span>
            <div className={styles.filterWrapper}>
              <FilterBar
                filters={statusOptions.map((opt) =>
                  opt === 'all' ? 'All Statuses' : statusLabels[opt as ProjectStatus]
                )}
                activeFilter={
                  filters.status === 'all'
                    ? 'All Statuses'
                    : statusLabels[filters.status]
                }
                onFilterChange={(label) => {
                  if (label === 'All Statuses') {
                    setFilters((prev) => ({ ...prev, status: 'all' }));
                  } else {
                    const found = Object.entries(statusLabels).find(
                      ([, value]) => value === label
                    );
                    if (found) {
                      setFilters((prev) => ({
                        ...prev,
                        status: found[0] as ProjectStatus,
                      }));
                    }
                  }
                }}
                ariaLabel="Filter by status"
              />
            </div>
          </div>

          {/* Year filter */}
          <div className={styles.filterGroup}>
            <span className={styles.filterGroup__label}>Year</span>
            <div className={styles.filterWrapper}>
              <FilterBar
                filters={yearOptions.map((opt) =>
                  opt === 'all' ? 'All Years' : opt
                )}
                activeFilter={
                  filters.year === 'all' ? 'All Years' : filters.year
                }
                onFilterChange={(label) => {
                  if (label === 'All Years') {
                    setFilters((prev) => ({ ...prev, year: 'all' }));
                  } else {
                    setFilters((prev) => ({
                      ...prev,
                      year: label as ProjectYear,
                    }));
                  }
                }}
                ariaLabel="Filter by year"
              />
            </div>
          </div>

          {/* Clear filters button (shown only when filters are active) */}
          {activeFilterCount > 0 && (
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-unit)' }}>
              <button
                className={styles.clearButton}
                onClick={handleClearFilters}
                aria-label="Clear all filters"
              >
                Clear Filters ({activeFilterCount})
              </button>
            </div>
          )}
        </SectionContainer>

        {/* Result count */}
        <SectionContainer id="archive-count" paddingSize="sm" backgroundVariant="default">
          <div className={styles.resultCount}>
            Showing <span className={styles.resultCount__number}>{filteredProjects.length}</span> of{' '}
            <span className={styles.resultCount__number}>{mockProjects.length}</span> projects
          </div>
        </SectionContainer>

        {/* Project grid */}
        <SectionContainer id="archive-grid" paddingSize="lg" backgroundVariant="default">
          {filteredProjects.length === 0 ? (
            <div className={styles.noResults}>
              No projects match your filters.
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  variant="compact" // Archive uses compact variant
                />
              ))}
            </div>
          )}
        </SectionContainer>
      </main>
    </>
  );
});

Projects.displayName = 'Projects';
export default Projects;