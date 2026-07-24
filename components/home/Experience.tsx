"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experienceData } from "@/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
  Stagger is driven by the parent rather than a per-item delay. Each child
  inherits its turn from staggerChildren, so adding an entry to
  experienceData needs no index bookkeeping here.
*/
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const makeItem = (reduce: boolean) => ({
  hidden: reduce
    ? { opacity: 0, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 18, filter: "blur(7px)" },
  visible: reduce
    ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3 } }
    : {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.95, ease: EASE },
      },
});

const Experience = () => {
  const reduce = useReducedMotion() ?? false;
  const item = makeItem(reduce);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      /*
        whileInView, not animate. These entries sit well below the fold, and
        firing on mount means the stagger plays out before anyone scrolls to
        it. once: true stops it replaying on every pass.
      */
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/*
        Marker rule for the page: sections that are lists get one, sections
        that are a single statement (the skills band) do not. No trailing
        value on the right, since every row already carries its own date and
        repeating the range here was pure redundancy.
      */}
      <motion.div
        variants={item}
        className="transform-gpu will-change-[opacity,filter,transform]"
      >
        <span className="label">Experience</span>
      </motion.div>

      {/*
        Three columns spanning the full measure rather than two pushed to
        opposite edges. Role moves out of a stack under the company and into
        the middle, which fills the space that previously read as a gap.
        Collapses to a stack below md.
      */}
      <div className="mt-4 flex flex-col">
        {experienceData.map((experience) => (
          <motion.div
            key={experience.id}
            variants={item}
            className="flex w-full transform-gpu items-start justify-between gap-4 border-b border-border py-7 will-change-[opacity,filter,transform] last:border-b-0 md:grid md:grid-cols-12 md:items-baseline md:gap-x-6"
          >
            <h3 className="font-display uppercase tracking-wide text-xl font-normal leading-[1.1] md:col-span-5 md:text-[clamp(1.375rem,2.3vw,2rem)]">
              {experience.href ? (
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-muted-foreground"
                >
                  {experience.company}
                </a>
              ) : (
                experience.company
              )}
            </h3>

            {/*
              display: contents at md dissolves this wrapper so the two labels
              drop straight into the 12-column grid. Below md it is a real
              right-aligned stack, which keeps the row to two columns instead
              of letting role and date wrap onto their own full-width lines.
            */}
            <div className="flex flex-col items-end gap-1 md:contents">
              <p className="label text-right md:col-span-4 md:text-left">
                {experience.position} · {experience.type}
              </p>

              <span className="label text-right md:col-span-3">
                {experience.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;
