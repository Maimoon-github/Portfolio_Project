// src/components/layout/JsonLd.tsx
// Server component — injects a JSON-LD <script> block for structured data.
// Usage: <JsonLd schema={{ "@context": "https://schema.org", ... }} />

interface JsonLdProps {
  schema: Record<string, unknown>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}