// src/app/portfolio/page.tsx  [ISR:3600]
import { ProjectCard } from "@/components/portfolio/ProjectCard"

export const revalidate = 3600

export default async function PortfolioPage() {
  // In production, fetch from the API
  // const projects = await fetchProject.list()
  const projects: any[] = [] // placeholder

  return (
    <div className="py-12">
      <h1 className="mb-8 text-3xl font-bold">Portfolio</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length > 0 ? (
          projects.map((project: any) => <ProjectCard key={project.slug} project={project} />)
        ) : (
          <p className="text-muted-foreground">No projects loaded yet.</p>
        )}
      </div>
    </div>
  )
}