"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const t = getDictionary(locale);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="bg-navy-900 fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 px-4 py-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-white/80">
          {t.cookieBanner.text}{" "}
          <Link
            href={`/${locale}/privacybeleid/`}
            className="text-accent underline hover:text-white"
          >
            {t.cookieBanner.privacyLink}
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="bg-accent hover:bg-accent/80 shrink-0 rounded-md px-5 py-2 text-sm font-medium text-white transition"
        >
          {t.cookieBanner.accept}
        </button>
      </div>
    </div>
  );
}
