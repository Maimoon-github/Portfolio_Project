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
    "https://github.com",
    "https://twitter.com",
    "https://linkedin.com/in/",
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
    description: "Senior AI/ML Engineer building production-grade intelligence systems.",
  }

  return <JsonLd schema={schema} />
}