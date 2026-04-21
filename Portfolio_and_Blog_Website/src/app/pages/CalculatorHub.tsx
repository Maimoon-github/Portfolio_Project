import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { calculators, CALC_CATEGORIES } from "../data/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CalculatorHub() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? calculators
    : calculators.filter((c) => c.category === activeCategory);

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    finance: { bg: "rgba(255,198,139,0.08)", text: "#ffc68b", border: "rgba(255,198,139,0.2)" },
    health: { bg: "rgba(74,222,128,0.08)", text: "rgba(74,222,128,0.9)", border: "rgba(74,222,128,0.2)" },
    math: { bg: "rgba(126,184,247,0.08)", text: "rgba(126,184,247,0.9)", border: "rgba(126,184,247,0.2)" },
    dev: { bg: "rgba(196,148,255,0.08)", text: "rgba(196,148,255,0.9)", border: "rgba(196,148,255,0.2)" },
  };

  return (
    <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}>
      {/* Header */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full top-0 right-0 opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 left-0 opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #7eb8f7 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            Interactive Tools
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.025em", color: "#f0e6d3", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Calculator Hub
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: "rgba(240,230,211,0.55)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "36rem" }}>
            A curated collection of interactive tools across finance, health, mathematics, and developer utilities. Built for accuracy, designed for clarity.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-8 mt-10">
            {[
              { value: `${calculators.length}`, label: "Tools Available" },
              { value: "4", label: "Categories" },
              { value: "100%", label: "Client-Side (Private)" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontWeight: 700, fontSize: "1.5rem", color: "#ffc68b", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(240,230,211,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-2">
            {CALC_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  backgroundColor: activeCategory === cat.key ? "rgba(255,198,139,0.12)" : "transparent",
                  color: activeCategory === cat.key ? "#ffc68b" : "rgba(240,230,211,0.5)",
                  border: activeCategory === cat.key ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(240,230,211,0.08)",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-16" style={{ backgroundColor: "#131313" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((calc, i) => {
              const colors = categoryColors[calc.category];
              return (
                <motion.div
                  key={calc.id}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <Link
                    to={`/calculators/${calc.slug}`}
                    className="group block h-full"
                  >
                    <div
                      className="h-full p-6 rounded-2xl flex flex-col transition-all duration-300"
                      style={{
                        backgroundColor: "#1c1b1b",
                        border: "1px solid rgba(84,68,52,0.12)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#201f1f";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,198,139,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "#1c1b1b";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(84,68,52,0.12)";
                      }}
                    >
                      {/* Emoji */}
                      <div className="text-4xl mb-4">{calc.emoji}</div>

                      {/* Category badge */}
                      <span
                        className="self-start px-2.5 py-0.5 rounded-full text-xs mb-3"
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {calc.category}
                      </span>

                      <h2 style={{ fontWeight: 700, fontSize: "1rem", color: "#f0e6d3", letterSpacing: "-0.01em", marginBottom: "0.5rem" }}>
                        {calc.name}
                      </h2>
                      <p style={{ color: "rgba(240,230,211,0.45)", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "auto" }}>
                        {calc.description}
                      </p>

                      <div className="flex items-center gap-1.5 mt-5" style={{ color: "#ffc68b", fontSize: "0.82rem", fontWeight: 600 }}>
                        Open <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Missing a tool you need?
            </h2>
            <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "1.75rem" }}>
              I'm actively adding more calculators. If there's a specific tool you'd like to see, reach out and I'll prioritise it.
            </p>
            <a
              href="mailto:alex@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl"
              style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 600, fontSize: "0.95rem" }}
            >
              Request a Calculator <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
