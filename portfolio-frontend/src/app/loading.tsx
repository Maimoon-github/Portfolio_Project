// src/app/layout.tsx
import type { Metadata } from "next"
import { Providers } from "@/components/layout/Providers"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { JsonLd } from "@/components/layout/JsonLd"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Alex Reeves • Senior AI/ML Engineer",
    template: "%s | Alex Reeves",
  },
  description: "Engineering production-grade intelligence systems at scale.",
  keywords: ["AI/ML Engineer", "LLM", "MLOps", "Computer Vision", "Portfolio", "Blog"],
  authors: [{ name: "Alex Reeves", url: "https://yourdomain.dev" }],
  creator: "Alex Reeves",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.dev",
    siteName: "Alex Reeves",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Providers>
          <JsonLd
            schema={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Alex Reeves",
              url: "https://yourdomain.dev",
            }}
          />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}