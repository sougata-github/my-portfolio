"use client";

import { AnimatePresence, motion } from "framer-motion";

import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          className="bg-[#ebebeb] fixed inset-0 h-screen w-screen pointer-events-none"
          initial={{
            opacity: 100,
          }}
          animate={{
            opacity: 0,
            transition: {
              ease: "easeInOut",
              duration: 1,
              delay: 1.4,
            },
          }}
        />
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
