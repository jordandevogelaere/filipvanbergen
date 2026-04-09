import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import LatestPosts from "@/components/LatestPosts";
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

      {/* Specialties */}
      <section className="bg-tan-700 py-20 text-white">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
            <div className="text-center">
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white/20">
                <img
                  src="/images/specialty-construction.jpg"
                  alt={t.specialties.construction.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-4 text-xl font-bold">{t.specialties.construction.title}</h3>
              <p className="text-sm leading-relaxed text-white/80">{t.specialties.construction.description}</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-white/20">
                <img
                  src="/images/specialty-commercial.jpg"
                  alt={t.specialties.commercial.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-4 text-xl font-bold">{t.specialties.commercial.title}</h3>
              <p className="text-sm leading-relaxed text-white/80">{t.specialties.commercial.description}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20">
        <Container>
          <LatestPosts locale={loc} />
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
                  className="text-tan-700 hover:underline"
                >
                  {CONTACT.mobile}
                </a>
                {" | "}
                Tel:{" "}
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-tan-700 hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-tan-700 hover:underline"
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
