import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import {
  softwareApplicationSchema,
  breadcrumbSchema,
  faqSchema,
  graphSchema,
} from "@/lib/seo/structured-data";
import { BASE_URL } from "@/lib/seo/config";
import {
  industryMap,
  industrySlugs,
  industries,
} from "@/lib/seo/data/industries";
import {
  priorityCities,
  citiesByState,
} from "@/lib/seo/data/cities";

// ── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ industry: slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industrySlug } = await params;
  const industry = industryMap.get(industrySlug);
  if (!industry) return {};

  return genMeta({
    title: `GST Invoice for ${industry.name} | Free Billing Software India`,
    description: `Create professional GST invoices for your ${industry.name.toLowerCase()} in 60 seconds. Auto-calculate CGST & SGST for ${industry.gstRates.join("%, ")}% GST. Download PDF and share on WhatsApp instantly.`,
    path: `/gst-invoice/${industry.slug}`,
    keywords: [
      `gst invoice ${industry.name.toLowerCase()} india`,
      `${industry.name.toLowerCase()} billing software`,
      `gst bill ${industry.name.toLowerCase()}`,
      `${industry.name.toLowerCase()} invoice maker india`,
    ],
  });
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: industrySlug } = await params;
  const industry = industryMap.get(industrySlug);
  if (!industry) notFound();

  const breadcrumbItems = [
    { name: "Home", url: BASE_URL },
    { name: "GST Invoice", url: `${BASE_URL}/gst-invoice` },
    { name: industry.name, url: `${BASE_URL}/gst-invoice/${industry.slug}` },
  ];

  // Related industries in same category (exclude self)
  const relatedIndustries = industries
    .filter((i) => i.category === industry.category && i.slug !== industry.slug)
    .slice(0, 6);

  // Top cities for this industry page (priority cities only)
  const topCities = priorityCities.slice(0, 24);

  return (
    <>
      <JsonLd
        data={graphSchema([
          softwareApplicationSchema(),
          breadcrumbSchema(breadcrumbItems),
          faqSchema(industry.faqs),
        ])}
      />

      {/* ── HERO ── */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} className="mb-5" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            GST Invoice Software for {industry.name} in India
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl leading-relaxed">
            {industry.description} Start free — your first 6 GST invoices cost nothing.
          </p>

          {/* GST Rates Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {industry.gstRates.map((rate) => (
              <span
                key={rate}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200"
              >
                {rate}% GST
              </span>
            ))}
            <span className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full border border-gray-200">
              Auto CGST + SGST
            </span>
          </div>

          <Link href="/login">
            <Button size="lg" className="gap-2">
              Create {industry.name} Invoice Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-12 px-4 bg-red-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            The GST Billing Challenges Every {industry.ownerTerm} Faces
          </h2>
          <div className="space-y-3">
            {industry.painPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-red-100 shadow-sm"
              >
                <span className="text-xl shrink-0">❌</span>
                <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-semibold text-gray-900">
            InvoiceGPT solves all of this — in 60 seconds from your phone.
          </p>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            How InvoiceGPT Helps Your {industry.name}
          </h2>
          <div className="space-y-4">
            {industry.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Create Your First {industry.name} GST Invoice in 3 Steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Sign in with Google",
                desc: "One click — no forms, no password. Your account is created instantly.",
              },
              {
                step: 2,
                title: `Add ${industry.name} Details`,
                desc: `Enter your items, quantities, and select the correct GST rate. CGST and SGST auto-calculated.`,
              },
              {
                step: 3,
                title: "Download & Share PDF",
                desc: "Get a professional PDF invoice. Share on WhatsApp with your customer in one tap.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-lg font-bold mb-3 shadow-lg">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Try Free Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {industry.name} GST Invoicing — Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {industry.faqs.map((faq) => (
              <div
                key={faq.q}
                className="border border-gray-200 rounded-xl p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITY GRID ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            {industry.name} GST Invoice by City
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Find GST invoicing guidance specific to your city and state.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {topCities.map((citySlug) => {
              // Find city object from citiesByState
              const cityName = citySlug
                .split("-")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ");
              return (
                <Link
                  key={citySlug}
                  href={`/gst-invoice/${industry.slug}/${citySlug}`}
                  className="text-center text-sm text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-2 hover:border-gray-400 transition-colors"
                >
                  {cityName}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RELATED INDUSTRIES ── */}
      {relatedIndustries.length > 0 && (
        <section className="py-12 px-4 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Related Business GST Invoicing
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedIndustries.map((related) => (
                <Link
                  key={related.slug}
                  href={`/gst-invoice/${related.slug}`}
                  className="group flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-400 transition-all"
                >
                  <span className="text-sm font-medium text-gray-900 group-hover:text-black">
                    {related.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0" />
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
            Your first 6 {industry.name} invoices are free
          </h2>
          <p className="text-gray-400 mb-6">
            No credit card. No accountant. No downloads. Just open the browser and start.
          </p>
          <Link href="/login">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
              Start Free Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
