import Link from "next/link";
import { CONTACT, SITE_NAME } from "@/lib/constants";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="bg-tan-900 text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">{SITE_NAME}</h3>
            <p className="text-sm leading-relaxed">
              {CONTACT.address}
              <br />
              {CONTACT.postalCode} {CONTACT.city}
              <br />
              {CONTACT.country}
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">
              {t.contact.title}
            </h3>
            <p className="text-sm leading-relaxed">
              <a href={`tel:${CONTACT.phone}`} className="hover:text-white">
                {CONTACT.phone}
              </a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">
              {t.footer.accounts}
            </h3>
            <p className="text-sm leading-relaxed">
              {t.footer.officeAccount}:
              <br />
              IBAN BE08 6451 0409 8213
              <br />
              (Bank J. Van Breda &amp; C°)
              <br />
              <br />
              {t.footer.thirdPartyAccount}:
              <br />
              IBAN BE43 6304 0052 6601
              <br />
              (ING)
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold text-white">
              {t.footer.legal}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href={`/${locale}/algemene-voorwaarden/`}
                className="hover:text-white"
              >
                {t.footer.terms}
              </Link>
              <Link
                href={`/${locale}/privacybeleid/`}
                className="hover:text-white"
              >
                {t.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-tan-700 mt-8 border-t pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} {SITE_NAME}. {t.footer.rights}
          <br />
          <span className="text-white/40">{CONTACT.ondernemingsnummer}</span>
        </div>
      </div>
    </footer>
  );
}
