"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
}

const OnThisPage = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2"));
    const tocHeadings = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
    }));
    setHeadings(tocHeadings);
  }, []);

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-0 right-0 w-40 hidden h-screen lg:block py-20 px-4"
    >
      <h1 className="text-light text-base">On this page</h1>
      <ul className="mt-2 flex flex-col gap-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className="text-light/50 text-xs hover:text-light transition duration-300"
          >
            <a href={`#${heading.id}`} className="line-clamp-1">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default OnThisPage;
