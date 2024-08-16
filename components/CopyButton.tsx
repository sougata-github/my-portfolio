"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

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
    <Button
      className="w-[130px] text-light/60 text-sm flex gap-2 items-center rounded-lg bg-light/10 hover:bg-background/20 transition duration-500 font-inter"
      onClick={onCopy}
    >
      {copied ? (
        <>
          <span>Copied</span>
          <Check className="h-4 w-4" />
        </>
      ) : (
        <>
          <span>Copy Mail</span>
          <Copy className="h-4 w-4" />
        </>
      )}
    </Button>
  );
};

export default CopyButton;
