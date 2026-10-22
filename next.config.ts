import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves the site from /<repo>; configure-pages passes it in CI, locally it's empty.
  basePath: process.env.PAGES_BASE_PATH ?? "",
  // Static export has no image optimizer; photos are pre-sized WebP already.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
