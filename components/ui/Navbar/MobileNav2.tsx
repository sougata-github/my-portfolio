"use client";

import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { GridViewIcon } from "../../icons/Grid";
import { iconLinks, links } from "../../icons/MobileNavIcons";

import { motion } from "framer-motion";

const MobileNav2 = () => {
  return (
    <motion.div
      className="sm:hidden fixed right-0 left-0 bottom-0 bg-[#e4e4e4] w-full py-6 px-4 flex justify-end"
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        y: 0,
        opacity: 100,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
    >
      <Sheet>
        <SheetTrigger>
          <GridViewIcon className="text-gray-500 h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="bottom" className="p-0">
          <ul className="flex flex-wrap justify-center items-start py-8 mt-2 gap-4">
            {iconLinks.map((item: links) => (
              <li key={item.link} className="cursor-pointer p-2 rounded-xl">
                <Link
                  href={`${item.link === "Home" ? "/" : `/#${item.link}`}`}
                  className="font-medium flex flex-col items-center gap-2"
                >
                  {item.icon}
                  <p className="text-xs font-medium text-gray-500 text-center">
                    {item.link}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default MobileNav2;
