"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div key={pathname}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 100,
          transition: {
            ease: "easeInOut",
            delay: 0.8,
            duration: 0.5,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
