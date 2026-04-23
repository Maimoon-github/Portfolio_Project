// src/app/blog/[slug]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-20">
      <h2 className="text-3xl font-medium mb-4">Post not found</h2>
      <p className="text-muted-foreground mb-8">This blog post may have been removed or is still being drafted.</p>
      <Button asChild>
        <Link href="/blog">Browse All Posts</Link>
      </Button>
    </div>
  )
}