// src/app/blog/loading.tsx
// Post card skeleton grid
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <Skeleton className="aspect-video w-full" />
          <CardContent className="p-6">
            <Skeleton className="h-5 w-24 mb-3" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}