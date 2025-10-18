"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { SquareCode, ArrowUpRight, SquareChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ResponsiveModal from "../ResponsiveModal";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { projectData } from "@/constants";

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <motion.h1
          className="font-bold uppercase"
          initial={{
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              delay: 0.2,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          PROJECTS
        </motion.h1>

        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground gap-0.5"
        >
          <Link
            className="text-sm"
            target="_blank"
            href="https://fern-fern-b25.notion.site/My-projects-148fce201b5a803e872ac84df907f4ae"
          >
            View All
          </Link>
          <ArrowUpRight />
        </Button>
      </div>

      <div className="mt-2 grid w-full grid-cols-1 sm:grid-cols-5 gap-5 py-2">
        {projectData.map((p, i) => (
          <ProjectCard
            key={p.title}
            className={
              i === 0
                ? "sm:col-span-3"
                : i === 1
                ? "sm:col-span-2"
                : i === 2
                ? "sm:col-span-2"
                : "sm:col-span-3"
            }
            {...p}
            index={i}
            isOpen={openIndex === i}
            setOpen={(v: boolean) => setOpenIndex(v ? i : null)}
            openIndex={openIndex}
          />
        ))}
      </div>
    </div>
  );
};

const iconSelect = {
  light: [
    "/icons/ai-light.png",
    "/icons/jotion-light.png",
    "/icons/team-light.png",
    "/icons/iphone-light.png",
  ],
  dark: [
    "/icons/ai-dark.png",
    "/icons/jotion-dark.png",
    "/icons/team-dark.png",
    "/icons/iphone-dark.png",
  ],
};

interface Props {
  title: string;
  summary: string;
  stack: string[];
  links: {
    live: string;
    src: string;
  };
  index: number;
  className: string;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  openIndex: number | null;
}

const ProjectCard = ({
  title,
  summary,
  stack,
  links,
  index,
  className,
  isOpen,
  setOpen,
}: Props) => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  //to avoid hydration errors
  useEffect(() => setMounted(true), []);

  const url: string | null = mounted
    ? resolvedTheme === "light"
      ? iconSelect.light[index]
      : iconSelect.dark[index]
    : null;

  const iconSize = index === 2 ? 24 : index === 1 ? 32 : 28;

  return (
    <>
      <ResponsiveModal
        title={title}
        open={isOpen}
        onOpenChange={(v) => setOpen(v)}
      >
        <div className="flex flex-col items-start gap-4 sm:gap-8">
          <div className="p-4 pt-2 rounded-lg border bg-muted-foreground/5">
            <p className="text-xs sm:text-sm mt-2 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>

          <div className="w-full">
            <div className="flex flex-wrap max-w-xl gap-2 mt-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="py-0.5 px-2 rounded bg-transparent border text-xs sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center gap-2 mt-2">
              <Button variant="ghost" size="sm">
                <Link
                  href={links.live}
                  target="_blank"
                  className="max-sm:text-xs"
                >
                  Live
                </Link>
                <SquareChevronRight className="size-3.5 sm:size-4.5" />
              </Button>

              <Button variant="ghost" size="sm">
                <Link
                  href={links.src}
                  target="_blank"
                  className="max-sm:text-xs"
                >
                  Source
                </Link>
                <SquareCode className="size-4 sm:size-5" />
              </Button>
            </div>
          </div>
        </div>
      </ResponsiveModal>

      <div
        className={cn(
          "rounded-2xl border dark:shadow-none col-span-1 h-[220px] flex items-center justify-center cursor-pointer",
          className
        )}
        role="button"
        onClick={() => setOpen(true)}
      >
        {mounted && url ? (
          <Image
            height={iconSize}
            width={iconSize}
            src={url}
            alt={`${title}-icon`}
          />
        ) : (
          <div className="size-7 rounded bg-muted/40" />
        )}
      </div>
    </>
  );
};

export default Projects;
