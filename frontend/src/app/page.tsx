export default function Home() {
  return (
    <div className="relative overflow-hidden bg-background text-foreground">
      <aside className="hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-20 xl:flex xl:w-20 xl:flex-col xl:items-center xl:justify-center xl:gap-6 xl:border-r xl:border-slate-200/70 xl:bg-[#f1fcf7]/80 xl:backdrop-blur-xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-slate-950">A</div>
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition hover:-translate-x-1">
          +
        </button>
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition hover:-translate-x-1">
          S
        </button>
        <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white transition hover:-translate-x-1">
          B
        </button>
      </aside>

      <section className="relative overflow-hidden pt-24 lg:pt-28">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,_rgba(255,191,0,0.14),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(56,151,212,0.14),_transparent_28%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-14 px-5 pb-20 pt-16 sm:px-8 lg:px-10 xl:ml-20 xl:pl-28">
          <div className="grid gap-12 lg:grid-cols-[1.7fr_1.3fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-amber-900">
                Established in ethereal logic
              </span>
              <h1 className="mt-8 text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
                The Aura Entrance
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Where structural precision meets human prosperity. We design spaces that don’t just stand—they breathe and inspire.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-amber-200/40 transition hover:bg-amber-300"
                >
                  Enter The Blueprint
                </a>
                <a
                  href="/tool"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:border-amber-300 hover:bg-amber-50"
                >
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-amber-200/30 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.12)]">
              <div className="absolute right-0 top-0 h-44 w-44 -translate-x-1/2 translate-y-1/4 rounded-full bg-amber-100/90 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
                <div className="h-72 rounded-3xl bg-[radial-gradient(circle_at_center,_rgba(255,209,77,0.35),_rgba(56,151,212,0.15),_rgba(15,23,42,0.95))]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 xl:ml-20 xl:pl-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
              Architectural Logic
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Our foundations are built on three core pillars that balance the ethereal with the structural.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            We combine generative systems with human-centered material intelligence to create spaces that feel both grounded and luminous.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Structural Integrity",
              description: "Every curve and line is calculated using generative AI to ensure maximum durability and material efficiency.",
              accent: "bg-amber-100 text-amber-900",
            },
            {
              title: "Atmospheric Flux",
              description: "We manipulate light and air to create sanctuaries that adapt to human circadian rhythms and seasonal shifts.",
              accent: "bg-sky-100 text-sky-900",
            },
            {
              title: "Human Prosperity",
              description: "Architecture is the stage for life. We design specifically to enhance well-being and social connectivity.",
              accent: "bg-emerald-100 text-emerald-900",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm shadow-slate-900/5 backdrop-blur-sm">
              <div className={`mb-4 inline-flex rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] ${item.accent}`}>
                {item.title}
              </div>
              <p className="text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10 xl:ml-20 xl:pl-28">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
              Curated Excellence
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Selected Works
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Explore the architecture of radiant intelligence.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="group overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-950/10 transition hover:-translate-y-1 hover:shadow-slate-950/20">
            <div className="h-[360px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(15,23,42,0.92))] p-6">
              <div className="flex h-full flex-col justify-end gap-4">
                <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200">
                  Residential
                </span>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">The Verdant Pavilion</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                    An expression of layered forestry and luminous structural matter.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            <article className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-950/10 transition hover:-translate-y-1 hover:shadow-slate-950/20">
              <div className="h-44 bg-[linear-gradient(180deg,_rgba(59,130,246,0.16),_rgba(15,23,42,0.95))] p-6">
                <span className="inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-sky-100">
                  Commercial
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">Nexus Hub</h3>
              </div>
            </article>
            <article className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 shadow-sm shadow-slate-900/5">
                <span className="inline-flex rounded-full bg-slate-900/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-700">
                  Cultural
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">Ether Museum</h3>
              </div>
              <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 shadow-sm shadow-slate-900/5">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-900">
                  Hospitality
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">Aura Retreat</h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,_rgba(255,255,240,0.9),_rgba(239,246,235,0.7))] py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8 lg:px-10">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Ready to Build?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            The blueprint of your vision is waiting to be realized. Let’s craft the atmosphere of your next breakthrough.
          </p>

          <div className="mx-auto mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <input
              type="text"
              placeholder="Your Architecture Vision..."
              className="w-full rounded-full border border-slate-200 bg-white px-5 py-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200"
            />
            <button className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-emerald-500 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-emerald-400/30 transition hover:bg-emerald-400">
              Submit Intent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
