// src/app/portfolio/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="py-12">
      <div className="h-64 animate-pulse rounded bg-muted" />
      <div className="mt-8 space-y-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}