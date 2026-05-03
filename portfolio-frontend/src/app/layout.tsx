import type { Metadata } from "next";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import "@/styles/index.css";   // ← Correct Sovereign Architect entry point

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Alex Reeves • Senior AI/ML Engineer & Systems Architect",
    template: "%s | Alex Reeves",
  },
  description: "Sovereign Architect of production-grade intelligence systems and high-performance 3D web ecosystems.",
  keywords: ["AI Engineer", "MLOps", "Three.js", "React 19", "Next.js 15", "Mystical Black Lotus"],
  authors: [{ name: "Alex Reeves" }],
  creator: "Alex Reeves",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexreeves.dev",
    siteName: "Alex Reeves Portfolio",
    title: "Alex Reeves • Senior AI/ML Engineer",
    description: "Architecting the future of intelligence and web performance.",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Alex Reeves Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Reeves • Senior AI/ML Engineer",
    description: "Architecting the future of intelligence and web performance.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
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