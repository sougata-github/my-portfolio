import { navLinks } from "@/constants";
import Link from "next/link";

import ThemeToggle from "../ThemeToggle";


const Header = () => {
  return (
    <header className="flex justify-between items-center py-4">
      <nav className="flex items-center justify-start gap-2">
        {navLinks.map((link) => (
          <Link href={link.href} key={link.label}>
            {link.label}
          </Link>
        ))}
      </nav>
      {/* AI Summarise Button */}
      <ThemeToggle />
    </header>
  );
};

export default Header;
