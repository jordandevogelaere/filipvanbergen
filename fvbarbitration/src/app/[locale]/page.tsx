import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import AdvantageCard from "@/components/AdvantageCard";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/constants";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

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
    title: t.seo.home.title,
    description: t.seo.home.description,
    alternates: buildAlternates(loc, ""),
    openGraph: buildOpenGraph(loc, t.seo.home.title, t.seo.home.description, ""),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = getDictionary(loc);

  return (
    <>
      <Hero locale={loc} />

      {/* Mission Statement */}
      <section className="py-20">
        <Container>
          <SectionHeading>{t.mission.title}</SectionHeading>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-gray-600">{t.mission.p1}</p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">{t.mission.p2}</p>
          </div>
        </Container>
      </section>

      {/* Advantages */}
      <section className="bg-sage-100 py-20">
        <Container>
          <SectionHeading>{t.advantages.title}</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.advantages.items.map((adv) => (
              <AdvantageCard key={adv.title} {...adv} />
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-20">
        <Container>
          <SectionHeading>{t.contact.title}</SectionHeading>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center text-gray-600">
              <p>
                {CONTACT.address}, {CONTACT.postalCode} {CONTACT.city}
              </p>
              <p>
                Mob:{" "}
                <a
                  href={`tel:${CONTACT.mobile}`}
                  className="text-sage-700 hover:underline"
                >
                  {CONTACT.mobile}
                </a>
                {" | "}
                Tel:{" "}
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-sage-700 hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sage-700 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
            </div>
            <ContactForm locale={loc} />
          </div>
        </Container>
      </section>
    </>
  );
}
