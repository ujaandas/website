// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ujaan.me",
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      optimizeDeps: {
        exclude: ['@keystatic/core', '@keystatic/astro']
      }
    }
  },
  adapter: cloudflare(),
  integrations: [react(), markdoc(), keystatic()],
});