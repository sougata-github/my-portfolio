import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const MoreCode = () => {
  return (
    <div className="flex flex-col gap-1 max-w-[420px] md:max-w-[480px]">
      <div className="">
        <Link
          href="https://github.com/sougata-github/TypeScript"
          target="_blank"
          className="flex gap-1 items-center font-semibold text-xl text-light mt-8 mb-2"
        >
          Code
          <ArrowUpRight className="text-light size-4" />
        </Link>
      </div>

      <p className="secondary-text m-0">
        Feel free to browse the repository, raise issues, share your feedback,
        and contribute to the project.
      </p>
    </div>
  );
};

export default MoreCode;
