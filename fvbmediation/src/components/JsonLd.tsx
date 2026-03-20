import { buildJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export default function JsonLd({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
    />
  );
}
