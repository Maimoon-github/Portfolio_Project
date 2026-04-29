// src/app/portfolio/[slug]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Project not found</h2>
        <p className="mt-2 text-muted-foreground">The project you requested doesn't exist.</p>
        <Button className="mt-6" asChild>
          <Link href="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    </div>
  )
}