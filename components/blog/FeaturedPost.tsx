import Link from "next/link";
import type { Post } from "#site/content";
import { cn } from "@/lib/utils";
import Thumbnail from "./Thumbnail";

/*
  The featured post cell, after the pii-ai anatomy.

  Cover first, spanning the column edge to edge so it meets the vertical
  rules like the bento. Beneath it a two-column split: date and read time,
  title, dek and the read link on the left, the excerpt on the right ending
  in a small read-more link. One column below md. No category chip here,
  the cover already says what the post is about.
*/

export const formatDateLong = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const FeaturedPost = ({ post }: { post: Post }) => {
  const href = `/${post.slug}`;

  return (
    <div>
      {post.thumbnail && (
        <Link
          href={href}
          aria-label={post.title}
          className="-mx-4 block border-b border-border md:-mx-8"
        >
          <Thumbnail name={post.thumbnail} />
        </Link>
      )}

      <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2 md:gap-16 md:py-12">
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="label">{formatDateLong(post.date)}</span>
            <span className="label" aria-hidden>
              ·
            </span>
            <span className="label">{post.metadata.readingTime} min read</span>
          </div>

          <h2 className="mt-5 font-display uppercase leading-[1.05] tracking-wide text-[clamp(1.75rem,3.6vw,2.75rem)]">
            <Link
              href={href}
              className="transition-colors duration-300 hover:text-muted-foreground"
            >
              {post.title}
            </Link>
          </h2>

          {post.description && (
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {post.description}
            </p>
          )}

          <Link
            href={href}
            className="label mt-8 flex h-12 items-center border border-border px-6 text-foreground transition-colors duration-300 hover:border-foreground"
          >
            Read full post
          </Link>
        </div>

        <div className="flex flex-col items-start gap-4">
          <Link href={href} className="flex flex-col gap-4">
            {post.excerpt.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  "text-sm leading-relaxed text-muted-foreground md:text-base",
                  i === post.excerpt.length - 1 && "line-clamp-4"
                )}
              >
                {paragraph}
              </p>
            ))}
          </Link>
          <Link
            href={href}
            className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
