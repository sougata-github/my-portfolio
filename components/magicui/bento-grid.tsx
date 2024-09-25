"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const BentoGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pt-6 grid w-full auto-rows-[12rem] sm:auto-rows-[16rem] lg:auto-rows-[16rem] grid-cols-2 md:grid-cols-3 gap-4">
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  href,
  index,
}: {
  name: string;
  className: string;
  background: ReactNode;
  href: string;
  index: number;
}) => {
  return (
    <MotionLink
      initial={{
        opacity: 0,
        y: 20,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 100,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        delay: 0.4 * (index + 1),
        duration: 1,
      }}
      href={href}
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        // light styles
        "bg-black [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
    >
      <div>{background}</div>
      <div
        className={cn(
          "bg-black/60 pointer-events-none absolute opacity-0 inset-0 flex w-full translate-y-10 transform-gpu flex-row items-center justify-center p-4 transition-all duration-300 group-hover:translate-y-0 md:group-hover:opacity-80"
        )}
      >
        <Eye className="h-4 w-4 opacity-100" />
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </MotionLink>
  );
};

export { BentoCard, BentoGrid };
