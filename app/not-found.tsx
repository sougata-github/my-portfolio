import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wandered off | Sougata Das",
  description: "This page does not exist.",
};

const NotFound = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between px-4 pt-6 pb-10 md:px-8">
      {/* Rail, mirroring the hero */}
      <div className="flex items-center justify-between gap-x-4">
        <span className="label">Error 404</span>
        <span className="label">Nothing here</span>
      </div>

      <div className="py-24 sm:py-28 md:py-20">
        <h1 className="font-display uppercase">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span className="block font-light leading-[0.94] tracking-wide text-[clamp(2rem,8.2vw,6.25rem)]">
              Wandered
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[6%] md:pl-[8%]">
            <span className="block font-medium leading-[0.94] tracking-wide text-[clamp(1.6rem,7vw,5.25rem)]">
              Off The Map
            </span>
          </span>
        </h1>

        <p className="mt-20 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-24 md:ml-auto md:text-base">
          This page does not exist, or it did once and has since moved on.
          Either way, there is nothing to see here.
        </p>
      </div>

      <div>
        <div className="h-px w-full bg-border" />
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 sm:justify-between">
          <Link
            href="/"
            className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Back home
          </Link>
          <Link
            href="/blog"
            className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Read posts
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
