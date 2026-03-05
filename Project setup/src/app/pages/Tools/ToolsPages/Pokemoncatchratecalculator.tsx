import { useState, useEffect, useCallback, useRef } from "react";

/* ─────────────── DATA LAYER ─────────────── */
const POKEMON_DB = [
  { name: "Caterpie",   rate: 255, types: ["Bug"] },
  { name: "Pidgey",     rate: 255, types: ["Normal","Flying"] },
  { name: "Rattata",    rate: 255, types: ["Normal"] },
  { name: "Magikarp",   rate: 255, types: ["Water"] },
  { name: "Zubat",      rate: 255, types: ["Poison","Flying"] },
  { name: "Pikachu",    rate: 190, types: ["Electric"] },
  { name: "Jigglypuff", rate: 170, types: ["Normal","Fairy"] },
  { name: "Psyduck",    rate: 190, types: ["Water"] },
  { name: "Slowpoke",   rate: 190, types: ["Water","Psychic"] },
  { name: "Tentacool",  rate: 190, types: ["Water","Poison"] },
  { name: "Gastly",     rate: 190, types: ["Ghost","Poison"] },
  { name: "Chansey",    rate: 30,  types: ["Normal"] },
  { name: "Scyther",    rate: 45,  types: ["Bug","Flying"] },
  { name: "Eevee",      rate: 45,  types: ["Normal"] },
  { name: "Lapras",     rate: 45,  types: ["Water","Ice"] },
  { name: "Snorlax",    rate: 25,  types: ["Normal"] },
  { name: "Dratini",    rate: 45,  types: ["Dragon"] },
  { name: "Dragonite",  rate: 45,  types: ["Dragon","Flying"] },
  { name: "Mewtwo",     rate: 3,   types: ["Psychic"] },
  { name: "Mew",        rate: 45,  types: ["Psychic"] },
  { name: "Umbreon",    rate: 45,  types: ["Dark"] },
  { name: "Espeon",     rate: 45,  types: ["Psychic"] },
  { name: "Scizor",     rate: 25,  types: ["Bug","Steel"] },
  { name: "Heracross",  rate: 45,  types: ["Bug","Fighting"] },
  { name: "Suicune",    rate: 3,   types: ["Water"] },
  { name: "Raikou",     rate: 3,   types: ["Electric"] },
  { name: "Entei",      rate: 3,   types: ["Fire"] },
  { name: "Lugia",      rate: 3,   types: ["Psychic","Flying"] },
  { name: "Ho-Oh",      rate: 3,   types: ["Fire","Flying"] },
  { name: "Celebi",     rate: 45,  types: ["Psychic","Grass"] },
  { name: "Ralts",      rate: 235, types: ["Psychic","Fairy"] },
  { name: "Gardevoir",  rate: 45,  types: ["Psychic","Fairy"] },
  { name: "Feebas",     rate: 255, types: ["Water"] },
  { name: "Milotic",    rate: 60,  types: ["Water"] },
  { name: "Absol",      rate: 30,  types: ["Dark"] },
  { name: "Beldum",     rate: 3,   types: ["Steel","Psychic"] },
  { name: "Metang",     rate: 3,   types: ["Steel","Psychic"] },
  { name: "Metagross",  rate: 3,   types: ["Steel","Psychic"] },
  { name: "Latios",     rate: 3,   types: ["Dragon","Psychic"] },
  { name: "Latias",     rate: 3,   types: ["Dragon","Psychic"] },
  { name: "Kyogre",     rate: 5,   types: ["Water"] },
  { name: "Groudon",    rate: 5,   types: ["Ground"] },
  { name: "Rayquaza",   rate: 45,  types: ["Dragon","Flying"] },
  { name: "Jirachi",    rate: 3,   types: ["Steel","Psychic"] },
  { name: "Deoxys",     rate: 3,   types: ["Psychic"] },
  { name: "Garchomp",   rate: 45,  types: ["Dragon","Ground"] },
  { name: "Lucario",    rate: 45,  types: ["Fighting","Steel"] },
  { name: "Riolu",      rate: 75,  types: ["Fighting"] },
  { name: "Spiritomb",  rate: 100, types: ["Ghost","Dark"] },
  { name: "Rotom",      rate: 45,  types: ["Electric","Ghost"] },
  { name: "Dialga",     rate: 30,  types: ["Steel","Dragon"] },
  { name: "Palkia",     rate: 30,  types: ["Water","Dragon"] },
  { name: "Giratina",   rate: 30,  types: ["Ghost","Dragon"] },
  { name: "Darkrai",    rate: 3,   types: ["Dark"] },
  { name: "Arceus",     rate: 3,   types: ["Normal"] },
  { name: "Zoroark",    rate: 45,  types: ["Dark"] },
  { name: "Reshiram",   rate: 45,  types: ["Dragon","Fire"] },
  { name: "Zekrom",     rate: 45,  types: ["Dragon","Electric"] },
  { name: "Kyurem",     rate: 45,  types: ["Dragon","Ice"] },
  { name: "Xerneas",    rate: 45,  types: ["Fairy"] },
  { name: "Yveltal",    rate: 45,  types: ["Dark","Flying"] },
  { name: "Zygarde",    rate: 45,  types: ["Dragon","Ground"] },
  { name: "Solgaleo",   rate: 45,  types: ["Psychic","Steel"] },
  { name: "Lunala",     rate: 45,  types: ["Psychic","Ghost"] },
  { name: "Necrozma",   rate: 255, types: ["Psychic"] },
  { name: "Zacian",     rate: 10,  types: ["Fairy"] },
  { name: "Zamazenta",  rate: 10,  types: ["Fighting"] },
  { name: "Eternatus",  rate: 255, types: ["Poison","Dragon"] },
];

const BALL_DB = [
  { name: "Poké Ball",   mult: 1,     icon: "🔴", desc: "Standard ball" },
  { name: "Great Ball",  mult: 1.5,   icon: "🔵", desc: "1.5× catch rate" },
  { name: "Ultra Ball",  mult: 2,     icon: "⚫", desc: "2× catch rate" },
  { name: "Master Ball", mult: 255,   icon: "🟣", desc: "Never fails" },
  { name: "Net Ball",    mult: 3,     icon: "🟦", desc: "3× Water/Bug" },
  { name: "Dusk Ball",   mult: 3.5,   icon: "🌑", desc: "3.5× night/caves" },
  { name: "Repeat Ball", mult: 3,     icon: "🔁", desc: "3× already caught" },
  { name: "Timer Ball",  mult: 4,     icon: "⏱️", desc: "4× after 30 turns" },
  { name: "Dive Ball",   mult: 3.5,   icon: "🌊", desc: "3.5× surfing/diving" },
  { name: "Nest Ball",   mult: 3,     icon: "🌿", desc: "3× low-level Pokémon" },
  { name: "Quick Ball",  mult: 5,     icon: "⚡", desc: "5× first turn" },
  { name: "Heal Ball",   mult: 1,     icon: "💊", desc: "Full heal on catch" },
  { name: "Luxury Ball", mult: 1,     icon: "✨", desc: "Boosts happiness" },
  { name: "Heavy Ball",  mult: 2,     icon: "⚙️", desc: "Better for heavy Pokémon" },
  { name: "Love Ball",   mult: 8,     icon: "💖", desc: "8× opposite gender same species" },
  { name: "Moon Ball",   mult: 4,     icon: "🌙", desc: "4× Moon Stone evolvers" },
  { name: "Sport Ball",  mult: 1.5,   icon: "🏆", desc: "Bug Catching Contest" },
  { name: "Safari Ball", mult: 1.5,   icon: "🌴", desc: "Safari/Friend zones" },
  { name: "Dream Ball",  mult: 4,     icon: "💤", desc: "4× sleeping Pokémon" },
  { name: "Beast Ball",  mult: 0.1,   icon: "🌀", desc: "5× Ultra Beasts only" },
];

const STATUS_DB = [
  { name: "None",      mult: 1,   color: "#9199A5", icon: "—" },
  { name: "Sleep",     mult: 2.5, color: "#A4FBCC", icon: "💤" },
  { name: "Freeze",    mult: 2.5, color: "#87CEEB", icon: "❄️" },
  { name: "Paralysis", mult: 1.5, color: "#FFD700", icon: "⚡" },
  { name: "Burn",      mult: 1.5, color: "#FF6B35", icon: "🔥" },
  { name: "Poison",    mult: 1.5, color: "#C77DFF", icon: "☠️" },
];

const GEN_DB = [
  { id: "gen1",  name: "Gen I",    games: "Red/Blue/Yellow",        shakes: 3 },
  { id: "gen2",  name: "Gen II",   games: "Gold/Silver/Crystal",    shakes: 3 },
  { id: "gen3",  name: "Gen III",  games: "R/S/E · FR/LG",          shakes: 4 },
  { id: "gen4",  name: "Gen IV",   games: "D/P/Pt · HG/SS",         shakes: 4 },
  { id: "gen5",  name: "Gen V",    games: "Black/White · B2/W2",    shakes: 4 },
  { id: "gen6",  name: "Gen VI+",  games: "X/Y · S/M · SwSh · SV", shakes: 4 },
];

const TYPE_COLORS = {
  Normal:"#A8A878",Fire:"#F08030",Water:"#6890F0",Electric:"#F8D030",
  Grass:"#78C850",Ice:"#98D8D8",Fighting:"#C03028",Poison:"#A040A0",
  Ground:"#E0C068",Flying:"#A890F0",Psychic:"#F85888",Bug:"#A8B820",
  Rock:"#B8A038",Ghost:"#705898",Dragon:"#7038F8",Dark:"#705848",
  Steel:"#B8B8D0",Fairy:"#EE99AC",
};

/* ─────────────── FORMULA ENGINE ─────────────── */
function calcCatchRate({ baseRate, hpCur, hpMax, ballMult, statusMult, generation }) {
  const hpMaxSafe = Math.max(hpMax, 1);
  const hpCurSafe = Math.min(Math.max(hpCur, 1), hpMax);

  const a = Math.floor(
    ((3 * hpMaxSafe - 2 * hpCurSafe) * baseRate * ballMult * statusMult) / (3 * hpMaxSafe)
  );
  const aClamped = Math.min(255, Math.max(0, a));

  if (ballMult >= 255) return { a: 255, catchPct: 100, shakePct: 100, shakes: 4, critPct: 0, guaranteed: true };
  if (aClamped >= 255)  return { a: 255, catchPct: 100, shakePct: 100, shakes: 4, critPct: 0, guaranteed: true };

  const genData = GEN_DB.find(g => g.id === generation) || GEN_DB[2];
  const numShakes = genData.shakes;

  // Gen III+ shake probability formula (Bulbapedia verified)
  const shakePct = Math.floor(65536 / Math.pow(255 / aClamped, 0.25)) / 65536;
  const catchProb = Math.pow(shakePct, numShakes);

  // Critical capture (Gen V+): ~6.7% of attempts skip to 1 shake
  const critEnabled = ["gen5","gen6"].includes(generation);
  const critPct = critEnabled ? 6.7 : 0;
  const critBonus = critEnabled ? 0.067 * (1 - catchProb) * shakePct : 0;
  const totalPct = Math.min(100, (catchProb + critBonus) * 100);

  return {
    a: aClamped,
    catchPct: totalPct,
    shakePct: shakePct * 100,
    shakes: numShakes,
    critPct,
    guaranteed: false,
  };
}

/* ─────────────── UTILITY ─────────────── */
function lerp(a, b, t) { return a + (b - a) * t; }
function pctColor(pct) {
  if (pct >= 80) return "#A4FBCC";
  if (pct >= 50) return "#7EE8A2";
  if (pct >= 25) return "#F8D030";
  if (pct >= 10) return "#F08030";
  return "#FF4B4B";
}

/* ─────────────── ANIMATED ARC ─────────────── */
function ArcGauge({ pct, animated }) {
  const radius = 72, stroke = 10, cx = 90, cy = 90;
  const circumference = 2 * Math.PI * radius;
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!animated) { setDisplayed(pct); return; }
    let start = null;
    const duration = 900;
    const from = 0;
    const to = pct;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(lerp(from, to, eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pct, animated]);

  const offset = circumference - (displayed / 100) * circumference;
  const color = pctColor(pct);

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
        </linearGradient>
      </defs>
      {/* Track */}
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#1B3022" strokeWidth={stroke}/>
      {/* Fill */}
      <circle
        cx={cx} cy={cy} r={radius} fill="none"
        stroke="url(#arcGrad)" strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 90 90)"
        filter="url(#glow)"
        style={{ transition: "stroke 0.3s" }}
      />
      {/* Center text */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#F2F2F2"
        style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700 }}>
        {displayed.toFixed(1)}%
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#9199A5"
        style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize: 11 }}>
        CATCH RATE
      </text>
    </svg>
  );
}

/* ─────────────── SHAKE DOTS ─────────────── */
function ShakeDots({ shakes, catchPct, shakePct }) {
  const filled = catchPct >= 100 ? shakes : Math.round((catchPct / 100) * shakes);
  return (
    <div style={{ display:"flex", gap: 8, alignItems:"center", justifyContent:"center", marginTop: 8 }}>
      {Array.from({ length: shakes }).map((_, i) => {
        const p = Math.min(100, shakePct);
        const active = catchPct >= 100 || i < filled;
        return (
          <div key={i} style={{
            width: 18, height: 18, borderRadius: "50%",
            background: active ? pctColor(catchPct) : "#1B3022",
            border: `2px solid ${active ? pctColor(catchPct) : "#2D4A35"}`,
            boxShadow: active ? `0 0 8px ${pctColor(catchPct)}88` : "none",
            transition: "all 0.4s ease",
            transitionDelay: `${i * 80}ms`,
          }}/>
        );
      })}
      <span style={{ color:"#9199A5", fontSize: 11, fontFamily:"'Space Grotesk',sans-serif", marginLeft: 4 }}>
        {shakes} shake{shakes > 1 ? "s" : ""}
      </span>
    </div>
  );
}

/* ─────────────── HP SLIDER ─────────────── */
function HPSlider({ label, value, max, onChange, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  const trackColor = color === "cur"
    ? pct > 50 ? "#A4FBCC" : pct > 25 ? "#F8D030" : "#FF4B4B"
    : "#9199A5";

  return (
    <div style={{ display:"flex", flexDirection:"column", gap: 6 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:"#9199A5", fontSize: 11, fontFamily:"'Space Grotesk',sans-serif", letterSpacing: "0.08em", textTransform:"uppercase" }}>{label}</span>
        <span style={{ color:"#F2F2F2", fontSize: 14, fontFamily:"'Space Grotesk',sans-serif", fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ position:"relative", height: 6, borderRadius: 3, background:"#1B3022" }}>
        <div style={{
          position:"absolute", left:0, top:0, height:"100%", borderRadius: 3,
          width:`${pct}%`, background: trackColor,
          boxShadow: `0 0 6px ${trackColor}88`,
          transition: "width 0.2s ease, background 0.3s ease",
        }}/>
        <input type="range" min={color === "cur" ? 1 : 1} max={max || 999} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position:"absolute", top:"50%", left:0, transform:"translateY(-50%)",
            width:"100%", height: 20, opacity: 0, cursor:"pointer", margin:0, padding:0,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────── STAT BADGE ─────────────── */
function StatBadge({ label, value, sub, accent }) {
  return (
    <div style={{
      background:"#1B3022", borderRadius: 10, padding:"12px 16px",
      border:"1px solid #2D4A35", display:"flex", flexDirection:"column", gap: 2,
      transition:"border-color 0.2s",
    }}>
      <span style={{ color:"#9199A5", fontSize: 10, fontFamily:"'Space Grotesk',sans-serif", textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</span>
      <span style={{ color: accent || "#A4FBCC", fontSize: 18, fontFamily:"'Space Grotesk',sans-serif", fontWeight: 700 }}>{value}</span>
      {sub && <span style={{ color:"#9199A5", fontSize: 10, fontFamily:"'Space Grotesk',sans-serif" }}>{sub}</span>}
    </div>
  );
}

/* ─────────────── MAIN COMPONENT ─────────────── */
export default function PokemonCatchRateCalculator() {
  const [query, setQuery]           = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(POKEMON_DB[18]); // Mewtwo
  const [showDropdown, setShowDropdown] = useState(false);
  const [hpMax, setHpMax]           = useState(100);
  const [hpCur, setHpCur]           = useState(50);
  const [selectedBall, setSelectedBall] = useState(BALL_DB[2]); // Ultra Ball
  const [selectedStatus, setSelectedStatus] = useState(STATUS_DB[0]);
  const [selectedGen, setSelectedGen] = useState("gen3");
  const [result, setResult]         = useState(null);
  const [animKey, setAnimKey]       = useState(0);
  const [ballPage, setBallPage]     = useState(0);
  const dropRef = useRef(null);

  const BALLS_PER_PAGE = 10;
  const ballPages = Math.ceil(BALL_DB.length / BALLS_PER_PAGE);
  const visibleBalls = BALL_DB.slice(ballPage * BALLS_PER_PAGE, ballPage * BALLS_PER_PAGE + BALLS_PER_PAGE);

  const filteredPokemon = POKEMON_DB.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  const calculate = useCallback(() => {
    const r = calcCatchRate({
      baseRate: selectedPokemon.rate,
      hpCur, hpMax,
      ballMult: selectedBall.mult,
      statusMult: selectedStatus.mult,
      generation: selectedGen,
    });
    setResult(r);
    setAnimKey(k => k + 1);
  }, [selectedPokemon, hpCur, hpMax, selectedBall, selectedStatus, selectedGen]);

  useEffect(() => { calculate(); }, [calculate]);
  useEffect(() => { if (hpCur > hpMax) setHpCur(hpMax); }, [hpMax]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const S = {
    root: {
      minHeight:"100vh", background:"#081A04",
      fontFamily:"'Space Grotesk',sans-serif",
      padding:"0 16px 80px",
    },
    container: { maxWidth: 880, margin:"0 auto" },
    header: {
      textAlign:"center", padding:"48px 0 36px",
      borderBottom:"1px solid #1B3022",
    },
    eyebrow: {
      display:"inline-flex", alignItems:"center", gap: 8,
      background:"#1B3022", borderRadius: 20, padding:"4px 14px",
      color:"#A4FBCC", fontSize: 11, letterSpacing:"0.12em", textTransform:"uppercase",
      marginBottom: 16,
    },
    title: {
      fontSize: "clamp(28px,5vw,48px)", fontWeight: 800,
      color:"#F2F2F2", margin:"0 0 8px", lineHeight:1.1,
    },
    accent: { color:"#A4FBCC" },
    subtitle: { color:"#9199A5", fontSize: 14, margin:0 },
    grid: {
      display:"grid",
      gridTemplateColumns:"minmax(0,1fr) minmax(0,380px)",
      gap: 20, marginTop: 28,
      "@media(max-width:680px)": { gridTemplateColumns:"1fr" },
    },
    card: {
      background:"#0D2211", borderRadius: 16,
      border:"1px solid #1B3022", padding: 24,
      display:"flex", flexDirection:"column", gap: 20,
    },
    sectionLabel: {
      color:"#9199A5", fontSize: 11, letterSpacing:"0.1em",
      textTransform:"uppercase", marginBottom: 8, display:"block",
    },
    input: {
      width:"100%", background:"#1B3022", border:"1px solid #2D4A35",
      borderRadius: 10, padding:"10px 14px", color:"#F2F2F2",
      fontSize: 14, fontFamily:"'Space Grotesk',sans-serif",
      outline:"none", boxSizing:"border-box",
    },
    ballGrid: {
      display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap: 6,
    },
    ballBtn: (active) => ({
      background: active ? "#1B3022" : "transparent",
      border: `1.5px solid ${active ? "#A4FBCC" : "#2D4A35"}`,
      borderRadius: 10, padding:"8px 4px", cursor:"pointer",
      display:"flex", flexDirection:"column", alignItems:"center", gap: 4,
      transition:"all 0.18s ease",
    }),
    statusRow: { display:"flex", gap: 8, flexWrap:"wrap" },
    statusBtn: (active, color) => ({
      background: active ? "#1B3022" : "transparent",
      border: `1.5px solid ${active ? color : "#2D4A35"}`,
      borderRadius: 20, padding:"6px 14px",
      display:"flex", alignItems:"center", gap: 6,
      color: active ? "#F2F2F2" : "#9199A5",
      cursor:"pointer", fontSize: 12,
      transition:"all 0.18s ease",
      boxShadow: active ? `0 0 8px ${color}44` : "none",
    }),
    genRow: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: 8 },
    genBtn: (active) => ({
      background: active ? "#1B3022" : "transparent",
      border: `1.5px solid ${active ? "#A4FBCC" : "#2D4A35"}`,
      borderRadius: 10, padding:"8px", cursor:"pointer",
      textAlign:"center", transition:"all 0.18s ease",
    }),
    resultsCard: {
      background:"#0D2211", borderRadius: 16,
      border:"1px solid #1B3022", padding: 24,
      display:"flex", flexDirection:"column", gap: 16,
      position:"sticky", top: 20,
    },
    statsGrid: {
      display:"grid", gridTemplateColumns:"1fr 1fr", gap: 10,
    },
    tipBox: {
      background:"#081A04", borderRadius: 10, padding:"12px 14px",
      border:"1px solid #1B3022", marginTop: 4,
    },
    pokemonTag: {
      display:"flex", alignItems:"center", gap: 8,
      background:"#1B3022", borderRadius: 10, padding:"10px 14px",
      cursor:"pointer", border:"1px solid #2D4A35",
      transition:"border-color 0.2s",
    },
    dropdownItem: (hover) => ({
      padding:"10px 14px", cursor:"pointer", borderRadius: 8,
      background: hover ? "#1B3022" : "transparent",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      transition:"background 0.15s",
    }),
  };

  const tip = result ? (
    result.guaranteed ? "✅ Guaranteed catch! Save your Poké Balls next time." :
    result.catchPct > 80 ? "🟢 Excellent odds! Almost certain to succeed." :
    result.catchPct > 50 ? "🟡 Good chance. Consider weakening HP further." :
    result.catchPct > 25 ? "🟠 Moderate odds. Apply a status condition for better results." :
    result.catchPct > 10 ? "🔴 Difficult catch. Use Ultra Ball + Sleep/Freeze." :
    "⚫ Very low chance. Consider a better ball or more HP reduction."
  ) : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background:#081A04; }
        ::-webkit-scrollbar-thumb { background:#2D4A35; border-radius:2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        .calc-card { animation: fadeUp 0.4s ease both; }
        .poke-sel:hover { border-color: #A4FBCC !important; }
        .ball-btn:hover { border-color: #A4FBCC !important; transform: scale(1.04); }
        @media(max-width:680px) {
          .main-grid { grid-template-columns: 1fr !important; }
          .ball-grid { grid-template-columns: repeat(5,1fr) !important; }
        }
      `}</style>

      <div style={S.root}>
        <div style={S.container}>

          {/* ── HEADER ── */}
          <div style={S.header}>
            <div style={S.eyebrow}>
              <span>⚡</span>
              <span>Capture Mechanics Engine</span>
            </div>
            <h1 style={S.title}>
              Pokémon <span style={S.accent}>Catch Rate</span><br/>Calculator
            </h1>
            <p style={S.subtitle}>Generation-accurate formula · Shake probability curves · Critical capture</p>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="main-grid" style={{
            display:"grid", gridTemplateColumns:"minmax(0,1fr) minmax(0,360px)",
            gap: 20, marginTop: 28,
          }}>

            {/* ── LEFT: INPUTS ── */}
            <div style={{ display:"flex", flexDirection:"column", gap: 16 }}>

              {/* Pokémon Selector */}
              <div className="calc-card" style={{ ...S.card, animationDelay:"0ms", position:"relative" }} ref={dropRef}>
                <div>
                  <span style={S.sectionLabel}>Pokémon Species</span>
                  <div className="poke-sel" style={S.pokemonTag}
                    onClick={() => setShowDropdown(v => !v)}>
                    <div style={{ display:"flex", gap: 6 }}>
                      {selectedPokemon.types.map(t => (
                        <span key={t} style={{
                          background: TYPE_COLORS[t] || "#9199A5",
                          color:"#000", fontSize: 10, fontWeight: 700,
                          padding:"2px 8px", borderRadius: 20,
                          letterSpacing:"0.06em", textTransform:"uppercase",
                        }}>{t}</span>
                      ))}
                    </div>
                    <span style={{ flex:1, color:"#F2F2F2", fontSize: 15, fontWeight: 600, textAlign:"right" }}>
                      {selectedPokemon.name}
                    </span>
                    <span style={{ color:"#9199A5", fontSize: 13 }}>▾</span>
                  </div>

                  {showDropdown && (
                    <div style={{
                      position:"absolute", top:"calc(100% - 8px)", left: 0, right: 0, zIndex: 50,
                      background:"#0D2211", border:"1px solid #2D4A35", borderRadius: 12,
                      boxShadow:"0 20px 40px rgba(0,0,0,0.5)", padding: 8,
                    }}>
                      <input
                        autoFocus
                        value={query} onChange={e => setQuery(e.target.value)}
                        placeholder="Search Pokémon…"
                        style={{ ...S.input, marginBottom: 6 }}
                      />
                      {filteredPokemon.map(p => (
                        <div key={p.name}
                          style={S.dropdownItem(false)}
                          onMouseEnter={e => e.currentTarget.style.background="#1B3022"}
                          onMouseLeave={e => e.currentTarget.style.background="transparent"}
                          onClick={() => { setSelectedPokemon(p); setShowDropdown(false); setQuery(""); }}>
                          <div style={{ display:"flex", gap: 6 }}>
                            {p.types.map(t => (
                              <span key={t} style={{
                                background: TYPE_COLORS[t]||"#9199A5", color:"#000",
                                fontSize: 9, fontWeight: 700, padding:"1px 6px", borderRadius:20, textTransform:"uppercase",
                              }}>{t}</span>
                            ))}
                            <span style={{ color:"#F2F2F2", fontSize: 13, fontWeight:600 }}>{p.name}</span>
                          </div>
                          <span style={{ color:"#A4FBCC", fontSize: 12, fontWeight:600 }}>rate {p.rate}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* HP Sliders */}
                <div style={{ display:"flex", flexDirection:"column", gap: 16 }}>
                  <span style={S.sectionLabel}>Hit Points</span>
                  <HPSlider label="Max HP" value={hpMax} max={999} onChange={v => { setHpMax(v); if(hpCur>v) setHpCur(v); }} color="max"/>
                  <HPSlider label="Current HP" value={hpCur} max={hpMax} onChange={v => setHpCur(v)} color="cur"/>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ color:"#9199A5", fontSize: 11 }}>HP Remaining</span>
                    <span style={{ color: hpCur/hpMax > 0.5 ? "#A4FBCC" : hpCur/hpMax > 0.25 ? "#F8D030" : "#FF4B4B", fontSize: 12, fontWeight:600 }}>
                      {((hpCur/hpMax)*100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Ball Selector */}
              <div className="calc-card" style={{ ...S.card, animationDelay:"80ms" }}>
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 12 }}>
                    <span style={S.sectionLabel}>Poké Ball Type</span>
                    <div style={{ display:"flex", gap: 4 }}>
                      <button onClick={() => setBallPage(p => Math.max(0, p-1))} disabled={ballPage===0}
                        style={{ background:"transparent", border:"1px solid #2D4A35", borderRadius:6, padding:"2px 8px", color:"#9199A5", cursor:"pointer", fontSize:12 }}>‹</button>
                      <button onClick={() => setBallPage(p => Math.min(ballPages-1, p+1))} disabled={ballPage===ballPages-1}
                        style={{ background:"transparent", border:"1px solid #2D4A35", borderRadius:6, padding:"2px 8px", color:"#9199A5", cursor:"pointer", fontSize:12 }}>›</button>
                    </div>
                  </div>
                  <div className="ball-grid" style={S.ballGrid}>
                    {visibleBalls.map(ball => (
                      <button key={ball.name} className="ball-btn"
                        style={S.ballBtn(selectedBall.name === ball.name)}
                        title={ball.desc}
                        onClick={() => setSelectedBall(ball)}>
                        <span style={{ fontSize: 18 }}>{ball.icon}</span>
                        <span style={{ color: selectedBall.name===ball.name ? "#A4FBCC" : "#9199A5", fontSize: 9, textAlign:"center", lineHeight:1.2 }}>
                          {ball.name.replace(" Ball","")}</span>
                      </button>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, padding:"8px 12px", background:"#081A04", borderRadius:8, display:"flex", justifyContent:"space-between" }}>
                    <span style={{ color:"#9199A5", fontSize: 12 }}>{selectedBall.desc}</span>
                    <span style={{ color:"#A4FBCC", fontSize: 12, fontWeight:700 }}>{selectedBall.mult}×</span>
                  </div>
                </div>
              </div>

              {/* Status + Generation */}
              <div className="calc-card" style={{ ...S.card, animationDelay:"160ms" }}>
                <div>
                  <span style={S.sectionLabel}>Status Condition</span>
                  <div style={S.statusRow}>
                    {STATUS_DB.map(s => (
                      <button key={s.name}
                        style={S.statusBtn(selectedStatus.name===s.name, s.color)}
                        onClick={() => setSelectedStatus(s)}>
                        <span>{s.icon}</span>
                        <span>{s.name}</span>
                        {s.mult > 1 && <span style={{ color:"#A4FBCC", fontSize:10 }}>{s.mult}×</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={S.sectionLabel}>Game Generation</span>
                  <div style={S.genRow}>
                    {GEN_DB.map(g => (
                      <button key={g.id}
                        style={S.genBtn(selectedGen === g.id)}
                        onClick={() => setSelectedGen(g.id)}>
                        <div style={{ color: selectedGen===g.id ? "#A4FBCC" : "#F2F2F2", fontSize: 13, fontWeight:600 }}>{g.name}</div>
                        <div style={{ color:"#9199A5", fontSize: 9, marginTop: 2 }}>{g.games}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: RESULTS ── */}
            <div>
              <div className="calc-card" style={{ ...S.resultsCard, animationDelay:"60ms" }}>
                <div style={{ textAlign:"center" }}>
                  <span style={{ color:"#9199A5", fontSize: 11, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                    {selectedPokemon.name} · {GEN_DB.find(g=>g.id===selectedGen)?.name}
                  </span>
                </div>

                {/* Arc Gauge */}
                <div style={{ display:"flex", justifyContent:"center" }}>
                  {result && <ArcGauge key={animKey} pct={result.catchPct} animated={true}/>}
                </div>

                {/* Shake dots */}
                {result && (
                  <ShakeDots
                    shakes={result.shakes}
                    catchPct={result.catchPct}
                    shakePct={result.shakePct}
                  />
                )}

                {/* Stats grid */}
                {result && (
                  <div style={S.statsGrid}>
                    <StatBadge label="Modified Rate" value={result.a} sub="0–255 scale"/>
                    <StatBadge label="Per-Shake" value={`${result.shakePct.toFixed(1)}%`} sub="each check" accent="#F2F2F2"/>
                    <StatBadge label="Base Rate" value={selectedPokemon.rate} sub="species raw"/>
                    <StatBadge
                      label="Crit Capture"
                      value={result.critPct > 0 ? `${result.critPct}%` : "N/A"}
                      sub={result.critPct > 0 ? "1-shake bonus" : "Gen V+ only"}
                      accent={result.critPct > 0 ? "#F8D030" : "#9199A5"}
                    />
                  </div>
                )}

                {/* Formula display */}
                <div style={S.tipBox}>
                  <div style={{ color:"#9199A5", fontSize: 10, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom: 6 }}>Formula</div>
                  <div style={{ color:"#A4FBCC", fontSize: 11, fontFamily:"monospace", lineHeight:1.6 }}>
                    a = ⌊(3·HPmax − 2·HPcur) × rate × ball × status / (3·HPmax)⌋
                  </div>
                  <div style={{ color:"#F2F2F2", fontSize: 11, fontFamily:"monospace", marginTop: 4, lineHeight:1.6 }}>
                    = {result?.a ?? "—"}{result?.guaranteed ? " ≥ 255 → ✓" : ""}
                  </div>
                </div>

                {/* Tip */}
                {tip && (
                  <div style={{
                    background:"#081A04", borderRadius: 10, padding:"10px 14px",
                    border:"1px solid #2D4A35", color:"#9199A5", fontSize: 12, lineHeight:1.5,
                  }}>
                    {tip}
                  </div>
                )}

                {/* Probability bar */}
                {result && (
                  <div>
                    <div style={{ height: 4, borderRadius: 2, background:"#1B3022", overflow:"hidden" }}>
                      <div style={{
                        height:"100%", borderRadius: 2,
                        width:`${result.catchPct}%`,
                        background: pctColor(result.catchPct),
                        boxShadow:`0 0 8px ${pctColor(result.catchPct)}88`,
                        transition:"width 0.8s cubic-bezier(0.16,1,0.3,1), background 0.3s",
                      }}/>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop: 4 }}>
                      <span style={{ color:"#9199A5", fontSize: 10 }}>0%</span>
                      <span style={{ color:"#9199A5", fontSize: 10 }}>100%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Multiplier breakdown */}
              <div className="calc-card" style={{ ...S.card, animationDelay:"200ms", marginTop: 16 }}>
                <span style={S.sectionLabel}>Active Multipliers</span>
                <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
                  {[
                    { label:"Base Catch Rate", val: selectedPokemon.rate, pct: (selectedPokemon.rate/255)*100 },
                    { label:`${selectedBall.name}`, val:`${selectedBall.mult}×`, pct: Math.min(100,(selectedBall.mult/5)*100) },
                    { label:`${selectedStatus.name} Status`, val:`${selectedStatus.mult}×`, pct:(selectedStatus.mult/2.5)*100 },
                    { label:`HP Factor`, val:`${(((3*hpMax - 2*hpCur)/(3*hpMax))*100).toFixed(0)}%`, pct:((3*hpMax - 2*hpCur)/(3*hpMax))*100 },
                  ].map(({ label, val, pct }) => (
                    <div key={label} style={{ display:"flex", flexDirection:"column", gap: 4 }}>
                      <div style={{ display:"flex", justifyContent:"space-between" }}>
                        <span style={{ color:"#9199A5", fontSize: 11 }}>{label}</span>
                        <span style={{ color:"#F2F2F2", fontSize: 11, fontWeight:600 }}>{val}</span>
                      </div>
                      <div style={{ height: 3, borderRadius:2, background:"#1B3022" }}>
                        <div style={{
                          height:"100%", borderRadius:2, width:`${pct}%`,
                          background:"#A4FBCC", opacity: 0.7,
                          transition:"width 0.5s ease",
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── FOOTER NOTE ── */}
          <div style={{ marginTop: 40, textAlign:"center", color:"#2D4A35", fontSize: 11, borderTop:"1px solid #1B3022", paddingTop: 24 }}>
            Formulas sourced from Bulbapedia · Smogon · DragonflyCave · Pokémon Fandom Wiki
          </div>
        </div>
      </div>
    </>
  );
}