import { MetadataRoute } from 'next';
import { portfolioData } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alexkern.dev';
  
  // Static routes
  const routes = ['', '/about', '/expertise', '/projects', '/journey', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (like blog posts or specific projects) could be added here
  
  return [...routes];
}
