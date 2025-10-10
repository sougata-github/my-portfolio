import "@/styles/mdx.css";

import { MDXContent } from "@/components/mdx-components";
import Connect from "@/components/Connect";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { posts } from "#site/content";
import { Metadata } from "next";


interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPostFromParams(params: Props["params"]) {
  const slug = (await params)?.slug;
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: `Sougata Das | ${post.title}`,
  };
}

// tells Next.js that the posts will be generated at build time.
export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  return posts.map((post) => ({ slug: post.slugAsParams }));
}

const page = async ({ params }: Props) => {
  const slug = (await params)?.slug;

  const post = posts.find((post) => post.slugAsParams === slug);

  if (!post || !post.published) {
    return notFound();
  }

  return (
    <section className="flex flex-col pb-16">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="heading-text">{post.title}</h1>
            <p className="secondary-text">
              {post.description ? post.description : ""}
            </p>
          </div>

          <p className="text-sm text-light/40">{formatDate(post.date)}</p>
        </div>

        {/* Content */}
        <MDXContent code={post.body} className="blog-content-styles" />

        <div className="mt-8">
          <Connect />
        </div>
      </div>
    </section>
  );
};

export default page;
