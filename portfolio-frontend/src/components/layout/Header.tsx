// src/components/layout/Header.tsx
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./MobileMenu"
import { ThemeToggle } from "./ThemeToggle"

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-[rgba(84,68,52,0.15)]">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo — Monolithic AR */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-inner">
                <span className="text-on-primary-fixed font-bold text-2xl leading-none tracking-tighter">AR</span>
              </div>
              <span className="headline-lg text-on-surface tracking-tighter hidden sm:block">Alex Reeves</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`label-md transition-colors hover:text-primary ${
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Mobile Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-on-surface"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}