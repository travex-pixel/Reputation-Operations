export const fieldNames = ["business", "name", "contact", "listing"] as const;

export type FieldName = (typeof fieldNames)[number];

export type AuditFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<FieldName, string>>;
  values?: Partial<Record<FieldName, string>>;
};
