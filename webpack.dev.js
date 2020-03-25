// eslint-disable-next-line no-unused-vars
const _ = require("dotenv").config();
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
    // Define env variables in code
    new webpack.DefinePlugin({
      "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
      "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      "process.env.FIREBASE_DB_URL": JSON.stringify(process.env.FIREBASE_DB_URL),
      "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      "process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID),
      "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
    }),
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