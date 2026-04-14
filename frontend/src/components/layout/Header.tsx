"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "Blueprint" },
  { href: "/blog", label: "Insights" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 dark:text-slate-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-amber-200/80 text-amber-900 shadow-[0_10px_30px_rgba(251,191,36,0.14)] ring-1 ring-amber-300/70 dark:bg-amber-300/15 dark:text-amber-200">
            A
          </span>
          <span className="hidden sm:inline">Maimoon Architect</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium uppercase tracking-[0.18em] text-slate-700 transition hover:text-amber-600 dark:text-slate-200 dark:hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:bg-emerald-400 dark:bg-emerald-400 dark:text-slate-950 md:inline-flex"
          >
            Hire Us
          </Link>

          <button
            type="button"
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 transition hover:border-amber-300 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-amber-300",
              open && "ring-2 ring-amber-300/60"
            )}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="block h-[1px] w-5 bg-current"></span>
            <span className="mt-1 block h-[1px] w-5 bg-current"></span>
          </button>
        </div>
      </div>

      <div className={cn("overflow-hidden border-t border-slate-200/70 bg-white/95 transition-all duration-300 dark:border-slate-700/70 dark:bg-slate-950/95", open ? "max-h-96" : "max-h-0")}>
        <div className="space-y-2 px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-900 transition hover:bg-amber-50 hover:text-amber-700 dark:text-slate-100 dark:hover:bg-slate-800/80 dark:hover:text-amber-300"
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