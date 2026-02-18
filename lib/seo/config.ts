export const siteConfig = {
  name: "InvoiceGPT",
  url: "https://invoicegpt.org",
  description:
    "Create professional GST invoices in 60 seconds. Built for Indian shopkeepers and small businesses. Auto-calculate CGST & SGST. Download PDF instantly.",
  tagline: "GST Invoices in 60 Seconds",
  ogImage: "https://invoicegpt.org/og.png",
  twitterHandle: "@invoicegpt",
  locale: "en_IN",
  pricingMonthly: 399,
  trialInvoices: 6,
} as const;

export const BASE_URL = siteConfig.url;
