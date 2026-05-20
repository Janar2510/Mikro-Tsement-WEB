import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getClientKey, rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import {
  requireString,
  optionalString,
  requireEmail,
  ValidationError,
} from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);
const STUDIO_EMAIL = process.env.STUDIO_EMAIL ?? "kuusk.janar@icloud.com";

// HTML-escape values that we interpolate into the email template to neutralize
// any HTML/script injection via name / email / phone / question fields.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 contact submissions per IP per 10 minutes (spam / email-bomb defense).
  const rl = rateLimit(getClientKey(req, "contact"), 5, 10 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rl) }
    );
  }

  try {
    const body = await req.json();
    const name = requireString(body?.name, "name", { min: 1, max: 200 });
    const email = requireEmail(body?.email);
    const phone = optionalString(body?.phone, "phone", { max: 50 });
    const question = requireString(body?.question, "question", { min: 1, max: 5_000 });
    const lang = body?.lang === "et" ? "et" : "en";

    const subject =
      lang === "et"
        ? `Uus päring Studio AI kaudu — ${name}`
        : `New inquiry via Studio AI — ${name}`;

    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #FAF5F2;">
        <h1 style="font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; color: #0F172A;">
          ${lang === "et" ? "Uus Päring" : "New Customer Inquiry"}
        </h1>
        <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #78716C; margin-bottom: 40px;">
          Studio AI — KUUS DESIGN
        </p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E7E0D8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #78716C; width: 140px;">
              ${lang === "et" ? "Nimi" : "Name"}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E7E0D8; font-size: 14px; color: #0F172A;">
              ${esc(name)}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E7E0D8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #78716C;">
              E-post
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E7E0D8; font-size: 14px; color: #0F172A;">
              <a href="mailto:${esc(email)}" style="color: #0F172A;">${esc(email)}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E7E0D8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #78716C;">
              ${lang === "et" ? "Telefon" : "Phone"}
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E7E0D8; font-size: 14px; color: #0F172A;">
              ${esc(phone)}
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 12px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #78716C; vertical-align: top; padding-top: 20px;">
              ${lang === "et" ? "Küsimus" : "Question"}
            </td>
            <td style="padding: 12px 0; padding-top: 20px; font-size: 14px; color: #0F172A; font-style: italic; line-height: 1.6;">
              "${esc(question)}"
            </td>
          </tr>
        </table>

        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #E7E0D8;">
          <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #A8A29E;">
            KUUS DESIGN — Studio AI · kuusdesign.ee
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Studio AI <onboarding@resend.dev>",
      to: STUDIO_EMAIL,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true }, { headers: rateLimitHeaders(rl) });
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
