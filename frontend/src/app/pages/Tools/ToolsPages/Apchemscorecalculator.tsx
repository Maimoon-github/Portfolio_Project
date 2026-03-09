// import { useState, useEffect, useRef } from "react";

// const SCORE_THRESHOLDS = [
//   { min: 80, score: 5, label: "Extremely Well Qualified", color: "#A4FBCC" },
//   { min: 70, score: 4, label: "Well Qualified",           color: "#7dd4a8" },
//   { min: 57, score: 3, label: "Qualified",                color: "#9199A5" },
//   { min: 43, score: 2, label: "Possibly Qualified",       color: "#6b7280" },
//   { min: 0,  score: 1, label: "No Recommendation",        color: "#4b5563" },
// ];

// function getAPScore(composite) {
//   return SCORE_THRESHOLDS.find((t) => composite >= t.min) || SCORE_THRESHOLDS[4];
// }

// function AnimatedNumber({ value, duration = 800 }) {
//   const [display, setDisplay] = useState(0);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     const start = display;
//     const end = value;
//     const startTime = performance.now();
//     const animate = (now) => {
//       const elapsed = now - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setDisplay(start + (end - start) * eased);
//       if (progress < 1) rafRef.current = requestAnimationFrame(animate);
//     };
//     rafRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [value]);

//   return <>{Math.round(display * 10) / 10}</>;
// }

// function ArcGauge({ composite }) {
//   const r = 70;
//   const cx = 100;
//   const cy = 100;
//   const startAngle = 200;
//   const endAngle = 340;
//   const totalArc = endAngle - startAngle;
//   const filled = (composite / 100) * totalArc;

//   const toRad = (deg) => (deg * Math.PI) / 180;
//   const arcPath = (start, sweep) => {
//     const s = toRad(start);
//     const e = toRad(start + sweep);
//     const x1 = cx + r * Math.cos(s);
//     const y1 = cy + r * Math.sin(s);
//     const x2 = cx + r * Math.cos(e);
//     const y2 = cy + r * Math.sin(e);
//     const large = sweep > 180 ? 1 : 0;
//     return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
//   };

//   const tipAngle = toRad(startAngle + filled);
//   const tipX = cx + r * Math.cos(tipAngle);
//   const tipY = cy + r * Math.sin(tipAngle);

//   const score = getAPScore(composite);

//   return (
//     <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
//       {/* Track */}
//       <path
//         d={arcPath(startAngle, totalArc)}
//         fill="none"
//         stroke="#1B3022"
//         strokeWidth="12"
//         strokeLinecap="round"
//       />
//       {/* Fill */}
//       <path
//         d={arcPath(startAngle, Math.max(0.01, filled))}
//         fill="none"
//         stroke={score.color}
//         strokeWidth="12"
//         strokeLinecap="round"
//         style={{ filter: `drop-shadow(0 0 6px ${score.color}88)`, transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
//       />
//       {/* Glow dot at tip */}
//       {composite > 0 && (
//         <circle cx={tipX} cy={tipY} r="7" fill={score.color}
//           style={{ filter: `drop-shadow(0 0 8px ${score.color})`, transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
//         />
//       )}
//       {/* Center text */}
//       <text x={cx} y={cy - 8} textAnchor="middle" fill="#F2F2F2"
//         style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700 }}>
//         <AnimatedNumber value={composite} />
//       </text>
//       <text x={cx} y={cy + 14} textAnchor="middle" fill="#9199A5"
//         style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>
//         composite
//       </text>
//       {/* AP Score badge */}
//       <circle cx={cx} cy={cy + 38} r={16} fill={score.color + "22"} stroke={score.color} strokeWidth="1.5" />
//       <text x={cx} y={cy + 44} textAnchor="middle" fill={score.color}
//         style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700 }}>
//         {getAPScore(composite).score}
//       </text>
//     </svg>
//   );
// }

// function BarSegment({ label, value, max, color, pct }) {
//   return (
//     <div className="mb-3">
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
//         <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#9199A5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
//           {label}
//         </span>
//         <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#F2F2F2", fontWeight: 600 }}>
//           {value} <span style={{ color: "#9199A5" }}>/ {max}</span>
//           <span style={{ marginLeft: 8, color }}>{pct.toFixed(1)}%</span>
//         </span>
//       </div>
//       <div style={{ height: 6, borderRadius: 99, background: "#1B3022", overflow: "hidden" }}>
//         <div style={{
//           height: "100%", borderRadius: 99, width: `${pct}%`,
//           background: `linear-gradient(90deg, ${color}88, ${color})`,
//           boxShadow: `0 0 8px ${color}66`,
//           transition: "width 0.7s cubic-bezier(0.34,1.56,0.64,1)"
//         }} />
//       </div>
//     </div>
//   );
// }

// function NumericInput({ label, sublabel, value, max, onChange }) {
//   const handleChange = (e) => {
//     const v = parseInt(e.target.value, 10);
//     if (isNaN(v)) { onChange(0); return; }
//     onChange(Math.min(max, Math.max(0, v)));
//   };

//   const pct = Math.round((value / max) * 100);

//   return (
//     <div style={{
//       background: "#0d2411", border: "1px solid #1B3022", borderRadius: 16,
//       padding: "20px 20px 16px", position: "relative", overflow: "hidden",
//       transition: "border-color 0.2s"
//     }}
//       onMouseEnter={e => e.currentTarget.style.borderColor = "#A4FBCC44"}
//       onMouseLeave={e => e.currentTarget.style.borderColor = "#1B3022"}
//     >
//       {/* bg accent */}
//       <div style={{
//         position: "absolute", top: -20, right: -20, width: 80, height: 80,
//         borderRadius: "50%", background: "#A4FBCC08", pointerEvents: "none"
//       }} />
//       <label style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.14em", color: "#9199A5", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
//         {label}
//       </label>
//       <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#9199A5", marginBottom: 12 }}>
//         {sublabel}
//       </div>
//       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//         <button onClick={() => onChange(Math.max(0, value - 1))}
//           style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #1B3022", background: "#081A04", color: "#9199A5", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
//           onMouseEnter={e => { e.currentTarget.style.background = "#1B3022"; e.currentTarget.style.color = "#A4FBCC"; }}
//           onMouseLeave={e => { e.currentTarget.style.background = "#081A04"; e.currentTarget.style.color = "#9199A5"; }}
//         >−</button>
//         <input
//           type="number" min={0} max={max} value={value} onChange={handleChange}
//           style={{
//             flex: 1, background: "transparent", border: "none", outline: "none",
//             fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700,
//             color: "#F2F2F2", textAlign: "center", width: "100%"
//           }}
//         />
//         <button onClick={() => onChange(Math.min(max, value + 1))}
//           style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #1B3022", background: "#081A04", color: "#9199A5", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
//           onMouseEnter={e => { e.currentTarget.style.background = "#1B3022"; e.currentTarget.style.color = "#A4FBCC"; }}
//           onMouseLeave={e => { e.currentTarget.style.background = "#081A04"; e.currentTarget.style.color = "#9199A5"; }}
//         >+</button>
//       </div>
//       {/* mini bar */}
//       <div style={{ height: 3, borderRadius: 99, background: "#1B3022", marginTop: 14, overflow: "hidden" }}>
//         <div style={{
//           height: "100%", borderRadius: 99, width: `${pct}%`,
//           background: "linear-gradient(90deg, #A4FBCC44, #A4FBCC)",
//           transition: "width 0.5s ease"
//         }} />
//       </div>
//       <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "#9199A5", marginTop: 4, textAlign: "right" }}>
//         {pct}% of max
//       </div>
//     </div>
//   );
// }

// const SCORE_BREAKPOINTS = [
//   { score: 5, min: 80, color: "#A4FBCC" },
//   { score: 4, min: 70, color: "#7dd4a8" },
//   { score: 3, min: 57, color: "#9199A5" },
//   { score: 2, min: 43, color: "#6b7280" },
//   { score: 1, min: 0,  color: "#4b5563" },
// ];

// export default function APChemScoreCalculator() {
//   const [mcq, setMcq] = useState(0);
//   const [frq, setFrq] = useState(0);
//   const [revealed, setRevealed] = useState(false);

//   const mcqWeighted = (mcq / 60) * 50;
//   const frqWeighted = (frq / 46) * 50;
//   const composite = Math.min(100, Math.round((mcqWeighted + frqWeighted) * 10) / 10);
//   const apResult = getAPScore(composite);

//   useEffect(() => {
//     setRevealed(false);
//     const t = setTimeout(() => setRevealed(true), 50);
//     return () => clearTimeout(t);
//   }, [mcq, frq]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         input[type=number]::-webkit-inner-spin-button,
//         input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
//         input[type=number] { -moz-appearance: textfield; }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
//         @keyframes scanline {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100vh); }
//         }
//         .card-entrance { animation: fadeUp 0.5s ease both; }
//       `}</style>

//       <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
//         {/* Grid background */}
//         <div style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
//           backgroundImage: `
//             linear-gradient(rgba(164,251,204,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(164,251,204,0.03) 1px, transparent 1px)
//           `,
//           backgroundSize: "40px 40px"
//         }} />

//         {/* Glow orbs */}
//         <div style={{ position: "fixed", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(164,251,204,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
//         <div style={{ position: "fixed", bottom: "15%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,48,34,0.6) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

//         <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

//           {/* Header */}
//           <div className="card-entrance" style={{ textAlign: "center", marginBottom: 48, animationDelay: "0ms" }}>
//             <div style={{
//               display: "inline-flex", alignItems: "center", gap: 8,
//               background: "#A4FBCC14", border: "1px solid #A4FBCC33",
//               borderRadius: 99, padding: "6px 16px", marginBottom: 20
//             }}>
//               <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A4FBCC", boxShadow: "0 0 6px #A4FBCC", animation: "pulse 2s ease infinite" }} />
//               <span style={{ fontSize: 11, color: "#A4FBCC", letterSpacing: "0.14em", textTransform: "uppercase" }}>AP Exam Estimator</span>
//             </div>

//             <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, color: "#F2F2F2", lineHeight: 1.1, marginBottom: 12 }}>
//               AP Chem Score<br />
//               <span style={{ color: "#A4FBCC", fontWeight: 300 }}>Calculator</span>
//             </h1>
//             <p style={{ fontSize: 14, color: "#9199A5", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
//               Estimate your AP Chemistry score from MCQ and FRQ raw inputs. Uses 50/50 composite weighting aligned with College Board methodology.
//             </p>
//           </div>

//           {/* Main grid */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "start" }}>

//             {/* Left — Inputs */}
//             <div className="card-entrance" style={{ animationDelay: "100ms" }}>
//               <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
//                 — Section Inputs
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//                 <NumericInput
//                   label="MCQ Correct"
//                   sublabel="Multiple Choice · 60 questions"
//                   value={mcq} max={60} onChange={setMcq}
//                 />
//                 <NumericInput
//                   label="FRQ Points"
//                   sublabel="Free Response · 3 long (10 pts) + 4 short (4 pts)"
//                   value={frq} max={46} onChange={setFrq}
//                 />
//               </div>

//               {/* Formula card */}
//               <div style={{
//                 marginTop: 16, background: "#0d2411", border: "1px solid #1B3022",
//                 borderRadius: 12, padding: "16px 18px"
//               }}>
//                 <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Composite Formula</div>
//                 <div style={{ fontFamily: "monospace", fontSize: 12, color: "#A4FBCC", lineHeight: 2 }}>
//                   <div style={{ color: "#9199A5" }}>MCQ weighted = (correct / 60) × 50</div>
//                   <div style={{ color: "#9199A5" }}>FRQ weighted = (points / 46) × 50</div>
//                   <div style={{ marginTop: 6, color: "#F2F2F2" }}>composite = MCQ + FRQ weighted</div>
//                 </div>
//               </div>
//             </div>

//             {/* Right — Results */}
//             <div className="card-entrance" style={{ animationDelay: "200ms" }}>
//               <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
//                 — Score Output
//               </div>

//               {/* Gauge card */}
//               <div style={{
//                 background: "#0d2411", border: "1px solid #1B3022",
//                 borderRadius: 16, padding: "24px 20px 20px",
//                 marginBottom: 14, position: "relative", overflow: "hidden"
//               }}>
//                 <div style={{
//                   position: "absolute", top: 0, left: 0, right: 0, height: 1,
//                   background: `linear-gradient(90deg, transparent, ${apResult.color}44, transparent)`
//                 }} />
//                 <ArcGauge composite={composite} />
//                 <div style={{ textAlign: "center", marginTop: 8 }}>
//                   <div style={{
//                     display: "inline-block",
//                     background: apResult.color + "1a",
//                     border: `1px solid ${apResult.color}55`,
//                     borderRadius: 8, padding: "6px 16px",
//                     color: apResult.color,
//                     fontSize: 12, fontWeight: 600, letterSpacing: "0.06em"
//                   }}>
//                     {apResult.label}
//                   </div>
//                 </div>
//               </div>

//               {/* Breakdown bars */}
//               <div style={{
//                 background: "#0d2411", border: "1px solid #1B3022",
//                 borderRadius: 16, padding: "18px 18px 14px", marginBottom: 14
//               }}>
//                 <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Section Breakdown</div>
//                 <BarSegment label="MCQ" value={mcq} max={60} color="#A4FBCC" pct={(mcq / 60) * 100} />
//                 <BarSegment label="FRQ" value={frq} max={46} color="#7dd4a8" pct={(frq / 46) * 100} />
//                 <div style={{ height: 1, background: "#1B3022", margin: "12px 0" }} />
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <span style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase" }}>Weighted Composite</span>
//                   <span style={{ fontSize: 20, fontWeight: 700, color: "#F2F2F2" }}>
//                     <AnimatedNumber value={composite} /><span style={{ fontSize: 12, color: "#9199A5", marginLeft: 2 }}>/100</span>
//                   </span>
//                 </div>
//               </div>

//               {/* Score scale */}
//               <div style={{
//                 background: "#0d2411", border: "1px solid #1B3022",
//                 borderRadius: 16, padding: "18px 18px 14px"
//               }}>
//                 <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Score Thresholds</div>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                   {SCORE_BREAKPOINTS.map((bp) => {
//                     const isActive = apResult.score === bp.score;
//                     return (
//                       <div key={bp.score} style={{
//                         display: "flex", alignItems: "center", gap: 10,
//                         padding: "7px 10px", borderRadius: 8,
//                         background: isActive ? bp.color + "14" : "transparent",
//                         border: `1px solid ${isActive ? bp.color + "44" : "transparent"}`,
//                         transition: "all 0.3s ease"
//                       }}>
//                         <div style={{
//                           width: 24, height: 24, borderRadius: 6,
//                           background: isActive ? bp.color : bp.color + "22",
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           fontSize: 12, fontWeight: 700,
//                           color: isActive ? "#081A04" : bp.color,
//                           transition: "all 0.3s ease", flexShrink: 0
//                         }}>
//                           {bp.score}
//                         </div>
//                         <div style={{ flex: 1 }}>
//                           <div style={{ fontSize: 11, color: isActive ? bp.color : "#9199A5" }}>
//                             {SCORE_THRESHOLDS.find(t => t.score === bp.score)?.label}
//                           </div>
//                         </div>
//                         <div style={{ fontSize: 11, color: isActive ? bp.color : "#9199A5", fontWeight: 600 }}>
//                           {bp.min === 80 ? "80+" : bp.min === 0 ? "0–42" : `${bp.min}–${SCORE_BREAKPOINTS[SCORE_BREAKPOINTS.findIndex(b => b.score === bp.score) - 1]?.min - 1}`}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Disclaimer */}
//           <div className="card-entrance" style={{ textAlign: "center", marginTop: 48, animationDelay: "300ms" }}>
//             <p style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.06em", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
//               Score thresholds are based on historical College Board curves and may vary ±3 pts annually. FRQ self-scoring may introduce variance. This tool is for practice estimation only.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }























































import { useState, useEffect, useRef } from "react";

const SCORE_THRESHOLDS = [
  { min: 80, score: 5, label: "Extremely Well Qualified", color: "#A4FBCC" },
  { min: 70, score: 4, label: "Well Qualified",           color: "#7dd4a8" },
  { min: 57, score: 3, label: "Qualified",                color: "#9199A5" },
  { min: 43, score: 2, label: "Possibly Qualified",       color: "#6b7280" },
  { min: 0,  score: 1, label: "No Recommendation",        color: "#4b5563" },
];

function getAPScore(composite) {
  return SCORE_THRESHOLDS.find((t) => composite >= t.min) || SCORE_THRESHOLDS[4];
}

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = display;
    const end = value;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <>{Math.round(display * 10) / 10}</>;
}

function ArcGauge({ composite }) {
  const r = 70;
  const cx = 100;
  const cy = 100;
  const startAngle = 200;
  const endAngle = 340;
  const totalArc = endAngle - startAngle;
  const filled = (composite / 100) * totalArc;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const arcPath = (start, sweep) => {
    const s = toRad(start);
    const e = toRad(start + sweep);
    const x1 = cx + r * Math.cos(s);
    const y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e);
    const y2 = cy + r * Math.sin(e);
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  const tipAngle = toRad(startAngle + filled);
  const tipX = cx + r * Math.cos(tipAngle);
  const tipY = cy + r * Math.sin(tipAngle);

  const score = getAPScore(composite);

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto">
      {/* Track */}
      <path
        d={arcPath(startAngle, totalArc)}
        fill="none"
        stroke="#1B3022"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d={arcPath(startAngle, Math.max(0.01, filled))}
        fill="none"
        stroke={score.color}
        strokeWidth="12"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${score.color}88)`, transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
      />
      {/* Glow dot at tip */}
      {composite > 0 && (
        <circle cx={tipX} cy={tipY} r="7" fill={score.color}
          style={{ filter: `drop-shadow(0 0 8px ${score.color})`, transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      )}
      {/* Center text */}
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#F2F2F2"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700 }}>
        <AnimatedNumber value={composite} />
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#9199A5"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        composite
      </text>
      {/* AP Score badge */}
      <circle cx={cx} cy={cy + 38} r={16} fill={score.color + "22"} stroke={score.color} strokeWidth="1.5" />
      <text x={cx} y={cy + 44} textAnchor="middle" fill={score.color}
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700 }}>
        {getAPScore(composite).score}
      </text>
    </svg>
  );
}

function BarSegment({ label, value, max, color, pct }) {
  return (
    <div className="mb-3">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#9199A5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#F2F2F2", fontWeight: 600 }}>
          {value} <span style={{ color: "#9199A5" }}>/ {max}</span>
          <span style={{ marginLeft: 8, color }}>{pct.toFixed(1)}%</span>
        </span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "#1B3022", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99, width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}66`,
          transition: "width 0.7s cubic-bezier(0.34,1.56,0.64,1)"
        }} />
      </div>
    </div>
  );
}

function NumericInput({ label, sublabel, value, max, onChange }) {
  const handleChange = (e) => {
    const v = parseInt(e.target.value, 10);
    if (isNaN(v)) { onChange(0); return; }
    onChange(Math.min(max, Math.max(0, v)));
  };

  const pct = Math.round((value / max) * 100);

  return (
    <div style={{
      background: "#0d2411", border: "1px solid #1B3022", borderRadius: 16,
      padding: "20px 20px 16px", position: "relative", overflow: "hidden",
      transition: "border-color 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#A4FBCC44"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#1B3022"}
    >
      {/* bg accent */}
      <div style={{
        position: "absolute", top: -20, right: -20, width: 80, height: 80,
        borderRadius: "50%", background: "#A4FBCC08", pointerEvents: "none"
      }} />
      <label style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: "0.14em", color: "#9199A5", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
        {label}
      </label>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#9199A5", marginBottom: 12 }}>
        {sublabel}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => onChange(Math.max(0, value - 1))}
          style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #1B3022", background: "#081A04", color: "#9199A5", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1B3022"; e.currentTarget.style.color = "#A4FBCC"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#081A04"; e.currentTarget.style.color = "#9199A5"; }}
        >−</button>
        <input
          type="number" min={0} max={max} value={value} onChange={handleChange}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700,
            color: "#F2F2F2", textAlign: "center", width: "100%"
          }}
        />
        <button onClick={() => onChange(Math.min(max, value + 1))}
          style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #1B3022", background: "#081A04", color: "#9199A5", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s", flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1B3022"; e.currentTarget.style.color = "#A4FBCC"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#081A04"; e.currentTarget.style.color = "#9199A5"; }}
        >+</button>
      </div>
      {/* mini bar */}
      <div style={{ height: 3, borderRadius: 99, background: "#1B3022", marginTop: 14, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99, width: `${pct}%`,
          background: "linear-gradient(90deg, #A4FBCC44, #A4FBCC)",
          transition: "width 0.5s ease"
        }} />
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, color: "#9199A5", marginTop: 4, textAlign: "right" }}>
        {pct}% of max
      </div>
    </div>
  );
}

const SCORE_BREAKPOINTS = [
  { score: 5, min: 80, color: "#A4FBCC" },
  { score: 4, min: 70, color: "#7dd4a8" },
  { score: 3, min: 57, color: "#9199A5" },
  { score: 2, min: 43, color: "#6b7280" },
  { score: 1, min: 0,  color: "#4b5563" },
];

export default function APChemScoreCalculator() {
  const [mcq, setMcq] = useState(0);
  const [frq, setFrq] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const mcqWeighted = (mcq / 60) * 50;
  const frqWeighted = (frq / 46) * 50;
  const composite = Math.min(100, Math.round((mcqWeighted + frqWeighted) * 10) / 10);
  const apResult = getAPScore(composite);

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(t);
  }, [mcq, frq]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        input[type=number] { -moz-appearance: textfield; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .card-entrance { animation: fadeUp 0.5s ease both; }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden", background: "#081A04" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(164,251,204,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(164,251,204,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }} />

        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(164,251,204,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(27,48,34,0.6) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div className="card-entrance" style={{ textAlign: "center", marginBottom: 48, animationDelay: "0ms" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#A4FBCC14", border: "1px solid #A4FBCC33",
              borderRadius: 99, padding: "6px 16px", marginBottom: 20
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A4FBCC", boxShadow: "0 0 6px #A4FBCC", animation: "pulse 2s ease infinite" }} />
              <span style={{ fontSize: 11, color: "#A4FBCC", letterSpacing: "0.14em", textTransform: "uppercase" }}>AP Exam Estimator</span>
            </div>

            <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, color: "#F2F2F2", lineHeight: 1.1, marginBottom: 12 }}>
              AP Chem Score<br />
              <span style={{ color: "#A4FBCC", fontWeight: 300 }}>Calculator</span>
            </h1>
            <p style={{ fontSize: 14, color: "#9199A5", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
              Estimate your AP Chemistry score from MCQ and FRQ raw inputs. Uses 50/50 composite weighting aligned with College Board methodology.
            </p>
          </div>

          {/* Main grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "start" }}>

            {/* Left — Inputs */}
            <div className="card-entrance" style={{ animationDelay: "100ms" }}>
              <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                — Section Inputs
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <NumericInput
                  label="MCQ Correct"
                  sublabel="Multiple Choice · 60 questions"
                  value={mcq} max={60} onChange={setMcq}
                />
                <NumericInput
                  label="FRQ Points"
                  sublabel="Free Response · 3 long (10 pts) + 4 short (4 pts)"
                  value={frq} max={46} onChange={setFrq}
                />
              </div>

              {/* Formula card */}
              <div style={{
                marginTop: 16, background: "#0d2411", border: "1px solid #1B3022",
                borderRadius: 12, padding: "16px 18px"
              }}>
                <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Composite Formula</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "#A4FBCC", lineHeight: 2 }}>
                  <div style={{ color: "#9199A5" }}>MCQ weighted = (correct / 60) × 50</div>
                  <div style={{ color: "#9199A5" }}>FRQ weighted = (points / 46) × 50</div>
                  <div style={{ marginTop: 6, color: "#F2F2F2" }}>composite = MCQ + FRQ weighted</div>
                </div>
              </div>
            </div>

            {/* Right — Results */}
            <div className="card-entrance" style={{ animationDelay: "200ms" }}>
              <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
                — Score Output
              </div>

              {/* Gauge card */}
              <div style={{
                background: "#0d2411", border: "1px solid #1B3022",
                borderRadius: 16, padding: "24px 20px 20px",
                marginBottom: 14, position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${apResult.color}44, transparent)`
                }} />
                <ArcGauge composite={composite} />
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <div style={{
                    display: "inline-block",
                    background: apResult.color + "1a",
                    border: `1px solid ${apResult.color}55`,
                    borderRadius: 8, padding: "6px 16px",
                    color: apResult.color,
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.06em"
                  }}>
                    {apResult.label}
                  </div>
                </div>
              </div>

              {/* Breakdown bars */}
              <div style={{
                background: "#0d2411", border: "1px solid #1B3022",
                borderRadius: 16, padding: "18px 18px 14px", marginBottom: 14
              }}>
                <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Section Breakdown</div>
                <BarSegment label="MCQ" value={mcq} max={60} color="#A4FBCC" pct={(mcq / 60) * 100} />
                <BarSegment label="FRQ" value={frq} max={46} color="#7dd4a8" pct={(frq / 46) * 100} />
                <div style={{ height: 1, background: "#1B3022", margin: "12px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase" }}>Weighted Composite</span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: "#F2F2F2" }}>
                    <AnimatedNumber value={composite} /><span style={{ fontSize: 12, color: "#9199A5", marginLeft: 2 }}>/100</span>
                  </span>
                </div>
              </div>

              {/* Score scale */}
              <div style={{
                background: "#0d2411", border: "1px solid #1B3022",
                borderRadius: 16, padding: "18px 18px 14px"
              }}>
                <div style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Score Thresholds</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {SCORE_BREAKPOINTS.map((bp) => {
                    const isActive = apResult.score === bp.score;
                    return (
                      <div key={bp.score} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "7px 10px", borderRadius: 8,
                        background: isActive ? bp.color + "14" : "transparent",
                        border: `1px solid ${isActive ? bp.color + "44" : "transparent"}`,
                        transition: "all 0.3s ease"
                      }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 6,
                          background: isActive ? bp.color : bp.color + "22",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700,
                          color: isActive ? "#081A04" : bp.color,
                          transition: "all 0.3s ease", flexShrink: 0
                        }}>
                          {bp.score}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11, color: isActive ? bp.color : "#9199A5" }}>
                            {SCORE_THRESHOLDS.find(t => t.score === bp.score)?.label}
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: isActive ? bp.color : "#9199A5", fontWeight: 600 }}>
                          {bp.min === 80 ? "80+" : bp.min === 0 ? "0–42" : `${bp.min}–${SCORE_BREAKPOINTS[SCORE_BREAKPOINTS.findIndex(b => b.score === bp.score) - 1]?.min - 1}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="card-entrance" style={{ textAlign: "center", marginTop: 48, animationDelay: "300ms" }}>
            <p style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.06em", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
              Score thresholds are based on historical College Board curves and may vary ±3 pts annually. FRQ self-scoring may introduce variance. This tool is for practice estimation only.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}