import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  Brain, GitBranch, BarChart2, Server,
  ArrowRight, Github, Linkedin, Twitter,
  ChevronDown, Zap, Cpu, Database, Code2,
} from "lucide-react";
import { ProjectCard } from "../components/ProjectCard";
import { BlogCard } from "../components/BlogCard";
import { PROFILE, PROJECTS, BLOG_POSTS, SERVICES } from "../data";

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain size={22} style={{ color: "#A4FBCC" }} />,
  GitBranch: <GitBranch size={22} style={{ color: "#A4FBCC" }} />,
  BarChart2: <BarChart2 size={22} style={{ color: "#A4FBCC" }} />,
  Server: <Server size={22} style={{ color: "#A4FBCC" }} />,
};

const TECH_MARQUEE = [
  "LangGraph", "PyTorch", "Apache Airflow", "Kubernetes", "MLflow",
  "Apache Kafka", "LangChain", "Qdrant", "BentoML", "Terraform",
  "OpenAI", "Hugging Face", "DVC", "Ray Serve", "Evidently AI",
  "Apache Flink", "dbt", "Snowflake", "ArgoCD", "Weights & Biases",
];

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
    <span style={{ color: "#A4FBCC" }}>
      {displayed}
      <span className="animate-blink" style={{ color: "#A4FBCC" }}>_</span>
    </span>
  );
}

export function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const recentPosts = BLOG_POSTS.slice(0, 3);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen" style={{ background: "#081A04" }}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center grid-bg"
        style={{ paddingTop: "80px" }}
      >
        {/* Glow orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(164, 251, 204, 0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
            style={{
              background: "rgba(164, 251, 204, 0.06)",
              border: "1px solid rgba(164, 251, 204, 0.2)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#A4FBCC", boxShadow: "0 0 8px #A4FBCC" }}
            />
            <span className="text-xs" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
              Available for new projects — Q2 2025
            </span>
          </div>

          {/* H1 */}
          <h1
            className="mb-4 leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#F2F2F2",
              fontWeight: 700,
              maxWidth: "800px",
              lineHeight: 1.15,
            }}
          >
            {PROFILE.name}
            <br />
            <TypingText
              texts={[
                "AI Agent Architect",
                "MLOps Engineer",
                "Data Scientist",
                "Agentic Workflow Designer",
              ]}
            />
          </h1>

          <p
            className="mb-10 max-w-2xl"
            style={{
              color: "#9199A5",
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              lineHeight: 1.7,
            }}
          >
            {PROFILE.tagline} Specializing in multi-agent systems,
            production MLOps pipelines, and end-to-end AI workflow automation
            from research to scale.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              to="/projects"
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
              style={{
                background: "#A4FBCC",
                color: "#081A04",
                fontWeight: 600,
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              View Projects <ArrowRight size={16} />
            </Link>
            <Link
              to="/blog"
              className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-200"
              style={{
                border: "1px solid rgba(164, 251, 204, 0.3)",
                color: "#A4FBCC",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(164, 251, 204, 0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              Read the Blog
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>
              Find me on
            </span>
            {[
              { href: PROFILE.github, icon: <Github size={16} />, label: "GitHub" },
              { href: PROFILE.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
              { href: PROFILE.twitter, icon: <Twitter size={16} />, label: "Twitter" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="transition-colors duration-200"
                style={{ color: "#9199A5" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-xs" style={{ color: "#9199A5", fontFamily: "'Space Mono', monospace" }}>scroll</span>
          <ChevronDown size={16} style={{ color: "#9199A5" }} className="animate-bounce" />
        </div>
      </section>

      {/* ── Tech Marquee ────────────────────────────────────────── */}
      <div
        className="py-4 overflow-hidden"
        style={{ borderTop: "1px solid rgba(164, 251, 204, 0.06)", borderBottom: "1px solid rgba(164, 251, 204, 0.06)" }}
      >
        <div
          className="flex gap-8"
          style={{
            animation: "marquee 30s linear infinite",
            width: "max-content",
          }}
        >
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span
              key={i}
              className="text-xs whitespace-nowrap px-3 py-1 rounded"
              style={{
                color: "#9199A5",
                fontFamily: "'Space Mono', monospace",
                background: "rgba(164, 251, 204, 0.04)",
                border: "1px solid rgba(164, 251, 204, 0.08)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── What I Do ───────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#081A04" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
              Services
            </span>
            <h2 className="mt-2" style={{ color: "#F2F2F2", fontSize: "1.75rem", fontWeight: 700 }}>
              What I Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="card-hover rounded-xl p-6 flex flex-col gap-4"
                style={{
                  background: "#1B3022",
                  border: "1px solid rgba(164, 251, 204, 0.1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(164, 251, 204, 0.1)", border: "1px solid rgba(164, 251, 204, 0.2)" }}
                >
                  {ICON_MAP[service.icon]}
                </div>
                <h4 style={{ color: "#F2F2F2", fontWeight: 600, fontSize: "0.95rem" }}>{service.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "#9199A5" }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#000000" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
                Work
              </span>
              <h2 className="mt-2" style={{ color: "#F2F2F2", fontSize: "1.75rem", fontWeight: 700 }}>
                Featured Work
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden sm:flex items-center gap-1 text-sm transition-colors duration-200"
              style={{ color: "#9199A5", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
            >
              All Projects <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/projects"
              className="text-sm"
              style={{ color: "#A4FBCC", textDecoration: "none" }}
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#081A04", borderTop: "1px solid rgba(164, 251, 204, 0.06)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Zap size={20} style={{ color: "#A4FBCC" }} />, value: "15+", label: "Production AI Systems" },
              { icon: <Cpu size={20} style={{ color: "#A4FBCC" }} />, value: "50k+", label: "Events/sec Processed" },
              { icon: <Database size={20} style={{ color: "#A4FBCC" }} />, value: "40+", label: "ML Models Deployed" },
              { icon: <Code2 size={20} style={{ color: "#A4FBCC" }} />, value: "5+", label: "Years in Production AI" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="mb-1">{stat.icon}</div>
                <span style={{ color: "#A4FBCC", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: "#9199A5" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Blog Posts ────────────────────────────────────── */}
      <section className="section-padding" style={{ background: "#000000" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
                Writing
              </span>
              <h2 className="mt-2" style={{ color: "#F2F2F2", fontSize: "1.75rem", fontWeight: 700 }}>
                Latest from the Blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-1 text-sm transition-colors duration-200"
              style={{ color: "#9199A5", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#A4FBCC")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9199A5")}
            >
              All Posts <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: "#081A04" }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(164, 251, 204, 0.05) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-widest mb-4 block" style={{ color: "#A4FBCC", fontFamily: "'Space Mono', monospace" }}>
            Collaboration
          </span>
          <h2
            className="mb-4"
            style={{ color: "#F2F2F2", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700 }}
          >
            Interested in working together?
          </h2>
          <p className="mb-8" style={{ color: "#9199A5" }}>
            Whether you need an agentic AI system built from scratch, an MLOps platform, or consulting on your data strategy — let's talk.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-200"
            style={{
              background: "#A4FBCC",
              color: "#081A04",
              fontWeight: 600,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
