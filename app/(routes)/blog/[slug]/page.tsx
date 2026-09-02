import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "#site/content";
import { formatDateLong } from "@/components/blog/FeaturedPost";
import PostLayout from "@/components/blog/PostLayout";
import Thumbnail from "@/components/blog/Thumbnail";
import { MDXContent } from "@/components/mdx-components";
import Section from "@/components/Section";
import { EMAIL } from "@/constants";
import { ogForThumbnail, OG_SIZE } from "@/lib/og";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

const getPost = (slug: string) =>
  posts.find((post) => post.slugAsParams === slug && post.published);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  const path = `/blog/${post.slugAsParams}`;
  const og = ogForThumbnail(post.thumbnail);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "Sougata Das",
      locale: "en_IN",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      authors: [SITE_URL],
      tags: post.keywords,
      images: [{ url: og.light, ...OG_SIZE, alt: og.alt }],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@sougata_x",
      title: post.title,
      description: post.description,
      images: [og.dark],
    },
  };
}

/*
  dynamicParams false means any slug outside the list below is treated as a
  route that does not exist, rather than a route that renders and then calls
  notFound(). That difference matters: notFound() thrown inside this segment
  renders the 404 *within* the (routes) layout, so it keeps the nav and
  footer. An unmatched URL resolves against the root not-found instead and
  gets the full-bleed shell.
*/
export const dynamicParams = false;

export async function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slugAsParams }));
}

/*
  Three bands. The header is a statement cell like the blog index. The body
  carries the cover flush under the rule, then the contents rail and the
  reading measure. The last band points at the source repository.
*/
const PostPage = async ({ params }: Props) => {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slugAsParams}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords.join(", "),
    wordCount: post.metadata.wordCount,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: "Sougata Das",
      url: SITE_URL,
      email: EMAIL,
    },
    publisher: { "@type": "Person", name: "Sougata Das", url: SITE_URL },
    inLanguage: "en",
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section innerClassName="pt-6 pb-12 md:pb-16">
        <div className="flex items-center justify-between gap-x-4">
          <span className="label">{post.category ?? "Post"}</span>
          <Link
            href="/blog"
            className="label underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
          >
            All posts
          </Link>
        </div>

        <h1 className="mt-16 max-w-4xl font-display uppercase leading-[1.05] tracking-wide text-[clamp(1.75rem,5vw,3.75rem)] sm:mt-20">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {post.description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <time dateTime={post.date} className="label">
            {formatDateLong(post.date)}
          </time>
          <span className="label" aria-hidden>
            ·
          </span>
          <span className="label">{post.metadata.readingTime} min read</span>
        </div>
      </Section>

      <Section>
        <PostLayout
          toc={post.toc}
          cover={post.thumbnail ? <Thumbnail name={post.thumbnail} /> : null}
        >
          <MDXContent code={post.body} />
        </PostLayout>
      </Section>

      <Section innerClassName="py-10 md:py-12">
        <span className="label block">Source</span>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Every example in this post lives in a repository. Browse it, raise
          an issue, or send a fix.
        </p>
        <a
          href="https://github.com/sougata-github/TypeScript"
          target="_blank"
          rel="noreferrer"
          className="label mt-6 inline-flex h-12 items-center border border-border px-6 text-foreground transition-colors duration-300 hover:border-foreground"
        >
          View the repository
        </a>
      </Section>
    </article>
  );
};

export default PostPage;
