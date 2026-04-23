// src/components/layout/Header.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, Zap } from "lucide-react"
import { MobileMenu } from "./MobileMenu"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"

/**
 * Header.tsx — Top nav (responsive)
 * Sovereign Architect: glassmorphism navbar, amber logo, Space Grotesk.
 * Mostly client for mobile toggle + scroll effect (architecture allows).
 */
const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/calculators", label: "Calculators" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(19,19,19,0.95)" : "rgba(19,19,19,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(84,68,52,0.15)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#ffc68b] to-[#ff9f1c]"
              >
                <Zap size={18} className="text-[#1a0e00]" />
              </div>
              <span
                className="font-semibold text-2xl tracking-[-0.02em] text-[#f0e6d3]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Alex Reeves
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-[#ffc68b]"
                      : "text-[#f0e6d3]/80 hover:text-[#ffc68b]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <Button asChild className="hidden md:flex">
                <Link href="/contact">Get in Touch</Link>
              </Button>

              {/* Mobile trigger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-[#f0e6d3] hover:bg-accent rounded-xl"
                aria-label="Toggle mobile menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}