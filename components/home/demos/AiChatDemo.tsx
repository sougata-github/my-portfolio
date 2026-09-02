"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChartLine,
  Check,
  ChevronUp,
  Copy,
  File as FileIcon,
  Globe,
  Image as ImageIcon,
  Lightbulb,
  Maximize2,
  PanelLeft,
  Paperclip,
  PenSquare,
  RotateCw,
  Settings2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TypedReveal from "./TypedReveal";
import { EASE, isAbort, makeTick } from "./sequence";

/*
  Scripted mock of the AI Chat app.

  Every element is a real component laid out the way the app lays it out,
  restyled on this site's tokens and fonts. The scripted part is one turn:
  a prompt types in, sends, the thinking indicator holds, the reply streams,
  the code block reveals, the message actions appear. Then it fades out and
  loops.

  The toolbar is live. The model menu, tools menu and attachment menu open
  on click and the model and tool selections stick, including across loops.
  The script never touches them, so playing with the controls does not
  interrupt the turn and the turn does not undo a choice.

  Rules, from DESIGN.md, Motion:
  - Only opacity and transform animate. Text is laid out in full before it
    reveals (TypedReveal, and the code block below) so nothing reflows.
  - Starts once in view, never on mount, and aborts cleanly on unmount.
  - Reduced motion renders the finished conversation with no loop.
*/

const TYPE_SPEED = 32;
const STREAM_SPEED = 28;
const LINE_SPEED = 110;

const MODELS = [
  "Claude Fable 5",
  "GPT-5.6 Sol",
  "Kimi K3",
  "Gemini 3.6 Flash",
] as const;
const DEFAULT_MODEL = 3;

const TOOLS = [
  { icon: Zap, name: "Get Weather" },
  { icon: Globe, name: "Search Web" },
  { icon: Lightbulb, name: "Think Longer" },
  { icon: ChartLine, name: "Market Research" },
] as const;

const ATTACHMENTS = [
  { icon: ImageIcon, name: "Add Image" },
  { icon: FileIcon, name: "Add File" },
] as const;

const PROMPT = "Binary search in TypeScript";
const INTRO = "Here is an iterative binary search in TypeScript.";
const LANGUAGE = "TypeScript";

const CODE = [
  "function binarySearch(arr: number[], target: number) {",
  "  let lo = 0, hi = arr.length - 1;",
  "  while (lo <= hi) {",
  "    const mid = (lo + hi) >> 1;",
  "    if (arr[mid] === target) return mid;",
  "    if (arr[mid] < target) lo = mid + 1;",
  "    else hi = mid - 1;",
  "  }",
  "  return -1;",
  "}",
];

/*
  Monotone highlighting. The app runs Prism with a Material theme, which is
  five or six hues. Here the only variable is tone: keywords are foreground
  at medium weight, identifiers and numbers foreground, punctuation muted.
*/
const KEYWORDS = new Set([
  "function",
  "let",
  "const",
  "while",
  "if",
  "else",
  "return",
]);

type Token = { text: string; kind: "kw" | "ident" | "punct" | "ws" };

const tokenize = (line: string): Token[] =>
  Array.from(line.matchAll(/[A-Za-z_]\w*|\d+|\s+|[^\sA-Za-z_\d]+/g)).map(
    ([text]) => ({
      text,
      kind: /^\s+$/.test(text)
        ? "ws"
        : /^[A-Za-z_]/.test(text)
          ? KEYWORDS.has(text)
            ? "kw"
            : "ident"
          : /^\d/.test(text)
            ? "ident"
            : "punct",
    })
  );

const CODE_TOKENS = CODE.map(tokenize);

const TOKEN_CLASS: Record<Token["kind"], string> = {
  kw: "font-medium text-foreground",
  ident: "text-foreground",
  punct: "text-muted-foreground",
  ws: "",
};

type Stage =
  | "idle"
  | "typing"
  | "sent"
  | "thinking"
  | "streaming"
  | "code"
  | "done";

const STAGE_ORDER: Stage[] = [
  "idle",
  "typing",
  "sent",
  "thinking",
  "streaming",
  "code",
  "done",
];

const reached = (current: Stage, target: Stage) =>
  STAGE_ORDER.indexOf(current) >= STAGE_ORDER.indexOf(target);

type MenuKind = "model" | "tools" | "attach";

const AiChatDemo = () => {
  const reduce = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.35 });

  /* Scripted state. */
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState(0);
  const [streamed, setStreamed] = useState(0);
  const [lines, setLines] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loopKey, setLoopKey] = useState(0);

  /* Live state, owned by the visitor and untouched by the script. */
  const [openMenu, setOpenMenu] = useState<MenuKind | null>(null);
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [tool, setTool] = useState<number | null>(null);

  const toggleMenu = (kind: MenuKind) =>
    setOpenMenu((current) => (current === kind ? null : kind));

  /* Click outside the toolbar or press Escape to close whichever is open. */
  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!toolbarRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  /*
    Follow the newest content, the way the app does. Runs after each stage
    commits so the scroll target is the laid-out height. Smooth scrolling is
    compositor work, so it stays free of jitter.
  */
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const frame = window.requestAnimationFrame(() => {
      scroller.scrollTo({
        top: scroller.scrollHeight,
        behavior: reduce ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [stage, reduce]);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setVisible(true);
      setStage("done");
      setTyped(0);
      setStreamed(INTRO.length);
      setLines(CODE.length);
      return;
    }

    const controller = new AbortController();
    const tick = makeTick(controller.signal);

    const run = async () => {
      setVisible(true);
      setStage("idle");
      setTyped(0);
      setStreamed(0);
      setLines(0);
      await tick(900);

      setStage("typing");
      for (let i = 1; i <= PROMPT.length; i++) {
        setTyped(i);
        await tick(TYPE_SPEED);
      }
      await tick(500);

      setStage("sent");
      setTyped(0);
      await tick(600);

      setStage("thinking");
      await tick(2000);

      setStage("streaming");
      for (let i = 1; i <= INTRO.length; i++) {
        setStreamed(i);
        await tick(STREAM_SPEED);
      }
      await tick(350);

      setStage("code");
      for (let i = 1; i <= CODE.length; i++) {
        setLines(i);
        await tick(LINE_SPEED);
      }
      await tick(400);

      setStage("done");
      await tick(3200);

      setVisible(false);
      await tick(600);
      setLoopKey((k) => k + 1);
    };

    run().catch((error) => {
      if (!isAbort(error)) throw error;
    });

    return () => controller.abort();
  }, [inView, reduce, loopKey]);

  const canSend = typed > 0;
  const userMounted = reached(stage, "sent");
  const thinking = stage === "thinking";
  /*
    The assistant turn mounts at "thinking", not at "streaming". The dot and
    the first line of the reply share one line box, so the swap from one to
    the other changes nothing about the thread's height. Mounting the reply
    later, as the app does, is what produced the jump.
  */
  const assistantMounted = reached(stage, "thinking");
  const codeMounted = reached(stage, "code");
  const actionsVisible = reached(stage, "done");

  const activeTool = tool === null ? null : TOOLS[tool];

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-border bg-background"
    >
      {/* Header, like the app's ChatHeader. */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2 text-muted-foreground">
        <PanelLeft className="size-3.5" aria-hidden />
        <span className="text-[12px] leading-none">New chat</span>
      </div>

      {/* Messages */}
      <motion.div
        key={`thread-${loopKey}`}
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-3 pb-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-28px),transparent)]"
      >
        {userMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group/msg flex flex-col items-end gap-1.5"
          >
            <div className="max-w-[85%] rounded-md bg-muted px-3 py-2 text-[13px] font-medium leading-relaxed">
              {PROMPT}
            </div>
            <MessageActions
              visible={actionsVisible}
              icons={[PenSquare, RotateCw, Copy]}
              className="pr-1"
            />
          </motion.div>
        )}

        {assistantMounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="group/msg flex flex-col gap-1.5 pl-1"
          >
            {/*
              The reply's first line is always laid out, invisible until it
              streams. The thinking dot is absolutely positioned over that
              same line, so the two never stack and the slot never resizes.
            */}
            <div className="relative text-[13px] leading-relaxed">
              <AnimatePresence>
                {thinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute inset-y-0 left-0 flex items-center"
                  >
                    {/* The app's Thinking component: one pulsing dot. */}
                    <div
                      className="size-2.5 rounded-full bg-foreground animate-[pulse-dot_1.5s_ease-in-out_infinite]"
                      aria-hidden
                    />
                    <span className="sr-only">Thinking</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <p>
                <TypedReveal text={INTRO} count={streamed} />
              </p>
            </div>

            {codeMounted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-1"
              >
                <CodeBlock lines={lines} />
              </motion.div>
            )}

            <MessageActions visible={actionsVisible} icons={[Copy]} />
          </motion.div>
        )}
      </motion.div>

      {/* Input, like the app's ChatInput: textarea, then the toolbar. */}
      <div className="shrink-0 px-3 pb-3">
        <div className="relative rounded-lg border border-border">
          <div className="relative min-h-[46px] px-3 pt-2.5 pb-1 text-[13px] leading-relaxed">
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-x-3 top-2.5 text-muted-foreground transition-opacity duration-150",
                canSend ? "opacity-0" : "opacity-100"
              )}
            >
              Type your message here...
            </span>
            <TypedReveal text={PROMPT} count={typed} />
          </div>

          <div
            ref={toolbarRef}
            className="flex items-center justify-between px-2.5 pb-2"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => toggleMenu("model")}
                  aria-haspopup="menu"
                  aria-expanded={openMenu === "model"}
                  className="flex items-center gap-1 text-[12px] font-medium leading-none transition-colors duration-300 hover:text-muted-foreground"
                >
                  {MODELS[model]}
                  <ChevronUp
                    className={cn(
                      "size-3.5 transition-transform duration-300",
                      openMenu === "model" && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                <Menu open={openMenu === "model"} label="Model">
                  {MODELS.map((name, i) => (
                    <MenuItem
                      key={name}
                      onSelect={() => {
                        setModel(i);
                        setOpenMenu(null);
                      }}
                      trailing={
                        i === model ? (
                          <Check className="size-3" aria-hidden />
                        ) : null
                      }
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              <div className="relative">
                <IconButton
                  label="Tools"
                  active={openMenu === "tools"}
                  onClick={() => toggleMenu("tools")}
                >
                  <Settings2 className="size-3.5" aria-hidden />
                </IconButton>
                <Menu open={openMenu === "tools"} label="Tools">
                  {TOOLS.map((item, i) => (
                    <MenuItem
                      key={item.name}
                      onSelect={() => {
                        setTool(i);
                        setOpenMenu(null);
                      }}
                      trailing={
                        i === tool ? (
                          <Check className="size-3" aria-hidden />
                        ) : null
                      }
                    >
                      <item.icon className="size-3.5" aria-hidden />
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              {/* Selected tool chip, cleared with its X, like the app. */}
              <AnimatePresence>
                {activeTool && (
                  <motion.button
                    key={activeTool.name}
                    type="button"
                    onClick={() => setTool(null)}
                    aria-label={`Remove ${activeTool.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    <activeTool.icon className="size-3" aria-hidden />
                    <X className="size-3" aria-hidden />
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="relative">
                <IconButton
                  label="Attach"
                  active={openMenu === "attach"}
                  onClick={() => toggleMenu("attach")}
                >
                  <Paperclip className="size-3.5" aria-hidden />
                </IconButton>
                {/* Narrower so it clears the cell's right edge on a phone. */}
                <Menu open={openMenu === "attach"} label="Attach" className="w-32">
                  {ATTACHMENTS.map((item) => (
                    <MenuItem key={item.name} onSelect={() => setOpenMenu(null)}>
                      <item.icon className="size-3.5" aria-hidden />
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <div
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-background transition-colors duration-300",
                canSend ? "bg-foreground" : "bg-muted-foreground/40"
              )}
              aria-hidden
            >
              <ArrowUp className="size-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
  Message action row. The app shows these on hover only. Here they also turn
  on at the end of the sequence so touch devices, where nothing hovers, still
  see them.
*/
const MessageActions = ({
  visible,
  icons,
  className,
}: {
  visible: boolean;
  icons: readonly React.ElementType[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 text-muted-foreground transition-opacity duration-300 group-hover/msg:opacity-100",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-hidden
    >
      {icons.map((Icon, i) => (
        <Icon key={i} className="size-3" />
      ))}
    </div>
  );
};

const IconButton = ({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup="menu"
      aria-expanded={active}
      className={cn(
        "flex items-center transition-colors duration-300 hover:text-foreground",
        active ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {children}
    </button>
  );
};

/* Dropdown that opens upward from the toolbar, like the app's menus. */
const Menu = ({
  open,
  label,
  className,
  children,
}: {
  open: boolean;
  label: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="menu"
          aria-label={label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2, ease: EASE }}
          className={cn(
            "absolute bottom-full left-0 z-10 mb-2 w-44 rounded-md border border-border bg-popover p-1",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MenuItem = ({
  onSelect,
  trailing,
  children,
}: {
  onSelect: () => void;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-[12px] leading-none transition-colors duration-200 hover:bg-muted"
    >
      {children}
      {trailing && <span className="ml-auto">{trailing}</span>}
    </button>
  );
};

/*
  The app's CodeBlock, on this site's tokens: language label and actions in
  a header, line numbers, then the code.

  Every line is laid out from the start and `lines` fades them in from the
  top, so the block's height is fixed from the moment it mounts and the
  thread never grows mid-reveal.
*/
const CodeBlock = ({ lines }: { lines: number }) => {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-1.5 text-muted-foreground">
        <span className="font-mono text-[11px] font-medium leading-none">
          {LANGUAGE}
        </span>
        <div className="flex items-center gap-2.5" aria-hidden>
          <Maximize2 className="size-3" />
          <Copy className="size-3" />
        </div>
      </div>
      <pre className="overflow-x-auto bg-muted/20 px-3 py-2 font-mono text-[11px] leading-[1.7]">
        <code>
          {CODE_TOKENS.map((tokens, i) => (
            <span
              key={i}
              className={cn(
                "flex whitespace-pre transition-opacity duration-200 ease-out",
                i < lines ? "opacity-100" : "opacity-0"
              )}
            >
              <span className="w-5 shrink-0 select-none text-muted-foreground">
                {i + 1}
              </span>
              {tokens.map((token, j) => (
                <span key={j} className={TOKEN_CLASS[token.kind]}>
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default AiChatDemo;
