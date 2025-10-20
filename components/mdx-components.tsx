import Link, { LinkProps } from "next/link.js";
import * as runtime from "react/jsx-runtime";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";
import Image from "next/image.js";
import { cn } from "@/lib/utils";
import React from "react";

import CodeBlock from "./CodeBlock";


const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  node?: Element & { properties?: { inline?: boolean } };
}

export default function rehypeInlineCodeProperty() {
  return function (tree: Root) {
    visit(tree, "element", function (node, index, parent) {
      if (node.tagName === "code") {
        const parentElement = parent as Element | undefined;

        node.properties ||= {};
        node.properties.inline = parentElement?.tagName !== "pre";
      }
    });
  };
}

type ElementProps<T> = React.HTMLAttributes<T> & { className?: string };

const components = {
  h1: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-6 scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
        "leading-tight mb-4",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-12 sm:mt-14 scroll-m-20 font-semibold tracking-tight text-xl md:text-2xl",
        "mb-3 pb-1",
        "heading-link",
        className
      )}
      {...props}
    />
  ),

  h3: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-6 sm:mt-8 scroll-m-20 font-medium text-base md:text-lg [h2_+_&]:mt-4 mb-2",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-4 scroll-m-20 text-lg font-semibold sm:text-xl md:text-2xl",
        "leading-snug mb-2",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({
    className,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <Link rel="noreferrer" {...(props as LinkProps)}>
        {children}
      </Link>
    );
  },
  p: ({ className, children }: ElementProps<HTMLParagraphElement>) => {
    const isOnlyText = React.Children.toArray(children).every(
      (child) => typeof child === "string" || typeof child === "number"
    );

    return isOnlyText ? (
      <p className={cn("leading-7 [&:not(:first-child)]:mt-2", className)}>
        {children}
      </p>
    ) : (
      <>{children}</>
    );
  },
  ul: ({ className, ...props }: ElementProps<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ElementProps<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ElementProps<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ElementProps<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table
      className={cn("w-full my-4 border-collapse", className)}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-muted-foreground/15 last:border-0",
        className
      )}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "text-foreground text-left border-b border-muted-foreground/15 px-4 pt-2 pb-4 font-semibold text-sm",
        className
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("px-4 py-2 text-sm text-foreground", className)}
      {...props}
    />
  ),
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => <>{children}</>,
  code: ({ className, children, node, ...props }: CodeProps) => {
    const isInline = node?.properties?.inline === true;

    return (
      <CodeBlock className={className || ""} inline={isInline} {...props}>
        {children}
      </CodeBlock>
    );
  },
  Image,
};

interface MdxProps {
  code: string;
  className?: string;
}

export function MDXContent({ code, className }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div className={cn("mt-4", className)}>
      <Component components={components} />
    </div>
  );
}
