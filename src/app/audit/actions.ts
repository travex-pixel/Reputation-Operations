"use server";

import type { AuditFormState, FieldName } from "./fields";

function clean(v: FormDataEntryValue | null, max = 500) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s: string) => /^[\d\s()+-]+$/.test(s) && s.replace(/[^\d]/g, "").length >= 8;

export async function requestAudit(_prev: AuditFormState, formData: FormData): Promise<AuditFormState> {
  // Honeypot: real users never see or fill this field.
  if (clean(formData.get("website_url"))) {
    return { status: "success" };
  }

  const values: Record<FieldName, string> = {
    business: clean(formData.get("business"), 160),
    name: clean(formData.get("name"), 120),
    contact: clean(formData.get("contact"), 200),
    listing: clean(formData.get("listing"), 300),
  };

  const errors: Partial<Record<FieldName, string>> = {};
  if (values.business.length < 2) errors.business = "Add your business name as it appears on Google.";
  if (values.name.length < 2) errors.name = "Add your name so we know who to ask for.";
  if (!isEmail(values.contact) && !isPhone(values.contact))
    errors.contact = "Enter an email address or a mobile number so we can send you the audit.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Check the highlighted fields and try again.", errors, values };
  }

  const webhook = process.env.AUDIT_WEBHOOK_URL;
  if (!webhook) {
    // No destination configured: do not pretend the request was received.
    console.warn("[audit] AUDIT_WEBHOOK_URL is not set; request not delivered", { business: values.business });
    return {
      status: "error",
      message: "Our request form isn’t connected yet. Please email us instead; we reply within one working day.",
      values,
    };
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "reputrail.com.au/audit",
        receivedAt: new Date().toISOString(),
        ...values,
        contactType: isEmail(values.contact) ? "email" : "mobile",
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("[audit] delivery failed", err);
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try again, or email us and we’ll sort it out.",
      values,
    };
  }
}
