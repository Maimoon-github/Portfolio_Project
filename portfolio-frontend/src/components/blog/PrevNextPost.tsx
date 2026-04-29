import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PrevNextPostProps {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

export function PrevNextPost({ prev, next }: PrevNextPostProps) {
  return (
    <div className="section border-t border-[rgba(84,68,52,0.15)] pt-12">
      <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-6 w-6 flex-shrink-0" />
            <div>
              <span className="label-md">Previous</span>
              <p className="line-clamp-2 font-medium group-hover:text-primary">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-center gap-4 text-right text-on-surface-variant hover:text-primary transition-colors"
          >
            <div>
              <span className="label-md">Next</span>
              <p className="line-clamp-2 font-medium group-hover:text-primary">{next.title}</p>
            </div>
            <ChevronRight className="h-6 w-6 flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}