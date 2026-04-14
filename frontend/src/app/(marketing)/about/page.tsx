export default function AboutPage() {
  return (
    <main className="bg-background px-5 pb-16 pt-14 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">
              Governance & Integrity
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Legal & Ethics
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Transparency is the foundation of every structure we build. Our legal framework ensures that your data remains secure and our ethical standards guide every architectural decision.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Compliance Note</p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">
              Maimoon Architect operates under strict adherence to global architectural and data privacy standards including GDPR and local zoning ethics.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.75fr_1fr]">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Privacy Policy</p>
            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
              We collect information to provide better services to all our clients. This includes technical data related to architectural projects, communication history, and usage patterns of our digital tools.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li>• Identity Data: Name, company, and professional credentials.</li>
              <li>• Technical Metadata: IP addresses and browser configurations.</li>
              <li>• Project Specifics: CAD files, site coordinates, and survey uploads.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Intellectual Property</p>
            <p className="mt-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
              All blueprints, conceptual renders, and proprietary algorithms hosted on this platform are the exclusive intellectual property of Maimoon Architect.
            </p>
            <p className="mt-4 rounded-3xl border border-amber-200/70 bg-amber-50/80 p-4 text-sm text-amber-900 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-200">
              Clients are granted a limited, non-exclusive license to use project deliverables as outlined in their service agreements.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-700/80 dark:bg-slate-950/80">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Regulatory Standards</p>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              We comply with the American Institute of Architects (AIA) Code of Ethics and local building codes in all jurisdictions where our designs are implemented.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200/80 bg-slate-50/80 p-6 dark:border-slate-700/80 dark:bg-slate-950/80">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Dispute Resolution</p>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              Any conflicts arising from these terms shall be governed by the laws of the jurisdiction where our primary studio is registered, favoring mediation before arbitration.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-slate-950 p-12 text-white shadow-2xl shadow-slate-950/10 dark:border-slate-800/70">
          <p className="text-xl font-semibold">“Architecture should speak of its time and place, but yearn for timelessness.”</p>
        </section>
      </div>
    </main>
  );
}
