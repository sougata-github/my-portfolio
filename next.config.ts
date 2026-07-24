import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits a fully static site to out/. Every route already prerendered, so
  // nothing is lost here except the features listed below.
  output: "export",
  images: {
    // Required by output: "export". The image optimizer needs a server, so
    // next/image serves source files as-is. Any image used with next/image
    // must therefore already be sized sensibly for the web.
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
