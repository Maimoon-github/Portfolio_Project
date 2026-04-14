import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-92px)] items-center justify-center bg-background px-5 text-slate-950 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-2xl shadow-slate-900/10 dark:border-slate-800/60 dark:bg-slate-900/90">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-red-700 dark:bg-red-900/20 dark:text-red-200">
              Critical Logic Fault: Error 404
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Blueprint Not Found
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              The structural integrity of this request has been compromised. The coordinate you are seeking does not exist within our current architectural framework.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-emerald-400"
              >
                Return Home
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Search Library
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/70 bg-slate-950 p-8 text-white shadow-lg shadow-slate-950/20 dark:border-slate-700/70">
            <div className="grid gap-5">
              <div className="flex items-center justify-between rounded-3xl bg-slate-900/80 p-5">
                <span>System Diagnostics</span>
                <span className="text-xs uppercase tracking-[0.28em] text-slate-400">v2.0.404</span>
              </div>
              <div className="grid gap-4 rounded-3xl bg-slate-900/90 p-5">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-800/80 p-4 text-sm">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Coordinate X</p>
                    <p className="mt-2 text-lg font-semibold">NaN_NULL</p>
                  </div>
                  <div className="rounded-3xl bg-slate-800/80 p-4 text-sm">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Coordinate Y</p>
                    <p className="mt-2 text-lg font-semibold">0x000F4</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-black/20 p-4 font-mono text-xs text-slate-300">
                  <p>12:00:01 INIT_CORE_HANDSHAKE...</p>
                  <p>12:00:02 FATAL: ADDRESS_NOT_RESOLVED</p>
                  <p>12:00:03 REROUTING_TO_STABLE_NODE...</p>
                </div>
                <div className="flex items-center gap-3 rounded-3xl bg-slate-800/80 p-4">
                  <div className="h-12 w-12 rounded-3xl bg-slate-700/80" />
                  <div>
                    <p className="text-sm font-semibold">Maimoon AI Core</p>
                    <p className="text-xs text-slate-400">"The logic is sound, the path is just elsewhere."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

