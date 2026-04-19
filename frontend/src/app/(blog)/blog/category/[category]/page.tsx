import Link from "next/link";
import { getBlogPosts } from "@/lib/api/blog";
import { generatePageMetadata } from "@/lib/utils/seo";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  return generatePageMetadata({
    title: `Blog category: ${resolvedParams.category}`,
    description: `Articles and guides about ${resolvedParams.category}.`,
    slug: `blog/category/${resolvedParams.category}`,
  });
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const posts = await getBlogPosts({ category: decodedCategory, page_size: 12 });

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl space-y-20">
        <div className="pt-4 pb-4">
          <Link href="/blog" className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold hover:text-[color:var(--primary)] transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Back to Insights
          </Link>
        </div>

        <section className="space-y-6">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">Category Archive</p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            {decodedCategory}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
            Explorations, architectures, and strategies focused on {decodedCategory}.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.results.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group block h-full flex flex-col"
            >
              <Card surface="low" className="h-full border border-[color:var(--outline)]/5 hover:border-[color:var(--outline)]/20 transition-all duration-500 hover:-translate-y-2 hover:bg-[color:var(--surface_container_highest)] flex flex-col p-8">
                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[color:var(--secondary)] mb-4">{post.category}</p>
                <h2 className="text-xl font-medium tracking-tight text-[color:var(--on_surface)] mb-4 group-hover:text-[color:var(--primary)] transition-colors">{post.title}</h2>
                <p className="text-[color:var(--on_surface)]/70 leading-relaxed mb-8 flex-grow">{post.subtitle}</p>
                <div className="flex items-center justify-between text-sm mt-auto border-t border-[color:var(--outline)]/10 pt-4">
                  <span className="text-[color:var(--secondary)]">{post.reading_time} min read</span>
                  <span className="text-[color:var(--primary)] font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
