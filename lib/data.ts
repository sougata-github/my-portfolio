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
      mobileImageUrl: "/project-mobile-images/devoverflow-mobile.jpg",
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
        "This was the first project I built using Next.js, so it was quite intimidating as I had just started learning the framework. It took nearly three months to complete and deploy without errors. Along the way, I faced numerous challenges, from setup to deployment, encountering errors at every turn.",

        "One notable hurdle was integrating webhooks to sync Clerk and MongoDB databases. I also recall a mid-project update from Vercel breaking everything, though resolving it by updating dependencies.",

        "Throughout, resources like Github, Stack Overflow, and documentation proved invaluable. These errors pushed me beyond my comfort zone, teaching me debugging techniques, best practices, clean coding, and most importantly - patience. Thus, I can conclude that encountering errors was an essential part of making progress.",
      ],
      lessons: [
        "Where to start? I learnt about all the important Next.js features like App Router, SSR, ISR, SSG, React Server Components, API Routes, Server Actions, Loading and Error States, Layout Components, Dynamic Routes, Route Groups, Image and Link Components, and many more.",

        "Moreover, I tackled essential functionalities like Pagination, Searching, Debouncing, Filtering, React Hook Form, and Fetching and Displaying Data using APIs. I gained knowledge in Production-Ready Development, Clean Code, Optimization, SEO, Metadata, Organized File and Folder Structure, Building and Deployment Processes, Reusable Components, User-Centered Design, UX, and Responsiveness.",

        "Furthermore, I ventured into designing database models, employing Mongoose and MongoDB for efficient querying and database operations.",

        "Embarking on this application was a decision I'm grateful for, as the learnings from this journey are truly invaluable.",
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
      mobileImageUrl: "/project-mobile-images/jotion-mobile.jpg",
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
      problems: [
        "This project is essentially a minimalistic Notion clone. For real-time updates, I used a backend service called Convex - a real time database. One issue I encountered was with the document restoration feature. After restoring an archived document, I was unable to fetch it because I had forgotten to return the document in the query.",

        "Implementing the expandable sidebar was quite complex. I had to account for both desktop and mobile views, as well as accommodate space for child documents. To achieve this, I used multiple refs for collapsing, expanding, and resizing the sidebar.",

        "Integrating the Block Note Editor was another major hurdle. I frequently referred to the documentation to tailor it to my needs. Initially, the editor overflowed out of the screen, so I had to explicitly copy the editor styles and customize them accordingly.",
      ],
      lessons: [
        "For the first time, I delved into Recursive React Components. By implementing a functional component that calls itself, I achieved the creation of infinite children documents, each linked to a parent document via its ID.",

        "Fetching data on the client-side, performing mutations, and enabling real-time editing. Additionally, I explored the use of refs for DOM interactivity and leveraged Zustand for global state management, specifically to track the open and closed states of modals.",

        "This project not only enhanced my technical skills but also deepened my understanding of modern web development practices and problem-solving approaches.",
      ],
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
      mobileImageUrl: "/project-mobile-images/team-chat-mobile.jpg",
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
      problems: [
        "Implementing WebSockets, particularly Socket IO, for the first time presented a valuable learning opportunity. Setting up an IO handler, Socket Provider, and custom hook to integrate Socket IO with React Query for real-time message fetching was a novel experience.",

        "Designing the server, channels, and user profiles, while establishing relationships between all models, posed significant challenges. One notable issue arose with null first names for users who signed up without providing this essential detail. This issue became critical as the media room failed to render without a first name. Fortunately, I resolved this by implementing a default first name for users who hadn't specified one.",

        "Developing the Chat Component proved to be highly challenging due to its requirement for infinite scrolling of messages, coupled with the Chat Input component. To address this, I employed custom hooks for prefetching older messages and utilized refs for seamless auto-scrolling to the latest message.",
      ],
      lessons: [
        "Building this project underscored the significance of custom hooks in streamlining code and facilitating reusability. I discovered their versatility in various contexts and learned to leverage them effectively. Additionally, I explored the efficient utilization of Next.js' API routes, ensuring secure querying on both client and server sides.",

        "A key focus was on integrating forms as modals and managing them using global state management. I used WebSockets and their integration with React Query to enhance user experience. Notably, deploying a Next.js application without Vercel for the first time provided insights into server-side functionalities, particularly regarding WebSockets' compatibility.",

        "This project served as a window into the workings of robust chat applications like Discord and Messenger. Understanding their architecture and schema design proved enlightening. Integrating these insights into the project not only enriched its functionality but also expanded my understanding of application design principles.",
      ],
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
      mobileImageUrl: "/project-mobile-images/iphone-landing-page-mobile.jpg",
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
      problems: [
        "The prospect of delving into web-based animations and 3D models filled me with excitement and anticipation. Utilizing GSAP for crafting smooth animations and transitions was a rewarding endeavor. Opting for React as the framework of choice seemed logical, considering the application's client-side nature.",

        "One of the most daunting challenges in this project was the implementation of the Animated Video Carousel. Ensuring seamless transitions between videos while tracking each video's progress required meticulous planning and execution. Leveraging multiple refs, effects, and GSAP hooks proved instrumental in achieving the desired outcome. This feature stands out as one of the most complex I've encountered in my application development journey.",

        "Rendering the 3D iPhone models presented its own set of challenges, encompassing aspects such as lighting, camera angles, and animation. Constant learning and refinement were necessary to enhance the user interface. This project marked my initiation into the realm of Three.js and React Three Fiber for such tasks. Despite the vastness of these libraries, navigating through them was both daunting and rewarding. Additionally, grappling with TypeScript for this project posed challenges, particularly due to the lack of clear documentation regarding type definitions for Three.js modules and their usage.",
      ],
      lessons: [
        "This project provided an opportunity to explore the creation of dynamic web experiences and captivating animations, shedding light on the methodologies utilized by industry leaders like Apple and Meta in crafting engaging websites. Additionally, I acquired the skills to integrate Sentry into React applications for tracking website performance and web vitals, enhancing the project's reliability and user experience.",

        "I firmly believe that every frontend developer should include an innovative project in their portfolio, and this project exemplifies that ethos. By delving into advanced animation techniques and leveraging extensive animation libraries like GSAP, I not only expanded my technical skill set but also discovered the limitless potential for creativity in frontend development.",
      ],
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
