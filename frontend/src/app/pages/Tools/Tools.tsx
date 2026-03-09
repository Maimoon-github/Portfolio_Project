// import { useState, useEffect } from "react";
// import { useTools } from "../../hooks/useKnowledge";
// import { ToolCard } from "../../components/ToolCard";
// import { FloatingOrb } from "../../components/FloatingOrb";
// import { Tool } from "../../types/api";

// // small helper to derive unique categories from the tool list
// function deriveCategories(tools: Array<{ category_name: string }>) {
//   const cats = Array.from(new Set(tools.map((t) => t.category_name)));
//   return ["All", ...cats];
// }

// export default function ToolsPage() {
//   const { tools, loading, error } = useTools();
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [query, setQuery] = useState("");
//   const [visible, setVisible] = useState(false);

//   const categories = deriveCategories(tools);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 60);
//     return () => clearTimeout(t);
//   }, []);

//   const filtered = tools.filter((t: Tool) => {
//     const matchCat = activeCategory === "All" || t.category_name === activeCategory;
//     const q = query.toLowerCase();
//     const matchQ = t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
//     return matchCat && matchQ;
//   });

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

//         @keyframes cardReveal {
//           from { opacity:0; transform:translateY(20px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity:0; transform:translateY(30px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         @keyframes pulseDot {
//           0%,100% { opacity:1; transform:scale(1); }
//           50%      { opacity:0.4; transform:scale(0.8); }
//         }
//         @keyframes shimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position:  200% center; }
//         }
//         @keyframes gridFloat {
//           0%,100% { transform:translateY(0); }
//           50%      { transform:translateY(-8px); }
//         }
//         .tools-body { font-family:'Space Grotesk',sans-serif; background:#081A04; min-height:100vh; color:#F2F2F2; }
//         .shimmer-text {
//           background: linear-gradient(90deg, #A4FBCC 0%, #ffffff 40%, #A4FBCC 80%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmer 4s linear infinite;
//         }
//         .grid-bg {
//           background-image:
//             linear-gradient(rgba(164,251,204,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(164,251,204,0.04) 1px, transparent 1px);
//           background-size: 48px 48px;
//         }
//         .tools-input::placeholder { color:#4a5568; }
//         .tools-input:focus { outline:none; border-color:rgba(164,251,204,0.5); box-shadow:0 0 0 3px rgba(164,251,204,0.08); }
//         .cat-pill { transition:all 0.2s ease; cursor:pointer; }
//         .cat-pill:hover { border-color:rgba(164,251,204,0.4); color:#F2F2F2; }
//       `}</style>

//       <div className="tools-body">
//         {/* Grid background */}
//         <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none" />

//         {/* Ambient orbs */}
//         <FloatingOrb style={{ top: "-10%", left: "20%", width: 500, height: 500, background: "rgba(164,251,204,0.06)" }} />
//         <FloatingOrb style={{ bottom: "10%", right: "5%", width: 400, height: 400, background: "rgba(27,48,34,0.8)" }} />

//         <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           {/* Hero */}
//           <div
//             className="text-center mb-16"
//             style={{
//               animation: visible ? "fadeUp 0.7s ease forwards" : "none",
//               opacity: visible ? undefined : 0,
//             }}
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
//               style={{ background: "rgba(164,251,204,0.07)", border: "1px solid rgba(164,251,204,0.15)" }}>
//               <span className="w-1.5 h-1.5 rounded-full bg-[#A4FBCC]" style={{ animation: "pulseDot 2s ease infinite" }} />
//               <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#A4FBCC", fontFamily: "'Space Mono',monospace" }}>
//                 {tools.length} Tools Available
//               </span>
//             </div>

//             <h1
//               className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
//               style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.04em" }}
//             >
//               Interactive <span className="shimmer-text italic">Tools</span>
//             </h1>

//             <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "#9199A5" }}>
//               Precision-engineered web calculators for mathematics, finance, science, and data — all running instantly in your browser.
//             </p>
//           </div>

//           {/* Search + filters */}
//           <div className="mb-12" style={{ animation: visible ? "fadeUp 0.7s 0.15s ease both" : "none" }}>
//             <div className="relative max-w-lg mx-auto mb-8">
//               <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9199A5" }}>
//                 <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                   <circle cx="9" cy="9" r="6"/><path d="m15 15 3 3"/>
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search tools…"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="tools-input w-full pl-11 pr-4 py-3 rounded-xl text-sm transition-all duration-200"
//                 style={{
//                   background: "#1B3022",
//                   border: "1px solid rgba(164,251,204,0.12)",
//                   color: "#F2F2F2",
//                   fontFamily: "'Space Grotesk',sans-serif",
//                 }}
//               />
//               {query && (
//                 <button
//                   onClick={() => setQuery("")}
//                   className="absolute right-4 top-1/2 -translate-y-1/2"
//                   style={{ color: "#9199A5" }}
//                 >
//                   <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
//                     <path d="M3 3l10 10M13 3 3 13"/>
//                   </svg>
//                 </button>
//               )}
//             </div>

//             <div className="flex flex-wrap justify-center gap-2">
//               {categories.map((cat) => {
//                 const active = cat === activeCategory;
//                 return (
//                   <button
//                     key={cat}
//                     onClick={() => setActiveCategory(cat)}
//                     className="cat-pill px-4 py-1.5 rounded-full text-sm font-medium"
//                     style={{
//                       background: active ? "rgba(164,251,204,0.12)" : "transparent",
//                       border: active ? "1px solid rgba(164,251,204,0.40)" : "1px solid rgba(145,153,165,0.20)",
//                       color: active ? "#A4FBCC" : "#9199A5",
//                     }}
//                   >
//                     {cat}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Tool Grid */}
//           {filtered.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {filtered.map((tool: Tool, i: number) => (
//                 <ToolCard key={tool.id} tool={tool} index={i} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-24">
//               <div className="text-4xl mb-4">⊘</div>
//               <p className="text-base" style={{ color: "#9199A5" }}>
//                 No tools match <span style={{ color: "#F2F2F2" }}>&quot;{query}&quot;</span>.
//               </p>
//               <button
//                 onClick={() => {
//                   setQuery("");
//                   setActiveCategory("All");
//                 }}
//                 className="mt-4 text-sm underline underline-offset-4"
//                 style={{ color: "#A4FBCC" }}
//               >
//                 Clear filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }










































import { useState, useEffect } from "react";
import { useTools } from "../../hooks/useKnowledge";
import { ToolCard } from "../../components/ToolCard";
import { FloatingOrb } from "../../components/FloatingOrb";
import { Tool } from "../../types/api";

// small helper to derive unique categories from the tool list
function deriveCategories(tools: Array<{ category_name: string }>) {
  const cats = Array.from(new Set(tools.map((t) => t.category_name)));
  return ["All", ...cats];
}

export default function ToolsPage() {
  const { tools, loading, error } = useTools();
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);

  const categories = deriveCategories(tools);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filtered = tools.filter((t: Tool) => {
    const matchCat = activeCategory === "All" || t.category_name === activeCategory;
    const q = query.toLowerCase();
    const matchQ = t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

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
        .tools-body { font-family:'Space Grotesk',sans-serif; background:#081A04; min-height:100vh; color:#F2F2F2; }
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
        {/* Ambient orbs */}
        <FloatingOrb style={{ top: "-10%", left: "20%", width: 500, height: 500, background: "rgba(164,251,204,0.06)" }} />
        <FloatingOrb style={{ bottom: "10%", right: "5%", width: 400, height: 400, background: "rgba(27,48,34,0.8)" }} />

        {/* Content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero */}
          <div
            className="text-center mb-16"
            style={{
              animation: visible ? "fadeUp 0.7s ease forwards" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(164,251,204,0.07)", border: "1px solid rgba(164,251,204,0.15)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A4FBCC]" style={{ animation: "pulseDot 2s ease infinite" }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#A4FBCC", fontFamily: "'Space Mono',monospace" }}>
                {tools.length} Tools Available
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-0.04em" }}
            >
              Interactive <span className="shimmer-text italic">Tools</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "#9199A5" }}>
              Precision-engineered web calculators for mathematics, finance, science, and data — all running instantly in your browser.
            </p>
          </div>

          {/* Search + filters */}
          <div className="mb-12" style={{ animation: visible ? "fadeUp 0.7s 0.15s ease both" : "none" }}>
            <div className="relative max-w-lg mx-auto mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9199A5" }}>
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
                  background: "#1B3022",
                  border: "1px solid rgba(164,251,204,0.12)",
                  color: "#F2F2F2",
                  fontFamily: "'Space Grotesk',sans-serif",
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#9199A5" }}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                    <path d="M3 3l10 10M13 3 3 13"/>
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
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

          {/* Tool Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((tool: Tool, i: number) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-4xl mb-4">⊘</div>
              <p className="text-base" style={{ color: "#9199A5" }}>
                No tools match <span style={{ color: "#F2F2F2" }}>&quot;{query}&quot;</span>.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-sm underline underline-offset-4"
                style={{ color: "#A4FBCC" }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}