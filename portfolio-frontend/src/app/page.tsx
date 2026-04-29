import { SkillSection } from "@/components/portfolio/SkillSection";

export default function HomePage() {
  return (
    <>
      {/* HERO — Editorial asymmetry + ambient glow */}
      <section className="section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetric left content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-5 py-2 text-sm label-md">
              <span className="text-secondary">Senior AI/ML Engineer</span>
            </div>
            <h1 className="display-lg leading-none tracking-tighter">
              Alex Reeves
            </h1>
            <p className="text-3xl text-on-surface-variant max-w-md">
              Sovereign Architect of production-grade intelligence systems
            </p>
            <p className="body-lg text-on-surface-variant max-w-md">
              Turning massive computational power into refined, human-centric intelligence.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="/portfolio" className="btn-primary px-10 py-6 text-lg">Explore My Work</a>
              <a href="/about" className="btn-secondary px-10 py-6 text-lg">Meet the Architect</a>
            </div>
          </div>

          {/* Right visual layer (asymmetric) */}
          <div className="lg:col-span-5 relative">
            <div className="glass aspect-square rounded-3xl flex items-center justify-center p-8">
              <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-8xl opacity-20">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protective & ambient glows */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-ambient-glow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-protective opacity-30 blur-3xl" />
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="headline-lg">Featured Projects</h2>
            <a href="/portfolio" className="text-secondary hover:text-primary transition-colors label-md">All Work →</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ProjectCard components will render here via data fetching */}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section tonal-shift">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <h2 className="headline-lg mb-12 text-center">Core Competencies</h2>
          <SkillSection categories={[]} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="headline-lg">Ready to architect the next frontier?</h2>
            <p className="text-on-surface-variant text-xl">Let’s build intelligence systems that matter.</p>
            <a href="/contact" className="btn-primary px-12 py-7 text-xl">Initiate Contact</a>
          </div>
        </div>
      </section>
    </>
  );
}