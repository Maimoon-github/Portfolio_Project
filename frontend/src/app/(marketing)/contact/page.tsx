export default function ContactPage() {
  return (
    <main className="bg-background px-5 pb-20 pt-14 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">
              Initiate Your Architectural Inquiry
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Initiate Your Architectural Inquiry
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Bridging the ethereal void between conceptual spark and structural reality. Let us build your sanctuary together.
            </p>
          </div>

          <form className="grid gap-5">
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
            <select className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
              <option>Nature of Project</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Research / Infrastructure</option>
            </select>
            <textarea
              rows={6}
              placeholder="The Vision (Tell us about your dream)"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            <button className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-amber-200/40 transition hover:bg-amber-300">
              Submit Inquiry
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          {[
            {
              title: "Collaborations",
              description: "Seeking architectural synergy for larger urban ecosystems.",
              label: "Connect",
            },
            {
              title: "Speaking",
              description: "Keynotes on the intersection of humanism and AI logic.",
              label: "Inquire",
            },
            {
              title: "Research",
              description: "Access our white papers on future atmospheric building.",
              label: "Explore",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">{item.label}</p>
            </div>
          ))}

          <div className="rounded-[2rem] border border-slate-200/70 bg-slate-950 p-8 text-slate-100 shadow-2xl shadow-slate-950/10 dark:border-slate-800/60">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Headquarters</p>
            <p className="mt-4 text-xl font-semibold tracking-tight">Physical Anchor</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">The Glass Pavilion, Studio 01 Dubai Design District, UAE</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
