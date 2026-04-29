// src/components/calculators/CalculatorCard.tsx
// Hub listing card (Server Component)
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CalculatorCardProps {
  slug: string
  title: string
  description: string
  category: string
  icon: string
}

export function CalculatorCard({ slug, title, description, category, icon }: CalculatorCardProps) {
  return (
    <Link href={`/calculators/${slug}`}>
      <Card className="h-full transition-all hover:shadow-[0_0_60px_rgba(240,230,211,0.06)] group">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="text-4xl mb-6 text-[#ffc68b]">{icon}</div>
          <Badge variant="outline" className="w-fit mb-3 text-xs">
            {category}
          </Badge>
          <h3 className="text-2xl font-medium group-hover:text-[#ffc68b] transition-colors mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm flex-1 line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}