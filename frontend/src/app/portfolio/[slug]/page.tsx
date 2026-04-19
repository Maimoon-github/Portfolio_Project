import Link from "next/link";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/utils/seo";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/portfolio";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project not found" };
  }

  return generatePageMetadata({
    title: `${project.title} | Portfolio`,
    description: project.highlight,
    slug: `portfolio/${project.slug}`,
  });
}

export default function PortfolioProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return notFound();
  }

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-amber-900">
              {project.category}
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Case study</span>
          </div>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{project.description}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Role</p>
              <p className="mt-3 font-semibold text-slate-950 dark:text-white">{project.role}</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Stack</p>
              <div className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
                {project.stack.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50 p-6 text-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Outcomes</p>
              <p className="mt-3 text-slate-700 dark:text-slate-300">{project.outcome}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Challenge</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Design approach</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{project.highlight}</p>
            </div>
          </div>

          <aside className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-slate-950 p-8 text-slate-100 shadow-2xl shadow-slate-950/10 dark:border-slate-800/60 dark:bg-slate-900/85">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Links</p>
              <div className="mt-4 space-y-3 text-sm">
                <Link href={project.liveUrl} className="block rounded-3xl bg-white/10 px-4 py-3 transition hover:bg-white/15" target="_blank" rel="noreferrer">
                  Live prototype
                </Link>
                <Link href={project.githubUrl} className="block rounded-3xl bg-white/10 px-4 py-3 transition hover:bg-white/15" target="_blank" rel="noreferrer">
                  Code & assets
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800/70 bg-slate-900 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Project tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-amber-400/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
