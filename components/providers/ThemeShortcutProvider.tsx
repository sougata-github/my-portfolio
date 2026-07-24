"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

/*
  Site wide theme shortcut: Ctrl + D on Windows and Linux, Cmd + D on macOS.

  Mounted gate is required. next-themes cannot know the resolved theme during
  SSR or the first client render, so reading resolvedTheme before mount gives
  undefined and the first keypress would toggle from the wrong value. Rendering
  children unchanged keeps the gate invisible and avoids a hydration mismatch.
*/
const ThemeShortcutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "d") return;
      if (!(event.metaKey || event.ctrlKey)) return;
      // Ignore browser and OS combos that also carry shift or alt.
      if (event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (isTyping) return;

      // Ctrl/Cmd + D is "bookmark this page" in every major browser.
      event.preventDefault();
      toggleTheme();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, toggleTheme]);

  return <>{children}</>;
};

export default ThemeShortcutProvider;
