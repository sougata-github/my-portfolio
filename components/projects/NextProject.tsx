import Link from "next/link";
import { ChevronRight } from "lucide-react";

const NextProject = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link
      href={link}
      className="w-full rounded-md my-16 md:my-20 flex flex-col gap-1 items-start group p-4 bg-background/5"
    >
      <span className="heading-text text-base">Next Project</span>
      <div className="secondary-text flex gap-1 items-center">
        {title}{" "}
        <ChevronRight className="h-4 w-4 md:group-hover:translate-x-1 transition duration-500" />
      </div>
    </Link>
  );
};

export default NextProject;
