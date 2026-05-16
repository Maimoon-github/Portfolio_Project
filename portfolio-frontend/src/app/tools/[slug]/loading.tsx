// src/app/tools/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="py-12">
      <div className="h-6 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-4 h-10 w-full animate-pulse rounded bg-muted" />
      <div className="mt-4 h-32 w-full animate-pulse rounded bg-muted" />
    </div>
  )
}