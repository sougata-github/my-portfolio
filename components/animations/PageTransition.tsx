"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          className="h-screen w-screen pointer-events-none fixed bg-dark top-0 left-0"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
        />

        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
