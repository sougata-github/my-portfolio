"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/constants";

const Experience = () => {
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
        EXPERIENCE
      </motion.h1>
      <div className="mt-2 flex flex-col gap-4">
        {experienceData.map((experience) => (
          <div
            key={experience.id}
            className="flex w-full justify-between items-start gap-4 border-b pb-4 last:border-b-0"
          >
            <div className="flex flex-col items-start text-left">
              <h3 className="font-medium text-base md:text-lg">
                {experience.company}
              </h3>
              <p className="text-foreground/60 text-sm">
                <span className="capitalize">{experience.position}</span> •{" "}
                <span className="lowercase">{experience.type}</span>
              </p>
            </div>

            <span className="text-foreground/60 text-sm shrink-0">
              {experience.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
