import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="glass rounded-3xl p-12 mb-12">
          <div className="inline-flex items-center justify-center text-[180px] font-bold text-primary/10 leading-none mb-6 select-none">
            404
          </div>
          <h1 className="headline-lg mb-4">The page has vanished into the void</h1>
          <p className="text-on-surface-variant text-lg mb-10 max-w-xs mx-auto">
            Even the most sovereign architectures have hidden passages. This one seems to have been sealed.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-3 px-8 py-6 text-base font-semibold rounded-2xl"
          >
            Return to the Citadel
            <span className="text-xl">→</span>
          </Link>
        </div>
        <p className="text-on-surface-variant/60 text-sm">Protected by the Sovereign Architect</p>
      </div>
    </div>
  );
}