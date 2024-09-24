"use client";

import { cn } from "@/lib/utils";
import { links } from "@/lib/data";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import CopyButton from "./CopyButton";

const Sidebar = () => {
  const pathname = usePathname();

  const isProjects = pathname.startsWith("/projects");

  return (
    <aside className="border-r border-white/5 sticky top-0 w-48 hidden h-screen md:block py-20 pr-2">
      <motion.div
        className="flex flex-col gap-8"
        initial={{
          y: 20,
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={{
          y: 0,
          opacity: 100,
          filter: "blur(0px)",
          transition: {
            duration: 0.8,
            ease: "easeIn",
          },
        }}
      >
        {/* Siderbar Image and title */}
        <div className="w-full tracking-wide text-left flex flex-col gap-4">
          <div className="flex items-center justify-center w-fit rounded-full p-0.5 bg-background/5">
            <Image
              src="/emoji.png"
              alt="profile picture"
              placeholder="blur"
              blurDataURL="https://placehold.co/76x76"
              height={72}
              width={72}
              quality={100}
              unoptimized
              className="rounded-full object-center"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <h1 className="text-light font-lato text-xl font-semibold">
              Sougata Das
            </h1>

            <div className="inline-flex items-center gap-2">
              <span className="size-2 bg-green-500 rounded-full absolute" />
              <span className="size-2 bg-green-500 rounded-full animate-ping" />

              <p className="text-light/60 text-xs">Available for hire</p>
            </div>
          </div>
        </div>

        {/* links */}
        <nav className="w-full text-base text-light/60 flex flex-col gap-2 items-start">
          {links.map((link, index) => (
            <motion.div
              className="relative flex w-full items-start justify-start rounded-md p-[12px]"
              key={link.label}
              initial={{
                y: 20,
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                y: 0,
                opacity: 100,
                filter: "blur(0px)",
                transition: {
                  delay: 0.2 * index,
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              exit={{
                y: 20,
                opacity: 0,
                filter: "blur(10px)",
                transition: {
                  duration: 0.4,
                },
              }}
            >
              {((isProjects && link.link === "/projects" && "text-light") ||
                (pathname === link.link && "text-light")) && (
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
              <Link
                href={link.link}
                className={cn(
                  "relative w-full hover:text-light transition duration-300 z-10",
                  isProjects && link.link === "/projects" && "text-light",
                  pathname === link.link && "text-light"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <CopyButton />
        </nav>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
