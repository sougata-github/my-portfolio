"use client";

/*
  Bento cell, deliberately empty.

  This is where the line-drawn micro component for each project will live,
  built from strokes on the text tokens so it follows the theme like
  everything else. Title, blurb and stack are intentionally absent until
  then, since their placement can only be judged against the illustration.

  h-full so the cell fills its grid row rather than shrinking to content,
  which is what keeps the dividers running the full height of the row.

  No borders here. The grid in Projects.tsx owns them so adjacent cells
  share a single line instead of doubling into a 2px seam.
*/
const ProjectCard = ({ live }: { live: string }) => {
  return (
    <a
      href={live}
      target="_blank"
      rel="noreferrer"
      className="group block h-full min-h-[240px] w-full md:min-h-[320px]"
    />
  );
};

export default ProjectCard;
