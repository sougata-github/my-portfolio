import { projectsData } from "@/lib/data";

import { Button } from "../ui/button";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  return (
    <section
      id="Projects"
      className="section-container grid grid-cols-1 place-content-center"
    >
      <h1 className="section-heading">My Projects</h1>
      <div className="py-2 w-full flex justify-center">
        <Button className="lg:text-lg text-sm bg-transparent text-light-2 font-medium hover:bg-transparent hover:text-light-1 transition-all">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 py-6 sm:py-12 mx-auto max-w-4xl place-content-center gap-6">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            href={project.href}
            srcCode={project.srcCode}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
