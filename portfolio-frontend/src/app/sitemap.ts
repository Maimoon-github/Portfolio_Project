// src/app/sitemap.ts
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { url: "https://yourdomain.dev", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: "https://yourdomain.dev/about", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: "https://yourdomain.dev/portfolio", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: "https://yourdomain.dev/blog", lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: "https://yourdomain.dev/tools", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "https://yourdomain.dev/contact", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "https://yourdomain.dev/privacy", lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: "https://yourdomain.dev/terms", lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ]
  return routes
}