import Link from "next/link";
import { getTools } from "@/lib/api/tools";
import { generatePageMetadata } from "@/lib/utils/seo";
import type { Tool } from "@/lib/api/types";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";

const categoryLabels: Record<string, string> = {
  financial: "Financial",
  health: "Health",
  scientific: "Scientific",
  productivity: "Productivity",
  other: "Other",
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  return generatePageMetadata({
    title: `${categoryLabels[resolvedParams.category] ?? "Tools"} Tools`,
    description: `Explore interactive ${categoryLabels[resolvedParams.category] ?? "general"} tools and calculators.`,
    slug: `tools/category/${resolvedParams.category}`,
  });
}

export default async function ToolsCategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  const toolsResponse = await getTools({ category, page_size: 100 });
  const tools = toolsResponse.results;

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl space-y-20">
        <div className="pt-4 pb-4">
          <Link href="/tools" className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold hover:text-[color:var(--primary)] transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Back to Tools Directory
          </Link>
        </div>

        <section className="space-y-6 max-w-3xl">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">Category Archive</p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            {categoryLabels[category] ?? category} Modules
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
            Explore the complete set of interactive tools designed to help you make faster decisions in the {categoryLabels[category] ?? category} domain.
          </p>
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
                  A smart tool with hybrid content and interactive model support designed for rapid computation and architectural clarity.
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
