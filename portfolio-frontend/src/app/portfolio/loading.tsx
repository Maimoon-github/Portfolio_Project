// src/app/portfolio/loading.tsx
export default function Loading() {
  return (
    <div className="py-12">
      <div className="mb-8 h-8 w-32 animate-pulse rounded bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  )
}