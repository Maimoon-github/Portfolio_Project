// src/app/(marketing)/contact/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-xl py-12">
      <div className="h-8 w-36 animate-pulse rounded bg-muted" />
      <div className="mt-8 space-y-4">
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
        <div className="h-32 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}