// src/components/layout/MobileMenu.tsx
// (Already 95% Sovereign-compliant — only minor polish applied)
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Briefcase, BookOpen, Wrench, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/tools", label: "Tools", icon: Wrench },
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
        className="fixed inset-0 z-50 bg-surface/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      
      {/* Glass Slide-over Panel */}
      <div className="glass fixed inset-y-0 right-0 z-[60] w-72 flex flex-col lg:hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-[rgba(84,68,52,0.15)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
              <span className="text-on-primary-fixed font-bold text-xl">AR</span>
            </div>
            <span className="font-semibold text-on-surface">Alex Reeves</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-on-surface"
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
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-base font-medium transition-all
                  ${isActive 
                    ? "bg-surface-container-high text-primary" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                  }`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="p-6 border-t border-[rgba(84,68,52,0.15)]">
          <Button asChild className="btn-primary w-full">
            <Link href="/contact" onClick={onClose}>
              Initiate Contact
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}