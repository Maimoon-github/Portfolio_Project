"use client"

import { useMemo } from "react";
import DOMPurify from "dompurify";
import { cn } from "@/lib/utils";

interface RichTextRendererProps {
  html: string;
  className?: string;
}

export function RichTextRenderer({ html, className }: RichTextRendererProps) {
  const safeHtml = useMemo(() => {
    return DOMPurify.sanitize(html, {
      ADD_ATTR: ["target", "rel"],
      ALLOWED_TAGS: ["a", "p", "h1", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "blockquote", "code", "pre", "img"],
    });
  }, [html]);

  return (
    <div
      className={cn(
        "prose prose-invert max-w-none text-on-surface leading-relaxed",
        "prose-headings:font-semibold prose-headings:text-on-surface prose-headings:tracking-tight",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:bg-surface-container prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        className
      )}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}