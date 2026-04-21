import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPost, fetchPosts } from "@/lib/api/blog";  // ← added fetchPosts
import PostHeader from "@/components/blog/PostHeader";
import RichTextRenderer from "@/components/blog/RichTextRenderer";
import TableOfContents from "@/components/blog/TableOfContents";

export const revalidate = 600;

export async function generateStaticParams() {
  // Pre-render all published posts at build time
  const posts = await fetchPosts({ limit: 100 });
  return posts.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPost(params.slug);
  if (!post) return {};
  return {
    title: post.seo_title || post.title,
    description: post.search_description,
    openGraph: {
      title: post.title,
      description: post.search_description,
      // Explicit string coercion fixes "string | undefined" → "string | URL" error
      images: [{ url: String(post.og_image_url || post.hero_image_url || "") }],
      type: "article",
      publishedTime: post.first_published_at,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      <PostHeader post={post} />
      <TableOfContents content={post.body} />
      <RichTextRenderer content={post.body} />
    </article>
  );
}