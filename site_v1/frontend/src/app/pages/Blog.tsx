// src/app/pages/Blog.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWagtailBlogPosts, useWagtailBlogFilters } from '../hooks/useBlog';
import { getCmsImageUrl } from '../config';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import type { CmsBlogPostSummary } from '../types/api';

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const { posts, totalCount, loading, error } = useWagtailBlogPosts({
    page,
    limit: POSTS_PER_PAGE,
    search: search || undefined,
    category: activeCategory || undefined,
    tags: activeTag || undefined,
  });

  const { categories, tags } = useWagtailBlogFilters();

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  const resetFilters = () => {
    setPage(1);
    setSearch('');
    setActiveCategory('');
    setActiveTag('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Blog</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Thoughts on design, code, and building things.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* ── Filters ───────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="max-w-sm"
          />

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={!activeCategory ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => { setActiveCategory(''); setPage(1); }}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* ── Tag cloud ─────────────────────────────────────── */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => { setActiveTag(activeTag === tag ? '' : tag); setPage(1); }}
                className={`text-xs px-2 py-1 rounded-full cursor-pointer border transition-colors ${
                  activeTag === tag
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border text-muted-foreground hover:border-foreground'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Error state ───────────────────────────────────── */}
        {error && (
          <div className="text-center py-20 text-destructive">
            <p>Failed to load posts: {error}</p>
            <button onClick={resetFilters} className="mt-4 underline">
              Reset filters
            </button>
          </div>
        )}

        {/* ── Loading skeletons ─────────────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* ── Posts grid ────────────────────────────────────── */}
        {!loading && !error && (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p>No posts found.</p>
                <button onClick={resetFilters} className="mt-2 underline text-sm">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* ── Pagination ──────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded border border-border disabled:opacity-40 hover:bg-accent transition-colors"
                >
                  ←
                </button>
                <span className="px-4 py-2 text-sm text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded border border-border disabled:opacity-40 hover:bg-accent transition-colors"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Blog card sub-component ────────────────────────────────────────
function BlogPostCard({ post }: { post: CmsBlogPostSummary }) {
  const imageId = post.featured_image?.id;
  const thumbUrl = imageId ? `/api/cms/v2/images/${imageId}/?width=400` : null;

    return (
    <Link
      to={`/blog/${post.meta.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-muted overflow-hidden">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-accent/20" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {post.category && (
          <Badge variant="secondary" className="w-fit text-xs">
            {post.category}
          </Badge>
        )}
        <h2 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
          <span>
            {new Date(post.date_published).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric',
            })}
          </span>
          <span>{post.reading_time_minutes} min read</span>
        </div>
      </div>
    </Link>
  );
}