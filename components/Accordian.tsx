"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  id: string;
  expanded: boolean;
  handleCopy: (id: string) => void;
  date: string;
  position: string;
  description: string;
  company: string;
  type: string;
}

const Accordian = ({
  index,
  id,
  date,
  position,
  company,
  type,
  description,
  expanded,
  handleCopy,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [expanded, description]);

  return (
    <motion.div
      layout
      transition={{
        layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4 * index,
        },
      }}
      className={cn("w-full py-2 transition-all duration-500")}
    >
      <button
        className="flex justify-between w-full items-center"
        onClick={() => handleCopy(id)}
      >
        <div className="flex flex-col items-start text-left">
          <h3 className="font-medium text-base md:text-lg">{position}</h3>
          <p className="text-foreground/60 text-sm">
            <span className="capitalize">{company}</span> /{" "}
            <span className="lowercase">{type}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-foreground/60 text-sm">{date}</span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ChevronDown className="size-4 text-foreground/60" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        <motion.div
          key="content"
          initial={false}
          animate={{
            height: expanded ? height : 0,
            opacity: expanded ? 1 : 0,
            filter: expanded ? "blur(0px)" : "blur(2px)",
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden"
        >
          <motion.div
            ref={ref}
            initial={false}
            animate={{
              scale: 1,
              filter: expanded ? "blur(0px)" : "blur(4px)",
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pt-4"
          >
            <p className="text-sm leading-relaxed text-foreground/90 font-[family-name:var(--font-inter)] max-w-2xl">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Accordian;
