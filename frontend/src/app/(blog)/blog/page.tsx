import Link from "next/link";
import { getBlogPosts } from "@/lib/api/blog";
import { generatePageMetadata } from "@/lib/utils/seo";
import type { BlogPost } from "@/lib/api/types";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

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

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params?.q;
  const category = params?.category;
  
  const data = await getBlogPosts({
    page_size: 12,
    search: search ?? undefined,
    category: category ?? undefined,
  });

  const categories = Array.from(new Set(data.results.map((post) => post.category))).slice(0, 6);

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl space-y-20">
        <header className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold mb-4">Insights</p>
            <h1 className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]">
              Thoughtful technical writing for product builders and design operators.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
              Browse articles, tools analysis, and interface-driven reasoning that help teams ship with confidence.
            </p>
          </div>
          <Card surface="low" className="p-8">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Search & Filter</p>
            <p className="text-base leading-relaxed text-[color:var(--on_surface)]/80">
              Filter by category or search for the exact architectural topic you need.
            </p>
          </Card>
        </header>

        <section className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <form action="/blog" method="get" className="flex flex-col gap-4 sm:flex-row">
              <label className="sr-only" htmlFor="search">Search blog</label>
              <input
                id="search"
                name="q"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full rounded-[1.25rem] border border-[color:var(--outline)]/20 bg-[color:var(--surface_container)] px-6 py-4 text-[color:var(--on_surface)] outline-none transition-all focus:border-[color:var(--primary)] focus:bg-[color:var(--surface_container_low)] placeholder-[color:var(--on_surface)]/30"
              />
              <Button size="lg" className="sm:px-10">Search</Button>
            </form>

            <div className="grid gap-6 md:grid-cols-2">
              {data.results.map((post) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group block h-full flex flex-col"
                >
                  <Card surface="low" className="h-full border border-[color:var(--outline)]/5 hover:border-[color:var(--outline)]/20 transition-all duration-500 hover:-translate-y-2 hover:bg-[color:var(--surface_container_highest)] flex flex-col p-8">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[color:var(--secondary)] mb-4">{post.category}</p>
                    <h2 className="text-xl font-medium tracking-tight text-[color:var(--on_surface)] mb-4 group-hover:text-[color:var(--primary)] transition-colors">{post.title}</h2>
                    <p className="text-[color:var(--on_surface)]/70 leading-relaxed mb-8 flex-grow">{excerpt(post)}</p>
                    <div className="flex items-center justify-between text-sm mt-auto border-t border-[color:var(--outline)]/10 pt-4">
                      <span className="text-[color:var(--secondary)]">{post.reading_time} min read</span>
                      <span className="text-[color:var(--primary)] font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-8">
            <Card surface="variant" className="p-8 border border-[color:var(--outline)]/10">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-6">Topics</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((categoryItem) => (
                  <Link
                    key={categoryItem}
                    href={`/blog/category/${encodeURIComponent(categoryItem)}`}
                  >
                    <Chip className="hover:bg-[color:var(--surface_container_highest)] hover:text-[color:var(--primary)] cursor-pointer transition-colors">
                      {categoryItem}
                    </Chip>
                  </Link>
                ))}
              </div>
            </Card>

            <Card surface="variant" className="p-8 border border-[color:var(--outline)]/10">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Signal</p>
              <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/80">
                Subscribe for product design insights, tooling architectures, and practical engineering briefs.
              </p>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
