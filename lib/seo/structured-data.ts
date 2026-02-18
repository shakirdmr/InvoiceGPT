import { siteConfig } from "./config";

export type JsonLdObject = Record<string, unknown>;

// ── Organization ──────────────────────────────────────────────────────────────

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: "2024",
    areaServed: "IN",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

// ── SoftwareApplication ───────────────────────────────────────────────────────

export function softwareApplicationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    url: siteConfig.url,
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: siteConfig.pricingMonthly,
      priceCurrency: "INR",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "500",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ── FAQPage ───────────────────────────────────────────────────────────────────

export function faqSchema(
  faqs: { q: string; a: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── WebPage ───────────────────────────────────────────────────────────────────

export function webPageSchema({
  name,
  description,
  url,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: BreadcrumbItem[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(breadcrumbs && {
      breadcrumb: breadcrumbSchema(breadcrumbs),
    }),
  };
}

// ── LocalBusiness (for city+industry pages) ───────────────────────────────────

export function localBusinessSchema({
  name,
  description,
  city,
  state,
  url,
}: {
  name: string;
  description: string;
  city: string;
  state: string;
  url: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: state,
        containedInPlace: {
          "@type": "Country",
          name: "India",
        },
      },
    },
  };
}

// ── Article (for guide pages) ─────────────────────────────────────────────────

export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

// ── Combine multiple schemas ───────────────────────────────────────────────────

/** Wrap multiple JSON-LD objects in a @graph for a single <script> tag */
export function graphSchema(schemas: JsonLdObject[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map(({ "@context": _ctx, ...rest }) => rest),
  };
}
