"use client";

import { Check, Copy, Maximize2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ResponsiveModal from "./ResponsiveModal";

/*
  Code blocks for posts, in the site's two tones.

  No syntax highlighter. Code is Geist Mono in muted, and the lines a fence
  marks with `{1,3-5}` step up to foreground, which is the author's own
  emphasis and reads better than six colours. `showLineNumbers` in the same
  meta turns numbers on. Both come from the fence through the rehype step
  in mdx-components.tsx, which puts the meta string on a data attribute.

  Rendered on the server like any other markup, so there is no mounting
  gate and nothing shifts when the page hydrates. Long blocks scroll inside
  a fixed height on a thin scrollbar. Every block has an expand action that
  opens it at full size in the responsive modal, a dialog on desktop and a
  drawer on a phone, since a bigger view is useful whatever the length.
*/

const COLLAPSE_AT = 18;

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  inline?: boolean;
  "data-meta"?: string;
}

/* "{1,3-5} showLineNumbers" -> highlighted line set, numbers flag. */
const parseMeta = (meta = "") => {
  const highlighted = new Set<number>();
  const match = /\{([\d,\s-]+)\}/.exec(meta);
  if (match) {
    for (const part of match[1].split(",")) {
      const [from, to] = part.trim().split("-").map(Number);
      if (Number.isNaN(from)) continue;
      for (let n = from; n <= (Number.isNaN(to) ? from : to); n++) {
        highlighted.add(n);
      }
    }
  }
  return { highlighted, showNumbers: /showLineNumbers/.test(meta) };
};

const CodeBlock = ({
  className = "",
  children,
  inline,
  "data-meta": meta,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (inline) {
    return (
      <code className="bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    );
  }

  const language = /language-(\w+)/.exec(className)?.[1] ?? "text";
  const code = String(children).replace(/\n$/, "");
  const lines = code.split("\n");
  const { highlighted, showNumbers } = parseMeta(meta);
  const long = lines.length > COLLAPSE_AT;

  const onCopy = () => {
    navigator.clipboard.writeText(code).catch(console.error);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const body = (
    <Lines lines={lines} highlighted={highlighted} showNumbers={showNumbers} />
  );

  return (
    <div className="not-prose my-6 border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <span className="label">{language}</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-label="Expand code"
            className="transition-colors duration-300 hover:text-foreground"
          >
            <Maximize2 className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onCopy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="transition-colors duration-300 hover:text-foreground"
          >
            {copied ? (
              <Check className="size-3.5" aria-hidden />
            ) : (
              <Copy className="size-3.5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "scrollbar-minimal bg-muted/20",
          long && "max-h-[26rem] overflow-y-auto"
        )}
      >
        {body}
      </div>

      <ResponsiveModal
        open={expanded}
        onOpenChange={setExpanded}
        title={language}
        description="The code block at full size."
        className="sm:max-w-[min(92vw,56rem)]"
      >
        <div className="scrollbar-minimal max-h-[75vh] overflow-auto border border-border bg-muted/20">
          {body}
        </div>
      </ResponsiveModal>
    </div>
  );
};

const Lines = ({
  lines,
  highlighted,
  showNumbers,
}: {
  lines: string[];
  highlighted: Set<number>;
  showNumbers: boolean;
}) => {
  const width = String(lines.length).length;

  return (
    <pre className="scrollbar-minimal overflow-x-auto px-4 py-3 font-mono text-[12px] leading-[1.75] md:text-[13px]">
      <code>
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn(
              "block whitespace-pre",
              highlighted.has(i + 1) ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {showNumbers && (
              <span
                className="mr-4 inline-block select-none text-right text-muted-foreground"
                style={{ width: `${width}ch` }}
                aria-hidden
              >
                {i + 1}
              </span>
            )}
            {line || " "}
          </span>
        ))}
      </code>
    </pre>
  );
};

export default CodeBlock;
