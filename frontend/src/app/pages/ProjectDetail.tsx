import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  ExternalLink,
  Tag,
} from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { getProject, getProjects } from "../services/api";
import { Project } from "../types/api";

// ─── Page styles ───────────────────────────────────────────────────────────────
const DETAIL_STYLES = `
  @keyframes detailFade {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .detail-fade {
    animation: detailFade 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
    opacity: 0;
  }

  /* Subtle diagonal texture on page background */
  .detail-page-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(
      45deg,
      rgba(164,251,204,0.015) 0px,
      rgba(164,251,204,0.015) 1px,
      transparent 1px,
      transparent 9px
    );
    z-index: 0;
  }
  .detail-page-bg > * { position: relative; z-index: 1; }

  /* Glowing left border on section headings */
  .section-heading {
    border-left: 3px solid #A4FBCC;
    padding-left: 12px;
    color: #F2F2F2;
    font-size: 1.05rem;
    font-weight: 600;
  }

  /* Sticky sidebar on lg+ */
  @media (min-width: 1024px) {
    .detail-sidebar {
      position: sticky;
      top: 96px;
      max-height: calc(100vh - 112px);
      overflow-y: auto;
      scrollbar-width: none;
    }
    .detail-sidebar::-webkit-scrollbar { display: none; }
  }
`;

// ─── Loading state ─────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-5"
      style={{ background: "#081A04" }}
    >
      <div
        className="w-14 h-14 rounded-full border-4 border-[#1B3022] animate-spin"
        style={{ borderTopColor: "#A4FBCC" }}
      />
      <p style={{ color: "#9199A5", fontSize: "0.85rem", fontFamily: "'Space Mono', monospace" }}>
        Loading project…
      </p>
    </div>
  );
}

// ─── Not found state ───────────────────────────────────────────────────────────
function NotFoundState() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: "#081A04" }}
    >
      <span style={{ color: "#9199A5", fontSize: "0.9rem" }}>Project not found.</span>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
        style={{
          color: "#A4FBCC",
          textDecoration: "none",
          border: "1px solid rgba(164,251,204,0.25)",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(164,251,204,0.06)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <ArrowLeft size={13} /> Back to Projects
      </Link>
    </div>
  );
}

// ─── Sidebar card ──────────────────────────────────────────────────────────────
interface SidebarProps {
  project: Project;
}

function ProjectSidebar({ project }: SidebarProps) {
  const meta = [
    { icon: <User size={13} />, label: "Role", value: project.role },
    { icon: <Clock size={13} />, label: "Timeline", value: project.timeline },
    { icon: <Calendar size={13} />, label: "Year", value: String(project.year) },
  ].filter((m) => m.value);

  return (
    <aside className="detail-sidebar flex flex-col gap-4">
      {/* Metadata card */}
      <div
        className="rounded-xl p-5 flex flex-col gap-4"
        style={{
          background: "#1B3022",
          border: "1px solid rgba(164,251,204,0.12)",
        }}
      >
        <h3
          className="text-xs uppercase tracking-widest"
          style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
        >
          Project Info
        </h3>
        {meta.map((m) => (
          <div key={m.label} className="flex items-start gap-3">
            <span style={{ color: "#A4FBCC", marginTop: "1px", flexShrink: 0 }}>
              {m.icon}
            </span>
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs"
                style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
              >
                {m.label}
              </span>
              <span className="text-sm" style={{ color: "#F2F2F2", fontWeight: 500 }}>
                {m.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack card */}
      {project.tags && project.tags.length > 0 && (
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "#1B3022",
            border: "1px solid rgba(164,251,204,0.12)",
          }}
        >
          <h3
            className="text-xs uppercase tracking-widest flex items-center gap-2"
            style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
          >
            <Tag size={11} /> Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag" style={{ fontSize: "0.7rem" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA card */}
      {(project.demo || project.github) && (
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "#1B3022",
            border: "1px solid rgba(164,251,204,0.12)",
          }}
        >
          <h3
            className="text-xs uppercase tracking-widest"
            style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}
          >
            Links
          </h3>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-opacity duration-200 hover:opacity-85"
              style={{
                background: "#A4FBCC",
                color: "#081A04",
                textDecoration: "none",
              }}
            >
              View Live Demo <ExternalLink size={13} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm transition-all duration-200"
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
        </div>
      )}
    </aside>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProject(slug)
      .then(setProject)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    getProjects()
      .then((data) => setAllProjects(data.results))
      .catch(console.error);
  }, []);

  if (loading) return <LoadingState />;
  if (!project) return <NotFoundState />;

  const related = allProjects
    .filter(
      (p) =>
        p.id !== project.id &&
        (p.category === project.category ||
          p.tags.some((t) => project.tags.includes(t)))
    )
    .slice(0, 3);

  const contentSections = [
    { heading: "Overview", content: project.overview },
    { heading: "The Challenge", content: project.challenge },
    { heading: "Solution & Architecture", content: project.solution },
  ].filter((s) => s.content);

  return (
    <>
      <style>{DETAIL_STYLES}</style>

      <div
        className="detail-page-bg min-h-screen pt-24 pb-20"
        style={{ background: "#081A04" }}
      >
        <div className="max-w-5xl mx-auto px-6">

          {/* ── Back nav ── */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm mb-10 detail-fade"
            style={{
              color: "#9199A5",
              textDecoration: "none",
              animationDelay: "0ms",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A4FBCC")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9199A5")}
          >
            <ArrowLeft size={13} /> Back to Projects
          </Link>

          {/* ── Page title block ── */}
          <div
            className="mb-8 detail-fade"
            style={{ animationDelay: "60ms" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs px-2 py-1 rounded-md"
                style={{
                  background: "rgba(164,251,204,0.08)",
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

            <h1
              className="mb-3 leading-tight"
              style={{
                color: "#F2F2F2",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.18,
              }}
            >
              {project.title}
            </h1>

            <p
              className="text-lg leading-relaxed max-w-2xl"
              style={{
                color: "#9199A5",
                borderLeft: "3px solid rgba(164,251,204,0.3)",
                paddingLeft: "14px",
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* ── Hero image ── */}
          <div
            className="rounded-2xl overflow-hidden mb-10 group detail-fade"
            style={{ height: "360px", animationDelay: "120ms" }}
          >
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
              style={{
                filter: "brightness(0.78) saturate(0.85)",
                transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLImageElement).style.filter =
                  "brightness(0.88) saturate(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLImageElement).style.filter =
                  "brightness(0.78) saturate(0.85)";
              }}
            />
          </div>

          {/* ── Two-column layout: main + sidebar ── */}
          <div className="flex flex-col lg:flex-row gap-8 detail-fade" style={{ animationDelay: "180ms" }}>

            {/* ── Main content column ── */}
            <main className="flex-1 min-w-0 flex flex-col gap-8">

              {/* Prose sections */}
              {contentSections.map((section, idx) => (
                <section key={section.heading}>
                  <h2 className="section-heading mb-3">{section.heading}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#9199A5" }}>
                    {section.content}
                  </p>
                </section>
              ))}

              {/* Results / Impact */}
              {project.results && project.results.length > 0 && (
                <section>
                  <h2 className="section-heading mb-4">Results & Impact</h2>
                  <ul className="flex flex-col gap-3">
                    {project.results.map((result, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: "#9199A5" }}
                      >
                        <CheckCircle2
                          size={15}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "#A4FBCC" }}
                        />
                        {result}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Mobile-only action buttons (sidebar handles desktop) */}
              {(project.demo || project.github) && (
                <div
                  className="flex flex-wrap gap-3 pt-6 lg:hidden"
                  style={{ borderTop: "1px solid rgba(164,251,204,0.08)" }}
                >
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
                      style={{
                        background: "#A4FBCC",
                        color: "#081A04",
                        textDecoration: "none",
                      }}
                    >
                      Live Demo <ArrowUpRight size={13} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
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
                </div>
              )}
            </main>

            {/* ── Sidebar (hidden on mobile) ── */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ProjectSidebar project={project} />
            </div>
          </div>

          {/* ── Related projects ── */}
          {related.length > 0 && (
            <div
              className="mt-16 pt-10 detail-fade"
              style={{
                borderTop: "1px solid rgba(164,251,204,0.08)",
                animationDelay: "260ms",
              }}
            >
              <h2
                className="mb-6"
                style={{ color: "#F2F2F2", fontSize: "1.15rem", fontWeight: 700 }}
              >
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}