// src/app/not-found.tsx
// Global branded 404 — catches all unmatched routes
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-8xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}