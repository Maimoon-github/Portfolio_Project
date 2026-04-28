// src/app/projects/page.tsx
// [ISR:3600] Projects gallery — masonry/grid of ProjectCards with category filter tabs
import { revalidate } from "next/cache"
import { ProjectCard } from "@/components/portfolio/ProjectCard"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Placeholder data (real API fetch in Phase 1)
const projects = [
  {
    slug: "llm-rag-system",
    title: "Production RAG Pipeline",
    description: "End-to-end LLM retrieval system with sub-200ms latency.",
    thumbnail: "/images/projects/rag-hero.jpg",
    techTags: ["Next.js", "Django", "Pinecone"],
    liveUrl: "#",
    repoUrl: "#",
  },
  // ... more projects
]

export const revalidate = 3600 // ISR: revalidate every hour

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-5xl font-medium tracking-[-0.03em] text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-3">Systems that ship and scale.</p>
        </div>
      </div>

      {/* Category tabs (expandable in Phase 1) */}
      <Tabs defaultValue="all" className="mb-12">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ai">AI/ML</TabsTrigger>
          <TabsTrigger value="web">Web</TabsTrigger>
          <TabsTrigger value="infra">Infra</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}