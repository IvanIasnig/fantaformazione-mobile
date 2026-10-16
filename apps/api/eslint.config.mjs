import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist", "coverage", "src/generated", "eslint.config.mjs"] },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierRecommended,
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
);
