import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { triggerDeploy } from "@/lib/deploy";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, initials, photo_url, group, sort_order, translations } = body;

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    await db.prepare(
      `UPDATE employees SET name = ?1, initials = ?2, photo_url = ?3, "group" = ?4, sort_order = ?5,
       updated_at = datetime('now') WHERE id = ?6`
    ).bind(name, initials, photo_url || null, group, sort_order ?? 0, id).run();

    for (const locale of ["nl", "en", "fr"] as const) {
      if (translations[locale]?.role) {
        const existing = await db
          .prepare("SELECT employee_id FROM employee_translations WHERE employee_id = ?1 AND locale = ?2")
          .bind(id, locale)
          .first();

        if (existing) {
          await db.prepare(
            `UPDATE employee_translations SET role = ?1, bio = ?2, languages = ?3
             WHERE employee_id = ?4 AND locale = ?5`
          ).bind(
            translations[locale].role,
            translations[locale].bio || null,
            translations[locale].languages || null,
            id, locale
          ).run();
        } else {
          await db.prepare(
            `INSERT INTO employee_translations (employee_id, locale, role, bio, languages)
             VALUES (?1, ?2, ?3, ?4, ?5)`
          ).bind(
            id, locale,
            translations[locale].role,
            translations[locale].bio || null,
            translations[locale].languages || null
          ).run();
        }
      } else {
        await db.prepare(
          "DELETE FROM employee_translations WHERE employee_id = ?1 AND locale = ?2"
        ).bind(id, locale).run();
      }
    }

    await triggerDeploy(env, ["fvbadvocaten"]);

    return NextResponse.json({ id, name, initials, photo_url: photo_url || null, group, sort_order, translations });
  } catch (e) {
    console.error("PUT /api/employees/[id] error:", e);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
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

    await db.prepare("DELETE FROM employee_translations WHERE employee_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM employees WHERE id = ?1").bind(id).run();

    await triggerDeploy(env, ["fvbadvocaten"]);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/employees/[id] error:", e);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
