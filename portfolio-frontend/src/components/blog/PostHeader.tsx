// src/components/blog/PostHeader.tsx
// Full-bleed post header (used in blog/[slug])
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PostHeaderProps {
  title: string
  subtitle?: string
  publishedAt: string
  readingTime: number
  category?: { name: string }
  heroImage?: string
  author?: string
}

export function PostHeader({
  title,
  subtitle,
  publishedAt,
  readingTime,
  category,
  heroImage,
  author = "Alex Reeves",
}: PostHeaderProps) {
  return (
    <header className="relative mb-12">
      {heroImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}
      <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-card rounded-3xl shadow-[0_0_60px_rgba(240,230,211,0.06)] p-8">
          {category && <Badge variant="default" className="mb-4">{category.name}</Badge>}
          <h1 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          {subtitle && <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>}
          <div className="flex items-center gap-x-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time>{new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}