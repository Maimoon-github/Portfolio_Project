'use client';

import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { PROFILE } from '@/app/data';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="absolute top-8 left-8 w-14 h-14 border-t border-l border-accent/20 rounded-tl-lg" />
      <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r border-accent/20 rounded-br-lg" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="eyebrow-label mb-4">Collaboration</div>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.6rem)] font-bold text-on-background leading-tight mb-4">
          Interested in working together?
        </h2>
        <p className="text-outline text-base leading-relaxed mb-10 max-w-xl mx-auto">
          Whether you need an agentic AI system built from scratch, an MLOps platform,
          or consulting on your data strategy — let's talk.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="glass-btn bg-accent text-on-accent font-bold inline-flex items-center gap-2 px-8 py-3 rounded-lg">
            Get in Touch <ArrowRight size={16} />
          </Link>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-glass-border text-accent hover:bg-accent/10"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}