"use client";

import Link from "next/link";
import { posts } from "#site/content";
import { motion } from "framer-motion";
import { formatDate, sortPosts } from "@/lib/utils";

const Blogs = () => {
  const sortedPosts = sortPosts(posts.filter((post) => post.published)).slice(
    0,
    2
  );

  if (!sortPosts) return null;

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
        BLOGS
      </motion.h1>
      <div className="mt-2 flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            title={post.title}
            description={post.description!}
            published={post.date}
          />
        ))}
      </div>
    </div>
  );
};

interface Props {
  slug: string;
  title: string;
  description: string;
  published: string;
}

const BlogCard = ({ slug, title, description, published }: Props) => {
  return (
    <Link href={`/${slug}`}>
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground font-mono">
            {formatDate(published)}
          </span>
          <h2 className="text-lg sm:text-xl font-semibold mt-0.5">{title}</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Blogs;
