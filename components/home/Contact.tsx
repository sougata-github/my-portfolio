"use client";

import { motion, useReducedMotion } from "framer-motion";
import { socialLinks } from "@/constants";
import SectionHeader from "../SectionHeader";
import ContactForm from "./ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const makeItem = (reduce: boolean) => ({
  hidden: reduce ? { opacity: 0, y: 0 } : { opacity: 0, y: 18 },
  visible: reduce
    ? { opacity: 1, y: 0, transition: { duration: 0.3 } }
    : { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
});

/*
  Two columns from md, one below. The left column is the invitation and the
  social marks, the right column is the form. The marks sit at the foot of
  the left column so they line up with the bottom of the form, which is
  what makes the two columns read as one band. The email is in the footer.
*/
const Contact = () => {
  const reduce = useReducedMotion() ?? false;
  const item = makeItem(reduce);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={item}
        className="transform-gpu will-change-[opacity,transform]"
      >
        <SectionHeader label="Contact" />
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-12 md:mt-12 md:grid-cols-2 md:gap-16">
        <motion.div
          variants={item}
          className="flex transform-gpu flex-col will-change-[opacity,transform]"
        >
          <span className="label">Reach out to me</span>

          <h3 className="mt-5 font-display uppercase leading-[1.05] tracking-wide text-[clamp(1.75rem,4.2vw,3rem)]">
            Let&apos;s talk.
          </h3>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
            A project or a question. Send a note and I will get back to you.
          </p>

          {/* Social marks only. The email lives in the footer. */}
          <ul className="mt-12 flex items-center gap-5 md:mt-auto">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="block text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  <link.icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={item}
          className="transform-gpu will-change-[opacity,transform]"
        >
          <ContactForm />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
