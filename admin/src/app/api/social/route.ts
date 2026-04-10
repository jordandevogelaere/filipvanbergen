import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const profiles = await db
      .prepare("SELECT id, platform, profile_url, site FROM social_profiles")
      .all<{ id: string; platform: string; profile_url: string; site: string }>();

    // Return as key-value map: { "linkedin_fvbadvocaten": "https://..." }
    const result: Record<string, string> = {};
    for (const p of profiles.results) {
      result[`${p.platform}_${p.site}`] = p.profile_url;
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("GET /api/social error:", e);
    return NextResponse.json({ error: "Failed to fetch profiles" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const profiles: Record<string, string> = await request.json();

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    // Clear existing and re-insert
    await db.prepare("DELETE FROM social_profiles").run();

    for (const [key, url] of Object.entries(profiles)) {
      if (!url) continue;
      const [platform, ...siteParts] = key.split("_");
      const site = siteParts.join("_");
      await db
        .prepare("INSERT INTO social_profiles (id, platform, profile_url, site) VALUES (?1, ?2, ?3, ?4)")
        .bind(crypto.randomUUID(), platform, url, site)
        .run();
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("PUT /api/social error:", e);
    return NextResponse.json({ error: "Failed to save profiles" }, { status: 500 });
  }
}
