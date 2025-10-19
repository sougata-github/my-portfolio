import { footerLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="mt-32 flex py-5 justify-between items-center border-t">
      <p className="text-muted-foreground text-xs">&copy; Sougata Das | 2025</p>

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
    </footer>
  );
};

export default Footer;
