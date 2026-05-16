// src/components/seo/PersonSchema.tsx
// Server Component — Schema.org Person (Home + About pages)
import { JsonLd } from "@/components/layout/JsonLd"

interface PersonSchemaProps {
  name?: string
  jobTitle?: string
  url?: string
  image?: string
  sameAs?: string[]
}

export function PersonSchema({
  name = "Alex Reeves",
  jobTitle = "Senior AI/ML Engineer",
  url = "https://yourdomain.dev",
  image = "/images/avatar.jpg",
  sameAs = [
    "https://github.com/yourhandle",
    "https://linkedin.com/in/yourhandle",
    "https://x.com/yourhandle",
  ],
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url,
    image,
    sameAs,
    description: "Sovereign Architect of production-grade intelligence systems at scale.",
  }

  return <JsonLd schema={schema} />
}