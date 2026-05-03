// src/app/blog/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { PostCard } from '@/components/blog/PostCard';
import { fetchPost } from '@/lib/api/blog';
import { Post } from '@/types/api';

export const metadata: Metadata = {
  title: 'Blog • Neural Dispatch',
  description: 'Exploring the frontiers of neural architectures, agentic systems, and autonomous engineering.',
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    const response = await fetchPost.list();
    posts = response.results;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }

  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        <header className="max-w-3xl mb-20 animate-reveal">
          <span className="type-label-caps text-primary opacity-80 block mb-6">
            Neural Dispatch
          </span>
          <h1 className="text-[var(--type-h1-size)] font-bold text-on-surface mb-8">
            Theorems & Explorations
          </h1>
          <p className="text-[var(--type-body-lg-size)] text-on-surface-variant max-w-[60ch]">
            A technical journal focused on the convergence of discrete mathematics, 
            large-scale machine learning, and the architecture of sentient code.
          </p>
        </header>

        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse bg-surface-container-low h-96 rounded-xl" />}>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-outline-variant rounded-xl">
              <p className="text-on-surface-variant">No theorems have been published yet. Check back soon.</p>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}