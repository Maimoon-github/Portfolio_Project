import { generatePageMetadata } from "@/lib/utils/seo";

export const metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "Our privacy policy describes how personal information is collected, used, and protected.",
  slug: "privacy",
  noIndex: false,
});

export default function PrivacyPage() {
  return (
    <main className="bg-background px-5 pb-20 pt-24 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <p className="text-xs uppercase tracking-[0.32em] text-amber-700 dark:text-amber-300">Privacy</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            We protect your data with clear practices and transparent controls. This page explains what we collect and why it matters.
          </p>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-slate-200/70 bg-white/90 p-10 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/85">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Information we collect</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600 dark:text-slate-300">
              <li>Contact details for outreach and service requests.</li>
              <li>Usage data from tools, page visits, and interactions.</li>
              <li>Technical metadata such as browser and device information.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">How we use data</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Data is used to improve the site experience, respond to inquiries, and maintain secure operations. We do not sell or share personal information with third-party buyers.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Your rights</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              You can request access, correction, or deletion of your personal data. For support, please contact us through the contact page.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
