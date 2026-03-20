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
    title: t.seo.terms.title,
    description: t.seo.terms.description,
    alternates: buildAlternates(loc, "algemene-voorwaarden/"),
    openGraph: buildOpenGraph(loc, t.seo.terms.title, t.seo.terms.description, "algemene-voorwaarden/"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AlgemeneVoorwaardenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <section className="pt-28 pb-20">
      <Container>
        <SectionHeading>{t.termsTitle}</SectionHeading>
        {t.legalBanner && (
          <div className="mx-auto mb-8 max-w-3xl rounded-lg bg-blue-50 px-6 py-3 text-center text-sm text-blue-800">
            {t.legalBanner}
          </div>
        )}
        <div className="prose prose-gray mx-auto max-w-3xl">
          <ul>
            <li>
              &ldquo;BEMIDDELING FILIP VAN BERGEN&rdquo; en &ldquo;FVB
              MEDIATION&rdquo; zijn handelsbenamingen van de BV Advocatuur
              Bemiddeling &amp; Arbitrage Filip van Bergen, waarvan de
              maatschappelijke zetel gevestigd te 2018 Antwerpen, Lange
              Leemstraat 55 en welke is ingeschreven bij Kruispuntbank van
              Ondernemingen onder het nummer BE 0840.695.733.
            </li>
            <li>
              Elke opdracht welke wordt toevertrouwd aan BV Advocatuur
              Bemiddeling &amp; Arbitrage Filip van Bergen zal worden uitgevoerd
              onder toepassing van huidige algemene voorwaarden en dit met
              uitdrukkelijke uitsluiting van eventuele algemene voorwaarden
              gehanteerd door de opdrachtgever, tenzij expliciet en schriftelijk
              anders is overeengekomen.
            </li>
            <li>
              BV Advocatuur Bemiddeling &amp; Arbitrage Filip van Bergen is de
              enige contractspartij voor de opdrachtgever en de advocaten
              verbonden aan BV Advocatuur Bemiddeling &amp; Arbitrage Filip van
              Bergen verrichten hun diensten in naam en voor rekening van BV
              Advocatuur Bemiddeling &amp; Arbitrage Filip van Bergen.
            </li>
            <li>
              Tenzij uit de aard van de opdracht en/of deelopdracht van de
              opdrachtgever zonder enige vorm van discussie blijkt dat het om een
              resultaatsverbintenis handelt, is de dienstverlening van BV
              Advocatuur Bemiddeling &amp; Arbitrage Filip van Bergen een
              inspanningsverbintenis.
            </li>
            <li>
              Iedere aansprakelijkheid van BV Advocatuur Bemiddeling &amp;
              Arbitrage Filip van Bergen voor een haar toerekenbare tekortkoming
              is beperkt tot het bedrag waarvoor zij verzekeringsdekking geniet.
              De vennootschap is verzekerd via de door de Orde van Vlaamse
              Balies bij de maatschappij Amlin onderschreven
              aansprakelijkheidsverzekering voor een maximaal bedrag van
              2.500.000,00 &euro;.
            </li>
            <li>
              De opdrachtgever machtigt BV Advocatuur Bemiddeling &amp;
              Arbitrage Filip van Bergen om, waar nodig, derden in te schakelen
              voor de realisatie van de dienstverlening.
            </li>
            <li>
              Het is de opdrachtgever niet toegelaten, onder welke vorm dan ook,
              om de geproduceerde documenten aan te wenden buiten het doel van de
              overeengekomen dienstverlening.
            </li>
            <li>
              Al onze staten van kosten en erelonen en provisienota&apos;s zijn
              contant betaalbaar in Antwerpen. Iedere vertraging in betaling
              brengt van rechtswege en zonder ingebrekestelling een interest van
              1% per maand met zich mee.
            </li>
            <li>
              Op de dienstverlening is uitsluitend het Belgisch recht van
              toepassing. Eventuele betwistingen ressorteren enkel onder de
              bevoegdheid van de Antwerpse rechtbanken, afdeling Antwerpen.
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
