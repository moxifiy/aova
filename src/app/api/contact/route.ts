import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Contact form endpoint. Sends the inquiry to hello@aova.studio through Resend.
 *
 * Setup (one-time):
 *  1. Create a Resend account and verify the aova.studio domain (DNS records).
 *  2. Production: `npx wrangler secret put RESEND_API_KEY`
 *     Local dev: put `RESEND_API_KEY=re_...` in a `.dev.vars` file (gitignored).
 */
export async function POST(req: Request) {
    let body: { name?: string; email?: string; source?: string; message?: string; company?: string };
    try {
        body = await req.json();
    } catch {
        return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
    }

    // Honeypot — humans never see this field; bots fill it. Accept silently.
    if (body.company) return Response.json({ ok: true });

    const name = (body.name ?? "").trim().slice(0, 200);
    const email = (body.email ?? "").trim().slice(0, 200);
    const source = (body.source ?? "").trim().slice(0, 100);
    const message = (body.message ?? "").trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return Response.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    const { env } = getCloudflareContext();
    const apiKey = (env as { RESEND_API_KEY?: string }).RESEND_API_KEY;
    if (!apiKey) {
        return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
    }

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "Aova Website <website@aova.studio>",
            to: ["hello@aova.studio"],
            reply_to: email,
            subject: `New inquiry from ${name}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                `Found us via: ${source || "—"}`,
                "",
                message,
            ].join("\n"),
        }),
    });

    if (!res.ok) {
        return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
}
