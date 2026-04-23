// src/app/(marketing)/about/loading.tsx
// Skeleton for timeline and skills (prevents CLS)
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-64 w-full" />
      <div className="space-y-8">
        <Skeleton className="h-8 w-48" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  )
}