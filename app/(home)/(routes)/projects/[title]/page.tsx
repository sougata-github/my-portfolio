import ProjectHeader from "@/components/sections/projects-page/ProjectHeader";

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
        srcCode={project.srcCode}
        forkLink={project.projectDetails.forkLink}
      />
    </>
  );
};

export default Page;
