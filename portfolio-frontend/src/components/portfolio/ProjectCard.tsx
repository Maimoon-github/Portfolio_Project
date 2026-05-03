// src/components/portfolio/ProjectCard.tsx
// Glassmorphic project card — refined to match reference design

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
        'relative group rounded-[12px] overflow-hidden',
        'bg-[#121212] border border-[var(--color-outline-variant)]/20',
        'transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:bg-[#161616]',
        className
      )}
    >
      {/* Thumbnail: 16:10 aspect ratio */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={`${title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
             <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] opacity-10" />
          </div>
        )}
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Tech tags: Uppercase pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech_tags?.map((tag) => (
            <span 
              key={tag} 
              className={cn(
                "px-3 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase",
                "bg-[#1f1a40] text-[var(--color-primary)] border border-[var(--color-primary)]/20"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-[18px] font-semibold text-[var(--color-on-surface)] mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-[14px] text-[var(--color-on-surface-variant)] opacity-70 mb-8 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <Link
          href={`/portfolio/${slug}`}
          className={cn(
            "inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase",
            "text-[var(--color-primary)] opacity-80 hover:opacity-100 transition-opacity"
          )}
        >
          READ CASE STUDY
          <span className="text-[12px] translate-y-[-1px]">→</span>
        </Link>
      </div>
    </article>
  );
}
