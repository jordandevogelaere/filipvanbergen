export async function triggerDeploy(env: CloudflareEnv, sites: string[]) {
  if (!env.GITHUB_TOKEN || sites.length === 0) return;

  const githubRepo = env.GITHUB_REPO || "jordandevogelaere/filipvanbergen";

  await fetch(`https://api.github.com/repos/${githubRepo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
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
  });
}
