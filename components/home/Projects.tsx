"use client";

import { projectsData } from "@/lib/data";

import Link from "next/link";
import Image from "next/image";

import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";

import { motion } from "framer-motion";

const MotionLink = motion(Link);

const Projects = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Projects</h1>
        <p className="secondary-text">My Personal projects.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/10 w-full" />

      {/* Projects */}
      <ul className="cursor-pointer pt-6 flex flex-col gap-6">
        {projectsData.map((project, index) => (
          <Link
            href={project.href}
            key={project.title}
            className="rounded-xl w-full p-2 transition duration-500 flex items-center"
          >
            <motion.div
              className="flex flex-row gap-4 items-center"
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 100,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.2 * index,
                duration: 1,
              }}
              viewport={{ once: true }}
            >
              <Image
                src={project.imageUrl}
                alt={`${project.title} thumbnail`}
                height={64}
                width={68}
                quality={100}
                className="rounded-xl object-center"
              />

              <div className="flex flex-col gap-1">
                <h1 className="heading-text text-[1.025rem]">
                  {project.title}
                </h1>
                <p className="text-sm secondary-text max-w-[260px]">
                  {project.description}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </ul>

      <MotionLink
        href="/projects"
        className="mt-6 text-sm px-2 group flex flex-row items-center gap-1"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 100,
          y: 0,
        }}
        transition={{
          delay: 0.8,
          duration: 1,
        }}
        viewport={{ once: true }}
      >
        View All
        <ChevronRight className="h-5 w-5 text-light/60 md:group-hover:translate-x-1 transition duration-500" />
      </MotionLink>
    </section>
  );
};

export default Projects;
