/*
  Single source of truth for the deployed origin. Used by robots.ts,
  sitemap.ts and metadataBase, which must all agree or crawlers get
  conflicting canonical signals.

  Kept out of constants/index.ts on purpose: that module imports the social
  icon components, and the sitemap route has no business pulling React
  components into its bundle.
*/
export const SITE_URL = "https://sougata.me";
