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
  const loc = locale as Locale;
  const t = getDictionary(loc);

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
            Deze &ldquo;Privacy Policy&rdquo; heeft tot doel u te informeren
            over de verwerkingen van persoonsgegevens die door het
            Advocatenkantoor Filip van Bergen (hierna ook &ldquo;wij&rdquo; of
            &ldquo;ons&rdquo;) uitgevoerd worden.
          </p>
          <p>
            De verwerkingsverantwoordelijke van uw persoonsgegevens is
            Advocatenkantoor Filip van Bergen, met ondernemingsnummer BE
            0840.695.733, en adres Lange Leemstraat 55, 2018 Antwerpen.
          </p>
          <p>
            Advocatenkantoor Filip van Bergen vindt de bescherming en de
            vertrouwelijkheid van uw persoonsgegevens uiterst belangrijk. Wij
            verbinden er ons toe om uw persoonsgegevens te verwerken
            overeenkomstig de toepasselijke wetgeving inzake de verwerking van
            persoonsgegevens, waaronder de Verordening (EU) 2016/679 (AVG/GDPR).
          </p>

          <h3>2. Definities</h3>
          <p>
            <strong>AVG:</strong> de Verordening (EU) 2016/679 van het Europees
            Parlement en Raad van 27 april 2016 betreffende de bescherming van
            natuurlijke personen in verband met de verwerking van
            persoonsgegevens (Algemene Verordening Gegevensbescherming).
          </p>
          <p>
            <strong>Betrokkene:</strong> elk geïdentificeerde of identificeerbaar
            natuurlijk persoon op wie de verwerkte persoonsgegevens betrekking
            hebben.
          </p>
          <p>
            <strong>Persoonsgegevens:</strong> alle informatie over een
            geïdentificeerde of identificeerbare natuurlijke persoon.
          </p>
          <p>
            <strong>Verwerkingsverantwoordelijke:</strong> Advocatenkantoor Filip
            van Bergen.
          </p>

          <h3>3. Persoonsgegevens die verwerkt worden</h3>
          <p>
            Afhankelijk van de aard van uw interactie met ons verwerken wij
            onder meer:
          </p>
          <ul>
            <li>
              Identificatiegegevens: voor- en achternaam, adres, telefoonnummer,
              e-mailadres
            </li>
            <li>Beroep en betrekking</li>
            <li>Financiële bijzonderheden: bankrekeningnummer</li>
            <li>
              Overige persoonsgegevens die u actief verstrekt in correspondentie,
              per e-mail en telefonisch
            </li>
          </ul>

          <h3>4. Bijzondere/gevoelige gegevens</h3>
          <p>
            In het kader van onze opdracht als advocaat verwerken wij gebeurlijk
            bijzondere en/of gevoelige persoonsgegevens, waaronder strafrechtelijk
            en gerechtelijk verleden, gegevens van personen jonger dan 16 jaar,
            en gegevens over gezondheid.
          </p>
          <p>
            Deze website heeft niet de intentie gegevens te verzamelen over
            websitebezoekers die jonger zijn dan 16 jaar.
          </p>

          <h3>5. Doeleinden van de verwerking</h3>
          <p>Wij verwerken uw persoonsgegevens voor:</p>
          <ul>
            <li>
              De uitvoering van een overeenkomst: levering en facturatie van
              diensten, beheer klantenadministratie
            </li>
            <li>
              Gerechtvaardigde belangen: verdediging in rechte,
              fraudepreventie, IT-beheer
            </li>
            <li>
              Wettelijke verplichtingen: fiscale verplichtingen, officiële
              verzoeken
            </li>
          </ul>
          <p>
            Uw persoonsgegevens zullen niet voor direct marketing worden
            gebruikt, tenzij u hiervoor een uitdrukkelijke toestemming heeft
            gegeven.
          </p>

          <h3>6. Duur van de verwerking</h3>
          <p>
            De persoonsgegevens worden bewaard voor een periode die noodzakelijk
            is in functie van de doeleinden van de verwerking en rekening
            houdende met de wettelijke verplichting om dossiers zes jaar te
            bewaren.
          </p>

          <h3>7. Beveiliging</h3>
          <p>
            Wij maken gebruik van diverse beveiligingstechnologieën en
            -maatregelen om uw gegevens op gepaste wijze te beschermen tegen
            ongeautoriseerde toegang, gebruik, verlies of openbaarmaking.
          </p>

          <h3>8. Vertrouwelijkheid</h3>
          <p>
            Alle persoonsgegevens worden strikt vertrouwelijk behandeld. Wij
            verkopen uw gegevens niet aan derden en verstrekken deze uitsluitend
            indien dit nodig is voor de uitvoering van onze wettelijke
            verplichtingen of de overeenkomst met u.
          </p>

          <h3>9. Uw rechten</h3>
          <p>U beschikt over de volgende rechten:</p>
          <ul>
            <li>Recht op toegang/inzage van uw persoonsgegevens</li>
            <li>Recht op verbetering</li>
            <li>Recht op verwijdering</li>
            <li>Recht op beperking van de verwerking</li>
            <li>Recht op overdraagbaarheid</li>
            <li>Recht op intrekking van toestemming</li>
            <li>Recht van verzet</li>
          </ul>
          <p>
            Wanneer u gebruik wil maken van deze rechten, kan u ons een
            verzoek bezorgen per e-mail naar{" "}
            <a href="mailto:info@fvbadvocaten.com">info@fvbadvocaten.com</a> of
            per post naar Advocatenkantoor Filip van Bergen, Lange Leemstraat
            55, 2018 Antwerpen.
          </p>

          <h3>10. Cookies</h3>
          <p>Wij gebruiken geen cookies.</p>

          <h3>11. Klachten</h3>
          <p>
            U heeft steeds het recht om een klacht in te dienen bij de
            Gegevensbeschermingsautoriteit: Drukpersstraat 35, 1000 Brussel –
            Tel: +32 (0)2 274 48 00 –{" "}
            <a href="mailto:contact@apd-gba.be">contact@apd-gba.be</a> –{" "}
            <a
              href="https://www.gegevensbeschermingsautoriteit.be"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.gegevensbeschermingsautoriteit.be
            </a>
          </p>

          <h3>12. Contactgegevens</h3>
          <p>
            Advocatenkantoor Filip van Bergen, Lange Leemstraat 55, 2018
            Antwerpen –{" "}
            <a href="mailto:info@fvbadvocaten.com">info@fvbadvocaten.com</a>
          </p>
        </div>
      </Container>
    </section>
  );
}
