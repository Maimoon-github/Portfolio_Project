// src/app/page.tsx
// [SSG] Home page — Sovereign Architect design system
import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"
import { ProjectCard } from "@/components/portfolio/ProjectCard"

export const dynamic = "force-static"

export default function HomePage() {
  // Placeholder featured data (real API fetch in Phase 1)
  const featuredProjects = [
    {
      slug: "llm-rag-system",
      title: "Production RAG Pipeline",
      description: "End-to-end LLM retrieval system with sub-200ms latency and 99.9% uptime.",
      thumbnail: "/images/projects/rag-hero.jpg",
      techTags: ["Next.js", "Django", "Pinecone", "OpenAI"],
      liveUrl: "#",
      repoUrl: "#",
    },
  ]

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
                  <span className="text-chart-3 text-xs font-semibold tracking-widest uppercase">
                    Available for Consulting
                  </span>
                </div>
              </div>

              <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-medium tracking-[-0.03em] text-foreground leading-[1.08] mb-6">
                Engineering<br />
                <span className="text-primary">Intelligence</span><br />
                at Scale.
              </h1>

              <p className="text-foreground/60 text-lg leading-relaxed max-w-2xl mb-10">
                Senior AI/ML Engineer specialising in large language models, computer vision, and MLOps infrastructure. I build systems that scale.
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
            </div>

            <div className="lg:col-span-2 flex justify-center lg:justify-end relative">
              <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border border-primary/20">
                <img
                  src="/images/avatar.jpg"
                  alt="Alex Reeves"
                  className="w-full h-full object-cover"
                />
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
              <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium tracking-tight text-foreground">
                Projects That Ship.
              </h2>
            </div>
            <Link href="/projects" className="flex items-center gap-1.5 text-primary font-semibold text-sm">
              All Projects <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-background text-center">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.03em] text-foreground leading-tight mb-5">
          Have an ambitious AI project?<br />Let&apos;s build it right.
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-br from-primary to-[#ff9f1c] text-primary-foreground font-semibold text-lg"
        >
          Start a Conversation <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  )
}