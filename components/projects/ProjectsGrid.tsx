import Image from "next/image";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

export const projectsData = [
  {
    name: "DevOverFlow",
    href: "/projects/devoverflow",
    background: (
      <Image
        src="/project-thumbnails/devoverflow.png"
        alt="DevOverFlow thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-1 md:col-span-1",
  },
  {
    name: "Jotion",
    href: "/projects/jotion",
    background: (
      <Image
        src="/project-thumbnails/jotion.png"
        alt="Jotion thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-1 md:col-span-2",
  },

  {
    name: "iPhone 15",
    href: "/projects/iphone",
    background: (
      <Image
        src="/project-thumbnails/apple.png"
        alt="iPhone thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-1 md:col-span-2",
  },
  {
    name: "Team Chat",
    href: "/projects/team-chat",
    background: (
      <Image
        src="/project-thumbnails/team-chat.png"
        alt="Team Chat thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-1 md:col-span-1",
  },
];

const ProjectsGrid = () => {
  return (
    <BentoGrid>
      {projectsData.map((project, index) => (
        <BentoCard key={index} {...project} index={index} />
      ))}
    </BentoGrid>
  );
};

export default ProjectsGrid;
