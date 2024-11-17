import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { skillsData } from "./SkillsData";
import { Separator } from "../ui/separator";

const Skills = () => {
  return (
    <section className="flex flex-col" id="skills">
      <div className="flex flex-col">
        <h1 className="heading-text">My Skills</h1>
        <p className="secondary-text">Technologies I feel comfortable with.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/20 w-full" />

      <div className="pt-6 flex flex-wrap gap-4 max-w-[520px]">
        {skillsData.map((skill) => (
          <div
            className="cursor-pointer p-7 bg-background/10 text-light flex items-center justify-center rounded-xl h-[50px] w-[50px]"
            key={skill.label}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>{skill.icon}</TooltipTrigger>
                <TooltipContent className="mb-4 bg-neutral-900 text-light border-none opacity-100">
                  {skill.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
