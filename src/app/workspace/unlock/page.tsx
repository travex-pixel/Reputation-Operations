import { Suspense } from "react";
import { UnlockForm } from "./UnlockForm";

export const metadata = { title: "Unlock" };

export default function UnlockPage() {
  return (
    <div className="mx-auto max-w-md py-10">
      <div className="ws-card-raised p-6 md:p-8">
        <h1 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink opsz-display">Founder workspace</h1>
        <p className="mt-2 text-small text-ink-soft">
          This area holds prospect research and client records. Enter the workspace passcode to continue.
        </p>
        <Suspense fallback={null}>
          <UnlockForm />
        </Suspense>
      </div>
    </div>
  );
}
