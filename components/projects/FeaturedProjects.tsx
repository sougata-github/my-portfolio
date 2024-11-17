"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { ArrowUpRight } from "lucide-react";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

import appleSS from "@/public/project/apple.png";
import jotionSS from "@/public/project/jotion.png";
import teamChatSS from "@/public/project/team-chat.png";
import devoverflowSS from "@/public/project/devoverflow.png";

import appleThumbnail from "@/public/projects-page/apple.png";
import jotionThumbnail from "@/public/projects-page/jotion.png";
import teamChatThumbnail from "@/public/projects-page/team-chat.png";
import devoverflowThumbnail from "@/public/projects-page/devoverflow.png";
import { MotionDiv } from "@/types";

export const projectsData = [
  {
    name: "DevOverFlow",
    href: "/projects/devoverflow",
    screenshot: devoverflowSS,
    background: (
      <Image
        placeholder="blur"
        priority={true}
        src={devoverflowThumbnail}
        alt="DevOverFlow thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-1",
  },
  {
    name: "Jotion",
    href: "/projects/jotion",
    screenshot: jotionSS,
    background: (
      <Image
        placeholder="blur"
        priority={true}
        src={jotionThumbnail}
        alt="Jotion thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-2",
  },

  {
    name: "iPhone 15",
    href: "/projects/iphone",
    screenshot: appleSS,
    background: (
      <Image
        placeholder="blur"
        priority={true}
        src={appleThumbnail}
        alt="iPhone thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-2",
  },
  {
    name: "Team Chat",
    href: "/projects/team-chat",
    screenshot: teamChatSS,
    background: (
      <Image
        placeholder="blur"
        priority={true}
        src={teamChatThumbnail}
        alt="Team Chat thumbnail"
        fill
        unoptimized
        quality={100}
        className="object-cover object-center"
      />
    ),
    className: "col-span-1",
  },
];

const FeaturedProjects = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Featured Projects</h1>
        <p className="secondary-text">Selection of personal projects.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/20 w-full" />

      <BentoGrid>
        {projectsData.map((project, index) => (
          <BentoCard key={index} {...project} index={index} />
        ))}
      </BentoGrid>

      <div className="sm:hidden pt-6 flex flex-col gap-12">
        {projectsData.map((item, index) => (
          <MotionDiv
            key={item.name}
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(5px)",
            }}
            whileInView={{
              opacity: 100,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.2 * index,
              duration: 1,
            }}
            viewport={{ once: true }}
          >
            <Link href={item.href} className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <h3 className="text-base text-light/80">{item.name}</h3>
                <span>
                  <ArrowUpRight className="size-4 text-light" />
                </span>
              </div>

              <Image
                src={item.screenshot}
                alt={`${item.name} thumbnail`}
                height={150}
                width={200}
                quality={100}
                unoptimized
                className="h-auto w-full outline outline-2 outline-white/10 rounded"
              />
            </Link>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
