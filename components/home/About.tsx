"use client";

import { motion } from "framer-motion";
import { MagicReveal } from "../animations/MagicReveal";

const About = () => {
  return (
    <section className="py-5">
      <div className="flex items-center gap-1 p-2">
        <div className="size-2 rounded-full bg-green-500 animate-pulse" />
        <div className="p-0.5 flex items-center justify-center">
          <span className="text-xs">Available for hire</span>
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl font-[family-name:var(--font-inter)]">
          <MagicReveal delay={0.05}>Sougata Das</MagicReveal>
        </h1>
        <p className="text-pretty font-[family-name:var (--font-inter)] text-base text-muted-foreground md:text-lg pl-1">
          <MagicReveal delay={0.35}>
            frontend developer based in India
          </MagicReveal>
        </p>
      </div>
    </section>
  );
};

export default About;
