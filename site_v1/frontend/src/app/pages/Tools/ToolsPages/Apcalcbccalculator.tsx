// import { useState, useEffect, useRef } from "react";

// // ─── Score Mapping Tables ───────────────────────────────────────────────────
// const BC_THRESHOLDS = [
//   { min: 87, max: 108, score: 5 },
//   { min: 69, max: 86,  score: 4 },
//   { min: 52, max: 68,  score: 3 },
//   { min: 35, max: 51,  score: 2 },
//   { min: 0,  max: 34,  score: 1 },
// ];

// const AB_THRESHOLDS = [
//   { min: 60, max: 72, score: 5 },
//   { min: 46, max: 59, score: 4 },
//   { min: 35, max: 45, score: 3 },
//   { min: 24, max: 34, score: 2 },
//   { min: 0,  max: 23, score: 1 },
// ];

// const FRQ_LABELS = [
//   { id: 1, label: "FRQ 1", tag: "AB", hint: "Differential Eq / Area" },
//   { id: 2, label: "FRQ 2", tag: "AB", hint: "Contextual Application" },
//   { id: 3, label: "FRQ 3", tag: "AB", hint: "Graph / Table Analysis" },
//   { id: 4, label: "FRQ 4", tag: "BC", hint: "Series / Convergence" },
//   { id: 5, label: "FRQ 5", tag: "BC", hint: "Parametric / Polar / Vector" },
//   { id: 6, label: "FRQ 6", tag: "AB", hint: "Integral Applications" },
// ];

// function mapScore(composite, thresholds) {
//   for (const t of thresholds) {
//     if (composite >= t.min && composite <= t.max) return t.score;
//   }
//   return 1;
// }

// function getScoreColor(score) {
//   const colors = { 5: "#A4FBCC", 4: "#6ee7b7", 3: "#fbbf24", 2: "#f97316", 1: "#ef4444" };
//   return colors[score] || "#9199A5";
// }

// function getScoreLabel(score) {
//   const labels = { 5: "Extremely Well Qualified", 4: "Well Qualified", 3: "Qualified", 2: "Possibly Qualified", 1: "No Recommendation" };
//   return labels[score] || "";
// }

// // ─── Animated Counter ───────────────────────────────────────────────────────
// function AnimatedNumber({ value, duration = 400 }) {
//   const [display, setDisplay] = useState(value);
//   const raf = useRef(null);

//   useEffect(() => {
//     const start = display;
//     const end = value;
//     const startTime = performance.now();
//     const animate = (now) => {
//       const t = Math.min((now - startTime) / duration, 1);
//       const ease = 1 - Math.pow(1 - t, 3);
//       setDisplay(Math.round(start + (end - start) * ease));
//       if (t < 1) raf.current = requestAnimationFrame(animate);
//     };
//     raf.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(raf.current);
//   }, [value]);

//   return <span>{display}</span>;
// }

// // ─── Score Badge ────────────────────────────────────────────────────────────
// function ScoreBadge({ score, label, composite, max, subscript }) {
//   const color = getScoreColor(score);
//   const pct = (composite / max) * 100;

//   return (
//     <div style={{
//       background: "#1B3022",
//       border: `1px solid ${color}22`,
//       borderRadius: 16,
//       padding: "24px 28px",
//       display: "flex",
//       flexDirection: "column",
//       gap: 12,
//       position: "relative",
//       overflow: "hidden",
//     }}>
//       {/* Glow */}
//       <div style={{
//         position: "absolute", top: -40, right: -40,
//         width: 120, height: 120,
//         background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
//         borderRadius: "50%",
//       }} />

//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//         <div>
//           <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
//             {subscript ? "AB Subscore" : "BC Predicted Score"}
//           </p>
//           <p style={{ color: "#F2F2F2", fontSize: 13, fontWeight: 500 }}>{label}</p>
//         </div>
//         <div style={{
//           width: 56, height: 56,
//           borderRadius: "50%",
//           border: `2px solid ${color}`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 26, fontWeight: 700, color,
//           fontFamily: "'Space Grotesk', sans-serif",
//           boxShadow: `0 0 20px ${color}30`,
//         }}>
//           {score}
//         </div>
//       </div>

//       {/* Progress bar */}
//       <div>
//         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
//           <span style={{ color: "#9199A5", fontSize: 11 }}>{subscript ? "AB Composite" : "BC Composite"}</span>
//           <span style={{ color: "#F2F2F2", fontSize: 12, fontWeight: 600 }}>
//             <AnimatedNumber value={composite} /> / {max}
//           </span>
//         </div>
//         <div style={{ height: 4, background: "#081A04", borderRadius: 2, overflow: "hidden" }}>
//           <div style={{
//             height: "100%",
//             width: `${pct}%`,
//             background: `linear-gradient(90deg, ${color}80, ${color})`,
//             borderRadius: 2,
//             transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)",
//           }} />
//         </div>
//       </div>

//       <p style={{ color: "#9199A5", fontSize: 11, fontStyle: "italic" }}>{getScoreLabel(score)}</p>
//     </div>
//   );
// }

// // ─── Slider Input ────────────────────────────────────────────────────────────
// function SliderInput({ label, hint, tag, value, max, onChange }) {
//   const pct = (value / max) * 100;
//   const tagColor = tag === "AB" ? "#A4FBCC" : "#7dd3fc";

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <span style={{ color: "#F2F2F2", fontSize: 13, fontWeight: 600 }}>{label}</span>
//           {tag && (
//             <span style={{
//               fontSize: 9, fontWeight: 700, color: tagColor,
//               border: `1px solid ${tagColor}50`,
//               borderRadius: 4, padding: "1px 6px",
//               letterSpacing: "0.08em", textTransform: "uppercase",
//             }}>{tag}</span>
//           )}
//           {hint && <span style={{ color: "#9199A5", fontSize: 11 }}>{hint}</span>}
//         </div>
//         <span style={{
//           color: "#A4FBCC", fontWeight: 700, fontSize: 14,
//           fontFamily: "'Space Grotesk', sans-serif",
//           minWidth: 28, textAlign: "right",
//         }}>{value}</span>
//       </div>

//       <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
//         <div style={{
//           position: "absolute", left: 0, right: 0, height: 4,
//           background: "#081A04", borderRadius: 2,
//         }}>
//           <div style={{
//             height: "100%", width: `${pct}%`,
//             background: "linear-gradient(90deg, #1B3022, #A4FBCC)",
//             borderRadius: 2, transition: "width 0.15s ease",
//           }} />
//         </div>
//         <input
//           type="range" min={0} max={max} value={value}
//           onChange={(e) => onChange(Number(e.target.value))}
//           style={{
//             position: "absolute", left: 0, right: 0,
//             width: "100%", opacity: 0, height: 28, cursor: "pointer", zIndex: 1,
//           }}
//         />
//         {/* Thumb visual */}
//         <div style={{
//           position: "absolute",
//           left: `calc(${pct}% - 8px)`,
//           width: 16, height: 16,
//           background: "#A4FBCC",
//           borderRadius: "50%",
//           boxShadow: "0 0 8px #A4FBCC60",
//           transition: "left 0.15s ease",
//           pointerEvents: "none",
//         }} />
//       </div>
//     </div>
//   );
// }

// // ─── Threshold Visual ────────────────────────────────────────────────────────
// function ThresholdBar({ composite, max }) {
//   const bands = [
//     { min: 87, max: 108, score: 5, color: "#A4FBCC" },
//     { min: 69, max: 86,  score: 4, color: "#6ee7b7" },
//     { min: 52, max: 68,  score: 3, color: "#fbbf24" },
//     { min: 35, max: 51,  score: 2, color: "#f97316" },
//     { min: 0,  max: 34,  score: 1, color: "#ef4444" },
//   ];

//   return (
//     <div style={{ marginTop: 8 }}>
//       <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
//         Score Threshold Map
//       </p>
//       <div style={{ position: "relative", height: 8, borderRadius: 4, overflow: "hidden", display: "flex" }}>
//         {bands.slice().reverse().map((b) => (
//           <div key={b.score} style={{
//             flex: (b.max - b.min + 1),
//             background: b.color + "60",
//             borderRight: "1px solid #081A0430",
//           }} />
//         ))}
//         {/* Position marker */}
//         <div style={{
//           position: "absolute",
//           left: `${(composite / max) * 100}%`,
//           top: -3, width: 2, height: 14,
//           background: "#F2F2F2",
//           borderRadius: 1,
//           transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1)",
//           boxShadow: "0 0 6px #F2F2F2",
//         }} />
//       </div>
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
//         {bands.slice().reverse().map((b) => (
//           <span key={b.score} style={{ color: b.color, fontSize: 10, fontWeight: 700 }}>{b.score}</span>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─── Main Component ──────────────────────────────────────────────────────────
// export default function APCalcBCCalculator() {
//   const [mcq, setMcq] = useState(30);
//   const [frqs, setFrqs] = useState([6, 6, 5, 5, 5, 6]);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     // Load Space Grotesk
//     const link = document.createElement("link");
//     link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//     setTimeout(() => setMounted(true), 80);
//   }, []);

//   const mcqWeighted = parseFloat((mcq * 1.2).toFixed(2));
//   const frqTotal = frqs.reduce((a, b) => a + b, 0);
//   const composite = Math.round(mcqWeighted + frqTotal);

//   // AB Subscore: MCQ ~27 of 45 (ratio), FRQs 1,2,3,6 (AB-tagged)
//   const abMcqWeighted = parseFloat(((mcq * (27 / 45)) * (36 / 27)).toFixed(2));
//   const abFrqTotal = frqs[0] + frqs[1] + frqs[2] + frqs[5]; // FRQ 1,2,3,6
//   const abComposite = Math.round(abMcqWeighted + abFrqTotal);

//   const bcScore = mapScore(composite, BC_THRESHOLDS);
//   const abScore = mapScore(abComposite, AB_THRESHOLDS);

//   const handleFrq = (idx, val) => {
//     const next = [...frqs];
//     next[idx] = val;
//     setFrqs(next);
//   };

//   return (
//     <div style={{
//       fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif",
//       background: "#081A04",
//       minHeight: "100vh",
//       color: "#F2F2F2",
//       opacity: mounted ? 1 : 0,
//       transition: "opacity 0.5s ease",
//     }}>
//       {/* Ambient BG */}
//       <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
//         <div style={{
//           position: "absolute", top: "10%", left: "5%",
//           width: 400, height: 400,
//           background: "radial-gradient(circle, #A4FBCC08 0%, transparent 70%)",
//           borderRadius: "50%",
//         }} />
//         <div style={{
//           position: "absolute", bottom: "15%", right: "8%",
//           width: 300, height: 300,
//           background: "radial-gradient(circle, #1B302230 0%, transparent 70%)",
//           borderRadius: "50%",
//         }} />
//       </div>

//             <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

//         {/* Header */}
//         <div style={{ marginBottom: 48, animation: "fadeDown 0.6s ease both" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
//             <div style={{
//               width: 36, height: 36, borderRadius: 8,
//               background: "linear-gradient(135deg, #1B3022, #A4FBCC22)",
//               border: "1px solid #A4FBCC40",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 16,
//             }}>∫</div>
//             <span style={{ color: "#9199A5", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
//               AP Calculus BC
//             </span>
//           </div>
//           <h1 style={{
//             fontSize: "clamp(28px, 5vw, 44px)",
//             fontWeight: 700, lineHeight: 1.1,
//             margin: 0, marginBottom: 12,
//             background: "linear-gradient(135deg, #F2F2F2 40%, #A4FBCC)",
//             WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
//           }}>
//             Score Calculator
//           </h1>
//           <p style={{ color: "#9199A5", fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
//             Estimate your AP Calc BC composite score (1–5) and AB subscore using official CollegeBoard weighting. Thresholds based on historical exam data (±2–3 pts variance).
//           </p>
//         </div>

//         {/* Main Grid */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: 24,
//         }}>

//           {/* ── Left Panel: Inputs ── */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

//             {/* MCQ Section */}
//             <div style={{
//               background: "#1B3022",
//               border: "1px solid #A4FBCC15",
//               borderRadius: 16, padding: "24px 24px 20px",
//               animation: "fadeUp 0.5s 0.1s ease both",
//             }}>
//               <div style={{ marginBottom: 20 }}>
//                 <p style={{ color: "#A4FBCC", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>
//                   Section I — Multiple Choice
//                 </p>
//                 <p style={{ color: "#9199A5", fontSize: 12 }}>45 questions · No penalty for wrong answers</p>
//               </div>

//               <SliderInput
//                 label="MCQ Correct"
//                 hint="out of 45"
//                 value={mcq}
//                 max={45}
//                 onChange={setMcq}
//               />

//               <div style={{
//                 marginTop: 16, padding: "12px 16px",
//                 background: "#081A04", borderRadius: 10,
//                 display: "flex", justifyContent: "space-between", alignItems: "center",
//               }}>
//                 <span style={{ color: "#9199A5", fontSize: 12 }}>Weighted MCQ Score</span>
//                 <span style={{ color: "#A4FBCC", fontWeight: 700, fontSize: 16 }}>
//                   <AnimatedNumber value={Math.round(mcqWeighted)} /> / 54
//                 </span>
//               </div>
//             </div>

//             {/* FRQ Section */}
//             <div style={{
//               background: "#1B3022",
//               border: "1px solid #A4FBCC15",
//               borderRadius: 16, padding: "24px 24px 20px",
//               animation: "fadeUp 0.5s 0.2s ease both",
//             }}>
//               <div style={{ marginBottom: 20 }}>
//                 <p style={{ color: "#A4FBCC", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>
//                   Section II — Free Response
//                 </p>
//                 <p style={{ color: "#9199A5", fontSize: 12 }}>6 questions · 9 points each · Max 54 pts</p>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
//                 {FRQ_LABELS.map((frq, i) => (
//                   <SliderInput
//                     key={frq.id}
//                     label={frq.label}
//                     hint={frq.hint}
//                     tag={frq.tag}
//                     value={frqs[i]}
//                     max={9}
//                     onChange={(v) => handleFrq(i, v)}
//                   />
//                 ))}
//               </div>

//               <div style={{
//                 marginTop: 16, padding: "12px 16px",
//                 background: "#081A04", borderRadius: 10,
//                 display: "flex", justifyContent: "space-between", alignItems: "center",
//               }}>
//                 <span style={{ color: "#9199A5", fontSize: 12 }}>Total FRQ Score</span>
//                 <span style={{ color: "#A4FBCC", fontWeight: 700, fontSize: 16 }}>
//                   <AnimatedNumber value={frqTotal} /> / 54
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ── Right Panel: Results ── */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

//             {/* Composite */}
//             <div style={{
//               background: "#1B3022",
//               border: "1px solid #A4FBCC30",
//               borderRadius: 16, padding: "24px",
//               animation: "fadeUp 0.5s 0.15s ease both",
//             }}>
//               <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
//                 Composite Score
//               </p>
//               <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
//                 <span style={{
//                   fontSize: 64, fontWeight: 700, lineHeight: 1,
//                   color: "#A4FBCC",
//                   fontFamily: "'Space Grotesk', sans-serif",
//                   textShadow: "0 0 40px #A4FBCC40",
//                 }}>
//                   <AnimatedNumber value={composite} />
//                 </span>
//                 <span style={{ color: "#9199A5", fontSize: 18, marginBottom: 8 }}>/ 108</span>
//               </div>
//               <ThresholdBar composite={composite} max={108} />
//             </div>

//             {/* Score Predictions */}
//             <ScoreBadge
//               score={bcScore}
//               label={getScoreLabel(bcScore)}
//               composite={composite}
//               max={108}
//             />

//             <ScoreBadge
//               score={abScore}
//               label={getScoreLabel(abScore)}
//               composite={abComposite}
//               max={72}
//               subscript
//             />

//             {/* Breakdown Card */}
//             <div style={{
//               background: "#1B3022",
//               border: "1px solid #A4FBCC15",
//               borderRadius: 16, padding: "20px 24px",
//               animation: "fadeUp 0.5s 0.35s ease both",
//             }}>
//               <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>
//                 Score Breakdown
//               </p>
//               {[
//                 { label: "MCQ Weighted", value: Math.round(mcqWeighted), max: 54, color: "#A4FBCC" },
//                 { label: "FRQ Total", value: frqTotal, max: 54, color: "#7dd3fc" },
//                 { label: "BC Composite", value: composite, max: 108, color: "#A4FBCC" },
//                 { label: "AB Composite", value: abComposite, max: 72, color: "#6ee7b7" },
//               ].map((row) => (
//                 <div key={row.label} style={{ marginBottom: 12 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//                     <span style={{ color: "#9199A5", fontSize: 12 }}>{row.label}</span>
//                     <span style={{ color: row.color, fontSize: 12, fontWeight: 600 }}>
//                       <AnimatedNumber value={row.value} /> / {row.max}
//                     </span>
//                   </div>
//                   <div style={{ height: 3, background: "#081A04", borderRadius: 2 }}>
//                     <div style={{
//                       height: "100%",
//                       width: `${(row.value / row.max) * 100}%`,
//                       background: row.color + "90",
//                       borderRadius: 2,
//                       transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)",
//                     }} />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Disclaimer */}
//             <div style={{
//               background: "#000000",
//               border: "1px solid #1B3022",
//               borderRadius: 12, padding: "14px 16px",
//             }}>
//               <p style={{ color: "#9199A5", fontSize: 11, lineHeight: 1.7, margin: 0 }}>
//                 ⚠ Thresholds are estimates from historical data. CollegeBoard does not publish official curves. Actual scores may vary ±2–3 pts. AB subscore reflects BC exam AB-content subset only.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Reset Button */}
//         <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
//           <button
//             onClick={() => { setMcq(0); setFrqs([0,0,0,0,0,0]); }}
//             style={{
//               background: "transparent",
//               border: "1px solid #9199A540",
//               color: "#9199A5",
//               padding: "10px 32px",
//               borderRadius: 8,
//               fontSize: 13,
//               fontFamily: "'Space Grotesk', sans-serif",
//               cursor: "pointer",
//               letterSpacing: "0.06em",
//               transition: "all 0.2s ease",
//             }}
//             onMouseEnter={e => { e.target.style.borderColor = "#A4FBCC60"; e.target.style.color = "#A4FBCC"; }}
//             onMouseLeave={e => { e.target.style.borderColor = "#9199A540"; e.target.style.color = "#9199A5"; }}
//           >
//             Reset All Scores
//           </button>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeDown {
//           from { opacity: 0; transform: translateY(-16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         @media (max-width: 680px) {
//           .main-grid { grid-template-columns: 1fr !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

























































import { useState, useEffect, useRef } from "react";

// ─── Score Mapping Tables ───────────────────────────────────────────────────
const BC_THRESHOLDS = [
  { min: 87, max: 108, score: 5 },
  { min: 69, max: 86,  score: 4 },
  { min: 52, max: 68,  score: 3 },
  { min: 35, max: 51,  score: 2 },
  { min: 0,  max: 34,  score: 1 },
];

const AB_THRESHOLDS = [
  { min: 60, max: 72, score: 5 },
  { min: 46, max: 59, score: 4 },
  { min: 35, max: 45, score: 3 },
  { min: 24, max: 34, score: 2 },
  { min: 0,  max: 23, score: 1 },
];

const FRQ_LABELS = [
  { id: 1, label: "FRQ 1", tag: "AB", hint: "Differential Eq / Area" },
  { id: 2, label: "FRQ 2", tag: "AB", hint: "Contextual Application" },
  { id: 3, label: "FRQ 3", tag: "AB", hint: "Graph / Table Analysis" },
  { id: 4, label: "FRQ 4", tag: "BC", hint: "Series / Convergence" },
  { id: 5, label: "FRQ 5", tag: "BC", hint: "Parametric / Polar / Vector" },
  { id: 6, label: "FRQ 6", tag: "AB", hint: "Integral Applications" },
];

function mapScore(composite, thresholds) {
  for (const t of thresholds) {
    if (composite >= t.min && composite <= t.max) return t.score;
  }
  return 1;
}

function getScoreColor(score) {
  const colors = { 5: "#A4FBCC", 4: "#6ee7b7", 3: "#fbbf24", 2: "#f97316", 1: "#ef4444" };
  return colors[score] || "#9199A5";
}

function getScoreLabel(score) {
  const labels = { 5: "Extremely Well Qualified", 4: "Well Qualified", 3: "Qualified", 2: "Possibly Qualified", 1: "No Recommendation" };
  return labels[score] || "";
}

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedNumber({ value, duration = 400 }) {
  const [display, setDisplay] = useState(value);
  const raf = useRef(null);

  useEffect(() => {
    const start = display;
    const end = value;
    const startTime = performance.now();
    const animate = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * ease));
      if (t < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <span>{display}</span>;
}

// ─── Score Badge ────────────────────────────────────────────────────────────
function ScoreBadge({ score, label, composite, max, subscript }) {
  const color = getScoreColor(score);
  const pct = (composite / max) * 100;

  return (
    <div style={{
      background: "#1B3022",
      border: `1px solid ${color}22`,
      borderRadius: 16,
      padding: "24px 28px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: -40, right: -40,
        width: 120, height: 120,
        background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
        borderRadius: "50%",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
            {subscript ? "AB Subscore" : "BC Predicted Score"}
          </p>
          <p style={{ color: "#F2F2F2", fontSize: 13, fontWeight: 500 }}>{label}</p>
        </div>
        <div style={{
          width: 56, height: 56,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, fontWeight: 700, color,
          fontFamily: "'Space Grotesk', sans-serif",
          boxShadow: `0 0 20px ${color}30`,
        }}>
          {score}
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#9199A5", fontSize: 11 }}>{subscript ? "AB Composite" : "BC Composite"}</span>
          <span style={{ color: "#F2F2F2", fontSize: 12, fontWeight: 600 }}>
            <AnimatedNumber value={composite} /> / {max}
          </span>
        </div>
        <div style={{ height: 4, background: "#081A04", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            borderRadius: 2,
            transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          }} />
        </div>
      </div>

      <p style={{ color: "#9199A5", fontSize: 11, fontStyle: "italic" }}>{getScoreLabel(score)}</p>
    </div>
  );
}

// ─── Slider Input ────────────────────────────────────────────────────────────
function SliderInput({ label, hint, tag, value, max, onChange }) {
  const pct = (value / max) * 100;
  const tagColor = tag === "AB" ? "#A4FBCC" : "#7dd3fc";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#F2F2F2", fontSize: 13, fontWeight: 600 }}>{label}</span>
          {tag && (
            <span style={{
              fontSize: 9, fontWeight: 700, color: tagColor,
              border: `1px solid ${tagColor}50`,
              borderRadius: 4, padding: "1px 6px",
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>{tag}</span>
          )}
          {hint && <span style={{ color: "#9199A5", fontSize: 11 }}>{hint}</span>}
        </div>
        <span style={{
          color: "#A4FBCC", fontWeight: 700, fontSize: 14,
          fontFamily: "'Space Grotesk', sans-serif",
          minWidth: 28, textAlign: "right",
        }}>{value}</span>
      </div>

      <div style={{ position: "relative", height: 28, display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 4,
          background: "#081A04", borderRadius: 2,
        }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: "linear-gradient(90deg, #1B3022, #A4FBCC)",
            borderRadius: 2, transition: "width 0.15s ease",
          }} />
        </div>
        <input
          type="range" min={0} max={max} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", left: 0, right: 0,
            width: "100%", opacity: 0, height: 28, cursor: "pointer", zIndex: 1,
          }}
        />
        {/* Thumb visual */}
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 8px)`,
          width: 16, height: 16,
          background: "#A4FBCC",
          borderRadius: "50%",
          boxShadow: "0 0 8px #A4FBCC60",
          transition: "left 0.15s ease",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

// ─── Threshold Visual ────────────────────────────────────────────────────────
function ThresholdBar({ composite, max }) {
  const bands = [
    { min: 87, max: 108, score: 5, color: "#A4FBCC" },
    { min: 69, max: 86,  score: 4, color: "#6ee7b7" },
    { min: 52, max: 68,  score: 3, color: "#fbbf24" },
    { min: 35, max: 51,  score: 2, color: "#f97316" },
    { min: 0,  max: 34,  score: 1, color: "#ef4444" },
  ];

  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
        Score Threshold Map
      </p>
      <div style={{ position: "relative", height: 8, borderRadius: 4, overflow: "hidden", display: "flex" }}>
        {bands.slice().reverse().map((b) => (
          <div key={b.score} style={{
            flex: (b.max - b.min + 1),
            background: b.color + "60",
            borderRight: "1px solid #081A0430",
          }} />
        ))}
        {/* Position marker */}
        <div style={{
          position: "absolute",
          left: `${(composite / max) * 100}%`,
          top: -3, width: 2, height: 14,
          background: "#F2F2F2",
          borderRadius: 1,
          transition: "left 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 0 6px #F2F2F2",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {bands.slice().reverse().map((b) => (
          <span key={b.score} style={{ color: b.color, fontSize: 10, fontWeight: 700 }}>{b.score}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function APCalcBCCalculator() {
  const [mcq, setMcq] = useState(30);
  const [frqs, setFrqs] = useState([6, 6, 5, 5, 5, 6]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load Space Grotesk
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setMounted(true), 80);
  }, []);

  const mcqWeighted = parseFloat((mcq * 1.2).toFixed(2));
  const frqTotal = frqs.reduce((a, b) => a + b, 0);
  const composite = Math.round(mcqWeighted + frqTotal);

  // AB Subscore: MCQ ~27 of 45 (ratio), FRQs 1,2,3,6 (AB-tagged)
  const abMcqWeighted = parseFloat(((mcq * (27 / 45)) * (36 / 27)).toFixed(2));
  const abFrqTotal = frqs[0] + frqs[1] + frqs[2] + frqs[5]; // FRQ 1,2,3,6
  const abComposite = Math.round(abMcqWeighted + abFrqTotal);

  const bcScore = mapScore(composite, BC_THRESHOLDS);
  const abScore = mapScore(abComposite, AB_THRESHOLDS);

  const handleFrq = (idx, val) => {
    const next = [...frqs];
    next[idx] = val;
    setFrqs(next);
  };

  return (
    <div style={{
      fontFamily: "'Space Grotesk', 'Helvetica Neue', sans-serif",
      background: "#081A04",
      color: "#F2F2F2",
      position: "relative",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.5s ease",
    }}>
      {/* Ambient BG */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "10%", left: "5%",
          width: 400, height: 400,
          background: "radial-gradient(circle, #A4FBCC08 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "8%",
          width: 300, height: 300,
          background: "radial-gradient(circle, #1B302230 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48, animation: "fadeDown 0.6s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #1B3022, #A4FBCC22)",
              border: "1px solid #A4FBCC40",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>∫</div>
            <span style={{ color: "#9199A5", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              AP Calculus BC
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700, lineHeight: 1.1,
            margin: 0, marginBottom: 12,
            background: "linear-gradient(135deg, #F2F2F2 40%, #A4FBCC)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Score Calculator
          </h1>
          <p style={{ color: "#9199A5", fontSize: 14, lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
            Estimate your AP Calc BC composite score (1–5) and AB subscore using official CollegeBoard weighting. Thresholds based on historical exam data (±2–3 pts variance).
          </p>
        </div>

        {/* Main Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}>

          {/* ── Left Panel: Inputs ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* MCQ Section */}
            <div style={{
              background: "#1B3022",
              border: "1px solid #A4FBCC15",
              borderRadius: 16, padding: "24px 24px 20px",
              animation: "fadeUp 0.5s 0.1s ease both",
            }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: "#A4FBCC", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>
                  Section I — Multiple Choice
                </p>
                <p style={{ color: "#9199A5", fontSize: 12 }}>45 questions · No penalty for wrong answers</p>
              </div>

              <SliderInput
                label="MCQ Correct"
                hint="out of 45"
                value={mcq}
                max={45}
                onChange={setMcq}
              />

              <div style={{
                marginTop: 16, padding: "12px 16px",
                background: "#081A04", borderRadius: 10,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "#9199A5", fontSize: 12 }}>Weighted MCQ Score</span>
                <span style={{ color: "#A4FBCC", fontWeight: 700, fontSize: 16 }}>
                  <AnimatedNumber value={Math.round(mcqWeighted)} /> / 54
                </span>
              </div>
            </div>

            {/* FRQ Section */}
            <div style={{
              background: "#1B3022",
              border: "1px solid #A4FBCC15",
              borderRadius: 16, padding: "24px 24px 20px",
              animation: "fadeUp 0.5s 0.2s ease both",
            }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: "#A4FBCC", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>
                  Section II — Free Response
                </p>
                <p style={{ color: "#9199A5", fontSize: 12 }}>6 questions · 9 points each · Max 54 pts</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {FRQ_LABELS.map((frq, i) => (
                  <SliderInput
                    key={frq.id}
                    label={frq.label}
                    hint={frq.hint}
                    tag={frq.tag}
                    value={frqs[i]}
                    max={9}
                    onChange={(v) => handleFrq(i, v)}
                  />
                ))}
              </div>

              <div style={{
                marginTop: 16, padding: "12px 16px",
                background: "#081A04", borderRadius: 10,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "#9199A5", fontSize: 12 }}>Total FRQ Score</span>
                <span style={{ color: "#A4FBCC", fontWeight: 700, fontSize: 16 }}>
                  <AnimatedNumber value={frqTotal} /> / 54
                </span>
              </div>
            </div>
          </div>

          {/* ── Right Panel: Results ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Composite */}
            <div style={{
              background: "#1B3022",
              border: "1px solid #A4FBCC30",
              borderRadius: 16, padding: "24px",
              animation: "fadeUp 0.5s 0.15s ease both",
            }}>
              <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
                Composite Score
              </p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
                <span style={{
                  fontSize: 64, fontWeight: 700, lineHeight: 1,
                  color: "#A4FBCC",
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow: "0 0 40px #A4FBCC40",
                }}>
                  <AnimatedNumber value={composite} />
                </span>
                <span style={{ color: "#9199A5", fontSize: 18, marginBottom: 8 }}>/ 108</span>
              </div>
              <ThresholdBar composite={composite} max={108} />
            </div>

            {/* Score Predictions */}
            <ScoreBadge
              score={bcScore}
              label={getScoreLabel(bcScore)}
              composite={composite}
              max={108}
            />

            <ScoreBadge
              score={abScore}
              label={getScoreLabel(abScore)}
              composite={abComposite}
              max={72}
              subscript
            />

            {/* Breakdown Card */}
            <div style={{
              background: "#1B3022",
              border: "1px solid #A4FBCC15",
              borderRadius: 16, padding: "20px 24px",
              animation: "fadeUp 0.5s 0.35s ease both",
            }}>
              <p style={{ color: "#9199A5", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>
                Score Breakdown
              </p>
              {[
                { label: "MCQ Weighted", value: Math.round(mcqWeighted), max: 54, color: "#A4FBCC" },
                { label: "FRQ Total", value: frqTotal, max: 54, color: "#7dd3fc" },
                { label: "BC Composite", value: composite, max: 108, color: "#A4FBCC" },
                { label: "AB Composite", value: abComposite, max: 72, color: "#6ee7b7" },
              ].map((row) => (
                <div key={row.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ color: "#9199A5", fontSize: 12 }}>{row.label}</span>
                    <span style={{ color: row.color, fontSize: 12, fontWeight: 600 }}>
                      <AnimatedNumber value={row.value} /> / {row.max}
                    </span>
                  </div>
                  <div style={{ height: 3, background: "#081A04", borderRadius: 2 }}>
                    <div style={{
                      height: "100%",
                      width: `${(row.value / row.max) * 100}%`,
                      background: row.color + "90",
                      borderRadius: 2,
                      transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{
              background: "#000000",
              border: "1px solid #1B3022",
              borderRadius: 12, padding: "14px 16px",
            }}>
              <p style={{ color: "#9199A5", fontSize: 11, lineHeight: 1.7, margin: 0 }}>
                ⚠ Thresholds are estimates from historical data. CollegeBoard does not publish official curves. Actual scores may vary ±2–3 pts. AB subscore reflects BC exam AB-content subset only.
              </p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => { setMcq(0); setFrqs([0,0,0,0,0,0]); }}
            style={{
              background: "transparent",
              border: "1px solid #9199A540",
              color: "#9199A5",
              padding: "10px 32px",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer",
              letterSpacing: "0.06em",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "#A4FBCC60"; e.target.style.color = "#A4FBCC"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#9199A540"; e.target.style.color = "#9199A5"; }}
          >
            Reset All Scores
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        @media (max-width: 680px) {
          .main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}