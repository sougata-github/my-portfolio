"use client";

import { MotionDiv } from "@/types";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div key={pathname}>
      <MotionDiv
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
      </MotionDiv>
    </div>
  );
};

export default PageTransition;
