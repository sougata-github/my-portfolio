"use client";

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
      className="w-[100px] bg-background/5 rounded-md mt-1 p-[12px] hover:bg-background/10 transition duration-500 flex items-center justify-center"
      onClick={onCopy}
    >
      {copied ? (
        <>
          <span>Copied</span>
        </>
      ) : (
        <>
          <span>Copy Mail</span>
        </>
      )}
    </Button>
  );
};

export default CopyButton;
