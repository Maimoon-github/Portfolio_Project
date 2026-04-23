// src/components/portfolio/ProjectCard.tsx
// Server Component — Thumbnail card for projects gallery
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  thumbnail?: string
  techTags: string[]
  liveUrl?: string
  repoUrl?: string
  className?: string
}

export function ProjectCard({
  slug,
  title,
  description,
  thumbnail,
  techTags,
  liveUrl,
  repoUrl,
  className,
}: ProjectCardProps) {
  return (
    <Card className={cn("group overflow-hidden h-full transition-all hover:shadow-[0_0_60px_rgba(240,230,211,0.06)]", className)}>
      {thumbnail && (
        <div className="relative aspect-video">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-1">
        <Link href={`/projects/${slug}`} className="group-hover:text-[#ffc68b] transition-colors">
          <h3 className="text-2xl font-medium leading-tight text-foreground mb-3 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 flex-1 mb-6">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techTags.map((tag) => (
            <Badge key={tag} variant="default" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          {liveUrl && (
            <Button asChild variant="ghost" size="sm" className="flex-1">
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live
              </Link>
            </Button>
          )}
          {repoUrl && (
            <Button asChild variant="ghost" size="sm" className="flex-1">
              <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}