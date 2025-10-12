"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type React from "react";

type MagicRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function MagicReveal({
  children,
  delay = 0,
  className,
}: MagicRevealProps) {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <span className={cn("relative inline-block align-baseline", className)}>
      <motion.span
        style={{
          ["--s" as any]: "80px",
          ["--p" as any]: "0%",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black calc(var(--p) - var(--s)), transparent calc(var(--p) + var(--s)), transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black calc(var(--p) - var(--s)), transparent calc(var(--p) + var(--s)), transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
        initial={{ opacity: 0, filter: "blur(8px)", ["--p" as any]: "0%" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          ["--p" as any]: "100%",
          WebkitMaskImage: "none",
          maskImage: "none",
        }}
        transition={{ duration: 1.1, ease, delay }}
        className="relative will-change-[opacity,filter]"
      >
        {children}
      </motion.span>
    </span>
  );
}
