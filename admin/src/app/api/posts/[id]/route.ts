import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { triggerDeploy } from "@/lib/deploy";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const post = await db
      .prepare("SELECT * FROM posts WHERE id = ?1")
      .bind(id)
      .first<{
        id: string;
        slug: string;
        status: string;
        featured_image_url: string | null;
        author_email: string;
        published_at: string | null;
        created_at: string;
      }>();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Get translations
    const translationsResult = await db
      .prepare("SELECT locale, title, content_json, content_html, meta_description FROM post_translations WHERE post_id = ?1")
      .bind(id)
      .all<{ locale: string; title: string; content_json: string; content_html: string; meta_description: string | null }>();

    const translations: Record<string, { title: string; content_json: string; content_html: string; meta_description: string }> = {
      nl: { title: "", content_json: "", content_html: "", meta_description: "" },
      en: { title: "", content_json: "", content_html: "", meta_description: "" },
      fr: { title: "", content_json: "", content_html: "", meta_description: "" },
    };
    for (const t of translationsResult.results) {
      translations[t.locale] = {
        title: t.title,
        content_json: t.content_json,
        content_html: t.content_html,
        meta_description: t.meta_description || "",
      };
    }

    // Get sites
    const sitesResult = await db
      .prepare("SELECT site FROM post_sites WHERE post_id = ?1")
      .bind(id)
      .all<{ site: string }>();

    // Get categories
    const categoriesResult = await db
      .prepare("SELECT category_id FROM post_categories WHERE post_id = ?1")
      .bind(id)
      .all<{ category_id: string }>();

    // Get tags
    const tagsResult = await db
      .prepare("SELECT tag_id FROM post_tags WHERE post_id = ?1")
      .bind(id)
      .all<{ tag_id: string }>();

    return NextResponse.json({
      ...post,
      translations,
      sites: sitesResult.results.map((s: { site: string }) => s.site),
      categories: categoriesResult.results.map((c: { category_id: string }) => c.category_id),
      tags: tagsResult.results.map((t: { tag_id: string }) => t.tag_id),
    });
  } catch (e) {
    console.error("GET /api/posts/[id] error:", e);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { slug, featured_image_url, sites, translations, publish } = body;

    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const existing = await db
      .prepare("SELECT id, status FROM posts WHERE id = ?1")
      .bind(id)
      .first<{ id: string; status: string }>();

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const status = publish ? "published" : "draft";
    const wasPublished = existing.status === "published";
    const publishedAt = publish && !wasPublished ? new Date().toISOString() : undefined;

    // Update post
    if (publishedAt) {
      await db
        .prepare(
          `UPDATE posts SET slug = ?1, featured_image_url = ?2, status = ?3, published_at = ?4, updated_at = datetime('now') WHERE id = ?5`
        )
        .bind(slug, featured_image_url || null, status, publishedAt, id)
        .run();
    } else {
      await db
        .prepare(
          `UPDATE posts SET slug = ?1, featured_image_url = ?2, status = ?3, updated_at = datetime('now') WHERE id = ?4`
        )
        .bind(slug, featured_image_url || null, status, id)
        .run();
    }

    // Upsert translations
    for (const locale of ["nl", "en", "fr"] as const) {
      const t = translations[locale];
      if (!t) continue;

      const existingT = await db
        .prepare("SELECT id FROM post_translations WHERE post_id = ?1 AND locale = ?2")
        .bind(id, locale)
        .first<{ id: string }>();

      if (existingT) {
        await db
          .prepare(
            `UPDATE post_translations SET title = ?1, content_json = ?2, content_html = ?3, meta_description = ?4 WHERE post_id = ?5 AND locale = ?6`
          )
          .bind(t.title, t.content_json || "", t.content_html || "", t.meta_description || null, id, locale)
          .run();
      } else if (t.title) {
        await db
          .prepare(
            `INSERT INTO post_translations (id, post_id, locale, title, content_json, content_html, meta_description)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
          )
          .bind(crypto.randomUUID(), id, locale, t.title, t.content_json || "", t.content_html || "", t.meta_description || null)
          .run();
      }
    }

    // Replace site assignments
    await db.prepare("DELETE FROM post_sites WHERE post_id = ?1").bind(id).run();
    for (const site of sites) {
      await db
        .prepare("INSERT INTO post_sites (post_id, site) VALUES (?1, ?2)")
        .bind(id, site)
        .run();
    }

    // Trigger deploy if publishing or unpublishing
    let deployStatus: string | null = null;
    if (publish || wasPublished) {
      try {
        await triggerDeploy(env, sites);
        deployStatus = "triggered";
      } catch (err) {
        deployStatus = `error: ${err}`;
      }
    }

    return NextResponse.json({ id, slug, status, deployStatus });
  } catch (e) {
    console.error("PUT /api/posts/[id] error:", e);
    const msg = e instanceof Error ? e.message : "Failed to update post";
    return NextResponse.json({ error: msg }, { status: 500 });
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

    const post = await db
      .prepare("SELECT status FROM posts WHERE id = ?1")
      .bind(id)
      .first<{ status: string }>();

    const sitesResult = await db
      .prepare("SELECT site FROM post_sites WHERE post_id = ?1")
      .bind(id)
      .all<{ site: string }>();

    const sites = sitesResult.results.map((r: { site: string }) => r.site);

    // Cascading deletes handle translations, sites, categories, tags
    await db.prepare("DELETE FROM post_translations WHERE post_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM post_sites WHERE post_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM post_categories WHERE post_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM post_tags WHERE post_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM posts WHERE id = ?1").bind(id).run();

    if (post?.status === "published" && sites.length > 0) {
      await triggerDeploy(env, sites);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/posts/[id] error:", e);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
