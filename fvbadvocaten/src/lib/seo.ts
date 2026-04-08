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
    "@type": "LegalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      locale === "en"
        ? "Law Firm Filip van Bergen in Antwerp. Your trusted partner for legal advice and assistance."
        : locale === "fr"
          ? "Cabinet d'avocats Filip van Bergen à Anvers. Votre partenaire de confiance pour les conseils et l'assistance juridiques."
          : "Advocatenkantoor Filip van Bergen te Antwerpen. Uw vertrouwde partner voor juridisch advies en bijstand.",
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
      jobTitle: "Advocaat-partner",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name:
        locale === "en"
          ? "Practice Areas"
          : locale === "fr"
            ? "Domaines de pratique"
            : "Praktijkgebieden",
      itemListElement: (
        locale === "en"
          ? [
              "Liability Law",
              "Employment Law",
              "Construction Law",
              "Family Law",
              "Commercial Law",
              "Tenancy Law",
              "Insolvency Law",
              "Criminal Law",
              "Insurance Law",
              "Administrative Law",
              "Real Estate",
              "Condominium Law",
              "Debt Collection",
              "Leasing Companies",
            ]
          : locale === "fr"
            ? [
                "Droit de la responsabilité",
                "Droit du travail",
                "Droit de la construction",
                "Droit de la famille",
                "Droit commercial",
                "Droit du bail",
                "Droit de l'insolvabilité",
                "Droit pénal",
                "Droit des assurances",
                "Droit administratif",
                "Immobilier",
                "Copropriété",
                "Recouvrement",
                "Sociétés de leasing",
              ]
            : [
                "Aansprakelijkheidsrecht",
                "Arbeidsrecht",
                "Bouwrecht",
                "Familierecht",
                "Handelsrecht",
                "Huurrecht",
                "Insolventierecht",
                "Strafrecht",
                "Verzekeringsrecht",
                "Administratief recht",
                "Onroerend goed",
                "Appartementsrecht",
                "Incasso",
                "Leasingmaatschappijen",
              ]
      ).map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
}
