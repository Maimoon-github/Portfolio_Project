import Link from "next/link";
import { getAllProjects, getProjectCategories } from "@/lib/portfolio";
import { generatePageMetadata } from "@/lib/utils/seo";

interface PortfolioPageProps {
  searchParams?: {
    category?: string;
  };
}

export const metadata = generatePageMetadata({
  title: "Portfolio & Work",
  description: "Explore curated case studies, featured projects, and the systems behind high-impact design work.",
  slug: "portfolio",
});

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const categoryFilter = searchParams?.category;
  const projects = getAllProjects();
  const categories = getProjectCategories();
  const filtered = categoryFilter
    ? projects.filter((project) => project.category === categoryFilter)
    : projects;

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Portfolio</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Selected work that balances craft, systems, and business clarity.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Browse a curated collection of case studies, each designed for fast comprehension, clear outcomes, and thoughtful storytelling.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Featured categories</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category: string) => (
                <Link
                  key={category}
                  href={`/portfolio?category=${encodeURIComponent(category)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    categoryFilter === category
                      ? "bg-amber-400 text-slate-950"
                      : "border border-slate-200 bg-slate-100 text-slate-700 hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  {category}
                </Link>
              ))}
              {categoryFilter ? (
                <Link
                  href="/portfolio"
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-amber-300 hover:bg-amber-50"
                >
                  View all
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-950"
            >
              <div className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-900">
                {project.category}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
