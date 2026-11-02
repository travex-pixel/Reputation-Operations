"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { unlockAction, type UnlockState } from "./actions";
import { Field, Input, WsButton } from "@/components/workspace/ui";

export function UnlockForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/workspace";
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlockAction, {});
  return (
    <form action={action} className="mt-6 grid gap-4">
      <input type="hidden" name="next" value={next} />
      <Field label="Passcode" htmlFor="passcode">
        <Input id="passcode" name="passcode" type="password" autoComplete="current-password" required aria-invalid={!!state.error} aria-describedby={state.error ? "passcode-error" : undefined} />
        {state.error ? (
          <p id="passcode-error" role="alert" className="mt-1.5 text-[0.8125rem] font-medium text-signal-ink">
            {state.error}
          </p>
        ) : null}
      </Field>
      <WsButton type="submit" variant="field" disabled={pending}>
        {pending ? "Checking…" : "Unlock workspace"}
      </WsButton>
    </form>
  );
}
