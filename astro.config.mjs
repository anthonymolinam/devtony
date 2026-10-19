// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://devtony.net",
  integrations: [react(), sitemap()],
  image: {
    // Playlist artwork from the iTunes lookup is downloaded and optimized at build time.
    remotePatterns: [{ protocol: "https", hostname: "**.mzstatic.com" }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
