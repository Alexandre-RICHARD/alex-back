module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    "node_modules",
    "report",
    ".eslintrc.cjs",
    "vite.config.ts",
    "vitest.config.ts",
    "vitest.setup.ts",
    // Temporary
    "toDo"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/recommended",
    "airbnb-base",
    "airbnb-typescript",
    "plugin:vitest/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "@stylistic",
    "simple-import-sort",
    "@typescript-eslint",
    "promise",
    "import",
    "vitest"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.test.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Classic rules
    "no-console": ["warn", { allow: ["error"] }],
    "no-param-reassign": "error",

    // Prettier rules
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: true,
        semi: true,
        singleQuote: false,
        quoteProps: "consistent",
        trailingComma: "all",
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: "always",
        endOfLine: "auto",
        singleAttributePerLine: true,
      },
    ],

    // Import rules
    "import/no-extraneous-dependencies": "off",
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/no-unused-modules": ["error", { "missingExports ": true, "unusedExports": true }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/extensions": "off",

    // Typescript
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/no-use-before-define": "error",

    // Disable old and depreciated rules
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/no-throw-literal": "off",

    "react/jsx-filename-extension": "off"
  },
};
