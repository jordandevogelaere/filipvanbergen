import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PracticeAreaCard from "@/components/PracticeAreaCard";
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
            <p className="text-lg leading-relaxed text-gray-600">
              {t.mission.p1}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {t.mission.p2}
            </p>
          </div>
        </Container>
      </section>

      {/* Practice Areas */}
      <section id="praktijkgebieden" className="bg-steel-100 py-20">
        <Container>
          <SectionHeading>{t.practiceAreas.title}</SectionHeading>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {t.practiceAreas.areas.map((area) => (
              <PracticeAreaCard key={area.title} {...area} />
            ))}
          </div>
        </Container>
      </section>

      {/* Wie is wie */}
      <section id="wie-is-wie" className="py-20">
        <Container>
          <SectionHeading>{t.whoIsWho.title}</SectionHeading>

          {/* Filip van Bergen - featured hero card */}
          <div className="bg-navy-800 mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-xl">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2">
                <img
                  src="/images/profile-filip.jpg"
                  alt="Filip van Bergen"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 text-white md:col-span-3 md:p-10">
                <h3 className="font-heading text-3xl font-bold tracking-wide">
                  Filip van Bergen
                </h3>
                <p className="mt-1 text-sm font-light uppercase tracking-[0.2em] text-white/60">
                  {t.whoIsWho.filip.role}
                </p>
                <div className="bg-accent mt-4 h-0.5 w-12" />
                <p className="mt-5 leading-relaxed text-white/80">
                  {t.whoIsWho.filip.bio}
                </p>
                <div className="mt-6 grid gap-x-6 gap-y-2 text-sm text-white/70 sm:grid-cols-2">
                  {t.whoIsWho.filip.credentials.map((c) => (
                    <p key={c}>
                      <span className="text-accent mr-1.5 inline-block">
                        &#8250;
                      </span>
                      {c}
                    </p>
                  ))}
                </div>
                <p className="mt-6 text-sm font-medium tracking-wide text-white/50">
                  {t.whoIsWho.filip.languages}
                </p>
              </div>
            </div>
          </div>

          {/* Advocaten */}
          <div className="mx-auto mt-16 max-w-5xl">
            <h4 className="text-navy-700 mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em]">
              {t.whoIsWho.advocaten}
            </h4>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Jonas Maes */}
              <div className="border-navy-700 flex gap-5 rounded-xl border-l-4 bg-white p-6 shadow-sm">
                <div className="bg-navy-800 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white">
                  JM
                </div>
                <div>
                  <h3 className="font-heading text-navy-800 text-lg font-bold">
                    Jonas Maes
                  </h3>
                  <p className="text-navy-500 text-xs font-medium uppercase tracking-wider">
                    {t.whoIsWho.jonas.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t.whoIsWho.jonas.bio}
                  </p>
                  <p className="mt-3 text-xs font-medium tracking-wide text-gray-400">
                    {t.whoIsWho.jonas.languages}
                  </p>
                </div>
              </div>

              {/* Alec Reijntjes */}
              <div className="border-navy-700 flex gap-5 rounded-xl border-l-4 bg-white p-6 shadow-sm">
                <div className="bg-navy-800 flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white">
                  AR
                </div>
                <div>
                  <h3 className="font-heading text-navy-800 text-lg font-bold">
                    Alec Reijntjes
                  </h3>
                  <p className="text-navy-500 text-xs font-medium uppercase tracking-wider">
                    {t.whoIsWho.alec.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t.whoIsWho.alec.bio1}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {t.whoIsWho.alec.bio2}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support team */}
          <div className="mx-auto mt-16 max-w-5xl">
            <h4 className="text-navy-700 mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em]">
              {t.whoIsWho.team}
            </h4>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border-steel-300 flex gap-4 rounded-xl border-l-4 bg-white p-6 shadow-sm">
                <div className="bg-navy-700 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  ND
                </div>
                <div>
                  <h3 className="font-heading text-navy-800 font-bold">
                    Niels Decrock
                  </h3>
                  <p className="text-navy-500 text-xs font-medium uppercase tracking-wider">
                    {t.whoIsWho.niels.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t.whoIsWho.niels.bio}
                  </p>
                </div>
              </div>

              <div className="border-steel-300 flex gap-4 rounded-xl border-l-4 bg-white p-6 shadow-sm">
                <div className="bg-navy-700 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  XB
                </div>
                <div>
                  <h3 className="font-heading text-navy-800 font-bold">
                    Xander Buylaert
                  </h3>
                  <p className="text-navy-500 text-xs font-medium uppercase tracking-wider">
                    {t.whoIsWho.xander.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t.whoIsWho.xander.bio}
                  </p>
                </div>
              </div>

              <div className="border-steel-300 flex gap-4 rounded-xl border-l-4 bg-white p-6 shadow-sm">
                <div className="bg-navy-700 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  KS
                </div>
                <div>
                  <h3 className="font-heading text-navy-800 font-bold">
                    Kaylee Smagge
                  </h3>
                  <p className="text-navy-500 text-xs font-medium uppercase tracking-wider">
                    {t.whoIsWho.kaylee.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {t.whoIsWho.kaylee.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services highlight strip */}
      <section className="bg-navy-700 py-20 text-white">
        <Container>
          <div className="grid gap-12 md:grid-cols-3">
            {t.services.items.map((svc) => (
              <div key={svc.title} className="text-center">
                <h3 className="font-heading mb-3 text-xl font-bold">
                  {svc.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">
                  {svc.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Street photo */}
      <section className="relative h-64 overflow-hidden">
        <img
          src="/images/contact-street.jpg"
          alt="Straat Antwerpen"
          className="h-full w-full object-cover"
        />
      </section>

      {/* Contact section on home */}
      <section id="contact" className="py-20">
        <Container>
          <SectionHeading>{t.contact.title}</SectionHeading>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 text-center text-gray-600">
              <p>
                {CONTACT.address}, B - {CONTACT.postalCode} {CONTACT.city}
              </p>
              <p>
                Mob:{" "}
                <a
                  href={`tel:${CONTACT.mobile}`}
                  className="text-navy-700 hover:underline"
                >
                  {CONTACT.mobile}
                </a>
                {" | "}
                Tel:{" "}
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-navy-700 hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-navy-700 hover:underline"
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
