import "@/styles/mdx.css";
import { Metadata } from "next";

import { posts } from "#site/content";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

import Connect from "@/components/Connect";
import OnThisPage from "@/components/blog/OnThisPage";
import { MDXContent } from "@/components/mdx-components";
import BackButton from "@/components/projects/BackButton";
import PageTransition from "@/components/animations/PageTransition";

interface Props {
  params: {
    slug: string;
  };
}

// tells Next.js that the posts will be generated at build time and not route.
export async function generateStaticParams(): Promise<Props["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams }));
}

const page = ({ params }: Props) => {
  const slug = params.slug;

  const post = posts.find((post) => post.slugAsParams === slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="flex flex-col pb-16">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div>
            <BackButton href="/blogs" />
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl text-light font-semibold">
                  {post.title}
                </h1>
                <p className="secondary-text">
                  {post.description ? post.description : ""}
                </p>
              </div>

              <p className="text-sm text-light/40">{formatDate(post.date)}</p>
            </div>

            {/* Content */}
            <MDXContent code={post.body} className="blog-content-styles" />
          </div>

          <OnThisPage />
        </div>

        <div className="mt-8">
          <Connect />
        </div>
      </section>
    </PageTransition>
  );
};

export default page;
