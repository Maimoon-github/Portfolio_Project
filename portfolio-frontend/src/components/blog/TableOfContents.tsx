// src/components/blog/TableOfContents.tsx
"use client"

import { useEffect, useState } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -40% 0px" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 space-y-2 text-sm">
      <p className="font-medium text-muted-foreground mb-3">On this page</p>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "transition-colors",
              activeId === heading.id ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <a href={`#${heading.id}`} className="block py-1">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}