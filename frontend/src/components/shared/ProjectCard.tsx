'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Project } from "@/app/types/api";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onClick?: () => void;
}

export function ProjectCard({ project, featured = false, onClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageHeight = featured ? "h-[220px]" : "h-[180px]";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card group relative rounded-xl overflow-hidden flex flex-col transition-all duration-350 hover:-translate-y-1"
    >
      <div className={`relative overflow-hidden flex-shrink-0 ${imageHeight}`}>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-all duration-700 brightness-75 group-hover:brightness-90 scale-100 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-container-low to-transparent" />
        <div className="absolute top-3 right-3 text-xs z-10 font-mono glass px-2 py-0.5 rounded-md text-outline">
          {project.year}
        </div>
      </div>

      <div className="relative flex flex-col gap-3 p-5 flex-1">
        {onClick ? (
          <h3 className="leading-snug cursor-pointer text-base font-semibold transition-colors duration-200 text-on-background group-hover:text-accent" onClick={onClick}>
            {project.title}
          </h3>
        ) : (
          <Link href={`/projects/${project.slug}`} className="no-underline">
            <h3 className="leading-snug cursor-pointer text-base font-semibold transition-colors duration-200 text-on-background group-hover:text-accent">
              {project.title}
            </h3>
          </Link>
        )}

        <p className="text-sm leading-relaxed flex-1 text-outline">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">{tag}</span>
          ))}
          {project.tags.length > 4 && <span className="text-xs self-center text-outline font-mono">+{project.tags.length - 4}</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-glass-border">
          {onClick ? (
            <button className="text-sm flex items-center gap-1.5 text-accent bg-transparent border-none p-0 cursor-pointer transition-all group-hover:gap-2" onClick={onClick}>
              Case Study <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ) : (
            <Link href={`/projects/${project.slug}`} className="text-sm flex items-center gap-1.5 text-accent no-underline transition-all group-hover:gap-2">
              Case Study <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}

          <div className="flex items-center gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-on-background transition-colors">
                <Github size={15} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-on-background transition-colors">
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}