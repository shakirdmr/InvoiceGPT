import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import {
  softwareApplicationSchema,
  breadcrumbSchema,
  organizationSchema,
  graphSchema,
} from "@/lib/seo/structured-data";
import { BASE_URL } from "@/lib/seo/config";
import { industries, INDUSTRY_CATEGORIES, type IndustryCategory } from "@/lib/seo/data/industries";

export const metadata = genMeta({
  title: "GST Invoice Software for Every Business in India",
  description:
    "Professional GST invoicing software for 35+ industries in India. Auto-calculate CGST & SGST, download PDF, and share on WhatsApp. Start free — no credit card needed.",
  path: "/gst-invoice",
  keywords: [
    "gst invoice software india",
    "online gst billing",
    "gst invoice maker india",
    "gst billing software",
  ],
});

const breadcrumbItems = [
  { name: "Home", url: BASE_URL },
  { name: "GST Invoice", url: `${BASE_URL}/gst-invoice` },
];

export default function GstInvoiceHubPage() {
  const categories = Object.entries(INDUSTRY_CATEGORIES) as [IndustryCategory, string][];

  return (
    <>
      <JsonLd
        data={graphSchema([
          organizationSchema(),
          softwareApplicationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ])}
      />

      {/* ── HERO ── */}
      <section className="py-14 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            GST Invoice Software for Every Business in India
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl">
            Create GST-compliant invoices in 60 seconds — auto-calculate CGST & SGST, download PDF, share on WhatsApp.
            Works for 35+ business types across India.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "Auto CGST & SGST calculation",
              "PDF download in one tap",
              "Works on any phone",
              "6 free invoices",
            ].map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {point}
              </span>
            ))}
          </div>
          <Link href="/login">
            <Button size="lg" className="gap-2">
              Start Free — No Credit Card <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── INDUSTRY CATEGORIES ── */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            GST Invoicing by Industry
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Choose your business type for tailored GST invoice guidance and templates.
          </p>

          <div className="space-y-10">
            {categories.map(([catKey, catLabel]) => {
              const catIndustries = industries.filter((i) => i.category === catKey);
              if (catIndustries.length === 0) return null;

              return (
                <div key={catKey}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    {catLabel}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {catIndustries.map((industry) => (
                      <Link
                        key={industry.slug}
                        href={`/gst-invoice/${industry.slug}`}
                        className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-400 hover:shadow-sm transition-all"
                      >
                        <p className="font-medium text-gray-900 text-sm group-hover:text-black">
                          {industry.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          GST Invoice
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY INVOICEGPT ── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Why InvoiceGPT for GST Billing?
          </h2>
          <p className="text-gray-500 mb-10">
            Built specifically for Indian shopkeepers and small businesses — not accountants.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Works on Your Phone",
                desc: "No app to install. Open in Chrome or Safari on any Android or iPhone — create invoices right at your counter.",
              },
              {
                title: "Auto GST Calculation",
                desc: "Pick the GST rate for each item. CGST and SGST are calculated and shown automatically. No maths needed.",
              },
              {
                title: "PDF in One Tap",
                desc: "Download a professional PDF and share it on WhatsApp with your customer in under 10 seconds.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-4 bg-gray-900 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">
            Start Creating GST Invoices Free
          </h2>
          <p className="text-gray-400 mb-6">
            First 6 invoices completely free. No credit card. No downloads.
          </p>
          <Link href="/login">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
