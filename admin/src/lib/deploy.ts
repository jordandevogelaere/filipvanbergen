export async function triggerDeploy(env: CloudflareEnv, sites: string[]) {
  if (!env.GITHUB_TOKEN) {
    console.error("triggerDeploy: GITHUB_TOKEN is not set");
    return;
  }
  if (sites.length === 0) return;

  const githubRepo = env.GITHUB_REPO || "jordandevogelaere/filipvanbergen";

  const response = await fetch(`https://api.github.com/repos/${githubRepo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "fvb-admin",
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
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`triggerDeploy failed: ${response.status} ${body}`);
  }
}
