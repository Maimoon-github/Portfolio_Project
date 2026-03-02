import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import FilterBar from '@/components/ui/FilterBar/FilterBar';
import Button from '@/components/ui/Button/Button';
import styles from './Documentation.module.css';

// Types
export type TutorialCategory = 'llms' | 'python' | 'workflows' | 'automation';
export type TutorialDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type TutorialFormat = 'Tutorial' | 'Reference' | 'Blueprint';

export interface Tutorial {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: TutorialCategory;
  difficulty: TutorialDifficulty;
  format: TutorialFormat;
  lastUpdated: string;
}

// Mock data
const mockTutorials: Tutorial[] = [
  {
    slug: 'building-rag-pipeline',
    title: 'Building a RAG Pipeline with LangChain',
    excerpt: 'Step‑by‑step tutorial to create a retrieval‑augmented generation system.',
    content: '# Full content here...',
    category: 'llms',
    difficulty: 'Intermediate',
    format: 'Tutorial',
    lastUpdated: '2025-04-10',
  },
  {
    slug: 'agentic-workflows-patterns',
    title: 'Agentic Workflows: Design Patterns',
    excerpt: 'Learn the key design patterns for building reliable agentic systems.',
    content: '# Full content here...',
    category: 'workflows',
    difficulty: 'Advanced',
    format: 'Tutorial',
    lastUpdated: '2025-04-05',
  },
  {
    slug: 'python-async-best-practices',
    title: 'Python Async Best Practices',
    excerpt: 'Master async/await in Python for high‑performance automation.',
    content: '# Full content here...',
    category: 'python',
    difficulty: 'Intermediate',
    format: 'Reference',
    lastUpdated: '2025-03-28',
  },
  {
    slug: 'automation-decision-framework',
    title: 'Automation Decision Framework',
    excerpt: 'When to automate, what to automate, and how to measure success.',
    content: '# Full content here...',
    category: 'automation',
    difficulty: 'Beginner',
    format: 'Blueprint',
    lastUpdated: '2025-03-20',
  },
  {
    slug: 'llm-evaluation-metrics',
    title: 'LLM Evaluation Metrics',
    excerpt: 'Comprehensive guide to evaluating LLM outputs in production.',
    content: '# Full content here...',
    category: 'llms',
    difficulty: 'Advanced',
    format: 'Reference',
    lastUpdated: '2025-03-15',
  },
];

// Category display names
const categoryLabels: Record<TutorialCategory, string> = {
  llms: 'LLMs',
  python: 'Python',
  workflows: 'Workflows',
  automation: 'Automation',
};

// Difficulty display names
const difficultyLabels: Record<TutorialDifficulty, string> = {
  Beginner: 'Beginner',
  Intermediate: 'Intermediate',
  Advanced: 'Advanced',
};

// Format display names
const formatLabels: Record<TutorialFormat, string> = {
  Tutorial: 'Tutorial',
  Reference: 'Reference',
  Blueprint: 'Blueprint',
};

// Combined filter type
interface FilterState {
  category: TutorialCategory | 'all';
  difficulty: TutorialDifficulty | 'all';
  format: TutorialFormat | 'all';
}

/**
 * Documentation listing page – "Knowledge Base" with category, difficulty,
 * and format filters, plus search.
 */
const Documentation = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    difficulty: 'all',
    format: 'all',
  });

  const filteredTutorials = useMemo(() => {
    return mockTutorials.filter((tutorial) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          tutorial.title.toLowerCase().includes(query) ||
          tutorial.excerpt.toLowerCase().includes(query) ||
          tutorial.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'all' && tutorial.category !== filters.category) return false;

      // Difficulty filter
      if (filters.difficulty !== 'all' && tutorial.difficulty !== filters.difficulty) return false;

      // Format filter
      if (filters.format !== 'all' && tutorial.format !== filters.format) return false;

      return true;
    });
  }, [searchQuery, filters]);

  const categoryOptions = ['all', ...Object.keys(categoryLabels)] as const;
  const difficultyOptions = ['all', ...Object.keys(difficultyLabels)] as const;
  const formatOptions = ['all', ...Object.keys(formatLabels)] as const;

  return (
    <>
      <Helmet>
        <title>Knowledge Base | The Data Specialist</title>
        <meta
          name="description"
          content="Structured guides and technical references for AI engineering, automation, and modern development."
        />
      </Helmet>

      <main className={styles.documentation}>
        {/* Header */}
        <SectionContainer id="docs-header" paddingSize="lg" backgroundVariant="default">
          <div className={styles.header}>
            <h1 className={styles.header__title}>Knowledge Base</h1>
            <p className={styles.header__subtitle}>Structured Guides & Technical References.</p>
          </div>
        </SectionContainer>

        {/* Search */}
        <SectionContainer id="docs-search" paddingSize="md" backgroundVariant="default">
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search tutorials..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tutorials"
            />
          </div>
        </SectionContainer>

        {/* Filters */}
        <SectionContainer id="docs-filters" paddingSize="md" backgroundVariant="default">
          <div className={styles.filterWrapper}>
            <FilterBar
              filters={categoryOptions.map((opt) =>
                opt === 'all' ? 'All Categories' : categoryLabels[opt as TutorialCategory]
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
                    setFilters((prev) => ({ ...prev, category: found[0] as TutorialCategory }));
                  }
                }
              }}
              ariaLabel="Filter by category"
            />
          </div>
          <div className={styles.filterWrapper}>
            <FilterBar
              filters={difficultyOptions.map((opt) =>
                opt === 'all' ? 'All Levels' : opt
              )}
              activeFilter={
                filters.difficulty === 'all' ? 'All Levels' : filters.difficulty
              }
              onFilterChange={(label) => {
                if (label === 'All Levels') {
                  setFilters((prev) => ({ ...prev, difficulty: 'all' }));
                } else {
                  setFilters((prev) => ({
                    ...prev,
                    difficulty: label as TutorialDifficulty,
                  }));
                }
              }}
              ariaLabel="Filter by difficulty"
            />
          </div>
          <div className={styles.filterWrapper}>
            <FilterBar
              filters={formatOptions.map((opt) =>
                opt === 'all' ? 'All Formats' : opt
              )}
              activeFilter={
                filters.format === 'all' ? 'All Formats' : filters.format
              }
              onFilterChange={(label) => {
                if (label === 'All Formats') {
                  setFilters((prev) => ({ ...prev, format: 'all' }));
                } else {
                  setFilters((prev) => ({
                    ...prev,
                    format: label as TutorialFormat,
                  }));
                }
              }}
              ariaLabel="Filter by format"
            />
          </div>
        </SectionContainer>

        {/* Tutorial Grid */}
        <SectionContainer id="docs-tutorials" paddingSize="lg" backgroundVariant="default">
          {filteredTutorials.length === 0 ? (
            <div className={styles.noResults}>
              No tutorials match your filters.
            </div>
          ) : (
            <>
              <div className={styles.tutorialsGrid}>
                {filteredTutorials.map((tutorial) => (
                  <article key={tutorial.slug} className={styles.tutorialCard}>
                    <Link to={`/mind/docs/${tutorial.slug}`} className={styles.tutorialCard__link}>
                      <div className={styles.tutorialCard__meta}>
                        <span className={styles.tutorialCard__badge}>
                          {categoryLabels[tutorial.category]}
                        </span>
                        <span
                          className={`${styles.tutorialCard__badge} ${styles['tutorialCard__badge--difficulty']}`}
                        >
                          {tutorial.difficulty}
                        </span>
                        <span className={styles.tutorialCard__badge}>{tutorial.format}</span>
                      </div>
                      <h2 className={styles.tutorialCard__title}>{tutorial.title}</h2>
                      <p className={styles.tutorialCard__excerpt}>{tutorial.excerpt}</p>
                      <div className={styles.tutorialCard__footer}>
                        <span className={styles.tutorialCard__updated}>
                          📅 {new Date(tutorial.lastUpdated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </SectionContainer>
      </main>
    </>
  );
});

Documentation.displayName = 'Documentation';
export default Documentation;