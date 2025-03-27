const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname, // __dirname is fine in CommonJS
});

module.exports = {
  extends: ["next/core-web-vitals"],
  overrides: compat.overrides,
};
