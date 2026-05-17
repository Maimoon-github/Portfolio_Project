'use client';

import { getProject, getProjects } from '@/services/api';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Tag, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { PROFILE } from '@/app/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const project = await getProject(slug);
    return {
      title: project.title,
      description: project.tagline,
    };
  } catch {
    return { title: 'Project Not Found' };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let project;
  let related: any[] = [];

  try {
    project = await getProject(slug);
    const allProjects = await getProjects();
    related = allProjects.results
      ?.filter((p: any) => p.slug !== slug && (p.category === project.category || p.tags?.some((t: string) => project.tags?.includes(t))))
      .slice(0, 3) || [];
  } catch {
    notFound();
  }

  const metaItems = [
    { icon: <User size={14} />, label: 'Role', value: project.role },
    { icon: <Clock size={14} />, label: 'Timeline', value: project.timeline },
    { icon: <Calendar size={14} />, label: 'Year', value: project.year },
  ].filter(m => m.value);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm mb-10 text-[#B0C4B0] hover:text-[#A4FBCC] transition">
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Title block */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs px-2 py-1 rounded-md bg-[rgba(164,251,204,0.08)] text-[#A4FBCC] border border-[rgba(164,251,204,0.22)] font-mono">
              {project.category}
            </span>
            <span className="text-xs text-[#B0C4B0] font-mono">{project.year}</span>
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white leading-tight mb-3">
            {project.title}
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl text-[#B0C4B0] border-l-3 border-[rgba(164,251,204,0.3)] pl-4">
            {project.tagline}
          </p>
        </div>

        {/* Hero image */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden mb-10 h-80">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover brightness-75 transition-transform duration-700 hover:scale-105" />
          </div>
        )}

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <main className="flex-1 min-w-0 flex flex-col gap-8">
            {project.overview && (
              <section>
                <h2 className="text-lg font-semibold text-white border-l-3 border-[#A4FBCC] pl-3 mb-3">Overview</h2>
                <p className="text-sm text-[#B0C4B0] leading-relaxed">{project.overview}</p>
              </section>
            )}
            {project.challenge && (
              <section>
                <h2 className="text-lg font-semibold text-white border-l-3 border-[#A4FBCC] pl-3 mb-3">The Challenge</h2>
                <p className="text-sm text-[#B0C4B0] leading-relaxed">{project.challenge}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="text-lg font-semibold text-white border-l-3 border-[#A4FBCC] pl-3 mb-3">Solution & Architecture</h2>
                <p className="text-sm text-[#B0C4B0] leading-relaxed">{project.solution}</p>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0 space-y-4">
            <div className="rounded-xl p-5 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
              <h3 className="text-xs uppercase tracking-widest text-[#B0C4B0] font-mono mb-4">Project Info</h3>
              <div className="space-y-3">
                {metaItems.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-[#A4FBCC] mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs text-[#B0C4B0] font-mono">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="rounded-xl p-5 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
                <h3 className="text-xs uppercase tracking-widest text-[#B0C4B0] font-mono flex items-center gap-2 mb-3">
                  <Tag size={12} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[rgba(164,251,204,0.08)] text-[#A4FBCC]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(project.demo || project.github) && (
              <div className="rounded-xl p-5 bg-[#0F2C1A] border border-[rgba(164,251,204,0.12)]">
                <h3 className="text-xs uppercase tracking-widest text-[#B0C4B0] font-mono mb-3">Links</h3>
                <div className="space-y-2">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold bg-[#A4FBCC] text-[#0A2E1A] hover:opacity-85 transition">
                      Live Demo <ExternalLink size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm border border-[rgba(164,251,204,0.3)] text-[#A4FBCC] hover:bg-[rgba(164,251,204,0.07)] transition">
                      <Github size={13} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[rgba(164,251,204,0.08)]">
            <h2 className="text-xl font-bold text-white mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p: any) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}