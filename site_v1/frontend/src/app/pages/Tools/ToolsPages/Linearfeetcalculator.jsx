// import { useState, useCallback, useEffect, useRef } from "react";

// // ── Color tokens ──────────────────────────────────────────────────────────────
// // Black Forest #081A04 | Neo-Mint #A4FBCC | Steel Grey #9199A5
// // Alabaster #F2F2F2   | Deep Moss #1B3022  | True Black #000000

// const FONT_URL =
//   "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";

// // ── Unique ID helper ──────────────────────────────────────────────────────────
// let _id = 0;
// const uid = () => `seg_${++_id}`;

// // ── Default segment ───────────────────────────────────────────────────────────
// const newSeg = () => ({ id: uid(), length: "", unit: "ft", qty: "1" });

// // ── Conversion ────────────────────────────────────────────────────────────────
// const toFt = (val, unit) => {
//   const n = parseFloat(val);
//   if (isNaN(n) || n < 0) return 0;
//   return unit === "in" ? n / 12 : n;
// };

// // ── SVG ruler illustration ────────────────────────────────────────────────────
// function RulerIllustration() {
//   return (
//     <svg viewBox="0 0 320 56" fill="none" xmlns="http://www.w3.org/2000/svg"
//       style={{ width: "100%", maxWidth: 320, opacity: 0.18 }}>
//       <rect x="1" y="16" width="318" height="24" rx="4"
//         stroke="#A4FBCC" strokeWidth="1.5" fill="#1B3022" />
//       {Array.from({ length: 33 }).map((_, i) => {
//         const x = 8 + i * 9.5;
//         const isMajor = i % 4 === 0;
//         return (
//           <line key={i} x1={x} y1="16" x2={x} y2={isMajor ? "8" : "12"}
//             stroke="#A4FBCC" strokeWidth={isMajor ? 1.5 : 0.75} />
//         );
//       })}
//       {Array.from({ length: 9 }).map((_, i) => (
//         <text key={i} x={8 + i * 38} y="48" fontSize="7"
//           fill="#A4FBCC" fontFamily="Space Grotesk" textAnchor="middle">
//           {i}′
//         </text>
//       ))}
//     </svg>
//   );
// }

// // ── Animated counter ──────────────────────────────────────────────────────────
// function AnimatedNumber({ value, decimals = 2 }) {
//   const [display, setDisplay] = useState(0);
//   const ref = useRef(null);

//   useEffect(() => {
//     if (ref.current) cancelAnimationFrame(ref.current);
//     const start = display;
//     const end = value;
//     const duration = 500;
//     const startTime = performance.now();

//     const tick = (now) => {
//       const elapsed = now - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const ease = 1 - Math.pow(1 - progress, 3);
//       setDisplay(start + (end - start) * ease);
//       if (progress < 1) ref.current = requestAnimationFrame(tick);
//     };
//     ref.current = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(ref.current);
//   }, [value]);

//   return <>{display.toFixed(decimals)}</>;
// }

// // ── Unit toggle ───────────────────────────────────────────────────────────────
// function UnitToggle({ value, onChange }) {
//   return (
//     <div style={{
//       display: "flex", borderRadius: 8,
//       border: "1px solid #1B3022", overflow: "hidden", flexShrink: 0
//     }}>
//       {["ft", "in"].map(u => (
//         <button key={u} onClick={() => onChange(u)}
//           style={{
//             padding: "0 14px", height: 42, fontSize: 13, fontWeight: 600,
//             fontFamily: "Space Grotesk, sans-serif", cursor: "pointer",
//             border: "none", transition: "all .2s",
//             background: value === u ? "#A4FBCC" : "#0D2510",
//             color: value === u ? "#081A04" : "#9199A5",
//             letterSpacing: "0.03em",
//           }}>
//           {u}
//         </button>
//       ))}
//     </div>
//   );
// }

// // ── Segment row ───────────────────────────────────────────────────────────────
// function SegmentRow({ seg, index, onChange, onRemove, canRemove, animIn }) {
//   return (
//     <div style={{
//       display: "flex", gap: 10, alignItems: "center",
//       animation: animIn ? "slideIn .28s cubic-bezier(.4,0,.2,1) both" : "none",
//     }}>
//       {/* index badge */}
//       <div style={{
//         width: 28, height: 28, borderRadius: "50%",
//         background: "#1B3022", border: "1px solid #2A4530",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         fontSize: 11, fontWeight: 600, color: "#9199A5", flexShrink: 0,
//       }}>{index + 1}</div>

//       {/* length */}
//       <input
//         type="number" min="0" step="0.01"
//         placeholder="Length"
//         value={seg.length}
//         onChange={e => onChange(seg.id, "length", e.target.value)}
//         style={inputStyle}
//       />

//       {/* unit */}
//       <UnitToggle value={seg.unit} onChange={v => onChange(seg.id, "unit", v)} />

//       {/* qty */}
//       <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
//         <span style={{ fontSize: 12, color: "#9199A5", fontWeight: 500 }}>×</span>
//         <input
//           type="number" min="1" step="1"
//           placeholder="Qty"
//           value={seg.qty}
//           onChange={e => onChange(seg.id, "qty", e.target.value)}
//           style={{ ...inputStyle, width: 72 }}
//         />
//       </div>

//       {/* remove */}
//       {canRemove && (
//         <button onClick={() => onRemove(seg.id)} style={{
//           width: 32, height: 32, borderRadius: 8, border: "1px solid #1B3022",
//           background: "transparent", cursor: "pointer", color: "#9199A5",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 16, flexShrink: 0, transition: "all .2s",
//         }}
//           onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF6B6B"; e.currentTarget.style.color = "#FF6B6B"; }}
//           onMouseLeave={e => { e.currentTarget.style.borderColor = "#1B3022"; e.currentTarget.style.color = "#9199A5"; }}
//         >×</button>
//       )}
//     </div>
//   );
// }

// const inputStyle = {
//   flex: 1, minWidth: 0, height: 42, padding: "0 14px",
//   background: "#0D2510", border: "1px solid #1B3022",
//   borderRadius: 8, color: "#F2F2F2", fontSize: 14,
//   fontFamily: "Space Grotesk, sans-serif", outline: "none",
//   transition: "border-color .2s",
// };

// // ── Optional dimension input ──────────────────────────────────────────────────
// function DimInput({ label, value, unit, onValue, onUnit }) {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//       <label style={{ fontSize: 12, fontWeight: 500, color: "#9199A5", letterSpacing: "0.06em", textTransform: "uppercase" }}>
//         {label}
//       </label>
//       <div style={{ display: "flex", gap: 8 }}>
//         <input type="number" min="0" step="0.01" placeholder="—"
//           value={value} onChange={e => onValue(e.target.value)}
//           style={{ ...inputStyle, flex: 1 }} />
//         <UnitToggle value={unit} onChange={onUnit} />
//       </div>
//     </div>
//   );
// }

// // ── Result card ───────────────────────────────────────────────────────────────
// function ResultCard({ label, value, unit, highlight, sub }) {
//   return (
//     <div style={{
//       background: highlight ? "rgba(164,251,204,0.06)" : "#0D2510",
//       border: `1px solid ${highlight ? "#A4FBCC" : "#1B3022"}`,
//       borderRadius: 12, padding: "20px 24px",
//       transition: "all .3s",
//       position: "relative", overflow: "hidden",
//     }}>
//       {highlight && (
//         <div style={{
//           position: "absolute", top: 0, left: 0, right: 0, height: 2,
//           background: "linear-gradient(90deg, transparent, #A4FBCC, transparent)",
//         }} />
//       )}
//       <div style={{ fontSize: 11, fontWeight: 600, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
//         {label}
//       </div>
//       <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
//         <span style={{ fontSize: 32, fontWeight: 700, color: highlight ? "#A4FBCC" : "#F2F2F2", lineHeight: 1 }}>
//           <AnimatedNumber value={value} />
//         </span>
//         <span style={{ fontSize: 14, color: "#9199A5", fontWeight: 500 }}>{unit}</span>
//       </div>
//       {sub && <div style={{ fontSize: 12, color: "#9199A5", marginTop: 6 }}>{sub}</div>}
//     </div>
//   );
// }

// // ── Main component ────────────────────────────────────────────────────────────
// export default function LinearFeetCalculator() {
//   const [segments, setSegments] = useState([newSeg()]);
//   const [newSegIds, setNewSegIds] = useState(new Set());
//   const [width, setWidth] = useState("");
//   const [widthUnit, setWidthUnit] = useState("ft");
//   const [height, setHeight] = useState("");
//   const [heightUnit, setHeightUnit] = useState("ft");
//   const [showOptional, setShowOptional] = useState(false);

//   // ── Segment CRUD ────────────────────────────────────────────────────────────
//   const addSegment = useCallback(() => {
//     const s = newSeg();
//     setNewSegIds(prev => new Set([...prev, s.id]));
//     setSegments(prev => [...prev, s]);
//     setTimeout(() => setNewSegIds(prev => { const n = new Set(prev); n.delete(s.id); return n; }), 400);
//   }, []);

//   const updateSegment = useCallback((id, field, val) => {
//     setSegments(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
//   }, []);

//   const removeSegment = useCallback((id) => {
//     setSegments(prev => prev.filter(s => s.id !== id));
//   }, []);

//   const clearAll = () => {
//     setSegments([newSeg()]);
//     setWidth(""); setHeight("");
//   };

//   // ── Calculation ─────────────────────────────────────────────────────────────
//   const totalLinearFt = segments.reduce((acc, s) => {
//     const qty = parseInt(s.qty) || 1;
//     return acc + toFt(s.length, s.unit) * qty;
//   }, 0);

//   const widthFt = toFt(width, widthUnit);
//   const heightFt = toFt(height, heightUnit);
//   const sqFt = widthFt > 0 ? totalLinearFt * widthFt : 0;
//   const cuFt = widthFt > 0 && heightFt > 0 ? sqFt * heightFt : 0;

//   // ── Perimeter helper ────────────────────────────────────────────────────────
//   const perimeter = widthFt > 0 ? 2 * (totalLinearFt + widthFt) : 0;

//   return (
//     <>
//       <style>{`
//         @import url('${FONT_URL}');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #081A04; }
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: .4; }
//           50% { opacity: .9; }
//         }
//         input[type=number]::-webkit-inner-spin-button,
//         input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
//         input[type=number] { -moz-appearance: textfield; }
//         input:focus { border-color: #A4FBCC !important; box-shadow: 0 0 0 3px rgba(164,251,204,0.08); }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #081A04; }
//         ::-webkit-scrollbar-thumb { background: #1B3022; border-radius: 4px; }
//       `}</style>

//       <div style={{
//         minHeight: "100vh", background: "#081A04",
//         fontFamily: "Space Grotesk, sans-serif",
//         color: "#F2F2F2", padding: "40px 20px 80px",
//       }}>
//         <div style={{ maxWidth: 740, margin: "0 auto" }}>

//           {/* ── Header ───────────────────────────────────────────────────────── */}
//           <div style={{ animation: "fadeUp .5s cubic-bezier(.4,0,.2,1) both", marginBottom: 48 }}>
//             <RulerIllustration />
//             <div style={{ marginTop: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
//               <div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
//                   <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A4FBCC", animation: "pulse 2s ease-in-out infinite" }} />
//                   <span style={{ fontSize: 11, fontWeight: 600, color: "#A4FBCC", letterSpacing: "0.14em", textTransform: "uppercase" }}>
//                     Measurement Tool
//                   </span>
//                 </div>
//                 <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, color: "#F2F2F2" }}>
//                   Linear Feet<br />
//                   <span style={{ color: "#A4FBCC" }}>Calculator</span>
//                 </h1>
//                 <p style={{ marginTop: 12, fontSize: 14, color: "#9199A5", lineHeight: 1.6, maxWidth: 420 }}>
//                   Estimate material lengths for molding, fencing, flooring &amp; more.
//                   Add segments, set units, get instant totals.
//                 </p>
//               </div>

//               {/* Stats chip */}
//               <div style={{
//                 background: "#0D2510", border: "1px solid #1B3022",
//                 borderRadius: 12, padding: "16px 20px", minWidth: 160,
//               }}>
//                 <div style={{ fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
//                   Segments
//                 </div>
//                 <div style={{ fontSize: 28, fontWeight: 700, color: "#A4FBCC" }}>{segments.length}</div>
//                 <div style={{ fontSize: 12, color: "#9199A5", marginTop: 2 }}>active rows</div>
//               </div>
//             </div>
//           </div>

//           {/* ── Segments panel ────────────────────────────────────────────────── */}
//           <div style={{
//             background: "#0B1F0E", border: "1px solid #1B3022",
//             borderRadius: 16, padding: "28px 24px",
//             animation: "fadeUp .5s .1s cubic-bezier(.4,0,.2,1) both",
//             marginBottom: 16,
//           }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
//               <h2 style={{ fontSize: 15, fontWeight: 600, color: "#F2F2F2" }}>Length Segments</h2>
//               <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                 <button onClick={clearAll} style={ghostBtn}>Clear all</button>
//                 <button onClick={addSegment} style={mintBtn}>+ Add segment</button>
//               </div>
//             </div>

//             {/* Column headers */}
//             <div style={{ display: "flex", gap: 10, marginBottom: 12, paddingLeft: 38 }}>
//               <span style={{ flex: 1, fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Length</span>
//               <span style={{ width: 80, fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Unit</span>
//               <span style={{ width: 90, fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Qty</span>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {segments.map((seg, i) => (
//                 <SegmentRow
//                   key={seg.id}
//                   seg={seg}
//                   index={i}
//                   onChange={updateSegment}
//                   onRemove={removeSegment}
//                   canRemove={segments.length > 1}
//                   animIn={newSegIds.has(seg.id)}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* ── Optional dimensions ───────────────────────────────────────────── */}
//           <div style={{
//             background: "#0B1F0E", border: "1px solid #1B3022",
//             borderRadius: 16, overflow: "hidden",
//             animation: "fadeUp .5s .2s cubic-bezier(.4,0,.2,1) both",
//             marginBottom: 24,
//           }}>
//             <button onClick={() => setShowOptional(p => !p)} style={{
//               width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
//               padding: "18px 24px", background: "transparent", border: "none",
//               cursor: "pointer", color: "#F2F2F2",
//             }}>
//               <span style={{ fontSize: 15, fontWeight: 600 }}>Optional Dimensions</span>
//               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                 <span style={{ fontSize: 12, color: "#9199A5" }}>Width &amp; Height for sq/cu ft</span>
//                 <span style={{ fontSize: 18, color: "#A4FBCC", transition: "transform .25s", transform: showOptional ? "rotate(180deg)" : "rotate(0)" }}>⌄</span>
//               </div>
//             </button>
//             {showOptional && (
//               <div style={{ padding: "0 24px 24px", borderTop: "1px solid #1B3022", paddingTop: 20 }}>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//                   <DimInput label="Width" value={width} unit={widthUnit}
//                     onValue={setWidth} onUnit={setWidthUnit} />
//                   <DimInput label="Height" value={height} unit={heightUnit}
//                     onValue={setHeight} onUnit={setHeightUnit} />
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ── Results ───────────────────────────────────────────────────────── */}
//           <div style={{ animation: "fadeUp .5s .3s cubic-bezier(.4,0,.2,1) both" }}>
//             <h2 style={{ fontSize: 13, fontWeight: 600, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
//               Results
//             </h2>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
//               <ResultCard
//                 label="Total Linear Feet"
//                 value={totalLinearFt}
//                 unit="lin ft"
//                 highlight
//                 sub={`≈ ${(totalLinearFt * 12).toFixed(1)} inches`}
//               />
//               {sqFt > 0 && (
//                 <ResultCard label="Square Feet" value={sqFt} unit="sq ft"
//                   sub={`${totalLinearFt.toFixed(2)} ft × ${widthFt.toFixed(2)} ft`} />
//               )}
//               {cuFt > 0 && (
//                 <ResultCard label="Cubic Feet" value={cuFt} unit="cu ft"
//                   sub={`× ${heightFt.toFixed(2)} ft height`} />
//               )}
//               {widthFt > 0 && (
//                 <ResultCard label="Perimeter" value={perimeter} unit="ft"
//                   sub="2 × (L + W)" />
//               )}
//             </div>
//           </div>

//           {/* ── Formula note ──────────────────────────────────────────────────── */}
//           <div style={{
//             marginTop: 28, padding: "18px 24px",
//             background: "rgba(164,251,204,0.03)",
//             border: "1px solid rgba(164,251,204,0.1)",
//             borderRadius: 12,
//             animation: "fadeUp .5s .4s cubic-bezier(.4,0,.2,1) both",
//           }}>
//             <div style={{ fontSize: 12, fontWeight: 600, color: "#A4FBCC", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
//               Formula Reference
//             </div>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
//               {[
//                 ["Inches → Feet", "length_ft = inches ÷ 12"],
//                 ["Segment total", "Σ(length_ft × qty)"],
//                 ["Square feet", "linear_ft × width_ft"],
//                 ["Perimeter", "2 × (L + W)"],
//               ].map(([k, v]) => (
//                 <div key={k}>
//                   <span style={{ fontSize: 11, color: "#9199A5" }}>{k}: </span>
//                   <span style={{ fontSize: 12, fontWeight: 600, color: "#F2F2F2", fontVariantNumeric: "tabular-nums" }}>{v}</span>
//                 </div>
//               ))}
//             </div>
//             <div style={{ marginTop: 10, fontSize: 11, color: "#9199A5" }}>
//               ⚠ Assumes straight lines. Add ±10% buffer for real-world material waste.
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// // ── Button styles ─────────────────────────────────────────────────────────────
// const mintBtn = {
//   padding: "0 18px", height: 36, borderRadius: 8,
//   background: "#A4FBCC", border: "none", cursor: "pointer",
//   color: "#081A04", fontSize: 13, fontWeight: 700,
//   fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.02em",
//   transition: "opacity .2s, transform .1s",
// };
// const ghostBtn = {
//   padding: "0 16px", height: 36, borderRadius: 8,
//   background: "transparent", border: "1px solid #1B3022",
//   cursor: "pointer", color: "#9199A5", fontSize: 13, fontWeight: 500,
//   fontFamily: "Space Grotesk, sans-serif", transition: "border-color .2s, color .2s",
// };























































import { useState, useCallback, useEffect, useRef } from "react";

// ── Color tokens ──────────────────────────────────────────────────────────────
// Black Forest #081A04 | Neo-Mint #A4FBCC | Steel Grey #9199A5
// Alabaster #F2F2F2   | Deep Moss #1B3022  | True Black #000000

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";

// ── Unique ID helper ──────────────────────────────────────────────────────────
let _id = 0;
const uid = () => `seg_${++_id}`;

// ── Default segment ───────────────────────────────────────────────────────────
const newSeg = () => ({ id: uid(), length: "", unit: "ft", qty: "1" });

// ── Conversion ────────────────────────────────────────────────────────────────
const toFt = (val, unit) => {
  const n = parseFloat(val);
  if (isNaN(n) || n < 0) return 0;
  return unit === "in" ? n / 12 : n;
};

// ── SVG ruler illustration ────────────────────────────────────────────────────
function RulerIllustration() {
  return (
    <svg viewBox="0 0 320 56" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 320, opacity: 0.18 }}>
      <rect x="1" y="16" width="318" height="24" rx="4"
        stroke="#A4FBCC" strokeWidth="1.5" fill="#1B3022" />
      {Array.from({ length: 33 }).map((_, i) => {
        const x = 8 + i * 9.5;
        const isMajor = i % 4 === 0;
        return (
          <line key={i} x1={x} y1="16" x2={x} y2={isMajor ? "8" : "12"}
            stroke="#A4FBCC" strokeWidth={isMajor ? 1.5 : 0.75} />
        );
      })}
      {Array.from({ length: 9 }).map((_, i) => (
        <text key={i} x={8 + i * 38} y="48" fontSize="7"
          fill="#A4FBCC" fontFamily="Space Grotesk" textAnchor="middle">
          {i}′
        </text>
      ))}
    </svg>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, decimals = 2 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) cancelAnimationFrame(ref.current);
    const start = display;
    const end = value;
    const duration = 500;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + (end - start) * ease);
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);

  return <>{display.toFixed(decimals)}</>;
}

// ── Unit toggle ───────────────────────────────────────────────────────────────
function UnitToggle({ value, onChange }) {
  return (
    <div style={{
      display: "flex", borderRadius: 8,
      border: "1px solid #1B3022", overflow: "hidden", flexShrink: 0
    }}>
      {["ft", "in"].map(u => (
        <button key={u} onClick={() => onChange(u)}
          style={{
            padding: "0 14px", height: 42, fontSize: 13, fontWeight: 600,
            fontFamily: "Space Grotesk, sans-serif", cursor: "pointer",
            border: "none", transition: "all .2s",
            background: value === u ? "#A4FBCC" : "#0D2510",
            color: value === u ? "#081A04" : "#9199A5",
            letterSpacing: "0.03em",
          }}>
          {u}
        </button>
      ))}
    </div>
  );
}

// ── Segment row ───────────────────────────────────────────────────────────────
function SegmentRow({ seg, index, onChange, onRemove, canRemove, animIn }) {
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "center",
      animation: animIn ? "slideIn .28s cubic-bezier(.4,0,.2,1) both" : "none",
    }}>
      {/* index badge */}
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: "#1B3022", border: "1px solid #2A4530",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 600, color: "#9199A5", flexShrink: 0,
      }}>{index + 1}</div>

      {/* length */}
      <input
        type="number" min="0" step="0.01"
        placeholder="Length"
        value={seg.length}
        onChange={e => onChange(seg.id, "length", e.target.value)}
        style={inputStyle}
      />

      {/* unit */}
      <UnitToggle value={seg.unit} onChange={v => onChange(seg.id, "unit", v)} />

      {/* qty */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: "#9199A5", fontWeight: 500 }}>×</span>
        <input
          type="number" min="1" step="1"
          placeholder="Qty"
          value={seg.qty}
          onChange={e => onChange(seg.id, "qty", e.target.value)}
          style={{ ...inputStyle, width: 72 }}
        />
      </div>

      {/* remove */}
      {canRemove && (
        <button onClick={() => onRemove(seg.id)} style={{
          width: 32, height: 32, borderRadius: 8, border: "1px solid #1B3022",
          background: "transparent", cursor: "pointer", color: "#9199A5",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, flexShrink: 0, transition: "all .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#FF6B6B"; e.currentTarget.style.color = "#FF6B6B"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#1B3022"; e.currentTarget.style.color = "#9199A5"; }}
        >×</button>
      )}
    </div>
  );
}

const inputStyle = {
  flex: 1, minWidth: 0, height: 42, padding: "0 14px",
  background: "#0D2510", border: "1px solid #1B3022",
  borderRadius: 8, color: "#F2F2F2", fontSize: 14,
  fontFamily: "Space Grotesk, sans-serif", outline: "none",
  transition: "border-color .2s",
};

// ── Optional dimension input ──────────────────────────────────────────────────
function DimInput({ label, value, unit, onValue, onUnit }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: "#9199A5", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <input type="number" min="0" step="0.01" placeholder="—"
          value={value} onChange={e => onValue(e.target.value)}
          style={{ ...inputStyle, flex: 1 }} />
        <UnitToggle value={unit} onChange={onUnit} />
      </div>
    </div>
  );
}

// ── Result card ───────────────────────────────────────────────────────────────
function ResultCard({ label, value, unit, highlight, sub }) {
  return (
    <div style={{
      background: highlight ? "rgba(164,251,204,0.06)" : "#0D2510",
      border: `1px solid ${highlight ? "#A4FBCC" : "#1B3022"}`,
      borderRadius: 12, padding: "20px 24px",
      transition: "all .3s",
      position: "relative", overflow: "hidden",
    }}>
      {highlight && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, #A4FBCC, transparent)",
        }} />
      )}
      <div style={{ fontSize: 11, fontWeight: 600, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: highlight ? "#A4FBCC" : "#F2F2F2", lineHeight: 1 }}>
          <AnimatedNumber value={value} />
        </span>
        <span style={{ fontSize: 14, color: "#9199A5", fontWeight: 500 }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: 12, color: "#9199A5", marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LinearFeetCalculator() {
  const [segments, setSegments] = useState([newSeg()]);
  const [newSegIds, setNewSegIds] = useState(new Set());
  const [width, setWidth] = useState("");
  const [widthUnit, setWidthUnit] = useState("ft");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("ft");
  const [showOptional, setShowOptional] = useState(false);

  // ── Segment CRUD ────────────────────────────────────────────────────────────
  const addSegment = useCallback(() => {
    const s = newSeg();
    setNewSegIds(prev => new Set([...prev, s.id]));
    setSegments(prev => [...prev, s]);
    setTimeout(() => setNewSegIds(prev => { const n = new Set(prev); n.delete(s.id); return n; }), 400);
  }, []);

  const updateSegment = useCallback((id, field, val) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  }, []);

  const removeSegment = useCallback((id) => {
    setSegments(prev => prev.filter(s => s.id !== id));
  }, []);

  const clearAll = () => {
    setSegments([newSeg()]);
    setWidth(""); setHeight("");
  };

  // ── Calculation ─────────────────────────────────────────────────────────────
  const totalLinearFt = segments.reduce((acc, s) => {
    const qty = parseInt(s.qty) || 1;
    return acc + toFt(s.length, s.unit) * qty;
  }, 0);

  const widthFt = toFt(width, widthUnit);
  const heightFt = toFt(height, heightUnit);
  const sqFt = widthFt > 0 ? totalLinearFt * widthFt : 0;
  const cuFt = widthFt > 0 && heightFt > 0 ? sqFt * heightFt : 0;

  // ── Perimeter helper ────────────────────────────────────────────────────────
  const perimeter = widthFt > 0 ? 2 * (totalLinearFt + widthFt) : 0;

  return (
    <>
      <style>{`
        @import url('${FONT_URL}');
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: .4; }
          50% { opacity: .9; }
        }
        .lf-root input[type=number]::-webkit-inner-spin-button,
        .lf-root input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .lf-root input[type=number] { -moz-appearance: textfield; }
        .lf-root input:focus { border-color: #A4FBCC !important; box-shadow: 0 0 0 3px rgba(164,251,204,0.08); }
        .lf-root::-webkit-scrollbar { width: 4px; }
        .lf-root::-webkit-scrollbar-track { background: #081A04; }
        .lf-root::-webkit-scrollbar-thumb { background: #1B3022; border-radius: 4px; }
      `}</style>

      <div className="lf-root" style={{
        background: "#081A04",
        fontFamily: "Space Grotesk, sans-serif",
        color: "#F2F2F2", padding: "40px 20px 80px",
      }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>

          {/* ── Header ───────────────────────────────────────────────────────── */}
          <div style={{ animation: "fadeUp .5s cubic-bezier(.4,0,.2,1) both", marginBottom: 48 }}>
            <RulerIllustration />
            <div style={{ marginTop: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#A4FBCC", animation: "pulse 2s ease-in-out infinite" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#A4FBCC", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Measurement Tool
                  </span>
                </div>
                <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, lineHeight: 1.1, color: "#F2F2F2" }}>
                  Linear Feet<br />
                  <span style={{ color: "#A4FBCC" }}>Calculator</span>
                </h1>
                <p style={{ marginTop: 12, fontSize: 14, color: "#9199A5", lineHeight: 1.6, maxWidth: 420 }}>
                  Estimate material lengths for molding, fencing, flooring &amp; more.
                  Add segments, set units, get instant totals.
                </p>
              </div>

              {/* Stats chip */}
              <div style={{
                background: "#0D2510", border: "1px solid #1B3022",
                borderRadius: 12, padding: "16px 20px", minWidth: 160,
              }}>
                <div style={{ fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  Segments
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#A4FBCC" }}>{segments.length}</div>
                <div style={{ fontSize: 12, color: "#9199A5", marginTop: 2 }}>active rows</div>
              </div>
            </div>
          </div>

          {/* ── Segments panel ────────────────────────────────────────────────── */}
          <div style={{
            background: "#0B1F0E", border: "1px solid #1B3022",
            borderRadius: 16, padding: "28px 24px",
            animation: "fadeUp .5s .1s cubic-bezier(.4,0,.2,1) both",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#F2F2F2" }}>Length Segments</h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={clearAll} style={ghostBtn}>Clear all</button>
                <button onClick={addSegment} style={mintBtn}>+ Add segment</button>
              </div>
            </div>

            {/* Column headers */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12, paddingLeft: 38 }}>
              <span style={{ flex: 1, fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Length</span>
              <span style={{ width: 80, fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Unit</span>
              <span style={{ width: 90, fontSize: 11, color: "#9199A5", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>Qty</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {segments.map((seg, i) => (
                <SegmentRow
                  key={seg.id}
                  seg={seg}
                  index={i}
                  onChange={updateSegment}
                  onRemove={removeSegment}
                  canRemove={segments.length > 1}
                  animIn={newSegIds.has(seg.id)}
                />
              ))}
            </div>
          </div>

          {/* ── Optional dimensions ───────────────────────────────────────────── */}
          <div style={{
            background: "#0B1F0E", border: "1px solid #1B3022",
            borderRadius: 16, overflow: "hidden",
            animation: "fadeUp .5s .2s cubic-bezier(.4,0,.2,1) both",
            marginBottom: 24,
          }}>
            <button onClick={() => setShowOptional(p => !p)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 24px", background: "transparent", border: "none",
              cursor: "pointer", color: "#F2F2F2",
            }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Optional Dimensions</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#9199A5" }}>Width &amp; Height for sq/cu ft</span>
                <span style={{ fontSize: 18, color: "#A4FBCC", transition: "transform .25s", transform: showOptional ? "rotate(180deg)" : "rotate(0)" }}>⌄</span>
              </div>
            </button>
            {showOptional && (
              <div style={{ padding: "0 24px 24px", borderTop: "1px solid #1B3022", paddingTop: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <DimInput label="Width" value={width} unit={widthUnit}
                    onValue={setWidth} onUnit={setWidthUnit} />
                  <DimInput label="Height" value={height} unit={heightUnit}
                    onValue={setHeight} onUnit={setHeightUnit} />
                </div>
              </div>
            )}
          </div>

          {/* ── Results ───────────────────────────────────────────────────────── */}
          <div style={{ animation: "fadeUp .5s .3s cubic-bezier(.4,0,.2,1) both" }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Results
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              <ResultCard
                label="Total Linear Feet"
                value={totalLinearFt}
                unit="lin ft"
                highlight
                sub={`≈ ${(totalLinearFt * 12).toFixed(1)} inches`}
              />
              {sqFt > 0 && (
                <ResultCard label="Square Feet" value={sqFt} unit="sq ft"
                  sub={`${totalLinearFt.toFixed(2)} ft × ${widthFt.toFixed(2)} ft`} />
              )}
              {cuFt > 0 && (
                <ResultCard label="Cubic Feet" value={cuFt} unit="cu ft"
                  sub={`× ${heightFt.toFixed(2)} ft height`} />
              )}
              {widthFt > 0 && (
                <ResultCard label="Perimeter" value={perimeter} unit="ft"
                  sub="2 × (L + W)" />
              )}
            </div>
          </div>

          {/* ── Formula note ──────────────────────────────────────────────────── */}
          <div style={{
            marginTop: 28, padding: "18px 24px",
            background: "rgba(164,251,204,0.03)",
            border: "1px solid rgba(164,251,204,0.1)",
            borderRadius: 12,
            animation: "fadeUp .5s .4s cubic-bezier(.4,0,.2,1) both",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#A4FBCC", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Formula Reference
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                ["Inches → Feet", "length_ft = inches ÷ 12"],
                ["Segment total", "Σ(length_ft × qty)"],
                ["Square feet", "linear_ft × width_ft"],
                ["Perimeter", "2 × (L + W)"],
              ].map(([k, v]) => (
                <div key={k}>
                  <span style={{ fontSize: 11, color: "#9199A5" }}>{k}: </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#F2F2F2", fontVariantNumeric: "tabular-nums" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#9199A5" }}>
              ⚠ Assumes straight lines. Add ±10% buffer for real-world material waste.
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Button styles ─────────────────────────────────────────────────────────────
const mintBtn = {
  padding: "0 18px", height: 36, borderRadius: 8,
  background: "#A4FBCC", border: "none", cursor: "pointer",
  color: "#081A04", fontSize: 13, fontWeight: 700,
  fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.02em",
  transition: "opacity .2s, transform .1s",
};
const ghostBtn = {
  padding: "0 16px", height: 36, borderRadius: 8,
  background: "transparent", border: "1px solid #1B3022",
  cursor: "pointer", color: "#9199A5", fontSize: 13, fontWeight: 500,
  fontFamily: "Space Grotesk, sans-serif", transition: "border-color .2s, color .2s",
};