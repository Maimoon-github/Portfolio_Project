'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProjectCard } from '@/app/components/shared/ProjectCard';
import { PopupModal } from '@/app/components/shared/PopupModal';
import type { Project } from '@/app/types/api';

const CATEGORIES = ['All', 'AI/ML', 'MLOps', 'Frontend'];

interface ProjectsGridProps {
  projects: Project[];
  activeCategory: string;
}

export function ProjectsGrid({ projects, activeCategory }: ProjectsGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== 'All') params.set('category', cat);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`relative text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#A4FBCC] text-[#0A2E1A] font-semibold shadow-[0_0_12px_rgba(164,251,204,0.3)]'
                  : 'bg-[rgba(164,251,204,0.06)] text-[#B0C4B0] border border-[rgba(164,251,204,0.15)] hover:border-[rgba(164,251,204,0.35)] hover:text-[#A4FBCC]'
              }`}
            >
              {cat}
            </button>
          );
        })}

        {/* Count badge */}
        <span className="text-xs ml-1 px-2 py-0.5 rounded-full text-[#B0C4B0] font-mono bg-[rgba(164,251,204,0.05)] border border-[rgba(164,251,204,0.1)]">
          {projects.length} project{projects.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[#B0C4B0]">No projects in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedSlug(project.slug)}
            />
          ))}
        </div>
      )}

      {/* Project Modal Preview */}
      <PopupModal open={!!selectedSlug} onClose={() => setSelectedSlug(null)}>
        {selectedSlug && <ProjectPreview slug={selectedSlug} onClose={() => setSelectedSlug(null)} />}
      </PopupModal>
    </>
  );
}

// Client component to fetch and display project details inside modal
function ProjectPreview({ slug, onClose }: { slug: string; onClose: () => void }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/projects/${slug}`) // adjust to your actual API endpoint
      .then((res) => res.json())
      .then(setProject)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-4">
        <div className="w-8 h-8 border-2 border-[#A4FBCC] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#B0C4B0] text-sm">Loading project…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-400">Failed to load project details.</p>
        <button onClick={onClose} className="mt-4 text-sm text-[#A4FBCC]">Close</button>
      </div>
    );
  }

  return (
    <div>
      {project.image && (
        <div className="overflow-hidden rounded-t-2xl h-56">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-75" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2 py-0.5 rounded-md bg-[rgba(164,251,204,0.1)] text-[#A4FBCC] border border-[rgba(164,251,204,0.22)] font-mono">
            {project.category}
          </span>
          <span className="text-xs text-[#B0C4B0] font-mono">{project.year}</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-sm text-[#A4FBCC] italic border-l-2 border-[rgba(164,251,204,0.35)] pl-3 mb-4">
          {project.tagline}
        </p>
        <p className="text-sm text-[#B0C4B0] leading-relaxed mb-5">
          {project.overview || project.description || project.solution || project.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags?.slice(0, 6).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[rgba(164,251,204,0.08)] text-[#A4FBCC]">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-4 border-t border-[rgba(164,251,204,0.08)]">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#A4FBCC] text-[#0A2E1A] hover:opacity-85 transition">
              Live Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-[rgba(164,251,204,0.3)] text-[#A4FBCC] hover:bg-[rgba(164,251,204,0.07)] transition">
              Source Code
            </a>
          )}
          <a href={`/projects/${project.slug}`} className="ml-auto text-sm text-[#B0C4B0] hover:text-white transition">
            Full case study →
          </a>
        </div>
      </div>
    </div>
  );
}