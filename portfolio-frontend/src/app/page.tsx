import { SkillSection } from "@/components/portfolio/SkillSection"

export default function HomePage() {
  return (
    <div className="space-y-20">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Alex Reeves</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Senior AI/ML Engineer · Building production-grade intelligence systems
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-semibold">Skills & Technologies</h2>
        <SkillSection categories={[]} />
      </section>
    </div>
  )
}