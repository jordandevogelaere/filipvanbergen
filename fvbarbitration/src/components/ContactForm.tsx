"use client";

import { useState } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

export default function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const t = getDictionary(locale).form;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (res.ok) { setStatus("sent"); form.reset(); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-green-50 p-8 text-center text-green-800">
        <p className="text-lg font-medium">{t.successTitle}</p>
        <p className="mt-2 text-sm">{t.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="voornaam" className="mb-1 block text-sm font-medium">{t.firstName}</label>
          <input type="text" id="voornaam" name="voornaam" required className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 w-full rounded border px-4 py-2.5 text-sm outline-none transition focus:ring-1" />
        </div>
        <div>
          <label htmlFor="achternaam" className="mb-1 block text-sm font-medium">{t.lastName}</label>
          <input type="text" id="achternaam" name="achternaam" required className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 w-full rounded border px-4 py-2.5 text-sm outline-none transition focus:ring-1" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">{t.email}</label>
          <input type="email" id="email" name="email" required className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 w-full rounded border px-4 py-2.5 text-sm outline-none transition focus:ring-1" />
        </div>
        <div>
          <label htmlFor="telefoon" className="mb-1 block text-sm font-medium">{t.phone}</label>
          <input type="tel" id="telefoon" name="telefoon" className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 w-full rounded border px-4 py-2.5 text-sm outline-none transition focus:ring-1" />
        </div>
      </div>
      <div>
        <label htmlFor="bericht" className="mb-1 block text-sm font-medium">{t.message}</label>
        <textarea id="bericht" name="bericht" rows={5} required className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 w-full rounded border px-4 py-2.5 text-sm outline-none transition focus:ring-1" />
      </div>
      <button type="submit" disabled={status === "sending"} className="bg-sage-700 hover:bg-sage-800 w-full rounded px-8 py-3 text-sm font-medium uppercase tracking-wider text-white transition disabled:opacity-50 sm:w-auto">
        {status === "sending" ? t.sending : t.submit}
      </button>
      {status === "error" && <p className="text-sm text-red-600">{t.error}</p>}
    </form>
  );
}
