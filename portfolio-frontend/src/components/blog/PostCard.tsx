// src/components/blog/PostCard.tsx
// Server Component — Preview card for blog index/archive
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  category?: { name: string; slug: string }
  publishedAt: string
  readingTime: number
  heroImage?: string
  className?: string
}

export function PostCard({
  slug,
  title,
  excerpt,
  category,
  publishedAt,
  readingTime,
  heroImage,
  className,
}: PostCardProps) {
  return (
    <Card className={cn("group overflow-hidden h-full transition-all hover:shadow-[0_0_60px_rgba(240,230,211,0.06)]", className)}>
      {heroImage && (
        <div className="relative aspect-video">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-1">
        {category && (
          <Badge variant="default" className="mb-3 w-fit">
            {category.name}
          </Badge>
        )}
        <Link href={`/blog/${slug}`} className="group-hover:text-[#ffc68b] transition-colors">
          <h3 className="text-xl font-medium leading-tight text-foreground line-clamp-2 mb-3">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 flex-1 mb-6">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <time>{new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}