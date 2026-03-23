import Image from "next/image";
import { CONTACT } from "@/lib/constants";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-harbor.png"
        alt={locale === "en" ? "Port of Antwerp" : locale === "fr" ? "Port d'Anvers" : "Haven van Antwerpen"}
        fill
        className="object-cover object-top"
        priority
      />
      <div className="bg-sage-900/70 absolute inset-0" />

      <div className="relative z-10 px-4 text-center text-white">
        <h1 className="mb-2 text-5xl font-extralight tracking-[0.15em] md:text-7xl">
          FILIP{" "}
          <span className="text-3xl font-extralight tracking-[0.15em] md:text-5xl">
            VAN
          </span>{" "}
          BERGEN
        </h1>
        <p className="mb-10 text-xl font-light italic tracking-[0.2em] md:text-2xl">
          {t.hero.subtitle}
        </p>

        <div className="space-y-1 text-sm font-light leading-relaxed tracking-wide text-white/80 md:text-base">
          <p>
            Mob:{" "}
            <a href={`tel:${CONTACT.mobile}`} className="hover:text-white">
              {CONTACT.mobile}
            </a>
          </p>
          <p>
            Tel:{" "}
            <a href={`tel:${CONTACT.phone}`} className="hover:text-white">
              {CONTACT.phone}
            </a>
          </p>
          <p>{CONTACT.address}</p>
          <p>
            B - {CONTACT.postalCode} {CONTACT.city}
          </p>
          <p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hover:text-white"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
