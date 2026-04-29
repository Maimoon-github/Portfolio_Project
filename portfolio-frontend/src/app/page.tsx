import { SkillSection } from "@/components/portfolio/SkillSection"

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
          <a href="/portfolio" className="text-blue-600">View Work</a>
          <a href="/contact" className="text-blue-600">Get in Touch</a>
        </div>
      </section>

      {/* Skills Summary */}
      <section>
        <h2 className="mb-8 text-2xl font-semibold">Skills & Technologies</h2>
        <SkillSection categories={[]} />
      </section>
    </div>
  )
}