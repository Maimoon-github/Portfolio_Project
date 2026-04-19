export function Footer() {
  return (
    <footer className="border-t border-[color:var(--outline)]/10 bg-[color:var(--surface)] px-5 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.3fr_0.9fr_0.9fr]">
        <div className="space-y-6">
          <p className="font-medium tracking-[0.1em] text-[color:var(--on_surface)]">
            The Sovereign Architect
          </p>
          <p className="max-w-md text-sm leading-relaxed text-[color:var(--on_surface)]/60">
            Designing intelligent systems that scale. We bridge complex AI orchestration with radiant, human-centered architectural logic.
          </p>
        </div>

        <div>
          <p className="mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--secondary)]">Ecosystem</p>
          <ul className="space-y-4">
            <li>
              <a href="/portfolio" className="text-sm text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)]">Work & Case Studies</a>
            </li>
            <li>
              <a href="/about" className="text-sm text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)]">Architectural Blueprint</a>
            </li>
            <li>
              <a href="/blog" className="text-sm text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)]">Engineering Insights</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--secondary)]">Protocol</p>
          <ul className="space-y-4">
            <li>
              <a href="/tools" className="text-sm text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)]">Hybrid Tools</a>
            </li>
            <li>
              <a href="/resume" className="text-sm text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)]">CV / Resume</a>
            </li>
            <li>
              <a href="/contact" className="text-sm text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)]">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="text-sm text-[color:var(--on_surface)]/50 transition-colors hover:text-[color:var(--primary)]">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-16 flex flex-col gap-4 border-t border-[color:var(--outline)]/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--on_surface)]/40">© {new Date().getFullYear()} The Sovereign Architect. All rights reserved.</p>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[color:var(--primary)]/50">Precision • Balance • Ascension</p>
      </div>
    </footer>
  );
}
