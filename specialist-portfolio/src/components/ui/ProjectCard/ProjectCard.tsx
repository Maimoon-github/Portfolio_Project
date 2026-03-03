// // specialist-portfolio/src/components/ui/ProjectCard/ProjectCard.tsx

// import React, { forwardRef, memo } from 'react';
// import clsx from 'clsx';
// import { Card } from '../Card'; // assume Card component exists
// import { Badge } from '../Badge';
// import { ProjectCardProps } from './ProjectCard.types';
// import { CARD_VARIANTS } from './ProjectCard.variants';
// import styles from './ProjectCard.module.css';

// const statusConfig = {
//   active: { label: 'Active', variant: 'primary' as const },
//   archived: { label: 'Archived', variant: 'secondary' as const },
//   experimental: { label: 'Experimental', variant: 'accent' as const },
// };

// const ProjectCard = memo(
//   forwardRef<HTMLDivElement, ProjectCardProps>(
//     (
//       {
//         id,
//         title,
//         slug,
//         summary,
//         description,
//         status,
//         metrics,
//         tags,
//         links,
//         image,
//         imageAlt = '',
//         featured = false,
//         variant = 'compact',
//         className,
//         ...rest
//       },
//       ref
//     ) => {
//       const variantConfig = CARD_VARIANTS[variant];
//       const { sections } = variantConfig;

//       const cardClasses = clsx(
//         styles.projectCard,
//         styles[variantConfig.className],
//         featured && styles['projectCard--featured'],
//         className
//       );

//       const linkHref = slug ? `/projects/${slug}` : '#';

//       return (
//         <Card
//           ref={ref}
//           as="article"
//           className={cardClasses}
//           interactive
//           featured={featured}
//           {...rest}
//         >
//           {variant === 'detailed' && image && (
//             <div className={styles.projectCard__imageWrapper}>
//               <img
//                 src={image}
//                 alt={imageAlt}
//                 className={styles.projectCard__image}
//                 loading="lazy"
//               />
//             </div>
//           )}

//           <div className={styles.projectCard__content}>
//             <div className={styles.projectCard__header}>
//               <h3 className={styles.projectCard__title}>
//                 {slug ? <a href={linkHref}>{title}</a> : title}
//               </h3>
//               {status && (
//                 <Badge variant={statusConfig[status].variant}>
//                   {statusConfig[status].label}
//                 </Badge>
//               )}
//             </div>

//             {/* Summary always visible */}
//             <p className={styles.projectCard__summary}>{summary}</p>

//             {/* Full description (detailed only) */}
//             {sections.showDescription && description && (
//               <p className={styles.projectCard__description}>{description}</p>
//             )}

//             {/* Metrics (if enabled and data exists) */}
//             {sections.showMetrics && metrics && metrics.length > 0 && (
//               <div className={styles.projectCard__metrics}>
//                 {metrics.map((metric, idx) => (
//                   <div key={idx} className={styles.metric}>
//                     <span
//                       className={clsx(
//                         styles.metric__value,
//                         metric.highlight && styles['metric__value--highlight']
//                       )}
//                     >
//                       {metric.value}
//                     </span>
//                     <span className={styles.metric__label}>{metric.label}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Tags as Badges */}
//             {sections.showTags && tags && tags.length > 0 && (
//               <div className={styles.projectCard__tags}>
//                 {tags.map((tag) => (
//                   <Badge key={tag} variant="default">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             )}

//             {/* Action links */}
//             {links && (
//               <div className={styles.projectCard__actions}>
//                 {links.demo && (
//                   <a
//                     href={links.demo}
//                     className={styles.actionLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="View live demo"
//                   >
//                     <span className={styles.actionLink__icon}>→</span>
//                     <span className={styles.actionLink__label}>Demo</span>
//                   </a>
//                 )}
//                 {links.repo && (
//                   <a
//                     href={links.repo}
//                     className={styles.actionLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="View source on GitHub"
//                   >
//                     <span className={styles.actionLink__icon}>⌨️</span>
//                     <span className={styles.actionLink__label}>Code</span>
//                   </a>
//                 )}
//                 {links.caseStudy && (
//                   <a
//                     href={links.caseStudy}
//                     className={styles.actionLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="Read case study"
//                   >
//                     <span className={styles.actionLink__icon}>📄</span>
//                     <span className={styles.actionLink__label}>Case</span>
//                   </a>
//                 )}
//                 {links.documentation && (
//                   <a
//                     href={links.documentation}
//                     className={styles.actionLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label="View documentation"
//                   >
//                     <span className={styles.actionLink__icon}>📚</span>
//                     <span className={styles.actionLink__label}>Docs</span>
//                   </a>
//                 )}
//               </div>
//             )}
//           </div>
//         </Card>
//       );
//     }
//   )
// );

// ProjectCard.displayName = 'ProjectCard';

// export default ProjectCard;












// src/components/ui/ProjectCard/ProjectCard.tsx
import React from 'react';

const ProjectCard = (props: any) => {
  return <div>Project Card Placeholder</div>;
};

export default ProjectCard;