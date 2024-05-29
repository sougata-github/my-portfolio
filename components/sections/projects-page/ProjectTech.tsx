import { TechIcons } from "@/components/icons/ProjectTechIcons";
import ProjectTechStackBadge from "./ProjectTechStackBadge";

const ProjectTech = ({ title }: { title: string }) => {
  const project = TechIcons.find((project) => project.title === title);

  if (!project) {
    return <p>Something went wrong!</p>;
  }

  return (
    <section className="project-section-container">
      <h1 className="project-heading">Tech Stack</h1>
      <p className="max-lg:mx-auto max-w-[400px] max-lg:text-center text-light-2 font-semibold lg:text-lg text-sm">
        Technologies powering this project.
      </p>

      <div className="pt-4 flex gap-12 lg:gap-20 w-full lg:flex-row flex-col">
        <div className="flex flex-col gap-4">
          <h2 className="py-4 max-lg:text-center text-light-2 font-semibold text-base">
            Primary tech-stack
          </h2>

          <ul className="max-lg:mt-4 max-lg:mx-auto max-w-[320px] flex flex-wrap max-lg:justify-center items-center gap-6">
            {project.techStack.map((tech) => (
              <ProjectTechStackBadge
                label={tech.label}
                icon={tech.icon}
                key={tech.label}
              />
            ))}
          </ul>
        </div>

        {project.others && (
          <div className="max-lg:mt-4">
            <h2 className="py-4 max-lg:text-center text-light-2 font-semibold text-base">
              Others
            </h2>
            <ul className="text-sm text-light-2 font-medium py-2 max-w-[360px] flex flex-wrap gap-4 lg:justify-start justify-center max-lg:mx-auto">
              {project.others.map((other) => (
                <li
                  key={other}
                  className="cursor-pointer rounded-xl border-[0.5px] border-[#cecece] p-[10px]"
                >
                  {other}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectTech;
