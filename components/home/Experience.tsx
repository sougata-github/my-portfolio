"use client";

import { useState } from "react";
import Accordian from "../Accordian";
import { motion } from "framer-motion";
import { experienceData } from "@/constants";

const Experience = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleCopy = (id: string) => {
    const newExpanded: Record<string, boolean> = {};

    experienceData.forEach((item) => {
      if (item.id !== id) {
        newExpanded[id] = false;
      }
    });

    setExpanded((prev) => ({ ...newExpanded, [id]: !prev[id] }));
  };

  return (
    <section className="mt-10" id="work">
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
      <div className="mt-5 flex flex-col gap-4">
        {experienceData.map((experience, index) => (
          <Accordian
            index={index}
            key={experience.id}
            handleCopy={handleCopy}
            expanded={expanded[experience.id]}
            {...experience}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
