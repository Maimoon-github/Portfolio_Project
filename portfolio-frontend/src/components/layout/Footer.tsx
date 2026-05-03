// src/components/layout/Footer.tsx
// Minimal editorial footer — server component.

import Link from 'next/link';
import { cn } from '@/lib/utils';

const FOOTER_LINKS = [
  { href: '/portfolio', label: 'Work'      },
  { href: '/blog',      label: 'Blog'      },
  { href: '/tools',     label: 'Tools'     },
  { href: '/contact',   label: 'Contact'   },
] as const;

const METRICS = [
  { label: 'GitHub Stars', value: '1.2k+' },
  { label: 'Citations',    value: '450'  },
  { label: 'Deployments',  value: '24'   },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#131026] border-t border-[var(--color-outline-variant)]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 py-16">

        {/* Newsletter & Social Proof Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          
          {/* Newsletter */}
          <div className="max-w-md">
            <h3 className="type-label-caps text-[var(--color-neo-mint)] mb-6">Newsletter</h3>
            <p className="text-[var(--color-on-surface-variant)] text-[14px] mb-8">
              Receive infrequent dispatches on agentic systems and data science.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Email address" 
                className="input flex-grow"
                required
              />
              <button type="submit" className="btn btn-primary sm:w-auto">
                Join
              </button>
            </form>
          </div>

          {/* Social Proof Strip */}
          <div className="flex flex-col justify-center lg:items-end">
            <div className="flex gap-12 md:gap-16">
              {METRICS.map((metric) => (
                <div key={metric.label} className="text-left lg:text-right">
                  <span className="block text-[24px] font-medium text-[var(--color-on-surface)] tabular-nums mb-1">
                    {metric.value}
                  </span>
                  <span className="type-label-caps text-[var(--color-outline)] text-[10px]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--color-outline-variant)] mb-12" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand & Nav */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[var(--color-on-surface)] font-semibold text-[15px] tracking-[-0.01em]">
              Alex Reeves
            </p>
            <nav aria-label="Footer navigation" className="flex gap-6">
              {FOOTER_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="type-label-caps text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors duration-[120ms]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col md:items-end gap-2">
            <p className="type-label-caps text-[var(--color-outline)] text-[10px]">
              © {year} Alex Reeves — Sovereign Architect
            </p>
            <p className="type-label-caps text-[var(--color-outline)] text-[10px]">
              Mystical Black Lotus Design System
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}