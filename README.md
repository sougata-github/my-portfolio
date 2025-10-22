### revamp portfolio

- Make it minimalistic
- Add theme toggle (magic-ui)
- Add highlighting text (magic-ui)
- Use Magic Reveal for heading and info (v0)
- Add subtle animations (motion)
- Header:
  - Theme Toggle button
  - AI Summary button -> opens a modal, shows loading state and summarises my info
    (AI SDK tool call)

AI Summary Responsive Modal:

- Summary tool call (gemini-2.5-flash generateObject)
- Generative UI for summary card: first show loading with Loader2 icon Generating Profile Summary and Loading Skeleton below
- The card will have a title (about), experience summary, project links and blog links
- A fixed chat input (prompt-kit) at the bottom
- First the ai summary tool call will be made then chat with ai
- All AI Elements from prompt-kit
- UseEffect to kickof streaming for summary tool call, on mount await sendMessage in IIFE but dont show user message messages.slice(1)
- Then use derived state messages.slice to show chat when messages.length > 2 ? messages.slice(3) : messages.slice(2)
- use proper Markdown from prompt-kit. Keep the modal scrollable with a mask image fade at the bottom
- Everything same for mobile, just it will be in a drawer component
