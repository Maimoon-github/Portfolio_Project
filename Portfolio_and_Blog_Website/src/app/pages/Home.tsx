import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight, Github, Star, Cpu, Database, BrainCircuit,
  TrendingUp, ChevronRight, Calculator
} from "lucide-react";
import { projects, blogPosts, skills, calculators } from "../data/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

function TechBadge({ name, secondary = false }: { name: string; secondary?: boolean }) {
  return (
    <span
      className="px-3 py-1 rounded-md text-xs"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.04em",
        backgroundColor: secondary ? "rgba(126,184,247,0.08)" : "rgba(255,198,139,0.08)",
        color: secondary ? "rgba(126,184,247,0.85)" : "rgba(255,198,139,0.85)",
        border: secondary ? "1px solid rgba(126,184,247,0.12)" : "1px solid rgba(255,198,139,0.12)",
      }}
    >
      {name}
    </span>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative overflow-hidden rounded-2xl flex flex-col"
      style={{ backgroundColor: "#201f1f" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, #201f1f 100%)" }}
        />
        <div className="absolute top-4 left-4">
          <span
            className="px-2.5 py-1 rounded-full text-xs"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              backgroundColor: "rgba(126,184,247,0.15)",
              color: "rgba(126,184,247,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 pt-4">
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "1.15rem",
            color: "#f0e6d3",
            letterSpacing: "-0.01em",
            marginBottom: "0.5rem",
          }}
        >
          {project.title}
        </h3>
        <p style={{ color: "rgba(240,230,211,0.55)", fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1rem" }}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex gap-4 mb-4">
            {project.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#ffc68b" }}>{m.value}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(240,230,211,0.4)", letterSpacing: "0.03em" }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {project.techStack.slice(0, 4).map((t) => (
            <TechBadge key={t} name={t} secondary />
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: "rgba(240,230,211,0.5)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }} target="_blank" rel="noopener noreferrer">
              <Github size={15} /> GitHub
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} className="flex items-center gap-1.5 text-sm transition-colors ml-auto" style={{ color: "#ffc68b", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }} target="_blank" rel="noopener noreferrer">
              Live Demo <ArrowRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ post, index }: { post: (typeof blogPosts)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div
          className="rounded-2xl overflow-hidden transition-all duration-300"
          style={{ backgroundColor: "#201f1f" }}
        >
          <div className="relative overflow-hidden h-44">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #201f1f 100%)" }} />
          </div>
          <div className="p-6 pt-4">
            <div className="flex items-center gap-3 mb-3">
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(126,184,247,0.8)" }}>
                {post.category}
              </span>
              <span style={{ color: "rgba(240,230,211,0.3)", fontSize: "0.75rem" }}>·</span>
              <span style={{ color: "rgba(240,230,211,0.35)", fontSize: "0.78rem", fontFamily: "'Space Grotesk', sans-serif" }}>
                {post.readingTime} min read
              </span>
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1rem", color: "#f0e6d3", letterSpacing: "-0.01em", lineHeight: 1.4, marginBottom: "0.5rem" }}>
              {post.title}
            </h3>
            <p style={{ color: "rgba(240,230,211,0.45)", fontSize: "0.83rem", lineHeight: 1.6 }} className="line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span style={{ color: "#ffc68b", fontSize: "0.82rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }} className="flex items-center gap-1">
                Read article <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);
  const featuredCalcs = calculators.filter((c) => c.featured).slice(0, 4);
  const skillGroups = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  return (
    <main style={{ backgroundColor: "#131313", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Atmospheric blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full -top-32 -right-32 opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full bottom-0 -left-20 opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #7eb8f7 0%, transparent 70%)", filter: "blur(60px)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Text */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-8"
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(126,184,247,0.08)", border: "1px solid rgba(126,184,247,0.15)" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Available for Consulting
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#f0e6d3",
                  lineHeight: 1.08,
                  marginBottom: "1.5rem",
                }}
              >
                Engineering<br />
                <span style={{ color: "#ffc68b" }}>Intelligence</span><br />
                at Scale.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ color: "rgba(240,230,211,0.6)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "34rem", marginBottom: "2.5rem" }}
              >
                Senior AI/ML Engineer specialising in large language models, computer vision, and MLOps infrastructure. I build systems that don't just demo well — they scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/portfolio"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 600, fontSize: "0.95rem" }}
                >
                  View My Work <ArrowRight size={16} />
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200"
                  style={{ color: "#f0e6d3", fontWeight: 500, fontSize: "0.95rem", backgroundColor: "rgba(240,230,211,0.06)", border: "1px solid rgba(240,230,211,0.1)" }}
                >
                  Read the Blog
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-wrap gap-8 mt-12"
              >
                {[
                  { value: "8+", label: "Years Experience" },
                  { value: "40+", label: "Models Deployed" },
                  { value: "15K+", label: "GitHub Stars" },
                  { value: "12+", label: "Open Source Libs" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontWeight: 700, fontSize: "1.6rem", color: "#ffc68b", letterSpacing: "-0.02em" }}>{stat.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(240,230,211,0.4)", letterSpacing: "0.03em" }}>{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Profile image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 flex justify-center lg:justify-end relative"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl opacity-40"
                  style={{ background: "radial-gradient(circle at 50% 50%, #ffc68b, transparent 70%)", filter: "blur(40px)", transform: "scale(1.1)" }}
                />
                <div
                  className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,198,139,0.2)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1618593706014-06782cd3bb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                    alt="Alex Reeves, Senior AI/ML Engineer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(19,19,19,0.7) 100%)" }} />
                </div>
                {/* Floating tags */}
                <div
                  className="absolute -left-6 top-1/4 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: "#201f1f", border: "1px solid rgba(255,198,139,0.15)", backdropFilter: "blur(12px)" }}
                >
                  <div className="flex items-center gap-2">
                    <BrainCircuit size={14} style={{ color: "#ffc68b" }} />
                    <span style={{ color: "#f0e6d3", fontSize: "0.75rem", fontWeight: 600 }}>LLMs & RAG</span>
                  </div>
                </div>
                <div
                  className="absolute -right-6 bottom-1/4 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: "#201f1f", border: "1px solid rgba(126,184,247,0.15)", backdropFilter: "blur(12px)" }}
                >
                  <div className="flex items-center gap-2">
                    <Cpu size={14} style={{ color: "#7eb8f7" }} />
                    <span style={{ color: "#f0e6d3", fontSize: "0.75rem", fontWeight: 600 }}>MLOps</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────────── */}
      <section className="py-28" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                Selected Work
              </motion.p>
              <motion.h2 variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em" }}>
                Projects That Ship.
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link to="/portfolio" className="flex items-center gap-1.5" style={{ color: "#ffc68b", fontSize: "0.9rem", fontWeight: 600 }}>
                All Projects <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR HUB TEASER ─────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#131313" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
                Interactive Tools
              </p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
                The Calculator Hub.
              </h2>
              <p style={{ color: "rgba(240,230,211,0.55)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                A curated collection of interactive tools for finance, health, mathematics, and developer utilities. Built for accuracy, designed for clarity.
              </p>
              <Link to="/calculators" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 600, fontSize: "0.95rem" }}>
                <Calculator size={16} /> Explore Tools
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {featuredCalcs.map((calc, i) => (
                <motion.div
                  key={calc.id}
                  variants={fadeUp}
                  custom={i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/calculators/${calc.slug}`}
                    className="block p-5 rounded-2xl transition-all duration-300 group"
                    style={{ backgroundColor: "#201f1f", border: "1px solid rgba(84,68,52,0.15)" }}
                  >
                    <div className="text-3xl mb-3">{calc.emoji}</div>
                    <h3 style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f0e6d3", marginBottom: "0.3rem" }}>{calc.name}</h3>
                    <p style={{ color: "rgba(240,230,211,0.45)", fontSize: "0.78rem", lineHeight: 1.5 }} className="line-clamp-2">{calc.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST POSTS ──────────────────────────────────────────────────── */}
      <section className="py-28" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                From the Blog
              </motion.p>
              <motion.h2 variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em" }}>
                Thinking in Public.
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Link to="/blog" className="flex items-center gap-1.5" style={{ color: "#ffc68b", fontSize: "0.9rem", fontWeight: 600 }}>
                All Articles <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <section className="py-28" style={{ backgroundColor: "#131313" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
            <p style={{ color: "rgba(126,184,247,0.8)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Tech Stack</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.02em" }}>The Full Arsenal.</h2>
          </motion.div>

          <div className="flex flex-col gap-8">
            {Object.entries(skillGroups).map(([category, skillNames], ci) => (
              <motion.div key={category} variants={fadeUp} custom={ci * 0.1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(126,184,247,0.6)", marginBottom: "0.75rem" }}>
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skillNames.map((name) => (
                    <span
                      key={name}
                      className="px-3 py-1.5 rounded-lg text-sm"
                      style={{
                        backgroundColor: "#201f1f",
                        color: "rgba(240,230,211,0.7)",
                        fontWeight: 500,
                        border: "1px solid rgba(84,68,52,0.15)",
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ backgroundColor: "#1c1b1b" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full -bottom-40 left-1/2 -translate-x-1/2 opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #ffc68b 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star size={14} style={{ color: "#ffc68b" }} />
              <Star size={14} style={{ color: "#ffc68b" }} />
              <Star size={14} style={{ color: "#ffc68b" }} />
              <Star size={14} style={{ color: "#ffc68b" }} />
              <Star size={14} style={{ color: "#ffc68b" }} />
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#f0e6d3", letterSpacing: "-0.025em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Have an ambitious AI project?<br />Let's build it right.
            </h2>
            <p style={{ color: "rgba(240,230,211,0.55)", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: "30rem", margin: "0 auto 2.5rem" }}>
              I consult on ML system architecture, LLM fine-tuning, and production deployment for startups and enterprises.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:alex@example.com" className="flex items-center gap-2 px-7 py-3.5 rounded-xl" style={{ background: "linear-gradient(135deg, #ffc68b, #ff9f1c)", color: "#1a0e00", fontWeight: 600, fontSize: "1rem" }}>
                Start a Conversation <ArrowRight size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-7 py-3.5 rounded-xl" style={{ color: "#f0e6d3", fontWeight: 500, fontSize: "1rem", backgroundColor: "rgba(240,230,211,0.06)", border: "1px solid rgba(240,230,211,0.1)" }}>
                <Github size={16} /> GitHub Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
