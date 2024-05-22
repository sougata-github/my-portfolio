import Link from "next/link";

import Badge from "./Badge";

import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  label: string;
  description: string;
  href: string;
  tags: string[];
}

const ProjectCard = ({
  title,
  label,
  description,
  href,
  tags,
}: ProjectCardProps) => {
  return (
    <div className="cursor-pointer max-w-[400px] border-[0.5px] border-[#d7d7d7] rounded-xl bg-[#e2e2e2] px-8 sm:px-10 my-4 flex flex-col gap-6 pb-2">
      <div>
        <h1 className="pt-6 text-light-1 text-xl font-bold">{title}</h1>

        <p className="mt-2 text-light-2 text-sm font-medium max-w-[300px]">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 py-4">
        {tags.map((tag) => (
          <Badge tag={tag} key={tag} />
        ))}
      </div>

      <div className="flex gap-8 pt-2 pb-4 items-center">
        <Link
          href={`/projects/${label}`}
          className="text-sm text-light-2 font-semibold flex gap-1 items-center"
        >
          View Project
        </Link>
        <Link
          target="_blank"
          href={href}
          className="text-sm underline text-light-2 font-semibold flex gap-1 items-center"
        >
          Live Site <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
