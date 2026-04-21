import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { headers } from "next/headers";
import { triggerDeploy } from "@/lib/deploy";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const posts = await db
      .prepare(
        `SELECT p.id, p.slug, p.status, p.featured_image_url, p.author_email, p.published_at, p.created_at,
                pt.title,
                (SELECT COUNT(*) FROM post_reads pr WHERE pr.post_id = p.id) as read_count
         FROM posts p
         LEFT JOIN post_translations pt ON pt.post_id = p.id AND pt.locale = 'nl'
         ORDER BY p.created_at DESC`
      )
      .all<{
        id: string;
        slug: string;
        status: string;
        featured_image_url: string | null;
        author_email: string;
        published_at: string | null;
        created_at: string;
        title: string | null;
      }>();

    // Get sites for each post
    const postIds = posts.results.map((p: { id: string }) => p.id);
    const sitesMap: Record<string, string[]> = {};

    if (postIds.length > 0) {
      const sites = await db
        .prepare(
          `SELECT post_id, site FROM post_sites WHERE post_id IN (${postIds.map(() => "?").join(",")})`,
        )
        .bind(...postIds)
        .all<{ post_id: string; site: string }>();

      for (const row of sites.results) {
        if (!sitesMap[row.post_id]) sitesMap[row.post_id] = [];
        sitesMap[row.post_id].push(row.site);
      }
    }

    const result = posts.results.map((p: { id: string; slug: string; title: string | null; status: string; published_at: string | null; created_at: string; read_count: number }) => ({
      id: p.id,
      slug: p.slug,
      title: p.title || "(untitled)",
      status: p.status,
      sites: sitesMap[p.id] || [],
      published_at: p.published_at,
      created_at: p.created_at,
      read_count: p.read_count,
    }));

    return NextResponse.json(result);
  } catch (e) {
    console.error("GET /api/posts error:", e);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, featured_image_url, sites, translations, publish } = body;

    if (!slug || !sites?.length) {
      return NextResponse.json({ error: "Slug and at least one site required" }, { status: 400 });
    }

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;
    const headersList = await headers();
    const authorEmail = headersList.get("cf-access-authenticated-user-email") || "admin";

    const id = crypto.randomUUID();
    const status = publish ? "published" : "draft";
    const publishedAt = publish ? new Date().toISOString() : null;

    // Insert post
    await db
      .prepare(
        `INSERT INTO posts (id, slug, status, featured_image_url, author_email, published_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      )
      .bind(id, slug, status, featured_image_url || null, authorEmail, publishedAt)
      .run();

    // Insert translations
    for (const locale of ["nl", "en", "fr"] as const) {
      const t = translations[locale];
      if (t && t.title) {
        await db
          .prepare(
            `INSERT INTO post_translations (id, post_id, locale, title, content_json, content_html, meta_description)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
          )
          .bind(crypto.randomUUID(), id, locale, t.title, t.content_json || "", t.content_html || "", t.meta_description || null)
          .run();
      }
    }

    // Insert site assignments
    for (const site of sites) {
      await db
        .prepare("INSERT INTO post_sites (post_id, site) VALUES (?1, ?2)")
        .bind(id, site)
        .run();
    }

    // Trigger deploy if publishing
    if (publish) {
      await triggerDeploy(env, sites);
    }

    return NextResponse.json({ id, slug, status });
  } catch (e) {
    console.error("POST /api/posts error:", e);
    const msg = e instanceof Error ? e.message : "Failed to create post";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
