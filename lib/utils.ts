import { Post } from "@/.velite";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

import { Element } from "hast";
import { visit } from "unist-util-visit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

type Tree = Node & {
  children: Element[];
};

export const addSeparatorAfterH2 = () => {
  return (tree: Tree) => {
    visit(
      //@ts-ignore
      tree,
      "element",
      (
        node: Element,
        index: number | undefined,
        parent: Element | Tree | undefined
      ) => {
        if (
          node.tagName === "h2" &&
          parent &&
          "children" in parent &&
          Array.isArray(parent.children) &&
          typeof index === "number"
        ) {
          parent.children.splice(index + 1, 0, {
            type: "element",
            tagName: "div",
            properties: {
              className: [
                "h-[0.2px]",
                "mt-5",
                "mb-6",
                "bg-background/20",
                "w-full",
              ],
            },
            children: [],
          });
        }
      }
    );
  };
};

export function formatDate(date: string | number): string {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
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
