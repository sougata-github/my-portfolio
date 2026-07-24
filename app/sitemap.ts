import type { MetadataRoute } from "next";
import { posts } from "#site/content";

import { SITE_URL } from "@/lib/site";

// Required by output: "export". Metadata routes are Route Handlers, and a
// static export refuses to emit one that has not opted in explicitly.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  /*
    Only published posts. This mirrors generateStaticParams in
    blog/[slug]/page.tsx, where unpublished posts are not routes at all, so
    listing them here would point crawlers at URLs that 404.
  */
  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
  ];
}
