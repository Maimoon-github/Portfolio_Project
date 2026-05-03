// src/components/portfolio/ProjectCard.tsx
// Glassmorphic project card — follows DESIGN.MD elevation rules

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
  } = project;

  return (
    <article
      className={cn(
        'relative group rounded-[var(--radius-xl)] overflow-hidden',
        'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)]',
        'transition-all duration-[220ms] ease-[var(--ease-out-expo)]',
        'hover:scale-[1.02] hover:shadow-[var(--shadow-glow-md)]',
        className
      )}
    >
      {/* Gradient border overlay */}
      <span
        className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
        style={{
          background: 'linear-gradient(135deg, rgba(139,101,191,0.60) 0%, transparent 100%)',
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {/* Thumbnail: 16:10 aspect ratio */}
      <div className="relative aspect-[16/10] bg-[var(--color-surface-container-high)] overflow-hidden rounded-t-[var(--radius-xl)]">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[400ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-container)]">
             <div className="w-12 h-12 rounded-full bg-[var(--color-primary-container)] opacity-20" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-[var(--type-h3-size)] font-medium text-[var(--color-on-surface)] mb-3">
          {title}
        </h3>
        <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-variant)] mb-6 line-clamp-2">
          {description}
        </p>

        {/* Tech stack: Specific chip styling from DESIGN.MD */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech_tags?.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/portfolio/${slug}`}
          className="text-[var(--color-primary)] hover:underline type-label-caps text-[11px] inline-flex items-center gap-1 focus-ring"
        >
          Read Case Study
          <span className="text-sm">→</span>
        </Link>
      </div>
    </article>
  );
}