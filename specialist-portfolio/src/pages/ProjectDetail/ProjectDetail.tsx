import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProjectBySlug } from '@/hooks/useProjectBySlug';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import DataTable from '@/components/ui/DataTable/DataTable';
import Button from '@/components/ui/Button/Button';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer/MarkdownRenderer';
import { ProjectMetric } from '@/components/ui/ProjectCard/ProjectCard.types';
import styles from './ProjectDetail.module.css';
import type { Project } from '@/types/project';

// Helper component for skeleton loading states
const ProjectDetailSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonHero}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonSummary} />
      <div className={styles.skeletonBadges} />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className={styles.skeletonSection}>
        <div className={styles.skeletonHeading} />
        <div className={styles.skeletonContent} />
      </div>
    ))}
  </div>
);

/**
 * ProjectDetail page – displays full information about a single project.
 * Uses the slug from URL params to fetch project data and renders
 * all sections (problem, architecture, implementation, results, learnings)
 * with proper design system styling.
 */
export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { project, isLoading, error } = useProjectBySlug(slug || '');

  if (isLoading) {
    return (
      <SectionContainer id="project-loading" paddingSize="lg">
        <ProjectDetailSkeleton />
      </SectionContainer>
    );
  }

  if (error || !project) {
    return (
      <SectionContainer id="project-error" paddingSize="lg">
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Project not found</h2>
          <p className={styles.errorMessage}>
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="primary" onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
        </div>
      </SectionContainer>
    );
  }

  // Convert project.metrics to DataTable format
  const metricColumns = [
    { key: 'label', header: 'Metric', type: 'text' },
    { key: 'value', header: 'Value', type: 'number' },
  ];
  const metricData = project.metrics?.map((m: ProjectMetric) => ({
    label: m.label,
    value: m.value,
  })) || [];

  return (
    <>
      <Helmet>
        <title>{project.title} | The Data Specialist</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Back navigation */}
      <SectionContainer id="back-nav" paddingSize="sm" backgroundVariant="default">
        <button
          onClick={() => navigate(-1)}
          className={styles.backLink}
          aria-label="Go back to projects"
        >
          ← Back to Projects
        </button>
      </SectionContainer>

      {/* Hero section */}
      <SectionContainer id="project-hero" paddingSize="lg" backgroundVariant="default">
        <div className={styles.hero}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.badges}>
            {project.category && (
              <span className={styles.badge} data-type="category">
                {project.category}
              </span>
            )}
            {project.status && (
              <span className={styles.badge} data-type="status">
                {project.status}
              </span>
            )}
          </div>
        </div>
      </SectionContainer>

      {/* Problem section */}
      {project.problem && (
        <SectionContainer id="problem" paddingSize="md" backgroundVariant="surface">
          <h2 className={styles.sectionHeading}>Problem</h2>
          <div className={styles.markdownContent}>
            <MarkdownRenderer content={project.problem} />
          </div>
        </SectionContainer>
      )}

      {/* Architecture section */}
      {project.architecture && (
        <SectionContainer id="architecture" paddingSize="md" backgroundVariant="default">
          <h2 className={styles.sectionHeading}>Architecture</h2>
          <div className={styles.markdownContent}>
            <MarkdownRenderer content={project.architecture} />
          </div>
        </SectionContainer>
      )}

      {/* Implementation section */}
      {project.implementation && (
        <SectionContainer id="implementation" paddingSize="md" backgroundVariant="surface">
          <h2 className={styles.sectionHeading}>Implementation</h2>
          <div className={styles.markdownContent}>
            <MarkdownRenderer content={project.implementation} />
          </div>
        </SectionContainer>
      )}

      {/* Results section with metrics table */}
      {project.results && (
        <SectionContainer id="results" paddingSize="md" backgroundVariant="default">
          <h2 className={styles.sectionHeading}>Results</h2>
          {metricData.length > 0 && (
            <div className={styles.metricsTable}>
              <DataTable columns={metricColumns} data={metricData} />
            </div>
          )}
          <div className={styles.markdownContent}>
            <MarkdownRenderer content={project.results} />
          </div>
        </SectionContainer>
      )}

      {/* Learnings section */}
      {project.learnings && (
        <SectionContainer id="learnings" paddingSize="md" backgroundVariant="surface">
          <h2 className={styles.sectionHeading}>Key Learnings</h2>
          <div className={styles.markdownContent}>
            <MarkdownRenderer content={project.learnings} />
          </div>
        </SectionContainer>
      )}

      {/* Action links */}
      {project.links && Object.values(project.links).some(Boolean) && (
        <SectionContainer id="actions" paddingSize="lg" backgroundVariant="default">
          <div className={styles.actionButtons}>
            {project.links.demo && (
              <Button
                variant="accent"
                as="a"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
            )}
            {project.links.repo && (
              <Button
                variant="secondary"
                as="a"
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </Button>
            )}
            {project.links.caseStudy && (
              <Button
                variant="primary"
                as="a"
                href={project.links.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
              >
                Case Study
              </Button>
            )}
          </div>
        </SectionContainer>
      )}
    </>
  );
};

export default ProjectDetail;