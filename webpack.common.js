// eslint-disable-next-line no-unused-vars
const _ = require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: [ "@babel/polyfill", "./src/index.jsx" ],

  output: {
    filename: "bundle.js",
    path: __dirname + "/public",
    publicPath: "/"
  },

  plugins: [
    // Remove your build folder before building
    new CleanWebpackPlugin(),

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

    // Add index.html template and favicon
    new HtmlWebpackPlugin({ template: "./index.html", favicon: "./src/app/assets/img/favicon.svg" }),
  ],

  resolve: {
    extensions: [ ".jsx", ".js", ".json" ],
    modules: [ path.resolve(__dirname, "src/app"), "node_modules" ]
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // emitError: true,
          emitWarning: false,
        }
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(css|sass|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      { test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|otf)$/, loader: "file-loader" },
      { test: /\.html$/, loader: "html-loader" },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [ path.join(process.cwd(), "node_modules") ],
      },
    ]
  }
};