import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Separator } from "../ui/separator";

const BlogPost = ({
  slug,
  title,
  date,
  description,
}: {
  slug: string;
  title: string;
  date: string;
  description?: string;
}) => {
  return (
    <Link
      href={`/${slug}`}
      className="rounded-lg flex flex-col gap-4 text-left p-4 relative"
    >
      <div className="flex flex-col gap-1">
        <h2 className="heading-text">{title}</h2>
        <p className="text-sm text-light/40">{formatDate(date)}</p>
      </div>
      <p className="secondary-text max-w-md">{description}</p>

      <Separator className="h-[0.2px] mt-4 bg-background/10 w-full" />
    </Link>
  );
};

export default BlogPost;
