'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TEASERS = [
  {
    category: 'ARTICLE / 5024',
    title: 'Softmax in Large Language Models: A New Metric for Reasoning',
    excerpt: 'Exploring how thermodynamic entropy correlates with logical consistency in chain-of-thought prompting...',
    link: '/blog/softmax-reasoning',
    linkLabel: 'READ MORE',
  },
  {
    category: 'TOOL / OPEN SOURCE',
    title: 'AetherBrain: Semantic Visualization for Knowledge Bases',
    excerpt: 'A new tool for mapping high-relational paths into high-dimensional interactive manifolds...',
    link: 'https://github.com/aether/brain',
    linkLabel: 'VIEW ON GITHUB',
  },
  {
    category: 'CASE STUDY / BXP',
    title: 'Abstract: Nextflow in Cloud Native Environments',
    excerpt: 'Scaling protein folding simulations across modern HPC clusters with automated orchestration...',
    link: '/portfolio/nextflow-cloud',
    linkLabel: 'READ MORE',
  },
];

export function BlogTeaser() {
  return (
    <section className="py-32 bg-[var(--color-surface)]">
      <div className="container">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-4xl font-medium text-[var(--color-primary)] opacity-90">
            Latest Thinking
          </h2>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-lg border border-[var(--color-outline-variant)]/40 flex items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:border-[var(--color-primary)]/50 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-lg border border-[var(--color-outline-variant)]/40 flex items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:border-[var(--color-primary)]/50 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEASERS.map((item, index) => (
            <article 
              key={index}
              className={cn(
                "bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/40 rounded-lg p-8 flex flex-col h-full",
                "transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-container)]"
              )}
            >
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-primary)] opacity-60 block mb-6">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold text-[var(--color-on-surface)] leading-tight mb-5">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-on-surface-variant)] opacity-70 mb-8 line-clamp-3 leading-relaxed flex-grow">
                {item.excerpt}
              </p>
              <Link 
                href={item.link}
                className="text-xs font-bold tracking-widest uppercase text-[var(--color-primary)] opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-2"
              >
                {item.linkLabel}
                <span className="text-sm">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

