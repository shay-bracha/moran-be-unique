import type { Context, Config } from "@netlify/functions";

async function sendMail(apiKey: string, from: string, to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from, to: [to], subject, html })
  });
  if (!response.ok) throw new Error(await response.text());
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const apiKey = Netlify.env.get("RESEND_API_KEY");
  const adminEmail = Netlify.env.get("ADMIN_EMAIL");
  const from = Netlify.env.get("RESEND_FROM_EMAIL") || "Moran Bracha <onboarding@resend.dev>";
  if (!apiKey || !adminEmail) return Response.json({ ok: false, error: "Missing email configuration" }, { status: 500 });

  const body = await req.json();
  const parentEmail = String(body.parent_email || "");
  const reference = String(body.reference || "");
  if (!parentEmail) return Response.json({ ok: false, error: "Missing recipient" }, { status: 400 });

  await sendMail(apiKey, from, adminEmail, "התקבלה הצהרה חדשה", `<div dir="rtl"><h2>התקבלה הצהרה חדשה</h2><p>${reference}</p><p>הפרטים המלאים זמינים ב-Netlify Forms.</p></div>`);
  await sendMail(apiKey, from, parentEmail, "ההצהרה התקבלה בהצלחה", `<div dir="rtl"><h2>ההצהרה התקבלה בהצלחה</h2><p>${reference}</p><p>הטופס התקבל ונשמר.</p></div>`);
  return Response.json({ ok: true });
};

export const config: Config = { path: "/api/send-form-confirmation" };
