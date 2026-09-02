import { cn } from "@/lib/utils";

/*
  Typing effect that never reflows.

  Appending characters to flowing text re-runs word wrap on every keystroke,
  so on a narrow cell the wrap point lands mid-word and the tail word jumps to
  the next line as its last characters arrive. Instead the full text is laid
  out from the first frame, every character already in its final position,
  and `count` reveals a prefix by fading characters in place.

  Opacity only, so the compositor handles it without repainting the text.
  The transition runs both ways, which means resetting count to 0 fades the
  text out instead of popping it empty.
*/
const TypedReveal = ({
  text,
  count,
  className,
}: {
  text: string;
  count: number;
  className?: string;
}) => {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={cn(
            "transition-opacity duration-150 ease-out",
            index < count ? "opacity-100" : "opacity-0"
          )}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default TypedReveal;
