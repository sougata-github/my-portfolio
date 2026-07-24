# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal portfolio site.

- **Framework:** Next.js 16 (App Router, `app/` directory) with Turbopack
- **Language:** TypeScript
- **Package manager:** pnpm — always use `pnpm`, never `npm` or `yarn`
- **Styling:** Tailwind CSS v4
- **UI components:** shadcn/ui (see `components.json`)
- **Content:** MDX via Velite (`velite.config.ts` → `content/`)

## Boundaries — do not do these

These are the human's job. Do not do them unless explicitly asked in the current message.

### Git

- **Never** run `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git checkout -b`, or anything that mutates the repo or history.
- Read-only git is fine and encouraged: `git status`, `git diff`, `git log`, `git show`, `git branch --list`.
- When work is done, summarize what changed and let the human stage and commit it.

### Dev servers

- **Never** run `pnpm dev`, `next dev`, `pnpm start`, or otherwise start a long-running server. The human runs those.
- If a change needs to be verified in a running app, say so and ask the human to start the server.
- One-shot commands that exit on their own are fine: `pnpm build`, `pnpm build:content`, `tsc --noEmit`, `pnpm lint`.

## Commands

```bash
pnpm build:content   # generate content via Velite
pnpm build           # build:content + next build
```

`pnpm dev` and `pnpm start` exist but are run by the human, not by Claude.

## Writing style

Applies to all prose: site copy, MDX posts, docs, code comments, and chat replies.

- **Never use em dashes (`—`) or semicolons (`;`) in wordings.** Rewrite the sentence, split it in two, or use a comma, colon, or parentheses instead.
- This is about human-readable prose only. Semicolons in code are untouched.

## Conventions

- App Router conventions: server components by default, `"use client"` only where it is genuinely needed.
- Path alias `@/*` maps to the project root (see `tsconfig.json`).
- Add shadcn/ui components with `pnpm dlx shadcn@latest add <component>`; do not hand-write files into `components/ui/`.
- Match the style of surrounding code — naming, comment density, and import ordering.
- Keep changes scoped to what was asked. Do not refactor adjacent code as a side effect.
