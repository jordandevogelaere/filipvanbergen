import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/constants";
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
    title: t.seo.contact.title,
    description: t.seo.contact.description,
    alternates: buildAlternates(loc, "contact/"),
    openGraph: buildOpenGraph(loc, t.seo.contact.title, t.seo.contact.description, "contact/"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = getDictionary(loc);

  return (
    <>
      {/* Map + Contact info */}
      <section className="bg-navy-800 pt-28 pb-20 text-white">
        <Container>
          <SectionHeading light>{t.contact.title}</SectionHeading>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.8!2d4.4184!3d51.2119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f6f8f8f8f8f8%3A0x0!2sLange+Leemstraat+55%2C+2018+Antwerpen!5e0!3m2!1snl!2sbe!4v1"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Locatie Advocatenkantoor Filip van Bergen"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-heading mb-6 text-2xl font-bold">
                Advocatenkantoor Filip van Bergen
              </h3>
              <div className="space-y-4 text-white/80">
                <div>
                  <p className="mb-1 text-sm font-medium uppercase tracking-wide text-white/50">
                    {t.contact.addressLabel}
                  </p>
                  <p>
                    {CONTACT.address}
                    <br />
                    {CONTACT.postalCode} {CONTACT.city}
                    <br />
                    {CONTACT.country}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium uppercase tracking-wide text-white/50">
                    {t.contact.phoneLabel}
                  </p>
                  <p>
                    Mob:{" "}
                    <a
                      href={`tel:${CONTACT.mobile}`}
                      className="hover:text-white"
                    >
                      {CONTACT.mobile}
                    </a>
                  </p>
                  <p>
                    Tel:{" "}
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="hover:text-white"
                    >
                      {CONTACT.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium uppercase tracking-wide text-white/50">
                    {t.contact.emailLabel}
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="hover:text-white"
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium uppercase tracking-wide text-white/50">
                    {t.contact.companyLabel}
                  </p>
                  <p>{CONTACT.ondernemingsnummer}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <Container>
          <SectionHeading>{t.contact.sendMessage}</SectionHeading>
          <div className="mx-auto max-w-2xl">
            <ContactForm locale={loc} />
          </div>
        </Container>
      </section>

      {/* Street photo */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="/images/contact-street.jpg"
          alt="Straat Antwerpen"
          className="h-full w-full object-cover"
        />
        <div className="bg-navy-900/40 absolute inset-0" />
      </section>
    </>
  );
}
