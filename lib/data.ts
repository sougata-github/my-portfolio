export const links = ["Home", "About", "Projects", "Skills", "Contact"];

export const footerLinks = ["About", "Projects", "Contact"];

export const projectsData = [
  {
    id: 1,
    label: "devoverflow",
    title: "DevOverFlow",
    description: "A community-driven Q&A platform for programming enthusiasts.",
    href: "https://devoverflow-next.vercel.app/",
    srcCode: "https://github.com/sougata-github/DevOverFlow",
    tags: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Mongoose"],
    projectDetails: {
      imageUrl: "/project-images/devoverflow-light.png",
      forkLink: "https://github.com/sougata-github/DevOverFlow/fork",
      features: [
        {
          label: "Key Features",
          features: [
            "Authentication",
            "Ask questions",
            "Answer questions",
            "Upvote & Downvote",
          ],
        },
        {
          label: "Additional",
          features: [
            "Badge System",
            "Popular Tags",
            "Global Search",
            "View Jobs",
          ],
        },
        {
          label: "UX",
          features: [
            "Fully Responsive",
            "Light & Dark Mode",
            "Manage Profile",
            "Beautiful Loading UI",
          ],
        },
      ],
      problems: [
        "This project, part of my Next.js learning journey while already deep into React, was quite daunting. It took nearly three months to complete and deploy without errors. Along the way, I faced numerous challenges, from setup to deployment, encountering errors at every turn.",

        "One notable hurdle was integrating webhooks to sync Clerk and MongoDB databases. It took days to realize a wrong API key was the culprit behind my database not updating upon user sign-ups. Understanding Next.js caching and rendering strategies was pivotal for debugging page update issues.",

        "I vividly recall a mid-project update from Vercel breaking everything, though resolving it by updating dependencies. Throughout, resources like Github, Stack Overflow, and documentation proved invaluable. These errors pushed me beyond my comfort zone, teaching me debugging techniques, best practices, clean coding, and patience. In summary, errors signify progress.",
      ],
      lessons: [
        "Where to start? This being my inaugural dive into Next.js was the project's most valuable lesson. I explored a plethora of features like App Router, SSR, ISR, SSG, React Server Components, API Routes, Server Actions, Loading and Error States, Layout Components, Dynamic Routes, Route Groups, Image and Link Components, and many more.",

        "Moreover, I tackled essential functionalities like Pagination, Searching, Debouncing, Filtering, React Hook Form, and Fetching and Displaying Data using APIs. This endeavor marked my maiden voyage into production-ready development, emphasizing Clean Code, Optimization, SEO, Metadata, Organized File and Folder Structure, Scalable and Maintainable Code, Building and Deployment Processes, Reusable Components, User-Centered Design, UX, and Responsiveness.",

        "Furthermore, I ventured into designing database models, employing Mongoose and MongoDB for efficient querying and database operations. Embarking on this application was a decision I'm grateful for, as the insights gleaned from this journey are truly invaluable.",
      ],
    },
  },
  {
    id: 2,
    label: "jotion",
    title: "Jotion",
    description: "Productivity and note-taking web application.",
    href: "https://jotion-next.vercel.app/",
    srcCode: "https://github.com/sougata-github/Jotion",
    tags: ["Next.js", "TypeScript", "Tailwind", "React Query", "Convex"],
    projectDetails: {
      imageUrl: "/project-images/jotion-1.png",
      forkLink: "https://github.com/sougata-github/Jotion/fork",
      features: [
        {
          label: "Key Features",
          features: [
            "Authentication",
            "Archive Notes",
            "Restore Notes",
            "Notion-style Editor",
            "Infinite Child Notes",
            "Real-time Database",
          ],
        },
        {
          label: "Additional",
          features: [
            "Publish Note",
            "Cover Image",
            "Document Icons",
            "Real time updates",
          ],
        },
        {
          label: "UX",
          features: [
            "Fully Responsive",
            "Light & Dark Mode",
            "Expandable Sidebar",
            "Beautiful Loading UI",
          ],
        },
      ],
      problems: [""],
      lessons: [""],
    },
  },
  {
    id: 3,
    label: "team-chat",
    title: "Team Chat",
    description: "Full-Stack Discord clone built using Next.js.",
    href: "https://team-chat-efq7.onrender.com/invite/4a8a83a6-f6df-4644-90ee-d2c1093c0411",
    srcCode: "https://github.com/sougata-github/Team-Chat",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Socket-io"],
    projectDetails: {
      imageUrl: "/project-images/team-chat-light.png",
      forkLink: "https://github.com/sougata-github/Team-Chat/fork",
      features: [
        {
          label: "Key Features",
          features: [
            "Authentication",
            "Create & Edit Servers",
            "Real time messaging",
            "Delete & Edit Messages",
            "Create and Edit channels",
            "Audio and Video Calls",
          ],
        },
        {
          label: "Additional",
          features: [
            "Generate Invite link",
            "Infinite loading",
            "Direct Messages",
            "Polling with alerts",
            "Member management",
          ],
        },
        { label: "UX", features: ["Fully Responsive", "Light & Dark Mode"] },
      ],
      problems: [""],
      lessons: [""],
    },
  },
  {
    id: 4,
    label: "iphone-landing-page",
    title: "iPhone landing page",
    description:
      "IPhone 15 Pro landing page built using React, GSAP and Three.js.",
    href: "https://iphone-15-pro-landing-page.vercel.app/",
    srcCode: "https://github.com/sougata-github/iphone-15-pro-landing-page",
    tags: ["React.js", "TypeScript", "Tailwind", "GSAP", "Three.js"],
    projectDetails: {
      imageUrl: "/project-images/iphone-landing-page.png",
      forkLink:
        "https://github.com/sougata-github/iphone-15-pro-landing-page/fork",
      features: [
        {
          label: "Key Features",
          features: [
            "3D iPhone models",
            "Animated Carousel",
            "Stunning Hero Section",
          ],
        },
        {
          label: "UX",
          features: [
            "Fully Responsive",
            "Smooth Animations",
            "Seamless Transitions",
          ],
        },
      ],
      problems: [""],
      lessons: [""],
    },
  },
];

export const allProjectsData = [
  {
    id: 1,
    title: "DevOverFlow",
    description: "A community-driven Q&A platform for programming enthusiasts.",
    href: "https://devoverflow-next.vercel.app/",
    srcCode: "https://github.com/sougata-github/DevOverFlow",
  },
  {
    id: 2,
    title: "Jotion",
    description: "Productivity and note-taking web application.",
    href: "https://jotion-next.vercel.app/",
    srcCode: "https://github.com/sougata-github/Jotion",
  },
  {
    id: 3,
    title: "Team Chat",
    description: "Full-Stack Discord clone built using Next.js.",
    href: "https://team-chat-efq7.onrender.com/invite/4a8a83a6-f6df-4644-90ee-d2c1093c0411",
    srcCode: "https://github.com/sougata-github/Team-Chat",
  },
  {
    id: 4,
    title: "iPhone landing page",
    description:
      "IPhone 15 Pro landing page built using React, GSAP and Three.js.",
    href: "https://iphone-15-pro-landing-page.vercel.app",
    srcCode: "https://github.com/sougata-github/iphone-15-pro-landing-page",
  },
  {
    id: 5,
    title: "Zoom Clone",
    description: "Minimalistic zoom clone built using Next.js & Stream.",
    href: "https://yoom-next.vercel.app",
    srcCode: "https://github.com/sougata-github/zoom-clone",
  },
  {
    id: 6,
    title: "Next Search",
    description: "Full-Stack Search Engine built using Next.js.",
    href: "https://next14-search.vercel.app",
    srcCode: "https://github.com/sougata-github/Next-Search",
  },
  {
    id: 7,
    title: "Travel landing page",
    description: "A modern Travel landing page in Next.js.",
    href: "https://travel-landing-page-next.vercel.app",
    srcCode: "https://github.com/sougata-github/Travel_Landing_Page",
  },
  {
    id: 8,
    title: "Restaurant landing page",
    description: "A Modern Restaurant landing page in React. ",
    href: "https://modern-restaurant-landing-page.vercel.app",
    srcCode: "https://github.com/sougata-github/Modern-Restaurant-Landing-Page",
  },
];
