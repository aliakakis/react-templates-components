module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^/src/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/*.{ts,tsx}",
    "!**/index.tsx",
    "!**/*.test.*",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
};
