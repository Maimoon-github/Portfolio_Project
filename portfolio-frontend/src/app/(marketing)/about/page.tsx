// src/app/(marketing)/about/page.tsx
import { Metadata } from 'next';
import { SkillSection } from "@/components/portfolio/SkillSection";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { TestimonialCard } from "@/components/portfolio/TestimonialCard";

export const metadata: Metadata = {
  title: 'About • The Architect',
  description: 'Sovereign Architect of production-grade intelligence systems and high-performance 3D web ecosystems.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <header className="max-w-4xl mb-32 animate-reveal">
          <span className="type-label-caps text-primary opacity-80 block mb-6">
            The Architect
          </span>
          <h1 className="text-[var(--type-display-size)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em] mb-10">
            Precision Mathematics & <br />
            <span className="text-glow-primary">Neural Design</span>
          </h1>
          <p className="text-[var(--type-body-lg-size)] text-on-surface-variant max-w-[65ch] leading-relaxed mb-12">
            I specialize in the deployment of large-scale machine learning systems and the 
            orchestration of agentic frameworks. My work exists at the intersection of 
            rigorous research and production-grade engineering, transforming complex 
            datasets into autonomous, actionable intelligence.
          </p>
        </header>

        {/* ── SKILLS ──────────────────────────────────────────────────────────── */}
        <section className="mb-40">
          <div className="flex items-center gap-8 mb-20">
            <h2 className="text-[var(--type-h2-size)] font-medium text-on-surface whitespace-nowrap">Technical Arsenal</h2>
            <div className="h-px bg-outline-variant/30 w-full" />
          </div>
          <SkillSection />
        </section>

        {/* ── EXPERIENCE ──────────────────────────────────────────────────────── */}
        <section className="mb-40">
          <div className="flex items-center gap-8 mb-20">
            <h2 className="text-[var(--type-h2-size)] font-medium text-on-surface whitespace-nowrap">The Archive</h2>
            <div className="h-px bg-outline-variant/30 w-full" />
          </div>
          <ExperienceTimeline experiences={[]} />
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
        <section className="mb-40">
          <div className="flex items-center gap-8 mb-20">
            <h2 className="text-[var(--type-h2-size)] font-medium text-on-surface whitespace-nowrap">Collaborations</h2>
            <div className="h-px bg-outline-variant/30 w-full" />
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <TestimonialCard
              quote="Alex possesses a rare ability to bridge the gap between high-level AI research and stable, scalable production code. Their architectural foresight saved us months of refactoring."
              authorName="Elias Thorne"
              authorRole="Lead Architect"
              authorCompany="Neural Dynamics"
            />
            <TestimonialCard
              quote="The systems designed by Alex are not just functional; they are elegant. The attention to detail in the agentic orchestration is unlike anything I've seen in the industry."
              authorName="Sarah Jenkins"
              authorRole="VP Engineering"
              authorCompany="Cognitive Labs"
            />
          </div>
        </section>
      </div>
    </main>
  );
}