import { useState, useEffect, useRef } from "react";

// ─── Score threshold lookup (composite 0–100 → AP 1–5) ───────────────────────
const THRESHOLDS = [
  { min: 70, max: 100, score: 5, label: "Extremely Well Qualified" },
  { min: 54, max: 69,  score: 4, label: "Well Qualified"           },
  { min: 40, max: 53,  score: 3, label: "Qualified"                },
  { min: 25, max: 39,  score: 2, label: "Possibly Qualified"       },
  { min: 0,  max: 24,  score: 1, label: "No Recommendation"        },
];

const FRQ_BREAKDOWN = [
  { id: "expDesign",    label: "Experimental Design",    max: 12 },
  { id: "translation",  label: "Translation / Derivation", max: 12 },
  { id: "short1",       label: "Short Answer #1",         max: 7  },
  { id: "short2",       label: "Short Answer #2",         max: 7  },
  { id: "short3",       label: "Short Answer #3",         max: 7  },
];

function getAP(composite) {
  return THRESHOLDS.find(t => composite >= t.min && composite <= t.max) || THRESHOLDS[4];
}

// ─── Animated counter hook ────────────────────────────────────────────────────
function useAnimatedValue(target, duration = 600) {
  const [display, setDisplay] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + diff * eased));
      if (t < 1) requestAnimationFrame(tick);
      else prev.current = target;
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return display;
}

// ─── Arc gauge SVG ────────────────────────────────────────────────────────────
function ArcGauge({ value, max, color, size = 120, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const circ = 2 * Math.PI * r;
  // 270° arc starting from bottom-left
  const arcLen = (circ * 0.75);
  const offset = arcLen - (value / max) * arcLen;
  const rotation = 135;
  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      <circle cx={cx} cy={cx} r={r} fill="none"
        stroke="#1B3022" strokeWidth={stroke}
        strokeDasharray={`${arcLen} ${circ}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${rotation} ${cx} ${cx})`} />
      <circle cx={cx} cy={cx} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${arcLen} ${circ}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(${rotation} ${cx} ${cx})`}
        style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)" }} />
    </svg>
  );
}

// ─── Score badge ──────────────────────────────────────────────────────────────
const SCORE_COLORS = {
  5: "#A4FBCC",
  4: "#6EDBA6",
  3: "#F5C842",
  2: "#F5A623",
  1: "#F55F42",
};

function ScoreBadge({ score }) {
  const color = SCORE_COLORS[score] || "#9199A5";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 72, height: 72, borderRadius: "50%",
      border: `3px solid ${color}`,
      background: `${color}18`,
      boxShadow: `0 0 28px ${color}55`,
      transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
    }}>
      <span style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: "-1px" }}>{score}</span>
    </div>
  );
}

// ─── Slider input ─────────────────────────────────────────────────────────────
function SliderInput({ label, value, max, onChange, accentColor = "#A4FBCC", sublabel }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#9199A5", fontWeight: 500, letterSpacing: "0.04em" }}>
          {label}
          {sublabel && <span style={{ fontSize: 11, color: "#9199A580", marginLeft: 6 }}>{sublabel}</span>}
        </span>
        <span style={{ fontSize: 14, fontWeight: 700, color: accentColor, minWidth: 32, textAlign: "right" }}>
          {value}<span style={{ fontSize: 11, color: "#9199A5", fontWeight: 400 }}>/{max}</span>
        </span>
      </div>
      <div style={{ position: "relative", height: 6, background: "#1B3022", borderRadius: 99 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, background: accentColor,
          borderRadius: 99, transition: "width 0.3s ease",
          boxShadow: `0 0 8px ${accentColor}88`,
        }} />
        <input type="range" min={0} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            transform: "translateY(-50%)", width: "100%",
            opacity: 0, cursor: "pointer", height: 20, margin: 0,
            zIndex: 1,
          }} />
      </div>
    </div>
  );
}

// ─── Number input ─────────────────────────────────────────────────────────────
function NumberInput({ label, value, max, onChange, accent = "#A4FBCC" }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 12, color: "#9199A5", flex: 1, lineHeight: 1.3 }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button onClick={() => onChange(Math.max(0, value - 1))}
            style={{
              width: 24, height: 24, borderRadius: 6, border: `1px solid #1B3022`,
              background: "#081A04", color: "#9199A5", cursor: "pointer",
              fontSize: 14, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>−</button>
          <input type="number" min={0} max={max} value={value}
            onChange={e => onChange(Math.min(max, Math.max(0, Number(e.target.value))))}
            style={{
              width: 44, textAlign: "center", background: "#1B3022",
              border: `1px solid #1B302288`, borderRadius: 6, color: accent,
              fontSize: 14, fontWeight: 700, padding: "3px 0", outline: "none",
              fontFamily: "inherit",
            }} />
          <button onClick={() => onChange(Math.min(max, value + 1))}
            style={{
              width: 24, height: 24, borderRadius: 6, border: `1px solid #1B3022`,
              background: "#081A04", color: accent, cursor: "pointer",
              fontSize: 14, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>+</button>
          <span style={{ fontSize: 11, color: "#9199A550", width: 32, textAlign: "right" }}>/{max}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────
function SectionCard({ title, children, icon }) {
  return (
    <div style={{
      background: "#0E2210", border: "1px solid #1B3022",
      borderRadius: 16, padding: "22px 24px", marginBottom: 16,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 80, height: 80, borderRadius: "0 16px 0 80px",
        background: "#1B302244", display: "flex",
        alignItems: "flex-start", justifyContent: "flex-end",
        padding: "10px 12px", fontSize: 18,
      }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#A4FBCC", letterSpacing: "0.1em",
        textTransform: "uppercase", marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function APPhysics1Calculator() {
  const [mcq, setMcq] = useState(30);
  const [frqMode, setFrqMode] = useState("total"); // "total" | "breakdown"
  const [frqTotal, setFrqTotal] = useState(28);
  const [frqParts, setFrqParts] = useState({ expDesign: 7, translation: 7, short1: 4, short2: 4, short3: 4 });
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const frqRaw = frqMode === "total"
    ? frqTotal
    : Object.values(frqParts).reduce((a, b) => a + b, 0);
  const frqCapped = Math.min(frqRaw, 50);

  const mcqWeighted  = (mcq / 50) * 50;
  const frqWeighted  = (frqCapped / 50) * 50;
  const composite    = Math.round(mcqWeighted + frqWeighted);
  const ap           = getAP(composite);

  const animComp  = useAnimatedValue(composite);
  const animMcqW  = useAnimatedValue(Math.round(mcqWeighted));
  const animFrqW  = useAnimatedValue(Math.round(frqWeighted));

  const scoreColor = SCORE_COLORS[ap.score] || "#9199A5";

  const frqPartsTotal = Object.values(frqParts).reduce((a, b) => a + b, 0);

  // percentage bars
  const mcqPct = (mcq / 50) * 100;
  const frqPct = (frqCapped / 50) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#081A04",
      fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
      color: "#F2F2F2",
      padding: "0",
    }}>
      {/* font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input[type=range]::-webkit-slider-thumb { width:14px;height:14px; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{box-shadow:0 0 24px #A4FBCC44} 50%{box-shadow:0 0 48px #A4FBCC88} }
        @keyframes scanline {
          0%  { transform: translateY(-100%); }
          100%{ transform: translateY(100vh); }
        }
        .reveal-btn:hover { background:#A4FBCC!important; color:#081A04!important; }
        .tab-btn:hover { color:#A4FBCC!important; }
        .reset-btn:hover { border-color:#A4FBCC!important; color:#A4FBCC!important; }
      `}</style>

      {/* scanline overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)",
      }} />

      {/* glow orb */}
      <div style={{
        position: "fixed", top: -120, right: -80, width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, #A4FBCC18 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "40px 20px 60px" }}>

        {/* ── Header ── */}
        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "all 0.5s ease", marginBottom: 36,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
              color: "#A4FBCC", textTransform: "uppercase",
              border: "1px solid #A4FBCC44", borderRadius: 4, padding: "3px 8px",
            }}>AP Exam Tool</div>
            <div style={{ fontSize: 10, color: "#9199A5", letterSpacing: "0.06em" }}>
              50/50 Section Weighting
            </div>
          </div>
          <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 800, margin: 0,
            lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            AP Physics 1{" "}
            <span style={{ color: "#A4FBCC" }}>Score</span> Calculator
          </h1>
          <p style={{ color: "#9199A5", fontSize: 14, marginTop: 8, lineHeight: 1.6, maxWidth: 480 }}>
            Predict your composite score from MCQ and FRQ performance. Thresholds reflect recent College Board data — update annually for accuracy.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>

          {/* ── MCQ Section ── */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.5s ease 0.1s", animation: mounted ? "none" : undefined,
          }}>
            <SectionCard title="Multiple Choice — MCQ" icon="◎">
              <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{
                  flex: "0 0 auto", background: "#081A04", border: "1px solid #1B3022",
                  borderRadius: 12, padding: "14px 20px", textAlign: "center", minWidth: 100,
                }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#A4FBCC", lineHeight: 1 }}>{mcq}</div>
                  <div style={{ fontSize: 10, color: "#9199A5", marginTop: 4 }}>correct / 50</div>
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontSize: 11, color: "#9199A5", marginBottom: 4 }}>Questions correct (no penalty)</div>
                  <SliderInput label="" value={mcq} max={50}
                    onChange={setMcq} accentColor="#A4FBCC" />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9199A550" }}>
                    <span>0</span><span>25</span><span>50</span>
                  </div>
                </div>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "#081A04", borderRadius: 8, padding: "10px 14px",
                border: "1px solid #1B302266",
              }}>
                <ArcGauge value={mcq} max={50} color="#A4FBCC" size={52} stroke={6} />
                <div>
                  <div style={{ fontSize: 11, color: "#9199A5" }}>MCQ Weighted Score</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#F2F2F2" }}>
                    {animMcqW}<span style={{ fontSize: 13, color: "#9199A5", fontWeight: 400 }}>/50</span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 11, color: "#9199A5", textAlign: "right" }}>
                  <div style={{ color: "#A4FBCC", fontWeight: 600 }}>{mcqPct.toFixed(0)}%</div>
                  <div>accuracy</div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── FRQ Section ── */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.5s ease 0.18s",
          }}>
            <SectionCard title="Free Response — FRQ" icon="✎">
              {/* mode toggle */}
              <div style={{ display: "flex", gap: 0, marginBottom: 16, background: "#081A04",
                borderRadius: 8, padding: 3, border: "1px solid #1B3022", width: "fit-content" }}>
                {["total", "breakdown"].map(m => (
                  <button key={m} className="tab-btn"
                    onClick={() => setFrqMode(m)}
                    style={{
                      padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
                      fontSize: 12, fontWeight: 600, fontFamily: "inherit", letterSpacing: "0.04em",
                      background: frqMode === m ? "#1B3022" : "transparent",
                      color: frqMode === m ? "#A4FBCC" : "#9199A5",
                      transition: "all 0.2s",
                    }}>
                    {m === "total" ? "Total Points" : "By Question"}
                  </button>
                ))}
              </div>

              {frqMode === "total" ? (
                <>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
                    <div style={{
                      flex: "0 0 auto", background: "#081A04", border: "1px solid #1B3022",
                      borderRadius: 12, padding: "14px 20px", textAlign: "center", minWidth: 100,
                    }}>
                      <div style={{ fontSize: 28, fontWeight: 800, color: "#6EDBA6", lineHeight: 1 }}>{frqTotal}</div>
                      <div style={{ fontSize: 10, color: "#9199A5", marginTop: 4 }}>pts / 50</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 140 }}>
                      <div style={{ fontSize: 11, color: "#9199A5", marginBottom: 4 }}>Total FRQ rubric points</div>
                      <SliderInput label="" value={frqTotal} max={50}
                        onChange={setFrqTotal} accentColor="#6EDBA6" />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9199A550" }}>
                        <span>0</span><span>25</span><span>50</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#9199A5", lineHeight: 1.7,
                    background: "#081A04", borderRadius: 8, padding: "10px 14px",
                    border: "1px solid #1B302266" }}>
                    <div style={{ fontWeight: 600, color: "#A4FBCC", marginBottom: 4 }}>FRQ Rubric Breakdown</div>
                    {FRQ_BREAKDOWN.map(q => (
                      <div key={q.id} style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{q.label}</span>
                        <span style={{ color: "#F2F2F266" }}>{q.max} pts</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div>
                  {FRQ_BREAKDOWN.map((q, i) => (
                    <NumberInput key={q.id} label={`${q.label} (max ${q.max})`}
                      value={frqParts[q.id]} max={q.max} accent="#6EDBA6"
                      onChange={v => setFrqParts(p => ({ ...p, [q.id]: v }))} />
                  ))}
                  <div style={{
                    display: "flex", justifyContent: "space-between", padding: "10px 0 0",
                    borderTop: "1px solid #1B3022", marginTop: 4,
                  }}>
                    <span style={{ fontSize: 12, color: "#9199A5" }}>Total FRQ Points</span>
                    <span style={{ fontSize: 16, fontWeight: 700,
                      color: frqPartsTotal > 50 ? "#F55F42" : "#6EDBA6" }}>
                      {frqPartsTotal}
                      {frqPartsTotal > 50 && <span style={{ fontSize: 11, color: "#F55F42", marginLeft: 4 }}>→ capped 50</span>}
                      <span style={{ fontSize: 11, color: "#9199A5", fontWeight: 400 }}>/50</span>
                    </span>
                  </div>
                </div>
              )}

              {/* FRQ weighted display */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginTop: 14,
                background: "#081A04", borderRadius: 8, padding: "10px 14px",
                border: "1px solid #1B302266",
              }}>
                <ArcGauge value={frqCapped} max={50} color="#6EDBA6" size={52} stroke={6} />
                <div>
                  <div style={{ fontSize: 11, color: "#9199A5" }}>FRQ Weighted Score</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#F2F2F2" }}>
                    {animFrqW}<span style={{ fontSize: 13, color: "#9199A5", fontWeight: 400 }}>/50</span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 11, color: "#9199A5", textAlign: "right" }}>
                  <div style={{ color: "#6EDBA6", fontWeight: 600 }}>{frqPct.toFixed(0)}%</div>
                  <div>of rubric</div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── Result Card ── */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.5s ease 0.26s",
          }}>
            <div style={{
              background: `linear-gradient(135deg, #0E2210 60%, ${scoreColor}0A 100%)`,
              border: `1px solid ${scoreColor}44`,
              borderRadius: 20, padding: "28px 28px 24px",
              position: "relative", overflow: "hidden",
              boxShadow: `0 0 40px ${scoreColor}18`,
              transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
            }}>
              {/* decorative grid */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: `linear-gradient(${scoreColor}08 1px, transparent 1px), linear-gradient(90deg, ${scoreColor}08 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  color: scoreColor, textTransform: "uppercase", marginBottom: 20 }}>
                  Predicted Score
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                  <ScoreBadge score={ap.score} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#9199A5", marginBottom: 2 }}>{ap.label}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 42, fontWeight: 800, color: "#F2F2F2",
                        lineHeight: 1, letterSpacing: "-2px" }}>{animComp}</span>
                      <span style={{ fontSize: 16, color: "#9199A5" }}>/ 100 composite</span>
                    </div>
                  </div>
                </div>

                {/* composite bar */}
                <div style={{ marginTop: 24 }}>
                  <div style={{ fontSize: 11, color: "#9199A5", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                    <span>Composite Breakdown</span>
                    <span style={{ color: scoreColor }}>{composite}/100</span>
                  </div>
                  <div style={{ height: 8, background: "#1B3022", borderRadius: 99, overflow: "hidden", position: "relative" }}>
                    {/* MCQ portion */}
                    <div style={{
                      position: "absolute", left: 0, top: 0, height: "100%",
                      width: `${mcqWeighted}%`,
                      background: "#A4FBCC",
                      borderRadius: "99px 0 0 99px",
                      transition: "width 0.5s ease",
                    }} />
                    {/* FRQ portion */}
                    <div style={{
                      position: "absolute", left: `${mcqWeighted}%`, top: 0, height: "100%",
                      width: `${frqWeighted}%`,
                      background: "#6EDBA6",
                      borderRadius: frqWeighted > 0 ? "0 99px 99px 0" : "0",
                      transition: "width 0.5s ease, left 0.5s ease",
                    }} />
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 11 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: "#A4FBCC" }} />
                      <span style={{ color: "#9199A5" }}>MCQ <span style={{ color: "#A4FBCC", fontWeight: 600 }}>{animMcqW}</span></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: "#6EDBA6" }} />
                      <span style={{ color: "#9199A5" }}>FRQ <span style={{ color: "#6EDBA6", fontWeight: 600 }}>{animFrqW}</span></span>
                    </div>
                  </div>
                </div>

                {/* score scale */}
                <div style={{ marginTop: 22, display: "flex", gap: 4 }}>
                  {THRESHOLDS.slice().reverse().map(t => (
                    <div key={t.score} style={{
                      flex: 1, textAlign: "center",
                      padding: "8px 4px",
                      borderRadius: 8,
                      background: ap.score === t.score ? `${SCORE_COLORS[t.score]}22` : "#081A04",
                      border: `1px solid ${ap.score === t.score ? SCORE_COLORS[t.score] : "#1B302288"}`,
                      transition: "all 0.4s ease",
                    }}>
                      <div style={{
                        fontSize: 18, fontWeight: 800,
                        color: ap.score === t.score ? SCORE_COLORS[t.score] : "#9199A550",
                        transition: "color 0.4s ease",
                      }}>{t.score}</div>
                      <div style={{ fontSize: 9, color: "#9199A550", marginTop: 1 }}>
                        {t.min}–{t.max}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Insights ── */}
          <div style={{
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.5s ease 0.34s",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
            }}>
              {[
                {
                  label: "MCQ Impact",
                  value: `${mcqPct.toFixed(0)}%`,
                  sub: `${mcq} of 50 correct`,
                  color: "#A4FBCC",
                  tip: mcq < 25 ? "Focus on content review" : mcq < 40 ? "Targeted practice needed" : "Strong MCQ performance",
                },
                {
                  label: "FRQ Impact",
                  value: `${frqPct.toFixed(0)}%`,
                  sub: `${frqCapped} of 50 pts`,
                  color: "#6EDBA6",
                  tip: frqCapped < 20 ? "Practice FRQ rubrics" : frqCapped < 35 ? "Work on explanation depth" : "Strong FRQ performance",
                },
              ].map(card => (
                <div key={card.label} style={{
                  background: "#0E2210", border: `1px solid #1B3022`,
                  borderRadius: 12, padding: "16px 18px",
                }}>
                  <div style={{ fontSize: 10, color: "#9199A5", letterSpacing: "0.08em",
                    textTransform: "uppercase", marginBottom: 6 }}>{card.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: card.color, lineHeight: 1 }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: "#9199A5", marginTop: 4 }}>{card.sub}</div>
                  <div style={{
                    marginTop: 10, fontSize: 11, color: card.color, lineHeight: 1.5,
                    borderTop: "1px solid #1B3022", paddingTop: 8,
                  }}>{card.tip}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Disclaimer ── */}
          <div style={{
            opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.42s",
            fontSize: 11, color: "#9199A550", lineHeight: 1.7,
            border: "1px solid #1B302255", borderRadius: 10,
            padding: "12px 16px",
          }}>
            <span style={{ color: "#9199A580", fontWeight: 600 }}>⚠ Note: </span>
            Score thresholds (~25–39 = 2, 40–53 = 3, 54–69 = 4, 70+ = 5) are estimated from historical College Board data and shift ±2 pts yearly. FRQ self-scoring may introduce bias. This tool is for study planning only.
          </div>

          {/* ── Reset ── */}
          <div style={{ display: "flex", justifyContent: "flex-end", opacity: mounted ? 1 : 0, transition: "all 0.5s ease 0.48s" }}>
            <button className="reset-btn"
              onClick={() => { setMcq(0); setFrqTotal(0); setFrqParts({ expDesign: 0, translation: 0, short1: 0, short2: 0, short3: 0 }); }}
              style={{
                padding: "8px 20px", borderRadius: 8, border: "1px solid #1B3022",
                background: "transparent", color: "#9199A5", cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "inherit", letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}>
              Reset All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}