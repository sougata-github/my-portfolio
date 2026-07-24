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
      className="label rounded-none border border-border px-2.5 py-1 transition-colors duration-300 hover:border-foreground/20 hover:text-foreground"
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
