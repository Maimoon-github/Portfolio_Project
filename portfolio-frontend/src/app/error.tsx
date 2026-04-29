'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { RefreshCw, Home } from "lucide-react"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 py-12">
      <div className="max-w-md w-full">
        <div className="glass rounded-3xl p-10 text-center relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
            <RefreshCw className="h-10 w-10" />
          </div>
          <h1 className="headline-lg mb-3">Something went wrong</h1>
          <p className="text-on-surface-variant mb-8 text-lg">
            An unexpected error occurred. Our systems are protected, but even sovereign architectures need a reset.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="tonal-shift mb-8 p-4 rounded-2xl text-left font-mono text-xs text-on-surface-variant">
              {error.message}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Button onClick={reset} className="btn-primary w-full text-lg py-7">
              <RefreshCw className="mr-3 h-5 w-5" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="btn-secondary w-full py-7 text-lg">
              <Link href="/">
                <Home className="mr-3 h-5 w-5" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}