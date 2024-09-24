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
              quality={100}
              src={project.imageUrl}
              alt="devoverflow image"
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
