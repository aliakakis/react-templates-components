module.exports = {
  presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react", "minify"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-json-strings",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-do-expressions",
    "@babel/plugin-proposal-function-bind",
    "@babel/plugin-transform-react-inline-elements"
  ],
  env: {
    test: {
      presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-react"
      ],
      plugins: ["dynamic-import-node"]
    }
  }
};
