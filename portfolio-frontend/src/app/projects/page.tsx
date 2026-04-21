import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProjects } from "@/lib/api/portfolio";
import ProjectCard from "@/components/portfolio/ProjectCard";
import { Suspense } from "react";

export const revalidate = 3600; // ISR as specified

export const metadata: Metadata = {
  title: "Projects | Shehran",
  description: "Explore my full portfolio of web apps, full-stack projects, and open-source contributions.",
};

export default async function ProjectsPage() {
  const projects = await fetchProjects({});

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-4">All Projects</h1>
      <p className="text-zinc-500 mb-12">A curated selection of work built with modern stacks</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Suspense fallback={<div>Loading projects...</div>}>
          {projects.map((project: any) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}