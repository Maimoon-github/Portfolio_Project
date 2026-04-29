// src/components/portfolio/ProjectHero.tsx
// Full-width case study hero (Server Component)
import Image from "next/image"
import { Calendar, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectHeroProps {
  title: string
  role: string
  duration: string
  heroImage: string
  liveUrl?: string
  repoUrl?: string
}

export function ProjectHero({
  title,
  role,
  duration,
  heroImage,
  liveUrl,
  repoUrl,
}: ProjectHeroProps) {
  return (
    <header className="relative mb-16">
      <div className="relative h-[560px] w-full overflow-hidden rounded-3xl">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover brightness-75"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      </div>

      <div className="max-w-4xl mx-auto -mt-24 relative z-10 px-6">
        <div className="bg-card rounded-3xl p-10 shadow-[0_0_80px_rgba(240,230,211,0.08)]">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-medium leading-none tracking-[-0.03em] text-foreground">
                {title}
              </h1>
              <div className="flex items-center gap-4 mt-6 text-muted-foreground">
                <span className="font-medium text-[#ffc68b]">{role}</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {duration}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              {liveUrl && (
                <Button asChild size="lg">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Live
                  </a>
                </Button>
              )}
              {repoUrl && (
                <Button asChild size="lg" variant="secondary">
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    Source
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}