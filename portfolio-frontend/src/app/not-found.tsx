// src/app/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-medium text-primary mb-4">404</h1>
        <h2 className="text-3xl font-medium text-foreground mb-6">Page not found</h2>
        <p className="text-muted-foreground mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}