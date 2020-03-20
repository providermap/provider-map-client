const path = require("path");

module.exports = {
  "settings": {
    "react": {
      "pragma": "React",
      "version": require("react/package.json").version,
    },
  },
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": [
    "babel",
    "import",
    "react",
    "react-hooks",
  ],
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true,
      "react": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-console": 0,
    "no-debugger": "warn",
    "no-unused-vars": "warn",
    "react/display-name": 0,
    "react/no-typos": 1,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0,
  },
  "settings": {
    "import/parser": "babel-eslint",
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, "webpack.common.js")
      },
      "node": {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    }
  }
}