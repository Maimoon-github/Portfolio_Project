// src/app/(marketing)/contact/loading.tsx
// Form skeleton
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-8">
      <Skeleton className="h-12 w-3/4" />
      <div className="grid grid-cols-2 gap-6">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
      <Skeleton className="h-12" />
      <Skeleton className="h-48" />
      <Skeleton className="h-12 w-full" />
    </div>
  )
}