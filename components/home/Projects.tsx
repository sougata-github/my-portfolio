"use client";

import Link from "next/link";
import { projectsData } from "@/lib/data";
import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";

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
            className="w-full pl-0 p-2 transition duration-500 flex items-center"
          >
            <div>
              <div className="flex flex-col gap-1">
                <h1 className="heading-text text-[1.025rem]">
                  {project.title}
                </h1>
                <p className="secondary-text max-w-lg">{project.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>

      <Link
        href="/projects"
        className="mt-6 text-sm group flex flex-row items-center gap-1"
      >
        View All
        <ChevronRight className="h-5 w-5 text-light/60 md:group-hover:translate-x-1 transition duration-500" />
      </Link>
    </section>
  );
};

export default Projects;
