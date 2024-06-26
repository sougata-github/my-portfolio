import Link from "next/link";

import { GithubIcon } from "../icons/Github";
import { Linkedin02Icon } from "../icons/Linkdin";
import { NewTwitterIcon } from "../icons/X";

const Socials = () => {
  return (
    <ul className="lg:pr-12 flex lg:flex-col flex-row gap-6 lg:gap-2 my-2 md:my-4 items-center max-lg:justify-center">
      <li className="cursor-pointer lg:hover:bg-[#cecece] lg:rounded-full lg:p-[14.2px] lg:transition lg:duration-300 lg:flex-center">
        <Link target="_blank" href="https://github.com/sougata-github">
          <GithubIcon className="h-5 w-5" />
        </Link>
      </li>
      <li className="cursor-pointer lg:hover:bg-[#cecece] lg:rounded-full lg:p-[14.2px] lg:transition lg:duration-300 lg:flex-center">
        <Link target="_blank" href="https://twitter.com/sougata_x">
          <NewTwitterIcon className="h-5 w-5" />
        </Link>
      </li>
      <li className="cursor-pointer lg:hover:bg-[#cecece] lg:rounded-full lg:p-[14.2px] lg:transition lg:duration-300 lg:flex-center">
        <Link target="_blank" href="https://linkedin.com/in/sougata-linkdin">
          <Linkedin02Icon className="h-5 w-5" />
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
