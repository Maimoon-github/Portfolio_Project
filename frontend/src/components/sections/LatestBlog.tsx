"use client";
import React from "react";
import { posts } from "@/lib/data";
import { cn } from "@/lib/utils/cn";

export function LatestBlog() {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1, 5);

  return (
    <section aria-label="Latest Writing" className="py-20 md:py-32 bg-[color:var(--surface)]">
      <div className="container px-4 md:px-8 mx-auto max-w-7xl">
        <header className="flex justify-between items-end mb-16 md:mb-20">
          <div className="w-full md:text-right pr-0 md:pr-[10%]">
            <h2 className="text-3xl md:text-[2rem] font-medium text-[color:var(--on_surface)] mb-4">Technical Writing</h2>
            <a href="/blog" className="text-xs uppercase tracking-widest text-[color:var(--secondary)] font-bold hover:text-[color:var(--primary)] transition-colors inline-flex items-center gap-2">
              View All <span>&rarr;</span>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Featured Post */}
          <article className="lg:row-span-2 group relative p-8 md:p-10 rounded-[2rem] bg-[color:var(--surface_container)] border border-[color:var(--outline_variant)] hover:bg-[color:var(--surface_container_high)] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--primary)]">
                {featuredPost.category}
              </span>
              <span className="text-xs text-[color:var(--secondary)] uppercase tracking-wider">
                {featuredPost.date}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-medium text-[color:var(--on_surface)] mb-6 group-hover:text-[color:var(--primary)] transition-colors">
              <a href={`/blog/${featuredPost.slug}`} className="before:absolute before:inset-0">
                {featuredPost.title}
              </a>
            </h3>
            
            <p className="text-base text-[color:var(--on_surface)]/70 leading-relaxed mb-8">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center text-xs text-[color:var(--secondary)] tracking-widest uppercase font-semibold">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {featuredPost.readTime}
            </div>
          </article>

          {/* Regular Posts - Mobile Horizontal Scroll, Desktop Grid */}
          <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-2 gap-6 snap-x pb-8 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {remainingPosts.map((post) => (
              <article key={post.id} className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start group relative p-6 rounded-[2rem] bg-[color:var(--surface_container)] hover:bg-[color:var(--surface_container_high)] transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[color:var(--secondary)] uppercase tracking-wider font-semibold mb-3">
                    {post.date}
                  </div>
                  <h3 className="text-lg font-medium text-[color:var(--on_surface)] mb-3 group-hover:text-[color:var(--primary)] transition-colors leading-snug">
                    <a href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-sm text-[color:var(--on_surface)]/60 line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center text-[10px] text-[color:var(--secondary)] tracking-widest uppercase font-semibold mt-auto">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
