import Link from "next/link";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden flex items-center justify-center">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-5xl">
        <Card surface="low" className="p-10 md:p-14 lg:p-16 border border-[color:var(--primary)]/10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-6 inline-flex rounded-full bg-[color:var(--primary)]/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--primary)]">
                Critical Logic Fault: Error 404
              </p>
              <h1 className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]">
                Blueprint Not Found
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
                The structural integrity of this request has been compromised. The coordinate you are seeking does not exist within our current architectural framework.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/">
                  <Button size="lg" className="w-full sm:w-auto">Return to Base</Button>
                </Link>
                <Link href="/blog" className="flex items-center justify-center gap-2 rounded-[1.25rem] bg-[color:var(--surface_container)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[color:var(--on_surface)] transition-all hover:bg-[color:var(--surface_container_high)] border border-[color:var(--outline)]/10">
                  Search Library
                </Link>
              </div>
            </div>

            <Card surface="variant" className="p-8 border border-[color:var(--outline)]/10 relative overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-[color:var(--primary)] top-0" />
              <div className="grid gap-5">
                <div className="flex items-center justify-between rounded-2xl bg-[color:var(--surface_highest)] p-5 border border-[color:var(--outline)]/5">
                  <span className="text-[color:var(--on_surface)] text-sm font-medium">System Diagnostics</span>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--secondary)]">v2.0.404</span>
                </div>
                <div className="grid gap-4 rounded-2xl bg-[color:var(--surface_highest)] p-5 border border-[color:var(--outline)]/5">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-2xl bg-[color:var(--surface_container_high)] p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--secondary)]">Coordinate X</p>
                      <p className="mt-2 text-lg font-mono text-[color:var(--on_surface)]">NaN_NULL</p>
                    </div>
                    <div className="rounded-2xl bg-[color:var(--surface_container_high)] p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--secondary)]">Coordinate Y</p>
                      <p className="mt-2 text-lg font-mono text-[color:var(--on_surface)]">0x000F4</p>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[color:var(--surface)] p-4 font-mono text-[0.7rem] text-[color:var(--on_surface)]/70 uppercase border border-[color:var(--outline)]/10">
                    <p>12:00:01 INIT_CORE_HANDSHAKE...</p>
                    <p className="text-[color:var(--primary)] mt-1">12:00:02 FATAL: ADDRESS_NOT_RESOLVED</p>
                    <p className="mt-1">12:00:03 REROUTING_TO_STABLE_NODE...</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </main>
  );
}
