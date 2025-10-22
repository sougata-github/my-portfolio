"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Summary from "./summary/Summary";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <nav className="flex items-center justify-start gap-2 text-sm sm:text-base">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-1">
        <Summary />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
