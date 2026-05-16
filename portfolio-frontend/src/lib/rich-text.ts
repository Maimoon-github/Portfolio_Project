// src/lib/rich-text.ts
// DOMPurify wrapper that safely renders Wagtail StreamField HTML server-side
import DOMPurify from "dompurify"

export function safeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target", "rel"],
    ALLOWED_TAGS: ["a", "p", "h1", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "blockquote", "code", "pre", "img"],
  })
}