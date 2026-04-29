// src/app/blog/loading.tsx

import Link from "next/link"

<Link href="/blog" className="hover:text-primary">All posts</Link>
<Link href="/blog/category/ai" className="hover:text-primary">AI/ML</Link>
<Link href="/blog/category/webdev" className="hover:text-primary">Web Dev</Link>

export default function Loading() {
  return (
    <div>
      <div className="mb-8 h-8 w-24 animate-pulse rounded bg-muted" />
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  )
}