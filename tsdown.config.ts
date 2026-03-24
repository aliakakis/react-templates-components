import pluginBabel from '@rollup/plugin-babel';
import { defineConfig } from 'tsdown';

const isProduction = process.env['NODE_ENV'] === 'production';
const useReactCompiler = process.env['USE_REACT_COMPILER'] === 'true';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  platform: 'neutral',
  dts: true,
  clean: false,
  outDir: 'publish',
  sourcemap: !isProduction,
  minify: isProduction,
  deps: {
    neverBundle: ['react', 'react-dom'],
  },
  plugins: [
    useReactCompiler &&
      pluginBabel({
        babelHelpers: 'bundled',
        parserOpts: {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        },
        plugins: ['babel-plugin-react-compiler'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
  ],
});
