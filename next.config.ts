import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      AVIF first. Next defaults to WebP only, but AVIF is markedly better on
      smooth gradients and dark regions, which is exactly where WebP shows
      banding. Browsers that cannot take AVIF fall back to WebP.
    */
    formats: ["image/avif", "image/webp"],
    /*
      Next 16 rejects any quality value not declared here. Sources are
      lossless PNG and the optimizer performs the only lossy pass, so these
      can be generous. Cards pick per image: 90 where it is indistinguishable
      from 100, 100 where fine gradient detail would otherwise band.
    */
    qualities: [75, 90, 100],
  },
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
