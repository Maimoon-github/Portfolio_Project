import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPost } from "@/lib/api/blog";
import { StreamField } from "@/components/blog/StreamField";
import { generatePageMetadata } from "@/lib/utils/seo";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    return notFound();
  }

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-900">
              {post.category}
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              {post.reading_time} min read
            </span>
          </div>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{post.subtitle}</p>
        </section>

        {post.hero_image_thumbnail ? (
          <img
            src={post.hero_image_thumbnail.url}
            alt={post.hero_image_thumbnail.title}
            className="rounded-[2rem] border border-slate-200/70 bg-slate-100 object-cover shadow-lg dark:border-slate-800"
          />
        ) : null}

        <article className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <StreamField blocks={post.body} />
        </article>
      </div>
    </main>
  );
}

