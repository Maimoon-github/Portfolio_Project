'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, Database, Microscope, Share2 } from 'lucide-react';

const CATEGORIES = [
  { name: 'AI Engineering', icon: Brain },
  { name: 'Data Science',   icon: Database },
  { name: 'Bioinformatics', icon: Microscope },
  { name: 'Agentic Ops',    icon: Share2 },
];

const SKILLS = [
  'LlamaIndex', 'SiePython', 'SQL', 'AWS', 'TensorFlow', 
  'Scikit-learn', 'Kubernetes', 'WS', 'Pandas', 'NumPy',
  'Next.js', 'TypeScript', 'Python', 'Docker', 'Hugging Face'
];

export function SkillHighlights() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-8">
        <h2 className="text-[var(--type-h2-size)] font-medium text-[var(--color-primary)] text-center mb-20 opacity-90">
          Technical Breadth
        </h2>

        {/* Icon Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.name} 
              className={cn(
                "flex flex-col items-center justify-center gap-5 p-10 rounded-[20px]",
                "bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/50",
                "transition-all duration-300 hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-surface-container)]"
              )}
            >
              <div className="text-[var(--color-primary)] opacity-80">
                <cat.icon size={36} strokeWidth={1.5} />
              </div>
              <span className="text-[13px] font-medium tracking-[0.05em] text-[var(--color-on-surface-variant)]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative overflow-hidden py-12 select-none border-t border-b border-[var(--color-outline-variant)]/20">
        {/* Desktop Marquee */}
        <div className="hidden md:flex gap-10 animate-marquee whitespace-nowrap">
          <div className="flex gap-10">
            {SKILLS.concat(SKILLS).concat(SKILLS).map((skill, index) => (
              <span 
                key={`${skill}-${index}`} 
                className="text-[var(--color-on-surface-variant)] text-[14px] font-medium tracking-[0.05em] opacity-60 hover:opacity-100 transition-opacity"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="flex md:hidden flex-wrap justify-center gap-4 px-6">
          {SKILLS.map((skill) => (
            <span key={skill} className="text-[var(--color-on-surface-variant)] text-[12px] opacity-70">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </section>
  );
}

