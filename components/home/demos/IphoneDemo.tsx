"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, isAbort, makeTick } from "./sequence";

/*
  Hero of the iPhone 15 Pro landing page, rebuilt without the video.

  The real hero plays a clip of the phone assembling out of titanium dust
  across the word. Here the word is set in type and the phone is drawn in
  CSS, a side profile with its antenna bands and its action and volume
  buttons, all strokes and fills on the site's tokens.

  The entrance mirrors the page's GSAP timeline: the word, the phone rising
  into place, then the title and the call to action. It starts when the
  cell scrolls into view, holds, fades out, and plays again after a pause.
*/

const NAV = ["Store", "Mac", "iPhone", "Support"] as const;

/* Entrance delays, in seconds, matching the page's stagger. */
const WORD_DELAY = 0.2;
const PHONE_DELAY = 0.5;
const TITLE_DELAY = 1.2;
const CTA_DELAY = 1.6;

const ENTRANCE_MS = 2600;
const HOLD_MS = 3200;
const EXIT_MS = 700;
const PAUSE_MS = 600;

type Phase = "in" | "out";

const IphoneDemo = () => {
  const reduce = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.35 });
  const [phase, setPhase] = useState<Phase>("in");
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    const controller = new AbortController();
    const tick = makeTick(controller.signal);

    const run = async () => {
      setPhase("in");
      await tick(ENTRANCE_MS + HOLD_MS);
      setPhase("out");
      await tick(EXIT_MS + PAUSE_MS);
      setLoopKey((k) => k + 1);
    };

    run().catch((error) => {
      if (!isAbort(error)) throw error;
    });

    return () => controller.abort();
  }, [inView, reduce, loopKey]);

  const shown = reduce || (inView && phase === "in");

  /*
    One transition per element. On the way in each element waits its turn,
    on the way out they all leave together.
  */
  const fadeProps = (delay: number) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: shown ? 1 : 0 },
    transition:
      phase === "out"
        ? { duration: EXIT_MS / 1000, ease: EASE }
        : { duration: 0.8, delay, ease: EASE },
  });

  const riseProps = {
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: shown ? 1 : 0, y: shown ? 0 : 28 },
    transition:
      phase === "out"
        ? { duration: EXIT_MS / 1000, ease: EASE }
        : { duration: 1, delay: PHONE_DELAY, ease: EASE },
  };

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-background text-muted-foreground"
    >
      {/* Navbar: logo, links, search and bag. */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3 text-[11px]">
        <AppleLogo className="size-3 text-foreground" />
        <ul className="flex items-center gap-4">
          {NAV.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Search className="size-3.5" aria-hidden />
          <ShoppingBag className="size-3.5" aria-hidden />
        </div>
      </div>

      {/* Hero. Keyed on the loop so the entrance replays from its start. */}
      <div
        key={loopKey}
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-5 px-4 pb-4"
      >
        <motion.p
          {...fadeProps(TITLE_DELAY)}
          className="text-[12px] font-medium leading-none text-muted-foreground"
        >
          iPhone 15 Pro
        </motion.p>

        <div className="relative flex w-full items-center justify-center">
          <motion.span
            {...fadeProps(WORD_DELAY)}
            aria-hidden
            className="select-none font-medium leading-none text-[clamp(2.75rem,14vw,5rem)] text-muted-foreground"
          >
            Titanium
          </motion.span>

          <motion.div
            {...riseProps}
            className="absolute left-1/2 top-[58%] w-[88%] -translate-x-1/2 transform-gpu"
          >
            <Phone />
          </motion.div>
        </div>

        <motion.div
          {...fadeProps(CTA_DELAY)}
          className="flex flex-col items-center gap-2"
        >
          <span className="rounded-full border border-muted-foreground px-4 py-1 text-[11px] leading-none text-foreground">
            Buy
          </span>
          <span className="text-[10px] leading-none">
            From $199/month or $999
          </span>
        </motion.div>
      </div>
    </div>
  );
};

/*
  Side profile, lying flat, like the frame the video settles on. Strokes on
  muted, fills on the muted surface, so it follows the theme with
  everything else.
*/
const Phone = () => {
  return (
    <div className="relative h-3.5 w-full" aria-hidden>
      {/* Body. No camera plateau, the profile stays a clean bar. */}
      <div className="absolute inset-0 rounded-[4px] border border-muted-foreground bg-muted">
        {/* Antenna bands */}
        <span className="absolute inset-y-0 left-[8%] w-px bg-muted-foreground" />
        <span className="absolute inset-y-0 right-[8%] w-px bg-muted-foreground" />

        {/* Action button, volume up, volume down */}
        <span className="absolute top-1/2 left-[58%] h-[4px] w-[7%] -translate-y-1/2 rounded-full border border-muted-foreground" />
        <span className="absolute top-1/2 left-[67%] h-[4px] w-[7%] -translate-y-1/2 rounded-full border border-muted-foreground" />
        <span className="absolute top-1/2 left-[76%] h-[4px] w-[4%] -translate-y-1/2 rounded-full border border-muted-foreground" />
      </div>
    </div>
  );
};

const AppleLogo = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 814 1000" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
      />
    </svg>
  );
};

export default IphoneDemo;
