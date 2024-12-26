import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import viteTsconfigPaths from "vite-tsconfig-paths";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  css: {
    postcss: "./postcss.config.js"
  },
  build: {
    minify: "esbuild"
  }
});
