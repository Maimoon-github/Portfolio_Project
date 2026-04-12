import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/api/blog";
import { getAllToolSlugs } from "@/lib/api/tools";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, toolSlugs] = await Promise.all([
    getAllBlogSlugs(),
    getAllToolSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map(({ category, slug }) => ({
    url: `${siteUrl}/tools/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...blogPages, ...toolPages];
}
