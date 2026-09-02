"use client";

import { useState } from "react";
import {
  Check,
  ChevronRight,
  ChevronsLeft,
  ChevronsUpDown,
  CirclePlus,
  Ellipsis,
  File,
  Folder,
  Plus,
  Search,
  Settings,
  Trash2,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Static mock of Jotion, the Notion-style editor.

  Nothing is scripted. The only interaction is the sidebar tree, where every
  row with children expands and collapses on click, the way the real
  sidebar does. Children mount instantly and fade in, the chevron rotates.
  Height is never animated, which keeps the tree on the compositor and the
  rest of the cell still.

  Pages with children take a folder icon, leaf pages a file icon, so the
  structure reads without opening anything.
*/

type Page = {
  id: string;
  name: string;
  children?: Page[];
};

const TREE: Page[] = [
  {
    id: "engineering",
    name: "Engineering",
    children: [
      {
        id: "portfolio",
        name: "Portfolio v2",
        children: [
          { id: "weekly", name: "Weekly planning" },
          { id: "design-system", name: "Design system" },
        ],
      },
      { id: "ai-chat", name: "AI Chat" },
    ],
  },
  {
    id: "writing",
    name: "Writing",
    children: [
      { id: "ts-patterns", name: "TypeScript patterns" },
      { id: "drafts", name: "Drafts", children: [] },
    ],
  },
  { id: "reading", name: "Reading list" },
];

const ACTIVE_PAGE = "weekly";
const OPEN_BY_DEFAULT = new Set(["engineering", "portfolio"]);

const TODOS = [
  { text: "Ship the projects bento", done: true },
  { text: "Write DESIGN.md", done: true },
  { text: "Rebuild the posts section", done: false },
  { text: "Contact form, end to end", done: false },
];

const JotionDemo = () => {
  const [open, setOpen] = useState<Set<string>>(OPEN_BY_DEFAULT);

  const toggle = (id: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="flex h-full w-full overflow-hidden rounded-lg border border-border bg-background text-[11px] text-muted-foreground">
      {/* Sidebar */}
      <aside className="scrollbar-hidden flex w-[120px] shrink-0 flex-col overflow-y-auto border-r border-border bg-muted/30 py-2 md:w-[150px]">
        <div className="flex items-center gap-1.5 px-2 pb-2">
          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-muted-foreground text-background">
            <UserRound className="size-2.5" aria-hidden />
          </span>
          <span className="truncate font-medium">Sougata&apos;s Jotion</span>
          <ChevronsUpDown
            className="size-3 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <ChevronsLeft
            className="ml-auto size-3 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </div>

        <SidebarAction icon={Search} label="Search" />
        <SidebarAction icon={Settings} label="Settings" />
        <SidebarAction icon={CirclePlus} label="New page" />

        <div className="mt-2 flex flex-col">
          {TREE.map((page) => (
            <TreeRow
              key={page.id}
              page={page}
              depth={0}
              open={open}
              onToggle={toggle}
            />
          ))}
          <SidebarAction icon={Plus} label="Add a page" />
        </div>

        <div className="mt-2">
          <SidebarAction icon={Trash2} label="Trash" />
        </div>
      </aside>

      {/* Note */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2">
          <span className="truncate text-[12px] font-medium leading-none">
            Weekly planning
          </span>
          <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
            <span className="text-[12px] leading-none">Publish</span>
            <Ellipsis className="size-3.5" aria-hidden />
          </div>
        </div>

        <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto">
          {/* Cover, a muted band like a cover image slot with nothing in it. */}
          <div className="h-14 shrink-0 bg-muted md:h-16" />

          <div className="px-4 pt-4 pb-6 text-[12px] leading-relaxed md:px-6">
            <h4 className="text-base font-medium leading-tight md:text-lg">
              Weekly planning
            </h4>
            <p className="mt-2 text-muted-foreground">
              Goals for the week, kept short so they actually happen.
            </p>

            <p className="mt-4 font-medium">To do</p>
            <ul className="mt-1.5 flex flex-col gap-1.5">
              {TODOS.map((todo) => (
                <li key={todo.text} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-3 shrink-0 items-center justify-center rounded-[3px] border",
                      todo.done
                        ? "border-muted-foreground bg-muted-foreground text-background"
                        : "border-muted-foreground"
                    )}
                    aria-hidden
                  >
                    {todo.done && <Check className="size-2.5" strokeWidth={3} />}
                  </span>
                  <span
                    className={cn(
                      todo.done && "text-muted-foreground line-through"
                    )}
                  >
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 font-medium">Notes</p>
            <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 marker:text-muted-foreground">
              <li>Keep the demos on opacity and transform only.</li>
              <li>Borders never overlap, check mobile every time.</li>
              <li>One typeface per role, no tight tracking.</li>
            </ul>

            <blockquote className="mt-4 border-l-2 border-border pl-3 text-muted-foreground">
              Ship the small thing, then the next small thing.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarAction = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 text-muted-foreground">
      <Icon className="size-3 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
    </div>
  );
};

/*
  One page row and, when open, its children beneath it.

  The whole row is the toggle. Indentation grows with depth so nesting reads
  at a glance. A folder with nothing in it shows the app's "No pages inside"
  line when opened.
*/
const TreeRow = ({
  page,
  depth,
  open,
  onToggle,
}: {
  page: Page;
  depth: number;
  open: Set<string>;
  onToggle: (id: string) => void;
}) => {
  const isFolder = page.children !== undefined;
  const isOpen = open.has(page.id);
  const isActive = page.id === ACTIVE_PAGE;
  const Icon = isFolder ? Folder : File;
  const indent = { paddingLeft: `${8 + depth * 10}px` };

  const rowClass = cn(
    "flex w-full items-center gap-1 py-1 pr-2 text-left transition-colors duration-200",
    isActive ? "bg-muted font-medium" : "hover:bg-muted/60",
  );

  const content = (
    <>
      <ChevronRight
        className={cn(
          "size-3 shrink-0 transition-transform duration-200",
          isOpen && "rotate-90",
          !isFolder && "invisible"
        )}
        aria-hidden
      />
      <Icon className="size-3 shrink-0" aria-hidden />
      <span className="truncate">{page.name}</span>
    </>
  );

  return (
    <>
      {isFolder ? (
        <button
          type="button"
          onClick={() => onToggle(page.id)}
          aria-expanded={isOpen}
          className={rowClass}
          style={indent}
        >
          {content}
        </button>
      ) : (
        <div className={rowClass} style={indent} aria-current={isActive ? "page" : undefined}>
          {content}
        </div>
      )}

      {isFolder && isOpen && (
        <div className="animate-in fade-in duration-200">
          {page.children!.length === 0 ? (
            <div
              className="py-1 pr-2 text-muted-foreground"
              style={{ paddingLeft: `${8 + (depth + 1) * 10 + 16}px` }}
            >
              No pages inside
            </div>
          ) : (
            page.children!.map((child) => (
              <TreeRow
                key={child.id}
                page={child}
                depth={depth + 1}
                open={open}
                onToggle={onToggle}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default JotionDemo;
