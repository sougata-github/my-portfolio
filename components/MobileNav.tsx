"use client";

import { links } from "@/lib/data";
import { cn } from "@/lib/utils";

import { Menu } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { motion } from "framer-motion";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      className="backdrop-blur bg-dark/50 z-10 sticky top-0 flex items-center justify-between py-4 px-8 md:hidden border-b-light/20 border-b-[0.5px]"
      initial={{
        y: -5,
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{
        y: 0,
        opacity: 100,
        filter: "blur(0px)",
        transition: {
          ease: "easeIn",
          duration: 0.4,
        },
      }}
    >
      {/* title */}
      <Link href="/" className="flex flex-col">
        <h1 className="text-light text-lg">Sougata Das</h1>
        <p className="text-light/60 text-base">Developer</p>
      </Link>

      {/* links */}
      <Sheet>
        <SheetTrigger>
          <div className="rounded-md p-3 border-light/20 border-[0.5px] bg-background/5 hover:bg-background/10 hover:border-light/30 transition-all">
            <Menu className="h-5 w-5 text-light/40 hover:text-light/50 transition-all" />
          </div>
        </SheetTrigger>
        <SheetContent
          className="backdrop-blur bg-dark/50 flex flex-col items-center justify-center text-base h-60 border-none text-light/40"
          side="top"
        >
          <ul className="grid grid-cols-2 place-items-center gap-4">
            {links.map((link) => (
              <Link
                href={link.link}
                key={link.label}
                className={cn(
                  "px-4 py-2 relative hover:text-light transition-all",
                  pathname === link.link && "text-light"
                )}
              >
                {link.label}
                {pathname === link.link && (
                  <motion.span
                    className="absolute inset-0 bg-background/5 rounded-md"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 100,
                    }}
                    transition={{
                      type: "tween",
                      stiffness: 200,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
};

export default MobileNav;
