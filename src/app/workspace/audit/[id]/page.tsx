"use client";

import { Suspense } from "react";

import { useParams } from "next/navigation";
import { AuditDocument } from "@/components/workspace/AuditDocument";
import { PrintBar } from "@/components/workspace/PrintBar";
import { Empty, WsLink } from "@/components/workspace/ui";
import { useHydrated, useWorkspace, ws } from "@/lib/storage/store";

function Inner() {
  const { id } = useParams<{ id: string }>();
  const data = useWorkspace();
  const hydrated = useHydrated();
  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;
  const audit = data.audits.find((a) => a.id === id);
  if (!audit) return <Empty title="Audit not found" action={<WsLink href="/workspace/audit">Back to generator</WsLink>} />;
  return (
    <>
      <PrintBar
        title={`Audit · ${audit.inputs.businessName}`}
        backHref={audit.prospectId ? `/workspace/prospects/${audit.prospectId}` : "/workspace/audit"}
        onDelete={() => {
          if (window.confirm("Delete this audit?")) ws.deleteAudit(audit.id);
        }}
      />
      <AuditDocument audit={audit} />
    </>
  );
}

export default function AuditViewPage() {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />}>
      <Inner />
    </Suspense>
  );
}
