'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogCard } from '@/app/components/shared/BlogCard';
import type { PostList } from '@/app/types/api';

interface RecentBlogPostsProps {
  posts: PostList[];
}

export function RecentBlogPosts({ posts }: RecentBlogPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="eyebrow-label mb-2">Writing</div>
            <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-on-background">Latest from the Blog</h2>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm text-outline hover:text-accent transition-colors">
            All Posts <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}