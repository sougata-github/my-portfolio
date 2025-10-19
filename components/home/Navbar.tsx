"use client";

import { navLinksBlogs, navLinksHome } from "@/constants";
import Link from "next/link";

import ThemeToggle from "../ThemeToggle";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center py-4">
      <nav className="flex items-center justify-start gap-2 text-sm sm:text-base">
        {pathname.startsWith("/blogs")
          ? navLinksBlogs.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))
          : navLinksHome.map((link) => (
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
