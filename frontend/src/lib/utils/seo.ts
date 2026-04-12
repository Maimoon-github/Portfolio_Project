import type { Metadata } from "next";

interface GenerateMetadataOptions {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  modifiedAt?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com";
const defaultOgImage = `${siteUrl}/images/og-default.jpg`;

export function generatePageMetadata(opts: GenerateMetadataOptions): Metadata {
  const {
    title,
    description,
    slug,
    ogImage = defaultOgImage,
    noIndex = false,
    type = "website",
    publishedAt,
    modifiedAt,
  } = opts;

  const url = slug ? `${siteUrl}/${slug}` : siteUrl;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/** JSON-LD helpers */
export function articleJsonLd(post: {
  title: string;
  description: string;
  publishedAt: string;
  modifiedAt: string;
  slug: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt,
    url: `${siteUrl}/blog/${post.slug}`,
    author: { "@type": "Person", name: post.authorName },
    publisher: {
      "@type": "Organization",
      name: "Portfolio",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icons/logo.svg` },
    },
  };
}

export function toolJsonLd(tool: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    url: `${siteUrl}/tools/${tool.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    operatingSystem: "Web browser",
  };
}
