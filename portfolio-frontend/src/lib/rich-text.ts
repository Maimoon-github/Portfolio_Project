// src/lib/rich-text.ts
// DOMPurify wrapper that safely renders Wagtail HTML rich text server-side
import DOMPurify from "dompurify"

export function safeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ["target"],
    ALLOWED_TAGS: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "strong", "em", "blockquote", "code", "pre"],
  })
}