"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface Props {
  index: number;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const makeSectionVariants = (reduce: boolean) => ({
  hidden: reduce
    ? { opacity: 0, y: 0, scale: 1, filter: "blur(0px)" }
    : { opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" },
  visible: (i: number) =>
    reduce
      ? {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.3 },
        }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            duration: 1.1,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          },
        },
});

const AnimatedSection = ({ index, id, className, children }: Props) => {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.section
      id={id}
      custom={index}
      variants={makeSectionVariants(reduce)}
      initial="hidden"
      animate="visible"
      className={cn(
        // transform-gpu promotes the section to its own compositor layer so
        // the blur and transform animate together without repainting text.
        "transform-gpu overflow-hidden will-change-[opacity,filter,transform]",
        className
      )}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
