import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Serve images from R2 in local development
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const key = path.join("/");

    const { env } = await getCloudflareContext({ async: true });
    const object = await env.IMAGES.get(key);

    if (!object) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await object.arrayBuffer();
    return new NextResponse(body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return new NextResponse("Error", { status: 500 });
  }
}
