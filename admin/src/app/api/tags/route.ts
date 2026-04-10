import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const tags = await db
      .prepare("SELECT id, slug FROM tags ORDER BY slug")
      .all<{ id: string; slug: string }>();

    const translations = await db
      .prepare("SELECT tag_id, locale, name FROM tag_translations")
      .all<{ tag_id: string; locale: string; name: string }>();

    const transMap: Record<string, Record<string, string>> = {};
    for (const t of translations.results) {
      if (!transMap[t.tag_id]) transMap[t.tag_id] = {};
      transMap[t.tag_id][t.locale] = t.name;
    }

    const result = tags.results.map((t: { id: string; slug: string }) => ({
      id: t.id,
      slug: t.slug,
      translations: transMap[t.id] || {},
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error("GET /api/tags error:", e);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
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

    await db.prepare("INSERT INTO tags (id, slug) VALUES (?1, ?2)").bind(id, slug).run();

    for (const locale of ["nl", "en", "fr"] as const) {
      if (translations[locale]) {
        await db
          .prepare("INSERT INTO tag_translations (tag_id, locale, name) VALUES (?1, ?2, ?3)")
          .bind(id, locale, translations[locale])
          .run();
      }
    }

    return NextResponse.json({ id, slug, translations });
  } catch (e) {
    console.error("POST /api/tags error:", e);
    const msg = e instanceof Error ? e.message : "Failed to create tag";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
