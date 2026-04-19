import { generatePageMetadata } from "@/lib/utils/seo";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";

export const metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using the website and the services provided.",
  slug: "terms",
});

export default function TermsPage() {
  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-4xl space-y-12">
        <section className="space-y-6">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">Legal Documentation</p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            Terms of Service
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
            These terms define the operational agreement for utilizing our digital surface, models, and content architecture. By engaging with this platform, you commit to these protocols.
          </p>
        </section>

        <Card surface="low" className="p-8 md:p-12 space-y-12">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">Acceptable Interaction</h2>
            <p className="mt-4 leading-relaxed text-[color:var(--on_surface)]/80">
              You agree to utilize all interconnected applications responsibly without introducing disruptive payload cycles, attempting reverse-engineering of live components, or compromising backend topologies.
            </p>
          </div>

          <div className="border-t border-[color:var(--outline)]/10 pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">Architectural Property</h2>
            <p className="mt-4 leading-relaxed text-[color:var(--on_surface)]/80">
              The overarching visual dialect, hybrid tooling engines, syntax arrangements, and component architectures engineered onsite belong strictly within our network. Unauthorized redistribution, cloning, or external deployment without direct synchronization implies a critical licensing breach.
            </p>
          </div>

          <div className="border-t border-[color:var(--outline)]/10 pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">System Reliability</h2>
            <p className="mt-4 leading-relaxed text-[color:var(--on_surface)]/80">
              System uptimes are continually optimized, but environmental or logical disruptions can occur. Live models, algorithms, and content repositories may be seamlessly transitioned, refactored, or deprecated iteratively without synchronized warning sequences.
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
