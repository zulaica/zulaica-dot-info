import css from "@eslint/css";
import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores(["release/*"], "Ignore release directory"),
  {
    extends: ["js/recommended"],
    files: ["**/*.{js,mjs}"],
    languageOptions: { globals: { ...globals.browser } },
    plugins: { js, eslintPluginPrettierRecommended },
  },
  {
    extends: ["css/recommended"],
    files: ["**/*.css"],
    language: "css/css",
    plugins: { css, eslintPluginPrettierRecommended },
    rules: {
      "css/no-invalid-properties": ["error", { allowUnknownVariables: true }],
      "css/prefer-logical-properties": "error",
      "css/relative-font-units": "error",
      "css/use-baseline": [
        "error",
        {
          allowSelectors: ["selection", "nesting"],
          allowPropertyValues: { "font-family": ["ui-sans-serif", "ui-serif"] },
        },
      ],
    },
  },
]);
