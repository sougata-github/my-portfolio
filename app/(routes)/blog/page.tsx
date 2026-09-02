import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "#site/content";
import FeaturedPost from "@/components/blog/FeaturedPost";
import Section from "@/components/Section";
import SectionHeader from "@/components/SectionHeader";
import { formatDate, sortPosts } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Posts | Sougata Das",
  description:
    "Notes from my journey as a developer. What I am learning, what I got wrong, and what stuck.",
};

/*
  Two bands. The intro is a statement cell like the hero, label then
  headline then a line of description. The featured cell below carries the
  newest post at full size. Any older posts fall into hairline rows under
  it, in the same row language as Recent writings on the home page.
*/
export default function BlogPage() {
  const published = sortPosts(posts.filter((post) => post.published));
  const [featured, ...older] = published;

  return (
    <>
      <Section innerClassName="pt-6 pb-16 md:pb-24">
        <span className="label block">Posts</span>
        <h1 className="mt-16 font-display uppercase leading-[1.05] tracking-wide text-[clamp(2rem,6vw,4.5rem)] sm:mt-20">
          Writings
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Notes from my journey as a developer. What I am learning, what I got
          wrong, and what stuck.
        </p>
      </Section>

      {featured ? (
        <Section innerClassName="pt-6">
          <SectionHeader label="Latest" />
          <FeaturedPost post={featured} />
        </Section>
      ) : (
        <Section innerClassName="py-16 md:py-24">
          <p className="text-sm text-muted-foreground">Nothing published yet.</p>
        </Section>
      )}

      {older.length > 0 && (
        <Section innerClassName="pt-6">
          <SectionHeader label="More posts" />
          <div className="mt-2 flex flex-col">
            {older.map((post) => (
              <div
                key={post.slug}
                className="border-b border-border last:border-b-0"
              >
                <Link
                  href={`/${post.slug}`}
                  className="group flex flex-col items-start gap-2 py-7"
                >
                  <span className="label">{formatDate(post.date)}</span>
                  <h2 className="font-display text-xl font-normal uppercase leading-[1.1] tracking-wide transition-colors duration-300 group-hover:text-muted-foreground md:text-[clamp(1.375rem,2.3vw,2rem)]">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {post.description}
                    </p>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
