"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Props {
  index: number;
  title: string;
  stack: string[];
  live: string;
  /* Per-project ramps and composition live in constants, not here. */
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

/*
  No scroll parallax by design. With four cards in two rows there is not
  enough scroll distance for drift to read as depth, and each card wraps a
  WebGL canvas, so translating it every frame is real GPU work for an effect
  that is not visible. The interlocking look comes from the static column
  offset in Projects.tsx, which costs nothing.
*/
const ProjectCard = ({ index, title, stack, live, shader }: Props) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = resolvedTheme === "light" ? shader.light : shader.dark;

  return (
    <a
      href={live}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      {/* No border. The shader is full bleed, so its own edge is the edge. */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {/*
          Rendered only after mount. The shader needs the resolved theme to
          pick its ramp, and WebGL cannot run during SSR anyway. The wrapper
          holds the box so there is no layout shift when it appears.
        */}
        {mounted ? (
          <MeshGradient
            width="100%"
            height="100%"
            colors={colors}
            distortion={shader.distortion}
            swirl={shader.swirl}
            scale={shader.scale}
            rotation={shader.rotation}
            offsetX={shader.offsetX}
            offsetY={shader.offsetY}
            grainMixer={0}
            /*
              Grain does two jobs here. It kills the banding monochrome ramps
              are prone to, and it gives the card a surface texture that
              separates it from the flat page behind it in both themes.
            */
            grainOverlay={0.24}
            speed={0}
            frame={shader.frame}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex items-start justify-between gap-4">
          <span className="label">
            Project /{String(index + 1).padStart(2, "0")}
          </span>
          <span className="label text-right">
            {stack.slice(0, 3).join(" · ")}
          </span>
        </div>

        <div className="mt-2 flex items-end justify-between gap-4">
          <h3 className="font-display uppercase tracking-wide text-xl font-normal leading-[1.1] md:text-2xl">
            {title}
          </h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
