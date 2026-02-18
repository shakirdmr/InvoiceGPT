import type { JsonLdObject } from "@/lib/seo/structured-data";

interface JsonLdProps {
  data: JsonLdObject | JsonLdObject[];
}

/**
 * Renders one or more JSON-LD structured data objects as <script> tags.
 * Safe: content is serialized, never rendered as HTML.
 * Supports passing an array to emit multiple <script> blocks.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
