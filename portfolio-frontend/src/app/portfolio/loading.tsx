// src/app/portfolio/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        <div className="max-w-4xl mb-20 space-y-6">
          <div className="h-6 w-32 animate-pulse rounded bg-surface-container-high" />
          <div className="h-16 w-64 animate-pulse rounded bg-surface-container-high" />
          <div className="h-24 w-full animate-pulse rounded bg-surface-container-high" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-xl bg-surface-container-low" />
          ))}
        </div>
      </div>
    </div>
  );
}