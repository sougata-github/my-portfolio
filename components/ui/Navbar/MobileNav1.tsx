import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";

import { links } from "@/lib/data";

import { Menu } from "lucide-react";

const MobileNav1 = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="h-6 w-6 cursor-pointer lg:hidden" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="mt-2">
            <h1 className="text-xl font-semibold">Sougata</h1>
          </SheetTitle>
          <ul className="flex flex-col gap-8 items-start py-8 mt-2">
            {links.map((link: string, index) => (
              <li key={index} className="transition-all hover:text-black">
                <Link
                  href={`${link === "Home" ? "/" : `/#${link}`}`}
                  className="font-medium"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav1;
