import { Link } from "react-router";
import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  image: string;
  category: string;
  tags: string[];
  year: number;
  github?: string;
  demo?: string | null;
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onClick?: () => void; // if provided, card becomes clickable and uses this handler rather than routing
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div
      className="card-hover rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "#1B3022",
        border: "1px solid rgba(164, 251, 204, 0.12)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: featured ? "220px" : "180px" }}>
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ filter: "brightness(0.75) saturate(0.9)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
            (e.currentTarget as HTMLElement).style.filter = "brightness(0.85) saturate(1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLElement).style.filter = "brightness(0.75) saturate(0.9)";
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs px-2 py-1 rounded"
            style={{
              background: "rgba(8, 26, 4, 0.85)",
              color: "#A4FBCC",
              border: "1px solid rgba(164, 251, 204, 0.3)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {onClick ? (
        <h3
          className="transition-colors duration-200 cursor-pointer"
          style={{ color: "#F2F2F2", fontSize: "1rem", fontWeight: 600 }}
          onClick={onClick}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
        >
          {project.title}
        </h3>
      ) : (
        <Link
          to={`/projects/${project.id}`}
          style={{ textDecoration: "none" }}
        >
          <h3
            className="transition-colors duration-200 cursor-pointer"
            style={{ color: "#F2F2F2", fontSize: "1rem", fontWeight: 600 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
          >
            {project.title}
          </h3>
        </Link>
      )}

        <p className="text-sm leading-relaxed flex-1" style={{ color: "#9199A5" }}>
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs" style={{ color: "#9199A5", alignSelf: "center" }}>
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(164, 251, 204, 0.08)" }}
        >
          {onClick ? (
          <button
            className="text-sm flex items-center gap-1 transition-colors duration-200"
            style={{ color: "#A4FBCC", background: "transparent", border: "none", padding: 0 }}
            onClick={onClick}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Case Study <ArrowUpRight size={13} />
          </button>
        ) : (
          <Link
            to={`/projects/${project.id}`}
            className="text-sm flex items-center gap-1 transition-colors duration-200"
            style={{ color: "#A4FBCC", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Case Study <ArrowUpRight size={13} />
          </Link>
        )}
          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Source code"
                className="transition-colors duration-200"
                style={{ color: "#9199A5" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
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
                className="transition-colors duration-200"
                style={{ color: "#9199A5" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F2F2F2")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
