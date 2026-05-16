// src/app/blog/[slug]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Post not found</h2>
        <p className="mt-2 text-muted-foreground">Maybe try a search?</p>
        <Button className="mt-6" asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    </div>
  )
}