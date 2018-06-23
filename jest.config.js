module.exports = {
  preset: "jest-preset-stylelint",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  setupFiles: ["<rootDir>/jest-setup.js"]
};
