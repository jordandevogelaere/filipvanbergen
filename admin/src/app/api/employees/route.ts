import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { triggerDeploy } from "@/lib/deploy";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const rows = await db.prepare(`
      SELECT
        e.id, e.name, e.initials, e.photo_url, e."group", e.sort_order,
        et.locale, et.role, et.bio, et.languages
      FROM employees e
      LEFT JOIN employee_translations et ON et.employee_id = e.id
      ORDER BY e.sort_order ASC, e.name ASC
    `).all<{
      id: string; name: string; initials: string; photo_url: string | null;
      group: string; sort_order: number;
      locale: string | null; role: string | null; bio: string | null; languages: string | null;
    }>();

    const map = new Map<string, {
      id: string; name: string; initials: string; photo_url: string | null;
      group: string; sort_order: number;
      translations: Record<string, { role: string; bio: string | null; languages: string | null }>;
    }>();

    for (const row of rows.results) {
      if (!map.has(row.id)) {
        map.set(row.id, {
          id: row.id, name: row.name, initials: row.initials,
          photo_url: row.photo_url, group: row.group, sort_order: row.sort_order,
          translations: {},
        });
      }
      if (row.locale && row.role) {
        map.get(row.id)!.translations[row.locale] = {
          role: row.role, bio: row.bio, languages: row.languages,
        };
      }
    }

    return NextResponse.json(Array.from(map.values()));
  } catch (e) {
    console.error("GET /api/employees error:", e);
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, initials, photo_url, group, sort_order, translations } = body;

    if (!name || !initials || !group || !translations?.nl?.role) {
      return NextResponse.json(
        { error: "Name, initials, group, and Dutch role are required" },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;
    const id = crypto.randomUUID();

    await db.prepare(
      `INSERT INTO employees (id, name, initials, photo_url, "group", sort_order)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    ).bind(id, name, initials, photo_url || null, group, sort_order ?? 0).run();

    for (const locale of ["nl", "en", "fr"] as const) {
      if (translations[locale]?.role) {
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
    }

    await triggerDeploy(env, ["fvbadvocaten"]);

    return NextResponse.json({ id, name, initials, photo_url: photo_url || null, group, sort_order: sort_order ?? 0, translations });
  } catch (e) {
    console.error("POST /api/employees error:", e);
    const msg = e instanceof Error ? e.message : "Failed to create employee";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
