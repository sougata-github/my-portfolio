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
    <span
      className={cn(
        "relative inline-block overflow-hidden align-baseline",
        className
      )}
    >
      <motion.span
        initial={{
          clipPath: "inset(0 100% 0 0)",
          filter: "blur(8px)",
          opacity: 0,
        }}
        animate={{
          clipPath: "inset(0 0% 0 0)",
          filter: "blur(0px)",
          opacity: 1,
        }}
        transition={{ duration: 1, ease, delay }}
        className="relative will-change-[clip-path,filter,opacity]"
      >
        {children}
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[22%] rounded-sm blur-sm"
        initial={{ x: "-25%" }}
        animate={{ x: "125%" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: delay + 0.05 }}
      />
    </span>
  );
}
