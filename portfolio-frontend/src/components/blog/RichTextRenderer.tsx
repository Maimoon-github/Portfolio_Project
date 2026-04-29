// src/components/blog/RichTextRenderer.tsx
"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "dompurify"

/**
 * RichTextRenderer — sanitises & renders Wagtail StreamField/HTML safely.
 * 'use client' required for DOMPurify (browser-only).
 */
interface RichTextRendererProps {
  html: string
  className?: string
}

export function RichTextRenderer({ html, className = "" }: RichTextRendererProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && html) {
      ref.current.innerHTML = DOMPurify.sanitize(html, {
        ADD_ATTR: ["target"],
      })
    }
  }, [html])

  return (
    <div
      ref={ref}
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:font-medium prose-headings:tracking-[-0.02em]",
        "prose-a:text-[#ffc68b] prose-a:no-underline hover:prose-a:underline",
        className
      )}
    />
  )
}