// src/app/calculators/page.tsx
// [SSG] Calculator hub: category grid, search input, SiteLinksSearchBox schema.org
import { CalculatorCard } from "@/components/calculators/CalculatorCard"
import { SearchBar } from "@/components/blog/SearchBar"
import { JsonLd } from "@/components/layout/JsonLd"

export const dynamic = "force-static"

export default function CalculatorsPage() {
  // Placeholder data — real API fetch in Phase 1
  const calculators = [
    {
      slug: "mortgage",
      title: "Mortgage Calculator",
      description: "Calculate monthly payments, amortization, and affordability.",
      category: "Finance",
      icon: "🏠",
    },
    {
      slug: "compound-interest",
      title: "Compound Interest",
      description: "See how your investments grow over time.",
      category: "Finance",
      icon: "📈",
    },
    {
      slug: "bmi",
      title: "BMI Calculator",
      description: "Body Mass Index and health insights.",
      category: "Health",
      icon: "⚖️",
    },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Calculator Hub",
    itemListElement: calculators.map((calc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://yourdomain.dev/calculators/${calc.slug}`,
    })),
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <JsonLd schema={schema} />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-medium tracking-[-0.03em] text-foreground">Calculator Hub</h1>
          <p className="text-muted-foreground text-lg mt-3">Practical tools for finance, health, math, and more.</p>
        </div>
        <SearchBar onSearch={() => {}} placeholder="Search calculators..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {calculators.map((calc) => (
          <CalculatorCard key={calc.slug} {...calc} />
        ))}
      </div>
    </div>
  )
}