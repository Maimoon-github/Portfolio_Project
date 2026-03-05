// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router";
// import {
//   Brain, GitBranch, BarChart2, Server,
//   ArrowRight, Github, Linkedin, Twitter,
//   ChevronDown, Zap, Cpu, Database, Code2,
// } from "lucide-react";
// import { ProjectCard } from "../components/ProjectCard";
// import { BlogCard } from "../components/BlogCard";
// import { PROFILE, PROJECTS, BLOG_POSTS, SERVICES } from "../data";

// const ICON_MAP: Record<string, React.ReactNode> = {
//   Brain: <Brain size={22} style={{ color: "#A4FBCC" }} />,
//   GitBranch: <GitBranch size={22} style={{ color: "#A4FBCC" }} />,
//   BarChart2: <BarChart2 size={22} style={{ color: "#A4FBCC" }} />,
//   Server: <Server size={22} style={{ color: "#A4FBCC" }} />,
// };

// const TECH_MARQUEE = [
//   "LangGraph", "PyTorch", "Apache Airflow", "Kubernetes", "MLflow",
//   "Apache Kafka", "LangChain", "Qdrant", "BentoML", "Terraform",
//   "OpenAI", "Hugging Face", "DVC", "Ray Serve", "Evidently AI",
//   "Apache Flink", "dbt", "Snowflake", "ArgoCD", "Weights & Biases",
// ];

// function TypingText({ texts }: { texts: string[] }) {
//   const [idx, setIdx] = useState(0);
//   const [displayed, setDisplayed] = useState("");
//   const [deleting, setDeleting] = useState(false);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     if (paused) {
//       const t = setTimeout(() => setPaused(false), 1200);
//       return () => clearTimeout(t);
//     }

//     const current = texts[idx];
//     let timeout: ReturnType<typeof setTimeout>;

//     if (!deleting) {
//       if (displayed.length < current.length) {
//         timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
//       } else {
//         setPaused(true);
//         setDeleting(true);
//       }
//     } else {
//       if (displayed.length > 0) {
//         timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
//       } else {
//         setDeleting(false);
//         setIdx((prev) => (prev + 1) % texts.length);
//       }
//     }

//     return () => clearTimeout(timeout);
//   }, [displayed, deleting, paused, idx, texts]);

//   return (
//     <span style={{ color: "#A4FBCC" }}>
//       {displayed}
//       <span className="animate-blink" style={{ color: "#A4FBCC" }}>_</span>
//     </span>
//   );
// }

// export function Home() {
//   const featuredProjects = PROJECTS.filter((p) => p.featured);
//   const recentPosts = BLOG_POSTS.slice(0, 3);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   return (
//     <div className="min-h-screen" style={{ background: "#081A04" }}>
//       {/* ── Hero ─────────────────────────────────────────────────── */}
//       <section
//         className="relative min-h-screen flex flex-col justify-center grid-bg"
//         style={{ paddingTop: "80px" }}
//       >
//         {/* Glow orb */}
//         <div
//           className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
//           style={{
//             width: "600px",
//             height: "600px",
//             background: "radial-gradient(circle, rgba(164, 251, 204, 0.06) 0%, transparent 70%)",
//             filter: "blur(40px)",
//           }}
//         />

//         <div className="relative max-w-6xl mx-auto px-6 py-20">
//           {/* Status badge */}
//           <div
//             className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
//             style={{
//               background: "rgba(164, 251, 204, 0.06)",
//               border: "1px solid rgba(164, 251, 204, 0.2)",
//             }}
//           >
//             <span
//               className="w-2 h-2 rounded-full"
//               style={{ background: "#A4FBCC", boxShadow: "0 0 8px #A4FBCC" }}
//             />
//             <span className="text-xs" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
//               Available for new projects — Q2 2025
//             </span>
//           </div>

//           {/* H1 */}
//           <h1
//             className="mb-4 leading-tight"
//             style={{
//               fontSize: "clamp(2.2rem, 5vw, 4rem)",
//               color: "#F2F2F2",
//               fontWeight: 700,
//               maxWidth: "800px",
//               lineHeight: 1.15,
//             }}
//           >
//             {PROFILE.name}
//             <br />
//             <TypingText
//               texts={[
//                 "AI Agent Architect",
//                 "MLOps Engineer",
//                 "Data Scientist",
//                 "Agentic Workflow Designer",
//               ]}
//             />
//           </h1>

//           <p
//             className="mb-10 max-w-2xl"
//             style={{
//               color: "#9199A5",
//               fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
//               lineHeight: 1.7,
//             }}
//           >
//             {PROFILE.tagline} Specializing in multi-agent systems,
//             production MLOps pipelines, and end-to-end AI workflow automation
//             from research to scale.
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-wrap gap-4 mb-14">
//             <Link
//               to="/projects"
//               className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
//               style={{
//                 background: "#A4FBCC",
//                 color: "#081A04",
//                 fontWeight: 600,
//                 textDecoration: "none",
//                 fontSize: "0.9rem",
//               }}
//               onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
//               onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
//             >
//               View Projects <ArrowRight size={16} />
//             </Link>
//             <Link
//               to="/blog"
//               className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
//               style={{
//                 border: "1px solid rgba(164, 251, 204, 0.3)",
//                 color: "#A4FBCC",
//                 textDecoration: "none",
//                 fontSize: "0.9rem",
//               }}
//               onMouseEnter={(e) => {
//                 (e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.06)";
//               }}
//               onMouseLeave={(e) => {
//                 (e.currentTarget as HTMLElement).style.background = "transparent";
//               }}
//             >
//               Read the Blog
//             </Link>
//           </div>

//           {/* Social links */}
//           <div className="flex items-center gap-4">
//             <span className="text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
//               Find me on
//             </span>
//             {[
//               { href: PROFILE.github, icon: <Github size={16} />, label: "GitHub" },
//               { href: PROFILE.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
//               { href: PROFILE.twitter, icon: <Twitter size={16} />, label: "Twitter" },
//             ].map((s) => (
//               <a
//                 key={s.label}
//                 href={s.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={s.label}
//                 className="transition-colors duration-200"
//                 style={{ color: "#9199A5" }}
//                 onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//                 onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//               >
//                 {s.icon}
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
//           <span className="text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>scroll</span>
//           <ChevronDown size={16} style={{ color: "#9199A5" }} className="animate-bounce" />
//         </div>
//       </section>

//       {/* ── Tech Marquee ────────────────────────────────────────── */}
//       <div
//         className="py-4 overflow-hidden"
//         style={{ borderTop: "1px solid rgba(164, 251, 204, 0.06)", borderBottom: "1px solid rgba(164, 251, 204, 0.06)" }}
//       >
//         <div
//           className="flex gap-8"
//           style={{
//             animation: "marquee 30s linear infinite",
//             width: "max-content",
//           }}
//         >
//           {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
//             <span
//               key={i}
//               className="text-xs whitespace-nowrap px-3 py-1 rounded"
//               style={{
//                 color: "#9199A5",
//                 fontFamily: "'Space Mono', monospace",
//                 background: "rgba(164, 251, 204, 0.04)",
//                 border: "1px solid rgba(164, 251, 204, 0.08)",
//               }}
//             >
//               {tech}
//             </span>
//           ))}
//         </div>
//         <style>{`
//           @keyframes marquee {
//             from { transform: translateX(0); }
//             to { transform: translateX(-50%); }
//           }
//         `}</style>
//       </div>

//       {/* ── What I Do ───────────────────────────────────────────── */}
//       <section className="section-padding" style={{ background: "#081A04" }}>
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="mb-12">
//             <span className="text-xs uppercase tracking-widest" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
//               Services
//             </span>
//             <h2 className="mt-2" style={{ color: "#F2F2F2", fontSize: "1.75rem", fontWeight: 700 }}>
//               What I Do
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {SERVICES.map((service) => (
//               <div
//                 key={service.id}
//                 className="card-hover rounded-xl p-6 flex flex-col gap-4"
//                 style={{
//                   background: "#1B3022",
//                   border: "1px solid rgba(164, 251, 204, 0.1)",
//                 }}
//               >
//                 <div
//                   className="w-10 h-10 rounded-lg flex items-center justify-center"
//                   style={{ background: "rgba(164, 251, 204, 0.1)", border: "1px solid rgba(164, 251, 204, 0.2)" }}
//                 >
//                   {ICON_MAP[service.icon]}
//                 </div>
//                 <h4 style={{ color: "#F2F2F2", fontWeight: 600, fontSize: "0.95rem" }}>{service.title}</h4>
//                 <p className="text-sm leading-relaxed" style={{ color: "#9199A5" }}>
//                   {service.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Featured Projects ────────────────────────────────────── */}
//       <section className="section-padding" style={{ background: "#000000" }}>
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex items-end justify-between mb-12">
//             <div>
//               <span className="text-xs uppercase tracking-widest" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
//                 Work
//               </span>
//               <h2 className="mt-2" style={{ color: "#F2F2F2", fontSize: "1.75rem", fontWeight: 700 }}>
//                 Featured Work
//               </h2>
//             </div>
//             <Link
//               to="/projects"
//               className="hidden sm:flex items-center gap-1 text-sm transition-colors duration-200"
//               style={{ color: "#9199A5", textDecoration: "none" }}
//               onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//               onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//             >
//               All Projects <ArrowRight size={14} />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {featuredProjects.map((project) => (
//               <ProjectCard key={project.id} project={project} featured />
//             ))}
//           </div>

//           <div className="mt-8 text-center sm:hidden">
//             <Link
//               to="/projects"
//               className="text-sm"
//               style={{ color: "#A4FBCC", textDecoration: "none" }}
//             >
//               View all projects →
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ── Stats ───────────────────────────────────────────────── */}
//       <section className="py-16" style={{ background: "#081A04", borderTop: "1px solid rgba(164, 251, 204, 0.06)" }}>
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { icon: <Zap size={20} style={{ color: "#A4FBCC" }} />, value: "15+", label: "Production AI Systems" },
//               { icon: <Cpu size={20} style={{ color: "#A4FBCC" }} />, value: "50k+", label: "Events/sec Processed" },
//               { icon: <Database size={20} style={{ color: "#A4FBCC" }} />, value: "40+", label: "ML Models Deployed" },
//               { icon: <Code2 size={20} style={{ color: "#A4FBCC" }} />, value: "5+", label: "Years in Production AI" },
//             ].map((stat, i) => (
//               <div key={i} className="flex flex-col gap-2">
//                 <div className="mb-1">{stat.icon}</div>
//                 <span style={{ color: "#A4FBCC", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
//                   {stat.value}
//                 </span>
//                 <span className="text-sm" style={{ color: "#9199A5" }}>{stat.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Recent Blog Posts ────────────────────────────────────── */}
//       <section className="section-padding" style={{ background: "#000000" }}>
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex items-end justify-between mb-12">
//             <div>
//               <span className="text-xs uppercase tracking-widest" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
//                 Writing
//               </span>
//               <h2 className="mt-2" style={{ color: "#F2F2F2", fontSize: "1.75rem", fontWeight: 700 }}>
//                 Latest from the Blog
//               </h2>
//             </div>
//             <Link
//               to="/blog"
//               className="hidden sm:flex items-center gap-1 text-sm transition-colors duration-200"
//               style={{ color: "#9199A5", textDecoration: "none" }}
//               onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
//               onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
//             >
//               All Posts <ArrowRight size={14} />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             {recentPosts.map((post) => (
//               <BlogCard key={post.id} post={post} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ─────────────────────────────────────────────────── */}
//       <section
//         className="py-24 relative overflow-hidden"
//         style={{ background: "#081A04" }}
//       >
//         {/* Glow */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: "radial-gradient(ellipse at center, rgba(164, 251, 204, 0.05) 0%, transparent 70%)",
//           }}
//         />
//         <div className="relative max-w-3xl mx-auto px-6 text-center">
//           <span className="text-xs uppercase tracking-widest mb-4 block" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
//             Collaboration
//           </span>
//           <h2
//             className="mb-4"
//             style={{ color: "#F2F2F2", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700 }}
//           >
//             Interested in working together?
//           </h2>
//           <p className="mb-8" style={{ color: "#9199A5" }}>
//             Whether you need an agentic AI system built from scratch, an MLOps platform, or consulting on your data strategy — let's talk.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-200"
//             style={{
//               background: "#A4FBCC",
//               color: "#081A04",
//               fontWeight: 600,
//               textDecoration: "none",
//             }}
//             onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
//             onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
//           >
//             Get in Touch <ArrowRight size={16} />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }





















// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------












import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import {
  Brain, GitBranch, BarChart2, Server,
  ArrowRight, Github, Linkedin, Twitter,
  ChevronDown, Zap, Cpu, Database, Code2,
  ExternalLink,
} from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { BlogCard } from "../components/BlogCard";
import { PROFILE, PROJECTS, BLOG_POSTS, SERVICES, TOOLS } from "../data";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tool {
  name: string;
  category?: string;
  level?: number | string;
  icon?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const C = {
  bg:        "#081A04",
  black:     "#000000",
  mint:      "#A4FBCC",
  grey:      "#9199A5",
  white:     "#F2F2F2",
  moss:      "#1B3022",
  mintDim:   "rgba(164,251,204,0.06)",
  mintBorder:"rgba(164,251,204,0.12)",
  mintBorderHi: "rgba(164,251,204,0.22)",
} as const;

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain:     <Brain    size={20} style={{ color: C.mint }} />,
  GitBranch: <GitBranch size={20} style={{ color: C.mint }} />,
  BarChart2: <BarChart2 size={20} style={{ color: C.mint }} />,
  Server:    <Server   size={20} style={{ color: C.mint }} />,
};

const TECH_MARQUEE = [
  "LangGraph","PyTorch","Apache Airflow","Kubernetes","MLflow",
  "Apache Kafka","LangChain","Qdrant","BentoML","Terraform",
  "OpenAI","Hugging Face","DVC","Ray Serve","Evidently AI",
  "Apache Flink","dbt","Snowflake","ArgoCD","Weights & Biases",
];

const TERMINAL_LINES: Array<{ delay: number; prompt?: boolean; text: string; ok?: boolean; dim?: boolean }> = [
  { delay: 0.5,  prompt: true,  text: "python run_agent.py --env prod" },
  { delay: 1.0,  dim: true,     text: "▸ Initializing multi-agent cluster..." },
  { delay: 1.55, dim: true,     text: "▸ Loaded 12 specialized sub-agents" },
  { delay: 2.1,  dim: true,     text: "▸ Pipeline compiled  [4 stages]" },
  { delay: 2.65, prompt: true,  text: "agent.deploy(target='k8s')" },
  { delay: 3.2,  ok: true,      text: "✓ Deployment successful" },
  { delay: 3.75, ok: true,      text: "✓ Health checks passing (3/3)" },
  { delay: 4.3,  prompt: true,  text: "agent.monitor()" },
  { delay: 4.9,  ok: true,      text: "● Live  —  99.97% uptime" },
];

const TECH_NODES = [
  { label: "LangGraph",  top: "10%", left: "5%"  },
  { label: "Ray",        top: "27%", left: "73%" },
  { label: "Kubernetes", top: "53%", left: "3%"  },
  { label: "MLflow",     top: "70%", left: "67%" },
  { label: "FastAPI",    top: "83%", left: "19%" },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function TypingText({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1200);
      return () => clearTimeout(t);
    }
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
      } else {
        setPaused(true);
        setDeleting(true);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setDeleting(false);
        setIdx((prev) => (prev + 1) % texts.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, paused, idx, texts]);

  return (
    <span style={{ color: C.mint }}>
      {displayed}
      <span
        style={{
          display: "inline-block", width: "3px", height: "0.82em",
          background: C.mint, marginLeft: "2px", verticalAlign: "middle",
          animation: "blink 0.9s step-end infinite",
        }}
      />
    </span>
  );
}

function TerminalPanel() {
  const [visible, setVisible] = useState<number[]>([]);
  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) =>
      setTimeout(() => setVisible((v) => [...v, i]), line.delay * 1000 + 400)
    );
  }, []);

  return (
    <div style={{
      background: "rgba(27,48,34,0.42)",
      border: `1px solid ${C.mintBorder}`,
      borderRadius: "12px",
      backdropFilter: "blur(14px)",
      overflow: "hidden",
      boxShadow: `0 0 80px rgba(164,251,204,0.03), 0 32px 64px rgba(0,0,0,0.5)`,
      position: "relative",
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "11px 16px",
        borderBottom: `1px solid rgba(164,251,204,0.07)`,
        background: "rgba(8,26,4,0.55)",
      }}>
        {["#FF5F57","#FFBD2E","#28C840"].map((col, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: col, opacity: 0.75 }} />
        ))}
        <span style={{ marginLeft: 8, fontSize: "0.67rem", color: C.grey, fontFamily: "'Space Mono', monospace" }}>
          agent_runtime — zsh
        </span>
      </div>
      {/* Lines */}
      <div style={{ padding: "20px 20px 26px", minHeight: "280px" }}>
        {TERMINAL_LINES.map((line, i) => (
          <div key={i} style={{
            opacity: visible.includes(i) ? 1 : 0,
            transform: visible.includes(i) ? "translateY(0)" : "translateY(5px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            marginBottom: "9px",
            display: "flex", alignItems: "flex-start", gap: "8px",
          }}>
            {line.prompt && (
              <span style={{ color: C.mint, fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", flexShrink: 0, marginTop: "1px" }}>→</span>
            )}
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
              color: line.ok ? C.mint : line.dim ? C.grey : C.white,
              lineHeight: 1.65,
            }}>
              {line.text}
            </span>
          </div>
        ))}
      </div>
      {/* Floating nodes */}
      {TECH_NODES.map((node, i) => (
        <div key={node.label} style={{
          position: "absolute", top: node.top, left: node.left,
          padding: "3px 8px", borderRadius: "4px",
          background: "rgba(8,26,4,0.88)",
          border: `1px solid rgba(164,251,204,0.13)`,
          fontSize: "0.59rem", fontFamily: "'Space Mono', monospace",
          color: C.grey, pointerEvents: "none",
          animation: `floatNode ${2.8 + i * 0.45}s ease-in-out infinite alternate`,
        }}>
          {node.label}
        </div>
      ))}
    </div>
  );
}

function StatItem({
  icon, value, suffix, label, started,
}: {
  icon: React.ReactNode; value: number; suffix: string; label: string; started: boolean;
}) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-1">{icon}</div>
      <span style={{
        color: C.mint, fontSize: "clamp(1.6rem,3vw,2.1rem)",
        fontWeight: 700, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {count}{suffix}
      </span>
      <span className="text-sm" style={{ color: C.grey }}>{label}</span>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
      <span style={{ width: "24px", height: "1px", background: C.mint, opacity: 0.6 }} />
      <span className="text-xs uppercase tracking-widest" style={{ color: C.mint, fontFamily: "'Space Mono', monospace" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Global Keyframes (injected once) ────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

  @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes marquee      { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes marqueeRev   { from{transform:translateX(-50%)} to{transform:translateX(0)} }
  @keyframes orb1Drift    { 0%,100%{transform:translate(-50%,-50%) scale(1)} 55%{transform:translate(-47%,-53%) scale(1.09)} }
  @keyframes orb2Drift    { 0%,100%{transform:translate(0,0) scale(1)} 60%{transform:translate(16px,-22px) scale(1.13)} }
  @keyframes pulseRing    { 0%{transform:scale(0.85);opacity:0.45} 100%{transform:scale(1.75);opacity:0} }
  @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  @keyframes floatNode    { 0%{transform:translateY(0)} 100%{transform:translateY(-7px)} }
  @keyframes gridPan      { 0%{background-position:0 0} 100%{background-position:40px 40px} }
  @keyframes shimmer      { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }

  .home-root * { box-sizing: border-box; }

  .home-root {
    font-family: 'Space Grotesk', sans-serif;
  }

  .hero-grid-bg {
    background-image:
      linear-gradient(rgba(164,251,204,0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(164,251,204,0.026) 1px, transparent 1px),
      #081A04;
    background-size: 40px 40px, 40px 40px, auto;
    animation: gridPan 18s linear infinite;
  }

  .reveal-hidden  { opacity:0; transform:translateY(24px); transition:opacity .7s ease, transform .7s ease; }
  .reveal-visible { opacity:1; transform:translateY(0); }

  .card-hover-mint {
    transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease !important;
  }
  .card-hover-mint:hover {
    border-color: rgba(164,251,204,0.28) !important;
    box-shadow: 0 0 24px rgba(164,251,204,0.06), 0 8px 32px rgba(0,0,0,0.3) !important;
    transform: translateY(-3px) !important;
  }

  .btn-primary { transition: opacity .2s ease, transform .2s ease !important; }
  .btn-primary:hover { opacity:.87 !important; transform:translateY(-2px) !important; }

  .btn-outline { background:transparent !important; transition: background .2s ease, transform .2s ease !important; }
  .btn-outline:hover { background:rgba(164,251,204,0.07) !important; transform:translateY(-2px) !important; }

  .soc-icon { transition: color .2s ease, transform .2s ease !important; }
  .soc-icon:hover { color:#A4FBCC !important; transform:translateY(-2px) !important; }

  .tool-tag {
    transition: border-color .2s ease, color .2s ease, background .2s ease !important;
    cursor: default;
  }
  .tool-tag:hover {
    border-color: rgba(164,251,204,0.35) !important;
    color: #A4FBCC !important;
    background: rgba(164,251,204,0.07) !important;
  }

  .link-hover { transition: color .2s ease !important; }
  .link-hover:hover { color:#A4FBCC !important; }

  .hero-right-panel {
    display: block;
  }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-right-panel { display: none !important; }
  }

  @media (max-width: 640px) {
    .tools-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;

// ─── Home Page ────────────────────────────────────────────────────────────────
export function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const recentPosts      = BLOG_POSTS.slice(0, 3);

  // Hero mount animation
  const [heroMounted, setHeroMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroMounted(true), 60); return () => clearTimeout(t); }, []);

  const heroFade = (delay = 0): React.CSSProperties => ({
    opacity:   heroMounted ? 1 : 0,
    transform: heroMounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .75s ease ${delay}s, transform .75s ease ${delay}s`,
  });

  // Section reveal refs
  const servicesReveal  = useScrollReveal();
  const projectsReveal  = useScrollReveal();
  const statsReveal     = useScrollReveal();
  const toolsReveal     = useScrollReveal();
  const blogReveal      = useScrollReveal();
  const ctaReveal       = useScrollReveal();

  // Typed tools
  const typedTools = (TOOLS as Tool[]);

  // Group tools by category if available
  const toolCategories = typedTools.reduce<Record<string, Tool[]>>((acc, tool) => {
    const cat = tool.category ?? "Core Stack";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(tool);
    return acc;
  }, {});
  const hasCats = Object.keys(toolCategories).length > 1;

  return (
    <div className="min-h-screen home-root" style={{ background: C.bg }}>
      <style>{GLOBAL_STYLES}</style>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="hero-grid-bg relative min-h-screen flex flex-col justify-center"
        style={{ paddingTop: "80px", overflow: "hidden" }}
      >
        {/* Orb 1 */}
        <div style={{
          position: "absolute", top: "38%", left: "32%",
          width: "720px", height: "720px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(164,251,204,0.05) 0%, transparent 65%)",
          filter: "blur(52px)", pointerEvents: "none",
          animation: "orb1Drift 11s ease-in-out infinite",
          transform: "translate(-50%,-50%)",
        }} />
        {/* Orb 2 */}
        <div style={{
          position: "absolute", top: "62%", right: "-6%",
          width: "460px", height: "460px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(164,251,204,0.03) 0%, transparent 70%)",
          filter: "blur(64px)", pointerEvents: "none",
          animation: "orb2Drift 14s ease-in-out infinite",
        }} />
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 36%, rgba(0,0,0,0.46) 100%)",
        }} />

        {/* Two-column content */}
        <div
          className="hero-grid relative max-w-6xl mx-auto px-6 py-20 w-full"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
        >
          {/* ── Left column ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>

            {/* Status badge */}
            <div style={{ ...heroFade(0.05), marginBottom: "2rem" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px 6px 12px", borderRadius: "999px",
                background: "rgba(164,251,204,0.046)",
                border: `1px solid ${C.mintBorderHi}`,
                position: "relative",
              }}>
                <span style={{
                  position: "absolute", left: "12px", width: "8px", height: "8px",
                  borderRadius: "50%", background: C.mint, opacity: 0.35,
                  animation: "pulseRing 2.2s ease-out infinite",
                }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.mint, boxShadow: `0 0 7px ${C.mint}`, flexShrink: 0 }} />
                <span style={{ fontSize: "0.7rem", color: C.mint, fontFamily: "'Space Mono', monospace", letterSpacing: "0.02em" }}>
                  Available for new projects — Q2 2025
                </span>
              </div>
            </div>

            {/* H1 */}
            <h1 style={{
              ...heroFade(0.14),
              margin: "0 0 1rem",
              fontSize: "clamp(2.2rem, 4.4vw, 3.8rem)",
              fontWeight: 800, color: C.white,
              lineHeight: 1.1, letterSpacing: "-0.025em",
              maxWidth: "560px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}>
              {PROFILE.name}
              <br />
              <TypingText texts={[
                "AI Agent Architect",
                "MLOps Engineer",
                "Data Scientist",
                "Agentic Workflow Designer",
              ]} />
            </h1>

            {/* Tagline */}
            <p style={{
              ...heroFade(0.25),
              color: C.grey,
              fontSize: "clamp(0.93rem, 1.35vw, 1.05rem)",
              lineHeight: 1.78, maxWidth: "470px",
              margin: "0 0 2.5rem",
            }}>
              {PROFILE.tagline} Specializing in multi-agent systems, production
              MLOps pipelines, and end-to-end AI workflow automation — from
              research to scale.
            </p>

            {/* CTAs */}
            <div style={{ ...heroFade(0.35), display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "2.5rem" }}>
              <Link
                to="/projects"
                className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg"
                style={{ background: C.mint, color: "#081A04", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}
              >
                View Projects <ArrowRight size={16} />
              </Link>
              <Link
                to="/blog"
                className="btn-outline flex items-center gap-2 px-6 py-3 rounded-lg"
                style={{ border: `1px solid rgba(164,251,204,0.28)`, color: C.mint, textDecoration: "none", fontSize: "0.9rem" }}
              >
                Read the Blog
              </Link>
            </div>

            {/* Divider */}
            <div style={{ ...heroFade(0.42), width: "36px", height: "1px", background: "rgba(164,251,204,0.18)", marginBottom: "1.5rem" }} />

            {/* Socials */}
            <div style={{ ...heroFade(0.48), display: "flex", alignItems: "center", gap: "16px" }}>
              <span className="text-xs" style={{ color: C.grey, fontFamily: "'Space Mono', monospace" }}>Find me on</span>
              {[
                { href: PROFILE.github,   icon: <Github   size={16} />, label: "GitHub"   },
                { href: PROFILE.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
                { href: PROFILE.twitter,  icon: <Twitter  size={16} />, label: "Twitter"  },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="soc-icon"
                  style={{ color: C.grey, display: "flex" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Stats strip */}
            <div style={{
              ...heroFade(0.55),
              display: "flex", gap: "28px", alignItems: "center",
              marginTop: "3rem", paddingTop: "2rem",
              borderTop: "1px solid rgba(145,153,165,0.1)",
            }}>
              {[
                { value: "15+",  label: "AI Systems" },
                { value: "40+",  label: "Models Deployed" },
                { value: "5+",   label: "Years Production AI" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ fontSize: "clamp(1.3rem,2vw,1.6rem)", fontWeight: 700, color: C.mint, lineHeight: 1, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: "0.67rem", color: C.grey, fontFamily: "'Space Mono', monospace" }}>{s.label}</span>
                </div>
              )).reduce<React.ReactNode[]>((acc, el, i) => {
                if (i > 0) acc.push(<div key={`div-${i}`} style={{ width: "1px", height: "28px", background: "rgba(145,153,165,0.17)" }} />);
                acc.push(el);
                return acc;
              }, [])}
            </div>
          </div>

          {/* ── Right column — Terminal ── */}
          <div className="hero-right-panel" style={{ ...heroFade(0.3), position: "relative" }}>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: -16, right: -16, width: 68, height: 68, borderTop: `1px solid rgba(164,251,204,0.16)`, borderRight: `1px solid rgba(164,251,204,0.16)`, borderRadius: "0 8px 0 0", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -28, left: -16, width: 68, height: 68, borderBottom: `1px solid rgba(164,251,204,0.16)`, borderLeft: `1px solid rgba(164,251,204,0.16)`, borderRadius: "0 0 0 8px", pointerEvents: "none" }} />
            <TerminalPanel />
            {/* Status pills */}
            <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              {[
                { dot: C.mint, label: "Production Ready" },
                { dot: C.grey, label: "Open to Collab"  },
              ].map((p) => (
                <div key={p.label} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "4px 10px", borderRadius: "999px",
                  background: "rgba(27,48,34,0.5)", border: "1px solid rgba(164,251,204,0.09)",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.dot }} />
                  <span style={{ fontSize: "0.6rem", color: C.grey, fontFamily: "'Space Mono', monospace" }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ opacity: heroMounted ? 0.55 : 0, transition: "opacity 1.1s ease 1.2s" }}>
          <span className="text-xs" style={{ color: C.grey, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>scroll</span>
          <div style={{ animation: "scrollBounce 2s ease-in-out infinite" }}>
            <ChevronDown size={14} style={{ color: C.grey }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TECH MARQUEE (dual-row)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{ borderTop: `1px solid rgba(164,251,204,0.06)`, borderBottom: `1px solid rgba(164,251,204,0.06)`, overflow: "hidden", padding: "12px 0" }}
      >
        {/* Row 1 — left to right */}
        <div className="py-2 overflow-hidden">
          <div style={{ display: "flex", gap: "12px", animation: "marquee 28s linear infinite", width: "max-content" }}>
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
              <span key={i} className="text-xs whitespace-nowrap px-3 py-1 rounded" style={{
                color: C.grey, fontFamily: "'Space Mono', monospace",
                background: "rgba(164,251,204,0.035)", border: `1px solid rgba(164,251,204,0.07)`,
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — right to left */}
        <div className="py-2 overflow-hidden">
          <div style={{ display: "flex", gap: "12px", animation: "marqueeRev 36s linear infinite", width: "max-content" }}>
            {[...TECH_MARQUEE.slice(10), ...TECH_MARQUEE, ...TECH_MARQUEE.slice(10)].map((tech, i) => (
              <span key={i} className="text-xs whitespace-nowrap px-3 py-1 rounded" style={{
                color: "rgba(145,153,165,0.55)", fontFamily: "'Space Mono', monospace",
                background: "rgba(164,251,204,0.02)", border: `1px solid rgba(164,251,204,0.05)`,
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES — What I Do
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={servicesReveal.ref}
            className={`reveal-hidden ${servicesReveal.visible ? "reveal-visible" : ""}`}
            style={{ marginBottom: "3rem" }}
          >
            <SectionLabel label="Services" />
            <h2 style={{ color: C.white, fontSize: "clamp(1.5rem,3vw,1.85rem)", fontWeight: 700, marginTop: "4px" }}>
              What I Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className="card-hover-mint rounded-xl p-6 flex flex-col gap-4"
                style={{
                  background: C.moss,
                  border: `1px solid ${C.mintBorder}`,
                  opacity: servicesReveal.visible ? 1 : 0,
                  transform: servicesReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .6s ease ${i * 0.1}s, transform .6s ease ${i * 0.1}s, border-color .25s ease, box-shadow .25s ease`,
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 40, height: 40, borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(164,251,204,0.09)", border: `1px solid rgba(164,251,204,0.18)`,
                }}>
                  {ICON_MAP[service.icon]}
                </div>
                <h4 style={{ color: C.white, fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.35 }}>
                  {service.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: C.grey }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED PROJECTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: C.black }}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={projectsReveal.ref}
            className={`reveal-hidden ${projectsReveal.visible ? "reveal-visible" : ""}`}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel label="Work" />
                <h2 style={{ color: C.white, fontSize: "clamp(1.5rem,3vw,1.85rem)", fontWeight: 700, marginTop: "4px" }}>
                  Featured Work
                </h2>
              </div>
              <Link
                to="/projects"
                className="hidden sm:flex items-center gap-1 text-sm link-hover"
                style={{ color: C.grey, textDecoration: "none" }}
              >
                All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id}
                style={{
                  opacity: projectsReveal.visible ? 1 : 0,
                  transform: projectsReveal.visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity .65s ease ${i * 0.1}s, transform .65s ease ${i * 0.1}s`,
                }}
              >
                <ProjectCard project={project} featured />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/projects" className="text-sm" style={{ color: C.mint, textDecoration: "none" }}>
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="py-16"
        style={{ background: C.bg, borderTop: `1px solid rgba(164,251,204,0.06)` }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={statsReveal.ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: <Zap      size={20} style={{ color: C.mint }} />, value: 15,    suffix: "+",  label: "Production AI Systems" },
              { icon: <Cpu      size={20} style={{ color: C.mint }} />, value: 50000, suffix: "k+", label: "Events/sec Processed"   },
              { icon: <Database size={20} style={{ color: C.mint }} />, value: 40,    suffix: "+",  label: "ML Models Deployed"     },
              { icon: <Code2    size={20} style={{ color: C.mint }} />, value: 5,     suffix: "+",  label: "Years in Production AI" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  opacity: statsReveal.visible ? 1 : 0,
                  transform: statsReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity .6s ease ${i * 0.12}s, transform .6s ease ${i * 0.12}s`,
                }}
              >
                <StatItem
                  icon={stat.icon}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  started={statsReveal.visible}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TOOLS & STACK
      ══════════════════════════════════════════════════════════════ */}
      {typedTools.length > 0 && (
        <section className="section-padding" style={{ background: C.black }}>
          <div className="max-w-6xl mx-auto px-6">
            <div
              ref={toolsReveal.ref}
              className={`reveal-hidden ${toolsReveal.visible ? "reveal-visible" : ""}`}
              style={{ marginBottom: "3rem" }}
            >
              <SectionLabel label="Stack" />
              <h2 style={{ color: C.white, fontSize: "clamp(1.5rem,3vw,1.85rem)", fontWeight: 700, marginTop: "4px" }}>
                Tools & Technologies
              </h2>
            </div>

            {hasCats ? (
              /* Categorized layout */
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {Object.entries(toolCategories).map(([cat, tools], ci) => (
                  <div key={cat} style={{
                    opacity: toolsReveal.visible ? 1 : 0,
                    transform: toolsReveal.visible ? "translateY(0)" : "translateY(18px)",
                    transition: `opacity .6s ease ${ci * 0.1}s, transform .6s ease ${ci * 0.1}s`,
                  }}>
                    <div style={{ marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.7rem", color: C.grey, fontFamily: "'Space Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {cat}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {tools.map((tool, ti) => (
                        <span key={ti} className="tool-tag" style={{
                          padding: "5px 12px", borderRadius: "6px", fontSize: "0.8rem",
                          color: C.grey, fontFamily: "'Space Mono', monospace",
                          background: "rgba(27,48,34,0.6)", border: `1px solid rgba(164,251,204,0.1)`,
                        }}>
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Flat grid layout */
              <div
                className="tools-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: "8px",
                }}
              >
                {typedTools.map((tool, i) => (
                  <div
                    key={i}
                    className="tool-tag"
                    style={{
                      padding: "10px 14px", borderRadius: "8px",
                      background: "rgba(27,48,34,0.55)", border: `1px solid rgba(164,251,204,0.1)`,
                      display: "flex", alignItems: "center", gap: "8px",
                      opacity: toolsReveal.visible ? 1 : 0,
                      transform: toolsReveal.visible ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity .5s ease ${(i % 20) * 0.04}s, transform .5s ease ${(i % 20) * 0.04}s, border-color .2s ease, color .2s ease, background .2s ease`,
                    }}
                  >
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(164,251,204,0.45)",
                    }} />
                    <span style={{ fontSize: "0.78rem", color: C.grey, fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          RECENT BLOG POSTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            ref={blogReveal.ref}
            className={`reveal-hidden ${blogReveal.visible ? "reveal-visible" : ""}`}
          >
            <div className="flex items-end justify-between mb-12">
              <div>
                <SectionLabel label="Writing" />
                <h2 style={{ color: C.white, fontSize: "clamp(1.5rem,3vw,1.85rem)", fontWeight: 700, marginTop: "4px" }}>
                  Latest from the Blog
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden sm:flex items-center gap-1 text-sm link-hover"
                style={{ color: C.grey, textDecoration: "none" }}
              >
                All Posts <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentPosts.map((post, i) => (
              <div
                key={post.id}
                style={{
                  opacity: blogReveal.visible ? 1 : 0,
                  transform: blogReveal.visible ? "translateY(0)" : "translateY(22px)",
                  transition: `opacity .65s ease ${i * 0.1}s, transform .65s ease ${i * 0.1}s`,
                }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA — COLLABORATION
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: C.black }}>
        {/* Glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(164,251,204,0.048) 0%, transparent 68%)",
        }} />
        {/* Corner accents */}
        <div style={{ position: "absolute", top: 32, left: 32, width: 56, height: 56, borderTop: `1px solid rgba(164,251,204,0.14)`, borderLeft: `1px solid rgba(164,251,204,0.14)`, borderRadius: "4px 0 0 0" }} />
        <div style={{ position: "absolute", bottom: 32, right: 32, width: 56, height: 56, borderBottom: `1px solid rgba(164,251,204,0.14)`, borderRight: `1px solid rgba(164,251,204,0.14)`, borderRadius: "0 0 4px 0" }} />

        <div
          ref={ctaReveal.ref}
          className={`reveal-hidden ${ctaReveal.visible ? "reveal-visible" : ""}`}
          style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}
        >
          <SectionLabel label="Collaboration" />
          <h2 style={{
            color: C.white,
            fontSize: "clamp(1.5rem,3.5vw,2.6rem)",
            fontWeight: 700, marginTop: "8px", marginBottom: "16px",
            letterSpacing: "-0.02em", lineHeight: 1.2,
          }}>
            Interested in working together?
          </h2>
          <p style={{ color: C.grey, lineHeight: 1.75, marginBottom: "2.5rem", fontSize: "1rem" }}>
            Whether you need an agentic AI system built from scratch, an MLOps platform,
            or consulting on your data strategy — let's talk.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-lg"
              style={{ background: C.mint, color: "#081A04", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2 px-6 py-3 rounded-lg"
              style={{ border: `1px solid rgba(164,251,204,0.25)`, color: C.mint, textDecoration: "none", fontSize: "0.9rem" }}
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
