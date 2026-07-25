"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projectData } from "@/constants";
import ProjectCard from "./ProjectCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const makeItem = (reduce: boolean) => ({
  hidden: reduce
    ? { opacity: 0, y: 0, filter: "blur(0px)" }
    : { opacity: 0, y: 18, filter: "blur(7px)" },
  visible: reduce
    ? { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.3 } }
    : {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.95, ease: EASE },
      },
});

const Projects = () => {
  const reduce = useReducedMotion() ?? false;
  const item = makeItem(reduce);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        variants={item}
        className="transform-gpu will-change-[opacity,filter,transform]"
      >
        <span className="label">Selected Work</span>
      </motion.div>

      {/*
        Two columns, never more. Four projects in four columns is a single
        row with no vertical rhythm for the parallax to act against, and at
        this container width a quarter-width card is too small for the shader
        to read as a form.

        The static offset on the second column is what actually creates the
        interlocking grid. The scroll drift is garnish on top of it.
      */}
      <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 md:gap-x-14 md:gap-y-0">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            variants={item}
            className={
              index % 2 === 1 ? "transform-gpu md:mt-24" : "transform-gpu"
            }
          >
            <ProjectCard
              index={index}
              title={project.title}
              stack={project.stack}
              live={project.links.live}
              shader={project.shader}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
