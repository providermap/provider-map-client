const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  settings:  {
    react:  {
      version:  "detect",  // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    "browser": true,
    "es6": true,
    "node": true,
  },
  plugins: [
    "import",
    "react/recommended",
    "react",
    "react-hooks",
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:@typescript-eslint/recommended"
  ],
  overrides: [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": 0
      }
    },
    {
      "files": ["*.ts", ".tsx"],
      "rules": {
        "no-undef": 0,
        "import/no-unresolved": 0,
        "import/namespace": 0,
        "import/named": 0,
        "import/default": 0
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    // General Rules
    "no-console": 0,
    "no-debugger": 0,
    "eqeqeq": ["error","always"],
    "spaced-comment": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-var": "error",
    "no-extra-semi": "error",
    "no-unused-vars": "error",
    "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "jsx-quotes":["error", "prefer-double"],
    "no-mixed-spaces-and-tabs": "error",

    // React
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0,

    // Typescript rules
    "@typescript-eslint/interface-name-prefix": ["warn", { "prefixWithI": "always" }],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-var-requires": 0
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [ ".js", ".jsx", ".ts", ".tsx" ]
      }
    }
  },
}