// src/components/seo/StructuredData.tsx
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alex Kern',
    url: 'https://alexkern.dev',
    jobTitle: 'Data Scientist & AI Agent Architect',
    sameAs: ['https://github.com/alexk', 'https://linkedin.com/in/alexk'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}