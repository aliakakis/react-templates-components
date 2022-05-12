module.exports = {
  env: {
    production: {
      plugins: ["babel-plugin-jsx-remove-data-test-id"],
    },
    test: {
      presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-react",
      ],
    },
  },
};
