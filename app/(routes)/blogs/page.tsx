import { Metadata } from "next";
import { posts } from "#site/content";
import { sortPosts } from "@/lib/utils";
import BlogPost from "@/components/blog/BlogPost";
import PageTransition from "@/components/animations/PageTransition";

export const metadata: Metadata = {
  title: "Sougata Das | Blogs",
};

const page = () => {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));

  return (
    <PageTransition>
      <section className="section-container relative">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <h1 className="heading-text">Blogs</h1>
            <p className="secondary-text">My blog posts.</p>
          </div>

          {/* Blog List */}
          <div className="flex flex-col gap-8">
            {sortedPosts.length > 0 ? (
              posts.map((post) => <BlogPost key={post.title} {...post} />)
            ) : (
              <p className="secondary-text">Nothing to see here</p>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default page;
