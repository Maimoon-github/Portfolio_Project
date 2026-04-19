import Link from "next/link";
import { generatePageMetadata } from "@/lib/utils/seo";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export const metadata = generatePageMetadata({
  title: "Resume / CV",
  description: "A dedicated resume page showcasing experience, skills, and career highlights.",
  slug: "resume",
});

export default function ResumePage() {
  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="-top-40 -left-20" />
      <GlowOrb color="primary" size={500} opacity={6} className="bottom-20 -right-20" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-6xl space-y-20">
        <Card surface="low" className="p-10 md:p-16 text-center flex flex-col items-center">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold mb-6">Career Profile</p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)] mb-6">
            Resume / Curriculum Vitae
          </h1>
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--on_surface)]/80 mb-10">
            Explore experience, strategic expertise, and the systems-thinking approach behind design-driven product work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "group")}
            >
              <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">Request Resume PDF</span>
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
            >
              <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">Request a Consultation</span>
            </Link>
          </div>
        </Card>

        <section className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight text-[color:var(--on_surface)] mb-8">Experience & Timeline</h2>
              <ul className="space-y-6">
                {[
                  {
                    title: "Lead Frontend Architect",
                    company: "Maimoon Architect",
                    range: "2023 — Present",
                    summary: "Building responsive design systems, portfolio experiences, and hybrid tool interfaces for high-growth teams.",
                  },
                  {
                    title: "Senior UI/UX Engineer",
                    company: "Studio Lumen",
                    range: "2020 — 2023",
                    summary: "Delivered accessible SaaS experiences, design tokens, and cross-platform interface components for enterprise workflows.",
                  },
                  {
                    title: "Design Systems Consultant",
                    company: "Aurora Labs",
                    range: "2017 — 2020",
                    summary: "Scaled component libraries, optimized onboarding flows, and launched data-driven brand systems.",
                  },
                ].map((item) => (
                  <li key={item.title} className="rounded-[1.75rem] border border-[color:var(--outline)]/10 bg-[color:var(--surface_container)] p-8 transition-colors hover:bg-[color:var(--surface_container_high)]">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[color:var(--secondary)] mb-4">{item.range}</p>
                    <h3 className="text-xl font-medium tracking-tight text-[color:var(--on_surface)] mb-2">{item.title}</h3>
                    <p className="text-sm font-medium text-[color:var(--primary)] mb-4">{item.company}</p>
                    <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/70">{item.summary}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-[color:var(--outline)]/10">
              <h2 className="text-3xl font-medium tracking-tight text-[color:var(--on_surface)] mb-8">Education & Background</h2>
              <div className="grid gap-6">
                <Card surface="low" className="p-8">
                  <p className="text-lg font-medium text-[color:var(--on_surface)]">M.S. in Interaction Design</p>
                  <p className="mt-2 text-sm text-[color:var(--on_surface)]/60">University of Applied Sciences, 2016 — 2018</p>
                </Card>
                <Card surface="low" className="p-8">
                  <p className="text-lg font-medium text-[color:var(--on_surface)]">Professional Certification</p>
                  <p className="mt-2 text-sm text-[color:var(--on_surface)]/60">Certified UX strategist and accessibility practitioner</p>
                </Card>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <Card surface="variant" className="p-10 border border-[color:var(--outline)]/10">
              <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)] mb-6">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "React / Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Design Systems",
                  "Responsive UI",
                  "SEO & Performance",
                ].map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </Card>

            <Card surface="variant" className="p-10 border border-[color:var(--outline)]/10">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Personal Story</p>
              <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/80">
                I bridge design systems, product strategy, and digital craftsmanship to help teams launch with confidence. My work is grounded in accessible interfaces, polished motion, and strong storytelling.
              </p>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
