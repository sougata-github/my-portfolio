"use client";

import "./globals.css";

import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

/*
  Last-resort boundary. It replaces the root layout when that layout itself
  throws, so it has to render its own <html> and <body>, load its own fonts
  and pull in the stylesheet. Nothing from app/layout.tsx is available here,
  including the theme provider, so this page follows the OS preference
  through the CSS media query alone.

  Same full-bleed shell as the 404: three banded rows in the page column.
*/
const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export default function GlobalError({
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
    <html lang="en">
      <body
        className={cn(
          "overflow-y-scroll font-sans",
          geistSans.className,
          geistMono.variable,
          spaceGrotesk.variable
        )}
      >
        <main className="flex min-h-screen w-full flex-col">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-x-4 border-border px-4 py-4 md:border-x md:px-8">
            <span className="label">Error</span>
            <span className="label">sougata.me</span>
          </div>

          <div className="flex flex-1 border-t border-border">
            <div className="mx-auto flex w-full max-w-5xl flex-col justify-center border-border px-4 py-24 sm:py-28 md:border-x md:px-8 md:py-20">
              <h1 className="font-display uppercase">
                <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                  <span className="block font-light leading-[0.94] tracking-wide text-[clamp(2rem,8.2vw,6.25rem)]">
                    The Site
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[6%] md:pl-[8%]">
                  <span className="block font-medium leading-[0.94] tracking-wide text-[clamp(1.6rem,7vw,5.25rem)]">
                    Fell Over
                  </span>
                </span>
              </h1>

              <p className="mt-20 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-24 md:ml-auto md:text-base">
                Something failed before the page could be drawn. Reloading
                usually clears it.
              </p>
            </div>
          </div>

          <div className="border-t border-border">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-4 border-border px-4 py-5 sm:justify-between md:border-x md:px-8">
              <button
                type="button"
                onClick={reset}
                className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
              >
                Try again
              </button>
              {error.digest && (
                <span className="label">Error {error.digest}</span>
              )}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
