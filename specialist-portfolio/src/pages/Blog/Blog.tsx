// specialist-portfolio/src/pages/Blog/Blog.tsx

import { useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionContainer from '@/components/layout/SectionContainer';
import FilterBar from '@/components/ui/FilterBar';
import Card from '@/components/ui/Card';
// import Badge from '@/components/ui/Badge'; // if needed
import { blogPosts } from '@/data/blog';
import styles from './Blog.module.css';
import type { BlogCategory, BlogPost } from './Blog.types';

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

  const featuredPost = blogPosts.find((post) => post.featured) || null;

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (activeCategory === 'all') return true;
      return post.meta.category === activeCategory;
    });
  }, [activeCategory]);

  // Remove featured post from filtered list if it appears there
  const regularPosts = filteredPosts.filter(
    (post) => !post.featured || post.slug !== featuredPost?.slug
  );

  const filterOptions = ['all', ...Object.keys(categoryLabels)] as const;

  // Map filter option to display label
  const getFilterLabel = (opt: typeof filterOptions[number]) => {
    if (opt === 'all') return 'All';
    return categoryLabels[opt as BlogCategory];
  };

  const handleFilterChange = (label: string) => {
    if (label === 'All') {
      setActiveCategory('all');
      return;
    }
    const found = Object.entries(categoryLabels).find(([, value]) => value === label);
    if (found) {
      setActiveCategory(found[0] as BlogCategory);
    }
  };

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
              filters={filterOptions.map(getFilterLabel)}
              activeFilter={getFilterLabel(activeCategory)}
              onFilterChange={handleFilterChange}
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
                  <Card key={post.slug} className={styles.postCard} interactive>
                    <Link to={`/mind/blog/${post.slug}`} className={styles.postCard__link}>
                      <div className={styles.postCard__meta}>
                        <span>{new Date(post.meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span>{post.meta.readTime}</span>
                      </div>
                      <h3 className={styles.postCard__title}>{post.title}</h3>
                      <p className={styles.postCard__excerpt}>{post.excerpt}</p>
                    </Link>
                  </Card>
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