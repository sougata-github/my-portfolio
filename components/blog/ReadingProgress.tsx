"use client";

import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

/*
  Floating reading progress for a post, after the pii-ai ring.

  An arc and a mono percentage, fixed bottom right inside the page column.
  Progress is 0 when the article's top reaches the top of the viewport and 1
  when its bottom reaches the bottom. It fades in once the cover has entered
  the viewport and out again just before the end of the article, so it is
  never on screen while there is nothing to measure.

  Measured on scroll through a single requestAnimationFrame, and the arc is
  a stroke-dashoffset, which is compositor-friendly. Monotone: the arc is
  foreground, the track is the border token.
*/

const RADIUS = 16;
const CENTER = 20;
const STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const EXIT_MARGIN = 96;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const ReadingProgress = ({
  targetRef,
  coverRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
  coverRef: RefObject<HTMLElement | null>;
}) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollable = rect.height - viewport;

      setProgress(
        scrollable <= 0
          ? rect.top <= 0
            ? 1
            : 0
          : clamp(-rect.top / scrollable, 0, 1)
      );

      const cover = coverRef.current;
      const coverIn = cover
        ? cover.getBoundingClientRect().top < viewport * 0.9
        : true;
      const nearEnd = rect.bottom < viewport - EXIT_MARGIN;
      setVisible(coverIn && !nearEnd);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef, coverRef]);

  const pct = Math.round(progress * 100);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-40 transition-opacity sm:bottom-6",
        visible ? "opacity-100 duration-300" : "opacity-0 duration-100"
      )}
    >
      <div className="mx-auto flex max-w-5xl justify-end px-4 md:px-8">
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-hidden={!visible}
          className="relative flex size-12 items-center justify-center rounded-full bg-background"
        >
          <svg viewBox="0 0 40 40" className="size-full -rotate-90" aria-hidden>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              className="text-border"
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              className="text-foreground"
            />
          </svg>
          <span className="absolute font-mono text-[10px] tabular-nums text-foreground">
            {pct}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReadingProgress;
