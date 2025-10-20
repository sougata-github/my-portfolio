import BlogCard from "@/components/BlogCard";
import { sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | Sougata Das",
  description:
    "Read my latest blogs and thoughts on web development, design, and technology.",
};

export default function BlogPage() {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <section className="mt-10">
      <div>
        <h1 className="font-bold uppercase">BLOGS</h1>
        <div className="flex flex-col gap-4">
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
    </section>
  );
}
