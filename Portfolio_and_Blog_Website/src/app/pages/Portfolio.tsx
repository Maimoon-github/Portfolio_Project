import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ExternalLink, TrendingUp } from "lucide-react";
import { projects, CATEGORIES } from "../data/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory || CATEGORIES.includes(activeCategory));

  const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full -top-20 -right-20 opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}
          >
            Selected Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0e6d3", lineHeight: 1.1, marginBottom: "1.5rem" }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "rgba(240,230,211,0.55)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "38rem" }}
          >
            Production systems at the intersection of massive computational power and human-centric intelligence. Every project ships. Every model serves.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  backgroundColor: activeCategory === cat ? "rgba(255,198,139,0.12)" : "transparent",
                  color: activeCategory === cat ? "#ffc68b" : "rgba(240,230,211,0.5)",
                  border: activeCategory === cat ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(240,230,211,0.08)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16" style={{ backgroundColor: "#131313" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="group rounded-2xl overflow-hidden flex flex-col md:flex-row"
                  style={{ backgroundColor: "#1c1b1b" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden md:w-52 flex-shrink-0 h-52 md:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, #1c1b1b 100%)" }} />
                    {project.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: "rgba(255,198,139,0.15)", color: "#ffc68b", border: "1px solid rgba(255,198,139,0.2)", fontWeight: 600, fontSize: "0.65rem", letterSpacing: "0.06em" }}>
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(126,184,247,0.8)" }}>
                        {project.category}
                      </span>
                      <span style={{ color: "rgba(240,230,211,0.2)" }}>·</span>
                      <span style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.35)" }}>
                        {new Date(project.publishedAt).getFullYear()}
                      </span>
                    </div>

                    <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#f0e6d3", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                      {project.title}
                    </h2>
                    <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "auto" }} className="line-clamp-2">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex gap-4 mt-4 py-3" style={{ borderTop: "1px solid rgba(84,68,52,0.12)" }}>
                        {project.metrics.slice(0, 3).map((m) => (
                          <div key={m.label} className="flex items-center gap-1.5">
                            <TrendingUp size={11} style={{ color: "#ffc68b" }} />
                            <span style={{ fontSize: "0.78rem", color: "#ffc68b", fontWeight: 600 }}>{m.value}</span>
                            <span style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.35)" }}>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech + Links */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-md text-xs" style={{ backgroundColor: "rgba(126,184,247,0.07)", color: "rgba(126,184,247,0.7)", border: "1px solid rgba(126,184,247,0.12)" }}>
                            {t}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-2 py-0.5 rounded-md text-xs" style={{ backgroundColor: "rgba(240,230,211,0.05)", color: "rgba(240,230,211,0.3)" }}>
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "rgba(240,230,211,0.4)" }} className="hover:text-[#ffc68b]! transition-colors">
                            <Github size={16} />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" style={{ color: "rgba(240,230,211,0.4)" }} className="hover:text-[#ffc68b]! transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="py-24" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Career</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em" }}>Experience Timeline</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px" style={{ backgroundColor: "rgba(84,68,52,0.2)" }} />
            <div className="flex flex-col gap-10">
              {[
                { year: "2022–Present", role: "Principal ML Engineer", company: "Anthropic", desc: "Led fine-tuning and RLHF pipelines for Claude 2 and Claude 3 model families. Architected the constitutional AI evaluation harness." },
                { year: "2020–2022", role: "Senior ML Engineer", company: "Cohere", desc: "Built the training infrastructure for multilingual embedding models. Designed the RAG evaluation framework used in production." },
                { year: "2018–2020", role: "ML Engineer", company: "Tesla", desc: "Worked on Autopilot perception stack — object detection, lane segmentation, and sensor fusion across the camera array." },
                { year: "2016–2018", role: "Research Engineer", company: "DeepMind", desc: "Research engineering support for AlphaGo and AlphaZero projects. Implemented distributed MCTS and experience replay systems." },
              ].map((exp, i) => (
                <motion.div
                  key={exp.year}
                  variants={fadeUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#131313", border: "2px solid rgba(255,198,139,0.3)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ffc68b" }} />
                  </div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-1.5">
                    <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#f0e6d3" }}>{exp.role}</h3>
                    <span style={{ color: "#ffc68b", fontWeight: 600, fontSize: "0.9rem" }}>@ {exp.company}</span>
                  </div>
                  <p style={{ fontSize: "0.7rem", color: "rgba(126,184,247,0.7)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: "0.6rem" }}>{exp.year}</p>
                  <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
