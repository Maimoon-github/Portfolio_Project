"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "Blueprint" },
  { href: "/blog", label: "Insights" },
  { href: "/tools", label: "Tools" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[color:var(--surface_variant)]/40 backdrop-blur-xl border-b border-[color:var(--outline)]/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="text-base font-medium tracking-[0.1em] text-[color:var(--on_surface)] transition-opacity hover:opacity-80">
          The Sovereign Architect
        </Link>

        <nav className="hidden items-center md:flex rounded-full bg-[color:var(--surface)]/50 border border-[color:var(--outline)]/10 px-6 py-2">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="text-[0.75rem] font-medium uppercase tracking-[0.15em] text-[color:var(--on_surface)]/70 transition-colors hover:text-[color:var(--primary)] px-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden md:inline-flex group px-6")}
          >
            <span className="relative z-10 transition-transform group-hover:-translate-y-0.5">Let's Talk</span>
          </Link>

          <button
            type="button"
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--surface_container)] text-[color:var(--on_surface)] border border-[color:var(--outline)]/10 transition-colors hover:border-[color:var(--primary)] md:hidden",
              open && "ring-2 ring-[color:var(--primary)]/50"
            )}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="absolute flex flex-col items-center justify-center gap-1">
              <span className={cn("block h-[1.5px] w-5 bg-current transition-transform duration-300", open && "translate-y-[2.5px] rotate-45")} />
              <span className={cn("block h-[1.5px] w-5 bg-current transition-transform duration-300", open && "-translate-y-[2.5px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden border-t border-[color:var(--outline)]/10 bg-[color:var(--surface_container)]/95 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden", open ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
        <div className="flex flex-col gap-2 px-6 py-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-[0.15em] text-[color:var(--on_surface)]/80 transition-colors hover:text-[color:var(--primary)] py-3 border-b border-[color:var(--outline)]/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "mt-6 justify-center text-[0.75rem] uppercase tracking-[0.15em]")}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
