"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchedPath(target: Locale) {
    // Replace /nl/... with /en/... etc.
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}/`;
  }

  return (
    <div className="flex items-center gap-1 text-xs font-medium tracking-wide">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-white/30">|</span>}
          {l === locale ? (
            <span className="text-white">{localeLabels[l]}</span>
          ) : (
            <Link
              href={switchedPath(l)}
              className="text-white/50 transition hover:text-white"
            >
              {localeLabels[l]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
