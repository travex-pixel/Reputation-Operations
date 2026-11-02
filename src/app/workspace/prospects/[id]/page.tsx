"use client";

import { Suspense } from "react";

import { useParams } from "next/navigation";
import { ProspectDetail } from "@/components/workspace/ProspectDetail";

function Inner() {
  const params = useParams<{ id: string }>();
  return <ProspectDetail id={params.id} />;
}

export default function ProspectPage() {
  return (
    <Suspense fallback={<div aria-busy="true" className="h-64 animate-pulse rounded-md bg-ground-sunken" />}>
      <Inner />
    </Suspense>
  );
}
