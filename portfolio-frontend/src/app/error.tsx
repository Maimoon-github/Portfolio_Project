// src/app/error.tsx
"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h2 className="text-3xl font-medium text-foreground mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">
          We encountered an unexpected error. Our team has been notified.
        </p>
        <Button onClick={reset} variant="primary" size="lg">
          Try again
        </Button>
      </div>
    </div>
  )
}