// src/app/blog/[slug]/page.tsx
// [ISR:600] Post detail: Article schema, OG image, rich text body, ToC, prev/next, comments
import { notFound } from "next/navigation"
import { PostHeader } from "@/components/blog/PostHeader"
import { RichTextRenderer } from "@/components/blog/RichTextRenderer"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { PrevNextPost } from "@/components/blog/PrevNextPost"
import { CommentSection } from "@/components/blog/CommentSection"
import { JsonLd } from "@/components/layout/JsonLd"

export const revalidate = 600

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Placeholder — real API in Phase 1
  const post = {
    slug: params.slug,
    title: "Building Production RAG Systems",
    subtitle: "Lessons from scaling LLM retrieval pipelines",
    publishedAt: "2025-04-01",
    readingTime: 12,
    category: { name: "AI/ML" },
    body: "<h2>Introduction</h2><p>Real rich text from Wagtail in Phase 1.</p>",
    heroImage: "/images/blog/hero.jpg",
  }

  if (!post) notFound()

  const headings = [{ id: "intro", text: "Introduction", level: 2 }]

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: "Alex Reeves" },
  }

  return (
    <>
      <JsonLd schema={articleSchema} />
      <PostHeader {...post} />
      <div className="max-w-3xl mx-auto px-6">
        <TableOfContents headings={headings} />
        <RichTextRenderer html={post.body} className="prose prose-invert" />
        <PrevNextPost />
        <CommentSection postSlug={params.slug} />
      </div>
    </>
  )
}