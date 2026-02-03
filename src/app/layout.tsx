import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name + " | IT Solutions (PTY) LTD",
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name + " | IT Solutions (PTY) LTD",
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
              {children}
            </div>
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
