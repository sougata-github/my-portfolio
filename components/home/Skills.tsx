"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";

/*
  Em dashes here are separator glyphs, not punctuation in a sentence, which
  is why they are exempt from the no-em-dash rule in CLAUDE.md.
*/
const PHRASE =
  "Frontend Engineering — Design Systems — TypeScript First — Full Stack Next.js — Agentic Workflows — Performance";

const WORDS = PHRASE.split(" ");

/*
  Each word fades from near-transparent to full as it passes through the
  scroll range, staggered so the fill sweeps left to right.

  Opacity is the only animated property on purpose. It is a compositor
  property, so the browser never repaints or re-rasterises the text while it
  animates. Animating `color` between muted and foreground would look
  identical and would repaint every frame, which is where jitter comes from.

  The same reason rules out background-clip gradients and clip-path masks,
  both of which are paint-stage effects at this size.
*/
const Word = ({
  children,
  progress,
  range,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span
      /*
        Explicitly 1 rather than undefined. useIsMobile reports false on the
        first render and corrects after mount, so passing undefined leaves
        whatever inline opacity Framer already wrote, freezing the word
        mid-fill.
      */
      style={reduce ? { opacity: 1 } : { opacity }}
      className="inline-block transform-gpu will-change-[opacity]"
    >
      {children}
    </motion.span>
  );
};

const Skills = () => {
  const reduce = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);

  /*
    Off on mobile. The hero is content-height on portrait, so this band is
    already partly on screen at load, which means the fill starts mid-sweep
    and you arrive at text that is half lit for no visible reason. The
    shorter scroll distance on a phone also makes what remains too fast to
    read as deliberate. Full opacity is the better default there.
  */
  const still = reduce || isMobile;

  /*
    The offset window sets the pace. Progress runs 0 to 1 across the scroll
    distance between these two points, so a wider window means more scrolling
    per unit of fill, which reads as slower.

    Widen the gap between the two numbers to slow the sweep further, narrow
    it to speed up.
  */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.3"],
  });

  return (
    <div ref={ref}>
      <p
        aria-label={PHRASE}
        /*
          Muted on mobile, where there is no fill to run and every word sits
          at opacity 1, so the whole line reads as one consistent colour.
          Desktop is foreground and lets opacity do the work instead.
        */
        className="font-display uppercase leading-[1.25] tracking-wide text-[clamp(1.15rem,3.5vw,2.5rem)] text-muted-foreground md:text-foreground"
      >
        {WORDS.map((word, i) => {
          // Each word occupies a slice of the range, overlapping the next so
          // the sweep reads as continuous rather than as discrete steps.
          const start = i / WORDS.length;
          const end = start + 1.6 / WORDS.length;

          return (
            <span key={`${word}-${i}`} aria-hidden="true">
              <Word
                progress={scrollYProgress}
                range={[start, Math.min(end, 1)]}
                reduce={still}
              >
                {word}
              </Word>
              {i < WORDS.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default Skills;
