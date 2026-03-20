interface Env {}

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

    // TODO: Configure email sending via Cloudflare Email Workers or an external service
    // For now, log the submission and return success
    console.log("Contact form submission:", {
      voornaam,
      achternaam,
      email,
      telefoon,
      bericht,
      timestamp: new Date().toISOString(),
    });

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
