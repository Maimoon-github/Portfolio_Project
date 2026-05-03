// src/components/layout/Footer.tsx
// Minimal editorial footer — server component.

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Github, Linkedin } from '@/components/ui/Icons';

const NAV_LINKS = [
  { href: '/newsletter', label: 'Newsletter'    },
  { href: '/status',     label: 'System Status' },
  { href: '/github',     label: 'GitHub'        },
  { href: '/linkedin',   label: 'LinkedIn'      },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[#0a0a0a] border-t border-[var(--color-outline-variant)]/30 py-24"
    >
      <div className="w-full max-w-[1280px] mx-auto px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* Brand & Social Metrics */}
          <div className="md:col-span-1">
            <h3 className="text-[20px] font-bold text-[var(--color-on-surface)] mb-6">Aether.AI</h3>
            <p className="text-[14px] leading-relaxed text-[var(--color-on-surface-variant)] opacity-70 mb-8">
              Precision Meets the Void.<br />
              Architecting the next generation of ambient intelligence.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[12px] text-[var(--color-on-surface-variant)] opacity-60">
                <Github size={14} />
                <span>4.5k Stars</span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-[var(--color-on-surface-variant)] opacity-60">
                <Linkedin size={14} />
                <span>124 Endorsements</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h4 className="text-[12px] font-semibold tracking-wider text-[var(--color-primary)] uppercase mb-8 opacity-80">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Join the Collective */}
          <div className="md:col-span-2">
            <h4 className="text-[12px] font-semibold tracking-wider text-[var(--color-primary)] uppercase mb-8 opacity-80">
              Join the Collective
            </h4>
            <p className="text-[14px] text-[var(--color-on-surface-variant)] opacity-70 mb-8">
              Subscribe to my monthly dispatch on neural architectures and the future of autonomous systems.
            </p>
            <form className="flex gap-4">
              <input 
                type="email" 
                placeholder="void@exploretio" 
                className={cn(
                  "flex-grow bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30",
                  "rounded-lg px-6 py-4 text-[14px] text-[var(--color-on-surface)] outline-none focus:border-[var(--color-primary)]/50"
                )}
              />
              <button 
                type="submit" 
                className="bg-[var(--color-primary)] text-[#0a0a0a] font-bold text-[11px] tracking-widest uppercase px-10 rounded-lg hover:opacity-90 transition-opacity"
              >
                SIGNUP
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-[var(--color-outline-variant)]/20">
          <p className="text-[12px] text-[var(--color-on-surface-variant)] opacity-50">
            © {year} Aether.AI — Precision Meets the Void
          </p>
          <div className="flex gap-8 text-[12px] text-[var(--color-on-surface-variant)] opacity-50">
            <Link href="/privacy" className="hover:text-[var(--color-on-surface)]">Privacy</Link>
            <Link href="/cookies" className="hover:text-[var(--color-on-surface)]">Cookies</Link>
            <Link href="/terms" className="hover:text-[var(--color-on-surface)]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
