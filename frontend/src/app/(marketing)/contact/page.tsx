import { Github, Linkedin, Mail, CalendarDays } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Connect</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Let’s turn your vision into a crafted digital experience.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Reach out for project inquiries, collaboration opportunities, or strategic consultations.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Fast contact</p>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-4 dark:bg-slate-950">
                <Mail className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">hello@maimoonarchitect.com</p>
                  <p className="text-slate-500 dark:text-slate-400">General inquiries</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-4 dark:bg-slate-950">
                <Linkedin className="h-5 w-5 text-slate-800 dark:text-slate-200" />
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">LinkedIn</p>
                  <p className="text-slate-500 dark:text-slate-400">View professional profile</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl bg-slate-50 px-4 py-4 dark:bg-slate-950">
                <Github className="h-5 w-5 text-slate-800 dark:text-slate-200" />
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">GitHub</p>
                  <p className="text-slate-500 dark:text-slate-400">Inspect projects and tools</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr]">
          <form className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>
            <input
              type="text"
              placeholder="Project name"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <textarea
              rows={6}
              placeholder="Tell us about your project goals"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-amber-200/40 transition hover:bg-amber-300">
              Send inquiry
            </button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">What's next</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Meeting coordination</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Use the contact form to share project details. We will reply with availability for an introductory call and next steps.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-slate-50 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <CalendarDays className="h-5 w-5 text-amber-500" />
                Request a scheduling link
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200/70 bg-slate-950 p-8 text-slate-100 shadow-2xl shadow-slate-950/10 dark:border-slate-800/60 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Studio</p>
              <p className="mt-4 text-xl font-semibold tracking-tight">Dubai Design District</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">A hybrid studio for digital work, product strategy, and immersive publishing.</p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
