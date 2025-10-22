"use client";

import { Box } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "../hooks/use-mobile";
import { useState } from "react";
import SummaryModal from "./SummaryModal";

const Summary = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <SummaryModal isOpen={isOpen} setIsOpen={setIsOpen} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="AI Summary"
        >
          <Box className="size-[18px]" />
          <span className="sr-only">Generate Summary</span>
        </Button>
      </>
    );
  }

  return (
    <>
      <SummaryModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="AI Summary"
            >
              <Box className="size-[18px]" />
              <span className="sr-only">Generate Summary</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-background">
            <p>AI Summary</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default Summary;
