// specialist-portfolio/src/components/ui/ToolCard/ToolCard.tsx

import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { ToolCardProps } from './ToolCard.types';
import styles from './ToolCard.module.css';

/**
 * ToolCard component – displays a tool/resource with title, description,
 * tags, and action buttons (Use Tool, GitHub, Documentation).
 */
const ToolCard = memo(
  forwardRef<HTMLDivElement, ToolCardProps>(
    (
      {
        id,
        title,
        description,
        tags,
        links,
        icon,
        iconAlt = '',
        className,
        ...rest
      },
      ref
    ) => {
      return (
        <Card
          ref={ref}
          as="article"
          className={clsx(styles.toolCard, className)}
          interactive
          {...rest}
        >
          <div className={styles.toolCard__header}>
            {icon && (
              <img
                src={icon}
                alt={iconAlt}
                className={styles.toolCard__icon}
                loading="lazy"
              />
            )}
            <h3 className={styles.toolCard__title}>{title}</h3>
          </div>

          <p className={styles.toolCard__description}>{description}</p>

          {tags && tags.length > 0 && (
            <div className={styles.toolCard__tags}>
              {tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {links && (
            <div className={styles.toolCard__actions}>
              {links.useTool && (
                <Button
                  as="a"
                  href={links.useTool}
                  variant="accent"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Use Tool
                </Button>
              )}
              {links.github && (
                <Button
                  as="a"
                  href={links.github}
                  variant="secondary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Button>
              )}
              {links.documentation && (
                <Button
                  as="a"
                  href={links.documentation}
                  variant="text"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docs
                </Button>
              )}
            </div>
          )}
        </Card>
      );
    }
  )
);

ToolCard.displayName = 'ToolCard';

export default ToolCard;