'use client';

import { getBlogPost, getBlogPosts } from '@/services/api';
import { BlogCard } from '@/components/shared/BlogCard';
import { MarkdownContent } from '@/components/blog/MarkdownContent';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROFILE } from '@/app/data';
import type { PostDetail, PostList } from '@/app/types/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug) as PostDetail;
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: 'Post Not Found' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: PostDetail | null = null;
  let related: PostList[] = [];
  let error = false;

  try {
    post = await getBlogPost(slug) as PostDetail;
    const allPosts = await getBlogPosts();
    const postsList = allPosts.results || allPosts;
    related = postsList
      .filter((p: PostList) => p.slug !== slug && p.category?.name === post.category?.name)
      .slice(0, 2);
  } catch (err) {
    error = true;
  }

  if (error || !post) {
    notFound();
  }

  const categoryName = post.category?.name || 'Uncategorized';
  const catColorMap: Record<string, string> = {
    'AI/ML': '#A4FBCC',
    MLOps: '#7DD3FC',
    Tutorials: '#FCD34D',
    Career: '#F9A8D4',
    DevOps: '#C4B5FD',
  };
  const catColor = catColorMap[categoryName] || '#A4FBCC';

  const formattedDate = post.publish_date
    ? new Date(post.publish_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    : '';

  const tagNames = post.tags?.map((tag: { name: string }) => tag.name) || [];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm mb-8 text-[#B0C4B0] hover:text-[#A4FBCC] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <span
              className="text-xs px-2 py-1 rounded inline-block mb-4 font-mono"
              style={{
                background: `${catColor}14`,
                color: catColor,
                border: `1px solid ${catColor}30`,
              }}
            >
              {categoryName}
            </span>
            <h1 className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-base text-[#B0C4B0] mb-6">{post.excerpt}</p>

            {/* Byline */}
            <div className="flex flex-wrap items-center gap-4 py-4 px-5 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-[#A4FBCC] text-[#0A2E1A]">
                  {PROFILE.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{PROFILE.name}</p>
                  <p className="text-xs text-[#B0C4B0]">{PROFILE.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-[#B0C4B0] ml-auto">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {post.read_time} min read
                </span>
              </div>
            </div>
          </header>

          {/* Markdown content */}
          <MarkdownContent content={post.content} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[rgba(164,251,204,0.08)]">
            <Tag size={13} className="text-[#B0C4B0] mt-0.5" />
            {tagNames.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[rgba(164,251,204,0.08)] text-[#A4FBCC] font-mono">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-10 p-6 rounded-xl bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 bg-[#A4FBCC] text-[#0A2E1A]">
              {PROFILE.initials}
            </div>
            <div>
              <h4 className="text-white font-bold mb-1">{PROFILE.name}</h4>
              <p className="text-xs text-[#A4FBCC] mb-3">{PROFILE.title}</p>
              <p className="text-sm text-[#B0C4B0]">{PROFILE.bio}</p>
              <Link href="/contact" className="text-xs text-[#A4FBCC] hover:underline mt-3 inline-block">
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-[1.2rem] font-bold text-white mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}