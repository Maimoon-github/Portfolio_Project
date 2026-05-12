// src/components/ui/ProjectCard.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCardTilt } from '@/hooks/use-card-tilt';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href: string;
  className?: string;
}

export function ProjectCard({ title, description, tags, href, className }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const tiltDisabled = prefersReducedMotion ?? false;

  const { style, onMouseMove, onMouseLeave } = useCardTilt<HTMLAnchorElement>({
    maxTilt: 10,
    perspective: 800,
  });


  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('relative group block outline-none', className)}
      onMouseMove={tiltDisabled ? undefined : onMouseMove}
      onMouseLeave={tiltDisabled ? undefined : onMouseLeave}
      style={
        tiltDisabled
          ? undefined
          : {
              perspective: style.perspective,
              transformStyle: 'preserve-3d',
            }
      }
    >
      <motion.div
        className="glass-card p-6 h-full flex flex-col"
        style={tiltDisabled ? undefined : style}
      >
        {/* Title – depth layer 1 */}
        <h3
          className="text-h3 font-semibold mb-3 text-[var(--color-on-background)]"
          style={tiltDisabled ? undefined : { transform: 'translateZ(30px)' }}
        >
          {title}
        </h3>

        {/* Description – depth layer 2 */}
        <p
          className="text-sm text-[var(--color-on-background)]/60 mb-6 flex-1"
          style={tiltDisabled ? undefined : { transform: 'translateZ(20px)' }}
        >
          {description}
        </p>

        {/* Tags */}
        <div
          className="flex flex-wrap gap-2 mb-4"
          style={tiltDisabled ? undefined : { transform: 'translateZ(10px)' }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono text-[var(--color-primary-light)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* External link icon */}
        <ExternalLink
          className="h-5 w-5 text-[var(--color-on-background)]/40 group-hover:text-[var(--color-primary-light)] transition-colors self-end"
          style={tiltDisabled ? undefined : { transform: 'translateZ(20px)' }}
        />
      </motion.div>

      {/* Glare overlay – cursor‑driven radial gradient */}
      {!tiltDisabled && (
        <div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none z-20"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.12) 0%, transparent 60%)',
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </motion.a>
  );
}