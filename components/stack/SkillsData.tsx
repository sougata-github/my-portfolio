import { GrMysql, GrReactjs } from "react-icons/gr";
import { FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { TbBrandFramerMotion, TbBrandThreejs } from "react-icons/tb";
import { BiLogoMongodb, BiLogoTypescript } from "react-icons/bi";
import { SiGreensock, SiMongoose, SiNextdotjs, SiPrisma } from "react-icons/si";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { IoIosGitBranch, IoLogoGithub, IoLogoNodejs } from "react-icons/io";

export const skillsData = [
  {
    label: "HTML",
    icon: <FaHtml5 className="h-[27px] w-[27px]" />,
  },
  {
    label: "CSS",
    icon: <FaCss3Alt className="h-[27px] w-[27px]" />,
  },
  {
    label: "JavaScript",
    icon: <RiJavascriptFill className="h-8 w-8" />,
  },
  {
    label: "TypeScript",
    icon: <BiLogoTypescript className="h-8 w-8" />,
  },
  {
    label: "Tailwind",
    icon: <RiTailwindCssFill className="h-7 w-7" />,
  },
  {
    label: "Node.js",
    icon: <IoLogoNodejs className="h-7 w-7" />,
  },
  {
    label: "React.js",
    icon: <GrReactjs className="h-7 w-7" />,
  },
  {
    label: "Next.js",
    icon: <SiNextdotjs className="h-7 w-7" />,
  },
  {
    label: "Framer Motion",
    icon: <TbBrandFramerMotion className="h-7 w-7" />,
  },
  {
    label: "React Three Fiber",
    icon: <TbBrandThreejs className="h-7 w-7" />,
  },
  {
    label: "MongoDB",
    icon: <BiLogoMongodb className="h-[30px] w-[30px]" />,
  },
  {
    label: "Mongoose",
    icon: <SiMongoose className="h-8 w-8" />,
  },
  {
    label: "MySql",
    icon: <GrMysql className="h-7 w-7" />,
  },
  {
    label: "Prisma",
    icon: <SiPrisma className="h-7 w-7" />,
  },
];
