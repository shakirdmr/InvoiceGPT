import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { siteConfig } from "@/lib/seo/config";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "InvoiceGPT — GST Invoices in 60 Seconds",
    template: "%s | InvoiceGPT",
  },
  description:
    "Create professional GST invoices instantly. Built for small businesses and shopkeepers in India. Auto-calculate CGST & SGST. Mobile-friendly, fast, and affordable.",
  keywords: [
    "GST invoice",
    "invoice generator India",
    "billing software India",
    "small business invoice",
    "free GST invoice maker",
    "gst billing app India",
    "CGST SGST calculator",
  ],
  authors: [{ name: "InvoiceGPT" }],
  creator: "InvoiceGPT",
  publisher: "InvoiceGPT",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "InvoiceGPT — GST Invoices in 60 Seconds",
    description:
      "Create professional GST invoices instantly. Built for small businesses and shopkeepers in India. Auto-calculate CGST & SGST.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "InvoiceGPT — GST Invoices in 60 Seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceGPT — GST Invoices in 60 Seconds",
    description:
      "Create professional GST invoices instantly. Auto-calculate CGST & SGST. Built for Indian shopkeepers.",
    site: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  verification: {
    google: "BJNGOyVn5iH4at0pBq4KucZzLNoHt27lD9PHjeIUfwU",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
