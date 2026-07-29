"use client";

import { useState } from "react";

const EMAIL = "sougatadas9874@gmail.com";

const CopyButton = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      /*
        No border of its own. It sits in the hero strip where the cell
        supplies the dividers, and doubling them would thicken that edge.
        Full width on mobile so it reads as the CTA.
      */
      className="label flex h-full w-full items-center justify-center px-4 py-5 transition-colors duration-300 hover:text-foreground md:justify-start md:px-7"
    >
      {/*
        aria-live: swapping the label text is silent to a screen reader
        otherwise, so the copy would appear to do nothing.

        min-width is sized for the longer of the two labels once uppercased
        and tracked out by .label, so the border does not resize on click.
        nowrap stops it breaking across lines if that estimate is ever short.
      */}
      <span
        aria-live="polite"
        className="inline-block min-w-[84px] whitespace-nowrap text-center"
      >
        {copied ? "Copied" : "Copy mail"}
      </span>
    </button>
  );
};

export default CopyButton;
