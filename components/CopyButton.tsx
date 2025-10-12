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
    <Button variant="ghost" size="sm" onClick={onCopy} className="w-[82px]">
      {copied ? (
        <>
          <span>copied</span>
        </>
      ) : (
        <>
          <span>copy mail</span>
        </>
      )}
    </Button>
  );
};

export default CopyButton;
