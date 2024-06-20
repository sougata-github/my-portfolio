"use client";

import { links } from "@/lib/data";

import Link from "next/link";
import MobileNav1 from "./MobileNav1";

import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      className="z-[20] bg-[#ebebeb] mx-auto max-w-7xl max-sm:hidden py-4 sticky top-0 w-full pt-6 px-4 text-light-1 tracking-tight h-[75px]"
      initial={{
        opacity: 0,
        y: -50,
      }}
      animate={{
        opacity: 100,
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
    >
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-xl cursor-pointer transition-all hover:text-black"
        >
          Sougata
        </Link>
        <ul className="flex gap-8 items-center max-lg:hidden">
          {links.map((link: string, index) => (
            <li key={index} className="transition-all hover:text-black">
              <Link
                href={`${link === "Home" ? "/" : `/#${link}`}`}
                className="font-medium"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
        <MobileNav1 />
      </nav>
    </motion.header>
  );
};

export default Navbar;
