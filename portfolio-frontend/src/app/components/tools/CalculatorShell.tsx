// src/components/calculators/CalculatorShell.tsx
// Shared layout wrapper for all calculator pages (Server Component)
import { ReactNode } from "react"
import Link from "next/link"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/layout/JsonLd"

interface CalculatorShellProps {
  title: string
  description: string
  slug: string
  schemaOrg?: Record<string, unknown>
  children: ReactNode
}

export function CalculatorShell({
  title,
  description,
  slug,
  schemaOrg,
  children,
}: CalculatorShellProps) {
  const shareUrl = `https://yourdomain.dev/calculators/${slug}`

  return (
    <div className="max-w-4xl mx-auto">
      {schemaOrg && <JsonLd schema={schemaOrg} />}

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-5xl font-medium tracking-[-0.03em] text-foreground">{title}</h1>
          <p className="mt-3 text-xl text-muted-foreground max-w-md">{description}</p>
        </div>

        <Button variant="ghost" size="icon" asChild className="mt-2">
          <Link
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Share2 className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-3xl p-8 shadow-[0_0_60px_rgba(240,230,211,0.06)]">
        {children}
      </div>
    </div>
  )
}