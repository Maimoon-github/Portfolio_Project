"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "Blueprint" },
  { href: "/blog", label: "Insights" },
  { href: "/tool", label: "Tools" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-[#fffdf0]/90 backdrop-blur-xl shadow-sm shadow-slate-950/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="text-base font-semibold uppercase tracking-[0.24em] text-slate-950">
          Maimoon Architect
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-amber-300/20 transition hover:bg-amber-300 md:inline-flex"
          >
            Hire Us
          </Link>

          <button
            type="button"
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 transition hover:border-amber-300 hover:text-amber-600",
              open && "ring-2 ring-amber-300/60"
            )}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="block h-[1px] w-5 bg-current" />
            <span className="mt-1 block h-[1px] w-5 bg-current" />
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden border-t border-slate-200/70 bg-white/95 transition-all duration-300 md:hidden", open ? "max-h-96" : "max-h-0")}>
        <div className="space-y-2 px-5 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-900 transition hover:bg-amber-50 hover:text-amber-700"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block rounded-2xl bg-amber-400 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-sm shadow-amber-300/30 transition hover:bg-amber-300"
            onClick={() => setOpen(false)}
          >
            Hire Us
          </Link>
        </div>
      </div>
    </header>
  );
}
