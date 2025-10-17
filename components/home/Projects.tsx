"use client";

import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div>
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

      <div className="mt-2 grid w-full grid-cols-5 grid-rows-4"></div>
    </div>
  );
};

export default Projects;
