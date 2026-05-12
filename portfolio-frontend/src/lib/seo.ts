// src/lib/seo.ts
export interface PersonSchema {
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  image?: string;
  description?: string;
}

export interface ArticleSchema {
  headline: string;
  datePublished: string;
  dateModified?: string;
  author: PersonSchema;
  image?: string;
  description?: string;
  url: string;
}

/**
 * Generates JSON-LD structured data for a Person (e.g., homepage).
 * @returns <script> tag content as string for Next.js Script component.
 */
export function generatePersonSchema(person: PersonSchema): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.jobTitle,
    url: person.url,
    sameAs: person.sameAs,
    image: person.image,
    description: person.description,
  };
  return JSON.stringify(schema);
}

/**
 * Generates JSON-LD for an Article (for blog/project pages).
 */
export function generateArticleSchema(article: ArticleSchema): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: article.author.url,
    },
    image: article.image,
    description: article.description,
    url: article.url,
  };
  return JSON.stringify(schema);
}

/**
 * Optional: generate BreadcrumbList schema for navigation.
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
  return JSON.stringify(schema);
}