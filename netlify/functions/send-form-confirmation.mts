type Attachment = { filename: string; content: string };

async function sendMail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  html: string,
  attachments: Attachment[]
) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
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
  if (!apiKey || !adminEmail) {
    return Response.json({ ok: false, error: "Missing email configuration" }, { status: 500 });
  }

  const body = await req.json();
  const parentEmail = String(body.parent_email || "").trim();
  const childName = String(body.child_name || "").trim();
  const pdfBase64 = String(body.pdf_base64 || "").trim();
  const medicalBase64 = String(body.medical_base64 || "").trim();
  const medicalFilename = safeFileName(String(body.medical_filename || "מסמך-רפואי"));

  if (!parentEmail || !pdfBase64) {
    return Response.json({ ok: false, error: "Missing recipient or PDF" }, { status: 400 });
  }

  const filename = `הצהרת-בריאות-${safeFileName(childName)}.pdf`;
  const attachments: Attachment[] = [{ filename, content: pdfBase64 }];
  if (medicalBase64) attachments.push({ filename: medicalFilename, content: medicalBase64 });
  const reference = childName ? `עבור ${childName}` : "";

  await sendMail(
    apiKey,
    from,
    adminEmail,
    `התקבלה הצהרת בריאות חדשה${childName ? ` - ${childName}` : ""}`,
    `<div dir="rtl"><h2>התקבלה הצהרת בריאות חדשה</h2><p>${reference}</p><p>מצורף קובץ PDF חתום של ההצהרה${medicalBase64 ? " וכן המסמך הרפואי שצורף" : ""}.</p></div>`,
    attachments
  );

  let parentSent = true;
  try {
    await sendMail(
      apiKey,
      from,
      parentEmail,
      `עותק הצהרת הבריאות${childName ? ` - ${childName}` : ""}`,
      `<div dir="rtl"><h2>הצהרת הבריאות התקבלה בהצלחה</h2><p>${reference}</p><p>מצורף העתק PDF של ההצהרה שנשלחה.</p></div>`,
      [{ filename, content: pdfBase64 }]
    );
  } catch (error) {
    parentSent = false;
    console.error("Parent email failed", error);
  }

  return Response.json({ ok: true, parentSent });
};

export const config = { path: "/api/send-form-confirmation" };
