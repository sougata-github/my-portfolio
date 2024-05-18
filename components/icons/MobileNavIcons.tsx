import { Phone } from "lucide-react";
import { UserAccountIcon } from "./About";
import { Home01Icon } from "./Home";
import { Briefcase05Icon } from "./Projects";
import { Rocket01Icon } from "./Skill";

export type links = {
  link: string;
  icon: React.ReactNode;
};

export const iconLinks: links[] = [
  {
    link: "Home",
    icon: <Home01Icon className="h-5 w-5 text-[#6f6f6f]" />,
  },
  {
    link: "About",
    icon: <UserAccountIcon className="h-5 w-5 text-[#6f6f6f]" />,
  },
  {
    link: "Projects",
    icon: <Briefcase05Icon className="h-5 w-5 text-[#6f6f6f]" />,
  },
  {
    link: "Skills",
    icon: <Rocket01Icon className="h-5 w-5 text-[#6f6f6f]" />,
  },
  {
    link: "Contact",
    icon: <Phone className="h-[17px] w-[17px] text-[#6f6f6f]" />,
  },
];
