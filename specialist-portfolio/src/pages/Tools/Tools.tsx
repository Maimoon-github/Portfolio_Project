// specialist-portfolio/src/pages/Tools/Tools.tsx

import { useState, useMemo, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import FilterBar from '@/components/ui/FilterBar';
import ListofTools from './ListofTools';
import styles from './Tools.module.css';

// Types
export type ToolCategory = 'ai-prompts' | 'automation' | 'dev-utils' | 'strategy';

export interface Tool {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  ctaType: 'use' | 'github';
  githubUrl?: string;
  featured?: boolean;
}

// Mock data – free, open‑source tools
const mockTools: Tool[] = [
  {
    slug: 'prompt-studio',
    name: 'Prompt Studio',
    description: 'Design, version, and test prompts for LLMs with collaborative workspaces.',
    category: 'ai-prompts',
    tags: ['AI', 'Prompts', 'Collaboration'],
    ctaType: 'use',
    featured: true,
  },
  {
    slug: 'agent-orchestrator',
    name: 'Agent Orchestrator',
    description: 'Lightweight workflow engine for coordinating multi‑agent systems.',
    category: 'automation',
    tags: ['Python', 'Workflows', 'Agents'],
    ctaType: 'github',
    githubUrl: 'https://github.com/dataspecialist/agent-orchestrator',
  },
  {
    slug: 'type-safe-fetcher',
    name: 'Type‑Safe Fetcher',
    description: 'Zod‑powered fetch wrapper with runtime validation and type inference.',
    category: 'dev-utils',
    tags: ['TypeScript', 'Zod', 'Fetch'],
    ctaType: 'github',
    githubUrl: 'https://github.com/dataspecialist/type-fetcher',
  },
  {
    slug: 'llm-eval-cli',
    name: 'LLM Eval CLI',
    description: 'Command‑line tool for evaluating LLM outputs against custom metrics.',
    category: 'ai-prompts',
    tags: ['CLI', 'Evaluation', 'Python'],
    ctaType: 'github',
    githubUrl: 'https://github.com/dataspecialist/llm-eval-cli',
  },
  {
    slug: 'workflow-viz',
    name: 'Workflow Viz',
    description: 'Visualize complex automation workflows as interactive diagrams.',
    category: 'automation',
    tags: ['React', 'D3', 'Workflows'],
    ctaType: 'use',
  },
  {
    slug: 'strategy-canvas',
    name: 'Strategy Canvas',
    description: 'Collaborative tool for mapping technical execution to business goals.',
    category: 'strategy',
    tags: ['Strategy', 'Planning', 'Teams'],
    ctaType: 'use',
    featured: true,
  },
];

// Category display names
const categoryLabels: Record<ToolCategory, string> = {
  'ai-prompts': 'AI Prompts',
  'automation': 'Automation',
  'dev-utils': 'Dev Utils',
  'strategy': 'Strategy',
};

/**
 * Tools page – "Toolkits & Utilities"
 * Displays a filterable grid of free, open‑source tools.
 * Implements "The Data Specialist" design system with asymmetric layout
 * and distinctive gold‑accented cards.
 */
const Tools = memo(() => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return mockTools;
    return mockTools.filter((tool) => tool.category === activeCategory);
  }, [activeCategory]);

  const handleToolClick = (slug: string) => {
    // In a real app, navigate to tool detail page or external URL
    console.log('Tool clicked:', slug);
    // navigate(`/tools/${slug}`);
  };

  const filterOptions = ['all', ...Object.keys(categoryLabels)] as const;

  return (
    <>
      <Helmet>
        <title>Toolkits & Utilities | The Data Specialist</title>
        <meta
          name="description"
          content="Free, open‑source tools and frameworks for developers, AI engineers, and digital strategists. Build faster with these utilities."
        />
      </Helmet>

      <main className={styles.tools}>
        {/* Header */}
        <SectionContainer id="tools-header" paddingSize="lg" backgroundVariant="default">
          <div className={styles.header}>
            <h1 className={styles.header__title}>Toolkits & Utilities</h1>
            <p className={styles.header__subtitle}>Systems to Build Systems.</p>
            <p className={styles.header__purpose}>
              Free, open‑source tools and frameworks for developers, AI engineers, and digital strategists. Build faster with these utilities.
            </p>
          </div>
        </SectionContainer>

        {/* Filter bar */}
        <SectionContainer id="tools-filter" paddingSize="md" backgroundVariant="default">
          <div className={styles.filterWrapper}>
            <FilterBar
              filters={filterOptions.map((opt) =>
                opt === 'all' ? 'All Tools' : categoryLabels[opt as ToolCategory]
              )}
              activeFilter={activeCategory === 'all' ? 'All Tools' : categoryLabels[activeCategory]}
              onFilterChange={(label) => {
                if (label === 'All Tools') {
                  setActiveCategory('all');
                } else {
                  const found = Object.entries(categoryLabels).find(
                    ([, value]) => value === label
                  );
                  if (found) {
                    setActiveCategory(found[0] as ToolCategory);
                  }
                }
              }}
              ariaLabel="Filter tools by category"
            />
          </div>
        </SectionContainer>

        {/* Tool grid */}
        <SectionContainer id="tools-grid" paddingSize="lg" backgroundVariant="default">
          <ListofTools tools={filteredTools} onToolClick={handleToolClick} />
        </SectionContainer>
      </main>
    </>
  );
});

Tools.displayName = 'Tools';
export default Tools;