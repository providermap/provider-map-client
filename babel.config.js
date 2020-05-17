const plugins = [
  "@babel/plugin-proposal-nullish-coalescing-operator",
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-transform-object-set-prototype-of-to-assign",
  "@babel/plugin-transform-regenerator",
  "babel-plugin-styled-components",
  "babel-plugin-redux-saga"
];

const presets =  [
  "@babel/preset-react",
  ["@babel/preset-env", {
    "useBuiltIns": "entry",
    "corejs": 3
  }],
];

if (process.env.NODE_ENV !== "production") {
  // Only add this when in development
  plugins.push("react-hot-loader/babel");
}

module.exports = { presets, plugins };