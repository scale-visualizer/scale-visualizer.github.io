import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const prettierConfig = {
  printWidth: 100,
  tabWidth: 1,
  useTabs: true,
  singleQuote: false,
  endOfLine: "crlf",
  singleAttributePerLine: true,
}

export default tseslint.config(
  {
    files: ["e2e/tests/**/*.ts", "e2e/config.ts", "e2e/playwright.config.ts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    rules: {
      "prettier/prettier": [
        "error",
        {},
        prettierConfig,
      ],
    },
  },
  {
    files: ["frontend/src/**/*.{ts,tsx}", "frontend/config.ts", "frontend/vite.config.ts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": [
        "error",
        {},
        prettierConfig,
      ],
    },
  },
);
