import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { projects } from "#site/content";

import Connect from "@/components/Connect";
import { MDXContent } from "@/components/mdx-components";
import BackButton from "@/components/projects/BackButton";
import NextProject from "@/components/projects/NextProject";
import ProjectLinks from "@/components/projects/ProjectLinks";
import PageTransition from "@/components/animations/PageTransition";

interface Props {
  params: {
    slug: string;
  };
}

export async function getProjectFromParams(params: Props["params"]) {
  const slug = params?.slug;
  const post = projects.find((project) => project.slugAsParams === slug);

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {};
  }

  return {
    title: `Sougata Das | ${project.title}`,
  };
}

export async function generateStaticParams(): Promise<Props["params"][]> {
  return projects.map((project) => ({ slug: project.slugAsParams }));
}

const page = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  const project = projects.find((project) => project.slugAsParams === slug);

  if (!project) {
    return notFound();
  }

  return (
    <PageTransition>
      <section className="flex flex-col pb-16">
        <div className="flex flex-col">
          <BackButton href="/projects" />
          <div className="flex flex-col">
            <h1 className="text-light text-2xl font-semibold">
              {project.title}
            </h1>
            <p className="secondary-text">{project.description}</p>
          </div>

          {/* Project Image */}
          <div className="pt-6">
            <Image
              unoptimized
              priority={true}
              quality={100}
              src={project.imageUrl}
              alt={`${project.title} image`}
              height={800}
              width={800}
              className="max-w-full w-full h-full object-cover rounded-sm outline outline-4 outline-white/10"
            />
          </div>
        </div>

        {/* Project Links */}
        <ProjectLinks links={project.links} />

        {/* Project Content */}
        <MDXContent code={project.body} className="project-content-styles" />

        {project.nextProject !== undefined ? (
          <NextProject
            title={project.nextProject.title}
            link={project.nextProject.link}
          />
        ) : (
          <div className="mt-8" />
        )}

        <Connect />
      </section>
    </PageTransition>
  );
};

export default page;
