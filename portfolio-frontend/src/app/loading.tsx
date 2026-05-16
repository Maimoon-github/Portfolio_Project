export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero skeleton */}
      <section className="section pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-14 w-3/4 mx-auto bg-surface-container rounded-3xl mb-6 animate-pulse" />
            <div className="h-8 w-1/2 mx-auto bg-surface-container rounded-3xl mb-8 animate-pulse" />
            <div className="h-6 w-96 mx-auto bg-surface-container/70 rounded-2xl animate-pulse" />
          </div>
          <div className="flex justify-center gap-4 mt-12">
            <div className="h-12 w-40 bg-gradient-to-r from-primary to-primary-container rounded-2xl animate-pulse" />
            <div className="h-12 w-40 bg-surface-container rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured / Cards skeleton */}
      <section className="section bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-9 w-64 bg-surface-container rounded-3xl animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-80 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Skills skeleton */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 w-48 bg-surface-container rounded-3xl animate-pulse mb-8" />
          <div className="h-64 bg-surface-container rounded-3xl animate-pulse" />
        </div>
      </section>
    </div>
  );
}