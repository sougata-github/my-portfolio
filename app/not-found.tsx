import type { Metadata } from "next";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { SITE_URL } from "@/lib/site";

/*
  Deliberately minimal.

  No robots block: Next emits <meta name="robots" content="noindex"> on
  not-found automatically, and adding our own only produced a second,
  duplicate tag. Omitting `follow` leaves it implied, which is what you want
  here so a crawler can still walk the recovery links back into the site.
  Explicit nofollow would have blocked exactly that.

  No canonical either. The route returns a real 404, and a canonical on an
  error page is ignored at best and a confusing signal at worst.

  What actually makes a 404 correct: the 404 status, noindex, absence from
  the sitemap, and links back to real content. All four hold here.
*/
export const metadata: Metadata = {
  title: "Page not found | Sougata Das",
  description: "This page does not exist.",
  openGraph: {
    title: "Page not found | Sougata Das",
    description: "This page does not exist.",
    url: SITE_URL,
    siteName: "Sougata Das",
    type: "website",
  },
};

/*
  Same border treatment as the rest of the site. The Section component is not
  reused here because this page needs min-h-screen on the outer element and
  its own vertical rhythm, so the shell is inlined.
*/
const NotFound = () => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      {/*
        Header, body and footer are three banded rows, matching the homepage
        where the nav sits above a full-bleed rule and the footer below one.

        The toggle sits top right, the same corner it occupies in the real
        nav, because this page renders outside the (routes) layout and would
        otherwise be the one place on the site with no way to change theme.
      */}
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-x-4 border-border px-4 py-4 md:border-x md:px-8">
        <span className="label">Error 404</span>
        <ThemeToggle />
      </div>

      <div className="flex flex-1 border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col justify-center border-border px-4 py-24 sm:py-28 md:border-x md:px-8 md:py-20">
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

      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-4 border-border px-4 py-5 sm:justify-between md:border-x md:px-8">
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
