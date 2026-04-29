// src/components/blog/RichTextRenderer.tsx
"use client"

import { useMemo } from "react"
import DOMPurify from "dompurify"
import { cn } from "@/lib/utils"

interface RichTextRendererProps {
  html: string
  className?: string
}

export function RichTextRenderer({ html, className }: RichTextRendererProps) {
  const safeHtml = useMemo(() => {
    return DOMPurify.sanitize(html, {
      ADD_ATTR: ["target", "rel"],
      ALLOWED_TAGS: ["a", "p", "h1", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "blockquote", "code", "pre", "img"],
    })
  }, [html])

  return (
    <div
      className={cn("prose dark:prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  )
}