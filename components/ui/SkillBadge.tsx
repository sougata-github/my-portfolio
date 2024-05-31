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
    <div className="cursor-pointer p-8 max-lg:p-7 bg-[#cecece] text-light-1 flex items-center justify-center rounded-xl h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
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
