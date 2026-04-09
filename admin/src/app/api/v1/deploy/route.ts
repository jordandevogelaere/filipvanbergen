import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

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
    const githubToken = env.GITHUB_TOKEN;
    const githubRepo = env.GITHUB_REPO || "filipvanbergen/karachi";

    if (!githubToken) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.github.com/repos/${githubRepo}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "blog_publish",
          client_payload: {
            sites: sites.join(","),
            deploy_advocaten: sites.includes("fvbadvocaten") ? "true" : "false",
            deploy_mediation: sites.includes("fvbmediation") ? "true" : "false",
            deploy_arbitration: sites.includes("fvbarbitration") ? "true" : "false",
          },
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub API error:", res.status, text);
      return NextResponse.json(
        { error: "Failed to trigger deploy" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, sites });
  } catch {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
