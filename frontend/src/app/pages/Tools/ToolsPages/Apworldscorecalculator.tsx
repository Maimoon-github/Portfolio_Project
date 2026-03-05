import { useState, useEffect, useRef } from "react";

const THRESHOLDS = [
  { min: 87, score: 5, label: "Extremely Well Qualified", color: "#A4FBCC", glow: "#A4FBCC44" },
  { min: 75, score: 4, label: "Well Qualified",           color: "#6EE7B7", glow: "#6EE7B744" },
  { min: 65, score: 3, label: "Qualified",                color: "#FCD34D", glow: "#FCD34D44" },
  { min: 50, score: 2, label: "Possibly Qualified",       color: "#F97316", glow: "#F9731644" },
  { min: 0,  score: 1, label: "No Recommendation",        color: "#EF4444", glow: "#EF444444" },
];

const PERCENTILE = { 5: "~13%", 4: "~23%", 3: "~25%", 2: "~21%", 1: "~18%" };

const SECTIONS = [
  { key: "mcq",  label: "MCQ",  sublabel: "Multiple Choice",        max: 55, color: "#A4FBCC", icon: "⬡", hint: "0 – 55 questions" },
  { key: "saq",  label: "SAQ",  sublabel: "Short Answer",           max: 9,  color: "#86EFAC", icon: "◈", hint: "0 – 9 points"     },
  { key: "dbq",  label: "DBQ",  sublabel: "Document-Based Question",max: 7,  color: "#6EE7B7", icon: "◉", hint: "0 – 7 points"     },
  { key: "leq",  label: "LEQ",  sublabel: "Long Essay Question",    max: 6,  color: "#34D399", icon: "◎", hint: "0 – 6 points"     },
];

function useCountUp(target, duration = 800) {
  const [val, setVal] = useState(0);
  const raf = useRef();
  useEffect(() => {
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * ease));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return val;
}

function ScoreRing({ score, composite }) {
  const threshold = THRESHOLDS.find(t => composite >= t.min) || THRESHOLDS[4];
  const r = 54, cx = 64, cy = 64;
  const circ = 2 * Math.PI * r;
  const dash = (composite / 100) * circ;
  const animated = useCountUp(composite);

  return (
    <div style={{ position: "relative", width: 128, height: 128, margin: "0 auto" }}>
      <svg width="128" height="128" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1B3022" strokeWidth="10" />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={threshold.color}
          strokeWidth="10"
          strokeDasharray={`${(animated / 100) * circ} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.05s linear", filter: `drop-shadow(0 0 8px ${threshold.color})` }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: threshold.color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#9199A5", letterSpacing: "0.08em", marginTop: 2 }}>
          {animated}%
        </span>
      </div>
    </div>
  );
}

function SliderInput({ section, value, onChange }) {
  const pct = (value / section.max) * 100;
  return (
    <div style={{
      background: "#1B3022",
      borderRadius: 14,
      padding: "20px 22px",
      border: "1px solid #2a4a35",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = section.color + "66"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#2a4a35"}
    >
      {/* subtle bg accent */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 80, height: 80,
        background: `radial-gradient(circle at 100% 0%, ${section.color}18 0%, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, color: section.color }}>{section.icon}</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#F2F2F2" }}>
              {section.label}
            </span>
            <span style={{
              background: "#081A04", border: `1px solid ${section.color}44`,
              borderRadius: 6, padding: "1px 8px",
              fontSize: 10, color: section.color,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: "0.06em"
            }}>
              {section.sublabel}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#9199A5", marginTop: 3, fontFamily: "'Space Grotesk', sans-serif" }}>
            {section.hint}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <input
            type="number" min={0} max={section.max} value={value}
            onChange={e => onChange(Math.min(section.max, Math.max(0, Number(e.target.value))))}
            style={{
              width: 52, background: "#081A04", border: `1px solid ${section.color}55`,
              borderRadius: 8, color: section.color,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18,
              textAlign: "center", padding: "4px 0", outline: "none"
            }}
          />
          <div style={{ fontSize: 10, color: "#9199A5", fontFamily: "'Space Grotesk', sans-serif", marginTop: 2 }}>
            / {section.max}
          </div>
        </div>
      </div>

      {/* Track */}
      <div style={{ position: "relative", height: 6, background: "#0d2518", borderRadius: 3, cursor: "pointer" }}
        onClick={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          onChange(Math.round(Math.min(1, Math.max(0, ratio)) * section.max));
        }}
      >
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, background: `linear-gradient(90deg, ${section.color}88, ${section.color})`,
          borderRadius: 3, transition: "width 0.1s ease",
          boxShadow: `0 0 8px ${section.color}66`
        }} />
        <input
          type="range" min={0} max={section.max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", margin: 0
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 10, color: "#9199A566", fontFamily: "'Space Grotesk', sans-serif" }}>0</span>
        <span style={{ fontSize: 10, color: section.color + "88", fontFamily: "'Space Grotesk', sans-serif" }}>
          {Math.round(pct)}%
        </span>
        <span style={{ fontSize: 10, color: "#9199A566", fontFamily: "'Space Grotesk', sans-serif" }}>{section.max}</span>
      </div>
    </div>
  );
}

function BreakdownBar({ label, raw, maxRaw, weight, color }) {
  const pct = maxRaw ? (raw / maxRaw) * 100 : 0;
  const weighted = (pct / 100) * weight;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#9199A5" }}>{label}</span>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: "#9199A5" }}>
            {raw}/{maxRaw} raw
          </span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color }}>
            {weighted.toFixed(1)}<span style={{ fontSize: 10, color: "#9199A5" }}>/{weight}</span>
          </span>
        </div>
      </div>
      <div style={{ height: 5, background: "#0d2518", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}77, ${color})`,
          borderRadius: 3, transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: `0 0 6px ${color}55`
        }} />
      </div>
    </div>
  );
}

export default function APWorldScoreCalculator() {
  const [scores, setScores] = useState({ mcq: 0, saq: 0, dbq: 0, leq: 0 });
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState(null);
  const [pulse, setPulse] = useState(false);

  const set = (key) => (val) => setScores(s => ({ ...s, [key]: val }));

  const compute = () => {
    const { mcq, saq, dbq, leq } = scores;
    const s1Raw = mcq + saq, s1Max = 64;
    const s2Raw = dbq + leq, s2Max = 13;
    const s1Weighted = (s1Raw / s1Max) * 60;
    const s2Weighted = (s2Raw / s2Max) * 40;
    const composite = Math.round(s1Weighted + s2Weighted);
    const threshold = THRESHOLDS.find(t => composite >= t.min) || THRESHOLDS[4];
    setResult({ composite, score: threshold.score, label: threshold.label, color: threshold.color, s1Raw, s2Raw, s1Weighted, s2Weighted });
    setCalculated(true);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  const reset = () => {
    setScores({ mcq: 0, saq: 0, dbq: 0, leq: 0 });
    setCalculated(false);
    setResult(null);
  };

  const threshold = result ? THRESHOLDS.find(t => result.score === t.score) : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .apw-root * { box-sizing: border-box; }
        
        .apw-root input[type=number]::-webkit-inner-spin-button,
        .apw-root input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        
        @keyframes apw-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes apw-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes apw-pulse-ring {
          0%   { box-shadow: 0 0 0 0 #A4FBCC44; }
          70%  { box-shadow: 0 0 0 18px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        @keyframes apw-scan {
          0%   { background-position: 0 -100%; }
          100% { background-position: 0 300%; }
        }
        @keyframes apw-grid-pan {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes apw-shimmer {
          0%   { opacity: 0.4; }
          50%  { opacity: 1; }
          100% { opacity: 0.4; }
        }
        .apw-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.06em;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
        }
        .apw-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .apw-btn:active { transform: scale(0.97); }
        .apw-pulse { animation: apw-pulse-ring 0.6s ease-out; }
        .apw-fade-up { animation: apw-fadeUp 0.5s ease forwards; }
        .apw-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid #A4FBCC44;
          color: #A4FBCC;
          background: #A4FBCC11;
        }
      `}</style>

      <div className="apw-root" style={{
        background: "#081A04",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
        color: "#F2F2F2",
        padding: "40px 16px 80px",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Animated grid background */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(#1B3022 1px, transparent 1px),
            linear-gradient(90deg, #1B3022 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          animation: "apw-grid-pan 8s linear infinite",
          opacity: 0.4,
        }} />
        {/* Radial glow */}
        <div style={{
          position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 500,
          background: "radial-gradient(ellipse, #1B302288 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none",
        }} />
        <div style={{
          position: "fixed", bottom: "-10%", right: "-10%",
          width: 400, height: 400,
          background: "radial-gradient(ellipse, #A4FBCC0a 0%, transparent 70%)",
          zIndex: 0, pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <span className="apw-tag">College Board · AP Exam</span>
            </div>
            <h1 style={{
              margin: 0,
              fontSize: "clamp(26px, 5vw, 42px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#F2F2F2",
            }}>
              AP World History
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, #A4FBCC, #34D399)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Score Calculator</span>
            </h1>
            <p style={{
              marginTop: 14, color: "#9199A5", fontSize: 14, lineHeight: 1.7,
              maxWidth: 500, margin: "14px auto 0",
            }}>
              Enter your raw scores across all four sections to estimate your predicted AP score (1–5) with weighted composite breakdown.
            </p>
          </div>

          {/* Scoring Guide Strip */}
          <div style={{
            display: "flex", gap: 6, justifyContent: "center",
            flexWrap: "wrap", marginBottom: 36,
          }}>
            {THRESHOLDS.slice().reverse().map(t => (
              <div key={t.score} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#1B3022", borderRadius: 8,
                padding: "6px 12px",
                border: `1px solid ${t.color}33`,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: t.color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "#081A04",
                }}>{t.score}</span>
                <span style={{ fontSize: 11, color: "#9199A5" }}>{t.min}%+</span>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,320px)",
            gap: 20,
            alignItems: "start",
          }}>

            {/* Left: Inputs */}
            <div>
              <div style={{
                background: "#0d1f10", borderRadius: 18,
                border: "1px solid #2a4a35",
                padding: 24,
              }}>
                <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Section Inputs
                  </span>
                  <div style={{ display: "flex", gap: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FCD34D" }} />
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#A4FBCC" }} />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {SECTIONS.map(s => (
                    <SliderInput key={s.key} section={s} value={scores[s.key]} onChange={set(s.key)} />
                  ))}
                </div>

                {/* Section weight info */}
                <div style={{
                  marginTop: 18,
                  background: "#081A04", borderRadius: 12, padding: "14px 16px",
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
                  border: "1px solid #1B3022",
                }}>
                  <div style={{ borderRight: "1px solid #1B3022", paddingRight: 12 }}>
                    <div style={{ fontSize: 10, color: "#9199A5", marginBottom: 4, letterSpacing: "0.08em" }}>SECTION I</div>
                    <div style={{ fontSize: 13, color: "#A4FBCC", fontWeight: 600 }}>MCQ + SAQ</div>
                    <div style={{ fontSize: 11, color: "#9199A5", marginTop: 2 }}>60% weight · max 64 pts</div>
                  </div>
                  <div style={{ paddingLeft: 12 }}>
                    <div style={{ fontSize: 10, color: "#9199A5", marginBottom: 4, letterSpacing: "0.08em" }}>SECTION II</div>
                    <div style={{ fontSize: 13, color: "#6EE7B7", fontWeight: 600 }}>DBQ + LEQ</div>
                    <div style={{ fontSize: 11, color: "#9199A5", marginTop: 2 }}>40% weight · max 13 pts</div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button className={`apw-btn ${pulse ? "apw-pulse" : ""}`} onClick={compute} style={{
                  flex: 1, padding: "15px 0",
                  background: "linear-gradient(135deg, #A4FBCC, #34D399)",
                  color: "#081A04",
                  boxShadow: "0 4px 24px #A4FBCC33",
                }}>
                  Calculate Score
                </button>
                <button className="apw-btn" onClick={reset} style={{
                  padding: "15px 22px",
                  background: "#1B3022",
                  color: "#9199A5",
                  border: "1px solid #2a4a35",
                }}>
                  Reset
                </button>
              </div>
            </div>

            {/* Right: Result */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Score card */}
              <div className={calculated ? "apw-fade-up" : ""} style={{
                background: "#0d1f10",
                border: `1px solid ${result ? result.color + "44" : "#2a4a35"}`,
                borderRadius: 18, padding: "28px 22px",
                textAlign: "center",
                position: "relative", overflow: "hidden",
                transition: "border-color 0.4s",
              }}>
                {result && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `radial-gradient(ellipse at 50% 0%, ${result.color}10 0%, transparent 60%)`,
                    pointerEvents: "none",
                  }} />
                )}

                <div style={{ fontSize: 10, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>
                  Predicted Score
                </div>

                {result ? (
                  <>
                    <ScoreRing score={result.score} composite={result.composite} />
                    <div style={{
                      marginTop: 16, fontSize: 13, fontWeight: 600,
                      color: result.color, letterSpacing: "0.04em",
                    }}>
                      {result.label}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 12, color: "#9199A5" }}>
                      Top {PERCENTILE[result.score]} of test takers
                    </div>
                    <div style={{
                      marginTop: 16, background: "#081A04", borderRadius: 10,
                      padding: "10px 14px", fontSize: 12, color: "#9199A5",
                      border: "1px solid #1B3022",
                    }}>
                      Composite: <span style={{ color: result.color, fontWeight: 700 }}>{result.composite}</span>/100
                    </div>
                  </>
                ) : (
                  <div style={{
                    height: 160, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 10,
                  }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: "50%",
                      border: "2px dashed #2a4a35",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 28, color: "#2a4a35",
                      animation: "apw-float 3s ease-in-out infinite",
                    }}>?</div>
                    <span style={{ fontSize: 12, color: "#9199A566" }}>Enter scores and calculate</span>
                  </div>
                )}
              </div>

              {/* Breakdown */}
              {result && (
                <div className="apw-fade-up" style={{
                  background: "#0d1f10", border: "1px solid #2a4a35",
                  borderRadius: 18, padding: "22px 20px",
                }}>
                  <div style={{ fontSize: 10, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                    Score Breakdown
                  </div>
                  <BreakdownBar label="MCQ (Multiple Choice)" raw={scores.mcq} maxRaw={55} weight={33.3} color="#A4FBCC" />
                  <BreakdownBar label="SAQ (Short Answer)"    raw={scores.saq} maxRaw={9}  weight={26.7} color="#86EFAC" />
                  <BreakdownBar label="DBQ (Document-Based)"  raw={scores.dbq} maxRaw={7}  weight={24}   color="#6EE7B7" />
                  <BreakdownBar label="LEQ (Long Essay)"      raw={scores.leq} maxRaw={6}  weight={16}   color="#34D399" />

                  <div style={{
                    marginTop: 14, borderTop: "1px solid #1B3022", paddingTop: 14,
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
                  }}>
                    <div style={{ background: "#081A04", borderRadius: 10, padding: "10px 14px", border: "1px solid #1B3022" }}>
                      <div style={{ fontSize: 10, color: "#9199A5", marginBottom: 3 }}>Sec. I Score</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#A4FBCC" }}>
                        {result.s1Weighted.toFixed(1)}<span style={{ fontSize: 11, color: "#9199A5" }}>/60</span>
                      </div>
                    </div>
                    <div style={{ background: "#081A04", borderRadius: 10, padding: "10px 14px", border: "1px solid #1B3022" }}>
                      <div style={{ fontSize: 10, color: "#9199A5", marginBottom: 3 }}>Sec. II Score</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#6EE7B7" }}>
                        {result.s2Weighted.toFixed(1)}<span style={{ fontSize: 11, color: "#9199A5" }}>/40</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Score scale reference */}
              <div style={{
                background: "#0d1f10", border: "1px solid #2a4a35",
                borderRadius: 18, padding: "20px 20px",
              }}>
                <div style={{ fontSize: 10, color: "#9199A5", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
                  Score Scale
                </div>
                {THRESHOLDS.slice().reverse().map((t, i) => {
                  const nextMin = THRESHOLDS.slice().reverse()[i - 1]?.min ?? 101;
                  const isActive = result && result.score === t.score;
                  return (
                    <div key={t.score} style={{
                      display: "flex", alignItems: "center", gap: 10, marginBottom: 8,
                      padding: "7px 10px", borderRadius: 9,
                      background: isActive ? t.color + "18" : "transparent",
                      border: `1px solid ${isActive ? t.color + "44" : "transparent"}`,
                      transition: "all 0.3s",
                    }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: "50%",
                        background: isActive ? t.color : t.color + "33",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: 12,
                        color: isActive ? "#081A04" : t.color,
                        transition: "all 0.3s",
                        flexShrink: 0,
                      }}>{t.score}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: isActive ? t.color : "#F2F2F2", fontWeight: isActive ? 700 : 400 }}>
                          {t.label}
                        </div>
                        <div style={{ fontSize: 10, color: "#9199A5" }}>
                          {t.min}–{nextMin - 1} composite
                        </div>
                      </div>
                      {isActive && (
                        <span style={{ fontSize: 10, color: t.color, fontWeight: 700 }}>← YOU</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <div style={{
                background: "#1B3022", borderRadius: 12, padding: "12px 14px",
                fontSize: 11, color: "#9199A5", lineHeight: 1.6,
                border: "1px solid #2a4a35",
              }}>
                <span style={{ color: "#FCD34D", fontWeight: 600 }}>⚠ Note: </span>
                Score thresholds are based on 2024–2026 average curves (±2 pts). Actual cutoffs vary yearly per College Board's official release. FRQ rubric granularity not modeled.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}