// src/app/projects/[slug]/loading.tsx
// Hero image + content skeleton
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero skeleton */}
      <Skeleton className="h-[560px] w-full rounded-3xl mb-12" />
      <Skeleton className="h-12 w-3/4 mx-auto mb-8" />
      <div className="space-y-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}