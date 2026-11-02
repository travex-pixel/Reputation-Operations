"use client";

import { Suspense } from "react";

import { useParams } from "next/navigation";
import { ReportDocument } from "@/components/workspace/ReportDocument";
import { PrintBar } from "@/components/workspace/PrintBar";
import { Empty, WsLink } from "@/components/workspace/ui";
import { useHydrated, useWorkspace, ws } from "@/lib/storage/store";

function Inner() {
  const { id } = useParams<{ id: string }>();
  const data = useWorkspace();
  const hydrated = useHydrated();
  if (!hydrated) return <div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />;
  const report = data.reports.find((r) => r.id === id);
  if (!report) return <Empty title="Report not found" action={<WsLink href="/workspace/reports">Back to reports</WsLink>} />;
  const client = data.clients.find((c) => c.id === report.clientId);
  return (
    <>
      <PrintBar
        title={`Monthly report · ${client?.name ?? "Client"}`}
        backHref="/workspace/reports"
        onDelete={() => {
          if (window.confirm("Delete this report?")) ws.deleteReport(report.id);
        }}
      />
      <ReportDocument report={report} clientName={client?.name ?? "Client"} />
    </>
  );
}

export default function ReportViewPage() {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />}>
      <Inner />
    </Suspense>
  );
}
