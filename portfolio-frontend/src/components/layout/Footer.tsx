// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-header mt-auto border-t border-outline-variant/20">
      <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-mono text-lg font-bold tracking-tight text-primary hover:text-accent transition-colors"
            >
              &lt;AK /&gt;
            </Link>
            <p className="text-sm text-on-background/60 mt-1">
              Data Scientist & AI Agent Architect
            </p>
          </div>

          {/* Social Links */}
          <ul className="flex gap-6" role="list">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label || link.platform}
                  className="text-on-background/60 hover:text-primary transition-colors text-sm uppercase tracking-wider"
                >
                  {link.label || link.platform}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-on-background/40">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}