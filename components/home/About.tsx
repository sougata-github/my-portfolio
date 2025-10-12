"use client";

import { MagicReveal } from "../animations/MagicReveal";
import { ChevronDown } from "lucide-react";

import { motion } from "framer-motion";
import CopyButton from "../CopyButton";

const sectionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  return (
    <motion.section
      className="py-5"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex items-center gap-1 px-2.5 py-0.5 border rounded-full w-fit">
        <div className="size-2 rounded-full bg-green-500 animate-pulse" />
        <div className="p-0.5 flex items-center justify-center">
          <span className="text-xs">Available for hire</span>
        </div>
      </div>

      <motion.div
        className="mt-2"
        variants={itemVariants}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl font-[family-name:var(--font-inter)]">
          <MagicReveal delay={0.05}>Sougata Das</MagicReveal>
        </h1>
        <p className="mt-2 text-pretty font-[family-name:var(--font-inter)] text-foreground/60 text-base md:text-lg">
          <MagicReveal delay={0.35}>
            frontend developer based in India
          </MagicReveal>
        </p>
      </motion.div>

      <motion.div
        className="mt-4 flex pl-0 p-2 items-center gap-2"
        variants={itemVariants}
        initial="initial"
        animate="animate"
      >
        <CopyButton />
        <a
          href="/resume.pdf"
          className="text-sm font-medium flex gap-1 items-center relative overflow-y-clip group"
          download
        >
          <ChevronDown className="size-4 -translate-y-5 md:group-hover:translate-y-0.5 transition duration-500 absolute" />
          <ChevronDown className="size-4 md:group-hover:translate-y-5 duration-500 transition mt-0.5" />
          resume
        </a>
      </motion.div>
    </motion.section>
  );
};

export default About;
