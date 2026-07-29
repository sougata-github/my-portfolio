import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

/* One typeface, one case, one weight, one size across the whole bar. */
const navItemClass =
  "font-mono text-sm font-medium lowercase leading-none text-muted-foreground transition-colors duration-300 hover:text-foreground";

const Navbar = () => {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between border-border px-4 py-4 md:border-x md:px-8">
      <Link href="/" className={navItemClass}>
        sougata
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/#projects" className={navItemClass}>
          work
        </Link>
        <Link href="/blog" className={navItemClass}>
          posts
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
