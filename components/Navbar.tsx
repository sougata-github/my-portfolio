import { links } from "@/lib/data";

import Link from "next/link";
import MobileNav1 from "./MobileNav1";

const Navbar = () => {
  return (
    <header className="bg-[#ebebeb] mx-auto max-w-7xl max-sm:hidden py-4 sticky top-0 w-full pt-6 px-4 text-[#424242] tracking-tight h-[75px]">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-xl cursor-pointer transition-all hover:text-black"
        >
          Sougata
        </Link>
        <ul className="flex gap-8 items-center max-lg:hidden">
          {links.map((link: string, index) => (
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
        <MobileNav1 />
      </nav>
    </header>
  );
};

export default Navbar;
