// src/components/layout/JsonLd.tsx
/**
 * JsonLd — Server Component
 * Injects arbitrary JSON-LD structured data via <script type="application/ld+json">.
 * Used on every page that has schema.org markup (Home, About, Blog posts, Calculators).
 * Never add 'use client' — must remain a Server Component to render in <head>.
 */
interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data is server-controlled
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}