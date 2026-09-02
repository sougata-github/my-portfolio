"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  CirclePlus,
  Code,
  Gamepad2,
  Hash,
  Lock,
  Mic,
  Moon,
  Palette,
  Paperclip,
  Plus,
  Search,
  Settings,
  Smile,
  Sun,
  Trash2,
  UserPlus,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "./sequence";

/*
  Live mock of Team Chat, the Discord-style app.

  Three columns like the app: the server rail, the channel sidebar, and the
  channel itself. Nothing is scripted. Three things work for real:

  - The theme button at the foot of the rail switches the whole site, the
    same way the nav toggle and Ctrl/Cmd + D do.
  - The server name opens the server menu.
  - The composer sends. Messages land in local state as John Doe, the
    channel scrolls to the newest one, and the composer locks after five
    so a visitor cannot fill the cell.

  Message mounts are opacity fades. Scrolling is compositor work. Nothing
  else moves.
*/

const SERVERS = [
  { icon: Code, name: "Engineering" },
  { icon: Palette, name: "Design" },
  { icon: Gamepad2, name: "Games" },
  { icon: BookOpen, name: "Reading" },
] as const;

const SERVER_MENU = [
  { icon: UserPlus, name: "Invite People" },
  { icon: Settings, name: "Server Settings" },
  { icon: Users, name: "Manage Members" },
  { icon: CirclePlus, name: "Create Channel" },
] as const;

const MEMBERS = [
  "Priya Nair",
  "Tom Becker",
  "Maya Chen",
  "Luis Ortega",
  "Sara Kim",
];

type Message = { id: number; author: string; time: string; text: string };

const SEED: Message[] = [
  {
    id: 1,
    author: "Priya Nair",
    time: "2 Sep 2026, 09:12",
    text: "Deploy went out, watching the logs.",
  },
  {
    id: 2,
    author: "Tom Becker",
    time: "2 Sep 2026, 09:14",
    text: "Nice. The new hero animation is smooth on my phone.",
  },
  {
    id: 3,
    author: "Maya Chen",
    time: "2 Sep 2026, 09:20",
    text: "Design review at 3, bring the bento.",
  },
  {
    id: 4,
    author: "Luis Ortega",
    time: "2 Sep 2026, 09:31",
    text: "Standup moved to the audio channel, join when you can.",
  },
  {
    id: 5,
    author: "Sara Kim",
    time: "2 Sep 2026, 09:40",
    text: "PR for the posts section is up.",
  },
];

const AUTHOR = "John Doe";
const MAX_SENT = 5;

/*
  Hand-rolled rather than Intl. en-GB abbreviates September as "Sept",
  which does not match the three-letter months the seed messages use.
*/
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const formatNow = () => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

const TeamChatDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(SEED);
  const [draft, setDraft] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sent = messages.length - SEED.length;
  const locked = sent >= MAX_SENT;

  /* Click outside the server header or press Escape to close the menu. */
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  /* Follow the newest message, like the app. */
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const frame = window.requestAnimationFrame(() => {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text || locked) return;
    setMessages((current) => [
      ...current,
      { id: Date.now(), author: AUTHOR, time: formatNow(), text },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-full w-full overflow-hidden rounded-lg border border-border bg-background text-[11px] text-muted-foreground">
      {/* Server rail */}
      <div className="flex w-9 shrink-0 flex-col items-center gap-2 border-r border-border bg-muted/30 py-2 md:w-10">
        <span
          className="flex size-6 items-center justify-center rounded-full border border-border"
          aria-hidden
        >
          <Plus className="size-3" />
        </span>
        <span className="my-0.5 h-px w-4 bg-border" aria-hidden />
        {SERVERS.map((server, i) => (
          <span
            key={server.name}
            title={server.name}
            className={cn(
              "flex size-6 items-center justify-center rounded-full bg-muted",
              i === 0 && "text-foreground"
            )}
            aria-hidden
          >
            <server.icon className="size-3" />
          </span>
        ))}

        <div className="mt-auto flex flex-col items-center gap-2">
          <ThemeButton />
          <Avatar />
        </div>
      </div>

      {/* Channel sidebar */}
      <aside className="scrollbar-hidden flex w-[104px] shrink-0 flex-col overflow-y-auto border-r border-border bg-muted/15 md:w-[132px]">
        <div ref={menuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex w-full items-center justify-between gap-1 border-b border-border px-2.5 py-2 text-[12px] font-medium text-foreground transition-colors duration-300 hover:bg-muted/60"
          >
            <span className="truncate">Engineering</span>
            <ChevronDown
              className={cn(
                "size-3 shrink-0 transition-transform duration-300",
                menuOpen && "rotate-180"
              )}
              aria-hidden
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                role="menu"
                aria-label="Server"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute inset-x-1.5 top-full z-10 mt-1 rounded-md border border-border bg-popover p-1"
              >
                {SERVER_MENU.map((item, i) => (
                  <MenuRow
                    key={item.name}
                    icon={item.icon}
                    label={item.name}
                    emphasis={i === 0}
                    onSelect={() => setMenuOpen(false)}
                  />
                ))}
                <div className="my-1 border-t border-border" />
                <MenuRow
                  icon={Trash2}
                  label="Delete Server"
                  onSelect={() => setMenuOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-2">
          <Search className="size-3 shrink-0" aria-hidden />
          <span>Search</span>
        </div>

        <div className="flex flex-col gap-3 px-1.5 py-2">
          <Group label="Text channels">
            <ChannelRow icon={Hash} name="general" active trailing={Lock} />
            <ChannelRow icon={Hash} name="design" />
          </Group>
          <Group label="Audio channels">
            <ChannelRow icon={Mic} name="standup" />
          </Group>
          <Group label="Video channels">
            <ChannelRow icon={Video} name="demo day" />
          </Group>
          <Group label="Members" trailing={Settings}>
            {MEMBERS.map((name) => (
              <div key={name} className="flex items-center gap-1.5 px-1 py-1">
                <Avatar />
                <span className="truncate">{name}</span>
              </div>
            ))}
          </Group>
        </div>
      </aside>

      {/* Channel */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center gap-1 border-b border-border px-3 py-2 text-[12px] font-medium text-foreground">
          <Hash className="size-3.5 text-muted-foreground" aria-hidden />
          general
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hidden flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-3 pb-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-28px),transparent)]"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-start gap-2"
            >
              <Avatar className="mt-0.5 size-5" iconClassName="size-3" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-1.5">
                  <span className="font-medium text-foreground">
                    {message.author}
                  </span>
                  <span className="text-[10px]">{message.time}</span>
                </div>
                <p className="break-words leading-relaxed">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="shrink-0 px-3 pb-3">
          <label className="flex items-center gap-2 rounded-md bg-muted px-2.5 py-2">
            <Paperclip className="size-3.5 shrink-0" aria-hidden />
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              rows={1}
              disabled={locked}
              placeholder={
                locked ? "Demo limit reached, 5 messages" : "Message #general"
              }
              aria-label="Message #general"
              className="min-w-0 flex-1 resize-none bg-transparent leading-relaxed text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            />
            <Smile className="size-3.5 shrink-0" aria-hidden />
          </label>
        </div>
      </div>
    </div>
  );
};

/*
  Site-wide theme switch, in the corner the app keeps its own. Same mounted
  gate as the nav toggle: next-themes cannot resolve during SSR, so this
  renders a same-size placeholder until hydration.
*/
const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="block size-3.5" aria-hidden />;

  const dark = resolvedTheme === "dark";
  const Icon = dark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      title="Toggles the whole site"
      className="flex items-center transition-colors duration-300 hover:text-foreground"
    >
      <Icon className="size-3.5" aria-hidden />
    </button>
  );
};

/* Every person is the same mark. Names do the identifying. */
const Avatar = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full bg-muted-foreground text-background",
        className
      )}
      aria-hidden
    >
      <UserRound className={cn("size-2.5", iconClassName)} />
    </span>
  );
};

const MenuRow = ({
  icon: Icon,
  label,
  emphasis,
  onSelect,
}: {
  icon: React.ElementType;
  label: string;
  emphasis?: boolean;
  onSelect: () => void;
}) => {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left leading-none transition-colors duration-200 hover:bg-muted",
        emphasis && "font-medium text-foreground"
      )}
    >
      <span className="truncate">{label}</span>
      <Icon className="size-3 shrink-0" aria-hidden />
    </button>
  );
};

const Group = ({
  label,
  trailing: Trailing = Plus,
  children,
}: {
  label: string;
  trailing?: React.ElementType;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-1 px-1 pb-1 text-[8px] font-medium uppercase tracking-[0.04em]">
        <span className="truncate whitespace-nowrap">{label}</span>
        <Trailing className="size-3" aria-hidden />
      </div>
      {children}
    </div>
  );
};

const ChannelRow = ({
  icon: Icon,
  name,
  active,
  trailing: Trailing,
}: {
  icon: React.ElementType;
  name: string;
  active?: boolean;
  trailing?: React.ElementType;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-sm px-1 py-1",
        active && "bg-muted font-medium text-foreground"
      )}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="size-3 shrink-0" aria-hidden />
      <span className="truncate">{name}</span>
      {Trailing && <Trailing className="ml-auto size-3 shrink-0" aria-hidden />}
    </div>
  );
};

export default TeamChatDemo;
