export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50/95 px-5 py-12 text-slate-700 dark:border-slate-800/70 dark:bg-slate-950/95 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1fr_0.9fr_0.9fr]">
        <div>
          <p className="text-base font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
            Maimoon Architect
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
            Crafting architectural intelligence through the precision of AI and the soul of human intuition.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-amber-600 dark:hover:text-amber-300">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-600 dark:hover:text-amber-300">
                  Blueprint
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-amber-600 dark:hover:text-amber-300">
                  Insights
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Resource
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/tools" className="hover:text-amber-600 dark:hover:text-amber-300">
                  Tools
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-amber-600 dark:hover:text-amber-300">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-amber-600 dark:hover:text-amber-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-slate-800/70 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Maimoon Architect. Crafted with Architectural Aura.</p>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Built for the future.
        </p>
      </div>
    </footer>
  );
}