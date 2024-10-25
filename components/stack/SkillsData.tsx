import { IoLogoNodejs } from "react-icons/io";
import { GrMysql, GrReactjs } from "react-icons/gr";
import { FaCss3Alt, FaHtml5 } from "react-icons/fa";
import { SiMongoose, SiNextdotjs, SiPrisma } from "react-icons/si";
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { TbBrandFramerMotion, TbBrandThreejs } from "react-icons/tb";
import {
  BiLogoPostgresql,
  BiLogoMongodb,
  BiLogoTypescript,
} from "react-icons/bi";

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
    icon: <GrReactjs className="h-6 w-6" />,
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
    label: "PostgreSQL",
    icon: <BiLogoPostgresql className="h-7 w-7" />,
  },
  {
    label: "Prisma",
    icon: <SiPrisma className="h-6 w-6" />,
  },
];
