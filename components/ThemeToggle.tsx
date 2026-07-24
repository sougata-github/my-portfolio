"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

/*
  Visible counterpart to the Ctrl/Cmd + D shortcut. The shortcut alone is
  undiscoverable and unreachable on touch, so this stays as the affordance.

  Mounted gate: next-themes cannot resolve the theme during SSR, so the
  button renders as an inert placeholder of identical size until hydration.
  That avoids both a hydration mismatch and a layout shift in the nav.
*/
const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return <span className="block size-4" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle theme (Ctrl/Cmd + D)"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
