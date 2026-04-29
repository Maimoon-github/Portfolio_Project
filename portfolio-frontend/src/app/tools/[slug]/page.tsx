// src/app/tools/[slug]/page.tsx  [SSG shell + CSR logic]
import { ToolShell } from "@/components/tools/ToolShell"
import { notFound } from "next/navigation"

// Map of supported tools – this could eventually come from an API
const toolMap: Record<string, { title: string; description: string }> = {
  "mortgage-calculator": { title: "Mortgage Calculator", description: "Calculate your monthly payments." },
  "compound-interest": { title: "Compound Interest Calculator", description: "See how your savings grow." },
  "bmi-calculator": { title: "BMI Calculator", description: "Check your body mass index." },
  "reading-time": { title: "Reading Time Estimator", description: "Estimate reading time for any text." },
  "contrast-checker": { title: "Contrast Checker", description: "Check color contrast ratios for accessibility." },
}

interface Props { params: { slug: string } }

export default function ToolPage({ params }: Props) {
  const tool = toolMap[params.slug]
  if (!tool) notFound()

  return <ToolShell slug={params.slug} title={tool.title} description={tool.description} />
}