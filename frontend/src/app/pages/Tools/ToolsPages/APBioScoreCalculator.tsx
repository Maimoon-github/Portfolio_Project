import { useState, useEffect, useRef, FC, ReactNode, ChangeEvent } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const MCQ_MAX = 60 as const;
const FRQ_MAX = 34 as const; // 9+9+4+4+4+4

// ─── Types ────────────────────────────────────────────────────────────────────
type APScore = 1 | 2 | 3 | 4 | 5;
type FRQMode = "simple" | "detailed";
type FRQSectionType = "long" | "short";
type FRQSectionId = "long1" | "long2" | "short1" | "short2" | "short3" | "short4";

interface Threshold {
  readonly min: number;
  readonly max: number;
  readonly score: APScore;
  readonly label: string;
  readonly pct: string;
  readonly color: string;
}

interface FRQSection {
  readonly id: FRQSectionId;
  readonly label: string;
  readonly max: number;
  readonly type: FRQSectionType;
}

type FRQValues = Record<FRQSectionId, number>;

interface ScoreResult {
  mcqW: number;
  frqW: number;
  composite: number;
  band: Threshold;
}

interface FormulaItem {
  label: string;
  val: string;
  result: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const THRESHOLDS: readonly Threshold[] = [
  { min: 0,  max: 33,  score: 1, label: "Needs Work",  pct: "~13%", color: "#FF6B6B" },
  { min: 34, max: 49,  score: 2, label: "Developing",  pct: "~20%", color: "#FFB347" },
  { min: 50, max: 63,  score: 3, label: "Qualified",   pct: "~25%", color: "#FFE14D" },
  { min: 64, max: 77,  score: 4, label: "Proficient",  pct: "~22%", color: "#A4FBCC" },
  { min: 78, max: 100, score: 5, label: "Exceptional", pct: "~20%", color: "#00E5FF" },
] as const;

const FRQ_SECTIONS: readonly FRQSection[] = [
  { id: "long1",  label: "Long FRQ 1",  max: 9, type: "long"  },
  { id: "long2",  label: "Long FRQ 2",  max: 9, type: "long"  },
  { id: "short1", label: "Short FRQ 1", max: 4, type: "short" },
  { id: "short2", label: "Short FRQ 2", max: 4, type: "short" },
  { id: "short3", label: "Short FRQ 3", max: 4, type: "short" },
  { id: "short4", label: "Short FRQ 4", max: 4, type: "short" },
] as const;

const DEFAULT_FRQ_VALUES: FRQValues = {
  long1: 7, long2: 6,
  short1: 3, short2: 3, short3: 2, short4: 3,
};

// ─── Pure helpers ─────────────────────────────────────────────────────────────
function computeScore(mcq: number, frqTotal: number): ScoreResult {
  const mcqW      = (mcq / MCQ_MAX) * 50;
  const frqW      = (frqTotal / FRQ_MAX) * 50;
  const composite = Math.round((mcqW + frqW) * 10) / 10;
  const band      = THRESHOLDS.find(t => composite >= t.min && composite <= t.max) ?? THRESHOLDS[0];
  return { mcqW, frqW, composite, band };
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

// ─── AnimatedNumber ───────────────────────────────────────────────────────────
interface AnimatedNumberProps {
  value: number;
  decimals?: number;
}

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value, decimals = 0 }) => {
  const [display, setDisplay] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const displayRef = useRef<number>(0);

  useEffect(() => {
    const start    = displayRef.current;
    const end      = value;
    const duration = 600;
    const startTime = performance.now();

    const step = (now: number): void => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3);
      const next     = start + (end - start) * ease;
      displayRef.current = next;
      setDisplay(next);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <>{display.toFixed(decimals)}</>;
};

// ─── SliderInput ──────────────────────────────────────────────────────────────
interface SliderInputProps {
  label: string;
  value: number;
  max: number;
  onChange: (v: number) => void;
  accent: string;
}

const SliderInput: FC<SliderInputProps> = ({ label, value, max, onChange, accent }) => {
  const pct = (value / max) * 100;
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ color: "#9199A5", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>
          {label}
        </span>
        <span style={{ color: accent, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}>
          {value} / {max}
        </span>
      </div>
      <div style={{ position: "relative", height: "6px", borderRadius: "3px", background: "#0D2B12" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${pct}%`, borderRadius: "3px",
          background: `linear-gradient(90deg, #1B3022, ${accent})`,
          transition: "width 0.2s ease",
          boxShadow: `0 0 8px ${accent}55`,
        }} />
        <input
          type="range" min={0} max={max} value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
          style={{ position: "absolute", inset: "-8px 0", opacity: 0, cursor: "pointer", width: "100%", height: "22px" }}
        />
        <div style={{
          position: "absolute", top: "50%",
          left: `${pct}%`, transform: "translate(-50%, -50%)",
          width: "14px", height: "14px", borderRadius: "50%",
          background: accent, boxShadow: `0 0 12px ${accent}`,
          border: "2px solid #081A04", transition: "left 0.2s ease",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
};

// ─── APScoreGauge ─────────────────────────────────────────────────────────────
interface APScoreGaugeProps {
  score: APScore;
}

const APScoreGauge: FC<APScoreGaugeProps> = ({ score }) => {
  const scores: APScore[] = [1, 2, 3, 4, 5];
  return (
    <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginTop: "0.75rem" }}>
      {scores.map((s) => {
        const t      = THRESHOLDS.find(t => t.score === s) as Threshold;
        const active = s === score;
        return (
          <div key={s} style={{
            flex: 1, textAlign: "center", padding: "0.6rem 0.2rem", borderRadius: "8px",
            background: active ? `${t.color}22` : "#0D2B12",
            border: `1.5px solid ${active ? t.color : "#1B3022"}`,
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            transform: active ? "translateY(-4px) scale(1.08)" : "none",
            boxShadow: active ? `0 8px 24px ${t.color}33` : "none",
          }}>
            <div style={{
              fontSize: "1.4rem", fontWeight: 800,
              color: active ? t.color : "#9199A5",
              fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1,
            }}>{s}</div>
            <div style={{
              fontSize: "0.6rem",
              color: active ? t.color : "#9199A544",
              marginTop: "2px", fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {t.label.split(" ")[0]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── CompositeBar ─────────────────────────────────────────────────────────────
interface CompositeBarProps {
  composite: number;
}

const CompositeBar: FC<CompositeBarProps> = ({ composite }) => {
  const [animated, setAnimated] = useState<number>(0);

  useEffect(() => {
    const id = setTimeout(() => setAnimated(composite), 100);
    return () => clearTimeout(id);
  }, [composite]);

  const band = THRESHOLDS.find(t => composite >= t.min && composite <= t.max) ?? THRESHOLDS[0];

  return (
    <div>
      <div style={{ position: "relative", height: "10px", borderRadius: "5px", background: "#0D2B12", overflow: "hidden" }}>
        {THRESHOLDS.map((t, i) => (
          <div key={i} style={{
            position: "absolute", top: 0, height: "100%",
            left: `${t.min}%`, width: `${t.max - t.min + 1}%`,
            background: `${t.color}22`, borderRight: "1px solid #081A04",
          }} />
        ))}
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${animated}%`,
          background: `linear-gradient(90deg, #1B3022 0%, ${band.color} 100%)`,
          borderRadius: "5px",
          transition: "width 0.7s cubic-bezier(0.34,1.2,0.64,1)",
          boxShadow: `0 0 16px ${band.color}66`,
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
        {([0, 25, 50, 75, 100] as const).map(v => (
          <span key={v} style={{ fontSize: "0.65rem", color: "#9199A566", fontFamily: "'Space Grotesk', sans-serif" }}>{v}</span>
        ))}
      </div>
    </div>
  );
};

// ─── StatBox ──────────────────────────────────────────────────────────────────
interface StatBoxProps {
  label: string;
  children: ReactNode;
  color: string;
}

const StatBox: FC<StatBoxProps> = ({ label, children, color }) => (
  <div style={{ flex: 1, background: "#081A04", borderRadius: "8px", padding: "0.7rem", textAlign: "center" }}>
    <div style={{ fontSize: "0.65rem", color: "#9199A5", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    <div style={{ fontSize: "1.3rem", fontWeight: 700, color }}>{children}</div>
  </div>
);

// ─── SectionBadge ─────────────────────────────────────────────────────────────
interface SectionBadgeProps {
  dot: string;
  title: string;
  weight: string;
  weightColor: string;
}

const SectionBadge: FC<SectionBadgeProps> = ({ dot, title, weight, weightColor }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: dot, boxShadow: `0 0 8px ${dot}` }} />
    <span style={{ fontSize: "0.75rem", color: "#9199A5", letterSpacing: "0.08em", textTransform: "uppercase" }}>{title}</span>
    <span style={{
      marginLeft: "auto", fontSize: "0.7rem",
      color: `${weightColor}99`, background: `${weightColor}11`,
      padding: "2px 8px", borderRadius: "999px",
    }}>{weight}</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const APBioScoreCalculator: FC = () => {
  const [mcq, setMcq]             = useState<number>(45);
  const [frqValues, setFrqValues] = useState<FRQValues>(DEFAULT_FRQ_VALUES);
  const [activeTab, setActiveTab] = useState<FRQMode>("simple");
  const [simpleFrq, setSimpleFrq] = useState<number>(25);
  const [mounted, setMounted]     = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(id);
  }, []);

  const frqTotal: number =
    activeTab === "simple"
      ? simpleFrq
      : Object.values(frqValues).reduce((sum, v) => sum + v, 0);

  const { mcqW, frqW, composite, band } = computeScore(mcq, frqTotal);

  const setFrqField = (id: FRQSectionId, val: number): void =>
    setFrqValues(prev => ({ ...prev, [id]: val }));

  const formulaItems: FormulaItem[] = [
    { label: "MCQ Weight", val: `(${mcq} / 60) × 50`,    result: mcqW.toFixed(2),       color: "#A4FBCC"    },
    { label: "+",          val: "",                        result: "",                     color: "#9199A5"    },
    { label: "FRQ Weight", val: `(${frqTotal} / 34) × 50`, result: frqW.toFixed(2),      color: "#00E5FF"    },
    { label: "=",          val: "",                        result: "",                     color: "#9199A5"    },
    { label: "Composite",  val: "0 – 100",                 result: composite.toFixed(1),  color: band.color   },
    { label: "→",          val: "",                        result: "",                     color: "#9199A5"    },
    { label: "AP Score",   val: "1 – 5 scale",             result: String(band.score),    color: band.color   },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #081A04; }
        .apb-root { font-family: 'Space Grotesk', sans-serif; min-height: 100vh; background: #081A04; color: #F2F2F2; padding: 2rem 1rem; }
        .apb-root input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; }
        .apb-root input[type=number]::-webkit-inner-spin-button,
        .apb-root input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
        .apb-tab { cursor: pointer; padding: 0.5rem 1.2rem; border-radius: 6px; border: 1.5px solid #1B3022; font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; transition: all 0.25s ease; background: transparent; color: #9199A5; }
        .apb-tab.active { background: #1B3022; border-color: #A4FBCC; color: #A4FBCC; }
        .apb-tab:hover:not(.active) { border-color: #9199A5; color: #F2F2F2; }
        .apb-card { background: #0D2B12; border: 1px solid #1B3022; border-radius: 16px; padding: 1.5rem; transition: box-shadow 0.3s ease; }
        .apb-card:hover { box-shadow: 0 4px 24px #A4FBCC11; }
        .apb-numbox input { background: #081A04; border: 1.5px solid #1B3022; color: #F2F2F2; font-family: 'Space Grotesk', sans-serif; border-radius: 8px; padding: 0.35rem 0.5rem; width: 52px; text-align: center; font-size: 0.9rem; outline: none; transition: border-color 0.2s; }
        .apb-numbox input:focus { border-color: #A4FBCC; }
        .apb-glow { animation: apbPulse 3s ease-in-out infinite; }
        @keyframes apbPulse { 0%,100%{ text-shadow: 0 0 20px currentColor; } 50%{ text-shadow: 0 0 40px currentColor, 0 0 80px currentColor; } }
        .apb-fadein { animation: apbFadeSlideIn 0.6s cubic-bezier(0.34,1.2,0.64,1) both; }
        @keyframes apbFadeSlideIn { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: none; } }
        .apb-s1 { animation-delay: 0.05s; }
        .apb-s2 { animation-delay: 0.12s; }
        .apb-s3 { animation-delay: 0.20s; }
        .apb-s4 { animation-delay: 0.28s; }
        .apb-dna { position: absolute; right: -20px; top: -20px; opacity: 0.04; pointer-events: none; }
        .apb-grid-bg { position: fixed; inset: 0; background-image: linear-gradient(#1B302211 1px, transparent 1px), linear-gradient(90deg, #1B302211 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; z-index: 0; }
        .apb-disclaimer { font-size: 0.72rem; color: #9199A566; text-align: center; margin-top: 2rem; line-height: 1.6; max-width: 520px; margin-left: auto; margin-right: auto; }
        @media (min-width: 768px) { .apb-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; } }
      `}</style>

      <div className="apb-grid-bg" />

      <div className="apb-root" style={{ background: "#081A04", minHeight: 0 }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1rem 2rem" }}>

          {/* ── Header ── */}
          <div className="apb-fadein" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#1B3022", border: "1px solid #A4FBCC33",
              borderRadius: "999px", padding: "0.3rem 0.9rem", marginBottom: "1rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#A4FBCC", display: "inline-block", boxShadow: "0 0 8px #A4FBCC" }} />
              <span style={{ fontSize: "0.72rem", color: "#A4FBCC", letterSpacing: "0.1em", textTransform: "uppercase" }}>AP Exam Tool</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
              AP Bio{" "}
              <span style={{ color: "#A4FBCC" }} className="apb-glow">Score Calculator</span>
            </h1>
            <p style={{ color: "#9199A5", fontSize: "0.95rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
              Estimate your AP Biology exam score (1–5) using College Board weighting. Enter your MCQ and FRQ performance below.
            </p>
          </div>

          {/* ── Two-column grid ── */}
          <div className="apb-two-col">

            {/* ── LEFT: Inputs ── */}
            <div>

              {/* MCQ Card */}
              <div className="apb-card apb-fadein apb-s1" style={{ marginBottom: "1rem", position: "relative", overflow: "hidden" }}>
                <svg className="apb-dna" width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                  <circle cx="60" cy="60" r="55" fill="none" stroke="#A4FBCC" strokeWidth="1" strokeDasharray="6 4" />
                </svg>
                <SectionBadge dot="#A4FBCC" title="Section I — Multiple Choice" weight="50% weight" weightColor="#A4FBCC" />
                <SliderInput label="Correct Answers" value={mcq} max={MCQ_MAX} onChange={setMcq} accent="#A4FBCC" />
                <div style={{ display: "flex", gap: "1rem" }}>
                  <StatBox label="Raw" color="#A4FBCC">{mcq}/{MCQ_MAX}</StatBox>
                  <StatBox label="Weighted" color="#A4FBCC"><AnimatedNumber value={mcqW} decimals={1} /></StatBox>
                  <StatBox label="Accuracy" color="#A4FBCC"><AnimatedNumber value={(mcq / MCQ_MAX) * 100} decimals={0} />%</StatBox>
                </div>
              </div>

              {/* FRQ Card */}
              <div className="apb-card apb-fadein apb-s2">
                <SectionBadge dot="#00E5FF" title="Section II — Free Response" weight="50% weight" weightColor="#00E5FF" />

                {/* Mode Tabs */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  {(["simple", "detailed"] as FRQMode[]).map(t => (
                    <button key={t} className={`apb-tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>
                      {t === "simple" ? "Total Points" : "Per Question"}
                    </button>
                  ))}
                </div>

                {activeTab === "simple" ? (
                  <SliderInput label="Total FRQ Points" value={simpleFrq} max={FRQ_MAX} onChange={setSimpleFrq} accent="#00E5FF" />
                ) : (
                  <div>
                    {FRQ_SECTIONS.map(sec => (
                      <div key={sec.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                        <span style={{
                          fontSize: "0.7rem",
                          color: sec.type === "long" ? "#00E5FF" : "#A4FBCC",
                          width: "88px", flexShrink: 0, letterSpacing: "0.04em",
                        }}>{sec.label}</span>
                        <div style={{ flex: 1, position: "relative", height: "4px", borderRadius: "2px", background: "#081A04" }}>
                          <div style={{
                            position: "absolute", left: 0, top: 0, height: "100%",
                            width: `${(frqValues[sec.id] / sec.max) * 100}%`,
                            borderRadius: "2px",
                            background: sec.type === "long" ? "#00E5FF" : "#A4FBCC",
                            transition: "width 0.2s ease",
                          }} />
                          <input
                            type="range" min={0} max={sec.max} value={frqValues[sec.id]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFrqField(sec.id, Number(e.target.value))}
                            style={{ position: "absolute", inset: "-8px 0", opacity: 0, cursor: "pointer", width: "100%", height: "20px" }}
                          />
                        </div>
                        <div className="apb-numbox">
                          <input
                            type="number" min={0} max={sec.max} value={frqValues[sec.id]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              setFrqField(sec.id, clamp(Number(e.target.value), 0, sec.max))
                            }
                          />
                        </div>
                        <span style={{ fontSize: "0.7rem", color: "#9199A566", width: "24px" }}>/{sec.max}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <StatBox label="Raw" color="#00E5FF">{frqTotal}/{FRQ_MAX}</StatBox>
                  <StatBox label="Weighted" color="#00E5FF"><AnimatedNumber value={frqW} decimals={1} /></StatBox>
                  <StatBox label="Accuracy" color="#00E5FF"><AnimatedNumber value={(frqTotal / FRQ_MAX) * 100} decimals={0} />%</StatBox>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Results ── */}
            <div>

              {/* Predicted AP Score */}
              <div className="apb-card apb-fadein apb-s3" style={{
                marginBottom: "1rem",
                border: `1px solid ${band.color}44`,
                boxShadow: `0 0 40px ${band.color}11`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: "0.72rem", color: "#9199A5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Predicted AP Score
                </div>
                <div style={{
                  fontSize: "7rem", fontWeight: 800, lineHeight: 1,
                  color: band.color, textShadow: `0 0 40px ${band.color}88`,
                  transition: "color 0.4s ease, text-shadow 0.4s ease",
                  letterSpacing: "-0.04em", marginBottom: "0.25rem",
                }}>
                  {band.score}
                </div>
                <div style={{
                  display: "inline-block",
                  background: `${band.color}22`, border: `1px solid ${band.color}55`,
                  borderRadius: "999px", padding: "0.25rem 1rem", marginBottom: "1rem",
                }}>
                  <span style={{ color: band.color, fontSize: "0.85rem", fontWeight: 600 }}>{band.label}</span>
                </div>
                <APScoreGauge score={band.score as APScore} />
              </div>

              {/* Composite Score */}
              <div className="apb-card apb-fadein apb-s3" style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "#9199A5", letterSpacing: "0.08em", textTransform: "uppercase" }}>Composite Score</span>
                  <span style={{ fontSize: "1.6rem", fontWeight: 800, color: band.color }}>
                    <AnimatedNumber value={composite} decimals={1} />
                    <span style={{ fontSize: "0.9rem", color: "#9199A5" }}>/100</span>
                  </span>
                </div>
                <CompositeBar composite={composite} />
                {/* MCQ vs FRQ breakdown bar */}
                <div style={{ display: "flex", gap: "4px", marginTop: "1rem", borderRadius: "6px", overflow: "hidden", height: "28px" }}>
                  <div style={{
                    flex: mcqW, background: "linear-gradient(90deg, #1B3022, #A4FBCC88)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", color: "#A4FBCC", fontWeight: 600, letterSpacing: "0.06em",
                    transition: "flex 0.5s ease",
                  }}>
                    MCQ {mcqW.toFixed(1)}
                  </div>
                  <div style={{
                    flex: frqW, background: "linear-gradient(90deg, #00E5FF44, #00E5FF88)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", color: "#00E5FF", fontWeight: 600, letterSpacing: "0.06em",
                    transition: "flex 0.5s ease",
                  }}>
                    FRQ {frqW.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Score Thresholds */}
              <div className="apb-card apb-fadein apb-s4">
                <div style={{ fontSize: "0.72rem", color: "#9199A5", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Score Thresholds
                </div>
                {THRESHOLDS.slice().reverse().map(t => {
                  const isActive = band.score === t.score;
                  return (
                    <div key={t.score} style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      padding: "0.45rem 0.6rem", borderRadius: "8px", marginBottom: "4px",
                      background: isActive ? `${t.color}15` : "transparent",
                      border: `1px solid ${isActive ? t.color + "44" : "transparent"}`,
                      transition: "all 0.35s ease",
                    }}>
                      <div style={{
                        width: "10px", height: "10px", borderRadius: "50%",
                        background: t.color, flexShrink: 0,
                        boxShadow: isActive ? `0 0 8px ${t.color}` : "none",
                      }} />
                      <span style={{ fontWeight: 700, color: isActive ? t.color : "#9199A5", fontSize: "0.9rem", width: "16px" }}>{t.score}</span>
                      <span style={{ color: isActive ? "#F2F2F2" : "#9199A5", fontSize: "0.8rem", flex: 1 }}>{t.label}</span>
                      <span style={{ color: "#9199A566", fontSize: "0.72rem" }}>{t.min}–{t.max}</span>
                      <span style={{ color: "#9199A555", fontSize: "0.7rem" }}>{t.pct}</span>
                    </div>
                  );
                })}
                <p style={{ fontSize: "0.68rem", color: "#9199A544", marginTop: "0.5rem", lineHeight: 1.5 }}>
                  Thresholds approximated from historical data. Actual curves set annually by College Board.
                </p>
              </div>
            </div>
          </div>

          {/* ── Formula Explainer ── */}
          <div className="apb-card apb-fadein apb-s4" style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: "0.72rem", color: "#9199A5", letterSpacing: "0.08em", textTransform: "uppercase", width: "100%", textAlign: "center", marginBottom: "0.25rem" }}>
              Scoring Formula
            </div>
            {formulaItems.map((item, i) =>
              item.val === "" ? (
                <div key={i} style={{ fontSize: "1.4rem", color: item.color, fontWeight: 300 }}>{item.label}</div>
              ) : (
                <div key={i} style={{ background: "#081A04", borderRadius: "10px", padding: "0.6rem 1rem", textAlign: "center", minWidth: "120px" }}>
                  <div style={{ fontSize: "0.62rem", color: "#9199A5", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9199A5", margin: "2px 0" }}>{item.val}</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700, color: item.color }}>{item.result}</div>
                </div>
              )
            )}
          </div>

          <p className="apb-disclaimer">
            This calculator provides an estimated score based on approximate College Board weighting (50% MCQ / 50% FRQ) and historical equating thresholds. Actual scores may vary by ±1 point due to annual curve adjustments. FRQ maximum of 34 points assumes standard rubric (2 long × 9 pts + 4 short × 4 pts).
          </p>
        </div>
      </div>
    </>
  );
};

export default APBioScoreCalculator;