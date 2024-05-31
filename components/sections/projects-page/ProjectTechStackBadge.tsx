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

const ProjectTechStackBadge = ({ label, icon }: SkillBadgeProps) => {
  return (
    <div className="cursor-pointer p-4 bg-[#cecece] text-light-1 flex items-center justify-center rounded-xl h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent className="mb-4">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ProjectTechStackBadge;
