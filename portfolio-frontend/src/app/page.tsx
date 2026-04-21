import { Metadata } from "next";
import ProjectCard from "@/components/portfolio/ProjectCard";
import SkillBadge from "@/components/portfolio/SkillBadge";
import { fetchProjects } from "@/lib/api/portfolio"; // typed client (assumed updated via openapi-typescript)

export const metadata: Metadata = {
  title: "Shehran | Full Stack Developer & Designer",
  description: "Portfolio, blog, and interactive calculators by Shehran — Lahore-based developer building with Next.js, Django, and modern tools.",
  openGraph: {
    type: "website",
    title: "Shehran | Full Stack Developer",
    description: "Portfolio showcasing Next.js, Django, Wagtail, and interactive tools.",
    images: [{ url: "/og-home.jpg", width: 1200, height: 630 }],
  },
};

export const revalidate = 3600; // ISR for home

async function getFeaturedProjects() {
  return await fetchProjects({ featured: true, limit: 6 });
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 to-black py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold tracking-tighter mb-6">
            Shehran — Building the future, one line at a time
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
            Full Stack Developer • Designer • Problem Solver
          </p>
          <div className="flex justify-center gap-4">
            <a href="/projects" className="shadcn-button bg-white text-black px-8 py-4 rounded-2xl font-medium">
              View Projects
            </a>
            <a href="/about" className="shadcn-button border border-white/50 px-8 py-4 rounded-2xl font-medium">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-semibold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project: any) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Summary */}
      <section className="bg-zinc-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold mb-8">Skills &amp; Expertise</h2>
          {/* Skills fetched similarly via API or static for SSG */}
          <div className="flex flex-wrap gap-3">
            {/* populated via separate fetch or static */}
          </div>
        </div>
      </section>
    </main>
  );
}