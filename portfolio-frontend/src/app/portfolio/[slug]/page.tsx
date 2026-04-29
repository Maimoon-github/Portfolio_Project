// src/app/portfolio/[slug]/page.tsx  [ISR:3600]
import { ProjectHero } from "@/components/portfolio/ProjectHero"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

export default async function ProjectPage({ params }: Props) {
  // const project = await fetchProject.detail(params.slug)
  // if (!project) notFound()
  const project = null // placeholder

  if (!project) notFound()

  return (
    <div className="py-12">
      <ProjectHero project={project} />
      <div className="mt-8 prose dark:prose-invert max-w-none">
        {/* Rich content */}
      </div>
    </div>
  )
}