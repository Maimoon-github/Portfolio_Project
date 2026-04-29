// src/app/tools/page.tsx  [SSG]
import { ToolCard } from "@/components/tools/ToolCard"
import Link from "next/link"

export default function ToolsHub() {
  // Static list; actual tool data fetched client-side in [slug] pages
  const tools = [
    { slug: "mortgage-calculator", title: "Mortgage Calculator" },
    { slug: "compound-interest", title: "Compound Interest Calculator" },
    { slug: "bmi-calculator", title: "BMI Calculator" },
    { slug: "reading-time", title: "Reading Time Estimator" },
    { slug: "contrast-checker", title: "Contrast Checker" },
  ]

  return (
    <div className="py-12">
      <h1 className="mb-8 text-3xl font-bold">Tools Hub</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} slug={tool.slug} title={tool.title} />
        ))}
      </div>
    </div>
  )
}