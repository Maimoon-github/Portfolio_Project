import { Link } from "react-router";
import { BookOpen, Wrench, ChevronRight } from "lucide-react";
import { useKnowledge } from "../hooks/useKnowledge";
import { CourseCard } from "../components/CourseCard";

export function Knowledge() {
  const knowledge = useKnowledge();
  return (
    <div className="min-h-screen" style={{ background: "#081A04" }}>
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

        {/* Category Tiles - adapt counts from fetched data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {knowledge.data && (
            [
              {
                icon: <BookOpen size={24} style={{ color: "#A4FBCC" }} />,
                title: "Courses",
                description: "Structured, hands-on courses pulled from the Django API.",
                count: `${knowledge.data.courses.length} courses`,
                anchor: "/courses",
              },
              {
                icon: <Wrench size={24} style={{ color: "#A4FBCC" }} />,
                title: "Tools",
                description: "Calculators and frameworks surfaced from the backend.",
                count: `${knowledge.data.tools.length} tools`,
                anchor: "/tools",
              }
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
            ))
          )}
        </div>

        {/* explanatory links to dedicated pages */}
        <section id="courses" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={18} style={{ color: "#A4FBCC" }} />
            <h2 style={{ color: "#F2F2F2", fontSize: "1.3rem", fontWeight: 700 }}>Courses</h2>
          </div>
          {knowledge.loading && <p style={{ color: "#9199A5" }}>Loading courses…</p>}
          {knowledge.error && <p style={{ color: "#E55353" }}>Unable to fetch courses.</p>}
          {knowledge.data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {knowledge.data.courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link to="/courses" className="text-sm text-[#A4FBCC] underline">
              View all courses →
            </Link>
          </div>
        </section>

        <section id="tools" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Wrench size={18} style={{ color: "#A4FBCC" }} />
            <h2 style={{ color: "#F2F2F2", fontSize: "1.3rem", fontWeight: 700 }}>Tools</h2>
          </div>
          <div className="text-sm mb-8" style={{ color: "#9199A5" }}>
            Browse or open the calculator hub for interactive tools.
          </div>
          <div className="mt-4 text-center">
            <Link to="/tools" className="text-sm text-[#A4FBCC] underline">
              Go to Tool Hub →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
