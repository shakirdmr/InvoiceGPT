import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import {
  organizationSchema,
  breadcrumbSchema,
  graphSchema,
} from "@/lib/seo/structured-data";
import { BASE_URL } from "@/lib/seo/config";
import { guides, GUIDE_CATEGORIES, type GuideCategory } from "@/lib/seo/data/guides";

export const metadata = genMeta({
  title: "GST Guides & Invoicing Tutorials for Indian Businesses",
  description:
    "Free GST guides for Indian shopkeepers and small businesses. Learn how to create GST invoices, understand GST rates, file returns, and more — in simple language.",
  path: "/guides",
  keywords: [
    "gst guide india",
    "gst invoicing tutorial",
    "gst help small business india",
    "how to gst invoice",
  ],
});

const breadcrumbItems = [
  { name: "Home", url: BASE_URL },
  { name: "GST Guides", url: `${BASE_URL}/guides` },
];

export default function GuidesHubPage() {
  const categories = Object.entries(GUIDE_CATEGORIES) as [GuideCategory, string][];

  return (
    <>
      <JsonLd
        data={graphSchema([
          organizationSchema(),
          breadcrumbSchema(breadcrumbItems),
        ])}
      />

      {/* ── HERO ── */}
      <section className="py-12 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} className="mb-5" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            GST Guides for Indian Shopkeepers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Free, easy-to-understand guides on GST invoicing, rates, registration, and compliance —
            written for small business owners, not accountants.
          </p>
        </div>
      </section>

      {/* ── GUIDES BY CATEGORY ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-12">
          {categories.map(([catKey, catLabel]) => {
            const catGuides = guides.filter((g) => g.category === catKey);
            if (catGuides.length === 0) return null;

            return (
              <div key={catKey}>
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {catLabel}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-400 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-black line-clamp-2">
                          {guide.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5 group-hover:text-gray-600" />
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {guide.readingTimeMinutes} min read
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
