import Link from "next/link";

import { GithubIcon } from "../icons/Github";
import { Linkedin02Icon } from "../icons/Linkdin";
import { NewTwitterIcon } from "../icons/X";

import { footerLinks } from "@/lib/data";

const Footer = () => {
  return (
    <section className="mt-6 pt-12 pb-10 grid grid-cols-1 place-content-center">
      <ul className="my-1 items-center justify-center flex gap-4 max-w-lg mx-auto py-4 px-4 max-lg:px-2 max-lg:py-2">
        <li className="p-2 bg-[#cecece] rounded-lg">
          <Link target="_blank" href="https://github.com/sougata-github">
            <GithubIcon className="h-4 w-4 lg:h-5 lg:w-5 text-light-1 font-bold" />
          </Link>
        </li>
        <li className="p-2 bg-[#cecece] rounded-lg">
          <Link target="_blank" href="https://twitter.com/sougata_x">
            <NewTwitterIcon className="h-4 w-4 lg:h-5 lg:w-5 text-light-1 font-bold" />
          </Link>
        </li>
        <li className="p-2 bg-[#cecece] rounded-lg">
          <Link target="_blank" href="https://linkedin.com/in/sougata-linkdin">
            <Linkedin02Icon className="h-4 w-4 lg:h-5 lg:w-5 text-light-1 font-bold" />
          </Link>
        </li>
      </ul>

      <ul className="py-4 flex gap-8 items-center justify-center text-light-2 text-sm">
        {footerLinks.map((link: string, index) => (
          <li key={index} className="transition-all hover:text-black">
            <Link href={`/#${link}`} className="font-medium">
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-medium text-center text-light-2 text-xs pb-4 max-sm:pb-20">
        &copy; Sougata Das | All rights reserved
      </p>
    </section>
  );
};

export default Footer;
