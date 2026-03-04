import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowUpRight, Github, Calendar, User, Clock, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "../data";
import { ProjectCard } from "../components/ProjectCard";

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#081A04" }}>
        <p style={{ color: "#9199A5" }}>Project not found.</p>
        <Link to="/projects" className="mt-4 text-sm" style={{ color: "#A4FBCC", textDecoration: "none" }}>
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const related = PROJECTS
    .filter((p) => p.id !== project.id && (p.category === project.category || p.tags.some((t) => project.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200"
          style={{ color: "#9199A5", textDecoration: "none" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span
            className="text-xs px-2 py-1 rounded mb-4 inline-block"
            style={{
              background: "rgba(164, 251, 204, 0.08)",
              color: "#A4FBCC",
              border: "1px solid rgba(164, 251, 204, 0.2)",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {project.category}
          </span>
          <h1
            className="mb-3"
            style={{
              color: "#F2F2F2",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h1>
          <p className="text-lg mb-6" style={{ color: "#9199A5" }}>
            {project.tagline}
          </p>

          {/* Metadata strip */}
          <div
            className="flex flex-wrap gap-6 py-4 px-5 rounded-xl"
            style={{
              background: "#1B3022",
              border: "1px solid rgba(164, 251, 204, 0.1)",
            }}
          >
            {[
              { icon: <User size={14} />, label: "Role", value: project.role },
              { icon: <Clock size={14} />, label: "Timeline", value: project.timeline },
              { icon: <Calendar size={14} />, label: "Year", value: String(project.year) },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span style={{ color: "#9199A5" }}>{item.icon}</span>
                <span className="text-xs" style={{ color: "#9199A5" }}>{item.label}:</span>
                <span className="text-xs" style={{ color: "#F2F2F2", fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-10" style={{ height: "360px" }}>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.8) saturate(0.85)" }}
          />
        </div>

        {/* Tech Stack */}
        <div className="mb-10">
          <h3 className="mb-3" style={{ color: "#F2F2F2", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Space Mono', monospace" }}>
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-8">
          {[
            { heading: "Overview", content: project.overview },
            { heading: "The Challenge", content: project.challenge },
            { heading: "Solution & Architecture", content: project.solution },
          ].map((section) => (
            <div key={section.heading}>
              <h2
                className="mb-3"
                style={{
                  color: "#F2F2F2",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderLeft: "3px solid #A4FBCC",
                  paddingLeft: "12px",
                }}
              >
                {section.heading}
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: "#9199A5" }}
              >
                {section.content}
              </p>
            </div>
          ))}

          {/* Key Features / Results */}
          <div>
            <h2
              className="mb-4"
              style={{
                color: "#F2F2F2",
                fontSize: "1.1rem",
                fontWeight: 600,
                borderLeft: "3px solid #A4FBCC",
                paddingLeft: "12px",
              }}
            >
              Results / Impact
            </h2>
            <ul className="flex flex-col gap-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: "#A4FBCC" }} />
                  <span className="text-sm" style={{ color: "#9199A5" }}>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-wrap gap-3 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(164, 251, 204, 0.08)" }}
        >
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={{
                background: "#A4FBCC",
                color: "#081A04",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              View Live Demo <ArrowUpRight size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
              style={{
                border: "1px solid rgba(164, 251, 204, 0.3)",
                color: "#A4FBCC",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.06)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <Github size={14} /> Source Code
            </a>
          )}
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6" style={{ color: "#F2F2F2", fontSize: "1.2rem", fontWeight: 700 }}>
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
  );
}
