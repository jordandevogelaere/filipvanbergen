import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = getDictionary(loc);
  return {
    title: t.seo.privacy.title,
    description: t.seo.privacy.description,
    alternates: buildAlternates(loc, "privacybeleid/"),
    openGraph: buildOpenGraph(loc, t.seo.privacy.title, t.seo.privacy.description, "privacybeleid/"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacybeleidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <section className="pt-28 pb-20">
      <Container>
        <SectionHeading>{t.privacyTitle}</SectionHeading>
        {t.legalBanner && (
          <div className="mx-auto mb-8 max-w-3xl rounded-lg bg-blue-50 px-6 py-3 text-center text-sm text-blue-800">
            {t.legalBanner}
          </div>
        )}
        <div className="prose prose-gray mx-auto max-w-3xl">
          <h3>1. Algemeen</h3>
          <p>
            Deze Privacy Policy heeft tot doel u te informeren over de
            verwerkingen van persoonsgegevens die door FVB Arbitration /
            Arbitrage Filip van Bergen (hierna ook &ldquo;wij&rdquo; of
            &ldquo;ons&rdquo;) uitgevoerd worden.
          </p>
          <p>
            De verwerkingsverantwoordelijke is BV Advocatuur Bemiddeling &amp;
            Arbitrage Filip van Bergen, met ondernemingsnummer BE 0840.695.733,
            en adres Lange Leemstraat 55, 2018 Antwerpen. Wij verwerken uw
            persoonsgegevens overeenkomstig de AVG (Verordening (EU) 2016/679).
          </p>
          <h3>2. Persoonsgegevens die verwerkt worden</h3>
          <ul>
            <li>Identificatiegegevens: voor- en achternaam, adres, telefoonnummer, e-mailadres</li>
            <li>Beroep en betrekking</li>
            <li>Financiële bijzonderheden: bankrekeningnummer</li>
            <li>Overige persoonsgegevens die u actief verstrekt</li>
          </ul>
          <h3>3. Doeleinden van de verwerking</h3>
          <ul>
            <li>Uitvoering van de arbitrageovereenkomst</li>
            <li>Beheer van onze administratie</li>
            <li>Wettelijke verplichtingen</li>
          </ul>
          <h3>4. Beveiliging &amp; vertrouwelijkheid</h3>
          <p>
            Alle persoonsgegevens worden strikt vertrouwelijk behandeld. Wij
            verkopen uw gegevens niet aan derden.
          </p>
          <h3>5. Uw rechten</h3>
          <p>
            U beschikt over het recht op inzage, verbetering, verwijdering,
            beperking, overdraagbaarheid en verzet. Contacteer ons via{" "}
            <a href="mailto:info@fvbarbitration.com">info@fvbarbitration.com</a>.
          </p>
          <h3>6. Cookies</h3>
          <p>Wij gebruiken geen cookies.</p>
          <h3>7. Klachten</h3>
          <p>
            Gegevensbeschermingsautoriteit: Drukpersstraat 35, 1000 Brussel –{" "}
            <a href="mailto:contact@apd-gba.be">contact@apd-gba.be</a>
          </p>
          <h3>8. Contact</h3>
          <p>
            FVB Arbitration, Lange Leemstraat 55, 2018 Antwerpen –{" "}
            <a href="mailto:info@fvbarbitration.com">info@fvbarbitration.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
