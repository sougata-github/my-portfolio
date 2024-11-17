"use client";

import { cn } from "@/lib/utils";
import { links } from "@/lib/data";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import CopyButton from "./CopyButton";

import emoji from "@/public/emoji.png";
import { MotionDiv, MotionSpan } from "@/types";

const Sidebar = () => {
  const pathname = usePathname();

  const isProjects = pathname.startsWith("/projects");
  const isBlogs = pathname.startsWith("/blogs");

  return (
    <aside className="sticky top-0 w-48 hidden h-screen md:block py-20">
      <MotionDiv
        className="flex flex-col gap-8"
        initial={{
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 100,
          filter: "blur(0px)",
          transition: {
            duration: 1.2,
          },
        }}
      >
        {/* Siderbar Image and title */}
        <div className="w-full tracking-wide text-left flex flex-col gap-4">
          <div className="flex items-center justify-center w-fit rounded-full p-0.5 bg-background/10">
            <Image
              unoptimized
              src={emoji}
              alt="profile picture"
              placeholder="blur"
              blurDataURL="https://placehold.co/76x76"
              height={72}
              width={72}
              quality={100}
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
            <div
              className="relative flex w-full items-start justify-start rounded-md p-[12px]"
              key={link.label}
            >
              {((isProjects && link.link === "/projects" && "text-light") ||
                (isBlogs && link.link === "/blogs" && "text-light") ||
                (pathname === link.link && "text-light")) && (
                <MotionSpan
                  className="absolute inset-0 bg-background/10 rounded-md"
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
            </div>
          ))}
          <CopyButton />
        </nav>
      </MotionDiv>
    </aside>
  );
};

export default Sidebar;
