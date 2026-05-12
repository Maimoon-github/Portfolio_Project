// src/components/sections/Footer.tsx
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/20 px-gutter py-12 mt-section-gap">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-on-background/60 hover:text-primary-light transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-on-background/40">
          © {new Date().getFullYear()} Alex Kern. All rights reserved.
        </p>
      </div>
    </footer>
  );
}