---
title: "Team Chat"
slug: "team-chat"
imageUrl: "/project-page/team-chat.png"
description: Full-Stack Discord clone built using Next.js.
links:
  liveLink: "https://team-chat-efq7.onrender.com/invite/4a8a83a6-f6df-4644-90ee-d2c1093c0411"
  srcLink: "https://github.com/sougata-github/Team-Chat"
  forkLink: "https://github.com/sougata-github/Team-Chat/fork"
nextProject:
  title: "iPhone 15 landing page"
  link: "/projects/iphone"
---

# Features

## Core features.

**Authentication**, **create & edit Servers**, **real time messagings**, **delete & edit Messages**, **create and edit channels** and **audio and video Calls**.

**Member management** in servers, **generation of invite-link**, **direct messages**, and **infinite-loading** of content.

# Stack

## Primary stack.

**[Next.js 14](https://nextjs.org/)** with **[TypeScript](https://www.typescriptlang.org/)**, **[Tailwind CSS](https://tailwindcss.com/)**, **[Shadcn UI](https://ui.shadcn.com/)**, **[Clerk](https://clerk.com/)**.

I used **[Socket IO](https://socket.io/)** for real-time messaging and **[NeonDB](https://neon.tech/)** with **[Prisma](https://www.prisma.io/)** for the backend. **[React Query](https://tanstack.com/query/latest)** for state-management, **[Upload Thing](https://uploadthing.com/)** for file and image uploads and **[Livekit](https://livekit.io/)** for audio and video calls.

# Problems

## Development roadbloacks.

Implementing WebSockets, particularly Socket IO, for the first time presented a valuable learning opportunity.

One notable issue arose with null first names for users who signed up without providing this essential detail. This issue became critical as the media room failed to render without a first name. Fortunately, I resolved this by implementing a default first name for users who hadn't specified one.

Developing the Chat Component proved to be highly challenging due to its requirement for infinite scrolling of messages. To address this, I employed a custom hook for prefetching older messages and utilized refs for seamless auto-scrolling to the latest message.

# Lessons

## Key takeaways.

Building this project underscored the significance of custom hooks in streamlining code and facilitating reusability. I discovered their versatility in various contexts and learned to leverage them effectively. Additionally, I explored the efficient utilization of Next.js' API routes, ensuring secure querying on both client and server sides.

A key focus was on integrating forms as modals and managing them using global state management. I used WebSockets and their integration with React Query to enhance user experience.

Notably, deploying a Next.js application without Vercel for the first time provided insights into server-side functionalities, particularly regarding WebSockets' compatibility.
