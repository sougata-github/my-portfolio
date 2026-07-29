"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { footerLinks } from "@/constants";
import CopyButton from "../CopyButton";

/*
  The entrance is pure CSS (see .hero-line / .hero-fade / .hero-rule in
  globals.css) so it paints before hydration. Framer is used only for the
  scroll parallax below, which genuinely needs JS.
*/

const Hero = () => {
  const reduce = useReducedMotion() ?? false;

  /*
    Parallax measured against the hero's own scroll range, not the page, so
    it behaves the same whether the section is full height on landscape or
    content height on portrait.

    The scroll-driven fade is safe now that scroll restoration is forced to
    manual in the root layout. Before that, a refresh from further down the
    page mounted the hero already faded to zero.
  */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const nameY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const bioY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const nameStyle = reduce ? undefined : { y: nameY, opacity: fade };
  const bioStyle = reduce ? undefined : { y: bioY, opacity: fade };

  return (
    <div
      ref={heroRef}
      /* No bottom padding: the strip below is flush with the section edge. */
      className="flex flex-col justify-between pt-6 wide:min-h-[88svh]"
    >
      {/* Top rail: location left, resume pinned right */}
      <div className="flex items-center justify-between gap-x-4">
        <span
          className="label hero-fade block"
          style={{ animationDelay: "0.5s" }}
        >
          Based in India
        </span>

        <a
          href="/resume.pdf"
          download
          className="label hero-fade underline decoration-1 underline-offset-4 transition-colors duration-300 hover:text-foreground"
          style={{ animationDelay: "0.58s" }}
        >
          Resume
        </a>
      </div>

      {/* Name and title, left aligned with the title stepped in */}
      {/*
        On portrait there is no min-height, so these paddings are the only
        thing giving the hero its height. They are deliberately larger than
        the desktop values, where spare height gets distributed instead.
      */}
      <div className="py-24 sm:py-28 md:py-20">
        {/*
          Parallax lives on a wrapper rather than the h1 itself. The entrance
          animation already drives transform on the inner spans, and stacking
          a scroll transform onto the same element would fight it.
        */}
        <motion.div style={nameStyle} className="transform-gpu">
          {/*
            Scalzo alignment: line two is set close to line one's size and
            stepped in from the left, so its extra characters push it past
            line one's right edge. The overhang is the whole effect, so the
            two sizes have to stay close. Widening the gap kills it.
          */}
          <h1 className="font-display uppercase">
            {/*
              pb/-mb pair keeps the reveal mask below the baseline so tight
              leading never clips a glyph, without adding layout height.
            */}
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span
                className="hero-line block font-light leading-[0.94] tracking-wide text-[clamp(2rem,8.2vw,6.25rem)]"
                style={{ animationDelay: "0.25s" }}
              >
                Sougata Das
              </span>
            </span>

            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pl-[6%] md:pl-[8%]">
              <span
                className="hero-line block font-medium leading-[0.94] tracking-wide text-[clamp(1.6rem,7vw,5.25rem)]"
                style={{ animationDelay: "0.35s" }}
              >
                React Developer
              </span>
            </span>
          </h1>
        </motion.div>

        <motion.div style={bioStyle} className="transform-gpu">
          <p
            className="hero-fade mt-20 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-24 md:ml-auto md:text-base"
            style={{ animationDelay: "0.5s" }}
          >
            I build modern, performant web applications with React and
            TypeScript, from design system to deployment.
          </p>
        </motion.div>
      </div>

      {/*
        Actions strip.

        Negative margins cancel the container's horizontal padding so the
        rule runs the full width of the content column and meets the vertical
        border-x on both sides, reading as a band rather than a line floating
        inside the section.

        Every action is a cell with its own divider and stretched to equal
        height, so the strip reads as part of the same border grid as the
        page. On mobile copy mail goes full width to act as the CTA and the
        three links sit side by side beneath it.
      */}
      <div
        className="hero-fade -mx-4 border-t border-border md:-mx-8"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex flex-col md:flex-row md:items-stretch md:justify-between">
          <div className="border-b border-border md:border-b-0 md:border-r">
            <CopyButton />
          </div>

          <div className="grid grid-cols-3 md:flex">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                /*
                  Dividers between links on mobile, but every link gets one
                  from md up. Desktop pushes the group to the right edge, so
                  without a leading border the first link floats away from
                  the copy mail cell instead of closing the strip.
                */
                className="label flex items-center justify-center border-border px-4 py-5 transition-colors duration-300 not-first:border-l hover:text-foreground md:border-l md:px-7"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
