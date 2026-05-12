// src/components/ui/ProjectCard.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useCardTilt } from '@/hooks/use-card-tilt';
import { ExternalLink, Code } from 'lucide-react';
import type { ProjectTechnology } from '@/types/project';

export interface ProjectCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  technologies: ProjectTechnology[];
  featured?: boolean;
  className?: string;
  demoUrl?: string;
  githubUrl?: string;
  onClick?: () => void;
}

/**
 * A glass‑morphism card component with 3D tilt effect for displaying project summaries.
 * Features:
 * - Interactive 3D tilt based on cursor position (disabled for reduced motion)
 * - Glass‑morphism styling using TLS `glass-card` utilities
 * - Technology tag display with responsive wrapping
 * - Optional external links for live demo and source code
 * - Optional onClick handler for parent‑controlled interactions
 */
export function ProjectCard({
  id,
  slug,
  title,
  shortDescription,
  technologies,
  featured = false,
  className,
  demoUrl,
  githubUrl,
  onClick,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const tiltDisabled = prefersReducedMotion ?? false;

  const { style, onMouseMove, onMouseLeave } = useCardTilt<HTMLAnchorElement>({
    maxTilt: 8,
    perspective: 800,
  });

  const href = `/projects/${slug}`;
  const hasExternalLinks = demoUrl || githubUrl;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={cn(
        'relative group block outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
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
        className="glass-card p-6 h-full flex flex-col transition-all duration-300 hover:shadow-[0_0_15px_var(--color-accent-muted)]"
        style={tiltDisabled ? undefined : style}
      >
        {/* Header: Title + Featured Badge */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3
            className="text-h3 font-semibold text-[var(--color-on-background)] group-hover:text-[var(--color-primary-light)] transition-colors"
            style={tiltDisabled ? undefined : { transform: 'translateZ(30px)' }}
          >
            {title}
          </h3>
          {featured && (
            <span
              className="px-2 py-0.5 text-[10px] font-mono font-medium bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full"
              style={tiltDisabled ? undefined : { transform: 'translateZ(30px)' }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className="text-sm text-[var(--color-on-background)]/70 mb-6 flex-1 leading-relaxed"
          style={tiltDisabled ? undefined : { transform: 'translateZ(20px)' }}
        >
          {shortDescription}
        </p>

        {/* Technology Tags */}
        <div
          className="flex flex-wrap gap-2 mb-6"
          style={tiltDisabled ? undefined : { transform: 'translateZ(10px)' }}
        >
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech.name}
              className="px-2 py-1 text-[10px] font-mono text-[var(--color-primary-light)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-sm"
            >
              {tech.name}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 py-1 text-[10px] font-mono text-[var(--color-outline)]">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Row: External Links or View Details */}
        <div
          className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--color-outline-variant)]/20"
          style={tiltDisabled ? undefined : { transform: 'translateZ(15px)' }}
        >
          <div className="flex gap-4">
            {demoUrl && demoUrl !== '#' && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:text-[var(--color-primary-light)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </a>
            )}
            {githubUrl && githubUrl !== '#' && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--color-on-background)]/60 hover:text-[var(--color-primary-light)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Code className="w-3.5 h-3.5" />
                Source
              </a>
            )}
          </div>

          {!hasExternalLinks && (
            <span className="text-xs text-[var(--color-on-background)]/40">
              Click to view case study
            </span>
          )}
        </div>
      </motion.div>

      {/* Glare Overlay for enhanced depth - only active when tilt enabled */}
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