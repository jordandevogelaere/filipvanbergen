import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { triggerDeploy } from "@/lib/deploy";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sites } = body as { sites: string[] };

    if (!sites || sites.length === 0) {
      return NextResponse.json(
        { error: "sites array is required" },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext({ async: true });

    await triggerDeploy(env, sites);

    return NextResponse.json({ success: true, sites });
  } catch {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
