"use client";

import Link from "next/link";
import { posts } from "#site/content";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatDate, sortPosts } from "@/lib/utils";
import BlogCard from "../BlogCard";

const Blogs = () => {
  const sortedPosts = sortPosts(posts.filter((post) => post.published)).slice(
    0,
    2
  );

  if (!sortPosts) return null;

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between">
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
          RECENT WRITINGS
        </motion.h1>

        <Button
          variant="link"
          size="sm"
          className="text-muted-foreground gap-0.5"
        >
          <Link className="text-sm" href="/blogs">
            View All
          </Link>
          <ArrowUpRight />
        </Button>
      </div>
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

export default Blogs;
