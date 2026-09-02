/*
  Social card images, 1200 by 630, cropped from the drawn covers.

  A share card cannot follow the viewer's theme, so each cover ships in both
  tones and the metadata picks one per network: light for Open Graph, which
  Facebook, LinkedIn and Slack render on light chrome, and dark for the
  Twitter card, where the default timeline is dark. Both files live in
  public/og. A new cover adds a pair here under its thumbnail key.
*/
export type OgPair = { light: string; dark: string; alt: string };

const OG_BY_THUMBNAIL: Record<string, OgPair> = {
  typescript: {
    light: "/og/blog-light.png",
    dark: "/og/blog-dark.png",
    alt: "The TypeScript mark on a muted background",
  },
};

export const BLOG_OG: OgPair = OG_BY_THUMBNAIL.typescript;

export const ogForThumbnail = (thumbnail?: string | null): OgPair =>
  (thumbnail && OG_BY_THUMBNAIL[thumbnail]) || BLOG_OG;

export const OG_SIZE = { width: 1200, height: 630 };
