import { generatePageMetadata } from "@/lib/utils/seo";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Our privacy policy describes how personal information is collected, used, and protected.",
  slug: "privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="secondary" size={600} opacity={5} className="top-0 -left-60" parallax />
      <GlowOrb color="primary" size={500} opacity={8} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-4xl space-y-12">
        <section className="space-y-6">
          <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold">Legal Documentation</p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-[4rem] font-medium tracking-tight text-[color:var(--on_surface)]">
            Privacy Policy
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
            We protect your data with clear practices and transparent controls. This document explains what we collect and why it matters in our infrastructure.
          </p>
        </section>

        <Card surface="low" className="p-8 md:p-12 space-y-12">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">Information Collection Protocol</h2>
            <ul className="mt-6 space-y-4 text-[color:var(--on_surface)]/80 pl-2">
              <li className="flex gap-3">
                <span className="text-[color:var(--primary)]">&rarr;</span> Contact details for strategic outreach and service requests.
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--primary)]">&rarr;</span> Usage data natively generated from tools, workflow metrics, and interactions.
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--primary)]">&rarr;</span> Hardware and session metadata enabling edge-edge computing distribution.
              </li>
            </ul>
          </div>

          <div className="border-t border-[color:var(--outline)]/10 pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">Data Orchestration Strategy</h2>
            <p className="mt-4 leading-relaxed text-[color:var(--on_surface)]/80">
              Information packets are securely isolated to refine user experience models, structure logical inquiries, and maintain an impenetrable operational baseline. No datasets are aggregated or mapped to third-party marketplaces. All data handling runs privately.
            </p>
          </div>

          <div className="border-t border-[color:var(--outline)]/10 pt-8">
            <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">Access Control Vectors</h2>
            <p className="mt-4 leading-relaxed text-[color:var(--on_surface)]/80">
              Users retain supreme administrative authority globally. Correction, suspension, or eradication of local data caches can be initiated at any time. Address inquiries via secure channels linked within our operational Contact console.
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}
