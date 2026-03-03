// specialist-portfolio/src/pages/Tools/ListofTools.tsx

import { memo } from 'react';
import ToolCard from '@/components/ui/ToolCard';
import styles from './Tools.module.css';
import type { Tool } from './Tools';

interface ListofToolsProps {
  tools: Tool[];
  onToolClick?: (slug: string) => void;
}

/**
 * Renders a grid of ToolCard components with staggered animation.
 * Featured tool (if any) is given a special layout.
 */
const ListofTools = memo(({ tools, onToolClick }: ListofToolsProps) => {
  if (tools.length === 0) {
    return <div className={styles.noResults}>No tools found in this category.</div>;
  }

  return (
    <div className={styles.grid}>
      {tools.map((tool) => (
        <ToolCard
          key={tool.slug}
          id={tool.slug}
          title={tool.name}
          description={tool.description}
          tags={tool.tags}
          links={{
            useTool: tool.ctaType === 'use' ? `/tools/${tool.slug}` : undefined,
            github: tool.ctaType === 'github' ? tool.githubUrl : undefined,
          }}
          className={tool.featured ? styles.featured : ''}
        />
      ))}
    </div>
  );
});

ListofTools.displayName = 'ListofTools';
export default ListofTools;