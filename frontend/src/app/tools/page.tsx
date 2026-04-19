import Link from "next/link";
import { getTools } from "@/lib/api/tools";
import { generatePageMetadata } from "@/lib/utils/seo";
import type { Tool } from "@/lib/api/types";

const toolCategories = [
  { id: "financial", label: "Financial" },
  { id: "health", label: "Health" },
  { id: "scientific", label: "Scientific" },
  { id: "productivity", label: "Productivity" },
  { id: "other", label: "Other" },
] as const;

interface ToolsPageProps {
  searchParams?: {
    category?: string;
  };
}

function excerptFromTool(tool: Tool) {
  const paragraph = tool.body.find((block) => block.type === "paragraph");
  if (!paragraph) return "Interactive calculator and expert insight for your next project.";
  return paragraph.value.replace(/<[^>]+>/g, "").slice(0, 110) + "...";
}

export const metadata = generatePageMetadata({
  title: "Tools & Calculators",
  description: "Browse curated interactive calculators, performance estimators, and hybrid tool guides for design, productivity, and technical decision-making.",
  slug: "tools",
});

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const selectedCategory = searchParams?.category;
  const toolsResponse = await getTools({ page_size: 100 });
  const tools = selectedCategory
    ? toolsResponse.results.filter((tool) => tool.category === selectedCategory)
    : toolsResponse.results;

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">
              Tools Directory
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Hybrid calculators built for creative systems and practical decision-making.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Discover tools designed as actionable guides and responsive apps—each paired with rich context, real-world use cases, and step-by-step guidance.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Featured workflow</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Launch decisions faster with intelligent tools.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
              Filter by category, inspect tool details, and use interactive panels to translate your concepts into measurable outputs.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <div className="flex flex-wrap items-center gap-3">
            {toolCategories.map((category) => (
              <Link
                key={category.id}
                href={`/tools${selectedCategory === category.id ? "" : `?category=${category.id}`}`}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category.id
                    ? "border-amber-400 bg-amber-50 text-amber-900"
                    : "border-slate-200 bg-slate-100 text-slate-700 hover:border-amber-300 hover:bg-amber-50"
                }`}
              >
                {category.label}
              </Link>
            ))}
            {selectedCategory ? (
              <Link
                href="/tools"
                className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50"
              >
                Clear filter
              </Link>
            ) : null}
          </div>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/10 transition hover:-translate-y-1 hover:bg-slate-900"
            >
              <div className="mb-5 inline-flex rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-100">
                {tool.category}
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-white transition group-hover:text-amber-300">
                {tool.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {excerptFromTool(tool)}
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
                <span>Open tool</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
