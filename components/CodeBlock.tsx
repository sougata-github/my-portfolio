"use client";

import React, { ComponentType, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighterBase } from "react-syntax-highlighter";
// @ts-expect-error - No type declarations for deep Prism import
import materialLight from "react-syntax-highlighter/dist/esm/styles/prism/material-light.js";
// @ts-expect-error - No type declarations for deep Prism import
import materialDark from "react-syntax-highlighter/dist/esm/styles/prism/material-dark.js";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { motion } from "framer-motion";

interface CodeBlockProps {
  className?: string;
  children: React.ReactNode;
  inline?: boolean;
  [key: string]: any;
}

const SyntaxHighlighter = SyntaxHighlighterBase as ComponentType<any>;

const CodeBlock = ({ className = "", children, inline }: CodeBlockProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = theme === "light";
  const match = /language-(\w+)/.exec(className);
  const lang = match?.[1] ?? "text";

  const onCopy = () => {
    navigator.clipboard.writeText(String(children)).catch(console.error);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (inline) {
    return (
      <pre className="bg-muted-foreground/10 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono w-fit inline text-foreground whitespace-pre-wrap">
        {children}
      </pre>
    );
  }

  // code block skeleton
  if (!mounted) {
    return (
      <div className="my-4 w-full rounded-xl border shadow-xs dark:shadow-none">
        <div className="flex items-center justify-between bg-muted/15 px-4 py-2 text-xs text-muted-foreground border-muted-foreground/10 rounded-t-md border-b">
          <Skeleton className="h-4 w-16 rounded-sm" />
          <Skeleton className="size-4 rounded-full" />
        </div>
        <div className="bg-muted/15 p-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-[90%]" />
            <Skeleton className="h-3 w-[80%]" />
            <Skeleton className="h-3 w-[70%]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="my-4 w-full overflow-hidden rounded-xl border shadow-xs dark:shadow-none not-prose"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between bg-muted/15 px-4 py-1 text-xs text-muted-foreground border-muted-foreground/10 rounded-t-md border-b">
        <span className="font-medium text-xs sm:text-sm">{lang}</span>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onCopy}>
            {copied ? (
              <Check className="size-3 sm:size-3.5" />
            ) : (
              <Copy className="size-3 sm:size-3.5" />
            )}
          </Button>
        </div>
      </div>

      <div className="text-xs md:text-[13px] overflow-x-auto font-[--font-geist-mono] bg-muted/15">
        <SyntaxHighlighter
          language={lang}
          style={isLight ? materialLight : materialDark}
          showLineNumbers={lang !== "plaintext"}
          customStyle={{
            margin: 0,
            whiteSpace: "pre",
            fontFamily: "var(--font-geist-mono), monospace",
            background: "transparent",
          }}
          codeTagProps={{
            style: {
              whiteSpace: "pre",
              fontFamily: "inherit",
            },
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
