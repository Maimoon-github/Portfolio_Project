import Link from "next/link";
import { notFound } from "next/navigation";
import { StreamField } from "@/components/blog/StreamField";
import { ToolCalculator } from "@/components/tools/ToolCalculator";
import { getAllToolSlugs, getTool, getTools } from "@/lib/api/tools";
import { generatePageMetadata } from "@/lib/utils/seo";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";

export async function generateStaticParams() {
  const slugs = await getAllToolSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = await getTool(resolvedParams.slug);

  if (!tool) {
    return { title: "Tool not found" };
  }

  return generatePageMetadata({
    title: `${tool.title} | Tools`,
    description: `Interactive tool guide for ${tool.title}. Explore the calculator, use cases, and practical implementation advice.`,
    slug: `tools/${tool.slug}`,
    type: "article",
  });
}

function excerptFromTool(tool: { body: { type: string; value: any }[] }) {
  const paragraph = tool.body.find((block) => block.type === "paragraph");
  if (!paragraph) return "Interactive calculator and expert insight for your next project.";
  return paragraph.value.replace(/<[^>]+>/g, "").slice(0, 140) + "...";
}

export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = await getTool(resolvedParams.slug);
  if (!tool) {
    return notFound();
  }

  const related = (await getTools({ category: tool.category, page_size: 4 }))
    .results.filter((item) => item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-40" parallax />
      <GlowOrb color="primary" size={500} opacity={6} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto xl:max-w-[1400px] space-y-12">
        <div className="pt-4 pb-4">
          <Link href="/tools" className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold hover:text-[color:var(--primary)] transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Back to Tools Directory
          </Link>
        </div>

        <section className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <Chip>{tool.category}</Chip>
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">
              Hybrid Tool
            </span>
          </div>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            {tool.title}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-[color:var(--on_surface)]/80">
            Discover the practical workflow, examples, and implementation guidance behind this interactive model.
          </p>
        </section>

        <section className="grid gap-12 xl:grid-cols-[1fr_500px]">
          <div className="space-y-12">
            <Card surface="low" className="p-8 md:p-12">
              <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)] mb-6">Workflow Context</h2>
              <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/70">
                This hybrid tool pairs a live calculator with a focused content experience designed to help you make better decisions, faster.
              </p>
              
              <div className="mt-8 pt-8 border-t border-[color:var(--outline)]/10 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-2">Internal Identifier</p>
                  <p className="font-mono text-sm text-[color:var(--primary)]">{tool.calculator_slug}</p>
                </div>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-2">Ideal Application</p>
                  <p className="text-sm text-[color:var(--on_surface)]/80">Interactive planning, prototype validation, and lightweight performance estimates.</p>
                </div>
              </div>
            </Card>

            <article className="prose prose-invert max-w-none prose-p:text-[color:var(--on_surface)]/80 prose-headings:text-[color:var(--on_surface)] prose-a:text-[color:var(--primary)] prose-strong:text-[color:var(--on_surface)] prose-code:text-[color:var(--secondary)]">
              <StreamField blocks={tool.body} />
            </article>
          </div>

          <aside className="space-y-8 xl:sticky xl:top-32 xl:self-start">
            <Card surface="variant" className="p-0 border border-[color:var(--outline)]/10 overflow-hidden relative">
              <div className="absolute inset-x-0 h-1 bg-[color:var(--primary)] top-0" />
              <div className="p-8 md:p-10">
                <ToolCalculator
                  title={tool.title}
                  category={tool.category}
                  description={excerptFromTool(tool)}
                />
              </div>
            </Card>

            {related.length > 0 && (
              <Card surface="low" className="p-8">
                <h2 className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-6">Related Modules</h2>
                <div className="space-y-4">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/tools/${item.slug}`}
                      className="block group rounded-2xl bg-[color:var(--surface_container)] p-5 border border-[color:var(--outline)]/5 hover:border-[color:var(--primary)]/50 transition-all hover:bg-[color:var(--surface_container_high)]"
                    >
                      <p className="font-medium text-[color:var(--on_surface)] group-hover:text-[color:var(--primary)] transition-colors">{item.title}</p>
                      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.1em] text-[color:var(--secondary)]">{item.category}</p>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
