import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { PopupModal } from "../components/PopupModal";
import { useProjects, useProject } from "../hooks/useProjects";
import { Project } from "../types/api";

const CATEGORIES = ["All", "AI/ML", "MLOps", "Frontend"];

export function Projects() {
  const [active, setActive] = useState("All");
  const { projects, loading: projectsLoading } = useProjects(active === "All" ? undefined : active);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { project: selectedProject, loading: detailLoading } = useProject(selectedId || "");

  const filtered = projects;

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
          >
            Portfolio
          </span>
          <h1
            className="mt-2 mb-3"
            style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Projects
          </h1>
          <p className="max-w-xl" style={{ color: "#9199A5" }}>
            A selection of my work in agentic AI systems, MLOps infrastructure, data engineering, and full-stack AI applications.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="text-sm px-4 py-2 rounded-lg transition-all duration-200"
              style={{
                background: active === cat ? "#A4FBCC" : "rgba(164, 251, 204, 0.06)",
                color: active === cat ? "#081A04" : "#9199A5",
                border: active === cat ? "none" : "1px solid rgba(164, 251, 204, 0.15)",
                fontWeight: active === cat ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
          <span
            className="text-xs self-center ml-2"
            style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
          >
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedId(project.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && !projectsLoading && (
          <div className="text-center py-20">
            <p style={{ color: "#9199A5" }}>No projects in this category yet.</p>
          </div>
        )}

        {/* popup detail */}
        {selectedProject && (
          <PopupModal open={!!selectedProject} onClose={() => setSelectedId(null)}>
            <h2 style={{ color: "#F2F2F2", fontSize: "1.5rem", fontWeight: 700 }}>
              {selectedProject.title}
            </h2>
            <p className="mt-4" style={{ color: "#9199A5" }}>
              {selectedProject.overview || selectedProject.description}
            </p>
            {/* further fields could be displayed as needed */}
          </PopupModal>
        )}
      </div>
    </div>
  );
}
