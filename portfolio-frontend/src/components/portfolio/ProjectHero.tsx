import type { Project } from "@/types/api";
import Image from "next/image";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="section pb-0 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            {project.thumbnail && (
              <div className="project-image-container rounded-3xl overflow-hidden border border-[rgba(84,68,52,0.15)]">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={1200}
                  height={630}
                  className="w-full aspect-video object-cover"
                  priority
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="glass rounded-3xl p-8">
              {project.category && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="chip">{project.category}</span>
                </div>
              )}
              <h1 className="display-lg tracking-tighter leading-none mb-6">
                {project.title}
              </h1>
              <p className="text-2xl text-on-surface-variant mb-8">
                {project.role || project.description}
              </p>

              <div className="flex items-center justify-between text-sm label-md border-t border-[rgba(84,68,52,0.15)] pt-6">
                <div>
                  <span className="text-secondary">Duration</span>
                  <div className="text-on-surface">{project.duration ?? "—"}</div>
                </div>
                <div className="flex gap-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2 px-6 py-3"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center gap-2 px-6 py-3"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}