import Link from "next/link";
import { formatDate } from "@/lib/utils";

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
      className="rounded-lg flex flex-col gap-4 text-left p-4 bg-light/10 relative"
    >
      <div className="flex flex-col gap-1">
        <h2 className="heading-text">{title}</h2>
        <p className="text-sm text-light/40">{formatDate(date)}</p>
      </div>
      <p className="secondary-text max-w-md">{description}</p>
    </Link>
  );
};

export default BlogPost;
