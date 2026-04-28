// src/app/calculators/[slug]/loading.tsx
// Calculator UI skeleton
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Skeleton className="h-12 w-3/4 mb-6" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    </div>
  )
}