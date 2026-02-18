import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo/config";
import { industrySlugs } from "@/lib/seo/data/industries";
import { citySlugs, priorityCities } from "@/lib/seo/data/cities";
import { guideSlugs } from "@/lib/seo/data/guides";

/**
 * Dynamic sitemap for InvoiceGPT.
 *
 * Page count breakdown:
 * - Core pages:                     ~8
 * - Guide pages:                    ~9
 * - Industry hub pages:             ~35
 * - Industry × city pages:          35 × 160+ = 5,600+
 *
 * For 100k+ pages, generate multiple sitemaps using sitemap index.
 * Each sitemap() function in Next.js returns up to 50,000 URLs.
 * Use generateSitemaps() + sitemap(id) pattern for larger sets.
 *
 * Current total: ~5,700 URLs — within the single sitemap limit.
 * When city count × industry count exceeds 50,000, split into
 * multiple sitemaps using the generateSitemaps() pattern below.
 */

const now = new Date().toISOString();
const LAST_MODIFIED_STATIC = "2025-01-10T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // ── Core static pages ────────────────────────────────────────────────────
  const corePages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/login`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${BASE_URL}/gst-invoice`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE_URL}/guides`, priority: 0.8, changeFrequency: "weekly" as const },
  ];

  for (const page of corePages) {
    urls.push({
      url: page.url,
      lastModified: LAST_MODIFIED_STATIC,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // ── Guide pages ──────────────────────────────────────────────────────────
  for (const slug of guideSlugs) {
    urls.push({
      url: `${BASE_URL}/guides/${slug}`,
      lastModified: LAST_MODIFIED_STATIC,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // ── Industry hub pages ───────────────────────────────────────────────────
  for (const industrySlug of industrySlugs) {
    urls.push({
      url: `${BASE_URL}/gst-invoice/${industrySlug}`,
      lastModified: LAST_MODIFIED_STATIC,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // ── Industry × City pages ─────────────────────────────────────────────────
  // Priority: Tier 1/2 cities (priorityCities) get higher priority
  const priorityCitySet = new Set(priorityCities);

  for (const industrySlug of industrySlugs) {
    for (const citySlug of citySlugs) {
      urls.push({
        url: `${BASE_URL}/gst-invoice/${industrySlug}/${citySlug}`,
        lastModified: LAST_MODIFIED_STATIC,
        changeFrequency: "monthly",
        priority: priorityCitySet.has(citySlug) ? 0.7 : 0.5,
      });
    }
  }

  return urls;
}

/**
 * ── SCALING TO 100,000+ PAGES ──────────────────────────────────────────────
 *
 * When total URLs exceed 50,000 (Next.js sitemap limit per file),
 * switch to the generateSitemaps() + id-based pattern:
 *
 * export async function generateSitemaps() {
 *   const totalPages = industrySlugs.length * citySlugs.length;
 *   const chunkSize = 49_000;
 *   const count = Math.ceil(totalPages / chunkSize);
 *   return Array.from({ length: count }, (_, i) => ({ id: i }));
 * }
 *
 * export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
 *   const chunkSize = 49_000;
 *   const start = id * chunkSize;
 *   // ... generate URLs for this chunk
 * }
 *
 * This produces /sitemap/0.xml, /sitemap/1.xml, etc., referenced by
 * a sitemap index at /sitemap.xml — all handled by Next.js automatically.
 */
