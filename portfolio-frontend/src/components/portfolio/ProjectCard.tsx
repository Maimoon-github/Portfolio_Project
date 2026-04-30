// src/components/portfolio/ProjectCard.tsx
// Glassmorphic project card — follows DESIGN.MD elevation rules:
//   • 1px gradient border (top-left #8B65BF → transparent)
//   • Glow elevation on hover
//   • 1.02x scale interaction state

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/api/portfolio';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const {
    slug,
    title,
    description,
    thumbnail,
    tech_tags,
    live_url,
  } = project;

  return (
    <article
      className={cn(
        // Glassmorphism base
        'relative group rounded-[var(--radius-xl)] overflow-hidden',
        'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]',
        // Gradient border via outline ring trick
        'ring-1 ring-[var(--color-outline-variant)]',
        // Hover elevation
        'transition-all duration-[220ms] ease-[var(--ease-out-expo)]',
        'hover:scale-[1.02] hover:shadow-[var(--shadow-glow-md)] hover:ring-[var(--color-primary-container)]',
        className
      )}
    >
      {/* Gradient border overlay (top-left light source) */}
      <span
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
        style={{
          background:
            'linear-gradient(135deg, rgba(139,101,191,0.50) 0%, transparent 55%)',
          maskImage:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-[var(--color-surface-container-high)] overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              'object-cover',
              'transition-transform duration-[400ms] ease-[var(--ease-out-expo)]',
              'group-hover:scale-105'
            )}
          />
        ) : (
          // Placeholder when no image is available
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span
              className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-primary-container)]/30"
              style={{ boxShadow: 'var(--shadow-glow-md)' }}
            />
          </div>
        )}
        {/* Image gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-container-lowest)] to-transparent opacity-60"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-[var(--color-on-surface)] font-semibold text-[18px] leading-[1.3] mb-2 tracking-[-0.01em]"
        >
          {title}
        </h3>
        <p
          className="text-[var(--color-on-surface-variant)] text-[14px] leading-[1.6] mb-5 line-clamp-2"
        >
          {description}
        </p>

        {/* Tech tags */}
        {tech_tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tech_tags.map((tag) => (
              <span key={tag} className="chip-lotus">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/portfolio/${slug}`}
            className={cn(
              'btn-ghost text-[11px] px-4 py-2',
              'inline-flex items-center gap-1.5'
            )}
          >
            View Project
            <span className="text-base leading-none">→</span>
          </Link>

          {live_url && (
            <a
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-label-caps text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors duration-[120ms]"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}