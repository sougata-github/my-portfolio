import { UserAccountIcon } from "./About";
import { Home01Icon } from "./Home";
import { Rocket01Icon } from "./Skill";
import { SentIcon } from "./Sent";
import { Folder } from "lucide-react";

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
    icon: <Folder className="h-5 w-5 text-[#6f6f6f]" />,
  },
  {
    link: "Skills",
    icon: <Rocket01Icon className="h-5 w-5 text-[#6f6f6f]" />,
  },
  {
    link: "Contact",
    icon: <SentIcon className="h-5 w-5 text-[#6f6f6f]" />,
  },
];
