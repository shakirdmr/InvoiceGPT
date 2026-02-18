import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/seo/structured-data";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Renders accessible breadcrumb navigation.
 * Pairs with breadcrumbSchema() in structured-data.ts for JSON-LD.
 *
 * @example
 * <Breadcrumbs items={[
 *   { name: "Home", url: "https://invoicegpt.org" },
 *   { name: "GST Invoice", url: "https://invoicegpt.org/gst-invoice" },
 *   { name: "Medical Store", url: "https://invoicegpt.org/gst-invoice/medical-store" },
 * ]} />
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1 text-sm text-gray-500 flex-wrap ${className}`}
    >
      <ol
        className="flex items-center gap-1 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={item.url}
              className="flex items-center gap-1"
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
            >
              {!isFirst && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
              )}
              {isFirst && (
                <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="text-gray-900 font-medium truncate max-w-[200px]"
                  itemProp="name"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-gray-700 transition-colors truncate max-w-[150px]"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
