import { Element } from "hast";
import { addSeparatorAfterH2 } from "./lib/utils";
import { defineConfig, defineCollection, s } from "velite";

import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

//blog schema
const posts = defineCollection({
  name: "Post",
  pattern: "blogs/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      body: s.mdx(),
    })
    .transform(computedFields),
});

//project schema
const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      imageUrl: s.string().max(99),
      body: s.mdx(),
      links: s.object({
        liveLink: s.string().max(99),
        srcLink: s.string().max(99),
        forkLink: s.string().max(99),
      }),
      nextProject: s
        .object({
          title: s.string().max(99),
          link: s.string().max(99),
        })
        .optional(),
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
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "houston" }],
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
      addSeparatorAfterH2,
    ],
    remarkPlugins: [],
  },
});
