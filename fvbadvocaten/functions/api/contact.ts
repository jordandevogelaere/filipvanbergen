interface Env {
  UNOSEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json();
    const { voornaam, achternaam, email, telefoon, bericht } = body as Record<
      string,
      string
    >;

    if (!voornaam || !achternaam || !email || !bericht) {
      return new Response(
        JSON.stringify({ error: "Vul alle verplichte velden in." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const htmlBody = `
      <h2>Nieuw contactformulier bericht</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;font-weight:bold;">Voornaam</td><td style="padding:8px;">${escapeHtml(voornaam)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Achternaam</td><td style="padding:8px;">${escapeHtml(achternaam)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">E-mail</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Telefoon</td><td style="padding:8px;">${escapeHtml(telefoon || "-")}</td></tr>
      </table>
      <h3 style="margin-top:24px;">Bericht</h3>
      <p style="white-space:pre-wrap;">${escapeHtml(bericht)}</p>
      <hr style="margin-top:32px;" />
      <p style="color:#888;font-size:12px;">Verzonden via het contactformulier op fvbadvocaten.com op ${new Date().toISOString()}</p>
    `;

    const res = await fetch("https://api.unosend.co/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${context.env.UNOSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "website@fvbadvocaten.com",
        to: ["vanbergen@fvbadvocaten.com"],
        subject: `Contactformulier: ${voornaam} ${achternaam}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      console.error("Unosend error:", res.status, await res.text());
      return new Response(
        JSON.stringify({ error: "Er ging iets mis bij het verzenden." }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Bericht ontvangen." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Er ging iets mis." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
