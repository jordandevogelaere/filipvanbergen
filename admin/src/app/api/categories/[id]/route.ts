import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { slug, translations } = body;

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    await db.prepare("UPDATE categories SET slug = ?1 WHERE id = ?2").bind(slug, id).run();

    // Upsert translations
    for (const locale of ["nl", "en", "fr"] as const) {
      if (translations[locale]) {
        const existing = await db
          .prepare("SELECT category_id FROM category_translations WHERE category_id = ?1 AND locale = ?2")
          .bind(id, locale)
          .first();

        if (existing) {
          await db
            .prepare("UPDATE category_translations SET name = ?1 WHERE category_id = ?2 AND locale = ?3")
            .bind(translations[locale], id, locale)
            .run();
        } else {
          await db
            .prepare("INSERT INTO category_translations (category_id, locale, name) VALUES (?1, ?2, ?3)")
            .bind(id, locale, translations[locale])
            .run();
        }
      }
    }

    return NextResponse.json({ id, slug, translations });
  } catch (e) {
    console.error("PUT /api/categories/[id] error:", e);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    await db.prepare("DELETE FROM category_translations WHERE category_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM post_categories WHERE category_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM categories WHERE id = ?1").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/categories/[id] error:", e);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
