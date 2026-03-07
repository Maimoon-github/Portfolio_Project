import { Link } from "react-router";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Project } from "../types/api";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onClick?: () => void;
}

export function ProjectCard({ project, featured = false, onClick }: ProjectCardProps) {
  const imageHeight = featured ? "220px" : "180px";

  return (
    <div
      className="group relative rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "#1B3022",
        border: "1px solid rgba(164, 251, 204, 0.12)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.42)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(164,251,204,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(164, 251, 204, 0.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* ── Image ── */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: imageHeight }}>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.72) saturate(0.88)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)";
            (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.82) saturate(1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.72) saturate(0.88)";
          }}
        />

        {/* Bottom gradient fade into card surface */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{
            background: "linear-gradient(to top, #1B3022 0%, transparent 100%)",
          }}
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs px-2 py-1 rounded-md"
            style={{
              background: "rgba(8, 26, 4, 0.88)",
              color: "#A4FBCC",
              border: "1px solid rgba(164, 251, 204, 0.28)",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.04em",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Year */}
        <div
          className="absolute top-3 right-3 text-xs"
          style={{
            color: "#9199A5",
            fontFamily: "'Space Mono', monospace",
            background: "rgba(8,26,4,0.7)",
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {project.year}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Title */}
        {onClick ? (
          <h3
            className="leading-snug cursor-pointer"
            style={{
              color: "#F2F2F2",
              fontSize: "1rem",
              fontWeight: 600,
              transition: "color 0.18s ease",
            }}
            onClick={onClick}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A4FBCC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#F2F2F2")}
          >
            {project.title}
          </h3>
        ) : (
          <Link to={`/projects/${project.id}`} style={{ textDecoration: "none" }}>
            <h3
              className="leading-snug cursor-pointer"
              style={{
                color: "#F2F2F2",
                fontSize: "1rem",
                fontWeight: 600,
                transition: "color 0.18s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#A4FBCC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F2F2F2")}
            >
              {project.title}
            </h3>
          </Link>
        )}

        {/* Tagline */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "#9199A5" }}
        >
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="tech-tag"
              style={{ fontSize: "0.7rem" }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              className="text-xs self-center"
              style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* ── Actions ── */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(164, 251, 204, 0.08)" }}
        >
          {/* Primary CTA */}
          {onClick ? (
            <button
              className="text-sm flex items-center gap-1.5 group/cta"
              style={{
                color: "#A4FBCC",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "opacity 0.18s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={onClick}
            >
              Case Study
              <ArrowUpRight
                size={13}
                style={{ transition: "transform 0.18s ease" }}
                className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </button>
          ) : (
            <Link
              to={`/projects/${project.id}`}
              className="text-sm flex items-center gap-1.5 group/cta"
              style={{
                color: "#A4FBCC",
                textDecoration: "none",
                transition: "opacity 0.18s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Case Study
              <ArrowUpRight size={13} />
            </Link>
          )}

          {/* Icon links */}
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Source code on GitHub"
                style={{ color: "#9199A5", transition: "color 0.18s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9199A5")}
              >
                <Github size={15} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                style={{ color: "#9199A5", transition: "color 0.18s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9199A5")}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}