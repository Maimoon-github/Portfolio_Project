// src/components/seo/StructuredData.tsx
'use client';

import { SITE_CONFIG, SOCIAL_LINKS } from '@/constants';

/**
 * Generates JSON-LD structured data for Person, Organization, and WebSite.
 * All data sourced from SITE_CONFIG and SOCIAL_LINKS constants.
 */
export function StructuredData(): JSX.Element {
  const sameAs = SOCIAL_LINKS
    .filter(link => link.platform !== 'email')
    .map(link => link.url);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: SITE_CONFIG.title,
    sameAs,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`, // Assumes /public/logo.png exists
    sameAs,
    email: SITE_CONFIG.email,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}