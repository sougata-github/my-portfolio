import { Palette, Plus, Sparkles } from "lucide-react";

interface ProjectFeatureCardProps {
  label: string;
  features: string[];
}

const labelIcon: Record<string, React.ReactNode> = {
  "Key Features": <Sparkles className="h-5 w-6" />,
  Additional: <Plus className="h-5 w-5" />,
  UX: <Palette className="h-5 w-5" />,
};

const ProjectFeatureCard = ({ label, features }: ProjectFeatureCardProps) => {
  return (
    <div className="pb-4 flex flex-col items-center lg:items-start px-4">
      <div className="pt-5 flex flex-row gap-2 items-center justify-center">
        <h1 className="tracking-tight text-light-1 font-semibold text-base md:text-xl">
          {label}
        </h1>
        {labelIcon[label]}
      </div>

      <ul className="max-sm:mt-6 mt-8 flex flex-col gap-4">
        {features.slice(0, 6).map((feature) => (
          <li
            key={feature}
            className="tracking-tight font-medium text-[13px] md:text-sm text-light-2 hover:text-light-1 transition-all"
          >
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectFeatureCard;
