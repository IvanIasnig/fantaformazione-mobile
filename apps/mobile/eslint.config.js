const { defineConfig } = require("eslint/config");

const react = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    ignores: ["**/node_modules/**", "eslint.config.js"],
    extends: compat.extends(
      "expo",
      "prettier",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
    ),

    plugins: {
      react,
      prettier,
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },

    languageOptions: {
      parser: require("@typescript-eslint/parser"),
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-unused-vars": "off",
      "react-hooks/rules-of-hooks": "error",
      "prettier/prettier": "error",
      "react/jsx-curly-brace-presence": "error",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/static-components": "off",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "off",
      "react/jsx-key": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);
