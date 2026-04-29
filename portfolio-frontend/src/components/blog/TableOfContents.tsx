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

interface TableOfContentsProps {
  headings: TocItem[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  const { observe } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "-100px 0px -50% 0px",
    onIntersect: (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id)
      })
    },
  })

  useEffect(() => {
    const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]
    elements.forEach((el) => observe(el))
    return () => elements.forEach((el) => el && observe(el, false))
  }, [headings, observe])

  return (
    <nav className="sticky top-24 hidden xl:block w-64 text-sm">
      <h4 className="font-medium text-muted-foreground mb-4 uppercase tracking-widest text-xs">On this page</h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 transition-colors hover:text-[#ffc68b]",
                activeId === heading.id ? "text-[#ffc68b] font-medium" : "text-muted-foreground"
              )}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}