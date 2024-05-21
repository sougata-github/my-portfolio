import Link from "next/link";
import Badge from "./Badge";
import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  srcCode: string;
  tags: string[];
}

const ProjectCard = ({
  title,
  description,
  href,
  srcCode,
  tags,
}: ProjectCardProps) => {
  return (
    <div className="cursor-pointer max-w-[400px] border-[0.5px] border-[#d7d7d7] rounded-xl bg-[#e2e2e2] px-8 sm:px-10 my-4 flex flex-col gap-6 pb-2">
      <div>
        <h1 className="text-light-1 text-xl font-bold pt-6">{title}</h1>
        <p className="mt-2 text-light-2 text-sm font-medium max-w-[300px]">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 py-4">
        {tags.map((tag) => (
          <Badge tag={tag} key={tag} />
        ))}
      </div>

      <div className="flex gap-4 pt-2 pb-4 items-center">
        <Link
          target="_blank"
          href={href}
          className="text-sm underline text-light-2 font-semibold flex gap-1 items-center"
        >
          Live Site <ArrowUpRight className="h-4 w-4" />
        </Link>
        <Link
          target="_blank"
          href={srcCode}
          className="px-4 py-1 bg-[#cecece] text-xs font-medium text-light-1 rounded-lg"
        >
          Code
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
