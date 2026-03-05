import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Math", "Finance", "Science", "Conversion", "Data"];

const TOOLS = [
  {
    id: 1, category: "Math",
    title: "Scientific Calculator",
    description: "Full-featured scientific calculator with trigonometric, logarithmic, and algebraic operations.",
    badge: "Popular",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/>
        <line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/>
        <line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/>
        <line x1="14" y1="18" x2="16" y2="18"/>
      </svg>
    ),
    stats: "12 functions",
  },
  {
    id: 2, category: "Finance",
    title: "Compound Interest",
    description: "Calculate growth over time with variable compounding intervals — monthly, quarterly, or annually.",
    badge: "New",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    stats: "4 intervals",
  },
  {
    id: 3, category: "Science",
    title: "Unit Converter",
    description: "Instant conversion across 200+ units — length, mass, temperature, pressure, energy, and more.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
        <path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
        <path d="M7 12h10"/><path d="m12 7 5 5-5 5"/>
      </svg>
    ),
    stats: "200+ units",
  },
  {
    id: 4, category: "Math",
    title: "Matrix Solver",
    description: "Solve systems of linear equations, compute determinants, inverses, and eigenvalues up to 5×5.",
    badge: "Advanced",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    stats: "5×5 max",
  },
  {
    id: 5, category: "Finance",
    title: "Loan Calculator",
    description: "Compute monthly payments, total interest, and amortization schedules for any loan type.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    stats: "Amortization",
  },
  {
    id: 6, category: "Data",
    title: "Statistics Suite",
    description: "Mean, median, mode, standard deviation, variance, z-scores, and distribution analysis.",
    badge: "Popular",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    stats: "15 metrics",
  },
  {
    id: 7, category: "Conversion",
    title: "Currency Exchange",
    description: "Live foreign exchange rates across 150+ currencies with historical trend snapshots.",
    badge: "Live",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    stats: "150+ currencies",
  },
  {
    id: 8, category: "Science",
    title: "pH Calculator",
    description: "Calculate pH, pOH, hydrogen ion concentration, and buffer capacity for chemical solutions.",
    badge: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 3H5v4l-2 7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-2-7V3h-4"/>
        <path d="M9 3h6"/><path d="M9 12h6"/>
      </svg>
    ),
    stats: "Buffer analysis",
  },
  {
    id: 9, category: "Data",
    title: "Regex Tester",
    description: "Build, test, and debug regular expressions with live match highlighting and explanation.",
    badge: "Dev",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
      </svg>
    ),
    stats: "Live highlight",
  },
];

const BADGE_STYLES = {
  Popular: "bg-[#A4FBCC]/15 text-[#A4FBCC] border border-[#A4FBCC]/30",
  New:     "bg-blue-400/15 text-blue-300 border border-blue-400/30",
  Advanced:"bg-amber-400/15 text-amber-300 border border-amber-400/30",
  Live:    "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30",
  Dev:     "bg-violet-400/15 text-violet-300 border border-violet-400/30",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function FloatingOrb({ style }) {
  return (
    <div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={style}
    />
  );
}

function ToolCard({ tool, index }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 ease-out"
      style={{
        background: "#1B3022",
        border: "1px solid rgba(164,251,204,0.10)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        animationDelay: `${index * 80}ms`,
        animation: "cardReveal 0.6s ease forwards",
        opacity: 0,
        boxShadow: hovered
          ? "0 24px 48px -8px rgba(0,0,0,0.7), 0 0 0 1px rgba(164,251,204,0.25), inset 0 0 40px rgba(164,251,204,0.04)"
          : "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(180px circle at ${mousePos.x}% ${mousePos.y}%, rgba(164,251,204,0.10) 0%, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, #A4FBCC, transparent)",
          opacity: hovered ? 0.8 : 0.2,
        }}
      />

      <div className="relative p-6 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
            style={{
              background: hovered ? "rgba(164,251,204,0.15)" : "rgba(164,251,204,0.06)",
              color: "#A4FBCC",
              border: "1px solid rgba(164,251,204,0.15)",
            }}
          >
            {tool.icon}
          </div>

          {/* Badge + stats */}
          <div className="flex flex-col items-end gap-1.5">
            {tool.badge && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide ${BADGE_STYLES[tool.badge]}`}>
                {tool.badge}
              </span>
            )}
            <span className="text-[11px]" style={{ color: "#9199A5" }}>{tool.stats}</span>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3
            className="text-base font-semibold mb-2 transition-colors duration-200"
            style={{ color: hovered ? "#A4FBCC" : "#F2F2F2", fontFamily: "'DM Serif Display', serif" }}
          >
            {tool.title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#9199A5" }}>
            {tool.description}
          </p>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 text-xs font-semibold transition-all duration-300 mt-auto pt-2"
          style={{
            color: "#A4FBCC",
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          <span>Launch Tool</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filtered = TOOLS.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchQ   = t.title.toLowerCase().includes(query.toLowerCase()) ||
                     t.description.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes cardReveal {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulseDot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.8); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes gridFloat {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-8px); }
        }
        .tools-body { font-family:'Syne',sans-serif; background:#081A04; min-height:100vh; color:#F2F2F2; }
        .shimmer-text {
          background: linear-gradient(90deg, #A4FBCC 0%, #ffffff 40%, #A4FBCC 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(164,251,204,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(164,251,204,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .tools-input::placeholder { color:#4a5568; }
        .tools-input:focus { outline:none; border-color:rgba(164,251,204,0.5); box-shadow:0 0 0 3px rgba(164,251,204,0.08); }
        .cat-pill { transition:all 0.2s ease; cursor:pointer; }
        .cat-pill:hover { border-color:rgba(164,251,204,0.4); color:#F2F2F2; }
      `}</style>

      <div className="tools-body">
        {/* Grid background */}
        <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none" />

        {/* Ambient orbs */}
        <FloatingOrb style={{ top:"-10%", left:"20%", width:500, height:500, background:"rgba(164,251,204,0.06)" }} />
        <FloatingOrb style={{ bottom:"10%", right:"5%", width:400, height:400, background:"rgba(27,48,34,0.8)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          {/* ── Hero ── */}
          <div
            className="text-center mb-16"
            style={{
              animation: visible ? "fadeUp 0.7s ease forwards" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{ background:"rgba(164,251,204,0.07)", border:"1px solid rgba(164,251,204,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A4FBCC]" style={{ animation:"pulseDot 2s ease infinite" }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color:"#A4FBCC", fontFamily:"'JetBrains Mono',monospace" }}>
                {TOOLS.length} Tools Available
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily:"'DM Serif Display',serif" }}
            >
              Interactive{" "}
              <span className="shimmer-text italic">Tools</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color:"#9199A5" }}>
              Precision-engineered web calculators for mathematics, finance, science,
              and data — all running instantly in your browser.
            </p>
          </div>

          {/* ── Search + Filters ── */}
          <div
            className="mb-12"
            style={{
              animation: visible ? "fadeUp 0.7s 0.15s ease both" : "none",
            }}
          >
            {/* Search bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color:"#9199A5" }}
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <circle cx="9" cy="9" r="6"/><path d="m15 15 3 3"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="tools-input w-full pl-11 pr-4 py-3 rounded-xl text-sm transition-all duration-200"
                style={{
                  background:"#1B3022",
                  border:"1px solid rgba(164,251,204,0.12)",
                  color:"#F2F2F2",
                  fontFamily:"'Syne',sans-serif",
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color:"#9199A5" }}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M3 3l10 10M13 3 3 13"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="cat-pill px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      background: active ? "rgba(164,251,204,0.12)" : "transparent",
                      border: active ? "1px solid rgba(164,251,204,0.40)" : "1px solid rgba(145,153,165,0.20)",
                      color: active ? "#A4FBCC" : "#9199A5",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Stats row ── */}
          <div
            className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto"
            style={{ animation: visible ? "fadeUp 0.7s 0.25s ease both" : "none" }}
          >
            {[
              { label:"Total Tools", value: TOOLS.length },
              { label:"Categories", value: CATEGORIES.length - 1 },
              { label:"Always Free", value: "∞" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center py-4 rounded-xl"
                style={{ background:"rgba(27,48,34,0.6)", border:"1px solid rgba(164,251,204,0.08)" }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color:"#A4FBCC", fontFamily:"'JetBrains Mono',monospace" }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color:"#9199A5" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Tool Grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-4xl mb-4">⊘</div>
              <p className="text-base" style={{ color:"#9199A5" }}>
                No tools match <span style={{ color:"#F2F2F2" }}>"{query}"</span>.
              </p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-sm underline underline-offset-4"
                style={{ color:"#A4FBCC" }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div
            className="mt-20 text-center py-16 rounded-2xl relative overflow-hidden"
            style={{
              background:"linear-gradient(135deg, #1B3022 0%, #0d2016 100%)",
              border:"1px solid rgba(164,251,204,0.12)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:"radial-gradient(ellipse at 50% 0%, rgba(164,251,204,0.08) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <p
                className="text-xs font-medium tracking-widest uppercase mb-4"
                style={{ color:"#A4FBCC", fontFamily:"'JetBrains Mono',monospace" }}
              >
                Missing a tool?
              </p>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily:"'DM Serif Display',serif", color:"#F2F2F2" }}
              >
                Request a Calculator
              </h2>
              <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color:"#9199A5" }}>
                Have a specific computation in mind? Suggest a new tool and I'll build it.
              </p>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background:"#A4FBCC",
                  color:"#081A04",
                  fontFamily:"'Syne',sans-serif",
                }}
              >
                Submit Request
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}