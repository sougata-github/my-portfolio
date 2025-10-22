"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Thinking = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className="relative flex items-center space-x-2 text-muted-foreground"
      initial={{ y: 5, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          ease: "easeOut",
        },
      }}
    >
      <div className="bg-foreground border-none animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full border-2 size-2" />
      <span className="sr-only">Loading</span>
    </motion.div>
  );
};

export default Thinking;
