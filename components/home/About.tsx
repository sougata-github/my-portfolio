"use client";

import { ChevronDown } from "lucide-react";
import { MagicReveal } from "../animations/MagicReveal";

import { motion } from "framer-motion";
import CopyButton from "../CopyButton";

const sectionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  return (
    <motion.div
      className="py-5"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div className="mt-5" variants={itemVariants}>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl font-[family-name:var(--font-inter)]">
          <MagicReveal delay={0.05}>Sougata Das</MagicReveal>
        </h1>
        <p className="mt-4 text-pretty font-[family-name:var(--font-inter)] text-sm md:text-lg max-w-lg">
          React developer based in India. I specialize in building modern and
          performant applications using Next.js and TypeScript.
        </p>
      </motion.div>

      <motion.div
        className="mt-4 flex pl-0 p-2 items-center gap-4"
        variants={itemVariants}
      >
        <a
          href="/resume.pdf"
          className="text-sm font-medium flex gap-1 items-center relative overflow-y-clip group"
          download
        >
          <ChevronDown className="size-4 -translate-y-5 md:group-hover:translate-y-0.5 transition duration-500 absolute" />
          <ChevronDown className="size-4 md:group-hover:translate-y-5 duration-500 transition mt-0.5" />
          resume
        </a>
        <CopyButton />
      </motion.div>
    </motion.div>
  );
};

export default About;
