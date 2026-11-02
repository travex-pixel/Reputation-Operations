"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/Button";
import { requestAudit } from "./actions";
import { auditTrades, type AuditFormState } from "./fields";
import { site } from "@/lib/site";

const initial: AuditFormState = { status: "idle" };

const labelCls = "block text-small font-semibold text-ink";
const inputCls =
  "mt-1.5 block h-12 w-full rounded-sm border border-line-strong bg-ground-raised px-3.5 text-body text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-150 hover:border-ink-faint focus:border-field focus:shadow-[0_0_0_3px_rgb(15_44_37_/_0.12)] aria-[invalid=true]:border-signal aria-[invalid=true]:focus-visible:outline-signal";
const hintCls = "mt-1.5 text-[0.8125rem] leading-relaxed text-ink-faint";
const errorCls = "mt-1.5 text-[0.8125rem] font-medium leading-relaxed text-signal-ink";

export function AuditForm() {
  const [state, action, pending] = useActionState(requestAudit, initial);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus the first invalid field after a failed submit.
  useEffect(() => {
    if (state.status !== "error" || !state.errors || !formRef.current) return;
    const first = Object.keys(state.errors)[0];
    const el = formRef.current.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="tag-shape bg-field p-7 pt-11 text-ink-on-field shadow-float md:p-9 md:pt-12"
      >
        <p className="font-mono text-mono uppercase tracking-[0.08em] text-stamp">Received</p>
        <h2 className="mt-3 text-title text-ink-on-field">Thanks. We’re on it.</h2>
        <p className="mt-4 max-w-[30rem] text-body text-ink-on-field-soft">
          A person at Reputrail will read your request today. Expect a short confirmation by
          email, then your one-page audit within two working days. If you asked for a call,
          we’ll ring at the time you suggested.
        </p>
        <p className="mt-6 border-t rule-on-field pt-5 text-small text-ink-on-field-soft">
          Need us sooner? Email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-ink-on-field underline-offset-4 hover:underline">
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
    <form
      ref={formRef}
      action={action}
      noValidate
      className="rounded-md border rule bg-ground-raised p-6 shadow-lift md:p-8"
    >
      <div className="grid gap-6">
        {state.status === "error" && state.message ? (
          <p
            role="alert"
            className="rounded-sm border border-signal/40 bg-signal/5 px-4 py-3 text-small font-medium text-ink"
          >
            {state.message}{" "}
            {!state.errors ? (
              <a href={`mailto:${site.email}?subject=Free%20reputation%20audit`} className="font-semibold text-green-mid underline underline-offset-4">
                Email {site.email}
              </a>
            ) : null}
          </p>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelCls}>
              Your first name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              required
              defaultValue={v.name}
              aria-invalid={!!e.name}
              aria-describedby={e.name ? "name-error" : undefined}
              placeholder="e.g. Mick…"
              className={inputCls}
            />
            {e.name ? (
              <p id="name-error" className={errorCls}>
                {e.name}
              </p>
            ) : null}
          </div>
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
              placeholder="As it appears on Google…"
              className={inputCls}
            />
            {e.business ? (
              <p id="business-error" className={errorCls}>
                {e.business}
              </p>
            ) : (
              <p id="business-hint" className={hintCls}>
                We’ll find your listing from this.
              </p>
            )}
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="trade" className={labelCls}>
              Trade
            </label>
            <select
              key={v.trade ?? "unset"}
              id="trade"
              name="trade"
              required
              defaultValue={v.trade ?? ""}
              aria-invalid={!!e.trade}
              aria-describedby={e.trade ? "trade-error" : undefined}
              className={`${inputCls} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'%3E%3Cpath d='M4 6l4 4 4-4' stroke='%233f524b' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")] bg-[length:1rem] bg-[right_0.875rem_center] bg-no-repeat pr-10`}
            >
              <option value="" disabled>
                Choose your trade…
              </option>
              {auditTrades.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {e.trade ? (
              <p id="trade-error" className={errorCls}>
                {e.trade}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelCls}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              defaultValue={v.email}
              aria-invalid={!!e.email}
              aria-describedby={e.email ? "email-error" : "email-hint"}
              placeholder="you@yourbusiness.com.au"
              className={inputCls}
            />
            {e.email ? (
              <p id="email-error" className={errorCls}>
                {e.email}
              </p>
            ) : (
              <p id="email-hint" className={hintCls}>
                Where we send the audit.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className={labelCls}>
              Mobile <span className="font-normal text-ink-faint">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              defaultValue={v.phone}
              aria-invalid={!!e.phone}
              aria-describedby={e.phone ? "phone-error" : undefined}
              placeholder="04…"
              className={inputCls}
            />
            {e.phone ? (
              <p id="phone-error" className={errorCls}>
                {e.phone}
              </p>
            ) : null}
          </div>
        </div>

        <fieldset key={v.contact ?? "email"}>
          <legend className={labelCls}>How would you like to hear from us?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {[
              { value: "email", label: "Email me the audit" },
              { value: "phone", label: "Ring me to talk it through" },
            ].map((o) => (
              <label
                key={o.value}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border border-line-strong bg-ground-raised px-3.5 py-2.5 text-small text-ink transition-colors has-[:checked]:border-field has-[:checked]:bg-ground-sunken/60"
              >
                <input
                  type="radio"
                  name="contact"
                  value={o.value}
                  defaultChecked={(v.contact ?? "email") === o.value}
                  className="h-4 w-4 accent-field"
                />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <details className="group border-t rule pt-3">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-small font-semibold text-ink">
            <span>Add detail for a sharper audit <span className="font-normal text-ink-faint">(optional)</span></span>
            <svg className="h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 ease-out-expo group-open:rotate-45" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="grid gap-5 pb-2 pt-4">
            <div>
              <label htmlFor="suburb" className={labelCls}>
                Suburb or area <span className="font-normal text-ink-faint">(optional)</span>
              </label>
              <input
                id="suburb"
                name="suburb"
                type="text"
                autoComplete="address-level2"
                defaultValue={v.suburb}
                placeholder="e.g. Sutherland Shire…"
                className={inputCls}
              />
            </div>
          <div>
            <label htmlFor="listing" className={labelCls}>
              Website or Google listing link{" "}
              <span className="font-normal text-ink-faint">(optional)</span>
            </label>
            <input
              id="listing"
              name="listing"
              type="url"
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              defaultValue={v.listing}
              placeholder="https://…"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="notes" className={labelCls}>
              Anything we should know? <span className="font-normal text-ink-faint">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={v.notes}
              placeholder="A review that’s bothering you, a competitor you keep losing to, the best time to call…"
              className={`${inputCls} h-auto resize-y py-3`}
            />
          </div>
          </div>
        </details>

        {/* Honeypot, hidden from people and assistive tech */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Leave this field empty</label>
          <input id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-4 border-t rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" variant="primary-light" size="lg" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
                  <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Sending…
              </>
            ) : (
              "Request my free audit"
            )}
          </Button>
          <p className="text-[0.8125rem] leading-relaxed text-ink-faint sm:max-w-[20rem] sm:text-right">
            A person reads this today; your audit arrives within two working days. We never
            share your details. Read our{" "}
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
