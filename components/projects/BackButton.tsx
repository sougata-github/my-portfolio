import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const BackButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="mb-10 group rounded-md p-2 flex flex-row items-center gap-1 text-light/60 text-sm w-fit bg-background/5"
    >
      <ChevronLeft className="h-4 w-4 md:group-hover:-translate-x-1 transition duration-500" />
      Back
    </Link>
  );
};

export default BackButton;
