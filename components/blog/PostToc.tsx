"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* velite s.toc() entry. Only the top level is listed, h3s stay in the text. */
export type TocEntry = {
  title: string;
  url: string;
  items?: TocEntry[];
};

/*
  On-page navigation with scroll spy, after the pii-ai rail but on the
  left. As the reader scrolls, the last heading that has crossed a reading
  line at 40% of the viewport turns foreground. An IntersectionObserver on
  the headings is the trigger, the live positions decide the winner, and
  nothing scrolls on its own.
*/
const PostToc = ({
  toc,
  className,
}: {
  toc: TocEntry[];
  className?: string;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (toc.length === 0) return;
    const ids = toc.map((entry) =>
      decodeURIComponent(entry.url.replace(/^#/, ""))
    );
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const update = () => {
      const line = window.innerHeight * 0.4;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
        else break;
      }
      setActiveId(current);
    };

    const observer = new IntersectionObserver(update, {
      rootMargin: "0px 0px -60% 0px",
      threshold: [0, 1],
    });
    els.forEach((el) => observer.observe(el));
    update();
    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="label mb-4">On this page</p>
      <ul className="flex flex-col gap-2.5">
        {toc.map((entry) => {
          const id = decodeURIComponent(entry.url.replace(/^#/, ""));
          const active = id === activeId;
          return (
            <li key={entry.url}>
              <a
                href={entry.url}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block text-[13px] leading-snug transition-colors duration-300",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PostToc;
