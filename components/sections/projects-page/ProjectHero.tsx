import Image from "next/image";
import Link from "next/link";

interface ProjectHeroProps {
  imageUrl: string;
  href: string;
}

const ProjectHero = ({ imageUrl, href }: ProjectHeroProps) => {
  return (
    <section className="mt-10 pb-20 flex flex-col gap-8">
      <h1 className="project-heading">Preview</h1>
    </section>
  );
};

export default ProjectHero;
