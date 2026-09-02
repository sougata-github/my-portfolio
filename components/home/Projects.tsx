"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projectData } from "@/constants";
import { cn } from "@/lib/utils";
import SectionHeader from "../SectionHeader";
import ProjectCard from "./ProjectCard";
import AiChatDemo from "./demos/AiChatDemo";
import JotionDemo from "./demos/JotionDemo";
import TeamChatDemo from "./demos/TeamChatDemo";
import IphoneDemo from "./demos/IphoneDemo";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
  One scripted demo per project, keyed by id. A project without an entry
  renders an empty slot of the same height, so the grid stays even while
  the remaining demos are built.
*/
const DEMOS: Record<string, React.ReactNode> = {
  "ai-chat": <AiChatDemo />,
  jotion: <JotionDemo />,
  "team-chat": <TeamChatDemo />,
  "iphone-15": <IphoneDemo />,
};

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
        <SectionHeader
          label="Selected Work"
          action={
            <a
              href="https://fern-fern-b25.notion.site/My-projects-148fce201b5a803e872ac84df907f4ae"
              target="_blank"
              rel="noreferrer"
              className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
            >
              View all
            </a>
          }
        />
      </motion.div>

      {/*
        Bento, 2x2 from md and one column below.

        Negative margins cancel the Section container's padding so the cells
        run edge to edge and their outer borders meet the vertical border-x,
        the same trick the hero strip and SectionHeader use.

        Borders live on the cells, never on the grid, and each cell only
        draws bottom and right. The last row drops its bottom and the last
        column drops its right, so adjacent cells share one line rather than
        stacking two.
      */}
      <div className="-mx-4 grid grid-cols-1 md:-mx-8 md:grid-cols-2">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            variants={item}
            className={cn(
              "transform-gpu border-border",
              /* One column: every cell but the last draws a bottom edge. */
              index < projectData.length - 1 && "border-b",
              /* Two columns: left column draws right, top row draws bottom. */
              "md:border-b-0",
              index % 2 === 0 && "md:border-r",
              index < 2 && "md:border-b"
            )}
          >
            <ProjectCard
              title={project.title}
              blurb={project.blurb}
              live={project.links.live}
              demo={DEMOS[project.id]}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
