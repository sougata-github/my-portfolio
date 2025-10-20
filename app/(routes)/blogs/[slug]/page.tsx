import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import { posts } from "#site/content";
import { Metadata } from "next";
import Link from "next/link";


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
    <section className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 border-b pb-2">
          <div className="mt-4 sm:mt-8">
            <h1 className="font-semibold text-xl md:text-2xl font-[family-name:var(--font-inter)]">
              {post.title}
            </h1>
            <p className="text-base md:text-lg mt-1">
              {post.description ? post.description : ""}
            </p>
          </div>

          <p className="text-sm font-mono text-muted-foreground">
            {formatDate(post.date)}
          </p>
        </div>

        {/* Content */}
        <MDXContent code={post.body} />

        <div className="mt-4 max-w-xl">
          <Link
            href="https://github.com/sougata-github/TypeScript"
            target="_blank"
            className="flex items-center gap-2"
          >
            <span className="font-medium text-lg md:text-xl font-[family-name:var(--font-inter)]">
              Code
            </span>
            <ArrowUp className="size-4 rotate-45 mt-0.5" />
          </Link>
          <p className="mt-2">
            Feel free to browse the repository, raise issues, share your
            feedback, and contribute to the project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
