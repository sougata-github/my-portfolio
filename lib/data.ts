import appleThumbnail from "@/public/projects-home/apple.png";
import jotionThumbnail from "@/public/projects-home/jotion.png";
import teamChatThumbnail from "@/public/projects-home/team-chat.png";
import devoverflowThumbnail from "@/public/projects-home/devoverflow.png";

import aiSaas from "@/public/projects-page/ai-saas.png";
import darkSaas from "@/public/projects-page/dark-saas.png";
import lightSaas from "@/public/projects-page/light-saas.png";
import dashboardDark from "@/public/projects-page/dashboard-1.png";
import dashboardLight from "@/public/projects-page/dashboard-2.png";

export const links = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Projects",
    link: "/projects",
  },
  {
    label: "Blogs",
    link: "/blogs",
  },
  {
    label: "Stack",
    link: "/stack",
  },
];

export const projectsData = [
  {
    title: "DevOverFlow",
    href: "/projects/devoverflow",
    imageUrl: devoverflowThumbnail,
    description: "A community-driven Q&A platform for programming enthusiasts.",
  },
  {
    title: "Jotion",
    href: "/projects/jotion",
    imageUrl: jotionThumbnail,
    description:
      "Productivity and note-taking web application built using Next.js.",
  },

  {
    title: "Team Chat",
    href: "/projects/team-chat",
    imageUrl: teamChatThumbnail,
    description: "Full-Stack Discord clone built using Next.js.",
  },
  {
    title: "iPhone 15",
    href: "/projects/iphone",
    imageUrl: appleThumbnail,
    description:
      "iPhone 15 Pro landing page built using React, GSAP and Three.js.",
  },
];

export const servicesData = [
  {
    title: "Landing Pages",
    href: "/projects#services",
    description: "Modern landing pages for your online business.",
  },
  {
    title: "Dashboards",
    href: "/projects#services",
    description: "Dashboards that provide help you track performance.",
  },
];

export const stackData = [
  {
    title: "My Skills",
    href: "/stack#skills",
    description: "An overview of my expertise in web development.",
  },
  {
    title: "Development Stack",
    href: "/stack#primary-stack",
    description: "Tools, technologies and services I use to build my projects.",
  },
];

export const primaryStackData = [
  {
    title: "Next.js",
    href: "https://nextjs.org/",
    content:
      "My go-to framework for building full-stack applications. Features like SSR, React Server Components, and file-based routing truly makes it the React framework for the web.",
  },
  {
    title: "TypeScript",
    href: "https://www.typescriptlang.org/",
    content:
      "I always use TypeScript in my projects for its robust type system and scalability, which helps in maintaining a clean and reliable codebase.",
  },
  {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    content:
      "The perfect choice for styling when it comes to React. Easy to set up, highly customizable, and it simplifies the process of making web pages responsive.",
  },
  {
    title: "Framer Motion",
    href: "https://www.framer.com/motion/",
    content:
      "When it comes to React, I think this is the best animation library. It provides powerful hooks for creating complex animations with minimal effort.",
  },
  {
    title: "Shadcn UI",
    href: "https://ui.shadcn.com/",
    content:
      "Beautifully designed reusable UI components. I mostly use it for including popovers, dialogues, forms, and theming in my applications.",
  },
  {
    title: "Clerk",
    href: "https://clerk.com/",
    content:
      "I use Clerk for authentication in almost all of my projects. It is easy to integrate, provides built-in components, useful hooks, social providers and basic user managment.",
  },
  {
    title: "Vercel",
    href: "https://vercel.com/",
    content:
      "Easy to deploy applications with just one click, utilizing serverless edge functions for optimized performance and scalability.",
  },
];

export const landingPageData = [
  {
    name: "Dark-themed Saas landing page",
    href: "https://dark-saas-page.vercel.app",
    imageUrl: darkSaas,
  },
  {
    name: "Light-themed Saas landing page",
    href: "https://light-saas-page.vercel.app",
    imageUrl: lightSaas,
  },
  {
    name: "Ai-themed Saas landing page",
    href: "https://ai-saas-page.vercel.app",
    imageUrl: aiSaas,
  },
];

export const dashboardsData = [
  {
    name: "Admin Dashboard Dark",
    href: "https://nextjs-admin-dashboard-1.vercel.app",
    imageUrl: dashboardDark,
  },
  {
    name: "Admin Dashboard Light",
    href: "https://nextjs-admin-dashboard-2.vercel.app",
    imageUrl: dashboardLight,
  },
];
