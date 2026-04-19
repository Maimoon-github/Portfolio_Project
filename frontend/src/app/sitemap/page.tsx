import Link from "next/link";
import { getAllBlogSlugs } from "@/lib/api/blog";
import { getAllToolSlugs } from "@/lib/api/tools";
import { getAllProjectSlugs } from "@/lib/portfolio";

export default async function SitemapPage() {
  const blogSlugs = await getAllBlogSlugs();
  const toolSlugs = await getAllToolSlugs();
  const projectSlugs = getAllProjectSlugs();

  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Sitemap</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            HTML Sitemap
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            A quick navigation map to the site’s major content sections and deep links.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Core pages</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blog", href: "/blog" },
                { label: "Tools", href: "/tools" },
                { label: "Contact", href: "/contact" },
                { label: "Resume", href: "/resume" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-amber-600 hover:text-amber-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Portfolio</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {projectSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={`/portfolio/${slug}`} className="text-amber-600 hover:text-amber-500">
                    {slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Blogs & tools</h2>
            <div className="mt-6 space-y-6 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Blog posts</p>
                <ul className="mt-3 space-y-2">
                  {blogSlugs.slice(0, 8).map((slug) => (
                    <li key={slug}>
                      <Link href={`/blog/${slug}`} className="text-amber-600 hover:text-amber-500">
                        {slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                  {blogSlugs.length > 8 ? <li className="text-slate-500">+{blogSlugs.length - 8} more</li> : null}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-950 dark:text-white">Tools</p>
                <ul className="mt-3 space-y-2">
                  {toolSlugs.slice(0, 8).map((tool) => (
                    <li key={tool.slug}>
                      <Link href={`/tools/${tool.slug}`} className="text-amber-600 hover:text-amber-500">
                        {tool.slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                  {toolSlugs.length > 8 ? <li className="text-slate-500">+{toolSlugs.length - 8} more</li> : null}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
