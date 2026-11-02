import { Suspense } from "react";
import { AuditGenerator } from "@/components/workspace/AuditGenerator";

export const metadata = { title: "Audit generator" };

export default function AuditPage() {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />}>
      <AuditGenerator />
    </Suspense>
  );
}
