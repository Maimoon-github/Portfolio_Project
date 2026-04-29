import type { Metadata } from "next";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import "@/styles/index.css";   // ← Correct Sovereign Architect entry point

export const metadata: Metadata = {
  title: {
    default: "Alex Reeves • Senior AI/ML Engineer",
    template: "%s | Alex Reeves",
  },
  description: "Sovereign Architect of production-grade intelligence systems at scale.",
  keywords: ["AI/ML Engineer", "LLM", "MLOps", "PyTorch", "Transformers"],
  openGraph: {
    type: "website",
    siteName: "Alex Reeves",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-surface text-on-surface font-sans antialiased">
        <Providers>
          <JsonLd
            schema={{
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alex Reeves",
              jobTitle: "Senior AI/ML Engineer",
            }}
          />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}