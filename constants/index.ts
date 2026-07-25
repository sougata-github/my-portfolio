import { RiTwitterXLine } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { Linkedin } from "lucide-react";

interface Experience {
  id: string;
  date: string;
  position: string;
  company: string;
  type: string;
  /* Optional. The company name renders as a link only when present. */
  href?: string;
  description: string[];
}

export const experienceData: Experience[] = [
  {
    id: "full-stack-developer",
    date: "Oct 2025-present",
    position: "Full Stack Developer",
    company: "AdVran",
    type: "Remote",
    href: "https://advran.com",
    description: [
      "Shipped high-quality frontend and full-stack applications for multiple clients using Next.js, TypeScript, and TailwindCSS.",
      "Built reusable components, responsive UIs, SEO-optimized pages, and production-ready multi-step forms, utilizing Zod validation and Zustand persistence.",
      "Implemented end-to-end email automation with server actions and Nodemailer, owning projects from design system to final deployment.",
    ],
  },
];

interface Project {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  links: { live: string; src: string };
  /*
    Static MeshGradient config. speed is 0 everywhere, so frame acts as the
    seed that fixes one deterministic composition per project.

    Every card owns its ramp. This is the one section that breaks the
    monotone palette: site chrome stays stone and graphite, the work carries
    colour.

    Ramps are deliberately not uniform across the four cards.

    AI Chat and Jotion use a full four-shade ramp, so their fields have
    intermediate tones and read as atmospheric.

    Team Chat and iPhone 15 use two colours, the page background plus one
    hue. MeshGradient treats every array entry as its own colour spot, so
    the base is repeated three times against a single hue entry. That
    weighting is what keeps the background dominant and the hue an accent,
    rather than the two splitting the card evenly. Those two read as graphic
    rather than atmospheric, which is the point of the contrast.
  */
  shader: {
    distortion: number;
    swirl: number;
    frame: number;
    scale: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
    light: string[];
    dark: string[];
  };
}

export const projectData: Project[] = [
  {
    id: "ai-chat",
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
    /* Deep teal. Turbulent, high contrast, computational. */
    shader: {
      distortion: 0.95,
      swirl: 0.35,
      frame: 2400,
      scale: 1.15,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      light: ["#DEEAE6", "#B4D0C8", "#74A497", "#356257"],
      dark: ["#08100E", "#0F2C27", "#1C574B", "#5FB5A3"],
    },
  },
  {
    id: "jotion",
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
    /* Warm amber. Calm and layered, paper-like, near-horizontal banding. */
    shader: {
      distortion: 0.28,
      swirl: 0.04,
      frame: 8200,
      scale: 0.85,
      rotation: 78,
      offsetX: 0,
      offsetY: -0.15,
      light: ["#F2EADA", "#E0CDA9", "#C0A276", "#856B3E"],
      dark: ["#14100A", "#2E2413", "#584322", "#B58F51"],
    },
  },
  {
    id: "team-chat",
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
    /* Indigo. Several distinct centers rather than one mass, high swirl. */
    shader: {
      distortion: 0.62,
      swirl: 0.72,
      frame: 5100,
      scale: 1.35,
      rotation: 200,
      offsetX: 0.12,
      offsetY: 0.08,
      light: ["#F2F0EB", "#F2F0EB", "#F2F0EB", "#4A57A0"],
      dark: ["#1B1A18", "#1B1A18", "#1B1A18", "#6E7DCB"],
    },
  },
  {
    id: "iphone-15",
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
    /* Cool steel. The one deliberately metallic card, widest spread. */
    shader: {
      distortion: 0.4,
      swirl: 0.94,
      frame: 11000,
      scale: 1.6,
      rotation: 312,
      offsetX: -0.18,
      offsetY: 0.12,
      light: ["#F2F0EB", "#F2F0EB", "#F2F0EB", "#6E7A80"],
      dark: ["#1B1A18", "#1B1A18", "#1B1A18", "#9AA6AB"],
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
