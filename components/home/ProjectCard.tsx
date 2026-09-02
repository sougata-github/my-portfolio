import { ArrowUpRight } from "lucide-react";

/*
  Bento cell: title, one-line blurb, then the project's demo.

  Only the arrow links out. The demos carry live controls of their own, so
  the cell cannot be an anchor without nesting interactive content, and a
  visitor poking at a demo should not be sent to the live site for it.

  Fixed height from md, and a fixed height on the demo slot at every width,
  so the four demos read as the same size when they sit side by side no
  matter how much each one draws. The demo is pinned to the bottom of the
  cell with mt-auto, which keeps the title and blurb at the top edge.

  No borders here. The grid in Projects.tsx owns them so adjacent cells
  share a single line instead of doubling into a 2px seam.
*/
const ProjectCard = ({
  title,
  blurb,
  live,
  demo,
}: {
  title: string;
  blurb: string;
  live: string;
  demo?: React.ReactNode;
}) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-6 md:h-[540px] md:p-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl uppercase leading-[1.1] tracking-wide md:text-2xl">
          {title}
        </h3>
        {/* Padding widens the hit area, the negative margin keeps it flush. */}
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title}, open the live site`}
          className="-m-2 shrink-0 p-2 text-muted-foreground transition-colors duration-300 hover:text-foreground"
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {blurb}
      </p>

      <div className="mt-6 h-[340px] shrink-0 md:mt-auto md:h-[380px]">
        {demo}
      </div>
    </div>
  );
};

export default ProjectCard;
