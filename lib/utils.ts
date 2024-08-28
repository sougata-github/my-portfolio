import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Node } from "unist";
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

//add separator after every h2

type Tree = Node & {
  children: Element[];
};

export const addSeparatorAfterH2 = () => {
  return (tree: Tree) => {
    visit(
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
                "bg-background/10",
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
