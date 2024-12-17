import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import checkFile from "eslint-plugin-check-file";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "check-file": checkFile
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "check-file/no-index": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "**/*": "KEBAB_CASE" }
      ],
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" }
      ]
    }
  },
  {
    files: ["vite.config.ts"],
    rules: {
      "check-file/filename-naming-convention": "off"
    }
  }
);
