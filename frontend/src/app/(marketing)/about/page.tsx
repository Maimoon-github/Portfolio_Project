export default function AboutPage() {
  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">About</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Bringing calm clarity to complex product experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              I craft polished digital systems and thoughtful storytelling for teams who value performance, elegance, and user-centered clarity.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Philosophy</p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
              Every interface should feel intuitive, confident, and warm. My work blends structure, motion, and accessibility so ideas become easy to use.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Experience & timeline</p>
          <div className="mt-8 space-y-6">
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
            ].map((item) => (
              <div key={item.date} className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800/60 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.date}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm font-semibold text-amber-700 dark:text-amber-300">{item.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-10 dark:border-slate-800/60 dark:bg-slate-950">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Skills & expertise</p>
            <div className="mt-6 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
              {[
                "React / Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Design Systems",
                "SEO & Performance",
                "Accessibility",
              ].map((skill) => (
                <span key={skill} className="inline-flex items-center rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:bg-slate-900 dark:text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-10 dark:border-slate-800/60 dark:bg-slate-950">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Education</p>
            <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">M.S. Interaction Design</p>
                <p className="mt-2">University of Applied Sciences — 2018</p>
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">B.A. Visual Communication</p>
                <p className="mt-2">Creative Media Institute — 2016</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
