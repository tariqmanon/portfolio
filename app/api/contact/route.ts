import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
};

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 200 || message.length > 5000 || company.length > 200) {
    return NextResponse.json({ error: "Field too long." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "tmanon007@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Tariq Manon Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service is not configured. Please email tmanon007@gmail.com directly." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New enquiry from ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; font-size: 18px; color: #8A6E40;">New enquiry from ${escapeHtml(name)}</h2>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 4px 12px 4px 0; color: #666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding: 4px 12px 4px 0; color: #666;">Company</td><td>${escapeHtml(company)}</td></tr>` : ""}
      </table>
      <hr style="border: none; border-top: 0.5px solid #E0DDD6; margin: 16px 0;" />
      <p style="white-space: pre-wrap; font-size: 14px;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Could not send. Please email directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Could not send. Please email directly." }, { status: 502 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
