import Link from "next/link";
import { notFound } from "next/navigation";
import { StreamField } from "@/components/blog/StreamField";
import { ToolCalculator } from "@/components/tools/ToolCalculator";
import { getAllToolSlugs, getTool, getTools } from "@/lib/api/tools";
import { generatePageMetadata } from "@/lib/utils/seo";

export async function generateStaticParams() {
  const slugs = await getAllToolSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = await getTool(params.slug);

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

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getTool(params.slug);
  if (!tool) {
    return notFound();
  }

  const related = (await getTools({ category: tool.category, page_size: 4 }))
    .results.filter((item) => item.slug !== tool.slug)
    .slice(0, 3);

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.95fr_0.85fr]">
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-900">
                {tool.category}
              </span>
              <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Hybrid tool</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {tool.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Discover the practical workflow, examples, and implementation guidance behind this interactive tool.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Tool overview</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  This hybrid tool pairs a live calculator with a focused content experience designed to help you make better decisions, faster.
                </p>
                <div className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div>
                    <p className="font-semibold">Calculator slug</p>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">{tool.calculator_slug}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Best for</p>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Interactive planning, prototype validation, and lightweight performance estimates.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
                <StreamField blocks={tool.body} />
              </div>
            </div>

            <div className="space-y-6">
              <ToolCalculator
                title={tool.title}
                category={tool.category}
                description={excerptFromTool(tool)}
              />

              <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Related tools</h2>
                <div className="mt-6 space-y-4">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/tools/${item.slug}`}
                      className="block rounded-3xl border border-slate-200/70 bg-slate-50 px-5 py-4 text-sm text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                    >
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function excerptFromTool(tool: { body: { type: string; value: any }[] }) {
  const paragraph = tool.body.find((block) => block.type === "paragraph");
  if (!paragraph) return "Interactive calculator and expert insight for your next project.";
  return paragraph.value.replace(/<[^>]+>/g, "").slice(0, 140) + "...";
}
