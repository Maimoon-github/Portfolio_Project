'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal } from "lucide-react";
import { PROFILE } from "@/app/data";

const NAV_LINKS = [
  { label: "Projects", path: "/projects" },
  { label: "Blog", path: "/blog" },
  { label: "Courses", path: "/courses" },
  { label: "Knowledge", path: "/knowledge" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header transition-all duration-350 ${
        scrolled ? 'bg-surface-container-lowest/80 backdrop-blur-lg border-b border-glass-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent/10 border border-accent/30">
            <Terminal size={16} className="text-accent" />
          </div>
          <span className="text-sm tracking-wider font-mono">
            <span className="text-accent group-hover:opacity-80 transition-opacity">{PROFILE.initials}</span>
            <span className="text-outline">://</span>
            <span className="text-on-background">portfolio</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm relative py-1 ${
                isActive(link.path)
                  ? 'text-accent font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                  : 'text-outline font-normal hover:text-accent transition-colors'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg transition-colors text-accent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 bg-surface-container-lowest border-t border-glass-border">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm py-3 px-3 rounded-lg ${
                  isActive(link.path)
                    ? 'text-accent font-semibold bg-accent/10 border-l-2 border-accent'
                    : 'text-outline font-normal hover:text-accent transition-colors'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}