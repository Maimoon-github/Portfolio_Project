import Link from "next/link";
import { getBlogPosts } from "@/lib/api/blog";
import { generatePageMetadata } from "@/lib/utils/seo";
import type { BlogPost } from "@/lib/api/types";

interface BlogPageProps {
  searchParams?: {
    q?: string;
    category?: string;
  };
}

export const metadata = generatePageMetadata({
  title: "Blog Insights",
  description: "Read technical stories, frontend tutorials, and practical tools guides crafted for modern product creators.",
  slug: "blog",
});

function excerpt(post: BlogPost) {
  const paragraph = post.body.find((block) => block.type === "paragraph");
  if (!paragraph) return "Deep technical insights and practical how-to guidance.";
  return paragraph.value.replace(/<[^>]+>/g, "").slice(0, 120) + "...";
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const search = searchParams?.q;
  const category = searchParams?.category;
  const data = await getBlogPosts({
    page_size: 12,
    search: search ?? undefined,
    category: category ?? undefined,
  });

  const categories = Array.from(new Set(data.results.map((post) => post.category))).slice(0, 6);

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Insights</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Thoughtful technical writing for product builders and design operators.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Browse articles, tools analysis, and interface-driven reasoning that help teams ship with confidence.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Search & filter</p>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Filter by category or search for the exact topic you need.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.7fr_0.3fr]">
          <div className="space-y-6">
            <form action="/blog" method="get" className="flex flex-col gap-4 sm:flex-row">
              <label className="sr-only" htmlFor="search">
                Search blog
              </label>
              <input
                id="search"
                name="q"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
              <button className="rounded-full bg-amber-400 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-amber-300">
                Search
              </button>
            </form>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {data.results.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/85"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-700 dark:text-amber-300">{post.category}</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{post.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{excerpt(post)}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
                    <span>{post.reading_time} min read</span>
                    <Link href={`/blog/${post.slug}`} className="font-semibold text-amber-600 hover:text-amber-500">
                      Read article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Topics</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {categories.map((categoryItem) => (
                  <Link
                    key={categoryItem}
                    href={`/blog/category/${encodeURIComponent(categoryItem)}`}
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:text-slate-300"
                  >
                    {categoryItem}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-slate-100">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Newsletter</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Subscribe for product design insights, tooling updates, and practical engineering briefs.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

