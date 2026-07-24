"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { footerLinks } from "@/constants";
import CopyButton from "../CopyButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
  Every variant is built from the reduced-motion flag rather than branching
  at the call site. When motion is reduced, elements still fade in so the
  page is not jarringly static, but nothing travels and nothing blurs.
*/

/* Each display line rides up from behind its own overflow mask. */
const makeLine = (reduce: boolean) => ({
  hidden: reduce ? { y: "0%", opacity: 0 } : { y: "115%" },
  visible: (i: number) =>
    reduce
      ? { y: "0%", opacity: 1, transition: { duration: 0.3 } }
      : {
          y: "0%",
          transition: { duration: 1.15, delay: 0.25 + i * 0.1, ease: EASE },
        },
});

const makeFade = (reduce: boolean) => ({
  hidden: reduce
    ? { opacity: 0, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 8, filter: "blur(6px)" },
  visible: (i: number) =>
    reduce
      ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3 } }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.9, delay: 0.5 + i * 0.08, ease: EASE },
        },
});

const makeRule = (reduce: boolean) => ({
  hidden: reduce ? { scaleX: 1, opacity: 0 } : { scaleX: 0 },
  visible: reduce
    ? { scaleX: 1, opacity: 1, transition: { duration: 0.3 } }
    : { scaleX: 1, transition: { duration: 1.4, delay: 0.35, ease: EASE } },
});

const Hero = () => {
  const reduce = useReducedMotion() ?? false;
  const line = makeLine(reduce);
  const fade = makeFade(reduce);
  const rule = makeRule(reduce);

  /*
    Parallax is measured against the hero's own scroll range, not the page,
    so it behaves the same whether the section is full height on landscape
    or content height on portrait. Progress hits 1 as the hero's bottom
    edge reaches the top of the viewport.

    The name drifts roughly twice as far as the bio, which is what reads as
    depth. Both are transform and opacity only, so nothing reflows.
  */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const bioY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const nameStyle = reduce ? undefined : { y: nameY, opacity: nameOpacity };
  const bioStyle = reduce ? undefined : { y: bioY, opacity: nameOpacity };

  return (
    <section
      ref={heroRef}
      className="flex flex-col justify-between pt-6 pb-10 wide:min-h-[88svh]"
    >
      {/* Top rail: location left, resume pinned right */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex items-center justify-between gap-x-4"
      >
        <motion.span
          custom={0}
          variants={fade}
          className="label block transform-gpu will-change-[opacity,filter,transform]"
        >
          Based in India
        </motion.span>

        <motion.a
          custom={1}
          variants={fade}
          href="/resume.pdf"
          download
          className="label transform-gpu underline decoration-1 underline-offset-4 transition-colors duration-300 will-change-[opacity,filter,transform] hover:text-foreground"
        >
          Resume
        </motion.a>
      </motion.div>

      {/* Name and title, left aligned with the title stepped in */}
      {/*
        On portrait there is no min-height, so these paddings are the only
        thing giving the hero its height. They are deliberately larger than
        the desktop values, where spare height gets distributed instead.
      */}
      <div className="py-24 sm:py-28 md:py-20">
        {/*
          Scalzo alignment: line two is set close to line one's size and
          stepped in from the left, so its extra characters push it past
          line one's right edge. The overhang is the whole effect, so the
          two sizes have to stay close. Widening the gap kills it.
        */}
        {/*
          Parallax lives on a wrapper rather than the h1 itself. The entrance
          variants already drive y on the inner spans, and stacking a scroll
          transform onto the same element would fight them.
        */}
        <motion.div style={nameStyle} className="transform-gpu">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="font-display uppercase"
          >
            {/*
            pb/-mb pair keeps the reveal mask below the baseline so tight
            leading never clips a glyph, without adding layout height.
          */}
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <motion.span
                custom={0}
                variants={line}
                className="block transform-gpu will-change-transform font-light leading-[0.94] tracking-wide text-[clamp(2rem,8.2vw,6.25rem)]"
              >
                Sougata Das
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[6%] md:pl-[8%]">
              <motion.span
                custom={1}
                variants={line}
                className="block transform-gpu will-change-transform font-medium leading-[0.94] tracking-wide text-[clamp(1.6rem,7vw,5.25rem)]"
              >
                React Developer
              </motion.span>
            </span>
          </motion.h1>
        </motion.div>

        <motion.div style={bioStyle} className="transform-gpu">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fade}
            className="mt-20 max-w-sm transform-gpu text-pretty text-sm leading-relaxed text-muted-foreground will-change-[opacity,filter,transform] sm:mt-24 md:ml-auto md:text-base"
          >
            I build modern, performant web applications with React and
            TypeScript, from design system to deployment.
          </motion.p>
        </motion.div>
      </div>

      {/* Rule + actions */}
      <div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rule}
          className="h-px w-full origin-left transform-gpu bg-border will-change-transform"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4 sm:justify-between"
        >
          <motion.div
            custom={0}
            variants={fade}
            className="flex transform-gpu items-center gap-5 will-change-[opacity,filter,transform]"
          >
            <CopyButton />
          </motion.div>

          <motion.div
            custom={1}
            variants={fade}
            className="flex transform-gpu items-center gap-5 will-change-[opacity,filter,transform]"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="label hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
