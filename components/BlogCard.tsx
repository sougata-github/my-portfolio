"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  description: string;
  published: string;
}

const BlogCard = ({ slug, title, description, published }: Props) => {
  return (
    <Link href={`/${slug}`}>
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground font-mono">
            {formatDate(published)}
          </span>
          <h2 className="text-lg sm:text-xl font-semibold mt-0.5">{title}</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
