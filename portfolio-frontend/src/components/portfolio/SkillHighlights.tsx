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
    <section className="py-32 bg-[var(--color-surface)]">
      <div className="container">
        <h2 className="text-4xl font-medium text-[var(--color-primary)] mb-20 opacity-90">
          Technical Breadth
        </h2>

        {/* Icon Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.name} 
              className={cn(
                "flex flex-col items-center justify-center gap-5 p-8 rounded-lg",
                "bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/40",
                "transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-container)]"
              )}
            >
              <div className="text-[var(--color-primary)] opacity-70 group-hover:opacity-100 transition-opacity">
                <cat.icon size={32} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-on-surface-variant)] text-center">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

        {/* Skills Marquee */}
        <div className="relative overflow-hidden py-12 border-t border-b border-[var(--color-outline-variant)]/20 select-none">
          {/* Desktop Marquee */}
          <div className="hidden md:flex gap-12 animate-marquee whitespace-nowrap">
            <div className="flex gap-12">
              {SKILLS.concat(SKILLS).concat(SKILLS).map((skill, index) => (
                <span 
                  key={`${skill}-${index}`} 
                  className="text-[var(--color-on-surface-variant)] text-sm font-medium tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="flex md:hidden flex-wrap justify-center gap-4 px-6">
            {SKILLS.map((skill) => (
              <span key={skill} className="text-[var(--color-on-surface-variant)] text-xs font-medium opacity-60">
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
            animation: marquee 80s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}

