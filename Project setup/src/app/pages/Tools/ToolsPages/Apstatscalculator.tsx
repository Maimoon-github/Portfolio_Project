import { useState, useEffect, useRef } from "react";

const SCORE_THRESHOLDS = [
  { min: 80, score: 5, label: "Extremely Well Qualified", percentile: "Top 15%" },
  { min: 70, score: 4, label: "Well Qualified", percentile: "Top 38%" },
  { min: 57, score: 3, label: "Qualified", percentile: "Top 60%" },
  { min: 45, score: 2, label: "Possibly Qualified", percentile: "Top 80%" },
  { min: 0,  score: 1, label: "No Recommendation", percentile: "Bottom 20%" },
];

const SCORE_COLORS = {
  5: "#A4FBCC",
  4: "#7de8b0",
  3: "#f0c070",
  2: "#f08060",
  1: "#e05050",
};

const SCORE_GLOWS = {
  5: "0 0 40px rgba(164,251,204,0.35)",
  4: "0 0 30px rgba(125,232,176,0.25)",
  3: "0 0 30px rgba(240,192,112,0.25)",
  2: "0 0 30px rgba(240,128,96,0.2)",
  1: "0 0 30px rgba(224,80,80,0.2)",
};

function getAPScore(composite) {
  for (const t of SCORE_THRESHOLDS) {
    if (composite >= t.min) return t;
  }
  return SCORE_THRESHOLDS[SCORE_THRESHOLDS.length - 1];
}

function AnimatedNumber({ value, decimals = 1 }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(value);
  const raf = useRef(null);

  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 400;
    const startTime = performance.now();

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
      else ref.current = end;
    });
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  return <span>{display.toFixed(decimals)}</span>;
}

function ScoreGauge({ composite, apScore }) {
  const pct = composite / 100;
  const r = 64;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const color = SCORE_COLORS[apScore.score];

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" style={{ overflow: "visible" }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx="90" cy="90" r={r} fill="none" stroke="#1B3022" strokeWidth="10" />
      {/* Progress */}
      <circle
        cx="90" cy="90" r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ * 0.25}
        filter="url(#glow)"
        style={{ transition: "stroke-dasharray 0.4s cubic-bezier(0.34,1.56,0.64,1), stroke 0.3s ease" }}
      />
      {/* Score number */}
      <text x="90" y="82" textAnchor="middle" fill={color} fontSize="42" fontWeight="700"
        fontFamily="'Space Grotesk', sans-serif"
        style={{ filter: `drop-shadow(${SCORE_GLOWS[apScore.score]})`, transition: "fill 0.3s ease" }}>
        {apScore.score}
      </text>
      <text x="90" y="106" textAnchor="middle" fill="#9199A5" fontSize="11"
        fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">
        AP SCORE
      </text>
      <text x="90" y="122" textAnchor="middle" fill="#F2F2F2" fontSize="10"
        fontFamily="'Space Grotesk', sans-serif" opacity="0.7">
        {apScore.percentile}
      </text>
    </svg>
  );
}

function Slider({ label, value, max, onChange, color, sublabel }) {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
        <div>
          <span style={{ color: "#F2F2F2", fontWeight: 600, fontSize: "14px", letterSpacing: "0.5px" }}>{label}</span>
          {sublabel && <span style={{ color: "#9199A5", fontSize: "11px", marginLeft: "8px" }}>{sublabel}</span>}
        </div>
        <span style={{
          color, fontWeight: 700, fontSize: "20px", fontVariantNumeric: "tabular-nums",
          minWidth: "48px", textAlign: "right",
          textShadow: `0 0 12px ${color}66`
        }}>
          {value}
          <span style={{ color: "#9199A5", fontSize: "12px", fontWeight: 400 }}>/{max}</span>
        </span>
      </div>
      <div style={{ position: "relative", height: "6px", borderRadius: "99px", background: "#0e2a16" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, borderRadius: "99px",
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}55`,
          transition: "width 0.15s ease"
        }} />
        <input
          type="range" min={0} max={max} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", margin: 0
          }}
        />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          transform: "translate(-50%,-50%)",
          width: "16px", height: "16px", borderRadius: "50%",
          background: color, border: "2.5px solid #081A04",
          boxShadow: `0 0 10px ${color}88`,
          transition: "left 0.15s ease",
          pointerEvents: "none"
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
        <span style={{ color: "#9199A5", fontSize: "10px" }}>0</span>
        <span style={{ color: "#9199A5", fontSize: "10px" }}>{max}</span>
      </div>
    </div>
  );
}

function BarStat({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ color: "#9199A5", fontSize: "12px" }}>{label}</span>
        <span style={{ color, fontWeight: 600, fontSize: "12px" }}>
          <AnimatedNumber value={value} decimals={1} />
          <span style={{ color: "#9199A5" }}>/{max}</span>
        </span>
      </div>
      <div style={{ height: "4px", background: "#0e2a16", borderRadius: "99px" }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: "99px",
          background: `linear-gradient(90deg, ${color}66, ${color})`,
          transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1)"
        }} />
      </div>
    </div>
  );
}

function ScoreRow({ threshold, isActive, composite }) {
  const color = SCORE_COLORS[threshold.score];
  const filled = composite >= threshold.min;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px",
      borderRadius: "10px",
      background: isActive ? `${color}12` : "transparent",
      border: `1px solid ${isActive ? color + "40" : "transparent"}`,
      transition: "all 0.3s ease",
      marginBottom: "4px"
    }}>
      <div style={{
        width: "28px", height: "28px", borderRadius: "50%",
        background: filled ? color : "#1B3022",
        border: `2px solid ${color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: "13px",
        color: filled ? "#081A04" : color,
        flexShrink: 0,
        transition: "all 0.3s ease",
        boxShadow: isActive ? `0 0 12px ${color}55` : "none"
      }}>{threshold.score}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: isActive ? color : "#9199A5", fontSize: "12px", fontWeight: 600, transition: "color 0.3s" }}>
          {threshold.label}
        </div>
        <div style={{ color: "#9199A5", fontSize: "10px", marginTop: "1px" }}>
          {threshold.min === 0 ? "< 45" : threshold.min === 80 ? "≥ 80" : `${threshold.min}–${threshold.min === 70 ? 79 : threshold.min === 57 ? 69 : threshold.min === 45 ? 56 : 100}`} composite
        </div>
      </div>
      <span style={{ color: "#9199A5", fontSize: "10px" }}>{threshold.percentile}</span>
    </div>
  );
}

export default function APStatsCalculator() {
  const [mcq, setMcq] = useState(28);
  const [frq, setFrq] = useState(14);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const mcqWeighted = (mcq / 40) * 50;
  const frqWeighted = (frq / 24) * 50;
  const composite = mcqWeighted + frqWeighted;
  const apScore = getAPScore(composite);
  const color = SCORE_COLORS[apScore.score];

  const cardStyle = {
    background: "#1B3022",
    border: "1px solid #2a4a34",
    borderRadius: "20px",
    padding: "28px",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .aps-root input[type=range]::-webkit-slider-thumb { opacity: 0; }
        .aps-root input[type=range]::-moz-range-thumb { opacity: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        .aps-card-1 { animation: fadeUp 0.5s ease 0.05s both; }
        .aps-card-2 { animation: fadeUp 0.5s ease 0.15s both; }
        .aps-card-3 { animation: fadeUp 0.5s ease 0.25s both; }
        .aps-card-4 { animation: fadeUp 0.5s ease 0.35s both; }

        .pulse-ring {
          position: absolute; inset: -12px; border-radius: 50%;
          border: 1px solid currentColor;
          animation: pulse-ring 2.4s ease-in-out infinite;
        }
      `}</style>

      <div className="aps-root" style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "#081A04",
        minHeight: "100vh",
        color: "#F2F2F2",
        padding: "40px 20px 80px",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.4s ease"
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "#1B3022", border: "1px solid #2a4a34",
            borderRadius: "99px", padding: "6px 16px",
            fontSize: "11px", letterSpacing: "2px", color: "#A4FBCC",
            marginBottom: "20px", fontWeight: 600
          }}>
            ◆ AP STATISTICS
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700,
            margin: "0 0 12px", lineHeight: 1.15,
            letterSpacing: "-1px"
          }}>
            Score{" "}
            <span style={{
              color: "#A4FBCC",
              textShadow: "0 0 30px rgba(164,251,204,0.4)"
            }}>Calculator</span>
          </h1>
          <p style={{ color: "#9199A5", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            Estimate your AP Statistics exam score from raw section inputs using the 50/50 weighting model.
          </p>
        </div>

        {/* Main grid */}
        <div style={{
          maxWidth: "960px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>

          {/* Inputs Card */}
          <div className="aps-card-1" style={{ ...cardStyle, gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "10px",
                background: "rgba(164,251,204,0.1)", border: "1px solid rgba(164,251,204,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
              }}>✏️</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "15px" }}>Section Inputs</div>
                <div style={{ color: "#9199A5", fontSize: "11px" }}>Drag sliders to your score</div>
              </div>
            </div>

            <Slider
              label="MCQ Correct"
              sublabel="Multiple Choice"
              value={mcq} max={40} onChange={setMcq}
              color="#A4FBCC"
            />
            <Slider
              label="FRQ Points"
              sublabel="Free Response"
              value={frq} max={24} onChange={setFrq}
              color="#7db4fb"
            />

            <div style={{
              background: "#0e2a16", borderRadius: "12px", padding: "14px 16px",
              border: "1px solid #1e3e28", marginTop: "8px"
            }}>
              <div style={{ color: "#9199A5", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "10px" }}>
                WEIGHTING MODEL
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ color: "#A4FBCC", fontWeight: 700, fontSize: "22px" }}>50%</div>
                  <div style={{ color: "#9199A5", fontSize: "11px" }}>MCQ Weight</div>
                </div>
                <div style={{ width: "1px", background: "#1e3e28" }} />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ color: "#7db4fb", fontWeight: 700, fontSize: "22px" }}>50%</div>
                  <div style={{ color: "#9199A5", fontSize: "11px" }}>FRQ Weight</div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Display Card */}
          <div className="aps-card-2" style={{
            ...cardStyle,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", textAlign: "center",
            position: "relative", overflow: "hidden"
          }}>
            {/* Background glow */}
            <div style={{
              position: "absolute", width: "200px", height: "200px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
              transition: "background 0.4s ease",
              pointerEvents: "none"
            }} />

            <div style={{ position: "relative" }}>
              <div style={{ color: color, animation: "pulse-ring 2.4s ease-in-out infinite" }}
                className="pulse-ring" />
              <ScoreGauge composite={composite} apScore={apScore} />
            </div>

            <div style={{
              marginTop: "16px", padding: "10px 20px",
              background: `${color}14`,
              border: `1px solid ${color}30`,
              borderRadius: "12px",
              transition: "all 0.3s ease"
            }}>
              <div style={{ color, fontWeight: 700, fontSize: "13px", transition: "color 0.3s" }}>
                {apScore.label}
              </div>
              <div style={{ color: "#9199A5", fontSize: "11px", marginTop: "2px" }}>
                {apScore.percentile} of test-takers
              </div>
            </div>

            <div style={{ marginTop: "24px", width: "100%" }}>
              <div style={{ color: "#9199A5", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "12px" }}>
                SECTION BREAKDOWN
              </div>
              <BarStat label="MCQ Weighted" value={mcqWeighted} max={50} color="#A4FBCC" />
              <BarStat label="FRQ Weighted" value={frqWeighted} max={50} color="#7db4fb" />
            </div>
          </div>

          {/* Composite Score Card */}
          <div className="aps-card-3" style={{ ...cardStyle }}>
            <div style={{ marginBottom: "20px" }}>
              <div style={{ color: "#9199A5", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "6px" }}>
                COMPOSITE SCORE
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{
                  fontSize: "52px", fontWeight: 700, lineHeight: 1,
                  color, textShadow: `0 0 24px ${color}44`,
                  transition: "color 0.3s ease"
                }}>
                  <AnimatedNumber value={composite} decimals={1} />
                </span>
                <span style={{ color: "#9199A5", fontSize: "18px" }}>/100</span>
              </div>
            </div>

            {/* Composite bar */}
            <div style={{ position: "relative", height: "8px", background: "#0e2a16", borderRadius: "99px", marginBottom: "20px" }}>
              {/* Threshold markers */}
              {[45, 57, 70, 80].map(t => (
                <div key={t} style={{
                  position: "absolute", left: `${t}%`, top: "-4px",
                  width: "1px", height: "16px",
                  background: "#2a4a34"
                }} />
              ))}
              <div style={{
                height: "100%", width: `${composite}%`, borderRadius: "99px",
                background: `linear-gradient(90deg, #1B3022, ${color})`,
                boxShadow: `0 0 10px ${color}44`,
                transition: "width 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease"
              }} />
            </div>

            <div style={{ color: "#9199A5", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "10px" }}>
              SCORE SCALE
            </div>
            {[...SCORE_THRESHOLDS].reverse().map((t) => (
              <ScoreRow
                key={t.score}
                threshold={t}
                isActive={apScore.score === t.score}
                composite={composite}
              />
            ))}
          </div>

          {/* Info card */}
          <div className="aps-card-4" style={{ ...cardStyle, gridColumn: "span 1" }}>
            <div style={{ color: "#9199A5", fontSize: "11px", letterSpacing: "1.5px", marginBottom: "16px" }}>
              HOW IT WORKS
            </div>

            {[
              { step: "01", label: "MCQ Section", desc: "40 questions, no penalty for wrong answers. Each correct answer = 1 raw point.", color: "#A4FBCC" },
              { step: "02", label: "FRQ Section", desc: "6 questions scored 0–4 pts each via holistic rubric. Max 24 raw points.", color: "#7db4fb" },
              { step: "03", label: "50/50 Weighting", desc: "Each section scaled to 50 pts. Sum gives composite 0–100.", color: "#f0c070" },
              { step: "04", label: "Score Mapping", desc: "Composite mapped to 1–5 via equating curve (estimates ±3 pts, varies yearly).", color: "#A4FBCC" },
            ].map((item) => (
              <div key={item.step} style={{
                display: "flex", gap: "14px", marginBottom: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid #2a4a34"
              }}>
                <div style={{
                  flexShrink: 0, width: "28px", height: "28px",
                  borderRadius: "8px",
                  background: `${item.color}14`, border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.color, fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px"
                }}>{item.step}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "3px", color: item.color }}>
                    {item.label}
                  </div>
                  <div style={{ color: "#9199A5", fontSize: "12px", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}

            <div style={{
              background: "#0e2a16", borderRadius: "10px", padding: "12px 14px",
              border: "1px solid #1e3e28", marginTop: "-4px"
            }}>
              <div style={{ color: "#9199A5", fontSize: "11px", letterSpacing: "1px" }}>
                ⚠️ Note: Curves vary yearly by exam difficulty. These thresholds are estimates based on historical data.
              </div>
            </div>
          </div>

        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: "48px", color: "#9199A5", fontSize: "12px" }}>
          Based on AP Statistics scoring methodology · Thresholds approximate from historical data
        </div>
      </div>
    </>
  );
}