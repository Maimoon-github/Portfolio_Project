import { Github, Linkedin, Mail, CalendarDays } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="relative bg-[color:var(--surface)] min-h-screen py-24 sm:py-32 overflow-hidden">
      <GlowOrb color="primary" size={500} opacity={6} className="-top-20 -left-20" />
      <GlowOrb color="secondary" size={600} opacity={5} className="bottom-0 -right-40" />

      <div className="container relative z-10 px-4 md:px-8 mx-auto max-w-7xl space-y-20">
        <section className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] font-semibold mb-4">Connect</p>
            <h1 className="text-[2.5rem] leading-[1.1] md:text-[3.5rem] font-medium tracking-tight text-[color:var(--on_surface)]">
              Let’s turn your vision into a crafted digital experience.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--on_surface)]/80">
              Reach out for project inquiries, collaboration opportunities, or strategic consultations.
            </p>
          </div>

          <Card surface="low" className="p-8">
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-6">Fast Contact</p>
            <div className="space-y-6">
              <a href="mailto:hello@maimoonarchitect.com" className="group flex items-center gap-4 rounded-[1.25rem] bg-[color:var(--surface_container)] p-4 transition-colors hover:bg-[color:var(--surface_container_high)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--on_surface)] group-hover:text-[color:var(--primary)] transition-colors">hello@maimoonarchitect.com</p>
                  <p className="text-xs text-[color:var(--secondary)]">General inquiries</p>
                </div>
              </a>
              
              <a href="#" className="group flex items-center gap-4 rounded-[1.25rem] bg-[color:var(--surface_container)] p-4 transition-colors hover:bg-[color:var(--surface_container_high)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--secondary)]/10 text-[color:var(--secondary)]">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--on_surface)] group-hover:text-[color:var(--primary)] transition-colors">LinkedIn</p>
                  <p className="text-xs text-[color:var(--secondary)]">View professional profile</p>
                </div>
              </a>

              <a href="#" className="group flex items-center gap-4 rounded-[1.25rem] bg-[color:var(--surface_container)] p-4 transition-colors hover:bg-[color:var(--surface_container_high)]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--on_surface)]/10 text-[color:var(--on_surface)]">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[color:var(--on_surface)] group-hover:text-[color:var(--primary)] transition-colors">GitHub</p>
                  <p className="text-xs text-[color:var(--secondary)]">Inspect projects and tools</p>
                </div>
              </a>
            </div>
          </Card>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <Card surface="low" className="p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-[1.25rem] border border-[color:var(--outline)]/20 bg-[color:var(--surface)] px-5 py-4 text-sm text-[color:var(--on_surface)] placeholder-[color:var(--on_surface)]/30 outline-none transition-all focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-[1.25rem] border border-[color:var(--outline)]/20 bg-[color:var(--surface)] px-5 py-4 text-sm text-[color:var(--on_surface)] placeholder-[color:var(--on_surface)]/30 outline-none transition-all focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)]"
                />
              </div>
              <input
                type="text"
                placeholder="Project name"
                className="w-full rounded-[1.25rem] border border-[color:var(--outline)]/20 bg-[color:var(--surface)] px-5 py-4 text-sm text-[color:var(--on_surface)] placeholder-[color:var(--on_surface)]/30 outline-none transition-all focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)]"
              />
              <textarea
                rows={6}
                placeholder="Tell us about your project goals"
                className="w-full rounded-[1.25rem] border border-[color:var(--outline)]/20 bg-[color:var(--surface)] px-5 py-4 text-sm text-[color:var(--on_surface)] placeholder-[color:var(--on_surface)]/30 outline-none transition-all focus:border-[color:var(--primary)] focus:ring-1 focus:ring-[color:var(--primary)] resize-none"
              />
              <Button size="lg" className="w-full group">
                <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">Send Inquiry</span>
              </Button>
            </form>
          </Card>

          <aside className="space-y-8">
            <Card surface="variant" className="p-8 md:p-10 border border-[color:var(--outline)]/10">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-6">What's Next</p>
              <h2 className="text-2xl font-medium tracking-tight text-[color:var(--on_surface)]">Meeting Coordination</h2>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--on_surface)]/70">
                Use the contact form to share project details. We will reply with availability for an introductory call and next steps.
              </p>
              <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-[1.25rem] bg-[color:var(--surface_container_high)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[color:var(--on_surface)] transition-all hover:bg-[color:var(--surface_highest)] hover:text-[color:var(--primary)]">
                <CalendarDays className="h-5 w-5 text-[color:var(--primary)]" />
                Request a scheduling link
              </button>
            </Card>

            <Card surface="variant" className="p-8 md:p-10 border border-[color:var(--outline)]/10">
              <p className="text-[0.75rem] uppercase tracking-[0.1em] text-[color:var(--secondary)] mb-6">Studio</p>
              <p className="mb-2 text-xl font-medium tracking-tight text-[color:var(--on_surface)]">Dubai Design District</p>
              <p className="text-sm leading-relaxed text-[color:var(--on_surface)]/70">
                A hybrid studio for digital work, product strategy, and immersive publishing.
              </p>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}
