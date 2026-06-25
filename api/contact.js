import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const recipients = [
 "lalgiene@mac.com",
 "Emilybrady96@gmail.com",
 "therapy@katharinejones.com"
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, supportType, phone, message, how, website } = req.body || {};

    if (website) {
      return res.status(200).json({ success: true });
    }

    if (!name || !email || !supportType || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSupportType = escapeHtml(supportType);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeHow = escapeHtml(how || "Not provided");
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Denver",
      dateStyle: "full",
      timeStyle: "short"
    });

    const callButton = phone
      ? `
        <a href="tel:${escapeHtml(phone)}" style="display:inline-block;padding:12px 22px;background:#3A2A35;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;margin-top:10px;">
          📞 Call Client
        </a>
      `
      : "";

    const { error } = await resend.emails.send({
      from: "EmpowerHer Website <onboarding@resend.dev>",
      to: recipients,
      subject: `${safeSupportType} Inquiry • ${safeName}`,
      reply_to: safeEmail,
      html: `
        <div style="margin:0;padding:0;background:#FDF2F5;font-family:Arial,sans-serif;color:#3A2A35;">
          <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
            <div style="background:#ffffff;border:1px solid #E8D8E0;border-radius:24px;overflow:hidden;box-shadow:0 12px 32px rgba(58,42,53,0.08);">
              
              <div style="background:#3A2A35;padding:28px 32px;color:#FFFBFC;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#EADDE3;">
                  EmpowerHer Wellness
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;font-family:Georgia,serif;font-weight:600;">
                  New Website Inquiry
                </h1>
              </div>

              <div style="padding:28px 32px;">
                <div style="display:inline-block;background:#FFF1F2;color:#E11D48;border:1px solid #FECDD3;border-radius:999px;padding:8px 14px;font-size:13px;font-weight:700;margin-bottom:22px;">
                  ${safeSupportType}
                </div>

                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#8A7480;">
                  A new message was submitted through the EmpowerHer Wellness website contact form.
                </p>

                <div style="background:#FFFBFC;border:1px solid #F5E9EE;border-radius:18px;padding:20px;margin-bottom:24px;">
                  <p style="margin:0 0 14px;font-size:13px;color:#8A7480;text-transform:uppercase;letter-spacing:0.08em;">Contact Information</p>

                  <p style="margin:0 0 10px;font-size:15px;"><strong>Name:</strong> ${safeName}</p>
                  <p style="margin:0 0 10px;font-size:15px;"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#F43F5E;">${safeEmail}</a></p>
                  <p style="margin:0 0 10px;font-size:15px;"><strong>Phone:</strong> ${safePhone}</p>
                  <p style="margin:0;font-size:15px;"><strong>Referral Source:</strong> ${safeHow}</p>
                </div>

                <div style="background:#FFFBFC;border:1px solid #F5E9EE;border-radius:18px;padding:20px;margin-bottom:24px;">
                  <p style="margin:0 0 14px;font-size:13px;color:#8A7480;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
                  <p style="margin:0;font-size:16px;line-height:1.7;color:#3A2A35;">${safeMessage}</p>
                </div>

                <div style="margin:28px 0;">
                  <p style="margin:0 0 14px;font-size:13px;color:#8A7480;text-transform:uppercase;letter-spacing:0.08em;">Quick Actions</p>

                  <a href="mailto:${safeEmail}" style="display:inline-block;padding:12px 22px;background:#F43F5E;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:600;margin-right:10px;margin-top:10px;">
                    ✉️ Reply to Client
                  </a>

                  ${callButton}
                </div>

                <p style="margin:0;color:#8A7480;font-size:13px;line-height:1.6;">
                  Submitted on ${submittedAt} Mountain Time.
                </p>
              </div>
            </div>

            <p style="text-align:center;margin:18px 0 0;color:#8A7480;font-size:12px;">
              Sent automatically from the EmpowerHer Wellness website.
            </p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Email failed to send." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}