import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be under 5MB" },
        { status: 400 }
      );
    }

    const folder = (formData.get("folder") as string | null) || "blog";
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { env } = await getCloudflareContext({ async: true });
    const arrayBuffer = await file.arrayBuffer();

    await env.IMAGES.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });

    const isDev = process.env.NODE_ENV === "development";
    const publicUrl = isDev
      ? `http://localhost:3001/api/images/${key}`
      : `https://cdn.fvbadvocaten.be/${key}`;
    return NextResponse.json({ url: publicUrl, previewUrl: `/api/images/${key}`, key });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
