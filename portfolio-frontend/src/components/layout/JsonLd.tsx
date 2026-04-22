export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Alex Reeves",
        jobTitle: "Senior AI/ML Engineer",
        description: "Building production-grade intelligence systems. Open to consulting and ambitious projects.",
        url: "https://alexreeves.dev",
        sameAs: ["https://github.com", "https://twitter.com", "https://linkedin.com"],
      },
      {
        "@type": "WebSite",
        name: "Alex Reeves • Sovereign Architect",
        url: "https://alexreeves.dev",
        description: "Portfolio • Blog • Calculators • Services",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://alexreeves.dev/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}