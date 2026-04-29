import type { Project } from "@/types/api";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const slug = project.slug ?? String(project.id ?? "");

  return (
    <Link href={`/portfolio/${slug}`} className="group block">
      <div className="card h-full flex flex-col overflow-hidden">
        <div className="project-image-container aspect-video relative bg-surface-container-high">
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute top-4 right-4 flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip flex items-center gap-1 text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip flex items-center gap-1 text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="headline-lg line-clamp-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-3 text-on-surface-variant line-clamp-3 flex-1">
            {project.description}
          </p>

          <div className="mt-auto pt-6 flex flex-wrap gap-2">
            {project.techTags?.map((tag: string, i: number) => (
              <span key={i} className="chip text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}