'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, Database, Microscope, Cpu } from 'lucide-react';

const CATEGORIES = [
  { name: 'AI', icon: Brain },
  { name: 'Data', icon: Database },
  { name: 'Bio', icon: Microscope },
  { name: 'Agents', icon: Cpu },
];

const SKILLS = [
  'PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'OpenAI API', 
  'Hugging Face', 'RDKit', 'BioPython', 'Pandas', 'NumPy', 
  'Next.js', 'TypeScript', 'Python', 'SQL', 'Docker', 'AWS'
];

export function SkillHighlights() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-8">
        <h2 className="text-[var(--type-h2-size)] font-medium text-[var(--color-on-surface)] mb-12">
          Technical Breadth
        </h2>

        {/* Icon Cluster */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-20">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-4">
              <div 
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  "bg-[var(--color-deep-navy)] border border-[var(--color-outline-variant)]",
                  "text-[var(--color-primary)] shadow-[var(--shadow-glow-sm)]"
                )}
              >
                <cat.icon size={32} />
              </div>
              <span className="type-label-caps text-[var(--color-on-surface-variant)]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee */}
      <div className="relative overflow-hidden py-10 select-none">
        {/* Desktop Marquee */}
        <div className="hidden md:flex gap-4 animate-marquee whitespace-nowrap group">
          {/* First set of skills */}
          <div className="flex gap-4">
            {SKILLS.concat(SKILLS).map((skill, index) => (
              <span key={`${skill}-${index}`} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="flex md:hidden flex-wrap justify-center gap-3 px-4">
          {SKILLS.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
