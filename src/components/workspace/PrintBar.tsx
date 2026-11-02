"use client";

import { WsButton, WsLink } from "./ui";

export function PrintBar({ title, backHref, onDelete }: { title: string; backHref: string; onDelete?: () => void }) {
  return (
    <div className="ws-no-print mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <WsLink href={backHref} variant="ghost">
          ← Back
        </WsLink>
        <h1 className="text-[1.125rem] font-semibold tracking-[-0.01em] text-ink">{title}</h1>
      </div>
      <div className="flex gap-2">
        {onDelete ? (
          <WsButton variant="danger" onClick={onDelete}>
            Delete
          </WsButton>
        ) : null}
        <WsButton variant="primary" onClick={() => window.print()}>
          Print or save as PDF
        </WsButton>
      </div>
    </div>
  );
}
