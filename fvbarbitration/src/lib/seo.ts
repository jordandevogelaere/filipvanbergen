import { SITE_URL, SITE_NAME, CONTACT } from "./constants";
import { locales, htmlLang, type Locale } from "./i18n";

export function buildAlternates(locale: Locale, pagePath: string) {
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[htmlLang(loc)] = `${SITE_URL}/${loc}/${pagePath}`;
  }
  languages["x-default"] = `${SITE_URL}/nl/${pagePath}`;
  return {
    canonical: `${SITE_URL}/${locale}/${pagePath}`,
    languages,
  };
}

export function buildOpenGraph(
  locale: Locale,
  title: string,
  description: string,
  pagePath: string,
) {
  return {
    title,
    description,
    url: `${SITE_URL}/${locale}/${pagePath}`,
    siteName: SITE_NAME,
    locale: htmlLang(locale),
    type: "website" as const,
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  };
}

export function buildJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      locale === "en"
        ? "FVB Arbitration - Professional arbitration by Filip van Bergen for a fast, confidential and expert resolution of your disputes."
        : locale === "fr"
          ? "FVB Arbitrage - Arbitrage professionnel par Filip van Bergen pour un règlement rapide, confidentiel et expert de vos litiges."
          : "FVB Arbitrage - Professionele arbitrage door Filip van Bergen voor een snelle, vertrouwelijke en deskundige beslechting van uw geschillen.",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressLocality: CONTACT.city,
      postalCode: CONTACT.postalCode,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.2119,
      longitude: 4.4184,
    },
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "Netherlands" },
    ],
    availableLanguage: [
      { "@type": "Language", name: "Dutch" },
      { "@type": "Language", name: "English" },
      { "@type": "Language", name: "French" },
    ],
    founder: {
      "@type": "Person",
      name: "Filip van Bergen",
      jobTitle: "Arbiter",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Arbitration Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Arbitration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Construction Arbitration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "International Arbitration" } },
      ],
    },
  };
}
