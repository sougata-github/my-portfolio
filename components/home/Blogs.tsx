"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { posts } from "#site/content";
import { formatDate, sortPosts } from "@/lib/utils";
import SectionHeader from "../SectionHeader";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Same entrance as Experience and Projects, see DESIGN.md, Motion. */
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

const Blogs = () => {
  const reduce = useReducedMotion() ?? false;
  const item = makeItem(reduce);

  const recent = sortPosts(posts.filter((post) => post.published)).slice(0, 2);

  if (recent.length === 0) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        variants={item}
        className="transform-gpu will-change-[opacity,filter,transform]"
      >
        <SectionHeader
          label="Recent writings"
          action={
            <Link
              href="/blog"
              className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
            >
              View all
            </Link>
          }
        />
      </motion.div>

      {/*
        Hairline rows like Experience. No bottom padding on the section, the
        last row's own py-7 closes it against the footer's top rule.
      */}
      <div className="mt-2 flex flex-col">
        {recent.map((post) => (
          <motion.div
            key={post.slug}
            variants={item}
            className="transform-gpu border-b border-border will-change-[opacity,filter,transform] last:border-b-0"
          >
            <Link
              href={`/${post.slug}`}
              className="group flex flex-col items-start gap-2 py-7"
            >
              <span className="label">{formatDate(post.date)}</span>
              <h3 className="font-display text-xl font-normal uppercase leading-[1.1] tracking-wide transition-colors duration-300 group-hover:text-muted-foreground md:text-[clamp(1.375rem,2.3vw,2rem)]">
                {post.title}
              </h3>
              {post.description && (
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {post.description}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Blogs;
