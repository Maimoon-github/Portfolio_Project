import Link from "next/link";
import { getAllBlogSlugs } from "@/lib/api/blog";
import { getAllToolSlugs } from "@/lib/api/tools";
import { getAllProjectSlugs } from "@/lib/portfolio";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";

export default async function SitemapPage() {
  const blogSlugs = await getAllBlogSlugs();
  const toolSlugs = await getAllToolSlugs();
  const projectSlugs = getAllProjectSlugs();

  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-6xl space-y-16">
        <section className="space-y-6">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">Sitemap</p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            Platform Protocol Index
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
            A comprehensive mapping matrix to our core ecosystems, structural templates, and integrated hybrid functions.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          <Card surface="low" className="p-8">
            <h2 className="text-xl font-medium tracking-tight text-[color:var(--on_surface)]">Core Logic</h2>
            <ul className="mt-8 space-y-4 text-sm text-[color:var(--on_surface)]/70">
              {[
                { label: "Home Base", href: "/" },
                { label: "Architectural Blueprint", href: "/about" },
                { label: "System Deployments", href: "/portfolio" },
                { label: "Signal Feed", href: "/blog" },
                { label: "Interactive Computing", href: "/tools" },
                { label: "Connect", href: "/contact" },
                { label: "Operational Resume", href: "/resume" },
                { label: "Privacy Schema", href: "/privacy" },
                { label: "Terms Logic", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[color:var(--primary)] transition-colors flex items-center gap-2 group">
                    <span className="text-[color:var(--primary)] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all">&rarr;</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card surface="low" className="p-8">
            <h2 className="text-xl font-medium tracking-tight text-[color:var(--on_surface)]">Deployed Models</h2>
            <ul className="mt-8 space-y-4 text-sm text-[color:var(--on_surface)]/70">
              {projectSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={`/portfolio/${slug}`} className="hover:text-[color:var(--primary)] transition-colors flex items-center gap-2 group capitalize">
                    <span className="text-[color:var(--primary)] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all">&rarr;</span> {slug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card surface="low" className="p-8">
            <h2 className="text-xl font-medium tracking-tight text-[color:var(--on_surface)]">Integrated Feeds</h2>
            <div className="mt-8 space-y-10 text-sm">
              <div>
                <p className="font-medium text-[color:var(--on_surface)] mb-4">Signal Logs (Blog)</p>
                <ul className="space-y-4 text-[color:var(--on_surface)]/70">
                  {blogSlugs.slice(0, 8).map((slug) => (
                    <li key={slug}>
                      <Link href={`/blog/${slug}`} className="hover:text-[color:var(--primary)] transition-colors flex items-center gap-2 group capitalize">
                        <span className="text-[color:var(--primary)] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all">&rarr;</span> {slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                  {blogSlugs.length > 8 && <li className="text-[color:var(--secondary)] pl-2">+{blogSlugs.length - 8} additional records</li>}
                </ul>
              </div>
              <div className="pt-8 border-t border-[color:var(--outline)]/10">
                <p className="font-medium text-[color:var(--on_surface)] mb-4">Modules (Tools)</p>
                <ul className="space-y-4 text-[color:var(--on_surface)]/70">
                  {toolSlugs.slice(0, 8).map((tool) => (
                    <li key={tool.slug}>
                      <Link href={`/tools/${tool.slug}`} className="hover:text-[color:var(--primary)] transition-colors flex items-center gap-2 group capitalize">
                        <span className="text-[color:var(--primary)] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all">&rarr;</span> {tool.slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                  {toolSlugs.length > 8 && <li className="text-[color:var(--secondary)] pl-2">+{toolSlugs.length - 8} additional models</li>}
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
