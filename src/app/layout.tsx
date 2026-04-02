import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: {
    default: "DocketPack — Every Document Your Business Needs to Operate",
    template: "%s | DocketPack",
  },
  description:
    "Generate every compliance, HR, legal, and safety document your business needs. Federal and state requirements covered. Packs from $79. AI-powered, legally referenced, ready in minutes.",
  keywords: [
    "business compliance documents",
    "OSHA compliance documents",
    "business document generator",
    "compliance paperwork",
    "HR documents small business",
    "health and safety documents",
    "state compliance requirements",
    "business document pack",
  ],
  icons: { icon: "/favicon.svg" },
  metadataBase: new URL("https://docketpack.com"),
  openGraph: {
    title: "DocketPack — Every Document Your Business Needs to Operate",
    description:
      "Generate every compliance, HR, legal, and safety document your business needs. Federal + state requirements. Packs from $79.",
    type: "website",
    locale: "en_US",
    siteName: "DocketPack",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocketPack — Every Document Your Business Needs to Operate",
    description:
      "Generate every compliance, HR, legal, and safety document your business needs. Federal + state requirements. Packs from $79.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&family=DM+Serif+Display&family=Lexend:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
