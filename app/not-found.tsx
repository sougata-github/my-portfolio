import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="overflow-hidden max-w-full h-[200px] bg-dark flex flex-col items-start">
      <Link
        href="/"
        className="mb-6 group rounded-md p-2 flex flex-row items-center gap-1 text-light/60 text-sm w-fit bg-background/5"
      >
        <ChevronLeft className="h-4 w-4 md:group-hover:-translate-x-1 transition duration-500" />
        Home
      </Link>

      <p className="max-w-[420px] text-light/60 text-base">
        404: Page Not Found. The page you&apos;re looking for doesn&apos;t
        exist.
      </p>
    </div>
  );
};

export default NotFound;
