import Link from "next/link";
import Badge from "./Badge";
import { Button } from "./button";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  srcCode?: string;
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
    <Link href={href} target="_blank">
      <div className="max-w-[400px] border-[0.5px] border-[#d7d7d7] rounded-xl bg-[#e2e2e2] px-8 sm:px-10 my-4 flex flex-col gap-4">
        <div>
          <h1 className="text-light-1 text-xl font-bold pt-4 lg:pt-6">
            {title}
          </h1>
          <p className="mt-2 text-light-2 text-sm font-medium max-w-[300px]">
            {description}
          </p>
        </div>

        <div className="flex flex-col py-4 gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge tag={tag} key={tag} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
