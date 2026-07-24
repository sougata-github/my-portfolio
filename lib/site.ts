/*
  Single source of truth for the deployed origin. Used by robots.ts,
  sitemap.ts and metadataBase, which must all agree or crawlers get
  conflicting canonical signals.

  Kept out of constants/index.ts on purpose: that module imports react-icons,
  and the sitemap route has no business pulling an icon library into its bundle.
*/
export const SITE_URL = "https://sougata.me";
