"use client";

import { useEffect } from "react";

/*
  Route error boundary for everything inside the site chrome.

  Sits inside app/(routes)/layout.tsx, so the nav and footer stay and the
  column keeps its rules. Rendered with the same anatomy as the 404: a
  label rail, a two-line display headline, one muted line, then the ways
  out. reset() re-renders the segment, which is the right first move for a
  transient failure. The digest is Next's correlation id for the server
  log, shown small so a report can quote it.
*/
export default function RouteError({
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
    <section className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col justify-center border-border px-4 py-24 sm:py-28 md:border-x md:px-8 md:py-20">
        <span className="label">Something broke</span>

        <h1 className="mt-16 font-display uppercase sm:mt-20">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span className="block font-light leading-[0.94] tracking-wide text-[clamp(2rem,8.2vw,6.25rem)]">
              That did
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[6%] md:pl-[8%]">
            <span className="block font-medium leading-[0.94] tracking-wide text-[clamp(1.6rem,7vw,5.25rem)]">
              Not Load
            </span>
          </span>
        </h1>

        <p className="mt-20 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-24 md:ml-auto md:text-base">
          Something on this page failed while rendering. Trying again usually
          clears it. If it keeps happening, the message below is what to send
          me.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 md:ml-auto">
          <button
            type="button"
            onClick={reset}
            className="label flex h-12 items-center border border-border px-6 text-foreground transition-colors duration-300 hover:border-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Back home
          </a>
        </div>

        {error.digest && (
          <p className="label mt-8 md:ml-auto">Error {error.digest}</p>
        )}
      </div>
    </section>
  );
}
