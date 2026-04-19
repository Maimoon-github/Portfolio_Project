import Link from "next/link";
import { generatePageMetadata } from "@/lib/utils/seo";

export const metadata = generatePageMetadata({
  title: "Resume / CV",
  description: "A dedicated resume page showcasing experience, skills, and career highlights.",
  slug: "resume",
});

export default function ResumePage() {
  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Career profile</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Resume / Curriculum Vitae
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Explore experience, strategic expertise, and the systems-thinking approach behind design-driven product work.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-amber-300"
            >
              Request resume PDF
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:border-amber-300 hover:bg-amber-50"
            >
              Request a consultation
            </Link>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_0.9fr]">
          <div className="space-y-8 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Experience & Timeline</h2>
              <ul className="mt-6 space-y-6">
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
                  <li key={item.title} className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800/60 dark:bg-slate-950">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.range}</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>
                    <p className="mt-4 text-sm font-semibold text-amber-700 dark:text-amber-300">{item.company}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Education & Background</h2>
              <div className="mt-6 space-y-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">M.S. in Interaction Design</p>
                  <p className="mt-2">University of Applied Sciences, 2016 — 2018</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">Professional certification</p>
                  <p className="mt-2">Certified UX strategist and accessibility practitioner</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 rounded-[2rem] border border-slate-200/70 bg-slate-950 p-10 text-slate-100 shadow-2xl shadow-slate-950/20 dark:border-slate-800/60 dark:bg-slate-900">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-white">Skills & Expertise</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "React / Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Design Systems",
                  "Responsive UI",
                  "SEO & Performance",
                ].map((skill) => (
                  <span key={skill} className="block rounded-[1.5rem] bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-slate-900 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Personal story</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                I bridge design systems, product strategy, and digital craftsmanship to help teams launch with confidence. My work is grounded in accessible interfaces, polished motion, and strong storytelling.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
