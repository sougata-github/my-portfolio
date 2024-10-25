import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";

import Link from "next/link";
import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";

const Blogs = () => {
  const sortedPosts = sortPosts(posts.filter((post) => post.published)).slice(
    0,
    2
  );

  if (!sortPosts) return null;

  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Blogs</h1>
        <p className="secondary-text">Recent Posts.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/10 w-full" />

      <ul className="pt-6 flex flex-col gap-6">
        {sortedPosts.map((post) => (
          <Link
            href={`/${post.slug}`}
            className="flex flex-col gap-1 items-start rounded-xl w-full pl-0 p-1"
            key={post.title}
          >
            <h1 className="heading-text text-[1.025rem]">{post.title}</h1>
            <p className="secondary-text">{post.description}</p>
          </Link>
        ))}
      </ul>

      <Link
        href="/blogs"
        className="mt-6 text-sm group flex flex-row items-center gap-1"
      >
        View All
        <ChevronRight className="h-5 w-5 text-light/60 md:group-hover:translate-x-1 transition duration-500" />
      </Link>
    </section>
  );
};

export default Blogs;
