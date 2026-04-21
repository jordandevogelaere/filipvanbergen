import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import PracticeAreaGrid from "@/components/PracticeAreaGrid";
import ContactForm from "@/components/ContactForm";
import LatestPosts from "@/components/LatestPosts";
import { CONTACT } from "@/lib/constants";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { fetchEmployees, type Employee } from "@/lib/blog-api";

function PartnerCard({ employee, locale }: { employee: Employee; locale: Locale }) {
  const t = employee.translations[locale] ?? employee.translations["nl"];
  if (!t) return null;
  const paragraphs = t.bio ? t.bio.split("\n").filter(Boolean) : [];

  return (
    <div className="bg-navy-800 mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-xl">
      <div className="p-8 md:p-10">
        <div className="flex items-start gap-6">
          {employee.photo_url ? (
            <img
              src={employee.photo_url}
              alt={employee.name}
              width={150}
              height={150}
              className="h-24 w-24 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="bg-navy-600 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white">
              {employee.initials}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-heading text-3xl font-bold tracking-wide text-white">
              {employee.name}
            </h3>
            <p className="mt-1 text-sm font-light uppercase tracking-[0.2em] text-white/60">
              {t.role}
            </p>
          </div>
        </div>
        <div className="bg-accent mt-4 h-0.5 w-12" />
        {paragraphs.length > 0 && (
          <div className="mt-5 space-y-4 leading-relaxed text-white/80">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmployeeCard({
  employee,
  locale,
  variant,
}: {
  employee: Employee;
  locale: Locale;
  variant: "advocaten" | "team";
}) {
  const t = employee.translations[locale] ?? employee.translations["nl"];
  if (!t) return null;

  const borderClass = variant === "advocaten" ? "border-navy-700" : "border-steel-300";
  const avatarClass = variant === "advocaten" ? "bg-navy-800 h-14 w-14 text-lg" : "bg-navy-700 h-12 w-12 text-sm";

  return (
    <div className={`${borderClass} flex gap-5 rounded-xl border-l-4 bg-white p-6 shadow-sm`}>
      <div className={`${avatarClass} flex shrink-0 items-center justify-center rounded-full font-bold text-white`}>
        {employee.initials}
      </div>
      <div>
        <h3 className={`font-heading text-navy-800 font-bold ${variant === "advocaten" ? "text-lg" : ""}`}>
          {employee.name}
        </h3>
        <p className="text-navy-500 text-xs font-medium uppercase tracking-wider">{t.role}</p>
        {t.bio && (
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{t.bio}</p>
        )}
        {t.languages && (
          <p className="mt-3 text-xs font-medium tracking-wide text-gray-400">{t.languages}</p>
        )}
      </div>
    </div>
  );
}

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

  const allEmployees = await fetchEmployees();
  const partner = allEmployees.find((e) => e.group === "partner");
  const advocaten = allEmployees.filter((e) => e.group === "advocaten");
  const team = allEmployees.filter((e) => e.group === "team");

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
          <PracticeAreaGrid areas={t.practiceAreas.areas.slice(0, -2)} />

          {/* Incasso & Leasing – featured blocks */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {t.practiceAreas.areas.slice(-2).map((area) => (
              <PracticeAreaCard key={area.title} {...area} variant="block" />
            ))}
          </div>
        </Container>
      </section>

      {/* Wie is wie */}
      <section id="wie-is-wie" className="py-20">
        <Container>
          <SectionHeading>{t.whoIsWho.title}</SectionHeading>

          {/* Partner — featured hero card */}
          {partner && (
            <PartnerCard employee={partner} locale={loc} />
          )}

          {/* Advocaten */}
          {advocaten.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl">
              <h4 className="text-navy-700 mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em]">
                {t.whoIsWho.advocaten}
              </h4>
              <div className="grid gap-8 md:grid-cols-2">
                {advocaten.map((emp) => (
                  <EmployeeCard key={emp.id} employee={emp} locale={loc} variant="advocaten" />
                ))}
              </div>
            </div>
          )}

          {/* Support team */}
          {team.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl">
              <h4 className="text-navy-700 mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em]">
                {t.whoIsWho.team}
              </h4>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((emp) => (
                  <EmployeeCard key={emp.id} employee={emp} locale={loc} variant="team" />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20">
        <Container>
          <LatestPosts locale={loc} />
        </Container>
      </section>

      {/* Street photo */}
      <section className="relative h-64 overflow-hidden">
        <img
          src="/images/contact-street.jpg"
          alt="Straat Antwerpen"
          width={1920}
          height={1440}
          className="h-full w-full object-cover"
        />
      </section>

      {/* Vacatures */}
      <section id="contact" className="bg-navy-800 py-20 text-white">
        <Container>
          <SectionHeading light>{t.vacatures.title}</SectionHeading>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-white/80">
              {t.vacatures.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-20">
        <Container>
          <SectionHeading>{t.vacatures.cta}</SectionHeading>
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
