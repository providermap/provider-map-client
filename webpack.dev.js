const merge = require("webpack-merge");
const webpack = require("webpack");

// Common webpack config
const commonWebpackConfig = require("./webpack.common.js");


console.log("Running webpack.dev.js");

module.exports = merge(commonWebpackConfig, {
  mode: "development",

  // Enable sourcemaps for debugging webpack output
  devtool: "eval-source-map",

  // Define dev server config
  devServer: {

    compress: true,
    contentBase: "./dist",
    // Fall back browser history api
    historyApiFallback: true,
    // Enable hot reloading
    hot: false,
    proxy: [
      {
      context: [
        "/api/facility",
      ],
      target: `http://localhost:8001`,
      secure: false,
      changeOrigin: true
      }
    ]
  },

  // Plugins Array
  plugins: [
    // Define placeholders in code
    new webpack.DefinePlugin({ __DEV__: true }),
    // Required for hot reload
    new webpack.HotModuleReplacementPlugin(),
  ]
});