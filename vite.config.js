import { fileURLToPath } from "url";
import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    dir: "src",
    setupFiles: "setupTests.js",
  },
  plugins: [react()],
});
