export const fieldNames = [
  "name",
  "business",
  "trade",
  "suburb",
  "listing",
  "email",
  "phone",
  "contact",
  "notes",
] as const;

export type FieldName = (typeof fieldNames)[number];

export type AuditFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<FieldName, string>>;
  values?: Partial<Record<FieldName, string>>;
};

export const auditTrades = [
  "Air conditioning / HVAC",
  "Plumbing",
  "Electrical",
  "Painting",
  "Renovation / building",
  "Roofing",
  "Other trade or home service",
] as const;
