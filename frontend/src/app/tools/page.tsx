import Link from "next/link";
import { getTools } from "@/lib/api/tools";
import { generatePageMetadata } from "@/lib/utils/seo";
import type { Tool } from "@/lib/api/types";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils/cn";

const toolCategories = [
  { id: "financial", label: "Financial" },
  { id: "health", label: "Health" },
  { id: "scientific", label: "Scientific" },
  { id: "productivity", label: "Productivity" },
  { id: "other", label: "Other" },
] as const;

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

interface PageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ToolsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = params?.category;
  
  const toolsResponse = await getTools({ page_size: 100 });
  const tools = selectedCategory
    ? toolsResponse.results.filter((tool) => tool.category === selectedCategory)
    : toolsResponse.results;

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="-top-40 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl space-y-20">
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold mb-4">
              Tools Directory
            </p>
            <h1 className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]">
              Hybrid calculators built for creative systems and practical decision-making.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
              Discover tools designed as actionable guides and responsive apps—each paired with rich context, real-world use cases, and step-by-step guidance.
            </p>
          </div>
          <Card surface="low" className="p-8">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Featured Workflow</p>
            <p className="text-xl font-medium tracking-tight text-[color:var(--on_surface)] mb-2">Launch decisions faster</p>
            <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/80">
              Filter by category, inspect tool details, and use interactive panels to translate your concepts into measurable outputs.
            </p>
          </Card>
        </section>

        <section className="bg-[color:var(--surface_container_lowest)] border border-[color:var(--outline)]/5 rounded-[2rem] p-8">
          <div className="flex flex-wrap items-center gap-3">
            {toolCategories.map((category) => (
              <Link
                key={category.id}
                href={`/tools${selectedCategory === category.id ? "" : `?category=${category.id}`}`}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 border",
                  selectedCategory === category.id
                    ? "border-[color:var(--primary)] bg-[color:var(--primary)]/10 text-[color:var(--primary)]"
                    : "border-[color:var(--outline)]/20 bg-[color:var(--surface_container)] text-[color:var(--on_surface)] hover:border-[color:var(--primary)] hover:text-[color:var(--on_surface)]"
                )}
              >
                {category.label}
              </Link>
            ))}
            {selectedCategory && (
              <Link
                href="/tools"
                className="rounded-full border border-[color:var(--outline)]/20 bg-[color:var(--surface_container_low)] px-5 py-2.5 text-sm font-medium text-[color:var(--on_surface)]/60 hover:text-[color:var(--on_surface)]"
              >
                Clear filter
              </Link>
            )}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group block h-full flex flex-col"
            >
              <Card surface="variant" className="h-full border border-[color:var(--outline)]/5 hover:border-[color:var(--outline)]/20 transition-all duration-500 hover:-translate-y-2 hover:bg-[color:var(--surface_container_highest)] flex flex-col p-8 md:p-10">
                <div className="mb-6 inline-flex">
                  <Chip>{tool.category}</Chip>
                </div>
                
                <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)] mb-4 group-hover:text-[color:var(--primary)] transition-colors">
                  {tool.title}
                </h2>
                
                <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/70 mb-8 flex-grow">
                  {excerptFromTool(tool)}
                </p>
                
                <div className="flex items-center gap-2 text-sm mt-auto border-t border-[color:var(--outline)]/10 pt-4 text-[color:var(--primary)] font-medium">
                  <span className="group-hover:translate-x-1 transition-transform">Deploy Protocol</span>
                  <span aria-hidden="true" className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
