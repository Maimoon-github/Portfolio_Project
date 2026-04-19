import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPost } from "@/lib/api/blog";
import { StreamField } from "@/components/blog/StreamField";
import { generatePageMetadata } from "@/lib/utils/seo";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);
  if (!post) {
    return { title: "Article not found" };
  }

  return generatePageMetadata({
    title: `${post.title} | Blog`,
    description: post.subtitle || "Technical insight and practical guidance.",
    slug: `blog/${post.slug}`,
    type: "article",
    publishedAt: post.meta.first_published_at ?? undefined,
    modifiedAt: post.meta.first_published_at ?? undefined,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);
  if (!post) {
    return notFound();
  }

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={4} className="-top-40 -right-20" parallax />
      <GlowOrb color="primary" size={500} opacity={5} className="bottom-0 -left-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-4xl space-y-12">
        <div className="pt-4 pb-4">
          <Link href="/blog" className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold hover:text-[color:var(--primary)] transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Back to Insights
          </Link>
        </div>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Chip>{post.category}</Chip>
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">
              {post.reading_time} min read
            </span>
          </div>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            {post.title}
          </h1>
          <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-[color:var(--on_surface)]/80">
            {post.subtitle}
          </p>
        </section>

        {post.hero_image_thumbnail ? (
          <Card surface="variant" className="w-full aspect-[21/9] overflow-hidden border border-[color:var(--outline)]/10">
            <img
              src={post.hero_image_thumbnail.url}
              alt={post.hero_image_thumbnail.title}
              className="w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
          </Card>
        ) : null}

        <article className="prose prose-invert max-w-none mt-16 prose-p:text-[color:var(--on_surface)]/80 prose-headings:text-[color:var(--on_surface)] prose-a:text-[color:var(--primary)] prose-strong:text-[color:var(--on_surface)] prose-code:text-[color:var(--secondary)]">
          <StreamField blocks={post.body} />
        </article>
      </div>
    </main>
  );
}
