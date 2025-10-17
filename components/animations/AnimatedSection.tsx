"use client";

import { motion } from "framer-motion";

interface Props {
  index: number;
  children: React.ReactNode;
}

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: "blur(8px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const AnimatedSection = ({ index, children }: Props) => {
  return (
    <motion.section
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="overflow-hidden will-change-transform"
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
