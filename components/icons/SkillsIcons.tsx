import { FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { BiLogoMongodb, BiLogoTypescript } from "react-icons/bi";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { IoIosGitBranch, IoLogoGithub, IoLogoNodejs } from "react-icons/io";
import { GrMysql, GrReactjs } from "react-icons/gr";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiMongoose, SiNextdotjs, SiPrisma } from "react-icons/si";

export const skillsData = [
  {
    label: "HTML",
    icon: <FaHtml5 className="h-8 w-8" />,
  },
  {
    label: "CSS",
    icon: <FaCss3Alt className="h-8 w-8" />,
  },
  {
    label: "JavaScript",
    icon: <RiJavascriptFill className="h-10 w-10" />,
  },
  {
    label: "TypeScript",
    icon: <BiLogoTypescript className="h-10 w-10" />,
  },
  {
    label: "Tailwind",
    icon: <RiTailwindCssFill className="h-9 w-9" />,
  },
  {
    label: "Node.js",
    icon: <IoLogoNodejs className="h-9 w-9" />,
  },
  {
    label: "React.js",
    icon: <GrReactjs className="h-9 w-9" />,
  },
  {
    label: "Next.js",
    icon: <SiNextdotjs className="h-9 w-9" />,
  },
  {
    label: "Framer Motion",
    icon: <TbBrandFramerMotion className="h-9 w-9" />,
  },
  {
    label: "MongoDB",
    icon: <BiLogoMongodb className="h-9 w-9" />,
  },
  {
    label: "Mongoose",
    icon: <SiMongoose className="h-9 w-9" />,
  },
  {
    label: "MySql",
    icon: <GrMysql className="h-8 w-8" />,
  },
  {
    label: "Prisma",
    icon: <SiPrisma className="h-8 w-8" />,
  },
  {
    label: "Git",
    icon: <IoIosGitBranch className="h-8 w-8" />,
  },
  {
    label: "Github",
    icon: <IoLogoGithub className="h-9 w-9" />,
  },
];
