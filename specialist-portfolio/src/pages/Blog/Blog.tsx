import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer/SectionContainer';
import FilterBar from '@/components/ui/FilterBar/FilterBar';
import styles from './Blog.module.css';
import type { BlogCategory, BlogPost, BlogPageData } from './Blog.types';

// Mock data – would come from CMS/API
const mockPosts: BlogPost[] = [
  {
    slug: 'future-agentic-workflows',
    title: 'The Future of Agentic Workflows',
    excerpt: 'Exploring autonomous systems and their impact on digital infrastructure.',
    content: '# Full content here...',
    meta: {
      date: '2025-04-15',
      readTime: '6 min read',
      category: 'ai-strategy',
    },
    featured: true,
    image: '/images/blog/agentic-workflows.jpg',
    imageAlt: 'Agentic workflow diagram',
  },
  {
    slug: 'building-rag-pipeline',
    title: 'Building a RAG Pipeline with LangChain',
    excerpt: 'Step‑by‑step tutorial to create a retrieval‑augmented generation system.',
    content: '# Full content here...',
    meta: {
      date: '2025-04-10',
      readTime: '8 min read',
      category: 'engineering',
    },
    featured: false,
    image: '/images/blog/rag-pipeline.jpg',
    imageAlt: 'RAG architecture',
  },
  {
    slug: 'automation-philosophy',
    title: 'The Philosophy of Automation',
    excerpt: 'Why thoughtful automation creates more value than brute‑force efficiency.',
    content: '# Full content here...',
    meta: {
      date: '2025-04-05',
      readTime: '5 min read',
      category: 'automation',
    },
    featured: false,
    image: '/images/blog/automation.jpg',
    imageAlt: 'Abstract automation concept',
  },
  {
    slug: 'digital-growth-strategy',
    title: 'Digital Growth in 2025',
    excerpt: 'How to align technical execution with business outcomes.',
    content: '# Full content here...',
    meta: {
      date: '2025-03-28',
      readTime: '7 min read',
      category: 'digital-growth',
    },
    featured: false,
  },
];

// Category display names for filter bar
const categoryLabels: Record<BlogCategory, string> = {
  'ai-strategy': 'AI Strategy',
  'engineering': 'Engineering Deep Dives',
  'automation': 'Automation Philosophy',
  'digital-growth': 'Digital Growth',
};

/**
 * Blog listing page – "Insights" with category filtering.
 * Features a pinned featured post and a grid of remaining posts.
 */
const Blog = memo(() => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');

  const featuredPost = mockPosts.find((post) => post.featured) || null;

  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      if (activeCategory === 'all') return true;
      return post.meta.category === activeCategory;
    });
  }, [activeCategory]);

  // Remove featured post from filtered list if it appears there
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || post.slug !== featuredPost?.slug
  );

  const filterOptions = ['all', ...Object.keys(categoryLabels)] as const;

  return (
    <>
      <Helmet>
        <title>Insights | The Data Specialist</title>
        <meta name="description" content="In-depth articles and analysis on AI engineering, system design, and digital strategy." />
      </Helmet>

      <main className={styles.blog}>
        {/* Header */}
        <SectionContainer id="blog-header" paddingSize="lg" backgroundVariant="default">
          <div className={styles.header}>
            <h1 className={styles.header__title}>Insights</h1>
            <p className={styles.header__subtitle}>Thinking in Public.</p>
          </div>
        </SectionContainer>

        {/* Filter bar */}
        <SectionContainer id="blog-filter" paddingSize="md" backgroundVariant="default">
          <div className={styles.filterWrapper}>
            <FilterBar
              filters={filterOptions.map((opt) =>
                opt === 'all' ? 'All' : categoryLabels[opt as BlogCategory]
              )}
              activeFilter={activeCategory === 'all' ? 'All' : categoryLabels[activeCategory]}
              onFilterChange={(label) => {
                const found = Object.entries(categoryLabels).find(
                  ([, value]) => value === label
                );
                setActiveCategory(found ? (found[0] as BlogCategory) : 'all');
              }}
              ariaLabel="Filter posts by category"
            />
          </div>
        </SectionContainer>

        {/* Content */}
        <SectionContainer id="blog-posts" paddingSize="lg" backgroundVariant="default">
          {filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>
              No posts found in this category.
            </div>
          ) : (
            <>
              {/* Featured post (if present) */}
              {activeCategory === 'all' && featuredPost && (
                <article className={styles.featuredCard}>
                  <Link to={`/mind/blog/${featuredPost.slug}`} className={styles.featuredCard__link}>
                    {featuredPost.image && (
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.imageAlt || featuredPost.title}
                        className={styles.featuredCard__image}
                        loading="lazy"
                      />
                    )}
                    <div className={styles.featuredCard__meta}>
                      <span>{new Date(featuredPost.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <span>{featuredPost.meta.readTime}</span>
                    </div>
                    <h2 className={styles.featuredCard__title}>{featuredPost.title}</h2>
                    <p className={styles.featuredCard__excerpt}>{featuredPost.excerpt}</p>
                  </Link>
                </article>
              )}

              {/* Regular post grid */}
              <div className={styles.postsGrid}>
                {regularPosts.map((post) => (
                  <article key={post.slug} className={styles.postCard}>
                    <Link to={`/mind/blog/${post.slug}`} className={styles.postCard__link}>
                      <div className={styles.postCard__meta}>
                        <span>{new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>{post.meta.readTime}</span>
                      </div>
                      <h3 className={styles.postCard__title}>{post.title}</h3>
                      <p className={styles.postCard__excerpt}>{post.excerpt}</p>
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

Blog.displayName = 'Blog';
export default Blog;