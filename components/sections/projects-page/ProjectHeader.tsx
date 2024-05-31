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
    <header className="max-sm:mt-12 mt-8 lg:mt-10 pt-4 lg:pt-8 pb-16 flex items-center lg:items-start lg:justify-between lg:flex-row flex-col max-lg:gap-12">
      <Link target="_blank" href={href}>
        <h1 className="max-lg:text-center text-4xl lg:text-5xl font-bold text-light-1">
          {title}
        </h1>
        <p className="max-w-[400px] mt-8 max-lg:text-center max-sm:text-sm text-lg text-light-2 font-medium tracking-tight max-sm:px-8">
          {description}
        </p>
      </Link>

      <div className="flex lg:gap-8 gap-4">
        <Link target="_blank" href={srcCode}>
          <Button className="bg-transparent border-[0.5px] border-[#cecece] text-light-1 hover:bg-transparent max-sm:text-[12.5px]">
            Star <Star className="h-4 w-4 ml-2 max-sm:h-3 max-sm:w-3" />
          </Button>
        </Link>
        <Link target="_blank" href={forkLink}>
          <Button className="bg-transparent border-[0.5px] border-[#cecece] text-light-1 hover:bg-transparent max-sm:text-[12.5px]">
            Fork <GitFork className="h-4 w-4 ml-2 max-sm:h-3 max-sm:w-3" />
          </Button>
        </Link>
      </div>
    </header>
  );
};
export default ProjectHeader;
