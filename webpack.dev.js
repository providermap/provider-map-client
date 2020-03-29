const merge = require("webpack-merge");
const webpack = require("webpack");

// Common webpack config
const commonWebpackConfig = require("./webpack.common.js");


console.log("Running webpack.dev.js");

console.log("process.env.FIREBASE_APP_ID,", process.env.FIREBASE_APP_ID,)


module.exports = merge(commonWebpackConfig, {
  mode: "development",

  // Enable sourcemaps for debugging webpack output
  devtool: "eval-source-map",

  // Plugins Array
  plugins: [
    // Required for hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],

  // Define dev server config
  devServer: {
    compress: true,
    contentBase: "./public",
    // Fall back browser history api
    historyApiFallback: true,
    // Enable hot reloading
    hot: false,
    proxy: [
      {
        context: [
          "/api/facility",
        ],
        target: `http://localhost:8008`,
        secure: false,
        changeOrigin: false
      }
    ]
  }
});