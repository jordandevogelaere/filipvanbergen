import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { env } = await getCloudflareContext({ async: true });
    const db = env.DB;

    await db.prepare("DELETE FROM tag_translations WHERE tag_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM post_tags WHERE tag_id = ?1").bind(id).run();
    await db.prepare("DELETE FROM tags WHERE id = ?1").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/tags/[id] error:", e);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}
