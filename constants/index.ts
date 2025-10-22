import { RiTwitterXLine } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { Linkedin } from "lucide-react";


export const navLinks = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "blogs",
    href: "/blogs",
  },
] as const;

export const experienceData = [
  {
    id: "personal-projects",
    date: "2023-present",
    position: "Full Stack Developer",
    company: "Personal Projects",
    type: "Remote",
    description:
      "Designed, built and deployed multiple frontend and full-stack applications (AI chat app, productivity tool, interactive landing pages and dashboards) using Next.js, TypeScript, Tailwind, tRPC, Convex, and PostgreSQL.",
  },
];

export const projectData = [
  {
    title: "AI Chat",
    summary: `This is a modern full-stack ai chat application built using Next.js, AI SDK and Convex. \n\n The architecture is simple. I have used Next.js as the full-stack framework, AI SDK as unified API for interacting with multiple providers, streaming on both client and server, Convex as the persistence layer and Better Auth for authentication. \n\n Features include multiple-provider setup, multimodal-input with file attachments, tools like web-search and image-generation, guest mode and daily limits.`,
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Shadcn UI",
      "AI SDK",
      "Convex",
      "Better Auth",
      "Uploadthing",
      "Vercel",
    ],
    links: {
      live: "https://ai-chat-app-dev.vercel.app",
      src: "https://github.com/sougata-github/ai-chat-app",
    },
  },
  {
    title: "Jotion",
    summary: `This is a modern productivity and note-taking web application built using Next.js 14 and Convex. I have used Next.js as the full-stack framework, Convex as the real-time database and backend logic layer, and Clerk for authentication. \n\n Features include a Notion-style editor built with BlockNote, real-time updates, infinite nested documents, file uploads with Edgestore, recoverable trash system, and the ability to publish notes to the web. \n\n It also includes an expandable sidebar, cover images for each document, soft delete and recovery, and full responsiveness across devices.`,
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Shadcn UI",
      "Clerk",
      "Convex",
      "Edgestore",
      "Blocknote",
      "Zustand",
      "Vercel",
    ],
    links: {
      live: "https://jotion-next.vercel.app",
      src: "https://github.com/sougata-github/jotion",
    },
  },
  {
    title: "Team Chat",
    summary: `This is a full-stack real-time chat application built using Next.js 14 and Convex. I have used Next.js as the full-stack framework, Convex as the real-time backend and data layer, and Clerk for authentication and user management. \n\n Features include real-time messaging with file attachments, message editing and deletion for all users, text, audio, and video channels powered by Livekit, and 1:1 private conversations with video calls. \n\n It also supports server creation and customization, member management with roles and permissions, unique invite links with a complete invite system, infinite message loading and a fully responsive interface.`,
    stack: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Shadcn UI",
      "Clerk",
      "Convex",
      "Livekit",
      "Uploadthing",
      "Zustand",
      "Vercel",
    ],
    links: {
      live: "https://team-chat-next.vercel.app/invite/03bf69e3-9bf4-4d53-991c-c3a179f14409",
      src: "https://github.com/sougata-github/team-chat",
    },
  },
  {
    title: "iPhone 15",
    summary: `This is a modern landing page for iphone 15 built using React, GSAP, and React Three Fiber. I have used React with TypeScript for structure, GSAP for seamless motion and transitions, and Three.js for rendering interactive 3D iPhone models. \n\n Features include a stunning hero section, animated video carousel, immersive 3D product showcase, and fluid transitions throughout the page.`,
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "TailwindCSS",
      "GSAP",
      "React Three Fiber",
      "Sentry",
      "Vercel",
    ],
    links: {
      live: "https://iphone-15-pro-landing-page.vercel.app",
      src: "https://github.com/sougata-github/iPhone-15-pro-landing-page",
    },
  },
];

export const footerLinks = [
  {
    label: "Linkedin",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/sougata-linkdin",
  },
  {
    label: "Github",
    icon: FiGithub,
    href: "https://github.com/sougata-github",
    className: "size-3.5",
  },

  {
    label: "X(Twitter)",
    icon: RiTwitterXLine,
    href: "https://x.com/sougata_x",
  },
];
