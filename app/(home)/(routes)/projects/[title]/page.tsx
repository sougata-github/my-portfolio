import ProjectHero from "@/components/sections/projects-page/ProjectHero";
import ProjectTech from "@/components/sections/projects-page/ProjectTech";
import ProjectHeader from "@/components/sections/projects-page/ProjectHeader";
import ProjectFeatures from "@/components/sections/projects-page/ProjectFeatures";
import ProjectProblemsAndLessons from "@/components/sections/projects-page/ProjectProblemsAndLessons";

import { projectsData } from "@/lib/data";

const Page = ({ params }: { params: { title: string } }) => {
  const label = params.title;

  const project = projectsData.find((project) => project.label === label);

  if (project === undefined) {
    return (
      <p className="text-center text-4xl text-light-1 font-semibold py-5">
        Oops! there was an error fetching data.
      </p>
    );
  }
  return (
    <>
      <ProjectHeader
        title={project.title}
        description={project.description}
        href={project.href}
        srcCode={project.srcCode}
        forkLink={project.projectDetails.forkLink}
      />
      <ProjectHero
        imageUrl={project.projectDetails.imageUrl}
        mobileImageUrl={project.projectDetails.mobileImageUrl}
        href={project.href}
      />
      <ProjectFeatures features={project.projectDetails.features} />
      <ProjectTech title={project.label} />
      <ProjectProblemsAndLessons
        details={project.projectDetails.problems}
        heading="Problems"
      />
      <ProjectProblemsAndLessons
        details={project.projectDetails.lessons}
        heading="Lessons"
      />
    </>
  );
};

export default Page;
