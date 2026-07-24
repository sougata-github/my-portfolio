import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Required by output: "export". Metadata routes are Route Handlers, and a
// static export refuses to emit one that has not opted in explicitly.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
