// src/components/portfolio/TestimonialCard.tsx
// Pull-quote card with avatar and attribution
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  authorName: string
  authorRole: string
  authorCompany: string
  avatar?: string
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  authorCompany,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex-1">
          <p className="text-xl leading-relaxed text-foreground italic">“{quote}”</p>
        </div>
        <div className="flex items-center gap-4 mt-10">
          {avatar && (
            <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0">
              <Image src={avatar} alt={authorName} width={48} height={48} className="object-cover" />
            </div>
          )}
          <div>
            <div className="font-medium text-[#ffc68b]">{authorName}</div>
            <div className="text-sm text-muted-foreground">
              {authorRole}, {authorCompany}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}