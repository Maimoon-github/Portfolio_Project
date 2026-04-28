// src/app/calculators/[slug]/page.tsx
// [SSG] shell + [CSR] logic: metadata from API, SoftwareApplication schema, social share
import { CalculatorShell } from "@/components/calculators/CalculatorShell"
import { MortgageCalculator } from "@/components/calculators/tools/MortgageCalculator"
import { JsonLd } from "@/components/layout/JsonLd"

// Dynamic slug routing — real metadata/API in Phase 1
export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Calculator`,
    description: "Interactive calculator tool for finance, health, and more.",
  }
}

export default async function CalculatorPage({ params }: { params: { slug: string } }) {
  const toolMap: Record<string, React.ReactNode> = {
    mortgage: <MortgageCalculator />,
    // Add other tools in Phase 1
  }

  const tool = toolMap[params.slug]

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${params.slug} Calculator`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
  }

  return (
    <>
      <JsonLd schema={schema} />
      <CalculatorShell
        title={`${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Calculator`}
        description="Interactive tool with real-time results"
        slug={params.slug}
      >
        {tool || <div className="p-12 text-center text-muted-foreground">Calculator coming soon</div>}
      </CalculatorShell>
    </>
  )
}