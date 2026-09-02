"use client";

import { useRef } from "react";
import PostToc, { type TocEntry } from "./PostToc";
import ReadingProgress from "./ReadingProgress";

/*
  Body of a post: the cover flush under the header rule, then a rail on the
  left with the table of contents and the reading measure on the right.

  Client so it can own the two refs the progress ring measures against.
  The MDX itself is rendered on the server and passed in as children.

  The rail's border-r runs the full height of the grid because the aside
  stretches with the row, and the nav inside it sticks. Nothing above this
  has overflow hidden, which would have been the sticky containing block.
  The routes shell uses overflow-x-clip, and clip does not create one.
*/
const PostLayout = ({
  toc,
  cover,
  children,
}: {
  toc: TocEntry[];
  cover?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={articleRef}>
      {cover && (
        <div ref={coverRef} className="-mx-4 border-b border-border md:-mx-8">
          {cover}
        </div>
      )}

      {/* Phone: the contents fold up under the cover. */}
      {toc.length > 0 && (
        <details className="-mx-4 border-b border-border px-4 md:hidden">
          <summary className="label cursor-pointer list-none py-4">
            On this page
          </summary>
          <ul className="flex flex-col gap-2.5 pb-5">
            {toc.map((entry) => (
              <li key={entry.url}>
                <a
                  href={entry.url}
                  className="block text-[13px] leading-snug text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {entry.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="md:grid md:grid-cols-[11rem_minmax(0,1fr)] lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-border pr-6 md:block">
          <PostToc toc={toc} className="sticky top-8 py-10 md:py-12" />
        </aside>

        <div className="min-w-0 py-10 md:py-12 md:pl-10">
          <div className="max-w-[68ch]">{children}</div>
        </div>
      </div>

      <ReadingProgress targetRef={articleRef} coverRef={coverRef} />
    </div>
  );
};

export default PostLayout;
