// src/components/layout/Footer.tsx
// Minimal editorial footer — server component.

import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about',     label: 'About'     },
  { href: '/tools',     label: 'Tools'     },
  { href: '/blog',      label: 'Blog'      },
  { href: '/contact',   label: 'Contact'   },
] as const;

const SOCIAL_LINKS = [
  { href: 'https://github.com',   label: 'GitHub'   },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
  { href: 'https://twitter.com',  label: 'Twitter'  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">

          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-[var(--color-on-surface)] font-semibold text-[15px] tracking-[-0.01em] mb-3">
              Alex Reeves
            </p>
            <p
              className="text-[var(--color-on-surface-variant)] text-[14px] leading-relaxed"
            >
              Sovereign Architect of production-grade intelligence systems.
              Crafting interfaces where precision meets soul.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="type-label-caps text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors duration-[120ms]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="type-label-caps text-[var(--color-outline)]">Connect</span>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label-caps text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-[120ms]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--color-outline-variant)] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="type-label-caps text-[var(--color-outline)]">
            © {year} Alex Reeves — All rights reserved
          </p>
          <p className="type-label-caps text-[var(--color-outline)]">
            Mystical Black Lotus Design System
          </p>
        </div>
      </div>
    </footer>
  );
}