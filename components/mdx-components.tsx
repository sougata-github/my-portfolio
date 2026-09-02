import Link from "next/link.js";
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
  "data-meta"?: string;
}

/*
  Runs inside velite, see velite.config.ts.

  Marks inline code so the renderer can tell it from a fence, and copies the
  fence meta ("{1,3} showLineNumbers") onto a data attribute. MDX drops the
  meta otherwise, and the code block reads it for line emphasis.
*/
export default function rehypeInlineCodeProperty() {
  return function (tree: Root) {
    visit(tree, "element", function (node, index, parent) {
      if (node.tagName !== "code") return;
      const parentElement = parent as Element | undefined;

      node.properties ||= {};
      node.properties.inline = parentElement?.tagName !== "pre";

      const meta = (node.data as { meta?: string } | undefined)?.meta;
      if (meta) node.properties.dataMeta = meta;
    });
  };
}

type ElementProps<T> = React.HTMLAttributes<T> & { className?: string };

/*
  Post typography in the site language. Headings in the display face,
  body in Geist at a reading measure, two text tones, hairlines for rules
  and tables, no bold, no tight tracking.
*/
export const components = {
  h1: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-14 scroll-mt-24 font-display text-2xl uppercase leading-[1.1] tracking-wide first:mt-0 md:text-3xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-14 scroll-mt-24 font-display text-xl uppercase leading-[1.15] tracking-wide first:mt-0 md:text-2xl [&_a]:no-underline",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-10 scroll-mt-24 text-base font-medium leading-snug md:text-lg [h2_+_&]:mt-6",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h4
      className={cn("mt-8 scroll-mt-24 text-base font-medium", className)}
      {...props}
    />
  ),
  h5: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h5 className={cn("mt-8 label", className)} {...props} />
  ),
  h6: ({ className, ...props }: ElementProps<HTMLHeadingElement>) => (
    <h6 className={cn("mt-8 label", className)} {...props} />
  ),
  a: ({
    className,
    children,
    href = "",
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={cn(
          "underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
      </Link>
    );
  },
  p: ({ className, children }: ElementProps<HTMLParagraphElement>) => {
    /*
      A paragraph that only wraps a block, like a fenced code block or an
      image, renders its child alone so the block is not nested in a <p>.
    */
    const isOnlyText = React.Children.toArray(children).every(
      (child) => typeof child === "string" || typeof child === "number"
    );

    return isOnlyText ? (
      <p className={cn("mt-4 leading-relaxed first:mt-0", className)}>
        {children}
      </p>
    ) : (
      <div className={cn("mt-4 leading-relaxed first:mt-0", className)}>
        {children}
      </div>
    );
  },
  ul: ({ className, ...props }: ElementProps<HTMLUListElement>) => (
    <ul
      className={cn(
        "mt-4 ml-5 list-disc space-y-1.5 marker:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ElementProps<HTMLOListElement>) => (
    <ol
      className={cn(
        "mt-4 ml-5 list-decimal space-y-1.5 marker:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ElementProps<HTMLLIElement>) => (
    <li className={cn("pl-1 leading-relaxed", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ElementProps<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l border-border pl-5 text-muted-foreground [&>*]:text-muted-foreground",
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
    <img
      className={cn("my-6 border border-border", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-border" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className={cn("w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-b border-border", className)} {...props} />
  ),
  th: ({
    className,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("label px-3 py-2 text-left align-bottom", className)}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn("px-3 py-2 align-top", className)} {...props} />
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
    <div className={cn("text-[15px] text-foreground md:text-base", className)}>
      <Component components={components} />
    </div>
  );
}
