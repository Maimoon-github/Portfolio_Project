import type { Metadata } from "next";
import { Providers } from "@/components/layout/Providers";
import { Navigation } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import "./globals.css";
import "./styles/fonts.css";

export const metadata: Metadata = {
  title: "Alex Reeves • Senior AI/ML Engineer",
  description: "Engineering production-grade intelligence systems at scale. Portfolio, blog, calculators, and consulting for ambitious AI projects.",
  keywords: "AI/ML Engineer, LLM, MLOps, Computer Vision, Portfolio, Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#131313] text-[#f0e6d3] font-sans antialiased">
        <Providers>
          <JsonLd />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}