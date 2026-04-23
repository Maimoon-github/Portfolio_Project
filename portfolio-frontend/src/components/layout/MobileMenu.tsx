// src/components/layout/MobileMenu.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Briefcase, BookOpen, Calculator, Wrench, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * MobileMenu — Client Component
 * Sheet-based slide-over navigation (Tailwind + fixed overlay).
 * Sovereign Architect glassmorphism + amber accents.
 */
const navLinks = [
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/calculators", label: "Calculators", icon: Calculator },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      
      {/* Slide-over panel */}
      <div
        className="fixed inset-y-0 right-0 z-[60] w-72 bg-[rgba(28,27,27,0.95)] backdrop-blur-[20px] border-l border-[rgba(84,68,52,0.15)] shadow-[0_0_80px_rgba(240,230,211,0.06)] flex flex-col lg:hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-[rgba(84,68,52,0.15)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ffc68b] to-[#ff9f1c] flex items-center justify-center">
              <span className="text-[#1a0e00] font-bold text-xl">AR</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[#f0e6d3]"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 px-6 py-8 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl text-base font-medium transition-all
                  ${isActive 
                    ? "bg-accent text-[#ffc68b]" 
                    : "text-[#f0e6d3]/80 hover:bg-accent hover:text-[#ffc68b]"
                  }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="p-6 border-t border-[rgba(84,68,52,0.15)]">
          <Button asChild className="w-full" size="lg">
            <Link href="/contact" onClick={onClose}>
              Get in Touch
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}