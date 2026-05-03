// src/components/portfolio/ProjectCard.tsx
// Glassmorphic project card — refined to match reference design

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Project } from '@/types/api';

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
        'group relative rounded-xl overflow-hidden',
        'bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/40',
        'transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-surface-container)]',
        'flex flex-col h-full',
        className
      )}
    >
      {/* Thumbnail: 16:9 aspect ratio */}
      <div className="relative aspect-video overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-container)]">
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] opacity-10" />
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-container-low)] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech_tags?.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1.5 rounded-sm text-xs font-bold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-[var(--color-on-surface)] mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-on-surface-variant)] opacity-70 mb-8 line-clamp-3 leading-relaxed flex-grow">
          {description}
        </p>

        <Link
          href={`/portfolio/${slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-primary)] opacity-80 hover:opacity-100 transition-opacity group/link"
        >
          READ CASE STUDY
          <span className="text-xs translate-y-[-1px]">→</span>
        </Link>
      </div>
    </article>
  );
}

