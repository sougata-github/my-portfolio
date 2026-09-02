# DESIGN.md

The design system for the v2 portfolio, written from the code on `revamp/v2` as of 2026-09-02. Scope is the whole site: the home page from the nav to the footer, the blog index and post pages, the 404 and the error pages. What is left to sweep is listed under Parked at the end.

Read this before touching any visual code. The rules here are not taste, most of them were arrived at by getting it wrong first. The session log in `docs/sessions/2026-07-29.md` has the history.

---

## 1. Old vs new

| | v1 (`main`) | v2 (`revamp/v2`) |
|---|---|---|
| Column | `max-w-3xl`, `px-4`, `pt-10` on the whole shell | `max-w-5xl`, `px-4 md:px-8`, no shell padding |
| Structure | One padded box, sections stacked with `mt-10 md:mt-12` | Full-bleed sections sharing hairlines, content column marked by vertical rules |
| Palette | shadcn neutral, chroma 0, pure white and near-black | Warm neutral, chroma capped at 0.006, stone light and graphite dark |
| Display type | Inter, `font-bold tracking-tight`, 4xl to 5xl | Space Grotesk, `font-light` and `font-medium`, `tracking-wide`, uppercase, fluid clamp up to 6.25rem |
| Body type | Geist Sans and Inter mixed | Geist Sans only |
| Labels | `text-foreground/60 text-sm`, capitalize and lowercase spans | One `.label` device: Geist Mono 10px to 11px, uppercase, `tracking-[0.18em]`, muted |
| Nav | `home`, `blogs`, base size sans | `sougata`, `work`, `posts`, mono lowercase, muted, one size |
| Section titles | `h1` in `font-bold uppercase` sans, blur-in on mount | `SectionHeader` with a `.label` and a full-width rule beneath |
| Hero | Name with a mask reveal, one-line bio, resume link with chevron animation, ghost copy button | Rail, two-line Scalzo headline, offset bio, actions strip of bordered cells, parallax on scroll |
| Experience | Two columns pushed to the edges | Twelve-column grid, company 5 / role 4 / date 3, centred rows with hairlines |
| Projects | Rounded cards with theme-swapped PNG icons, modal with thumbnail and stack chips | Empty 2x2 bento cells sharing hairlines, awaiting line-drawn illustrations |
| Buttons | shadcn `Button` variants | No buttons. Plain `<a>` and `<button>` styled by `.label` |
| Radius | `rounded-2xl` on cards, `rounded` on chips | None visible. `--radius` still exists for shadcn primitives but nothing on the page is rounded |
| Entrance | Framer on every section, all firing on mount | CSS keyframes for the hero, Framer `whileInView` once for lists, nothing on the skills band |
| Motion props | opacity, y, scale, blur | Hero: opacity and transform only. Lists: still carry blur, see Motion debt |
| Theme | Toggle button only | Toggle button plus Ctrl/Cmd + D |
| 404 | Boxed inside the site chrome | Its own full-bleed shell in the same border language |

The one-line version: v1 was a padded card with content in it. v2 is a grid that the content sits inside.

---

## 2. Principles

1. **Everything is type.** The hero, the skills band, the experience rows and the section headers are all text. Nothing pictorial goes on the page unless it is drawn with the same strokes and tokens as the text. This is the test that killed shaders, AI abstracts and glass icons in Projects: they all read as imported from another site.
2. **One hue family.** Chroma never exceeds 0.006 in the chrome. Colour, if it appears at all, appears inside the work being shown, never in the frame around it.
3. **Lines, not boxes.** Structure is drawn with 1px hairlines that run edge to edge. Nothing has a border on all four sides, nothing is rounded, nothing has a shadow or a filled background.
4. **Two tones of text.** `foreground` and `muted-foreground`. Hover moves an element one step along that scale. There is no third colour.
5. **Only composite.** Anything that animates does so with `opacity` and `transform` only. Nothing that paints per frame gets animated.
6. **Paint before hydrate.** First-paint animations are CSS. Framer is for things that genuinely need scroll position or viewport intersection.

---

## 3. Tokens

All tokens live in `app/globals.css`. Tailwind v4 reads them through `@theme inline`, so `bg-background`, `text-muted-foreground`, `border-border`, `font-display` and so on are the only way to reference them in markup. Never write an oklch value in a component.

### 3.1 Colour

Light is stone, dark is graphite. Both lean warm (hue 75 to 85) with chroma held between 0.002 and 0.008, which is what keeps light and dark feeling like the same site.

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--background` | `oklch(0.968 0.004 85)` | `oklch(0.178 0.004 80)` | Page |
| `--foreground` | `oklch(0.205 0.006 75)` | `oklch(0.93 0.003 85)` | Primary text, display type, active state of any hover |
| `--muted-foreground` | `oklch(0.52 0.008 75)` | `oklch(0.665 0.006 82)` | Labels, nav, bio, rest state of any hover, illustration strokes |
| `--border` | `oklch(0.878 0.005 85)` | `oklch(0.995 0.002 85 / 11%)` | Every hairline |
| `--card` / `--popover` | `oklch(0.982 0.003 85)` | `oklch(0.213 0.004 80)` | Dialog and drawer surfaces only |
| `--muted` / `--secondary` | `oklch(0.93 0.004 85)` | `oklch(0.262 0.004 80)` | Nothing on the home page yet |
| `--accent` | `oklch(0.91 0.005 85)` | `oklch(0.288 0.004 80)` | Nothing on the home page yet |
| `--ring` | `oklch(0.62 0.007 75)` | `oklch(0.55 0.006 82)` | Focus rings via the base `outline-ring/50` |

Contrast of muted text on the background is roughly 4.9:1 in light and 7:1 in dark. Both clear AA for body text, and the 10px labels are always uppercase and tracked, which is what keeps them legible at that size.

`--destructive` and the five `--chart-*` tokens are shadcn defaults and are the only chromatic values in the file. They are not used and should not be reached for.

Dark borders are white at 11% alpha rather than a solid grey, so they read consistently over `background`, `card` and any future surface. Light borders are solid because the background never changes underneath them.

### 3.2 Type faces

Loaded in `app/layout.tsx` through `next/font/google`, exposed as CSS variables and mapped in `@theme`.

| Utility | Face | Variable | Role |
|---|---|---|---|
| `font-sans` | Geist Sans | `--font-geist-sans` | Body, bio, prose. Also the body default |
| `font-mono` | Geist Mono | `--font-geist-mono` | Labels, nav, dates, anything metadata |
| `font-display` | Space Grotesk | `--font-space-grotesk` | Hero name, skills band, experience company names, 404 headline, wordmark if it ever becomes one |

Inter is still loaded and exposed as `--font-inter` but nothing on v2 uses it. Remove it once the blog pages are rebuilt.

Space Grotesk was chosen from a seven-face bake-off. High-contrast serifs read as fashion or literary, not software. That genre call matters more than the individual face, so any replacement should be a geometric or grotesque sans.

### 3.3 Radius

`--radius: 0.625rem` exists for shadcn primitives. Nothing on the home page uses a radius, and nothing new should. Square corners are part of the hairline language.

### 3.4 Custom variants

```css
@custom-variant dark (&:is(.dark *));
@custom-variant wide (@media (min-aspect-ratio: 1 / 1));
```

`wide:` is keyed on viewport shape, not width. It gates the hero's `min-h-[88svh]`. A portrait tablet is wider than `md` but still stretches badly with a full-height hero, and a short landscape laptop reads dense without one. Use `wide:` for any rule that is really about how tall the viewport is relative to its width.

### 3.5 The `.label` device

```css
@layer components {
  .label {
    @apply font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-[11px];
  }
}
```

The micro-label is the single most repeated element on the page. It is the hero rail, the resume link, every action cell, the section header, the experience role and date, the View all link, and the 404 header and footer. Use it verbatim, do not recreate its parts.

It must stay in `@layer components`. Unlayered CSS beats Tailwind's layered utilities, so an unlayered `.label` would override `hover:text-foreground` on the same element and every hover would silently die. This happened once already.

---

## 4. Type scale and rules

### 4.1 Sizes

| Element | Classes | Notes |
|---|---|---|
| Hero line one | `font-display font-light uppercase tracking-wide leading-[0.94] text-[clamp(2rem,8.2vw,6.25rem)]` | |
| Hero line two | `font-display font-medium uppercase tracking-wide leading-[0.94] text-[clamp(1.6rem,7vw,5.25rem)] pl-[6%] md:pl-[8%]` | Ratio to line one is 0.84 and must stay close to that |
| Skills band | `font-display uppercase tracking-wide leading-[1.25] text-[clamp(1.15rem,3.5vw,2.5rem)]` | |
| Experience company | `font-display font-normal uppercase tracking-wide leading-[1.1] text-xl md:text-[clamp(1.375rem,2.3vw,2rem)]` | |
| Bio and 404 body | `text-sm md:text-base leading-relaxed text-muted-foreground max-w-sm text-pretty` | |
| Nav | `font-mono text-sm font-medium lowercase leading-none text-muted-foreground` | |
| Label | `.label` | 10px, 11px from `md` |
| Footer copyright | `text-xs text-muted-foreground` | v1, unchanged |

### 4.2 Case is a role signal

- **UPPERCASE with wide tracking** in the display face is a heading: name, band, company.
- **UPPERCASE with 0.18em tracking** in mono is metadata: `.label`.
- **lowercase** in mono is navigation: `sougata`, `work`, `posts`.
- **Sentence case** in sans is prose: the bio, the 404 body.

Do not mix these. A nav item is never uppercase, a label is never lowercase, a heading is never sentence case.

### 4.3 Tracking

Display type is always `tracking-wide`. Labels are `tracking-[0.18em]`. Nothing on v2 uses `tracking-tight`, and the blog heading styles in `components/mdx-components.tsx` that still do are v1 debt.

### 4.4 The Scalzo headline

The two hero lines are set so that line two, stepped in from the left and carrying more characters, overhangs line one on the right. The overhang is the whole effect. It depends on the two sizes staying within about 0.84 of each other. An earlier 0.65 ratio never reached line one's edge and read as a subtitle.

Each line is wrapped in `overflow-hidden pb-[0.12em] -mb-[0.12em]`. The padding keeps the reveal mask below the baseline so descenders are never clipped at `leading-[0.94]`, and the negative margin gives that padding back so it adds no height.

The 404 reuses this headline verbatim with different words. Any future page-level headline should too.

### 4.5 Weight pairing

Line one is `font-light`, line two is `font-medium`. That is the only weight contrast on the page. Company names are `font-normal`, the band has no explicit weight. Never use `font-bold` or `font-semibold` in v2 components.

---

## 5. Layout and the border grid

### 5.1 Anatomy of a section

```
┌──────────────────────────────────────────────────────┐  ← border-t, full bleed (viewport)
│         │  px-4 / md:px-8   content   px-4 / md:px-8 │
│  gutter │◄──────────── max-w-5xl ─────────────────►│ gutter
│         │  md:border-x on this inner container         │
```

`components/Section.tsx` is the shell. The `<section>` carries `border-t border-border` and spans the viewport. The inner `<div>` is `mx-auto w-full max-w-5xl px-4 md:px-8 md:border-x`. Horizontal rules therefore run edge to edge, and vertical rules mark the content column. That is what makes the lines read as a grid the page sits inside rather than boxes drawn around content.

### 5.2 Rules of the grid

1. **`border-t` only, never `border-b`, on sections.** (See rule 8 for the general form.) Adjacent sections share one line. Two borders touching produce a 2px seam, which is instantly visible against 1px everywhere else. The `last` prop exists for a page whose final section has nothing below it. On the home page the footer's own `border-t` closes the last section, so `last` is unused.
2. **Vertical rules only from `md`.** Below `md` the column is already flush with the viewport and the rules would sit on the screen edge.
3. **Anything that must meet the vertical rules cancels the padding.** `-mx-4 md:-mx-8` on the element. This is how `SectionHeader`'s rule, the hero actions strip and the projects bento touch the column edges. Without it a rule stops 16px or 32px short and floats inside the column.
4. **Borders on cells, never on the grid.** In the bento each cell draws only bottom and right. The last row drops bottom, the last column drops right. Adjacent cells share one line.
5. **Rows use `border-b` with `last:border-b-0`.** Experience rows do this. The section's closing edge then comes from whatever sits below, not from the last row.
6. **Nothing has a border on all four sides.** Cells, strips and rows are always missing at least one edge because the grid supplies it.
7. **Every full-width element on the page lives in the same column.** Nav, all sections, footer and the three bands of the 404 all use `max-w-5xl px-4 md:px-8 md:border-x`, so the vertical rules run continuously from the top of the page to the bottom.
8. **Borders never overlap.** Every edge on the page is drawn by exactly one element. Two elements drawing the same edge produce a 2px line, and a border drawn where the grid has no rule produces a stray line. This is easy to get right at `md`, where the vertical rules make every seam visible, and easy to miss below `md`, where the vertical rules are gone and the layouts change from grids to stacks. Check mobile separately, every time. The specific traps:
   - A cell that carries `md:border-l` to meet its neighbour must not carry `border-l` below `md` if it sits at the screen edge, because there is no vertical rule there to meet. The strip links use `not-first:border-l` on mobile and `md:border-l` from `md` for exactly this reason.
   - A stacked list's last item must not draw `border-b` when the next section draws `border-t`. Experience rows use `last:border-b-0`, bento cells skip `border-b` on the last index.
   - When a grid collapses to one column, the cell that was in the right column no longer needs `border-r`, and the cell that was in the bottom row now needs `border-b` unless it is last. The bento classes are split into a mobile set and an `md:` set for this, never one set for both.
   - A cell above another cell draws `border-b`, the one below does not draw `border-t`. Copy mail draws `border-b` on mobile and the links beneath it draw nothing on top.

### 5.3 Where the shell is duplicated

The inner column classes appear inline in four places that do not use `Section`: `Navbar`, `Footer`, and three rows in `app/not-found.tsx`. They must match `Section` exactly. If the column width or padding ever changes, change all five.

### 5.4 Section padding recipes

Set through `innerClassName` in `app/(routes)/page.tsx`. Each is a deliberate choice about who closes the section.

| Section | Inner padding | Why |
|---|---|---|
| Hero | none (the component has `pt-6`) | The actions strip is flush with the bottom edge |
| Skills | `py-16 md:py-24` | A single statement reads as a band and wants equal air above and below |
| Experience | `pt-6` | The last row's own `py-7` closes it, so adding a row extends the list without stacking padding |
| Projects | `pt-6` | The bento's bottom edge closes it, so cells run to the border |
| Recent writings | `pt-6` | Same as Experience, the last post row's `py-7` closes it against the next section's rule |
| Contact | `pt-6 pb-16 md:pb-24` | The form is a block, not a row, so nothing inside can close the section on its own |

`pt-6` is the standard offset from a section's top rule to its header label.

### 5.5 Hero internal layout

Top to bottom: rail (location left, resume right), headline, bio, actions strip. The block between rail and strip is `py-24 sm:py-28 md:py-20`. On landscape viewports the hero is `min-h-[88svh]` and `justify-between` distributes spare height. On portrait there is no min-height, so those paddings are the only thing giving the hero its height, which is why the mobile values are larger than the desktop one.

The bio is `max-w-sm` and `md:ml-auto`, so it sits under the headline's right edge on desktop and at the left on mobile.

### 5.6 The actions strip

A full-width band of cells sharing dividers. On mobile, Copy mail spans the full width as the call to action with a `border-b`, and the three social links sit beneath it in a three-column grid with `not-first:border-l`. From `md` the copy cell sits left with a `border-r`, the links are pushed right, and every link carries `border-l` so the first one closes the gap against the copy cell. Cells are `px-4 py-5 md:px-7` and stretch to equal height.

### 5.7 Experience row

`md:grid md:grid-cols-12 md:items-center md:gap-x-6`, with company `col-span-5`, role `col-span-4`, date `col-span-3`. Three columns across the full measure, because two columns pushed to opposite edges left about 500px of dead space in the middle. `items-center`, not `items-baseline`, because a 30px name and an 11px label sharing a baseline leaves the label sitting visibly low.

Below `md` the right-hand pair is a real right-aligned stack with date on top. The wrapper is `md:contents` so at `md` it dissolves and its two children drop straight into the grid, with `md:order-*` restoring role before date.

### 5.8 Bento

`grid-cols-1 md:grid-cols-2`. Cell borders are computed by index in `Projects.tsx`. The classes `md:border-b-0` and `md:border-b` are both applied to the top row and rely on `cn` (which is `twMerge`) resolving the later one. It works, but it is order-sensitive, so keep that call as it is.

Each cell is `ProjectCard`: title in the display face, a one-line blurb, then the project's demo. Only the arrow beside the title links to the live site. The cell itself is not a link, because demos carry live controls and a visitor poking at one should not be sent away.

### 5.9 Project demos

A demo is the project itself, rebuilt as a scripted mock of its real UI on this site's tokens. Modelled on the pii-ai features bento. The rules:

| | Value |
|---|---|
| Cell | `p-6 md:p-8`, `md:h-[540px]` |
| Demo slot | `h-[340px] md:h-[380px]`, `shrink-0`, `md:mt-auto` so it pins to the cell's bottom |
| Demo root | `h-full`, `overflow-hidden`, `rounded-lg border border-border bg-background` |
| Type inside | `text-[13px]` for messages, `text-[12px]` for controls, `text-[11px]` for code and labels. Geist Sans and Geist Mono only, never the project's own faces |
| Colour inside | The site's two text tones, leaning muted. A demo sets `text-muted-foreground` at its root and reserves `foreground` for what the product itself makes heaviest, like a streamed reply or a keyword. Filled marks such as avatars and checked boxes use `bg-muted-foreground`, not `bg-foreground`. Surfaces use `bg-muted` and `bg-popover`. No chroma |

Fixed heights are what make four different demos read as one row. A demo never sizes itself, it fills the slot and clips.

Two exceptions to the chrome rules apply inside a demo and nowhere else. A demo may use a radius (`rounded-lg` on its window, `rounded-md` on bubbles, blocks and menus), because it depicts a product and the product has corners. And it may use a filled surface, because a chat bubble or a menu with no fill is not readable as one.

Demo sequences follow `components/home/demos/sequence.ts`:

- Gated on `useInView(ref, { once: true, amount: 0.35 })`. Never on mount.
- One `async` run function, stages as a string union with an ordered list, `reached()` for anything that persists and `stage ===` for anything transient like an open menu. Paced with `tick(ms)`, which throws on abort so the run reads top to bottom.
- An `AbortController` cancels the run on unmount, and a `loopKey` restarts it after a fade-out.
- Text streams through `TypedReveal`: the full string is laid out from the first frame and `count` fades characters in place, so nothing reflows. Code blocks do the same per line.
- Only opacity and transform animate. Menus fade with a 4px rise. Hover states on the mock are `transition-colors`.
- Reduced motion renders the finished state once with no loop.
- Things the real product shows on hover, like message actions, also switch on at the end of the sequence so touch devices see them.
- **The script is short and the controls are live.** The scripted turn is the product's core loop only (type, send, wait, reply). Menus, pickers and toggles are real buttons the visitor can use, with their own state that the script never reads or resets. Playing with a control must not interrupt the turn, and the turn must not undo a choice.
- **A scrolling list fades into whatever sits below it.** A static `mask-image` gradient over the last 28px of the scroller, plus bottom padding so the newest item can still clear the fade. A hard edge where messages meet a composer reads as a cut.
- **A pending state and the thing it becomes share one slot.** A thinking indicator sits in the same line box as the first line of the reply it precedes, absolutely positioned over text that is already laid out invisibly, so the swap changes no height. Mounting the reply after the indicator, as the real app does, is a visible jump.

The AI Chat demo is the reference implementation, `components/home/demos/AiChatDemo.tsx`. The source app is cloned into `.tmp/` (ignored by git) when a demo is being built, so the mock is checked against the real `ChatInput`, `MessageItem` and `CodeBlock` rather than from memory.

---

### 5.10 Contact and forms

Two columns from `md`, one below, `gap-12 md:gap-16`. Left is the invitation: a `.label` eyebrow, a display-face line, a short muted paragraph, then the social marks pinned to the foot of the column with `md:mt-auto` so they line up with the bottom of the form. Right is the form. The email address lives in the footer, right-aligned, in muted mono without uppercase so it stays readable.

Form fields use the shadcn `Form`, `Input` and `Textarea` primitives with their chrome overridden from the call site, never by editing `components/ui`: square corners, `border-border` at rest, `border-foreground` on focus and on an invalid field, no ring, no shadow, transparent background. Labels are `.label`. Error messages are Geist Mono at 11px in `foreground`, not destructive red, since the site has no chroma. The submit is a full-width `h-12` hairline button carrying `.label`, and while sending it shows only a spinning `Loader2`, no wording. On success the form is replaced by a confirmation block of the same height that stays until the page reloads. Toasts come from sonner through `components/ui/sonner.tsx`, mounted once in the root layout.

Validation runs on both sides from one schema in `schemas/contact.ts`: zodResolver on the client for inline messages, `safeParse` inside the server action in `actions/contact.ts` as the real gate. The action calls `lib/mail.ts`, which holds the nodemailer transporter and sends two emails from the templates in `constants/email-templates.ts`. The templates freeze the light palette as hex, because mail clients cannot read the CSS variables.

### 5.11 Blog list and post covers

`/blog` is two bands in the section language. The first is a statement cell like the hero: a `.label` eyebrow, the page title in the display face, one line of muted description, `pt-6 pb-16 md:pb-24`. The second carries the newest post as a featured cell under a `SectionHeader`, after the pii-ai anatomy: cover first, then a two-column split with metadata, title, dek and a hairline "Read full post" button on the left, and the first two paragraphs of the body on the right, the last clamped to four lines, ending in a small "Read more" link. Older posts, when there are any, fall into hairline rows under a "More posts" header in the same row language as Recent writings.

Covers are drawn, never uploaded. A post names a key from `THUMBNAILS` in `velite.config.ts`, and `components/blog/Thumbnail.tsx` maps that key to an illustration: a full-width `bg-muted` rectangle at 21:9 (24:9 from `md`) with one mark in the middle built on the tokens, so it flips with the theme. On the list page the cover cancels the column padding with `-mx-4 md:-mx-8` and meets the vertical rules edge to edge, like the bento. The same component renders the cover on the post page.

Post metadata comes from velite: `metadata.readingTime` for the "min read", `excerpt`, computed at build time from the raw markdown by taking the first two prose paragraphs and skipping headings, code and lists, and `category`, which is stored for the post page and not shown on the list, since the cover already says what the post is about. The metadata line is date, a middle dot, read time, all `.label`.

### 5.12 Post page

Three bands. The header is a statement cell: a `.label` rail with the category on the left and an "All posts" link on the right, the title in the display face at `clamp(1.75rem,5vw,3.75rem)`, the description muted, then date and read time as labels. The body band has no inner padding of its own: the cover sits flush under the header rule, edge to edge inside the vertical rules, then a grid with the contents rail on the left (`11rem`, `13rem` from `lg`) carrying a `border-r` the full height of the row, and the reading measure on the right capped at `68ch`. On a phone the rail becomes a `details` fold under the cover. The last band points at the source repository with a hairline button.

`components/blog/PostLayout.tsx` is a client component that owns the two refs the progress ring measures, and takes the server-rendered MDX as children. `PostToc` lists h2s only with a scroll spy: the last heading past a reading line at 40% of the viewport is foreground, the rest muted. `ReadingProgress` floats bottom right inside the page column, an arc on the border-coloured track with a mono percentage, visible once the cover has entered the viewport and gone again before the end.

Post typography lives in `components/mdx-components.tsx`: h2 in the display face, h3 medium, body Geist at 15px and 16px from `md` with `leading-relaxed`, links underlined, hairline blockquotes and table rules, no bold, no tight tracking, no radius. `app/(routes)/blog/[slug]/loading.tsx` mirrors the page band for band with the same paddings and cover aspect, so a client navigation from the list swaps content in without a shift.

### 5.13 Code blocks

No syntax highlighter. Code is Geist Mono in `muted-foreground` on a `bg-muted/20` surface inside a hairline box, with a header carrying the language as a `.label` and the copy and expand icons. A fence's own meta does the emphasis: lines listed in `{1,3-5}` step up to `foreground`, and `showLineNumbers` turns numbers on. The meta reaches the component through the rehype step in `mdx-components.tsx`, which copies it to a data attribute, since MDX drops it otherwise.

Blocks render on the server like any other markup, so there is no mounting gate and nothing shifts on hydration. A block longer than 18 lines scrolls inside `26rem`. Every block, whatever its length, has an expand action that opens it at full size in `ResponsiveModal`, a dialog from `md` up and a drawer below, both square-cornered on the site's tokens. Inline code is `bg-muted` at `0.9em` in foreground.

Anything that scrolls inside the page takes `.scrollbar-minimal`, ported from pii-ai: a 6px thumb in foreground at 18% alpha on a transparent track, no buttons, readable on both themes. The `@supports` reset in `globals.css` is load-bearing, since Chromium ignores the webkit rules while the standard scrollbar properties are set. Message lists in demos keep `.scrollbar-hidden`, since those scroll on their own.

## 6. Spacing

Only these values are used for vertical rhythm. Pick from the list rather than inventing a new one.

| Value | Where |
|---|---|
| `py-4` | Nav bar, 404 header |
| `py-5` | Strip cells, footer, 404 footer |
| `pt-6` | Hero rail, section header offset from the top rule |
| `py-7` | Experience rows |
| `mt-5` | Gap between a `SectionHeader` label and its rule |
| `mt-2` | Gap between a `SectionHeader` rule and the first row |
| `mt-20 sm:mt-24` | Headline to bio |
| `py-16 md:py-24` | The skills band |
| `py-24 sm:py-28 md:py-20` | Hero body on portrait and landscape |

Horizontal: `px-4 md:px-8` for the column, `px-4 md:px-7` for strip cells, `gap-6` in the nav, `gap-x-4` between a label and its action, `gap-4` and `md:gap-x-6` inside experience rows.

There are no arbitrary margins between sections. Sections touch, and the shared hairline is the gap.

---

## 7. Colour usage

- Text is `foreground` or `muted-foreground`. Nothing else.
- **Hover moves one step.** Muted elements go to `foreground` on hover: labels, nav, strip cells, the toggle. The one element that starts at `foreground`, the company name in Experience, goes to `muted-foreground` on hover. Always `transition-colors duration-300`.
- Links inside labels and prose are `underline decoration-1 underline-offset-4`. No colour change on the underline, no colour on the link at rest.
- Every line is `border-border`. Never a `/opacity` modifier on a border, never `border-muted-foreground`.
- No filled backgrounds. No `bg-muted`, `bg-card`, `bg-accent` on the home page. Surfaces belong to dialogs and drawers, which are the only place shadcn primitives still earn their keep.
- No shadows. `dark:shadow-none` was a v1 pattern and is gone.
- Icons take `currentColor` and inherit the two-tone rule. The theme toggle is a 16px stroked icon, `stroke-width 2`.
### 7.1 Icons

One icon set, one weight, one colour rule.

- **Lucide, always.** Every icon on the site comes from `lucide-react` at its default 2px stroke, except the three brand marks and the Apple logo, which are inline SVG. Never mix in another set, and never import an icon library's brand colours.
- **Icons take `currentColor`.** They inherit the two text tones like any other glyph, muted at rest and foreground on hover or when active, through the same `transition-colors duration-300` as text. No icon carries its own colour.
- **Sizes are fixed per context.** `size-4` (16px) in the chrome: nav toggle, section actions, social marks, the card arrow. Inside a demo, `size-3.5` for toolbar controls and `size-3` for row and inline marks, matching the 11px to 13px type they sit beside. `size-2.5` only inside an avatar circle.
- **Decorative icons are hidden from assistive tech.** `aria-hidden` on any icon that sits next to a label. An icon that stands alone as a control gets an `aria-label` on the button or link, never on the svg.
- **Brand marks are monotone SVG** in `components/icons/SocialIcons.tsx`, fill on `currentColor`. A mark that fills its viewbox edge to edge, like X, reads larger than a contained mark at the same box, so its viewbox is padded until the three sit at optical parity, and a thin glyph may take a small stroke on its fill to match the weight of the others. Fix parity inside the icon component, not with a different size at the call site.
- **Filled marks are muted.** An avatar or a checked box inside a demo fills with `bg-muted-foreground` and draws its glyph in `background`. Never `bg-foreground`.
- **Icons mean one thing each.** Folder for a page with children and file for a leaf, hash for text channels, mic for audio, video for video, chevron right that rotates 90 degrees for expand and chevron up that flips for a menu opening upward. Reuse these before choosing a new glyph for the same idea.
- **Motion on an icon is transform only.** Chevrons rotate, spinners spin with `animate-spin`, nothing else animates.

- **Colour in the work, not the chrome.** When project illustrations are built, they are drawn with strokes on `muted-foreground` so they follow the theme. If a project genuinely needs colour to be legible, that colour lives inside the cell and nowhere else. With chroma at zero the only remaining variable in an illustration is lightness, and four illustrations differing only in lightness converge into the same grey. That is the lesson from the shader attempt.

---

## 8. Motion

### 8.1 Rules

1. **Animate only `opacity` and `transform`.** These are the two properties the compositor can move without repainting. `filter: blur()` is paint-stage and re-rasterises the text every frame regardless of layer promotion, which reads as a stall then a snap. `color`, `background-clip` gradients and `clip-path` are the same story at text sizes. This is where jitter comes from.
2. **First-paint animations are CSS.** Framer sets initial state from an effect, so the server HTML ships in the hidden state and the element is blank until hydration. On a slow device that is a freeze followed by everything snapping in. The hero uses `@keyframes` with `animation-fill-mode: both` and per-element `animation-delay`, so it runs at first paint with no JS.
3. **`will-change` persists past the animation.** The browser promotes an element to its own layer while it animates, then drops the layer when it ends and re-rasterises the text on the main layer at a slightly different sub-pixel position. That is the small jump exactly when the animation finishes. Keeping `will-change` on the element prevents the de-promotion. It costs memory per layer, so it belongs on the eight hero elements and nowhere else that animates once.
4. **Never round a scroll-linked value.** `Math.round` turns smooth sub-pixel motion into 1px steps. If something needs to settle, use `useSpring` with `restDelta`, and set `restDelta` deliberately or the spring emits sub-pixel updates long after it looks still.
5. **Below-the-fold entrances use `whileInView` with `once: true`.** `animate` on mount plays the stagger before anyone scrolls to it. Experience uses `amount: 0.25`, Projects `amount: 0.15`.
6. **Stagger comes from the parent.** `staggerChildren` on the container, never `delay: i * n` on children. Adding a row then needs no index bookkeeping.
7. **Scroll-driven fills animate opacity, not colour.** The skills band keeps every word at `text-foreground` and moves opacity from 0.18 to 1. Animating colour would look identical and repaint every frame.
8. **Respect reduced motion twice.** Framer variants read `useReducedMotion` and collapse to a 0.3s opacity fade with no movement. A global `prefers-reduced-motion` block in `globals.css` collapses every CSS animation and transition to 0.01ms and turns off smooth scrolling. Framer does not know about CSS, so both are needed.
9. **Parallax and entrance never share an element.** The hero entrance drives `transform` on the inner spans. The scroll parallax drives `transform` on a wrapper `motion.div` around them. Stacking both on one element makes them fight.
10. **`scroll-behavior: smooth` on `html` only.** On `*` it lands on every scrollable descendant and fights scroll-driven transforms, which shows as a faint shimmer as the scroll settles.

### 8.2 Easing

| Name | Value | Where |
|---|---|---|
| Entrance | `cubic-bezier(0.22, 1, 0.36, 1)` | Hero CSS keyframes, Experience and Projects Framer items, `MagicReveal` |
| Section (v1) | `[0.16, 1, 0.3, 1]` | Retired with `AnimatedSection`. Do not reintroduce |

Use the entrance curve for anything new. It is the same curve in both CSS and Framer so the page has one feel.

### 8.3 Timings

| Animation | Duration | Delay | Properties |
|---|---|---|---|
| `.hero-line` (name, title) | 1.15s | 0.25s, 0.35s | `translateY(115%)` to 0 behind a mask |
| `.hero-fade` (rail, resume, bio, strip) | 0.9s | 0.5s, 0.58s, 0.5s, 0.5s | opacity 0 to 1, `translateY(10px)` to 0 |
| `.hero-rule` | 1.4s | unused currently | `scaleX(0)` to 1, origin left |
| Hero parallax | scroll-linked | | name `y` 0 to 110px, bio `y` 0 to 55px, both fade to 0 by 85% of the hero's scroll range |
| Skills fill | scroll-linked | | opacity 0.18 to 1 per word, window `["start 0.95", "end 0.3"]`, slices overlap by 60% so the sweep is continuous |
| Experience and Projects rows | 0.95s | stagger 0.12s, children delayed 0.08s | opacity, `y: 18`, blur 7px to 0 |
| Hover colour | 0.3s | | `color` |
| Copied state | holds 1s | | text swap only |

The skills fill is disabled below `md` and every word sits at opacity 1 in `muted-foreground`. On portrait the hero is content-height so the band is already on screen at load, the fill starts mid-sweep, and the reader lands on half-lit text. When disabling it, pass `{ opacity: 1 }` explicitly, not `undefined`, or Framer leaves its last inline value on the element.

### 8.4 Layer hints in markup

`transform-gpu` and `will-change-[opacity,filter,transform]` on Framer-animated wrappers, `transform-gpu will-change-[opacity]` on skills words. Match that pattern on any new animated element and drop `filter` from the list once blur is removed.

### 8.5 Motion debt

- Experience, Projects and Recent writings still animate `filter: blur()` on their row entrances. It has not visibly stalled yet because they are short lists, but the hero fix applies the moment it does: drop blur, keep opacity and `y`.
- `MagicReveal` is orphaned and uses a mask-image gradient animation, which is paint-stage. Delete it rather than reuse it.

---

## 9. Copy and voice

### 9.1 Rules from CLAUDE.md that apply to site copy

No em dashes and no semicolons in prose. The skills band uses em dashes as separator glyphs between disciplines, which is a typographic mark rather than punctuation in a sentence and is exempt. That exemption is noted in the component and should stay the only one.

### 9.2 Voice

Short declarative sentences. First person, present tense. Say what you do, not what you are passionate about.

- Hero bio: "I build modern, performant web applications with React and TypeScript, from design system to deployment."
- 404: "This page does not exist, or it did once and has since moved on. Either way, there is nothing to see here."

Two sentences at most for any prose block on the home page. No exclamation marks, no emoji.

### 9.3 Label vocabulary

Labels are sentence case in the source and uppercased by CSS, so write them as words, not shouting: `Based in India`, `Resume`, `Copy mail`, `Copied`, `Experience`, `Selected Work`, `View all`, `Error 404`, `Back home`, `Read posts`. Two or three words. Verbs for actions (`Copy`, `View`, `Read`), nouns for headers (`Experience`, `Selected Work`).

Nav items are single lowercase words: `sougata`, `work`, `posts`. The wordmark is the first name only.

Role and type in Experience are joined with a middle dot: `Full Stack Developer · Remote`. Dates use a short month and a hyphen: `Oct 2025-present`.

### 9.4 Project blurbs

One line each, in `projectData.blurb`, structured as "what it is, with the two or three things that make it interesting". Not rendered yet. `summary` is the long form from v1 and is unused.

---

## 10. Interaction and shortcuts

| Shortcut | Action | Notes |
|---|---|---|
| Ctrl + D (Windows, Linux), Cmd + D (macOS) | Toggle light and dark | `components/providers/ThemeShortcutProvider.tsx`. Calls `preventDefault` because the combo is Bookmark in every major browser. Ignored while focus is in an input, textarea, select or contenteditable, and ignored when Shift or Alt are also held |

The shortcut is discoverable through the toggle's `title` attribute, "Toggle theme (Ctrl/Cmd + D)". A shortcut with no visible counterpart is an accessibility regression, so the toggle button stays.

Other interaction rules:

- **Mounted gates** on anything reading `resolvedTheme`. `next-themes` cannot resolve during SSR, so the toggle renders a same-size inert placeholder until mount, and the shortcut provider does not attach its listener until mount. Both avoid a hydration mismatch and a layout shift.
- **`disableTransitionOnChange`** on the theme provider. Theme switches are instant, not cross-faded.
- **Copy mail** swaps its label to `Copied` for one second, announced through `aria-live="polite"`, with a `min-w-[84px]` reservation so the cell does not resize.
- **External links** are `target="_blank" rel="noreferrer"`. Resume is `download`.
- **Scroll restoration is manual**, set by an inline script in the root layout body so it beats the browser's restoration on reload. Without it a refresh from lower down the page starts the hero reveal at the top and then jumps mid-animation. Back and forward on hard reloads no longer restore position. The App Router handles scroll for client navigation itself.
- **`overflow-y-scroll` on body** so the scrollbar is always present and the column never shifts when content height changes.
- **`overflow-x-clip` on the routes shell** so the negative-margin tricks and the parallax cannot introduce horizontal scroll.
- Focus rings come from the base rule `outline-ring/50`, applied to everything.

---

## 11. Component inventory

| Component | File | Role |
|---|---|---|
| `Section` | `components/Section.tsx` | The only way to add a section to a page. Props: `id`, `innerClassName`, `last` |
| `SectionHeader` | `components/SectionHeader.tsx` | Label left, optional action right, rule beneath. Used by list sections, not by the band |
| `.label` | `app/globals.css` | The micro-label. A class, not a component, on purpose |
| `CopyButton` | `components/CopyButton.tsx` | Email to clipboard. Borderless, the cell supplies its edges |
| `ThemeToggle` | `components/ThemeToggle.tsx` | Visible theme switch |
| `ThemeShortcutProvider` | `components/providers/ThemeShortcutProvider.tsx` | Keyboard theme switch |
| `Hero`, `Skills`, `Experience`, `Projects`, `ProjectCard`, `Blogs`, `Contact`, `ContactForm` | `components/home/` | Home sections |
| `LinkedInIcon`, `XIcon`, `GitHubIcon` | `components/icons/SocialIcons.tsx` | Brand marks on `currentColor` |
| `Thumbnail`, `FeaturedPost`, `PostLayout`, `PostToc`, `ReadingProgress` | `components/blog/` | Drawn post covers, the featured cell, the post body grid, contents rail, progress ring |
| `CodeBlock`, `ResponsiveModal` | `components/` | Monotone code blocks and the dialog-or-drawer they expand into |
| `Navbar`, `Footer` | `components/` | Chrome, in `app/(routes)/layout.tsx` |

Retired from the home page: `Button`, `ResponsiveModal`, `AnimatedSection` (deleted), `MagicReveal` (orphaned). `dialog` and `drawer` stay for `ResponsiveModal`, which the blog may still want.

---

## 12. Border flow audit, 2026-09-02

Walked the page top to bottom against the rules in section 5.

**Continuous and correct**

- Nav has `md:border-x` on the same column and no bottom border. The hero section's `border-t` supplies the line beneath it.
- Hero has no bottom padding and the actions strip is flush with the section edge. The strip's cells share dividers through `border-b` on mobile and `border-r` plus `border-l` from `md`. The skills section's `border-t` closes it.
- Skills is symmetric and has no internal rules.
- Experience rows are `border-b` with `last:border-b-0` and the header rule reaches the column edges through `-mx-4 md:-mx-8`. The projects section's `border-t` closes it.
- Projects bento reaches the column edges, cells draw only bottom and right, the last row and last column drop theirs. The blogs section's `border-t` closes it.
- Footer is `border-t` full bleed with the column inside, which closes Blogs.
- 404 is three bands in the same column with one `border-t` between each. The vertical rules line up with the home page.
- No element anywhere has two adjacent borders stacking into a 2px seam.
- Checked below `md` as well: the strip's first link has no `border-l` at the screen edge, Copy mail's `border-b` is the only line between it and the links, the last experience row and the last bento cell draw no bottom edge, and the bento's mobile column draws no `border-r`. Every edge is drawn once.

**Findings worth acting on**

1. The column shell classes are duplicated in five places (see 5.3). A width change will drift unless all five move together. Extracting the inner classes to a shared constant or a small `Column` component would remove the risk without changing the render.
2. Resolved. `ProjectCard` now carries the title, blurb and an `aria-label`, and the three cells without a demo yet render an empty slot of the same height.
3. Resolved. Recent writings is rebuilt in the section language: `SectionHeader` with a View all action, hairline rows with a `.label` date, a display-face title and a muted description, and no bottom padding so the footer's rule closes it.
4. Resolved. The footer is the name and year as a `.label` on the left and the email in muted mono on the right. The social marks moved into the contact section.
5. The hero strip animates in with a 10px downward offset before its 0.5s delay elapses. For that half second the strip's top rule sits 10px below the skills section's border. It is at opacity 0 so it does not show, but if the delay is ever removed it would.

---

## 13. Do and do not

**Do**

- Wrap every page section in `Section` and every list section's header in `SectionHeader`.
- Use `.label` for any metadata text. Use `font-display uppercase tracking-wide` for any heading.
- Cancel container padding with `-mx-4 md:-mx-8` when a rule or a row of cells must meet the vertical rules.
- Animate with opacity and transform. Put first-paint animations in CSS. Use `whileInView` once for anything below the fold.
- Keep `will-change` on the hero elements and only there.
- Move hover states one step along foreground and muted.
- Pick spacing from section 6.

**Do not**

- Add `border-b` to a section, or a border on all four sides of anything.
- Let two elements draw the same edge, or draw an edge where the grid has no rule. Check this at mobile widths, not only at `md`, since the vertical rules that would expose the mistake are hidden there.
- Use a radius, a shadow, a filled background or a chromatic colour in the chrome.
- Use `font-bold`, `font-semibold` or `tracking-tight`.
- Animate `filter`, `color`, `background`, `clip-path` or a mask.
- Round a scroll-linked transform.
- Put `scroll-behavior` on anything but `html`.
- Import a shadcn `Button` for a link. A plain anchor with `.label` is the pattern.
- Add a third text tone or a per-element opacity on text. Use the two tokens.
- Put imagery in a project cell that is not drawn with the site's strokes and tokens.
- Write an oklch value in a component.

---

## 14. Parked

Nothing on the site is v1 any more. Left to sweep: Inter is loaded but unused, `usehooks-ts` and `react-icons` are installed but unused, `MagicReveal` is an orphan, and the OG image is a 64px favicon rather than a real social card. Six shadcn primitives are installed but unused: `avatar`, `card`, `separator`, `sheet`, `textarea`, `tooltip`.

All four bento demos are in: AI Chat (scripted), Jotion (static, sidebar tree expands and collapses), Team Chat (live composer with a five-message cap, server menu, and a theme button that switches the whole site) and iPhone 15 (the landing page hero rebuilt without its video, the phone drawn in CSS, entrance plays once in view). The stack list from `projectData.stack` is still unrendered. The wider sequence is at the bottom of `docs/sessions/2026-07-29.md`.

## 15. SEO

Written for the searches that matter to this site: a hiring manager or founder looking for a React or Next.js developer, and a developer looking up a TypeScript topic.

- **Titles** use a root template, `%s | Sougata Das`, with the home default "Sougata Das, React and Next.js Developer". Page titles are short nouns: "Writings", the post title.
- **Descriptions** say what, with what, and from where. The home description names React, Next.js, TypeScript and India on purpose. Post descriptions name the topics the post actually covers, since that is what a search snippet is built from.
- **Keywords** are declared per page. Home carries the role and location terms, the blog index the topic terms, and each post its own list from frontmatter. Keep lists short and specific, a keyword nobody would type is noise.
- **Canonicals** are set per page through `alternates.canonical`, never in the root, so a page can never inherit another page's canonical.
- **Open Graph and Twitter** are set in the root and overridden per page. Posts are `type: "article"` with `publishedTime` and tags. Blog pages carry 1200 by 630 cards cropped from the drawn covers, in both tones under `public/og`, mapped by thumbnail key in `lib/og.ts`: the light one for Open Graph, which renders on light chrome, and the dark one for the Twitter card, where the timeline is dark. The home page still uses the 64px favicon and needs its own card.
- **Structured data** is inline JSON-LD. The home page carries a `Person` and a `WebSite` graph with the social profiles as `sameAs` and India as the address country. Each post carries a `BlogPosting` with author, dates, keywords and word count.
- **Sitemap and robots** come from `app/sitemap.ts` and `app/robots.ts`, published posts only, with the 404 excluded and marked `noindex` by Next.
- **Headings** are real `h1` through `h3` in the post body, with `rehype-slug` ids and self-linking h2s, which is what gives a search engine the section structure.
- **Local signals** for the home page: India in the description and keywords, `en_IN` as the Open Graph locale, `addressCountry: IN` on the Person, and `geo.region` and `geo.placename` meta through the `other` field, since the Metadata API has no geo fields of its own. Country only, nobody searches a city for remote work.
- **Viewport and theme colour** are a separate `viewport` export in the root layout, not metadata fields. The theme colours are the two background tokens as hex, so a phone's browser chrome matches the page in either mode.
- **Nested metadata replaces, it does not merge.** A page that sets `openGraph` or `twitter` loses everything the root set in that object, so blog pages restate `siteName`, `locale` and `creator` alongside their own images. Titles are the exception, they flow through the template.
- **Error pages are not indexed and not linked.** `not-found.tsx` gets `noindex` from Next automatically and is absent from the sitemap. `app/(routes)/error.tsx` catches a page failure inside the chrome with the 404's anatomy and a "Try again" that calls `reset()`. `app/global-error.tsx` catches the root layout itself, so it renders its own `html`, `body`, fonts and stylesheet, follows the OS theme through the media query alone, and reuses the 404's three-band shell.
