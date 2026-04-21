import { useParams, Link } from "react-router";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { calculators } from "../data/mock-data";

// ──────────────────────────────────────────────────────────────────────────────
// Shared UI primitives
// ──────────────────────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "rgba(126,184,247,0.85)", letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
      {children}
    </label>
  );
}

function Input({ value, onChange, type = "number", min, max, step, placeholder }: { value: string | number; onChange: (v: string) => void; type?: string; min?: number; max?: number; step?: number; placeholder?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl outline-none transition-colors"
      style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: "#1c1b1b", color: "#f0e6d3", border: "1px solid rgba(84,68,52,0.25)", fontSize: "0.95rem", fontWeight: 500 }}
    />
  );
}

function Slider({ label, value, min, max, step = 1, format, onChange }: { label: string; value: number; min: number; max: number; step?: number; format: (v: number) => string; onChange: (v: number) => void }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <Label>{label}</Label>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#ffc68b" }}>{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none h-2 rounded-full outline-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #ffc68b ${pct}%, rgba(84,68,52,0.3) ${pct}%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span style={{ fontSize: "0.68rem", color: "rgba(240,230,211,0.3)" }}>{format(min)}</span>
        <span style={{ fontSize: "0.68rem", color: "rgba(240,230,211,0.3)" }}>{format(max)}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, accent = false, large = false }: { label: string; value: string; accent?: boolean; large?: boolean }) {
  return (
    <div className="p-5 rounded-2xl flex flex-col gap-1" style={{ backgroundColor: accent ? "rgba(255,198,139,0.07)" : "#1c1b1b", border: accent ? "1px solid rgba(255,198,139,0.2)" : "1px solid rgba(84,68,52,0.12)" }}>
      <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: large ? "1.8rem" : "1.3rem", color: accent ? "#ffc68b" : "#f0e6d3", letterSpacing: "-0.02em" }}>{value}</span>
    </div>
  );
}

function CalcShell({ title, emoji, description, children, relatedLinks }: { title: string; emoji: string; description: string; children: React.ReactNode; relatedLinks: { to: string; label: string }[] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Main calc */}
        <div className="xl:col-span-2">
          <div className="text-5xl mb-5">{emoji}</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.025em", marginBottom: "0.75rem" }}>{title}</h1>
          <p style={{ color: "rgba(240,230,211,0.55)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>{description}</p>
          {children}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="sticky top-24">
            <div className="p-6 rounded-2xl mb-5" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
              <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "'Space Grotesk', sans-serif" }}>More Tools</p>
              <div className="flex flex-col gap-2">
                {relatedLinks.map(({ to, label }) => (
                  <Link key={to} to={to} className="flex items-center justify-between group px-3 py-2.5 rounded-lg" style={{ backgroundColor: "#201f1f" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", color: "rgba(240,230,211,0.6)", fontWeight: 500 }}>{label}</span>
                    <ArrowRight size={13} style={{ color: "#ffc68b" }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/calculators" className="flex items-center gap-2 text-sm" style={{ color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
              <ArrowLeft size={13} /> All Calculators
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Individual Calculators
// ──────────────────────────────────────────────────────────────────────────────

// 1. MORTGAGE
function MortgageCalculator({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [principal, setPrincipal] = useState(350000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [downPct, setDownPct] = useState(20);

  const loanAmount = principal * (1 - downPct / 100);
  const { monthlyPayment, totalPaid, totalInterest } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term * 12;
    if (r === 0) return { monthlyPayment: loanAmount / n, totalPaid: loanAmount, totalInterest: 0 };
    const mp = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { monthlyPayment: mp, totalPaid: mp * n, totalInterest: mp * n - loanAmount };
  }, [loanAmount, rate, term]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <CalcShell
      title="Mortgage Calculator"
      emoji="🏠"
      description="Calculate your monthly mortgage payment, total interest paid, and full amortisation schedule. All calculations are performed in your browser — your data never leaves your device."
      relatedLinks={relatedLinks}
    >
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <Slider label="Home Price" value={principal} min={50000} max={2000000} step={5000} format={(v) => fmt(v)} onChange={setPrincipal} />
        <Slider label="Down Payment" value={downPct} min={3} max={50} step={1} format={(v) => `${v}% (${fmt(principal * v / 100)})`} onChange={setDownPct} />
        <Slider label="Interest Rate (APR)" value={rate} min={1} max={15} step={0.05} format={(v) => `${v.toFixed(2)}%`} onChange={setRate} />
        <Slider label="Loan Term" value={term} min={5} max={30} step={5} format={(v) => `${v} years`} onChange={setTerm} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard label="Monthly Payment" value={fmt(monthlyPayment)} accent large />
        <ResultCard label="Total Interest" value={fmt(totalInterest)} />
        <ResultCard label="Total Cost" value={fmt(totalPaid + principal * (downPct / 100))} />
      </div>

      <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "rgba(240,230,211,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}>Loan Amount</span>
          <span style={{ color: "#f0e6d3", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{fmt(loanAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "rgba(240,230,211,0.5)", fontFamily: "'Space Grotesk', sans-serif" }}>Down Payment</span>
          <span style={{ color: "#f0e6d3", fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>{fmt(principal * downPct / 100)} ({downPct}%)</span>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span style={{ color: "#ffc68b", fontFamily: "'Space Grotesk', sans-serif" }}>Principal {((loanAmount / totalPaid) * 100).toFixed(0)}%</span>
            <span style={{ color: "rgba(126,184,247,0.7)", fontFamily: "'Space Grotesk', sans-serif" }}>Interest {((totalInterest / totalPaid) * 100).toFixed(0)}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#201f1f" }}>
            <div className="h-full rounded-full" style={{ width: `${(loanAmount / totalPaid) * 100}%`, background: "linear-gradient(to right, #ffc68b, #ff9f1c)" }} />
          </div>
        </div>
      </div>
    </CalcShell>
  );
}

// 2. COMPOUND INTEREST
function CompoundInterestCalculator({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [monthly, setMonthly] = useState(200);
  const [frequency, setFrequency] = useState(12);

  const { futureValue, totalContributions, totalInterest } = useMemo(() => {
    const r = rate / 100 / frequency;
    const n = years * frequency;
    const fvPrincipal = principal * Math.pow(1 + r, n);
    const fvContributions = monthly * ((Math.pow(1 + r, n) - 1) / r);
    const fv = fvPrincipal + fvContributions;
    const tc = principal + monthly * 12 * years;
    return { futureValue: fv, totalContributions: tc, totalInterest: fv - tc };
  }, [principal, rate, years, monthly, frequency]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // Chart data (simplified yearly snapshots)
  const chartData = useMemo(() => {
    return Array.from({ length: years + 1 }, (_, yr) => {
      const r = rate / 100 / frequency;
      const n = yr * frequency;
      const fvP = principal * Math.pow(1 + r, n);
      const fvC = monthly > 0 && r > 0 ? monthly * ((Math.pow(1 + r, n) - 1) / r) : monthly * n;
      return { year: yr, balance: fvP + fvC, contributions: principal + monthly * 12 * yr };
    });
  }, [principal, rate, years, monthly, frequency]);

  const maxBalance = chartData[chartData.length - 1].balance;

  return (
    <CalcShell
      title="Compound Interest Calculator"
      emoji="📈"
      description="See how your money grows over time with the power of compound interest. Add monthly contributions to model a regular savings or investment strategy."
      relatedLinks={relatedLinks}
    >
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <Slider label="Initial Investment" value={principal} min={0} max={100000} step={500} format={(v) => fmt(v)} onChange={setPrincipal} />
        <Slider label="Annual Interest Rate" value={rate} min={0.5} max={30} step={0.5} format={(v) => `${v}%`} onChange={setRate} />
        <Slider label="Time Period" value={years} min={1} max={40} step={1} format={(v) => `${v} years`} onChange={setYears} />
        <Slider label="Monthly Contribution" value={monthly} min={0} max={5000} step={50} format={(v) => fmt(v)} onChange={setMonthly} />
        <div className="mb-4">
          <Label>Compounding Frequency</Label>
          <div className="flex gap-2 flex-wrap">
            {[{ label: "Annually", value: 1 }, { label: "Quarterly", value: 4 }, { label: "Monthly", value: 12 }, { label: "Daily", value: 365 }].map((f) => (
              <button key={f.value} onClick={() => setFrequency(f.value)}
                className="px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, backgroundColor: frequency === f.value ? "rgba(255,198,139,0.12)" : "#201f1f", color: frequency === f.value ? "#ffc68b" : "rgba(240,230,211,0.5)", border: frequency === f.value ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(84,68,52,0.15)" }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard label="Future Value" value={fmt(futureValue)} accent large />
        <ResultCard label="Total Contributed" value={fmt(totalContributions)} />
        <ResultCard label="Interest Earned" value={fmt(totalInterest)} />
      </div>

      {/* Growth chart */}
      <div className="p-5 rounded-2xl" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "1rem" }}>
          Growth Chart
        </p>
        <div className="relative h-40 flex items-end gap-1">
          {chartData.filter((_, i) => i % Math.max(1, Math.floor(years / 20)) === 0).map((d) => (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-0.5" style={{ minWidth: 0 }}>
              <div className="w-full flex flex-col justify-end" style={{ height: "130px" }}>
                <div className="w-full rounded-sm" style={{ height: `${(d.contributions / maxBalance) * 130}px`, backgroundColor: "rgba(126,184,247,0.3)" }} />
                <div className="w-full rounded-t-sm" style={{ height: `${((d.balance - d.contributions) / maxBalance) * 130}px`, background: "linear-gradient(to top, #ff9f1c, #ffc68b)" }} />
              </div>
              {d.year % 5 === 0 && (
                <span style={{ fontSize: "0.6rem", color: "rgba(240,230,211,0.3)", fontFamily: "'Space Grotesk', sans-serif" }}>Yr{d.year}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm" style={{ background: "linear-gradient(to top, #ff9f1c, #ffc68b)" }} /><span style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>Interest</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm" style={{ backgroundColor: "rgba(126,184,247,0.3)" }} /><span style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>Contributions</span></div>
        </div>
      </div>
    </CalcShell>
  );
}

// 3. BMI
function BMICalculator({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [weightLbs, setWeightLbs] = useState(165);
  const [weightKg, setWeightKg] = useState(75);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(10);
  const [heightCm, setHeightCm] = useState(178);

  const bmi = useMemo(() => {
    if (unit === "metric") return weightKg / Math.pow(heightCm / 100, 2);
    const totalInches = heightFt * 12 + heightIn;
    return (weightLbs / (totalInches * totalInches)) * 703;
  }, [unit, weightLbs, weightKg, heightFt, heightIn, heightCm]);

  const category = bmi < 18.5 ? { label: "Underweight", color: "#7eb8f7" } : bmi < 25 ? { label: "Normal weight", color: "rgba(74,222,128,0.9)" } : bmi < 30 ? { label: "Overweight", color: "#ffc68b" } : { label: "Obese", color: "#f87171" };

  const bmiCategories = [
    { label: "Underweight", range: "< 18.5", color: "#7eb8f7" },
    { label: "Normal", range: "18.5–24.9", color: "rgba(74,222,128,0.9)" },
    { label: "Overweight", range: "25–29.9", color: "#ffc68b" },
    { label: "Obese", range: "≥ 30", color: "#f87171" },
  ];

  const needle = Math.min(Math.max((bmi - 10) / (45 - 10), 0), 1) * 100;

  return (
    <CalcShell
      title="BMI Calculator"
      emoji="⚖️"
      description="Calculate your Body Mass Index using metric or imperial measurements. BMI is a screening tool — consult a healthcare provider for a comprehensive health assessment."
      relatedLinks={relatedLinks}
    >
      {/* Unit toggle */}
      <div className="flex gap-2 mb-6">
        {(["imperial", "metric"] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)}
            className="px-4 py-2 rounded-lg text-sm capitalize transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, backgroundColor: unit === u ? "rgba(255,198,139,0.12)" : "#1c1b1b", color: unit === u ? "#ffc68b" : "rgba(240,230,211,0.5)", border: unit === u ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(84,68,52,0.15)" }}>
            {u}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        {unit === "imperial" ? (
          <>
            <Slider label="Weight (lbs)" value={weightLbs} min={60} max={400} step={1} format={(v) => `${v} lbs`} onChange={setWeightLbs} />
            <Slider label="Height (feet)" value={heightFt} min={4} max={7} step={1} format={(v) => `${v} ft`} onChange={setHeightFt} />
            <Slider label="Height (inches)" value={heightIn} min={0} max={11} step={1} format={(v) => `${v} in`} onChange={setHeightIn} />
          </>
        ) : (
          <>
            <Slider label="Weight (kg)" value={weightKg} min={30} max={200} step={0.5} format={(v) => `${v} kg`} onChange={setWeightKg} />
            <Slider label="Height (cm)" value={heightCm} min={100} max={220} step={1} format={(v) => `${v} cm`} onChange={setHeightCm} />
          </>
        )}
      </div>

      {/* BMI Result */}
      <div className="p-6 rounded-2xl mb-6 text-center" style={{ backgroundColor: "#1c1b1b", border: `1px solid ${category.color}33` }}>
        <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.5rem" }}>Your BMI</p>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "3.5rem", color: category.color, letterSpacing: "-0.03em", lineHeight: 1 }}>{bmi.toFixed(1)}</p>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: category.color, marginTop: "0.5rem" }}>{category.label}</p>

        {/* Gauge bar */}
        <div className="relative mt-5 h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #7eb8f7, rgba(74,222,128,0.9) 33%, #ffc68b 66%, #f87171)" }}>
          <div className="absolute top-0 w-0.5 h-full bg-white" style={{ left: `${needle}%`, boxShadow: "0 0 6px rgba(255,255,255,0.6)" }} />
        </div>
        <div className="flex justify-between mt-1">
          <span style={{ fontSize: "0.65rem", color: "rgba(240,230,211,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>10</span>
          <span style={{ fontSize: "0.65rem", color: "rgba(240,230,211,0.35)", fontFamily: "'Space Grotesk', sans-serif" }}>45+</span>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {bmiCategories.map((cat) => (
          <div key={cat.label} className="p-3 rounded-xl text-center" style={{ backgroundColor: cat.label === category.label ? `${cat.color}18` : "#1c1b1b", border: `1px solid ${cat.label === category.label ? cat.color + "40" : "rgba(84,68,52,0.12)"}` }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: cat.color, fontFamily: "'Space Grotesk', sans-serif" }}>{cat.label}</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif", marginTop: "0.2rem" }}>{cat.range}</p>
          </div>
        ))}
      </div>
    </CalcShell>
  );
}

// 4. TAX BRACKET
function TaxBracketCalculator({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [income, setIncome] = useState(85000);
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "hoh">("single");

  const brackets2024 = {
    single: [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23200, rate: 0.10 },
      { min: 23200, max: 94300, rate: 0.12 },
      { min: 94300, max: 201050, rate: 0.22 },
      { min: 201050, max: 383900, rate: 0.24 },
      { min: 383900, max: 487450, rate: 0.32 },
      { min: 487450, max: 731200, rate: 0.35 },
      { min: 731200, max: Infinity, rate: 0.37 },
    ],
    hoh: [
      { min: 0, max: 16550, rate: 0.10 },
      { min: 16550, max: 63100, rate: 0.12 },
      { min: 63100, max: 100500, rate: 0.22 },
      { min: 100500, max: 191950, rate: 0.24 },
      { min: 191950, max: 243700, rate: 0.32 },
      { min: 243700, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 },
    ],
  };

  const { totalTax, effectiveRate, marginalRate, taxByBracket } = useMemo(() => {
    const brackets = brackets2024[filingStatus];
    let total = 0;
    let marginal = 0;
    const breakdown: { rate: number; amount: number; taxable: number }[] = [];

    for (const b of brackets) {
      if (income > b.min) {
        const taxable = Math.min(income, b.max) - b.min;
        const tax = taxable * b.rate;
        total += tax;
        marginal = b.rate;
        breakdown.push({ rate: b.rate, amount: tax, taxable });
      }
    }
    return { totalTax: total, effectiveRate: (total / income) * 100, marginalRate: marginal * 100, taxByBracket: breakdown };
  }, [income, filingStatus]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <CalcShell
      title="Tax Bracket Calculator"
      emoji="🧾"
      description="Estimate your 2024 US federal income tax across all brackets. Shows your effective rate, marginal rate, and exactly how much falls in each bracket. Standard deduction not applied."
      relatedLinks={relatedLinks}
    >
      <div className="flex gap-2 mb-6 flex-wrap">
        {([["single", "Single"], ["married", "Married Filing Jointly"], ["hoh", "Head of Household"]] as const).map(([val, label]) => (
          <button key={val} onClick={() => setFilingStatus(val)}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, backgroundColor: filingStatus === val ? "rgba(255,198,139,0.12)" : "#1c1b1b", color: filingStatus === val ? "#ffc68b" : "rgba(240,230,211,0.5)", border: filingStatus === val ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(84,68,52,0.15)" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <Slider label="Annual Income" value={income} min={10000} max={600000} step={1000} format={(v) => fmt(v)} onChange={setIncome} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <ResultCard label="Total Tax" value={fmt(totalTax)} accent large />
        <ResultCard label="Effective Rate" value={`${effectiveRate.toFixed(2)}%`} />
        <ResultCard label="Marginal Rate" value={`${marginalRate.toFixed(0)}%`} />
      </div>

      {/* Bracket breakdown */}
      <div className="p-5 rounded-2xl" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "1rem" }}>Bracket Breakdown</p>
        <div className="flex flex-col gap-2">
          {taxByBracket.map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#ffc68b", minWidth: "3rem" }}>{(b.rate * 100).toFixed(0)}%</span>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#201f1f" }}>
                  <div className="h-full rounded-full" style={{ width: `${(b.amount / totalTax) * 100}%`, background: "linear-gradient(to right, #ffc68b, #ff9f1c)", opacity: 0.5 + (i / taxByBracket.length) * 0.5 }} />
                </div>
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#f0e6d3", fontWeight: 600, minWidth: "5.5rem", textAlign: "right" }}>{fmt(b.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </CalcShell>
  );
}

// 5. PERCENTAGE
function PercentageCalculator({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [mode, setMode] = useState<"of" | "change" | "diff" | "reverse">("of");
  const [a, setA] = useState("25");
  const [b, setB] = useState("200");
  const [result, setResult] = useState("");

  const compute = () => {
    const na = parseFloat(a), nb = parseFloat(b);
    if (isNaN(na) || isNaN(nb)) { setResult("Please enter valid numbers"); return; }
    if (mode === "of") setResult(`${na}% of ${nb} = ${((na / 100) * nb).toFixed(4)}`);
    else if (mode === "change") setResult(`${na} → ${nb}: ${(((nb - na) / na) * 100).toFixed(2)}% change`);
    else if (mode === "diff") setResult(`Difference: ${(Math.abs(na - nb) / ((na + nb) / 2) * 100).toFixed(2)}%`);
    else setResult(`${na} is ${nb}% of: ${(na / (nb / 100)).toFixed(4)}`);
  };

  const modeConfig = [
    { key: "of", label: "X% of Y", labelA: "Percentage (X)", labelB: "Number (Y)" },
    { key: "change", label: "% Change", labelA: "From", labelB: "To" },
    { key: "diff", label: "% Difference", labelA: "Value A", labelB: "Value B" },
    { key: "reverse", label: "Reverse %", labelA: "Amount", labelB: "Percentage" },
  ] as const;

  const currentConfig = modeConfig.find((m) => m.key === mode)!;

  return (
    <CalcShell
      title="Percentage Calculator"
      emoji="💯"
      description="Solve any percentage problem: find what X% of a number is, calculate percentage change, find percentage difference, or reverse-calculate from a percentage."
      relatedLinks={relatedLinks}
    >
      <div className="flex flex-wrap gap-2 mb-6">
        {modeConfig.map((m) => (
          <button key={m.key} onClick={() => { setMode(m.key as typeof mode); setResult(""); }}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, backgroundColor: mode === m.key ? "rgba(255,198,139,0.12)" : "#1c1b1b", color: mode === m.key ? "#ffc68b" : "rgba(240,230,211,0.5)", border: mode === m.key ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(84,68,52,0.15)" }}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <div className="mb-5">
          <Label>{currentConfig.labelA}</Label>
          <Input value={a} onChange={setA} type="text" placeholder="Enter value" />
        </div>
        <div className="mb-5">
          <Label>{currentConfig.labelB}</Label>
          <Input value={b} onChange={setB} type="text" placeholder="Enter value" />
        </div>
        <button
          onClick={compute}
          className="w-full py-3 rounded-xl transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "rgba(255,198,139,0.06)", border: "1px solid rgba(255,198,139,0.2)" }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#ffc68b" }}>{result}</p>
        </div>
      )}
    </CalcShell>
  );
}

// 6. BASE CONVERTER
function BaseConverter({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [input, setInput] = useState("255");
  const [fromBase, setFromBase] = useState(10);

  const { decimal, binary, hex, octal, error } = useMemo(() => {
    try {
      const dec = parseInt(input, fromBase);
      if (isNaN(dec) || dec < 0) return { decimal: "", binary: "", hex: "", octal: "", error: "Invalid number for this base" };
      return {
        decimal: dec.toString(10),
        binary: dec.toString(2),
        hex: dec.toString(16).toUpperCase(),
        octal: dec.toString(8),
        error: null,
      };
    } catch {
      return { decimal: "", binary: "", hex: "", octal: "", error: "Invalid input" };
    }
  }, [input, fromBase]);

  const bases = [{ label: "DEC (10)", value: 10 }, { label: "BIN (2)", value: 2 }, { label: "HEX (16)", value: 16 }, { label: "OCT (8)", value: 8 }];

  return (
    <CalcShell
      title="Number Base Converter"
      emoji="🔢"
      description="Instantly convert numbers between decimal, binary, hexadecimal, and octal. Essential for low-level programming, networking, and computer science."
      relatedLinks={relatedLinks}
    >
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <Label>Input Base</Label>
        <div className="flex gap-2 mb-5 flex-wrap">
          {bases.map((b) => (
            <button key={b.value} onClick={() => setFromBase(b.value)}
              className="px-3 py-2 rounded-lg text-sm transition-all"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, backgroundColor: fromBase === b.value ? "rgba(255,198,139,0.12)" : "#201f1f", color: fromBase === b.value ? "#ffc68b" : "rgba(240,230,211,0.5)", border: fromBase === b.value ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(84,68,52,0.15)" }}>
              {b.label}
            </button>
          ))}
        </div>
        <Label>Enter Number</Label>
        <Input value={input} onChange={setInput} type="text" placeholder={`Enter ${fromBase === 2 ? "binary" : fromBase === 16 ? "hex" : fromBase === 8 ? "octal" : "decimal"} number`} />
        {error && <p style={{ color: "#f87171", fontSize: "0.82rem", marginTop: "0.5rem", fontFamily: "'Space Grotesk', sans-serif" }}>{error}</p>}
      </div>

      {!error && decimal && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Decimal (Base 10)", value: decimal, accent: fromBase === 10 },
            { label: "Binary (Base 2)", value: binary, accent: fromBase === 2 },
            { label: "Hexadecimal (Base 16)", value: hex, accent: fromBase === 16 },
            { label: "Octal (Base 8)", value: octal, accent: fromBase === 8 },
          ].map(({ label, value, accent }) => (
            <div key={label} className="p-5 rounded-2xl" style={{ backgroundColor: accent ? "rgba(255,198,139,0.07)" : "#1c1b1b", border: accent ? "1px solid rgba(255,198,139,0.2)" : "1px solid rgba(84,68,52,0.12)" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.3rem" }}>{label}</p>
              <p style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontWeight: 700, fontSize: "1.05rem", color: accent ? "#ffc68b" : "#f0e6d3", wordBreak: "break-all" }}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </CalcShell>
  );
}

// 7. PASSWORD STRENGTH
function PasswordStrength({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const analysis = useMemo(() => {
    if (!password) return null;
    const checks = {
      length: password.length >= 12,
      longLength: password.length >= 16,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      digit: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      noCommon: !["password", "123456", "qwerty", "admin", "letmein"].some((c) => password.toLowerCase().includes(c)),
    };

    const score = Object.values(checks).filter(Boolean).length;
    const entropy = password.split("").reduce((e, c) => {
      const charset = (checks.upper ? 26 : 0) + (checks.lower ? 26 : 0) + (checks.digit ? 10 : 0) + (checks.special ? 32 : 0) || 26;
      return e + Math.log2(charset);
    }, 0);

    const seconds = Math.pow(2, entropy) / 1e12; // 1 trillion guesses/sec
    const crackTime = seconds < 1 ? "Instantly" : seconds < 60 ? `${seconds.toFixed(0)}s` : seconds < 3600 ? `${(seconds / 60).toFixed(0)}m` : seconds < 86400 ? `${(seconds / 3600).toFixed(0)}h` : seconds < 31536000 ? `${(seconds / 86400).toFixed(0)} days` : seconds < 3153600000 ? `${(seconds / 31536000).toFixed(0)} years` : "Centuries";

    const strength = score <= 2 ? { label: "Very Weak", color: "#f87171", pct: 15 } : score <= 3 ? { label: "Weak", color: "#fb923c", pct: 35 } : score <= 4 ? { label: "Fair", color: "#fbbf24", pct: 55 } : score <= 5 ? { label: "Strong", color: "#86efac", pct: 75 } : { label: "Very Strong", color: "rgba(74,222,128,0.9)", pct: 100 };

    const suggestions = [
      !checks.length && "Use at least 12 characters",
      !checks.upper && "Add uppercase letters (A-Z)",
      !checks.lower && "Add lowercase letters (a-z)",
      !checks.digit && "Add numbers (0-9)",
      !checks.special && "Add special characters (!@#$...)",
      !checks.noCommon && "Avoid common words or patterns",
      !checks.longLength && checks.length && "16+ characters provides significantly more entropy",
    ].filter(Boolean) as string[];

    return { checks, score, strength, crackTime, entropy: entropy.toFixed(1), suggestions };
  }, [password]);

  return (
    <CalcShell
      title="Password Strength Meter"
      emoji="🔐"
      description="Analyse your password's strength in real-time. Estimates crack time based on entropy calculation at 1 trillion guesses per second. Nothing you type leaves your browser."
      relatedLinks={relatedLinks}
    >
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <Label>Enter Password</Label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password..."
            className="w-full px-4 py-3 rounded-xl outline-none pr-24"
            style={{ fontFamily: show ? "'JetBrains Mono', monospace" : "'Space Grotesk', sans-serif", backgroundColor: "#201f1f", color: "#f0e6d3", border: "1px solid rgba(84,68,52,0.25)", fontSize: "1rem" }}
          />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs" style={{ color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
            {show ? "Hide" : "Show"}
          </button>
        </div>

        {analysis && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span style={{ fontSize: "0.75rem", color: analysis.strength.color, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{analysis.strength.label}</span>
              <span style={{ fontSize: "0.72rem", color: "rgba(240,230,211,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>Entropy: {analysis.entropy} bits</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#201f1f" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${analysis.strength.pct}%`, backgroundColor: analysis.strength.color }} />
            </div>
          </div>
        )}
      </div>

      {analysis && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <ResultCard label="Strength" value={analysis.strength.label} accent />
            <ResultCard label="Est. Crack Time" value={analysis.crackTime} />
            <ResultCard label="Length" value={`${password.length} chars`} />
          </div>

          {/* Checks */}
          <div className="p-5 rounded-2xl mb-5" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
            <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.75rem" }}>Checks</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                ["12+ characters", analysis.checks.length],
                ["Uppercase letters", analysis.checks.upper],
                ["Lowercase letters", analysis.checks.lower],
                ["Numbers", analysis.checks.digit],
                ["Special characters", analysis.checks.special],
                ["No common patterns", analysis.checks.noCommon],
              ].map(([label, passed]) => (
                <div key={label as string} className="flex items-center gap-2">
                  <span style={{ color: passed ? "rgba(74,222,128,0.9)" : "rgba(240,230,211,0.25)" }}>
                    {passed ? "✓" : "✗"}
                  </span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: passed ? "rgba(240,230,211,0.65)" : "rgba(240,230,211,0.3)" }}>{label as string}</span>
                </div>
              ))}
            </div>
          </div>

          {analysis.suggestions.length > 0 && (
            <div className="p-5 rounded-2xl" style={{ backgroundColor: "rgba(255,198,139,0.05)", border: "1px solid rgba(255,198,139,0.15)" }}>
              <p style={{ color: "#ffc68b", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.75rem" }}>Suggestions</p>
              <ul className="flex flex-col gap-1.5">
                {analysis.suggestions.map((s) => (
                  <li key={s} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(240,230,211,0.55)" }} className="flex items-start gap-2">
                    <span style={{ color: "#ffc68b" }}>→</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </CalcShell>
  );
}

// 8. UNIT CONVERTER
function UnitConverter({ relatedLinks }: { relatedLinks: { to: string; label: string }[] }) {
  const categories = {
    Length: { units: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"], toBase: [1, 1000, 0.01, 0.001, 1609.344, 0.9144, 0.3048, 0.0254] },
    Weight: { units: ["Kilogram", "Gram", "Pound", "Ounce", "Ton (metric)"], toBase: [1, 0.001, 0.453592, 0.0283495, 1000] },
    Temperature: { units: ["Celsius", "Fahrenheit", "Kelvin"], toBase: [1, 1, 1] }, // special case
    Speed: { units: ["m/s", "km/h", "mph", "knots"], toBase: [1, 1 / 3.6, 0.44704, 0.514444] },
  };

  type Cat = keyof typeof categories;
  const [cat, setCat] = useState<Cat>("Length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(5);
  const [value, setValue] = useState("1");

  const convert = (v: number, from: number, to: number): number => {
    if (cat === "Temperature") {
      let celsius = v;
      if (from === 1) celsius = (v - 32) * 5 / 9;
      if (from === 2) celsius = v - 273.15;
      if (to === 0) return celsius;
      if (to === 1) return celsius * 9 / 5 + 32;
      if (to === 2) return celsius + 273.15;
      return celsius;
    }
    const base = v * categories[cat].toBase[from];
    return base / categories[cat].toBase[to];
  };

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return "—";
    return convert(v, fromUnit, toUnit).toFixed(6).replace(/\.?0+$/, "");
  }, [value, fromUnit, toUnit, cat]);

  return (
    <CalcShell
      title="Unit Converter"
      emoji="📏"
      description="Convert between hundreds of units across length, weight, temperature, and speed. Simply enter a value and get instant conversion results."
      relatedLinks={relatedLinks}
    >
      {/* Category */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(categories).map((c) => (
          <button key={c} onClick={() => { setCat(c as Cat); setFromUnit(0); setToUnit(1); }}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, backgroundColor: cat === c ? "rgba(255,198,139,0.12)" : "#1c1b1b", color: cat === c ? "#ffc68b" : "rgba(240,230,211,0.5)", border: cat === c ? "1px solid rgba(255,198,139,0.25)" : "1px solid rgba(84,68,52,0.15)" }}>
            {c}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1c1b1b", border: "1px solid rgba(84,68,52,0.12)" }}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <Label>From</Label>
            <select value={fromUnit} onChange={(e) => setFromUnit(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: "#201f1f", color: "#f0e6d3", border: "1px solid rgba(84,68,52,0.25)", fontSize: "0.9rem" }}>
              {categories[cat].units.map((u, i) => <option key={u} value={i}>{u}</option>)}
            </select>
          </div>

          <div className="md:col-span-1 flex justify-center">
            <button onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit); }}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: "#201f1f", color: "#ffc68b", border: "1px solid rgba(255,198,139,0.15)" }}>
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="md:col-span-2">
            <Label>To</Label>
            <select value={toUnit} onChange={(e) => setToUnit(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl outline-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: "#201f1f", color: "#f0e6d3", border: "1px solid rgba(84,68,52,0.25)", fontSize: "0.9rem" }}>
              {categories[cat].units.map((u, i) => <option key={u} value={i}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <Label>Value</Label>
          <Input value={value} onChange={setValue} type="text" placeholder="Enter value to convert" />
        </div>
      </div>

      <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: "rgba(255,198,139,0.06)", border: "1px solid rgba(255,198,139,0.2)" }}>
        <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.9rem", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "0.5rem" }}>
          {value} {categories[cat].units[fromUnit]} =
        </p>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "2.2rem", color: "#ffc68b", letterSpacing: "-0.02em" }}>
          {result}
        </p>
        <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.9rem", fontFamily: "'Space Grotesk', sans-serif", marginTop: "0.3rem" }}>
          {categories[cat].units[toUnit]}
        </p>
      </div>
    </CalcShell>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Route dispatcher
// ──────────────────────────────────────────────────────────────────────────────

const relatedSlugs = ["mortgage", "compound-interest", "bmi", "tax-bracket", "percentage", "base-converter", "password-strength", "unit-converter"];

export default function CalculatorDetail() {
  const { slug } = useParams<{ slug: string }>();
  const calc = calculators.find((c) => c.slug === slug);

  const relatedLinks = relatedSlugs
    .filter((s) => s !== slug)
    .slice(0, 5)
    .map((s) => {
      const c = calculators.find((calc) => calc.slug === s);
      return { to: `/calculators/${s}`, label: c ? `${c.emoji} ${c.name}` : s };
    });

  const pageContent = (() => {
    switch (slug) {
      case "mortgage": return <MortgageCalculator relatedLinks={relatedLinks} />;
      case "compound-interest": return <CompoundInterestCalculator relatedLinks={relatedLinks} />;
      case "bmi": return <BMICalculator relatedLinks={relatedLinks} />;
      case "tax-bracket": return <TaxBracketCalculator relatedLinks={relatedLinks} />;
      case "percentage": return <PercentageCalculator relatedLinks={relatedLinks} />;
      case "base-converter": return <BaseConverter relatedLinks={relatedLinks} />;
      case "password-strength": return <PasswordStrength relatedLinks={relatedLinks} />;
      case "unit-converter": return <UnitConverter relatedLinks={relatedLinks} />;
      default: return (
        <div className="text-center py-20">
          <p style={{ color: "rgba(240,230,211,0.5)", fontSize: "1rem", fontFamily: "'Space Grotesk', sans-serif" }}>Calculator not found.</p>
          <Link to="/calculators" style={{ color: "#ffc68b", fontWeight: 600, fontSize: "0.9rem" }}>← Browse all tools</Link>
        </div>
      );
    }
  })();

  if (!calc && slug) {
    return (
      <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center">
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f0e6d3", marginBottom: "1rem" }}>Calculator not found</h1>
          <Link to="/calculators" style={{ color: "#ffc68b", fontWeight: 600 }}>← All Calculators</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif", minHeight: "100vh" }}>
      {/* Header band */}
      <section className="pt-28 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] rounded-full -top-20 right-0 opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/calculators" className="inline-flex items-center gap-2 mb-6" style={{ color: "rgba(240,230,211,0.4)", fontSize: "0.85rem", fontWeight: 500 }}>
              <ArrowLeft size={14} /> Calculator Hub
            </Link>
          </motion.div>
        </div>
      </section>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
        {pageContent}
      </motion.div>
    </main>
  );
}
