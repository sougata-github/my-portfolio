import Link from "next/link";

import { Star } from "lucide-react";
import { LuGitFork } from "react-icons/lu";
import { PiFireFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";

export interface linkType {
  links: {
    liveLink: string;
    srcLink: string;
    forkLink: string;
  };
}

const ProjectLinks = ({ links }: linkType) => {
  return (
    <section className="mt-16 flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Links</h1>
        <p className="secondary-text">Related links</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/10 w-full" />

      <div className="text-sm secondary-text pt-6 flex gap-5">
        <Link
          target="_blank"
          href={links.liveLink}
          className="rounded-md bg-background/5 p-2 flex items-center gap-2 hover:bg-background/10 hover:text-light transition duration-500"
        >
          Live <PiFireFill className="h-[18px] w-[18px]" />
        </Link>
        <Link
          target="_blank"
          href={links.srcLink}
          className="rounded-md bg-background/5 p-2 flex items-center gap-2 hover:bg-background/10 hover:text-light transition duration-500"
        >
          Star <Star className="h-[18px] w-[18px]" />
        </Link>
        <Link
          target="_blank"
          href={links.forkLink}
          className="rounded-md bg-background/5 p-2 flex items-center gap-2 hover:bg-background/10 hover:text-light transition duration-500"
        >
          Fork <LuGitFork className="h-[18px] w-[18px]" />
        </Link>
      </div>
    </section>
  );
};

export default ProjectLinks;
