// src/components/blog/PrevNextPost.tsx
// Server Component — Previous / Next post navigation
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PrevNextPostProps {
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export function PrevNextPost({ prev, next }: PrevNextPostProps) {
  return (
    <div className="flex justify-between items-center border-t border-[rgba(84,68,52,0.15)] pt-8 mt-12">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex items-center gap-3 text-sm hover:text-[#ffc68b] transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <div>
            <span className="text-muted-foreground text-xs">Previous</span>
            <p className="line-clamp-1 font-medium group-hover:text-[#ffc68b]">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex items-center gap-3 text-sm text-right hover:text-[#ffc68b] transition-colors"
        >
          <div>
            <span className="text-muted-foreground text-xs">Next</span>
            <p className="line-clamp-1 font-medium group-hover:text-[#ffc68b]">{next.title}</p>
          </div>
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}