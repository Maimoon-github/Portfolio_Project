import Link from "next/link";
import { getAllProjects, getProjectCategories } from "@/lib/portfolio";
import { generatePageMetadata } from "@/lib/utils/seo";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/Chip";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { cn } from "@/lib/utils/cn";

interface PortfolioPageProps {
  searchParams?: Promise<{
    category?: string;
  }>;
}

export const metadata = generatePageMetadata({
  title: "Portfolio & Work",
  description: "Explore curated case studies, featured projects, and the systems behind high-impact design work.",
  slug: "portfolio",
});

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const categoryFilter = params?.category;
  
  const projects = getAllProjects();
  const categories = getProjectCategories();
  const filtered = categoryFilter
    ? projects.filter((project) => project.category === categoryFilter)
    : projects;

  return (
    <div className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl space-y-20">
        <header className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold mb-4">Portfolio</p>
            <h1 className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]">
              Selected work that balances craft, systems, and business clarity.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
              Browse a curated collection of case studies, each designed for fast comprehension, clear outcomes, and thoughtful storytelling.
            </p>
          </div>

          <Card surface="low" className="p-8">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-4">Featured Categories</p>
            <div className="flex flex-wrap gap-3">
              {categories.map((category: string) => (
                <Link
                  key={category}
                  href={`/portfolio?category=${encodeURIComponent(category)}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    categoryFilter === category
                      ? "bg-[color:var(--primary)] text-[color:var(--on_primary_fixed)] shadow-lg shadow-[color:var(--primary)]/20"
                      : "bg-[color:var(--surface_container_highest)] text-[color:var(--on_surface)]/80 hover:bg-[color:var(--surface_variant)] hover:text-[color:var(--on_surface)]"
                  )}
                >
                  {category}
                </Link>
              ))}
              {categoryFilter && (
                <Link
                  href="/portfolio"
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 bg-[color:var(--surface_container)] text-[color:var(--on_surface)]/60 hover:text-[color:var(--on_surface)]"
                >
                  Clear filter
                </Link>
              )}
            </div>
          </Card>
        </header>

        <section className="grid gap-8 md:gap-12 lg:grid-cols-2">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block h-full flex flex-col"
            >
              <Card surface="low" className="h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-[color:var(--surface_container_highest)] border border-[color:var(--outline)]/5 hover:border-[color:var(--outline)]/30">
                <div className="p-8 md:p-10 flex flex-col h-full">
                  <div className="mb-6 inline-flex">
                    <Chip>{project.category}</Chip>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--on_surface)] mb-4 group-hover:text-[color:var(--primary)] transition-colors">
                    {project.title}
                  </h2>
                  
                  <p className="text-base leading-relaxed text-[color:var(--on_surface)]/70 mb-8 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
