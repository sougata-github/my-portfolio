import {
  BiLogoMongodb,
  BiLogoTypescript,
  BiLogoPostgresql,
} from "react-icons/bi";
import { FaDatabase } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  SiClerk,
  SiMongoose,
  SiNextdotjs,
  SiPrisma,
  SiReactquery,
  SiShadcnui,
  SiSocketdotio,
  SiVercel,
  SiGreensock,
  SiSentry,
  SiVite,
} from "react-icons/si";
import { MdEditDocument } from "react-icons/md";
import { GrReactjs } from "react-icons/gr";
import { TbBrandThreejs } from "react-icons/tb";

export const TechIcons = [
  {
    title: "devoverflow",
    techStack: [
      {
        label: "Next.js 14",
        icon: <SiNextdotjs className="h-7 w-7" />,
      },
      {
        label: "TypeScript",
        icon: <BiLogoTypescript className="h-9 w-9" />,
      },
      {
        label: "Tailwind CSS",
        icon: <RiTailwindCssFill className="h-7 w-7" />,
      },
      {
        label: "MongoDB",
        icon: <BiLogoMongodb className="h-8 w-8" />,
      },
      {
        label: "Mongoose",
        icon: <SiMongoose className="h-8 w-8" />,
      },
      {
        label: "Clerk",
        icon: <SiClerk className="h-6 w-6" />,
      },
      {
        label: "Shadcn UI",
        icon: <SiShadcnui className="h-6 w-6" />,
      },
      {
        label: "Vercel",
        icon: <SiVercel className="h-6 w-6" />,
      },
    ],

    others: [
      "Prism JS",
      "React Icons",
      "Zod",
      "TinyMCE Editor",
      "Query String",
      "Next Themes",
      "JSearch",
    ],
  },
  {
    title: "jotion",
    techStack: [
      {
        label: "Next.js 14",
        icon: <SiNextdotjs className="h-7 w-7" />,
      },
      {
        label: "TypeScript",
        icon: <BiLogoTypescript className="h-8 w-8" />,
      },
      {
        label: "Tailwind CSS",
        icon: <RiTailwindCssFill className="h-7 w-7" />,
      },
      {
        label: "Clerk",
        icon: <SiClerk className="h-6 w-6" />,
      },
      {
        label: "Convex",
        icon: <FaDatabase className="h-6 w-6" />,
      },
      {
        label: "Shadcn UI",
        icon: <SiShadcnui className="h-6 w-6" />,
      },
      {
        label: "BlockNote Editor",
        icon: <MdEditDocument className="h-7 w-7" />,
      },
      {
        label: "Vercel",
        icon: <SiVercel className="h-6 w-6" />,
      },
    ],

    others: ["Edgestore", "Next Themes", "Sonner", "Zustand", "Zod"],
  },

  {
    title: "team-chat",
    techStack: [
      {
        label: "Next.js 14",
        icon: <SiNextdotjs className="h-7 w-7" />,
      },
      {
        label: "TypeScript",
        icon: <BiLogoTypescript className="h-10 w-10" />,
      },
      {
        label: "Tailwind CSS",
        icon: <RiTailwindCssFill className="h-7 w-7" />,
      },
      {
        label: "Clerk",
        icon: <SiClerk className="h-6 w-6" />,
      },
      {
        label: "Prisma",
        icon: <SiPrisma className="h-7 w-7" />,
      },
      {
        label: "NeonDB",
        icon: <BiLogoPostgresql className="h-8 w-8" />,
      },
      {
        label: "Socket IO",
        icon: <SiSocketdotio className="h-7 w-7" />,
      },
      {
        label: "React Query",
        icon: <SiReactquery className="h-7 w-7" />,
      },
    ],
    others: [
      "Shadcn UI",
      "Uploadthing",
      "Livekit",
      "Zustand",
      "Emoji Mart",
      "Axios",
      "Zod",
      "Next Themes",
      "Vercel",
    ],
  },
  {
    title: "iphone-landing-page",
    techStack: [
      {
        label: "React",
        icon: <GrReactjs className="h-7 w-7" />,
      },
      {
        label: "TypeScript",
        icon: <BiLogoTypescript className="h-10 w-10" />,
      },
      {
        label: "Tailwind CSS",
        icon: <RiTailwindCssFill className="h-7 w-7" />,
      },
      {
        label: "GSAP",
        icon: <SiGreensock className="h-9 w-9" />,
      },
      {
        label: "Three.js",
        icon: <TbBrandThreejs className="h-7 w-7" />,
      },
      {
        label: "Sentry",
        icon: <SiSentry className="h-7 w-7" />,
      },
      {
        label: "Vite",
        icon: <SiVite className="h-7 w-7" />,
      },
      {
        label: "Vercel",
        icon: <SiVercel className="h-6 w-6" />,
      },
    ],
  },
];
