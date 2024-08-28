import Image from "next/image";
import { notFound } from "next/navigation";

import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { addSeparatorAfterH2 } from "@/lib/utils";
import rehypeExternalLinks from "rehype-external-links";

import Connect from "@/components/Connect";
import BackButton from "@/components/projects/BackButton";
import NextProject from "@/components/projects/NextProject";
import ProjectLinks from "@/components/projects/ProjectLinks";

const page = async ({ params }: { params: { slug: string } }) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(addSeparatorAfterH2)
    .use(rehypeStringify)
    .use(rehypeExternalLinks, { target: "_blank" });

  const filePath = `content/projects/${params.slug}.md`;

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);
  const htmlContent = (await processor.process(content)).toString();

  return (
    <section className="flex flex-col pb-16">
      <div className="flex flex-col">
        <BackButton />
        <div className="flex flex-col">
          <h1 className="heading-text">{data.title}</h1>
          <p className="secondary-text">{data.description}</p>
        </div>

        {/* Project Image */}
        <div className="pt-6">
          <Image
            unoptimized
            quality={100}
            src={data.imageUrl}
            alt="devoverflow image"
            height={800}
            width={800}
            className="max-w-full w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Project Links */}
      <ProjectLinks links={data.links} />

      {/* Project Content */}
      <div
        className="project-content-styles"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {data.nextProject !== undefined ? (
        <NextProject
          title={data.nextProject.title}
          link={data.nextProject.link}
        />
      ) : (
        <div className="mt-16 md:mt-20" />
      )}

      <Connect />
    </section>
  );
};

export default page;
