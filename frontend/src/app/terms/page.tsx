import { generatePageMetadata } from "@/lib/utils/seo";

export const metadata = generatePageMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using the website and the services provided.",
  slug: "terms",
});

export default function TermsPage() {
  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Legal</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            These terms govern your use of our site, tools, and content. By using this site, you agree to the policies described here.
          </p>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Acceptable use</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              You agree not to misuse the site or the tools, and to use the site in a lawful manner only.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Intellectual property</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              All content, design, and custom tools on this site are protected by copyright and may not be reused without permission.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Service availability</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              We aim to keep the site available, but do not guarantee uninterrupted access. Features may be updated, paused, or removed at any time.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
