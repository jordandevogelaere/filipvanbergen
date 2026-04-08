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
  const loc = locale as Locale;
  const t = getDictionary(loc);

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
          <ol>
            <li>
              ADVOCATENKANTOOR FILIP VAN BERGEN is de handelsbenaming van de BV
              Advocatuur Bemiddeling &amp; Arbitrage Filip van Bergen, waarvan de
              maatschappelijke zetel gevestigd te 2018 Antwerpen, Lange
              Leemstraat 55 en welke is ingeschreven bij Kruispuntbank van
              Ondernemingen onder het nummer BE 0840.695.733.
            </li>
            <li>
              Elke opdracht welke wordt toevertrouwd aan ADVOCATENKANTOOR FILIP
              VAN BERGEN zal worden uitgevoerd onder toepassing van huidige
              algemene voorwaarden en dit met uitdrukkelijke uitsluiting van
              eventuele algemene voorwaarden gehanteerd door de opdrachtgever,
              tenzij expliciet en schriftelijk anders is overeengekomen.
            </li>
            <li>
              ADVOCATENKANTOOR FILIP VAN BERGEN is de enige contractspartij voor
              de opdrachtgever en de advocaten verbonden aan ADVOCATENKANTOOR
              FILIP VAN BERGEN verrichten hun diensten in naam en voor rekening
              van ADVOCATENKANTOOR FILIP VAN BERGEN.
            </li>
            <li>
              Tenzij uit de aard van de opdracht en / of deelopdracht van de
              opdrachtgever zonder enige vorm van discussie blijkt dat het om een
              resultaatsverbintenis handelt, is de dienstverlening van
              ADVOCATENKANTOOR FILIP VAN BERGEN een inspanningsverbintenis.
            </li>
            <li>
              Iedere aansprakelijkheid van ADVOCATENKANTOOR FILIP VAN BERGEN voor
              een haar toerekenbare tekortkoming is beperkt tot het bedrag
              waarvoor zij verzekeringsdekking geniet. ADVOCATENKANTOOR FILIP VAN
              BERGEN is verzekerd via de door de Orde van Vlaamse Balies bij de
              maatschappij Amlin onderschreven aansprakelijkheidsverzekering voor
              een maximaal bedrag van 2.500.000,00 &euro;. De makelaar betreft
              Van Breda Risk &amp; Benefits, gevestigd te 2140 Borgerhout,
              Plantin en Moretuslei 297. Op eerste verzoek kan een exemplaar van
              deze verzekeringsovereenkomst worden voorgelegd. Indien geen
              verzekeringsdekking zou zijn verworven, is de aansprakelijkheid van
              ADVOCATENKANTOOR FILIP VAN BERGEN alleszins beperkt tot de
              bedragen welke zij voor haar concrete dienstverlening heeft
              ontvangen.
            </li>
            <li>
              De opdrachtgever machtigt ADVOCATENKANTOOR FILIP VAN BERGEN om,
              waar nodig, derden in te schakelen voor de realisatie van de
              dienstverlening. ADVOCATENKANTOOR FILIP VAN BERGEN zal hierbij
              zorgvuldig te werk gaan doch kan in geen geval aansprakelijk worden
              gesteld voor de handelingen van deze derden.
            </li>
            <li>
              Het is de opdrachtgever niet toegelaten, onder welke vorm dan ook,
              om de door ADVOCATENKANTOOR FILIP VAN BERGEN geproduceerde
              documenten aan te wenden buiten het doel van de overeengekomen
              dienstverlening.
            </li>
            <li>
              ADVOCATENKANTOOR FILIP VAN BERGEN is onderworpen aan de Wet van 11
              januari 1993 tot voorkoming van het gebruik van het financiële
              stelsel voor het witwassen van geld en de financiering van
              terrorisme. Op basis van de wettelijke identificatieplicht is
              ADVOCATENKANTOOR FILIP VAN BERGEN verplicht om de identiteit van de
              opdrachtgever te verifiëren en kan ADVOCATENKANTOOR FILIP VAN
              BERGEN hiertoe de nodige officiële documenten opvragen bij de
              opdrachtgever.
            </li>
            <li>
              De namens of voor de opdrachtgever ontvangen gelden worden door
              ADVOCATENKANTOOR FILIP VAN BERGEN aangehouden op een
              derdenrekening. Indien de ontvangen gelden niet onmiddellijk kunnen
              worden overgemaakt, aan hetzij de opdrachtgever, hetzij de
              derde(n) voor wie de gelden bestemd zijn, zal ADVOCATENKANTOOR
              FILIP VAN BERGEN de opdrachtgever hiervan onverwijld in kennis
              stellen met opgave van de reden van verhindering. Het is
              ADVOCATENKANTOOR FILIP VAN BERGEN toegestaan op de bedragen welke
              zij ontvangt voor rekening van haar opdrachtgever, de gelden in te
              houden welke de opdrachtgever haar verschuldigd is.
              ADVOCATENKANTOOR FILIP VAN BERGEN zal de opdrachtgever hiervan in
              kennis stellen.
            </li>
            <li>
              Al onze staten van kosten en erelonen en provisienota&apos;s zijn
              contant betaalbaar in Antwerpen, behoudens uitdrukkelijke
              andersluidende schriftelijke overeenkomst. Iedere vertraging in
              betaling brengt voor de cliënt de verplichting mee van rechtswege
              en zonder ingebrekestelling een interest te betalen van 1% per
              maand en dit ingaand op de dag na vervaldag. Elke aanmaning die
              door ons wordt verstuurd, brengt van rechtswege een extra kost van
              25 EUR per aanmaning met zich mee. Ingeval van gerechtelijke
              invordering zal een conventionele schadevergoeding van 10% op het
              gehele openstaande bedrag, alsmede de gerechtskosten in rekening
              worden gebracht. Eventuele klachten dienen per aangetekend
              schrijven te worden overgemaakt binnen tien dagen te rekenen vanaf
              de datum van de uitgeschreven staat van kosten en erelonen of
              provisienota.
            </li>
            <li>
              Op de dienstverlening verstrekt door ADVOCATENKANTOOR FILIP VAN
              BERGEN is uitsluitend het Belgisch recht van toepassing. Eventuele
              betwistingen ressorteren enkel onder de bevoegdheid van de
              Antwerpse rechtbanken, afdeling Antwerpen.
            </li>
          </ol>
        </div>
      </Container>
    </section>
  );
}
