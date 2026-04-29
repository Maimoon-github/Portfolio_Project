// src/app/(marketing)/about/page.tsx  [SSG]
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline"
import { SkillSection } from "@/components/portfolio/SkillSection"
import { TestimonialCard } from "@/components/portfolio/TestimonialCard"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 py-12">
      <section>
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          I design and deploy ML systems that scale. From computer vision pipelines to LLM‑powered
          applications, I bring research to production.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Skills</h2>
        <SkillSection />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Experience</h2>
        <ExperienceTimeline />
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Testimonials</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <TestimonialCard />
        </div>
      </section>
    </div>
  )
}