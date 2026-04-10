"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary, type Locale } from "@/lib/i18n";

const BLOG_API_URL =
  process.env.NEXT_PUBLIC_BLOG_API_URL || "https://fvb-blog-api.workers.dev";

export default function Header({ locale }: { locale: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogVisible, setBlogVisible] = useState(false);
  const t = getDictionary(locale);

  useEffect(() => {
    fetch(`${BLOG_API_URL}/settings?site=fvbarbitration`)
      .then((r) => r.json())
      .then((data) => {
        if (data.blog_menu_visible) setBlogVisible(true);
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { href: `/${locale}/`, label: t.nav.home },
    ...(blogVisible ? [{ href: `/${locale}/blog/`, label: t.nav.blog }] : []),
    { href: `/${locale}/algemene-voorwaarden/`, label: t.nav.terms },
    { href: `/${locale}/privacybeleid/`, label: t.nav.privacy },
  ];

  return (
    <header className="bg-sage-900 fixed top-0 z-50 w-full">
      <div className="flex items-center justify-between px-6 py-2 lg:px-10">
        <Link href={`/${locale}/`} className="flex shrink-0 items-center">
          <Image
            src={`/images/logo-inverted-${locale}.png`}
            alt="FVB Arbitrage"
            width={400}
            height={120}
            className="h-10 w-auto md:h-14"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav aria-label={locale === "en" ? "Main navigation" : locale === "fr" ? "Navigation principale" : "Hoofdnavigatie"} className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav aria-label={locale === "en" ? "Main navigation" : locale === "fr" ? "Navigation principale" : "Hoofdnavigatie"} className="bg-sage-900 border-sage-700 border-t px-6 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-sage-700 mt-2 border-t pt-3">
            <LanguageSwitcher locale={locale} />
          </div>
        </nav>
      )}
    </header>
  );
}
