import { cn } from "@/lib/utils";

/*
  Site-wide section shell.

  The horizontal rule is full bleed, spanning the viewport, while the inner
  container keeps the same max-width the content has always used and carries
  the vertical rules at its edges. That is what makes the borders read as a
  grid the page sits inside, rather than as boxes drawn around content.

  border-t only, never border-b. Adjacent sections then share a single line
  instead of stacking two into a 2px seam. The last section on a page needs
  its own bottom edge, which is what `last` is for.

  Vertical rules are dropped below md, where the container is already flush
  with the viewport and they would sit on the screen edge.
*/
const Section = ({
  id,
  className,
  innerClassName,
  last,
  children,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  last?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <section
      id={id}
      className={cn("border-t border-border", last && "border-b", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-5xl border-border px-4 md:border-x md:px-8",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
