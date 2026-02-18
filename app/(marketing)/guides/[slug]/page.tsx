import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { generateMetadata as genMeta } from "@/lib/seo/metadata";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graphSchema,
} from "@/lib/seo/structured-data";
import { BASE_URL } from "@/lib/seo/config";
import { guideMap, guideSlugs, guides } from "@/lib/seo/data/guides";

// ── Static Params ──────────────────────────────────────────────────────────

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideMap.get(slug);
  if (!guide) return {};

  return genMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
  });
}

// ── Page ──────────────────────────────────────────────────────────────────

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideMap.get(slug);
  if (!guide) notFound();

  const breadcrumbItems = [
    { name: "Home", url: BASE_URL },
    { name: "GST Guides", url: `${BASE_URL}/guides` },
    { name: guide.title, url: `${BASE_URL}/guides/${guide.slug}` },
  ];

  const relatedGuides = guide.relatedSlugs
    .map((s) => guideMap.get(s))
    .filter((g): g is NonNullable<typeof g> => g !== undefined);

  return (
    <>
      <JsonLd
        data={graphSchema([
          articleSchema({
            headline: guide.title,
            description: guide.description,
            url: `${BASE_URL}/guides/${guide.slug}`,
            datePublished: guide.datePublished,
            dateModified: guide.dateModified,
          }),
          breadcrumbSchema(breadcrumbItems),
          ...(guide.faqs.length > 0 ? [faqSchema(guide.faqs)] : []),
        ])}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* ── Breadcrumb ── */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />

        {/* ── Article Header ── */}
        <header className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3 block">
            {guide.category.replace(/-/g, " ")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            {guide.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {guide.readingTimeMinutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Updated{" "}
              {new Date(guide.dateModified).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* ── CTA Banner ── */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-white text-sm">
              Ready to create GST invoices?
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              First 6 invoices free — no credit card needed
            </p>
          </div>
          <Link href="/login">
            <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 gap-1.5 shrink-0">
              Start Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* ── Article Sections ── */}
        <article className="prose prose-gray max-w-none">
          {guide.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {section.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </article>

        {/* ── FAQ Section ── */}
        {guide.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {guide.faqs.map((faq) => (
                <div key={faq.q} className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Related Guides ── */}
        {relatedGuides.length > 0 && (
          <section className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Related GST Guides
            </h2>
            <div className="space-y-3">
              {relatedGuides.map((related) => (
                <Link
                  key={related.slug}
                  href={`/guides/${related.slug}`}
                  className="group flex items-start justify-between gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-400 transition-all"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm group-hover:text-black line-clamp-1">
                      {related.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {related.readingTimeMinutes} min read
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 mt-1 group-hover:text-gray-600" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Create your first GST invoice now
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            6 free invoices. No credit card. Works on any phone.
          </p>
          <Link href="/login">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 gap-2">
              Start Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
