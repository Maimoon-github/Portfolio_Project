export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950 px-5 py-14 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.9fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
            Maimoon Architect
          </p>
          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
            Elevating the ethereal foundations of tomorrow’s intelligence. We merge the technical with the radiant.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-slate-500">Navigation</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/" className="transition hover:text-amber-300">Portfolio</a>
            </li>
            <li>
              <a href="/about" className="transition hover:text-amber-300">Blueprint</a>
            </li>
            <li>
              <a href="/blog" className="transition hover:text-amber-300">Insights</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-slate-500">Resource</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="/tools" className="transition hover:text-amber-300">Tools</a>
            </li>
            <li>
              <a href="/resume" className="transition hover:text-amber-300">Resume</a>
            </li>
            <li>
              <a href="/contact" className="transition hover:text-amber-300">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="transition hover:text-amber-300">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="transition hover:text-amber-300">Terms</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-slate-800/60 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Maimoon Architect. Crafted with Architectural Aura.</p>
        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Precision in Blueprint, Radiance in Life.</p>
      </div>
    </footer>
  );
}
