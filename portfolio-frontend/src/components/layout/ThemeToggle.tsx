// src/components/layout/ThemeToggle.tsx
"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

/**
 * ThemeToggle — Client Component
 * Uses next-themes hook for proper SSR compatibility with Providers.tsx.
 * Sovereign Architect styling (amber glow on hover).
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 hover:bg-[rgba(255,198,139,0.1)] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-[#f0e6d3]" />
      ) : (
        <Moon className="h-5 w-5 text-[#f0e6d3]" />
      )}
    </Button>
  )
}