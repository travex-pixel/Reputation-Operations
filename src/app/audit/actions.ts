"use server";

import { auditTrades, type AuditFormState, type FieldName } from "./fields";

function clean(v: FormDataEntryValue | null, max = 500) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function requestAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  // Honeypot: real users never see or fill this field.
  if (clean(formData.get("website_url"))) {
    return { status: "success" };
  }

  const values: Record<FieldName, string> = {
    name: clean(formData.get("name"), 120),
    business: clean(formData.get("business"), 160),
    trade: clean(formData.get("trade"), 80),
    suburb: clean(formData.get("suburb"), 120),
    listing: clean(formData.get("listing"), 300),
    email: clean(formData.get("email"), 200),
    phone: clean(formData.get("phone"), 40),
    contact: clean(formData.get("contact"), 20),
    notes: clean(formData.get("notes"), 1500),
  };

  const errors: Partial<Record<FieldName, string>> = {};
  if (values.name.length < 2) errors.name = "Add your first name so we know who to ask for.";
  if (values.business.length < 2) errors.business = "Add the business name as it appears on Google.";
  if (!(auditTrades as readonly string[]).includes(values.trade))
    errors.trade = "Choose the trade closest to your work.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter an email address like you@yourbusiness.com.au.";
  if (values.phone && values.phone.replace(/[^\d+]/g, "").length < 8)
    errors.phone = "Enter a phone number with at least 8 digits, or leave it blank.";
  if (values.contact === "phone" && !values.phone)
    errors.phone = "Add a number if you’d like us to ring you.";

  if (Object.keys(errors).length) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      errors,
      values,
    };
  }

  const webhook = process.env.AUDIT_WEBHOOK_URL;
  if (!webhook) {
    // No destination configured: do not pretend the request was received.
    console.warn("[audit] AUDIT_WEBHOOK_URL is not set; request not delivered", {
      business: values.business,
    });
    return {
      status: "error",
      message:
        "Our request form isn’t connected yet. Please email us instead; we reply within one working day.",
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
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { status: "success" };
  } catch (err) {
    console.error("[audit] delivery failed", err);
    return {
      status: "error",
      message:
        "Something went wrong sending your request. Please try again, or email us and we’ll sort it out.",
      values,
    };
  }
}
