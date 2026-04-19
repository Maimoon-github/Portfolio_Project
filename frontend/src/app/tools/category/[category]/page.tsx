import Link from "next/link";
import { getTools } from "@/lib/api/tools";
import { generatePageMetadata } from "@/lib/utils/seo";
import type { Tool } from "@/lib/api/types";

const categoryLabels: Record<string, string> = {
  financial: "Financial",
  health: "Health",
  scientific: "Scientific",
  productivity: "Productivity",
  other: "Other",
};

export async function generateMetadata({ params }: { params: { category: string } }) {
  return generatePageMetadata({
    title: `${categoryLabels[params.category] ?? "Tools"} Tools`,
    description: `Explore interactive ${categoryLabels[params.category] ?? "general"} tools and calculators.`,
    slug: `tools/category/${params.category}`,
  });
}

export default async function ToolsCategoryPage({ params }: { params: { category: string } }) {
  const category = params.category;
  const toolsResponse = await getTools({ category, page_size: 100 });
  const tools = toolsResponse.results;

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Category</p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            {categoryLabels[category] ?? category}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Explore the complete set of interactive tools designed to help you make faster decisions in the {categoryLabels[category] ?? category} domain.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10 transition hover:-translate-y-1 hover:bg-slate-900"
            >
              <span className="mb-4 inline-flex rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-100">
                {tool.category}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-white group-hover:text-amber-300">
                {tool.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">A smart tool with hybrid content and interactive model support.</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
