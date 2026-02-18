import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import {
  softwareApplicationSchema,
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  graphSchema,
} from "@/lib/seo/structured-data";
import { BASE_URL } from "@/lib/seo/config";
import { industryMap, industrySlugs, industries } from "@/lib/seo/data/industries";
import { cityMap, citySlugs, citiesByState } from "@/lib/seo/data/cities";

// ── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  const params: { industry: string; city: string }[] = [];
  for (const industrySlug of industrySlugs) {
    for (const citySlug of citySlugs) {
      params.push({ industry: industrySlug, city: citySlug });
    }
  }
  return params;
}

// ── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string; city: string }>;
}) {
  const { industry: industrySlug, city: citySlug } = await params;
  const industry = industryMap.get(industrySlug);
  const city = cityMap.get(citySlug);
  if (!industry || !city) return {};

  return genMeta({
    title: `GST Invoice for ${industry.name} in ${city.name} | InvoiceGPT`,
    description: `Create GST-compliant invoices for your ${industry.name.toLowerCase()} in ${city.name}, ${city.state}. Auto-calculate CGST & SGST. Download PDF and share on WhatsApp. Start free.`,
    path: `/gst-invoice/${industry.slug}/${city.slug}`,
    keywords: [
      `gst invoice ${industry.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `${industry.name.toLowerCase()} billing software ${city.name.toLowerCase()}`,
      `gst bill ${city.name.toLowerCase()} ${industry.name.toLowerCase()}`,
      `invoice maker ${city.name.toLowerCase()} india`,
    ],
  });
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function IndustryCityPage({
  params,
}: {
  params: Promise<{ industry: string; city: string }>;
}) {
  const { industry: industrySlug, city: citySlug } = await params;
  const industry = industryMap.get(industrySlug);
  const city = cityMap.get(citySlug);
  if (!industry || !city) notFound();

  const breadcrumbItems = [
    { name: "Home", url: BASE_URL },
    { name: "GST Invoice", url: `${BASE_URL}/gst-invoice` },
    { name: industry.name, url: `${BASE_URL}/gst-invoice/${industry.slug}` },
    { name: city.name, url: `${BASE_URL}/gst-invoice/${industry.slug}/${city.slug}` },
  ];

  // Other cities in same state for internal linking
  const nearbyCities = (citiesByState[city.state] ?? [])
    .filter((c) => c.slug !== city.slug)
    .slice(0, 8);

  // Related industries in same category
  const relatedIndustries = industries
    .filter((i) => i.category === industry.category && i.slug !== industry.slug)
    .slice(0, 4);

  // City-specific FAQs that override or supplement industry FAQs
  const cityFaqs = [
    {
      q: `Is InvoiceGPT available for ${industry.plural} in ${city.name}?`,
      a: `Yes. InvoiceGPT works for any ${industry.name.toLowerCase()} in ${city.name} — or anywhere else in India. It's a web app that runs in your phone's browser. No installation needed.`,
    },
    {
      q: `What GST rates do ${industry.plural} in ${city.state} charge?`,
      a: `${industry.plural.charAt(0).toUpperCase() + industry.plural.slice(1)} in ${city.state} follow the same GST rates as the rest of India: ${industry.gstRates.join("%, ")}% depending on the product or service. InvoiceGPT auto-calculates CGST and SGST for ${city.state}-based transactions.`,
    },
    ...industry.faqs.slice(0, 2),
  ];

  return (
    <>
      <JsonLd
        data={graphSchema([
          softwareApplicationSchema(),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(cityFaqs),
          localBusinessSchema({
            name: `${industry.name} GST Invoice — ${city.name}`,
            description: `Professional GST invoicing software for ${industry.plural} in ${city.name}, ${city.state}.`,
            city: city.name,
            state: city.state,
            url: `${BASE_URL}/gst-invoice/${industry.slug}/${city.slug}`,
          }),
        ])}
      />

      {/* ── HERO ── */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} className="mb-5" />

          {/* Location pill */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{city.name}, {city.state}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            GST Invoice Software for {industry.name} in {city.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl leading-relaxed">
            Running a {industry.name.toLowerCase()} in {city.name}? Create professional GST-compliant invoices
            in under 60 seconds. Auto-calculate CGST & SGST for {city.state}. Download PDF and share on WhatsApp.
          </p>

          {/* GST Rate + Location badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {industry.gstRates.map((rate) => (
              <span
                key={rate}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200"
              >
                {rate}% GST auto-calculated
              </span>
            ))}
            <span className="px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full border border-green-200">
              Works in {city.name}
            </span>
          </div>

          <Link href="/login">
            <Button size="lg" className="gap-2">
              Create Free GST Invoice for {city.name} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <p className="text-xs text-gray-500 mt-3">
            6 invoices free · No credit card · Works on any phone
          </p>
        </div>
      </section>

      {/* ── WHY FOR THIS CITY ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            GST Invoicing Made Easy for {city.name} {industry.plural}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: `Works in ${city.state}`,
                desc: `InvoiceGPT correctly calculates CGST and SGST for intra-state transactions within ${city.state}. Your invoices are fully GST-compliant for ${city.name} businesses.`,
              },
              {
                title: "Mobile-First for Busy Shops",
                desc: `Create invoices on your phone at your ${city.name} shop counter — no PC required. Works on any Android or iPhone, even with basic internet.`,
              },
              ...industry.benefits.slice(0, 2).map((benefit) => ({
                title: "Industry-Specific Feature",
                desc: benefit,
              })),
            ].map((card, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            GST Invoicing for {industry.name} in {city.name} — FAQs
          </h2>
          <div className="space-y-4">
            {cityFaqs.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEARBY CITIES ── */}
      {nearbyCities.length > 0 && (
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              {industry.name} GST Invoice — Other Cities in {city.state}
            </h2>
            <div className="flex flex-wrap gap-2">
              {nearbyCities.map((nearbyCity) => (
                <Link
                  key={nearbyCity.slug}
                  href={`/gst-invoice/${industry.slug}/${nearbyCity.slug}`}
                  className="text-sm text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-400 transition-colors"
                >
                  {nearbyCity.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED INDUSTRIES ── */}
      {relatedIndustries.length > 0 && (
        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              Related GST Invoicing in {city.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {relatedIndustries.map((related) => (
                <Link
                  key={related.slug}
                  href={`/gst-invoice/${related.slug}/${city.slug}`}
                  className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-400 transition-colors"
                >
                  {related.name} Invoice
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ── */}
      <section className="py-14 px-4 bg-gray-900 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">
            Start creating GST invoices in {city.name}
          </h2>
          <p className="text-gray-400 mb-6">
            6 free invoices. No credit card. No downloads. Works on your phone right now.
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
