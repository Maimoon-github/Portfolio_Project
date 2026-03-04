import { Link } from "react-router";
import { BookOpen, Wrench, ChevronRight, PlayCircle, Star } from "lucide-react";
import { COURSES, TOOLS } from "../data";

export function Knowledge() {
  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#081A04" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
          >
            Resources
          </span>
          <h1
            className="mt-2 mb-3"
            style={{ color: "#F2F2F2", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Knowledge Base
          </h1>
          <p className="max-w-2xl" style={{ color: "#9199A5" }}>
            Long-form resources to level up your AI and MLOps skills — structured courses, curated tools, and my personal stack recommendations.
          </p>
        </div>

        {/* Category Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {[
            {
              icon: <BookOpen size={24} style={{ color: "#A4FBCC" }} />,
              title: "Courses",
              description: "Structured, hands-on courses covering agentic AI systems and MLOps from first principles to production.",
              count: `${COURSES.length} courses`,
              anchor: "#courses",
            },
            {
              icon: <Wrench size={24} style={{ color: "#A4FBCC" }} />,
              title: "Tools & Resources",
              description: "Curated, opinionated reviews of the tools I use in production — with honest trade-offs.",
              count: `${TOOLS.reduce((acc, t) => acc + t.items.length, 0)} tools`,
              anchor: "#tools",
            },
          ].map((tile) => (
            <a
              key={tile.title}
              href={tile.anchor}
              className="card-hover flex items-start gap-4 p-6 rounded-xl"
              style={{
                background: "#1B3022",
                border: "1px solid rgba(164, 251, 204, 0.12)",
                textDecoration: "none",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(164, 251, 204, 0.1)", border: "1px solid rgba(164, 251, 204, 0.2)" }}
              >
                {tile.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 style={{ color: "#F2F2F2", fontSize: "1.1rem", fontWeight: 700 }}>{tile.title}</h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: "rgba(164, 251, 204, 0.08)", color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
                  >
                    {tile.count}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#9199A5" }}>{tile.description}</p>
              </div>
              <ChevronRight size={16} className="ml-auto flex-shrink-0 mt-1" style={{ color: "#9199A5" }} />
            </a>
          ))}
        </div>

        {/* ── Courses ──────────────────────────────────────────── */}
        <section id="courses" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={18} style={{ color: "#A4FBCC" }} />
            <h2 style={{ color: "#F2F2F2", fontSize: "1.3rem", fontWeight: 700 }}>Courses</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="card-hover rounded-xl overflow-hidden"
                style={{ background: "#1B3022", border: "1px solid rgba(164, 251, 204, 0.1)" }}
              >
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(164, 251, 204, 0.08)",
                        color: "#A4FBCC",
                        border: "1px solid rgba(164, 251, 204, 0.2)",
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {course.level}
                    </span>
                    <span className="text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
                      {course.lessons} lessons · {course.duration}
                    </span>
                  </div>

                  <h3 className="mb-2" style={{ color: "#F2F2F2", fontSize: "1rem", fontWeight: 700 }}>
                    {course.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#9199A5" }}>
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>

                  {/* Topics preview */}
                  <div
                    className="rounded-lg p-3 mb-4"
                    style={{ background: "rgba(8, 26, 4, 0.5)", border: "1px solid rgba(164, 251, 204, 0.06)" }}
                  >
                    <p className="text-xs mb-2 uppercase tracking-widest" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
                      Syllabus
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {course.topics.slice(0, 5).map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs" style={{ color: "#9199A5" }}>
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                            style={{
                              background: "rgba(164, 251, 204, 0.1)",
                              color: "#A4FBCC",
                              fontSize: "9px",
                              fontFamily: "'Space Mono', monospace",
                            }}
                          >
                            {i + 1}
                          </span>
                          {topic}
                        </li>
                      ))}
                      {course.topics.length > 5 && (
                        <li className="text-xs pl-6" style={{ color: "#9199A5" }}>
                          + {course.topics.length - 5} more lessons
                        </li>
                      )}
                    </ul>
                  </div>

                  <button
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg w-full justify-center transition-all duration-200"
                    style={{
                      background: "rgba(164, 251, 204, 0.1)",
                      border: "1px solid rgba(164, 251, 204, 0.25)",
                      color: "#A4FBCC",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.15)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.1)")}
                  >
                    <PlayCircle size={15} /> Start Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tools ────────────────────────────────────────────── */}
        <section id="tools">
          <div className="flex items-center gap-3 mb-8">
            <Wrench size={18} style={{ color: "#A4FBCC" }} />
            <h2 style={{ color: "#F2F2F2", fontSize: "1.3rem", fontWeight: 700 }}>Tools & Resources</h2>
          </div>

          <div className="flex flex-col gap-10">
            {TOOLS.map((group) => (
              <div key={group.category}>
                <h3
                  className="mb-4 text-xs uppercase tracking-widest"
                  style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}
                >
                  {group.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {group.items.map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-hover flex flex-col gap-3 p-4 rounded-xl"
                      style={{
                        background: "#1B3022",
                        border: "1px solid rgba(164, 251, 204, 0.1)",
                        textDecoration: "none",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 style={{ color: "#F2F2F2", fontSize: "0.95rem", fontWeight: 600 }}>{tool.name}</h4>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              style={{
                                color: i < tool.rating ? "#A4FBCC" : "rgba(164, 251, 204, 0.2)",
                                fill: i < tool.rating ? "#A4FBCC" : "transparent",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "#9199A5" }}>
                        {tool.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
