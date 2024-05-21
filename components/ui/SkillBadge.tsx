import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillBadgeProps {
  label: string;
  icon: React.ReactNode;
}

const SkillBadge = ({ label, icon }: SkillBadgeProps) => {
  return (
    <div className="cursor-pointer p-8 bg-[#cecece] text-light-1 flex items-center justify-center rounded-xl h-[60px] w-[60px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent className="mb-4">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SkillBadge;
