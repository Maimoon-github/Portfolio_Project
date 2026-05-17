'use client';

import Link from "next/link";
import { Github, Linkedin, Twitter, Terminal, ArrowUpRight, ChevronUp } from "lucide-react";
import { PROFILE } from "@/app/data";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto relative overflow-hidden bg-black border-t border-glass-border">
      <div className="relative max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center glass">
                <Terminal size={14} className="text-accent" />
              </div>
              <span className="text-sm font-mono text-accent">{PROFILE.name}</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-sm text-outline">{PROFILE.tagline}</p>
            <div className="flex items-center gap-3">
              {[
                { href: PROFILE.github, icon: <Github size={16} />, label: "GitHub" },
                { href: PROFILE.linkedin, icon: <Linkedin size={16} />, label: "LinkedIn" },
                { href: PROFILE.twitter, icon: <Twitter size={16} />, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-glass-border text-outline hover:text-accent hover:border-glass-border-hover transition-all hover:-translate-y-0.5"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow-label mb-5">Navigate</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Projects", path: "/projects" },
                { label: "Courses", path: "/courses" },
                { label: "Blog", path: "/blog" },
                { label: "Knowledge Base", path: "/knowledge" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm text-outline hover:text-on-background transition-all hover:pl-1">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow-label mb-5">Get in Touch</h4>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-sm flex items-center gap-1 mb-5 text-outline hover:text-accent transition-colors"
            >
              {PROFILE.email}
              <ArrowUpRight size={12} />
            </a>
            <Link href="/contact" className="glass-btn inline-block text-xs px-4 py-2.5 rounded-lg border border-glass-border text-accent hover:bg-accent/10 transition-all">
              Send a Message →
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 border-t border-glass-border">
          <p className="text-xs text-outline font-mono">
            © {year} {PROFILE.name}. Built with React + TypeScript.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center glass text-outline hover:text-accent transition-all hover:-translate-y-0.5"
              aria-label="Scroll to top"
            >
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}