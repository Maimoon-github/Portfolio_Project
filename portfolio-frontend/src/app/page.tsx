// src/app/page.tsx  [SSG]
import { ProjectCard } from "@/components/portfolio/ProjectCard"
import { SkillSection } from "@/components/portfolio/SkillSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Alex Reeves</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Senior AI/ML Engineer · Building production‑grade intelligence systems
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/portfolio">View Work</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {/* Featured Projects (static placeholder, will be fetched at build time) */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* ProjectCard instances will be mapped from fetched data */}
          <p className="text-muted-foreground">Project data will be loaded from the API.</p>
        </div>
      </section>

      {/* Skills Summary */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold">Skills & Technologies</h2>
        <SkillSection />
      </section>
    </div>
  )
}