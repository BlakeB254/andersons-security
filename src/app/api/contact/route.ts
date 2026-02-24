import { NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { brand } from "@/config/brand";
import { apiSuccess, apiError, safeValidateBody } from "@/lib/api/utils";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const parsed = await safeValidateBody(request, contactSchema);
  if (parsed.error) return parsed.error;

  const { name, email, phone, company, subject, message } = parsed.data;

  const adminEmail = process.env.ADMIN_EMAIL || brand.contactEmail;

  // Attempt to send emails via Resend — if not configured, log and continue
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("[contact] RESEND_API_KEY not set — skipping email send");
    } else {
      const resend = new Resend(resendKey);
      const fromAddress = process.env.RESEND_FROM_EMAIL || `noreply@${brand.url.replace(/https?:\/\//, "")}`;

      // 1. Notification to admin
      await resend.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject: `[Contact Form] ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br />")}</p>
        `,
      });

      // 2. Auto-reply to customer
      await resend.emails.send({
        from: fromAddress,
        to: email,
        subject: `We received your message — ${brand.name}`,
        html: `
          <h2>Thank you, ${name}!</h2>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>Here's a copy of what you sent us:</p>
          <hr />
          <p><strong>Subject:</strong> ${subject}</p>
          <p>${message.replace(/\n/g, "<br />")}</p>
          <hr />
          <p>Best regards,<br />${brand.name}<br />${brand.contactPhone}</p>
        `,
      });
    }
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    // Still return success — the form submission is valid even if email fails
  }

  return apiSuccess({ message: "Message sent successfully" });
}
