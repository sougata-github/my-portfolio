import { Button } from "@/components/ui/button";

import { GitFork, Star } from "lucide-react";

import Link from "next/link";

interface ProjectHeaderProps {
  title: string;
  description: string;
  href: string;
  srcCode: string;
  forkLink: string;
}

const ProjectHeader = ({
  title,
  description,
  href,
  srcCode,
  forkLink,
}: ProjectHeaderProps) => {
  return (
    <header className="mt-8 lg:mt-10 py-4 lg:py-8 flex items-center lg:items-start lg:justify-between lg:flex-row flex-col max-lg:gap-12">
      <Link target="_blank" href={href}>
        <h1 className="max-lg:text-center text-4xl lg:text-5xl font-bold text-light-1">
          {title}
        </h1>
        <p className="max-w-[400px] mt-8 max-lg:text-center text-lg text-light-2 font-medium tracking-tight">
          {description}
        </p>
      </Link>

      <div className="flex lg:gap-8 gap-4">
        <Link target="_blank" href={srcCode}>
          <Button className="bg-transparent border-[0.5px] border-[#cecece] text-light-1 hover:bg-transparent">
            Star <Star className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <Link target="_blank" href={forkLink}>
          <Button className="bg-transparent border-[0.5px] border-[#cecece] text-light-1 hover:bg-transparent">
            Fork <GitFork className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </header>
  );
};
export default ProjectHeader;
