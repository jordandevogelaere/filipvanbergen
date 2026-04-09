import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    const total = await db.prepare("SELECT COUNT(*) as count FROM posts").first<{ count: number }>();
    const published = await db.prepare("SELECT COUNT(*) as count FROM posts WHERE status = 'published'").first<{ count: number }>();
    const drafts = await db.prepare("SELECT COUNT(*) as count FROM posts WHERE status = 'draft'").first<{ count: number }>();
    const totalReads = await db.prepare("SELECT COUNT(*) as count FROM post_reads").first<{ count: number }>();

    const recentPosts = await db
      .prepare(
        `SELECT p.id, p.slug, p.status, p.published_at, p.created_at, pt.title,
                (SELECT COUNT(*) FROM post_reads pr WHERE pr.post_id = p.id) as read_count
         FROM posts p
         LEFT JOIN post_translations pt ON pt.post_id = p.id AND pt.locale = 'nl'
         ORDER BY p.created_at DESC
         LIMIT 5`
      )
      .all<{
        id: string;
        slug: string;
        status: string;
        published_at: string | null;
        created_at: string;
        title: string | null;
        read_count: number;
      }>();

    return NextResponse.json({
      stats: {
        total: total?.count || 0,
        published: published?.count || 0,
        drafts: drafts?.count || 0,
        totalReads: totalReads?.count || 0,
      },
      recentPosts: recentPosts.results.map((p: { id: string; slug: string; title: string | null; status: string; published_at: string | null; created_at: string; read_count: number }) => ({
        id: p.id,
        slug: p.slug,
        title: p.title || "(untitled)",
        status: p.status,
        date: p.published_at || p.created_at,
        read_count: p.read_count,
      })),
    });
  } catch (e) {
    console.error("GET /api/dashboard error:", e);
    return NextResponse.json({
      stats: { total: 0, published: 0, drafts: 0, totalReads: 0 },
      recentPosts: [],
    });
  }
}
