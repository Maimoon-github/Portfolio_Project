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
    <section className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-[var(--type-h2-size)] font-medium text-[var(--color-primary)] opacity-90">
            Latest Thinking
          </h2>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-lg border border-[var(--color-outline-variant)]/30 flex items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button className="w-12 h-12 rounded-lg border border-[var(--color-outline-variant)]/30 flex items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll track */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEASERS.map((item, index) => (
            <article 
              key={index}
              className={cn(
                "bg-[#121212] border border-[var(--color-outline-variant)]/10 rounded-xl p-10",
                "transition-all duration-300 hover:border-[var(--color-primary)]/20 hover:bg-[#161616]"
              )}
            >
              <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--color-primary)] opacity-60 block mb-6 uppercase">
                {item.category}
              </span>
              <h3 className="text-[18px] font-semibold text-[var(--color-on-surface)] leading-tight mb-5 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[14px] text-[var(--color-on-surface-variant)] opacity-60 mb-10 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
              <Link 
                href={item.link}
                className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary)] opacity-80 hover:opacity-100 transition-opacity uppercase inline-flex items-center gap-2"
              >
                {item.linkLabel}
                <span className="text-[12px]">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

