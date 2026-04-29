// src/app/(marketing)/about/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-12">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      {/* Skeleton for timeline */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  )
}