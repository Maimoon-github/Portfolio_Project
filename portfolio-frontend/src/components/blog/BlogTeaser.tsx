'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const TEASERS = [
  {
    category: 'Blog',
    title: 'Agentic Workflows in Production',
    date: 'MAY 2026',
    excerpt: 'Exploring the shift from chain-of-thought to self-correcting agent architectures.',
    link: '/blog/agentic-workflows',
  },
  {
    category: 'Tool',
    title: 'Molecular Latent Explorer',
    date: 'APR 2026',
    excerpt: 'An interactive tool for navigating high-dimensional chemical spaces.',
    link: '/tools/molecular-explorer',
  },
  {
    category: 'Blog',
    title: 'Precision Bio-Informatics',
    date: 'MAR 2026',
    excerpt: 'Leveraging graph neural networks for protein fold prediction.',
    link: '/blog/bio-informatics',
  },
];

export function BlogTeaser() {
  return (
    <section className="py-20 bg-[var(--color-surface)]">
      <div className="container mx-auto px-8">
        <h2 className="text-[var(--type-h2-size)] font-medium text-[var(--color-on-surface)] mb-12">
          Latest Thinking
        </h2>

        {/* Horizontal scroll track */}
        <div 
          className={cn(
            "flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-none",
            "md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
          )}
        >
          {TEASERS.map((item, index) => (
            <article 
              key={index}
              className={cn(
                "flex-shrink-0 w-[320px] md:w-full snap-start",
                "bg-[var(--color-surface-container-low)] rounded-[var(--radius-xl)] p-8",
                "border border-transparent hover:border-[var(--color-outline-variant)]",
                "transition-all duration-[220ms] ease-[var(--ease-out-expo)]"
              )}
            >
              <span className="type-label-caps text-[var(--color-mid-purple)] block mb-4">
                {item.category}
              </span>
              <h3 className="text-[var(--type-h3-size)] font-medium text-[var(--color-on-surface)] mb-3">
                {item.title}
              </h3>
              <span className="type-label-caps text-[var(--color-outline-variant)] text-[10px] block mb-4">
                {item.date}
              </span>
              <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-variant)] mb-6 line-clamp-2">
                {item.excerpt}
              </p>
              <Link 
                href={item.link}
                className="text-[var(--color-primary)] hover:underline type-label-caps text-[11px]"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
