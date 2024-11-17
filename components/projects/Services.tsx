"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { dashboardsData, landingPageData } from "@/lib/data";
import { MotionDiv, MotionP } from "@/types";

const Services = () => {
  return (
    <section className="flex flex-col" id="services">
      <div className="flex flex-col">
        <h1 className="heading-text">My Services</h1>
        <p className="secondary-text max-w-[520px]">Explore my services.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/20 w-full" />

      <MotionP
        className="secondary-text mt-5 mb-2"
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
          delay: 0.2,
          duration: 1,
        }}
        viewport={{ once: true }}
      >
        I create visually stunning and modern looking landing pages, that will
        help you land more clients for your online business.
      </MotionP>
      <div className="pt-6 flex flex-col gap-12">
        {landingPageData.map((item, index) => (
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
            <Link
              target="_blank"
              href={item.href}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-2 items-center">
                <h3 className="text-base text-light/80">{item.name}</h3>
                <span>
                  <ArrowUpRight className="size-4 text-light" />
                </span>
              </div>

              <Image
                src={item.imageUrl}
                alt={`${item.name} thumbnail`}
                height={200}
                width={200}
                quality={100}
                unoptimized
                className="w-full outline outline-2 outline-white/10 rounded"
              />
            </Link>
          </MotionDiv>
        ))}
      </div>

      <div className="mt-12">
        <MotionP
          className="secondary-text mt-5 mb-2"
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
            delay: 0.2,
            duration: 1,
          }}
          viewport={{ once: true }}
        >
          I develop intuitive, data-driven dashboards that provide actionable
          insights, helping you track performance and make informed business
          decisions.
        </MotionP>
        <div className="pt-6 flex flex-col gap-12">
          {dashboardsData.map((item, index) => (
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
              <Link
                target="_blank"
                href={item.href}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-2 items-center">
                  <h3 className="text-base text-light/80">{item.name}</h3>
                  <span>
                    <ArrowUpRight className="size-4 text-light" />
                  </span>
                </div>

                <Image
                  src={item.imageUrl}
                  alt={`${item.name} thumbnail`}
                  height={200}
                  width={200}
                  quality={100}
                  unoptimized
                  className="w-full outline outline-2 outline-white/10 rounded"
                />
              </Link>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
