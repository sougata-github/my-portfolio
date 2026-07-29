import { footerLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-border px-4 py-5 md:border-x md:px-8">
        <p className="text-muted-foreground text-xs">
          &copy; Sougata Das | 2025
        </p>

        <ul className="flex items-center gap-2">
        {footerLinks.map((link) => (
          <Link
            target="_blank"
            className="text-muted-foreground"
            href={link.href}
            key={link.label}
          >
            <link.icon className={cn("size-4", link.className)} />
          </Link>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
