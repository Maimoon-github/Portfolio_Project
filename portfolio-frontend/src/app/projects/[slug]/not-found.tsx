// src/app/projects/[slug]/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="text-3xl font-medium text-foreground mb-4">Project not found</h2>
        <p className="text-muted-foreground mb-10">The project you’re looking for doesn’t exist or has been archived.</p>
        <Button asChild>
          <Link href="/projects">Back to All Projects</Link>
        </Button>
      </div>
    </div>
  )
}