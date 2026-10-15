import tsdownConfig from './tsdown.config.js';

import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix"
  },
  pack: tsdownConfig,
  lint: {
    "plugins": [
      "oxc",
      "typescript",
      "unicorn",
      "react"
    ],
    "categories": {
      "correctness": "warn"
    },
    "env": {
      "builtin": true
    },
    "rules": {
      "react/rules-of-hooks": "error",
      "react/only-export-components": [
        "warn",
        {
          "allowConstantExport": true
        }
      ],
      "vite-plus/prefer-vite-plus-imports": "error"
    },
    "options": {
      "typeAware": true,
      "typeCheck": true
    },
    "jsPlugins": [
      {
        "name": "vite-plus",
        "specifier": "vite-plus/oxlint-plugin"
      }
    ]
  },
  fmt: {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    jsxSingleQuote: true,
    useTabs: false,
    semi: true,
    trailingComma: "all",
    bracketSpacing: true,
    arrowParens: "always",
    endOfLine: "lf",
    sortPackageJson: false,
    ignorePatterns: [],
  },
});
