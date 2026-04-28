//  Generates /sitemap.xml — fetches dynamic slugs (blog posts, portfolio projects, tools) from API

// src/app/sitemap.ts
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { url: "https://yourdomain.dev", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: "https://yourdomain.dev/about", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: "https://yourdomain.dev/projects", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://yourdomain.dev/blog", lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: "https://yourdomain.dev/calculators", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ]
  return routes
}