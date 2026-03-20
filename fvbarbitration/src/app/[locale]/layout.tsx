import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = getDictionary(loc);

  return {
    title: {
      default: t.seo.home.title,
      template: `%s | ${t.seo.home.title.split(" | ")[0]}`,
    },
    description: t.seo.home.description,
    metadataBase: new URL(SITE_URL),
    alternates: buildAlternates(loc, ""),
    openGraph: buildOpenGraph(loc, t.seo.home.title, t.seo.home.description, ""),
    twitter: {
      card: "summary_large_image",
      title: t.seo.home.title,
      description: t.seo.home.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      <JsonLd locale={loc} />
      <Header locale={loc} />
      <main className="flex-1">{children}</main>
      <Footer locale={loc} />
    </>
  );
}
