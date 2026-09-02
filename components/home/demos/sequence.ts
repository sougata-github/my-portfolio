/*
  Shared plumbing for the project demos.

  Every demo is a scripted sequence: an async function that steps through
  stages with awaited pauses, started once the cell scrolls into view and
  cancelled through an AbortController when it unmounts or restarts. This
  keeps the timeline in one readable place instead of nested timeouts.
*/

/* Same curve as the rest of the site, see DESIGN.md, Motion. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/*
  Pause, then bail out if the sequence was aborted while waiting. Throwing
  lets the run function read top to bottom without a stop check after every
  await. The caller swallows the AbortError.
*/
export const makeTick =
  (signal: AbortSignal) =>
  async (ms: number): Promise<void> => {
    await wait(ms);
    if (signal.aborted) {
      throw new DOMException("Sequence aborted", "AbortError");
    }
  };

export const isAbort = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";
