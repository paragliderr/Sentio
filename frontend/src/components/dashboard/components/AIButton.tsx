"use client";

import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AIButton = ({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={onClick}
          className={`relative rounded-lg p-2 transition-all duration-200 hover:bg-secondary ${
            isOpen ? "text-primary bg-secondary" : "text-muted-foreground"
          }`}
        >
          <Sparkles className="h-[18px] w-[18px]" />
          {isOpen && <span className="absolute inset-0 rounded-lg ring-1 ring-primary/30" />}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          Get help with AI
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AIButton;