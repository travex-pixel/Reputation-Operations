"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import { requestAudit } from "./actions";
import type { AuditFormState } from "./fields";
import { site } from "@/lib/site";

const initial: AuditFormState = { status: "idle" };

const labelCls = "block text-small font-medium text-ink";
const inputCls =
  "mt-2 block h-12 w-full rounded-sm border border-line-strong bg-ground-raised px-3.5 text-body text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-150 hover:border-ink-faint focus:border-accent focus:shadow-[0_0_0_3px_rgb(49_91_73_/_0.14)] aria-[invalid=true]:border-signal aria-[invalid=true]:focus-visible:outline-signal";
const hintCls = "mt-2 text-[0.8125rem] leading-relaxed text-ink-faint";
const errorCls = "mt-2 text-[0.8125rem] font-medium leading-relaxed text-signal-ink";

export function AuditForm() {
  const [state, action, pending] = useActionState(requestAudit, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus the first invalid field after a failed submit.
  useEffect(() => {
    if (state.status !== "error" || !state.errors || !formRef.current) return;
    const first = Object.keys(state.errors)[0];
    formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-md border rule bg-ground-raised p-7 shadow-lift md:p-9">
        <p className="label text-accent">Received</p>
        <h2 className="mt-4 text-title text-ink">Thanks. We’ve got it.</h2>
        <p className="mt-5 max-w-[30rem] text-body text-ink-soft">
          A person at Reputrail will read your request today and confirm we have the right business. Your one-page audit
          follows within two working days, to the email or mobile you gave us.
        </p>
        <p className="mt-6 border-t rule pt-5 text-small text-ink-soft">
          Need us sooner? Email{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-ink underline-offset-4 hover:underline">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form ref={formRef} action={action} noValidate className="rounded-md border rule bg-ground-raised p-6 shadow-lift md:p-8">
      <div className="grid gap-6">
        {state.status === "error" && state.message ? (
          <p role="alert" className="rounded-sm border border-signal/40 bg-signal/5 px-4 py-3 text-small font-medium text-ink">
            {state.message}{" "}
            {!state.errors ? (
              <a href={`mailto:${site.email}?subject=Free%20reputation%20audit`} className="font-medium text-accent underline underline-offset-4">
                Email {site.email}
              </a>
            ) : null}
          </p>
        ) : null}

        <div>
          <label htmlFor="business" className={labelCls}>
            Business name
          </label>
          <input
            id="business"
            name="business"
            type="text"
            autoComplete="organization"
            required
            defaultValue={v.business}
            aria-invalid={!!e.business}
            aria-describedby={e.business ? "business-error" : "business-hint"}
            placeholder="As it appears on Google"
            className={inputCls}
          />
          {e.business ? (
            <p id="business-error" className={errorCls}>{e.business}</p>
          ) : (
            <p id="business-hint" className={hintCls}>We’ll find your listing from this.</p>
          )}
        </div>

        <div>
          <label htmlFor="name" className={labelCls}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={v.name}
            aria-invalid={!!e.name}
            aria-describedby={e.name ? "name-error" : undefined}
            className={inputCls}
          />
          {e.name ? <p id="name-error" className={errorCls}>{e.name}</p> : null}
        </div>

        <div>
          <label htmlFor="contact" className={labelCls}>
            Email or mobile
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            defaultValue={v.contact}
            aria-invalid={!!e.contact}
            aria-describedby={e.contact ? "contact-error" : "contact-hint"}
            className={inputCls}
          />
          {e.contact ? (
            <p id="contact-error" className={errorCls}>{e.contact}</p>
          ) : (
            <p id="contact-hint" className={hintCls}>Where we send the audit. Whichever you prefer.</p>
          )}
        </div>

        <div>
          <label htmlFor="listing" className={labelCls}>
            Website or Google listing link <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="listing"
            name="listing"
            type="url"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            defaultValue={v.listing}
            placeholder="https://"
            className={inputCls}
          />
        </div>

        {/* Honeypot, hidden from people and assistive tech */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Leave this field empty</label>
          <input id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-4 border-t rule pt-6">
          <Button type="submit" size="lg" disabled={pending} className="w-full">
            {pending ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                  <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Sending
              </>
            ) : (
              "Get your free reputation audit"
            )}
          </Button>
          <p className="text-[0.8125rem] leading-relaxed text-ink-faint">
            A person reads this today. Your audit arrives within two working days. We never share your details; see our{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-ink">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </form>
  );
}
