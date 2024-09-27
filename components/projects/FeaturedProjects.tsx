import Image from "next/image";
import { Separator } from "../ui/separator";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

import appleThumbnail from "@/public/projects-page/apple.png";
import jotionThumbnail from "@/public/projects-page/jotion.png";
import teamChatThumbnail from "@/public/projects-page/team-chat.png";
import devoverflowThumbnail from "@/public/projects-page/devoverflow.png";

export const projectsData = [
  {
    name: "DevOverFlow",
    href: "/projects/devoverflow",
    background: (
      <Image
        placeholder="blur"
        priority={true}
        src={devoverflowThumbnail}
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
        placeholder="blur"
        priority={true}
        src={jotionThumbnail}
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
        placeholder="blur"
        priority={true}
        src={appleThumbnail}
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
        placeholder="blur"
        priority={true}
        src={teamChatThumbnail}
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

const FeaturedProjects = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Featured Projects</h1>
        <p className="secondary-text">Selection of personal projects.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/10 w-full" />

      <BentoGrid>
        {projectsData.map((project, index) => (
          <BentoCard key={index} {...project} index={index} />
        ))}
      </BentoGrid>
    </section>
  );
};

export default FeaturedProjects;
