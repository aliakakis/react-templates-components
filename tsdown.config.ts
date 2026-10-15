import { defineConfig } from "vite-plus/pack";

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  platform: 'neutral',
  dts: true,
  outDir: 'dist',
  sourcemap: false,
  minify: true,
  deps: {
    neverBundle: ['react', 'react-dom'],
  },
});
