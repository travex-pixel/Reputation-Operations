"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { site } from "@/lib/site";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="bg-ground">
      <div className="container-x py-24 md:py-32">
        <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-faint">
          Something went wrong
        </p>
        <h1 className="mt-3 text-title text-ink">This page didn’t load properly.</h1>
        <p className="mt-4 max-w-[30rem] text-lede text-ink-soft">
          Try again. If it keeps happening, email{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-ink underline underline-offset-4">
            {site.email}
          </a>{" "}
          and we’ll sort it out.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Button onClick={reset} variant="primary-light">
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Back to the homepage
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
