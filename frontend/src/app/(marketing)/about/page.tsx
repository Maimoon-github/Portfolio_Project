import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils/cn";

export default function AboutPage() {
  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-40 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-6xl space-y-20">
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold mb-4">About</p>
            <h1 className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]">
              Bringing calm clarity to complex product experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
              I craft polished digital systems and thoughtful storytelling for teams who value performance, elegance, and user-centered clarity.
            </p>
          </div>
          <Card surface="low" className="p-8">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Philosophy</p>
            <p className="text-base leading-relaxed text-[color:var(--on_surface)]/80">
              Every interface should feel intuitive, confident, and warm. My work blends structure, motion, and accessibility so ideas become easy to use.
            </p>
          </Card>
        </section>

        <Card surface="low" className="p-10 md:p-14">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-10">Experience & Timeline</p>
          <div className="space-y-8">
            {[
              {
                date: "2023 — Present",
                title: "Lead Frontend Architect",
                subtitle: "Maimoon Architect",
                description: "Building responsive systems, portfolio experiences, and hybrid tool interfaces for ambitious digital products.",
              },
              {
                date: "2020 — 2023",
                title: "Senior UI/UX Engineer",
                subtitle: "Studio Lumen",
                description: "Delivered accessible SaaS interfaces, motion systems, and cross-platform design infrastructure.",
              },
              {
                date: "2017 — 2020",
                title: "Design Systems Consultant",
                subtitle: "Aurora Labs",
                description: "Scaled reusable UI libraries and launched streamlined product workflows for complex enterprise applications.",
              },
            ].map((item, index) => (
              <div key={item.date} className={cn("p-8 rounded-[1.75rem] border border-[color:var(--outline)]/5 bg-[color:var(--surface_container)] transition-colors hover:bg-[color:var(--surface_container_high)]", index !== 0 && "opacity-90")}>
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[color:var(--secondary)] mb-4">{item.date}</p>
                <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">{item.title}</h2>
                <p className="mt-2 text-sm font-medium text-[color:var(--primary)]">{item.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--on_surface)]/70">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <section className="grid gap-8 lg:grid-cols-2">
          <Card surface="low" className="p-10 md:p-14">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-8">Skills & Expertise</p>
            <div className="flex flex-wrap gap-3">
              {[
                "React / Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Design Systems",
                "SEO & Performance",
                "Accessibility",
              ].map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>
          </Card>

          <Card surface="low" className="p-10 md:p-14">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-8">Education</p>
            <div className="space-y-8">
              <div>
                <p className="text-lg font-medium text-[color:var(--on_surface)]">M.S. Interaction Design</p>
                <p className="mt-2 text-sm text-[color:var(--on_surface)]/60">University of Applied Sciences — 2018</p>
              </div>
              <div className="pt-8 border-t border-[color:var(--outline)]/10">
                <p className="text-lg font-medium text-[color:var(--on_surface)]">B.A. Visual Communication</p>
                <p className="mt-2 text-sm text-[color:var(--on_surface)]/60">Creative Media Institute — 2016</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
