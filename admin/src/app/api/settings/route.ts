import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const settings = await db
      .prepare("SELECT site, blog_menu_visible FROM site_settings ORDER BY site")
      .all<{ site: string; blog_menu_visible: number }>();

    return NextResponse.json(
      settings.results.map((s: { site: string; blog_menu_visible: number }) => ({
        site: s.site,
        blog_menu_visible: s.blog_menu_visible === 1,
      }))
    );
  } catch (e) {
    console.error("GET /api/settings error:", e);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { site, blog_menu_visible } = body;

    if (!site) {
      return NextResponse.json({ error: "Site is required" }, { status: 400 });
    }

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    await db
      .prepare(
        "INSERT INTO site_settings (site, blog_menu_visible) VALUES (?1, ?2) ON CONFLICT(site) DO UPDATE SET blog_menu_visible = ?2"
      )
      .bind(site, blog_menu_visible ? 1 : 0)
      .run();

    return NextResponse.json({ site, blog_menu_visible });
  } catch (e) {
    console.error("PUT /api/settings error:", e);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
