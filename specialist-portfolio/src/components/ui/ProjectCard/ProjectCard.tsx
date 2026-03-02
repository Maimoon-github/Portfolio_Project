import { forwardRef, memo, ImgHTMLAttributes, ReactNode } from 'react';
import styles from './ProjectCard.module.css';

export interface ProjectCardMetrics {
  label: string;
  value: string | number;
}

export interface ProjectCardLinks {
  demo?: string;
  github?: string;
  caseStudy?: string;
}

export interface ProjectCardProps {
  /** Project title (required) */
  title: string;
  /** One-line project summary (required) */
  summary: string;
  /** Key data points to display with JetBrains Mono numbers */
  metrics?: ProjectCardMetrics[];
  /** Technology/category badges */
  tags?: string[];
  /** Card layout variant */
  variant?: 'compact' | 'detailed';
  /** Project status for badge display */
  status?: 'active' | 'archived' | 'experimental';
  /** Action links */
  links?: ProjectCardLinks;
  /** Optional project thumbnail */
  image?: string;
  /** Image HTML attributes (alt, loading, etc.) */
  imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  /** Whether card is featured (gold accent border) */
  featured?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Project card component following "The Data Specialist" design system.
 * Displays project information with metrics, tags, and action links.
 * Supports compact (archive) and detailed (portfolio) variants.
 */
const ProjectCard = memo(
  forwardRef<HTMLDivElement, ProjectCardProps>(
    (
      {
        title,
        summary,
        metrics,
        tags,
        variant = 'compact',
        status,
        links,
        image,
        imageProps,
        featured = false,
        className = '',
      },
      ref
    ) => {
      // Compose card classes
      const cardClasses = [
        styles.projectCard,
        styles[`projectCard--${variant}`],
        featured && styles['projectCard--featured'],
        className,
      ]
        .filter(Boolean)
        .join(' ');

      // Status badge text and styling
      const statusConfig = {
        active: { label: 'Active', class: styles['status--active'] },
        archived: { label: 'Archived', class: styles['status--archived'] },
        experimental: { label: 'Experimental', class: styles['status--experimental'] },
      };

      return (
        <article ref={ref} className={cardClasses}>
          {/* Image section (detailed variant only) */}
          {variant === 'detailed' && image && (
            <div className={styles.projectCard__imageWrapper}>
              <img
                src={image}
                alt=""
                className={styles.projectCard__image}
                loading="lazy"
                {...imageProps}
              />
            </div>
          )}

          {/* Content section */}
          <div className={styles.projectCard__content}>
            {/* Header with title and status */}
            <div className={styles.projectCard__header}>
              <h3 className={styles.projectCard__title}>{title}</h3>
              {status && (
                <span className={`${styles.projectCard__status} ${statusConfig[status].class}`}>
                  {statusConfig[status].label}
                </span>
              )}
            </div>

            {/* Summary */}
            <p className={styles.projectCard__summary}>{summary}</p>

            {/* Metrics grid (if provided) */}
            {metrics && metrics.length > 0 && (
              <div className={styles.projectCard__metrics}>
                {metrics.map((metric, index) => (
                  <div key={index} className={styles.metric}>
                    <span className={styles.metric__value}>{metric.value}</span>
                    <span className={styles.metric__label}>{metric.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className={styles.projectCard__tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action links */}
            {links && Object.values(links).some(Boolean) && (
              <div className={styles.projectCard__actions}>
                {links.demo && (
                  <a
                    href={links.demo}
                    className={`${styles.actionLink} ${styles['actionLink--demo']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View live demo"
                  >
                    <span className={styles.actionLink__icon}>→</span>
                    <span className={styles.actionLink__label}>Demo</span>
                  </a>
                )}
                {links.github && (
                  <a
                    href={links.github}
                    className={`${styles.actionLink} ${styles['actionLink--github']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source on GitHub"
                  >
                    <span className={styles.actionLink__icon}>⌨️</span>
                    <span className={styles.actionLink__label}>Code</span>
                  </a>
                )}
                {links.caseStudy && (
                  <a
                    href={links.caseStudy}
                    className={`${styles.actionLink} ${styles['actionLink--case']}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read case study"
                  >
                    <span className={styles.actionLink__icon}>📄</span>
                    <span className={styles.actionLink__label}>Case</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      );
    }
  )
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;