// src/components/layout/Footer.tsx
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/**
 * Footer.tsx — Site-wide footer
 * Sovereign Architect: deep surface, tonal separator, amber accents.
 * Includes newsletter signup (forwards to Django /newsletter/ later).
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-[rgba(84,68,52,0.08)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#ffc68b] to-[#ff9f1c] flex items-center justify-center">
                <Zap size={20} className="text-[#1a0e00]" />
              </div>
              <span className="font-semibold text-2xl tracking-[-0.02em] text-[#f0e6d3]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Alex Reeves
              </span>
            </div>
            <p className="text-[#f0e6d3]/70 max-w-md leading-relaxed">
              Senior AI/ML Engineer. Building production-grade intelligence systems with clarity and precision.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-10">
              {[
                { Icon: Github, href: "https://github.com", label: "GitHub" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: Linkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:hello@alexreeves.dev", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center hover:bg-[#ffc68b]/10 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} className="text-[#f0e6d3]/70 hover:text-[#ffc68b]" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="uppercase text-xs font-medium tracking-[0.1em] text-[#a28d7a] mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Portfolio</Link></li>
              <li><Link href="/blog" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Blog</Link></li>
              <li><Link href="/calculators" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Calculators</Link></li>
              <li><Link href="/contact" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="uppercase text-xs font-medium tracking-[0.1em] text-[#a28d7a] mb-6">Quick Tools</h4>
            <ul className="space-y-4">
              <li><Link href="/calculators/mortgage" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/calculators/compound-interest" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/bmi" className="text-[#f0e6d3]/80 hover:text-[#ffc68b] transition-colors">BMI Calculator</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="uppercase text-xs font-medium tracking-[0.1em] text-[#a28d7a] mb-6">Stay Updated</h4>
            <p className="text-[#f0e6d3]/70 text-sm mb-4">Monthly AI insights, new calculators, and project updates.</p>
            <form className="flex gap-2" action="/api/newsletter" method="POST">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-secondary flex-1"
                required
              />
              <Button type="submit" variant="primary">
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-10 border-t border-[rgba(84,68,52,0.08)] flex flex-col sm:flex-row items-center justify-between text-xs text-[#f0e6d3]/50">
          <p>© {currentYear} Alex Reeves. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Built with the <span className="text-[#ffc68b]">Sovereign Architect</span> system.</p>
        </div>
      </div>
    </footer>
  )
}