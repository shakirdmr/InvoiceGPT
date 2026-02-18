import type { Metadata } from "next";
import { siteConfig } from "./config";

interface MetadataParams {
  title: string;
  description: string;
  /** Relative path, e.g. "/gst-invoice/medical-store/mumbai" */
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

/**
 * Generates fully-formed Next.js Metadata for any page.
 * Handles canonical, Open Graph, Twitter, and robots directives.
 */
export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
  keywords = [],
}: MetadataParams): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage ?? siteConfig.ogImage;
  const fullTitle = title.includes("InvoiceGPT")
    ? title
    : `${title} | InvoiceGPT`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: siteConfig.twitterHandle,
      images: [image],
    },
  };
}

/** Build a page title following a consistent pattern */
export function buildTitle(
  primary: string,
  secondary?: string,
): string {
  if (secondary) return `${primary} ${secondary} | InvoiceGPT`;
  return `${primary} | InvoiceGPT`;
}
