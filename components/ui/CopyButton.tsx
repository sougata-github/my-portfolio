"use client";

import { useState } from "react";

import { Button } from "./button";

import { Check, Copy } from "lucide-react";

const mail = "sougatadas9874@gmail.com";

const CopyButton = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const onCopy = () => {
    navigator.clipboard.writeText(mail);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Button className="button-base-styles" onClick={onCopy}>
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4 max-sm:h-3 max-sm:w-3 text-white" />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4 max-sm:h-3 max-sm:w-3 text-white" />
          Copy Mail
        </>
      )}
    </Button>
  );
};

export default CopyButton;
