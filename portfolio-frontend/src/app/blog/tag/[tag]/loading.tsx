// src/app/blog/tag/[tag]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80" />)}</div>
}