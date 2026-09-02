import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import { Element } from "hast";

import rehypeInlineCodeProperty from "./components/mdx-components";


/*
  Thumbnails are drawn, not uploaded. A post names one of these keys and
  components/blog/Thumbnail.tsx maps the key to an illustration built on
  the site's tokens, so it follows the theme like everything else. Add a
  key here and a drawing there to give a new post its own cover.
*/
export const THUMBNAILS = ["typescript"] as const;

/*
  Excerpt for the featured card: the first two prose paragraphs of the
  body, skipping headings, code fences, lists and blank lines. Computed at
  build time from the raw markdown so the listing never has to parse MDX.
*/
const excerptFromRaw = (raw: string, count = 2): string[] => {
  const withoutFrontmatter = raw.replace(/^---[\s\S]*?---\s*/, "");
  const withoutCode = withoutFrontmatter.replace(/```[\s\S]*?```/g, "");
  return withoutCode
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(
      (block) =>
        block.length > 0 &&
        !/^(#|[-*+]\s|\d+\.\s|>|\||<|!\[|import\s|export\s)/.test(block)
    )
    .slice(0, count)
    .map((block) =>
      block
        .replace(/\s+/g, " ")
        .replace(/[*_`]+/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    );
};

const computedFields = <T extends { slug: string; raw: string }>(
  data: T
) => {
  /* raw stays out of the output, the listing does not need the whole post. */
  const { raw, ...rest } = data;
  return {
    ...rest,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
    excerpt: excerptFromRaw(raw),
  };
};

//blog schema
const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      /* Shown as the chip on the card and the post header. */
      category: s.string().max(40).optional(),
      thumbnail: s.enum(THUMBNAILS).optional(),
      /* Search terms for the page metadata. Kept short and specific. */
      keywords: s.array(s.string()).default([]),
      /* readingTime in minutes and wordCount, from the body. */
      metadata: s.metadata(),
      /* Headings for the on-page navigation, h2 with nested h3. */
      toc: s.toc(),
      raw: s.raw(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeInlineCodeProperty,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
          test: (node: Element) => node.tagName === "h2",
        },
      ],
    ],
    remarkPlugins: [],
  },
});
