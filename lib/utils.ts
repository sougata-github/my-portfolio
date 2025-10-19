import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post } from "@/.velite";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export function formatDate(date: string | number): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}
