// src/app/projects/[slug]/page.tsx
// [ISR:3600] Case study page
import { notFound } from "next/navigation"
import { ProjectHero } from "@/components/portfolio/ProjectHero"
import { ProjectCard } from "@/components/portfolio/ProjectCard" // reuse for related

// Placeholder data (real API in Phase 1)
const getProject = async (slug: string) => {
  // simulate
  return {
    slug,
    title: "Production RAG Pipeline",
    role: "Lead AI Engineer",
    duration: "2024 — Present",
    heroImage: "/images/projects/rag-hero.jpg",
    liveUrl: "#",
    repoUrl: "#",
    // problem/solution/outcome would be fetched
  }
}

export const revalidate = 3600

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: "Case study of a production-grade AI system.",
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <ProjectHero {...project} />

      {/* Problem / Solution / Outcome sections */}
      <div className="prose prose-invert max-w-none mt-16">
        <h2 className="text-3xl font-medium">The Challenge</h2>
        <p>Real-world content would be fetched from API in Phase 1.</p>
      </div>

      {/* Related projects */}
      <div className="mt-24">
        <h3 className="text-xl font-medium mb-8">More Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder related cards */}
        </div>
      </div>
    </div>
  )
}