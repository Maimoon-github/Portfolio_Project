// src/app/robots.ts
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cms/", "/api/"],
    },
    sitemap: "https://yourdomain.dev/sitemap.xml",
  }
}