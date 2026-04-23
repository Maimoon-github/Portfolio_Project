import Link from "next/link";
import { ArrowRight, Github, Star, Calculator } from "lucide-react";
import { projects, blogPosts, skills, calculators } from "@/data/mock-data";
import { ProjectCard } from "@/components/home/ProjectCard";
import { BlogCard } from "@/components/home/BlogCard";
import { CalculatorTeaserCard } from "@/components/home/CalculatorTeaserCard";
import { TechBadge } from "@/components/home/TechBadge";

// Static generation – no revalidation needed for homepage content
export const dynamic = "force-static";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);
  const featuredCalcs = calculators.filter((c) => c.featured).slice(0, 4);
  const skillGroups = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  return (
    <main className="bg-background font-sans">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full -top-32 -right-32 bg-primary/5 blur-[80px]" />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-0 -left-20 bg-chart-3/5 blur-[60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-chart-3/10 border border-chart-3/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-chart-3 text-[0.72rem] font-semibold tracking-widest uppercase">
                    Available for Consulting
                  </span>
                </div>
              </div>

              <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-bold tracking-[-0.03em] text-foreground leading-[1.08] mb-6">
                Engineering<br />
                <span className="text-primary">Intelligence</span><br />
                at Scale.
              </h1>

              <p className="text-foreground/60 text-lg leading-relaxed max-w-2xl mb-10">
                Senior AI/ML Engineer specialising in large language models, computer vision, and MLOps infrastructure. I build systems that don&apos;t just demo well — they scale.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-[#ff9f1c] text-primary-foreground font-semibold"
                >
                  View My Work <ArrowRight size={16} />
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-foreground font-medium bg-foreground/5 border border-foreground/10"
                >
                  Read the Blog
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 mt-12">
                {[
                  { value: "8+", label: "Years Experience" },
                  { value: "40+", label: "Models Deployed" },
                  { value: "15K+", label: "GitHub Stars" },
                  { value: "12+", label: "Open Source Libs" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-primary tracking-tight">{stat.value}</div>
                    <div className="text-xs text-foreground/40 tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center lg:justify-end relative">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-[40px] scale-110" />
                <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border border-primary/20">
                  <img
                    src="https://images.unsplash.com/photo-1618593706014-06782cd3bb3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                    alt="Alex Reeves, Senior AI/ML Engineer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
                </div>
                <div className="absolute -left-6 top-1/4 px-3 py-2 rounded-xl bg-card border border-primary/15 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <BrainCircuit size={14} className="text-primary" />
                    <span className="text-foreground text-xs font-semibold">LLMs & RAG</span>
                  </div>
                </div>
                <div className="absolute -right-6 bottom-1/4 px-3 py-2 rounded-xl bg-card border border-chart-3/15 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-chart-3" />
                    <span className="text-foreground text-xs font-semibold">MLOps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-chart-3 text-xs font-semibold tracking-widest uppercase mb-2">Selected Work</p>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground tracking-tight">
                Projects That Ship.
              </h2>
            </div>
            <Link href="/projects" className="flex items-center gap-1.5 text-primary font-semibold text-sm">
              All Projects <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Hub Teaser */}
      <section className="py-28 relative overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/5 blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-chart-3 text-xs font-semibold tracking-widest uppercase mb-3">Interactive Tools</p>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground tracking-tight mb-4">
                The Calculator Hub.
              </h2>
              <p className="text-foreground/55 text-base leading-relaxed mb-8">
                A curated collection of interactive tools for finance, health, mathematics, and developer utilities. Built for accuracy, designed for clarity.
              </p>
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-[#ff9f1c] text-primary-foreground font-semibold"
              >
                <Calculator size={16} /> Explore Tools
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {featuredCalcs.map((calc, i) => (
                <CalculatorTeaserCard key={calc.id} calculator={calc} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-chart-3 text-xs font-semibold tracking-widest uppercase mb-2">From the Blog</p>
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground tracking-tight">
                Thinking in Public.
              </h2>
            </div>
            <Link href="/blog" className="flex items-center gap-1.5 text-primary font-semibold text-sm">
              All Articles <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-chart-3 text-xs font-semibold tracking-widest uppercase mb-2">Tech Stack</p>
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground tracking-tight">
              The Full Arsenal.
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {Object.entries(skillGroups).map(([category, skillNames]) => (
              <div key={category}>
                <p className="text-xs font-semibold tracking-widest uppercase text-chart-3/60 mb-3">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {skillNames.map((name) => (
                    <TechBadge key={name} name={name} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden bg-secondary">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full -bottom-40 left-1/2 -translate-x-1/2 bg-primary/8 blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-primary" />
            ))}
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-foreground tracking-tight leading-tight mb-5">
            Have an ambitious AI project?<br />Let&apos;s build it right.
          </h2>
          <p className="text-foreground/55 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            I consult on ML system architecture, LLM fine-tuning, and production deployment for startups and enterprises.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:alex@example.com"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-br from-primary to-[#ff9f1c] text-primary-foreground font-semibold"
            >
              Start a Conversation <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-foreground font-medium bg-foreground/5 border border-foreground/10"
            >
              <Github size={16} /> GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}