import Link from "next/link";

import { GithubIcon } from "./icons/Github";
import { Linkedin02Icon } from "./icons/Linkdin";
import { NewTwitterIcon } from "./icons/X";

const Socials = () => {
  return (
    <ul className="ax-lg:hidden flex flex-col gap-6 items-center justify-center ">
      <li>
        <Link href="https://github.com/sougata-github">
          <GithubIcon className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Link href="https://twitter.com/sougata_x">
          <NewTwitterIcon className="h-5 w-5 -rotate-2" />
        </Link>
      </li>
      <li>
        <Link
          href="https://linkedin.com/in/sougata-linkdin
"
        >
          <Linkedin02Icon className="h-5 w-5" />
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
