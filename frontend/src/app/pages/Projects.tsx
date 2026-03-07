import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Loader2 } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { PopupModal } from "../components/PopupModal";
import { useProjects, useProject } from "../hooks/useProjects";

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "AI/ML", "MLOps", "Frontend"];

// ─── Styles (injected once) ────────────────────────────────────────────────────
const PAGE_STYLES = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .projects-fade-up {
    opacity: 0;
    animation: fadeInUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .skeleton-shimmer {
    background: linear-gradient(
      90deg,
      #1B3022 25%,
      #223d28 50%,
      #1B3022 75%
    );
    background-size: 600px 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 6px;
  }
  .filter-btn-active-dot {
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 2px;
    background: #081A04;
    border-radius: 2px;
  }
`;

// ─── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "#1B3022",
        border: "1px solid rgba(164, 251, 204, 0.08)",
      }}
    >
      <div className="skeleton-shimmer" style={{ height: "180px" }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="skeleton-shimmer" style={{ height: "14px", width: "70%" }} />
        <div className="skeleton-shimmer" style={{ height: "11px", width: "100%" }} />
        <div className="skeleton-shimmer" style={{ height: "11px", width: "60%" }} />
        <div className="flex gap-2 mt-1">
          {[40, 55, 48].map((w, i) => (
            <div key={i} className="skeleton-shimmer" style={{ height: "20px", width: `${w}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Modal body for a selected project ────────────────────────────────────────
interface ModalContentProps {
  id: string;
  onClose: () => void;
}

function ProjectModalContent({ id, onClose }: ModalContentProps) {
  const { project, loading } = useProject(id);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-4">
        <Loader2
          size={28}
          className="animate-spin"
          style={{ color: "#A4FBCC" }}
        />
        <p style={{ color: "#9199A5", fontSize: "0.85rem" }}>Loading project…</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-3">
        <p style={{ color: "#9199A5" }}>Project details unavailable.</p>
        <button
          onClick={onClose}
          className="text-sm"
          style={{ color: "#A4FBCC", background: "none", border: "none", cursor: "pointer" }}
        >
          Close
        </button>
      </div>
    );
  }

  // Derive display description — cascade through richest to simplest field
  const body =
    project.overview ||
    project.description ||
    project.solution ||
    project.tagline ||
    null;

  return (
    <div>
      {/* Hero image */}
      {project.image && (
        <div className="overflow-hidden rounded-t-2xl" style={{ height: "220px" }}>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.78) saturate(0.88)" }}
          />
        </div>
      )}

      {/* Body */}
      <div className="p-6 pt-5">
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(164,251,204,0.1)",
              color: "#A4FBCC",
              border: "1px solid rgba(164,251,204,0.22)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {project.category}
          </span>
          <span
            className="text-xs"
            style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h2
          className="mb-2 leading-tight"
          style={{ color: "#F2F2F2", fontSize: "1.45rem", fontWeight: 700 }}
        >
          {project.title}
        </h2>

        {/* Tagline */}
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{
            color: "#A4FBCC",
            opacity: 0.85,
            fontStyle: "italic",
            borderLeft: "2px solid rgba(164,251,204,0.35)",
            paddingLeft: "10px",
          }}
        >
          {project.tagline}
        </p>

        {/* Overview / Description */}
        {body && (
          <p
            className="text-sm leading-relaxed mb-5"
            style={{ color: "#9199A5" }}
          >
            {body}
          </p>
        )}

        {/* Challenge */}
        {project.challenge && (
          <div className="mb-5">
            <h4
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "#F2F2F2", fontFamily: "'Space Mono', monospace" }}
            >
              The Challenge
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "#9199A5" }}>
              {project.challenge}
            </p>
          </div>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <div className="mb-5">
            <h4
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "#F2F2F2", fontFamily: "'Space Mono', monospace" }}
            >
              Impact
            </h4>
            <ul className="flex flex-col gap-2">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#9199A5" }}>
                  <span style={{ color: "#A4FBCC", marginTop: "2px", flexShrink: 0 }}>✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag" style={{ fontSize: "0.7rem" }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action links */}
        {(project.demo || project.github) && (
          <div
            className="flex flex-wrap gap-3 pt-4"
            style={{ borderTop: "1px solid rgba(164,251,204,0.08)" }}
          >
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
                style={{
                  background: "#A4FBCC",
                  color: "#081A04",
                  textDecoration: "none",
                }}
              >
                Live Demo <ExternalLink size={13} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  border: "1px solid rgba(164,251,204,0.3)",
                  color: "#A4FBCC",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(164,251,204,0.07)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <Github size={13} /> Source Code
              </a>
            )}
            {/* Full detail page link */}
            <a
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-1.5 text-sm ml-auto"
              style={{ color: "#9199A5", textDecoration: "none", alignSelf: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F2F2F2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9199A5")}
            >
              Full case study <ArrowUpRight size={12} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export function Projects() {
  const [active, setActive] = useState("All");
  const { projects, loading } = useProjects(
    active === "All" ? undefined : active
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      <style>{PAGE_STYLES}</style>

      <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* ── Page Header ── */}
          <div className="mb-12 projects-fade-up" style={{ animationDelay: "0ms" }}>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
            >
              Portfolio
            </span>
            <h1
              className="mt-2 mb-3"
              style={{
                color: "#F2F2F2",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Projects
            </h1>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: "#9199A5" }}>
              A selection of my work in agentic AI systems, MLOps infrastructure,
              data engineering, and full‑stack AI applications.
            </p>
          </div>

          {/* ── Filter Bar ── */}
          <div
            className="flex flex-wrap items-center gap-2 mb-10 projects-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className="relative text-sm px-4 py-2 rounded-lg"
                  style={{
                    background: isActive ? "#A4FBCC" : "rgba(164,251,204,0.06)",
                    color: isActive ? "#081A04" : "#9199A5",
                    border: isActive ? "none" : "1px solid rgba(164,251,204,0.15)",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                  {isActive && <span className="filter-btn-active-dot" />}
                </button>
              );
            })}

            {/* Count badge */}
            {!loading && (
              <span
                className="text-xs ml-1 px-2 py-0.5 rounded-full"
                style={{
                  color: "#9199A5",
                  fontFamily: "'Space Mono', monospace",
                  background: "rgba(164,251,204,0.05)",
                  border: "1px solid rgba(164,251,204,0.1)",
                }}
              >
                {projects.length} project{projects.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* ── Grid ── */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-24">
              <p style={{ color: "#9199A5", fontSize: "0.9rem" }}>
                No projects in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="projects-fade-up"
                  style={{ animationDelay: `${120 + idx * 70}ms` }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedId(project.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      <PopupModal
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
      >
        {selectedId && (
          <ProjectModalContent
            id={selectedId}
            onClose={() => setSelectedId(null)}
          />
        )}
      </PopupModal>
    </>
  );
}