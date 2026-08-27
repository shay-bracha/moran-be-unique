type Attachment = { filename: string; content: string };

async function sendMail(apiKey: string, from: string, to: string, subject: string, html: string, attachments: Attachment[]) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, attachments })
  });
  if (!response.ok) throw new Error(await response.text());
}

function safeFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, "-").trim() || "ילד";
}

export default async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const apiKey = Netlify.env.get("RESEND_API_KEY");
  const adminEmail = Netlify.env.get("ADMIN_EMAIL");
  const from = Netlify.env.get("RESEND_FROM_EMAIL") || "Moran Bracha <onboarding@resend.dev>";
  if (!apiKey || !adminEmail) return Response.json({ ok: false, error: "Missing email configuration" }, { status: 500 });

  const body = await req.json();
  const childName = String(body.child_name || "").trim();
  const pdfBase64 = String(body.pdf_base64 || "").trim();
  const medicalBase64 = String(body.medical_base64 || "").trim();
  const medicalFilename = safeFileName(String(body.medical_filename || "מסמך-רפואי"));
  if (!pdfBase64) return Response.json({ ok: false, error: "Missing PDF" }, { status: 400 });

  const filename = `הצהרת-בריאות-${safeFileName(childName)}.pdf`;
  const attachments: Attachment[] = [{ filename, content: pdfBase64 }];
  if (medicalBase64) attachments.push({ filename: medicalFilename, content: medicalBase64 });

  await sendMail(
    apiKey,
    from,
    adminEmail,
    `התקבלה הצהרת בריאות חדשה${childName ? ` - ${childName}` : ""}`,
    `<div dir="rtl" style="font-family:Arial,sans-serif"><h2>התקבלה הצהרת בריאות חדשה</h2>${childName ? `<p>עבור ${childName}</p>` : ""}<p>מצורף קובץ PDF חתום של ההצהרה${medicalBase64 ? " וכן מסמך רפואי אופציונלי שצורף" : ""}.</p></div>`,
    attachments
  );

  return Response.json({ ok: true });
};

export const config = { path: "/api/send-form-confirmation" };
