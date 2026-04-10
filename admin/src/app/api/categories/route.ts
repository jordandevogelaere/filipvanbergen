import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const categories = await db
      .prepare("SELECT id, slug FROM categories ORDER BY slug")
      .all<{ id: string; slug: string }>();

    const translations = await db
      .prepare("SELECT category_id, locale, name FROM category_translations")
      .all<{ category_id: string; locale: string; name: string }>();

    const transMap: Record<string, Record<string, string>> = {};
    for (const t of translations.results) {
      if (!transMap[t.category_id]) transMap[t.category_id] = {};
      transMap[t.category_id][t.locale] = t.name;
    }

    const result = categories.results.map((c: { id: string; slug: string }) => ({
      id: c.id,
      slug: c.slug,
      translations: transMap[c.id] || {},
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error("GET /api/categories error:", e);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, translations } = body;

    if (!slug || !translations?.nl) {
      return NextResponse.json({ error: "Slug and Dutch name required" }, { status: 400 });
    }

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;
    const id = crypto.randomUUID();

    await db.prepare("INSERT INTO categories (id, slug) VALUES (?1, ?2)").bind(id, slug).run();

    for (const locale of ["nl", "en", "fr"] as const) {
      if (translations[locale]) {
        await db
          .prepare("INSERT INTO category_translations (category_id, locale, name) VALUES (?1, ?2, ?3)")
          .bind(id, locale, translations[locale])
          .run();
      }
    }

    return NextResponse.json({ id, slug, translations });
  } catch (e) {
    console.error("POST /api/categories error:", e);
    const msg = e instanceof Error ? e.message : "Failed to create category";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
