import Link from "next/link";

import { GithubIcon } from "../icons/Github";
import { Linkedin02Icon } from "../icons/Linkdin";
import { NewTwitterIcon } from "../icons/X";

import { footerLinks } from "@/lib/data";

const Footer = () => {
  return (
    <section className="mt-8 pt-20 pb-10 grid grid-cols-1 place-content-center">
      <h1 className="text-lg text-light-2 text-center font-semibold">
        Sougata
      </h1>

      <ul className="py-4 flex gap-8 items-center justify-center text-light-2">
        {footerLinks.map((link: string, index) => (
          <li key={index} className="transition-all hover:text-black">
            <Link
              href={`${link === "Home" ? "/" : `#${link}`}`}
              className="font-medium"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="items-center justify-center flex gap-4 max-w-lg mx-auto py-4 px-4">
        <li className="p-2 bg-[#cecece] rounded-lg">
          <Link target="_blank" href="https://github.com/sougata-github">
            <GithubIcon className="h-5 w-5 text-light-1 font-bold" />
          </Link>
        </li>
        <li className="p-2 bg-[#cecece] rounded-lg">
          <Link target="_blank" href="https://twitter.com/sougata_x">
            <NewTwitterIcon className="h-5 w-5 text-light-1 font-bold" />
          </Link>
        </li>
        <li className="p-2 bg-[#cecece] rounded-lg">
          <Link target="_blank" href="https://linkedin.com/in/sougata-linkdin">
            <Linkedin02Icon className="h-5 w-5 text-light-1 font-bold" />
          </Link>
        </li>
      </ul>

      <p className="mt-10 font-medium text-center text-light-2 text-xs pb-4 max-sm:pb-20">
        &copy; Sougata Das | All rights reserved
      </p>
    </section>
  );
};

export default Footer;
