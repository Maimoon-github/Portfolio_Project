import Link from "next/link";
import { getBlogPosts } from "@/lib/api/blog";
import { generatePageMetadata } from "@/lib/utils/seo";

export async function generateMetadata({ params }: { params: { category: string } }) {
  return generatePageMetadata({
    title: `Blog category: ${params.category}`,
    description: `Articles and guides about ${params.category}.`,
    slug: `blog/category/${params.category}`,
  });
}

export default async function BlogCategoryPage({ params }: { params: { category: string } }) {
  const posts = await getBlogPosts({ category: params.category, page_size: 12 });

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Category</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            {params.category}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Articles and insights that match the {params.category} category.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {posts.results.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/85">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">{post.category}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{post.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{post.subtitle}</p>
              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
                <span>{post.reading_time} min read</span>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-amber-600 hover:text-amber-500">
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

